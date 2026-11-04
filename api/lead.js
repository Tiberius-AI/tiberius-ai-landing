/**
 * Vercel Serverless Endpoint: /api/lead
 * Captures 2-Step "50% Progress" Popup Modal leads, Booking requests, and Instant AI SMS Demo triggers.
 * Dispatches the live 3-second Welcome SMS (matching the watch.html marquee & walkthrough video +
 * queuing their custom mock-up site to try soon) and supports downstream webhook forwarding.
 */

function parseEmailAndBusinessName(rawEmailInput = '', explicitBusinessName = '') {
  const raw = String(rawEmailInput || '').trim();
  const explicitBiz = String(explicitBusinessName || '').trim();
  const emailMatch = raw.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const cleanEmail = emailMatch ? emailMatch[0] : '';

  if (explicitBiz) {
    return { cleanEmail, businessName: explicitBiz };
  }

  // Extract business name if user entered "john@miller.com (Miller Remodeling)" or "john@gmail.com - Sweet Tooth Bakery"
  let remainder = raw
    .replace(cleanEmail, '')
    .replace(/^[\s\-–—•|/(),:]+|[\s\-–—•|/(),:]+$/g, '')
    .replace(/^\((.*)\)$/, '$1')
    .trim();

  if (remainder.length >= 2) {
    return { cleanEmail, businessName: remainder };
  }

  return { cleanEmail, businessName: '' };
}

