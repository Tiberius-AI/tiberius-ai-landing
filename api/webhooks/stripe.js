/**
 * POST /api/webhooks/stripe
 * Universal Stripe Checkout / Subscription / Payment Webhook Receiver:
 *   - Accepts Stripe webhook payloads (`checkout.session.completed`, `customer.subscription.created`,
 *     `invoice.payment_succeeded`, `payment_intent.succeeded`)
 *   - Extracts customer name, email, phone, business name, and plan/amount
 *   - Dispatches an instant Admin SMS (to `ADMIN_ALERT_PHONE || '(830) 481-0653'`) +
 *     Admin Email (to `ADMIN_ALERT_EMAIL || 'feedbackdaisy@gmail.com'`)
 *   - Sends a welcome confirmation SMS to the customer's mobile phone (if present)
 *   - Logs the sale/trial in the 3-Pane Conversation Room
 */

const { ingestInboundWebhookReply } = require('../../db/store');
const {
  sendMasterTwilioSmsToContractor,
  dispatchAdminLeadAndSaleNotification
} = require('../../workers/comms-dispatcher');

function formatCentsToDollars(cents, currency = 'usd') {
  if (typeof cents !== 'number' || !Number.isFinite(cents)) return '';
  const amount = (cents / 100).toLocaleString('en-US', {
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2
  });
  return currency.toLowerCase() === 'usd' ? `$${amount}` : `${amount} ${currency.toUpperCase()}`;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Stripe-Signature');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      service: 'Tiberius Smart Sites & Recon Stripe Sale/Trial Webhook Receiver',
      status: 'active'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const event = typeof req.body === 'object' && req.body ? req.body : {};
    const eventType = String(event.type || 'checkout.session.completed');
    const obj = (event.data && event.data.object) || event;

    const supportedEvents = new Set([
      'checkout.session.completed',
      'customer.subscription.created',
      'invoice.payment_succeeded',
      'payment_intent.succeeded'
    ]);

    if (event.type && !supportedEvents.has(eventType)) {
      return res.status(200).json({
        ok: true,
        ignored: true,
        eventType
      });
    }

    const custDetails = obj.customer_details || obj.billing_details || {};
    const metadata = obj.metadata || {};

    const name =
      custDetails.name ||
      obj.customer_name ||
      metadata.name ||
      metadata.ownerName ||
      '';
    const email =
      custDetails.email ||
      obj.customer_email ||
      obj.receipt_email ||
      metadata.email ||
      '';
    const phone =
      custDetails.phone ||
      obj.customer_phone ||
      metadata.phone ||
      '';
    const businessName =
      metadata.businessName ||
      metadata.companyName ||
      (Array.isArray(obj.custom_fields)
        ? (obj.custom_fields.find((f) => /business|company/i.test(f.key || f.label?.custom || ''))?.text?.value || '')
        : '') ||
      '';

    const amountCents =
      typeof obj.amount_total === 'number'
        ? obj.amount_total
        : typeof obj.amount_paid === 'number'
        ? obj.amount_paid
        : typeof obj.amount === 'number'
        ? obj.amount
        : null;
    const amountPaid = amountCents !== null ? formatCentsToDollars(amountCents, obj.currency || 'usd') : '';

    const isTrial =
      obj.status === 'trialing' ||
      (amountCents === 0 && (obj.mode === 'subscription' || eventType === 'customer.subscription.created'));

    let planLabel =
      metadata.plan ||
      metadata.planLabel ||
      obj.description ||
      (amountCents === 29700
        ? '12-Month Rent-to-Own ($297/mo)'
        : amountCents === 19700
        ? 'NB Neighbor Rate Rent-to-Own ($197/mo)'
        : amountCents === 240000
        ? 'Buy It Outright ($2,400)'
        : amountCents === 250000
        ? 'Buy It Outright ($2,400) + $100/mo Care Plan'
        : amountCents === 160000
        ? 'NB Neighbor Rate Buy Outright ($1,600)'
        : amountCents === 170000
        ? 'NB Neighbor Rate Buy Outright ($1,600) + $100/mo Care Plan'
        : amountCents === 10000
        ? '$100/mo Web & AI Care Plan'
        : isTrial
        ? '7-Day Free Trial ($0 Today)'
        : amountPaid
        ? `Stripe Checkout (${amountPaid})`
        : 'Stripe Smart Site Checkout');

    const saleRecord = {
      id: obj.id || `stripe_${Date.now()}`,
      source: 'stripe-webhook',
      eventCategory: isTrial ? 'TRIAL' : 'SALE',
      name,
      businessName,
      phone,
      email,
      cleanEmail: email,
      ownershipPreference: planLabel,
      planLabel,
      amountPaid: amountPaid || (isTrial ? '$0.00 (Free Trial Started)' : ''),
      industry: metadata.industry || metadata.trade || 'Smart Site / Recon Client',
      timestamp: new Date().toISOString()
    };

    const cleanPhoneDigits = String(phone || '').replace(/\D/g, '');
    const firstName = String(name || 'there').trim().split(/\s+/)[0] || 'there';
    const customerSmsBody = `🎉 Welcome to Tiberius Smart Sites, ${firstName}! Your Stripe confirmation (${planLabel}) is locked in. Complete your 60-second Auto-Scan at https://www.tiberius.ai/recon/onboarding?smart_site=1 or reply here anytime with questions!`;

    const [customerSmsRes, adminAlertRes] = await Promise.allSettled([
      cleanPhoneDigits.length >= 10
        ? sendMasterTwilioSmsToContractor({
            toPhone: phone,
            bodyText: customerSmsBody
          })
        : Promise.resolve(null),
      dispatchAdminLeadAndSaleNotification({
        lead: saleRecord,
        eventCategory: isTrial ? 'TRIAL' : 'SALE'
      })
    ]);

    try {
      ingestInboundWebhookReply({
        provider: 'TWILIO',
        fromPhone: phone || undefined,
        fromEmail: email || undefined,
        fromName: businessName ? `${name || 'Customer'} (${businessName})` : name || 'Stripe Customer',
        rawBody: `[💸 STRIPE ${isTrial ? 'TRIAL' : 'SALE'} WEBHOOK] ${
          name || 'Customer'
        } (${businessName || email || 'Smart Site'}) • Plan: ${planLabel} • Paid: ${
          saleRecord.amountPaid || 'Confirmed'
        } • Phone: ${phone || 'N/A'} • Email: ${email || 'N/A'}`
      });
    } catch (_storeErr) {
      // Non-blocking store sync
    }

    return res.status(200).json({
      ok: true,
      eventType,
      saleRecord,
      customerSmsReceipt: customerSmsRes.status === 'fulfilled' ? customerSmsRes.value : null,
      adminNotificationReceipt: adminAlertRes.status === 'fulfilled' ? adminAlertRes.value : null
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};
