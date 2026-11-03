/**
 * POST /api/webhooks/twilio
 * Universal Twilio Inbound SMS Webhook Receiver (from `Communication Notes.txt` Section 2):
 *   - Accepts Twilio POST payloads (`From`, `To`, `Body`)
 *   - Matches the phone number to the active lead thread in the Conversation Room
 *   - Inserts the inbound SMS into the timeline and updates the thread stage to `REPLIED_HOT`
 *   - Dispatches an instant 3-second Smart Site AI auto-reply tailored to the prospect's business
 *     type (bakery/cafe, roofer/trades, pro services, salon/medspa, or FAQ) and confirms their
 *     custom mock-up site is queued for our build team to make for them to try soon.
 */

const { ingestInboundWebhookReply, recordScoutAlertLog } = require('../../db/store');
const {
  dispatchContractorHotReplyAlertSms,
  sendMasterTwilioSmsToContractor
} = require('../../workers/comms-dispatcher');

function buildSmartSiteInboundAiReply(rawMessage = '') {
  const text = String(rawMessage || '').trim();
  if (!text) return null;

  // Respect standard carrier opt-out/help keywords (handled natively by Twilio Advanced Opt-Out)
  if (/^(stop|stopall|unsubscribe|cancel|end|quit|help|info)$/i.test(text)) {
    return null;
  }

  // 1. Check if they asked a specific pricing / ownership / guarantee / phone question
  if (/(\$?297|\$?2,?400|12\s*month|rent[-\s]*to[-\s]*own|buy\s+outright|own|ownership|hostage)/i.test(text)) {
    return '⚡ Tiberius AI (Instant Reply): With our $297/mo 12-Month Rent-to-Own plan ($0 setup), all hosting, texting & AI are included and you own your website 100% outright after 12 payments—or buy it outright Day 1 for $2,400! Our team also has your info queued to make your custom mock-up site to try soon.';
  }

  if (/(guarantee|refund|money[-\s]*back|cancel|risk|contract)/i.test(text)) {
    return '⚡ Tiberius AI (Instant Reply): Every build is backed by our 30-Day 100% Money-Back Guarantee and zero hostage contracts. We launch your custom site in 7 days, and if you are not thrilled in your first 30 days, we refund 100%. We also have your info queued for your custom mock-up site to try soon!';
  }

  if (/(phone\s*number|keep\s+my\s+number|existing\s+number|domain)/i.test(text)) {
    return '⚡ Tiberius AI (Instant Reply): Yes—100%! You keep your existing business phone number and domain name. We pair a dedicated texting line so missed calls get a 3-second AI text-back automatically. Our team also has your notes queued to build your custom mock-up site to try soon!';
  }

  // 2. Niche-aware response when they reply with their business type (e.g., Cupcake Bakery vs. Roofer)
  if (/(cupcake|bakery|baker|cake|cookie|pastry|donut|kolache|cafe|coffee|restaurant|catering|food|bbq|pizza|bistro|shop|boutique|store)/i.test(text)) {
    return '🔥 Got it—see how fast that reply was? For your shop, your custom Smart Site AI will answer customer questions, capture custom orders & catering requests 24/7 by text while you are busy at the counter, and text 1-tap 5-star Google review links! Our Texas team has your details and will text your custom mock-up site to try out soon (or lock in your full 7-day build anytime on the walkthrough page!).';
  }

  if (/(roof|remodel|hvac|plumb|electric|tree|fence|fencing|concrete|deck|patio|pool|landscap|paint|flooring|siding|garage|pest|handyman|contractor|construction|builder|water\s+damage)/i.test(text)) {
    return '🔥 Got it—see how fast that reply was? For your trade, your custom Smart Site AI will rescue missed job-site calls in 3 seconds, have homeowners text photos of their project for fast ballpark quotes before you roll a truck, and stack 5-star Google reviews automatically! Our Texas team has your details and will text your custom mock-up site to try out soon (or lock in your full 7-day build anytime on the walkthrough page!).';
  }

  if (/(mortgage|lender|loan|cpa|tax|accounting|accountant|bookkeep|attorney|lawyer|legal|law\s+firm|real\s+estate|realtor|insurance|wealth|financial|advisor|consulting)/i.test(text)) {
    return '🔥 Got it—see how fast that reply was? For your firm, your custom Smart Site AI will pre-qualify client inquiries 24/7 by text, book consultations straight onto your calendar while you are in meetings, and automate 5-star Google reviews! Our Texas team has your details and will text your custom mock-up site to try out soon (or lock in your full 7-day build anytime on the walkthrough page!).';
  }

  if (/(salon|barber|medspa|spa|dental|dentist|chiro|clinic|medical|vet|pet|groom|dog|gym|fitness|yoga|auto|mechanic|detailing|cleaning|maid|photo)/i.test(text)) {
    return '🔥 Got it—see how fast that reply was? For your business, your custom Smart Site AI will text back missed calls in 3 seconds, answer pricing/availability questions 24/7 to book appointments, and text every happy client a 1-tap 5-star Google review link! Our Texas team has your details and will text your custom mock-up site to try out soon.';
  }

  // 3. Default conversational reply for any other business description or test message
  return '🔥 Got it—see how fast that reply was? That is the exact 3-second AI speed your customers will experience on your Smart Site! Our Texas build team has your message and will be making a custom mock-up site matched to your business for you to try out soon. Reply anytime with more details or questions!';
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }));
  }

  try {
    let body = {};
    if (typeof req.body === 'object' && req.body) {
      body = req.body;
    } else if (typeof req.body === 'string' && req.body.trim()) {
      body = Object.fromEntries(new URLSearchParams(req.body));
    }

    const fromPhone = body.From || body.from || '';
    const toPhone = body.To || body.to || '';
    const smsBody = body.Body || body.body || body.text || '';

    const result = ingestInboundWebhookReply({
      provider: 'TWILIO',
      token: body.token,
      threadId: body.threadId,
      fromPhone,
      fromName: body.FromName || undefined,
      toAddress: toPhone,
      rawBody: smsBody
    });

    const contractorAlertReceipt = await dispatchContractorHotReplyAlertSms({
      contractor: result.contractor,
      thread: result.thread,
      inboundMessage: result.inboundMessage,
      token: result.matchedToken
    });
    const alertLogResult = recordScoutAlertLog(result.matchedToken, contractorAlertReceipt);
    result.contractorAlertReceipt = contractorAlertReceipt;
    result.scoutAlertLogs = alertLogResult.scoutAlertLogs;
    if (result.roomState) {
      result.roomState.scoutAlertLogs = alertLogResult.scoutAlertLogs;
    }

    // Send instant 3-second Smart Site AI auto-reply back to the prospect's phone
    const aiReplyText = buildSmartSiteInboundAiReply(smsBody);
    const cleanFromDigits = String(fromPhone || '').replace(/\D/g, '');
    if (aiReplyText && cleanFromDigits.length >= 10 && body.autoReply !== false) {
      const smartSiteAutoReplyReceipt = await sendMasterTwilioSmsToContractor({
        toPhone: fromPhone,
        bodyText: aiReplyText
      });
      result.smartSiteAutoReplyReceipt = smartSiteAutoReplyReceipt;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify(result));
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ ok: false, error: err.message }));
  }
};