function buildWelcomeSmsBody(lead) {
  const firstName = String(lead.name || 'there').trim().split(/\s+/)[0] || 'there';
  const bizLabel = lead.businessName ? lead.businessName : 'your business';

  if (lead.source === 'nb-guinea-pig-survey') {
    return `⚡ Howdy ${firstName}! We received your New Braunfels 30-Day "Guinea Pig" Smart Site application & build survey for ${bizLabel}. We're manually reviewing the 10 local NB slots right now and will text you here as soon as your 7-day build is approved! Reply anytime with questions.`;
  }

  if (lead.source === 'nb-runner-up-special') {
    return `⚡ Howdy ${firstName}! Your New Braunfels Runner-Up Discount slot (${lead.ownershipPreference || '$197/mo Rent-to-Own'}) for ${bizLabel} is reserved! Reply READY here (or with any questions) and we'll text over your private checkout link to kick off your 7-day build.`;
  }

  if (lead.question) {
    return `⚡ Tiberius 24/7 AI Concierge: Thanks for asking "${lead.question.slice(
      0,
      75
    )}"! Our team will also be making a custom Smart Site mock-up for ${bizLabel} for you to try soon. Reply here anytime with your business type + city or follow-up questions!`;
  }

  if (lead.source === 'home-3-sec-sms-simulator') {
    return `⚡ Tiberius 3-Second AI Text Demo (${lead.industry}): Boom—delivered in under 3 seconds! This is how fast your Smart Site texts back missed calls & new leads. Want us to make a custom mock-up site for your business to try out soon? Reply with your business name + what you do!`;
  }

  return `⚡ Hey ${firstName}! It's Alfred from Tiberius Smart Sites—here is the live 3-second AI text reply from the walkthrough video you just unlocked! Our Texas team will also be making a custom mock-up site for ${bizLabel} for you to try out soon. Reply with what your business does + your city (or ask any question) to test how fast our AI texts back!`;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      service: 'Tiberius Smart Sites Lead & SMS Demo Webhook',
      status: 'active'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const payload = req.body || {};
  const { cleanEmail, businessName } = parseEmailAndBusinessName(
    payload.email || '',
    payload.businessName || ''
  );

  const enrichedLead = {
    id: `lead_${Date.now()}`,
    industry: payload.industry || 'Home Services & Contracting (Remodel, Roof, Trades)',
    name: payload.name || '',
    role: payload.role || '',
    businessName,
    phone: payload.phone || '',
    email: payload.email || '',
    cleanEmail,
    websiteOrGbp: payload.websiteOrGbp || '',
    serviceArea: payload.serviceArea || '',
    yearsInBusiness: payload.yearsInBusiness || '',
    topServices: payload.topServices || '',
    typicalPricing: payload.typicalPricing || '',
    missedCallHandling: payload.missedCallHandling || '',
    primaryGoal: payload.primaryGoal || '',
    confirmedNbLegit: Boolean(payload.confirmedNbLegit),
    question: payload.question || '',
    ownershipPreference: payload.ownershipPreference || '$297/mo 12-Month Rent-to-Own',
    locationTag: payload.locationTag || 'default',
    selectedDemo: payload.selectedDemo || null,
    source: payload.source || '2-step-50-progress-modal',
    timestamp: new Date().toISOString()
  };

  const smsBody = buildWelcomeSmsBody(enrichedLead);

  let smsReceipt = null;
  const cleanPhoneDigits = String(enrichedLead.phone || '').replace(/\D/g, '');
  if (cleanPhoneDigits.length >= 10) {
    try {
      const { sendMasterTwilioSmsToContractor } = require('../workers/comms-dispatcher');
      smsReceipt = await sendMasterTwilioSmsToContractor({
        toPhone: enrichedLead.phone,
        bodyText: smsBody
      });
    } catch (_err) {
      smsReceipt = null;
    }

    // Record the Smart Site lead & mock-up request in the Conversation Room so replies thread cleanly
    try {
      const { ingestInboundWebhookReply } = require('../db/store');
      let leadSummary = `[SMART SITE MOCK-UP QUEUED] ${
        enrichedLead.name || 'New Lead'
      } (${enrichedLead.businessName || enrichedLead.industry}) • Phone: ${
        enrichedLead.phone
      } • Email: ${enrichedLead.email || 'N/A'} • Plan: ${enrichedLead.ownershipPreference}`;

      if (enrichedLead.source === 'nb-guinea-pig-survey') {
        leadSummary = `[NB 30-DAY GUINEA PIG APPLICATION] ${enrichedLead.name || 'Owner'} (${
          enrichedLead.role || 'Owner'
        }) @ ${enrichedLead.businessName || 'NB Business'} • Industry: ${
          enrichedLead.industry
        } • Phone: ${enrichedLead.phone} • Email: ${
          enrichedLead.cleanEmail || enrichedLead.email || 'N/A'
        } • Web/GBP: ${enrichedLead.websiteOrGbp || 'None'} • Area: ${
          enrichedLead.serviceArea || 'New Braunfels'
        } (${enrichedLead.yearsInBusiness || 'N/A'}) • Top Services: ${
          enrichedLead.topServices || 'N/A'
        } • Pricing: ${enrichedLead.typicalPricing || 'N/A'} • Missed Calls: ${
          enrichedLead.missedCallHandling || 'N/A'
        } • #1 Goal: ${enrichedLead.primaryGoal || 'N/A'}`;
      } else if (enrichedLead.source === 'nb-runner-up-special') {
        leadSummary = `[NB RUNNER-UP DISCOUNT CLAIMED] ${enrichedLead.name || 'Owner'} @ ${
          enrichedLead.businessName || enrichedLead.industry
        } • Selected Discount Plan: ${enrichedLead.ownershipPreference} • Phone: ${
          enrichedLead.phone
        } • Email: ${enrichedLead.cleanEmail || enrichedLead.email || 'N/A'} • Web/Notes: ${
          enrichedLead.websiteOrGbp || 'N/A'
        }`;
      }

      ingestInboundWebhookReply({
        provider: 'TWILIO',
        fromPhone: enrichedLead.phone,
        fromName: enrichedLead.businessName
          ? `${enrichedLead.name || 'Lead'} (${enrichedLead.businessName})`
          : enrichedLead.name || 'Smart Site Lead',
        rawBody: enrichedLead.question
          ? `${leadSummary} • Question: "${enrichedLead.question}"`
          : leadSummary
      });
    } catch (_storeErr) {
      // Non-blocking store sync
    }
  }

  let webhookForwarded = false;
  if (process.env.LEAD_WEBHOOK_URL) {
    try {
      const resp = await fetch(process.env.LEAD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enrichedLead)
      });
      webhookForwarded = resp.ok;
    } catch (_err) {
      webhookForwarded = false;
    }
  }

  return res.status(200).json({
    ok: true,
    webhookForwarded,
    smsDispatched: Boolean(cleanPhoneDigits.length >= 10),
    smsReceipt,
    lead: enrichedLead,
    smsPreview: smsBody
  });
};
