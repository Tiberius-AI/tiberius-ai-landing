/**
 * Vercel Serverless Endpoint: /api/lead
 * Captures 2-Step "50% Progress" Popup Modal leads, Booking requests, and Instant AI SMS Demo triggers.
 * Supports optional downstream webhook forwarding via process.env.LEAD_WEBHOOK_URL.
 */
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
  const enrichedLead = {
    id: `lead_${Date.now()}`,
    industry: payload.industry || 'Home Services & Contracting (Remodel, Roof, Trades)',
    name: payload.name || '',
    phone: payload.phone || '',
    email: payload.email || '',
    ownershipPreference: payload.ownershipPreference || '$297/mo Lease',
    locationTag: payload.locationTag || 'default',
    selectedDemo: payload.selectedDemo || null,
    source: payload.source || '2-step-50-progress-modal',
    timestamp: new Date().toISOString()
  };

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
    lead: enrichedLead,
    smsPreview: `Hi ${(enrichedLead.name || 'there').split(' ')[0]}! This is Alfred from Tiberius Smart Sites. Your 5-minute walkthrough is unlocked, and here is what your 3-second AI lead reply feels like for ${enrichedLead.industry}. Reply DEMO anytime!`
  });
};
