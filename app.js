/**
 * ============================================================================
 * TIBERIUS SMART SITES - MASTER FUNNEL, 50% PROGRESS MODAL & DEMO SHOWCASE JS
 * ============================================================================
 */

const GEO_COPY_MAP = {
  nb: '📍 BUILT IN NEW BRAUNFELS • FOR HILL COUNTRY & LOCAL BUSINESSES',
  tx: '📍 TEXAS-BUILT AI SMART SITES • FOR TRADES, PROS & LOCAL SHOPS',
  national: 'BUILT FOR CONTRACTORS, PROFESSIONALS & MAIN STREET BUSINESSES',
  default: 'BUILT FOR CONTRACTORS, PROFESSIONALS & MAIN STREET BUSINESSES'
};

const GEO_SMS_MAP = {
  nb: {
    alertPill: 'missed call from (830) 555-0194 • 0.8s ago',
    userBubble: 'Looking to remodel our master bath + add a covered patio in New Braunfels.'
  },
  tx: {
    alertPill: 'missed call from (512) 555-0194 • 0.8s ago',
    userBubble: 'Looking to remodel our master bath + add a covered patio in Texas.'
  },
  national: {
    alertPill: 'missed call from (830) 555-0194 • 0.8s ago',
    userBubble: 'Looking to remodel our master bath + add a covered patio.'
  }
};

/**
 * Clean DEMO_SITES config array with slots for our newly finished Remodel,
 * Pro Services, and Local Cafe/Shop builds.
 */
const DEMO_SITES = [
  {
    id: 'remodel-1',
    title: 'Win $75k–$250k+ Remodel Jobs Without Wasting Trips on Unqualified Leads',
    category: 'remodel-trades',
    categoryLabel: 'HIGH-TICKET REMODELING',
    industryPreset: 'Home Services & Contracting (Remodel, Roof, Trades)',
    domain: 'hillcountrycustomremodel.com',
    image: '/demos/remodel-1.webp',
    ratingText: '★ Filters Out Tire-Kickers',
    description:
      'Positions you as the #1 premier builder in your market so homeowners stop shopping you against the cheapest guy in a truck. Texts new leads in 3 seconds and collects project details before you ever drive out.',
    chips: [
      '✓ Pre-Screens Budgets Automatically',
      '✓ Collects Job Photos by Text',
      '✓ Rescues Missed Job-Site Calls',
      '✓ Ranks #1 for Custom Remodels'
    ],
    smsOverlay: {
      badge: '⚡ 2.1s AI Text Reply',
      message:
        '"Hi Mark! Saw your kitchen + patio photo. Full custom builds in your neighborhood run $85k–$135k. Want to schedule an on-site walkthrough this Thursday at 2 PM?"',
      outcome: '✓ Booked $110k Estimate'
    },
    highlights: [
      'Pre-screens homeowner budgets and timelines before you ever roll a truck',
      'Collects kitchen, bath, or exterior photos directly by text message',
      'Showcases verified 5-star homeowner reviews to justify premium pricing',
      'Answers missed job-site calls in 3 seconds and books qualified walkthroughs'
    ]
  },
  {
    id: 'remodel-2',
    title: "See the Homeowner's Kitchen or Bath on Your Phone Before You Roll a Truck",
    category: 'remodel-trades',
    categoryLabel: 'KITCHEN & BATH REMODELING',
    industryPreset: 'Home Services & Contracting (Remodel, Roof, Trades)',
    domain: 'ridgelineremodeling.com',
    image: '/demos/remodel-2.webp',
    ratingText: '★ Zero Wasted Estimate Drives',
    description:
      'Instead of letting quote forms sit in an email inbox for hours, your site immediately starts a text conversation with the homeowner, asks them to text 2–3 photos of their space, and books qualified walkthroughs.',
    chips: [
      '✓ Homeowners Text You Room Photos',
      '✓ 3-Second Speed-to-Lead via SMS',
      '✓ Automated 5-Star Google Reviews',
      '✓ Beats Big-Box Competitors Online'
    ],
    smsOverlay: {
      badge: '⚡ 2.6s Missed-Call Rescue',
      message:
        '"Hey Sarah! Sorry we missed your call on the job site. Text us 2–3 photos of the kitchen or bath you want to remodel and we can get your estimate started!"',
      outcome: '✓ Saved Missed Call Lead'
    },
    highlights: [
      'Starts a live text conversation within 3 seconds of any quote request',
      'Prompts homeowners to text 2–3 photos of their current kitchen or bath',
      'Automatically follows up after completed jobs to stack 5-star Google reviews',
      'Keeps every text, call, and photo organized in one simple mobile inbox'
    ]
  },
  {
    id: 'pest-control',
    title: 'Never Lose a High-Profit Emergency Repair Call to Voicemail Again',
    category: 'remodel-trades',
    categoryLabel: 'HVAC, PLUMBING & ELECTRICAL',
    industryPreset: 'Home Services & Contracting (Remodel, Roof, Trades)',
    domain: 'lonestarhvacpros.com',
    image: '/demos/pest-control.webp',
    ratingText: '★ Captures 24/7 Emergency Jobs',
    description:
      "When a customer's AC goes out at 9 PM or you're tied up under a house, they won't wait for a callback. Your Smart Site texts them back in 3 seconds flat, locks in the dispatch, and keeps them from calling the next company on Google.",
    chips: [
      '✓ Books After-Hours Emergency Calls',
      '✓ Instant Missed-Call Text Rescue',
      '✓ Turns Repairs Into Maintenance Plans',
      '✓ Outranks Local Franchises on Google'
    ],
    smsOverlay: {
      badge: '⚡ 1.8s Emergency Dispatch',
      message:
        '"Hi Sarah! Sorry we missed your call. Our techs are on a service run. Do you need same-day emergency service? Reply YES to lock in our next open truck slot!"',
      outcome: '✓ Same-Day Dispatch Booked'
    },
    highlights: [
      'Captures high-profit night and weekend emergency calls automatically via text',
      'Locks in the customer before they call the next company on Google',
      'Collects photos of the issue or equipment label so your tech arrives prepared',
      'Automatically converts one-time repairs into recurring maintenance plans'
    ]
  },
  {
    id: 'tree-service',
    title: 'Rescue Missed Calls on Loud Job Sites & Give Ballpark Quotes From Photos',
    category: 'remodel-trades',
    categoryLabel: 'ROOFING, TREE & EXTERIOR PROS',
    industryPreset: 'Home Services & Contracting (Remodel, Roof, Trades)',
    domain: 'ironcladtreeservice.com',
    image: '/demos/tree-service.webp',
    ratingText: '★ Built for Busy Crews',
    description:
      "When you're on a roof or running equipment, every missed call is money walking away. Our AI texts missed callers immediately, asks them to snap a photo of their tree, roof, or yard, and sends the ready-to-close job straight to your phone.",
    chips: [
      "✓ Replies While You're on the Job",
      '✓ Customers Text Yard & Roof Photos',
      '✓ Stacks 20–100+ 5-Star Reviews',
      '✓ Dominates Local "Near Me" Maps'
    ],
    smsOverlay: {
      badge: '⚡ 2.2s Job-Site Text Rescue',
      message:
        '"Howdy! Sorry we missed your call while the crew is running equipment. Snap and text a quick photo of the tree or roof issue and we will text back a ballpark right away!"',
      outcome: '✓ $2,850 Job Booked via SMS'
    },
    highlights: [
      'Instantly texts back callers when you are on a loud roof or running equipment',
      'Has customers text photos of their tree, roof, or yard for fast ballpark quotes',
      'Sends 1-tap Google review invites after every job to dominate local search',
      'Captures 24/7 storm damage leads while competitors let calls go to voicemail'
    ]
  },
  {
    id: 'pro-services',
    title: "Pre-Qualify Clients & Fill Your Consultation Calendar While You're in Meetings",
    category: 'pro-services',
    categoryLabel: 'MORTGAGE, CPA & PRO SERVICES',
    industryPreset: 'Professional Services (Mortgage, CPA, Legal, Real Estate)',
    domain: 'roamandrootadvisors.com',
    image: '/demos/pro-services.webp',
    ratingText: '★ Zero Phone Tag',
    description:
      'Answers client questions 24/7, follows up with loan or tax inquiries in seconds via text, and books qualified appointments directly onto your calendar so you never lose a client while sitting in a meeting.',
    chips: [
      '✓ Books Consultations on Autopilot',
      '✓ Pre-Qualifies Clients via Text',
      '✓ Instant Reply During Meetings',
      '✓ Automates Past-Client Referrals'
    ],
    smsOverlay: {
      badge: '⚡ 1.9s Client Text Reply',
      message:
        '"Hi David! Thanks for reaching out. Based on a $525k purchase with 10% down, your estimated payment is ~$2,790/mo. Want to grab a 15-min call tomorrow at 2 PM?"',
      outcome: '✓ Consultation Booked'
    },
    highlights: [
      'Pre-qualifies prospective clients and answers common questions 24/7 via text',
      'Eliminates phone tag by booking qualified consultations straight to your calendar',
      'Replies immediately when you are in client meetings or after business hours',
      'Automates 5-star Google reviews and referral check-ins with past clients'
    ]
  },
  {
    id: 'local-cafe',
    title: 'Capture High-Margin Catering & Custom Orders Without Stepping Away From the Counter',
    category: 'local-shops',
    categoryLabel: 'CAFES, BAKERIES & LOCAL SHOPS',
    industryPreset: 'Local Storefront, Cafe, Bakery or Restaurant',
    domain: 'opashillcountrybakery.com',
    image: '/demos/local-cafe.webp',
    ratingText: '★ More Orders & Repeat Regulars',
    description:
      'Handles custom cake orders, catering requests, and everyday customer questions automatically via text while your team takes care of the line out the door, and turns happy customers into 5-star Google reviews.',
    chips: [
      '✓ Takes Catering & Custom Orders 24/7',
      '✓ Ranks #1 for Local Search & ChatGPT',
      '✓ Automated 5-Star Review Engine',
      '✓ Brings Customers Back With VIP Texts'
    ],
    smsOverlay: {
      badge: '⚡ 2.3s Catering & Order AI',
      message:
        '"Good morning! We can have 2 dozen warm brisket kolaches + a 96oz coffee tote ready at 7:30 AM ($74 total). Reply YES to lock in your pickup time!"',
      outcome: '✓ $145 Catering Order + 5★ Review'
    },
    highlights: [
      'Captures high-margin corporate catering, event, and custom orders 24/7 by text',
      'Answers everyday hours, menu, and availability questions without tying up staff',
      'Turns happy daily customers into hundreds of 5-star Google reviews automatically',
      'Brings regulars back on slow days with VIP text specials'
    ]
  }
];

const VSL_CHAPTERS = [
  {
    time: '0:00',
    timecodeDisplay: '00:42 / 05:12',
    progressPct: 25,
    tag: 'CHAPTER 1 • 0:00 • SMART SITE + INSTANT SMS',
    heading: '1. Custom AI Smart Site + 3-Second Text Follow-Up',
    desc: 'Instead of a brochure website where 92% of visitors leave without calling, your Smart Site starts a live text conversation within 3 seconds, collects job photos, and books qualified estimates automatically.',
    image: 'demos/remodel-1.webp',
    bullets: [
      '✓ Custom-built for your business to pre-screen leads and showcase your best work',
      '✓ Starts an instant 3-second text conversation to capture name, phone & project details',
      '✓ Works on autopilot 24/7, or pauses automatically during office hours so your team can reply'
    ]
  },
  {
    time: '1:18',
    timecodeDisplay: '01:54 / 05:12',
    progressPct: 50,
    tag: 'CHAPTER 2 • 1:18 • 5-STAR GOOGLE REVIEW ENGINE',
    heading: '2. Automated 5-Star Google Review Engine',
    desc: 'Every happy customer receives a polite, conversational text right after their job or visit with a direct 1-tap Google review link, while your site highlights your best 5-star reviews upfront.',
    image: 'demos/local-cafe.webp',
    bullets: [
      '✓ 1-Tap SMS review invites sent automatically after completed jobs or visits',
      '✓ Private feedback routing alerts you directly if a customer ever has an issue',
      '✓ Helps you outrank local competitors on Google Maps and local search'
    ]
  },
  {
    time: '2:34',
    timecodeDisplay: '03:10 / 05:12',
    progressPct: 75,
    tag: 'CHAPTER 3 • 2:34 • MISSED-CALL AI TEXT RESCUE',
    heading: '3. 3-Second Missed-Call AI Text Rescue (Never Lose a Lead)',
    desc: 'When you are on a roof, with a client, or busy at the counter and miss a phone call, our AI immediately texts the caller back within 3 seconds, answers their questions, and books them onto your calendar.',
    image: 'demos/remodel-2.webp',
    bullets: [
      '✓ Instant SMS text-back within 3 seconds of any missed phone call',
      '✓ Trained on your exact services, ballpark price ranges & service area',
      '✓ Stops leads from calling the next competitor on Google'
    ]
  },
  {
    time: '3:45',
    timecodeDisplay: '04:38 / 05:12',
    progressPct: 100,
    tag: 'CHAPTER 4 • 3:45 • TWO SIMPLE WAYS TO OWN',
    heading: '4. 12-Month Rent-to-Own ($297/mo) or Buy It Outright ($2,400)',
    desc: 'Most agencies charge $5,000+ upfront or hold your website hostage forever. With Tiberius Smart Sites, every dollar goes toward ownership: pay monthly for 12 months with Rent-to-Own ($297/mo) or buy it outright from Day 1 ($2,400).',
    image: 'demos/pro-services.webp',
    bullets: [
      '✓ $297/mo 12-Month Rent-to-Own: $0 setup fee, then you own your website outright after 12 months',
      '✓ $2,400 Buy It Outright: You own your website from Day 1 with zero monthly lease payments',
      '✓ Keep our optional $100/mo Web & AI Care Plan after payoff, or move your website to your own hosting account'
    ]
  }
];

// Global state for the funnel
const state = {
  locationTag: 'national',
  selectedIndustry: '',
  selectedOwnership: '$297/mo 12-Month Rent-to-Own',
  selectedDemo: null,
  activeFilter: 'all',
  step2Unlocked: false,
  activeChapterIdx: 0,
  vslPlaying: true,
  bookingDay: 'Tomorrow',
  bookingTime: '2:00 PM CT'
};

window.__TIBERIUS_LEADS__ = window.__TIBERIUS_LEADS__ || [];
window.DEMO_SITES = DEMO_SITES;

const STRIPE_SMART_SITE_LINKS = {
  rentToOwn297: 'https://buy.stripe.com/dRm7sMggXc5leDkbnv2sM0q',
  buyOutright2400: 'https://buy.stripe.com/4gM7sM9Szd9p2UC4Z72sM0r',
  buyOutrightWithCare: 'https://buy.stripe.com/14A00kaWD1qH66Obnv2sM0s',
  carePlan100: 'https://buy.stripe.com/aFabJ2aWD3yP52K3V32sM0t'
};

window.STRIPE_SMART_SITE_LINKS = STRIPE_SMART_SITE_LINKS;

function extractCleanEmail(rawInput) {
  if (!rawInput) return '';
  const match = String(rawInput).match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return match ? match[0] : '';
}

function buildStripeHref(baseUrl, emailVal) {
  const cleanEmail = extractCleanEmail(emailVal);
  if (!cleanEmail) return baseUrl;
  const sep = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${sep}prefilled_email=${encodeURIComponent(cleanEmail)}`;
}

function applyStripeEmailPrefill(rawEmailInput) {
  const cleanEmail = extractCleanEmail(rawEmailInput);
  state.leadEmail = cleanEmail || state.leadEmail || '';

  const rentCta = document.getElementById('stripe-cta-rent-to-own');
  const buyCta = document.getElementById('stripe-cta-buy-outright');
  const careCta = document.getElementById('stripe-cta-care-plan');
  const step2RentCta = document.getElementById('step2-stripe-rent-link');
  const step2BuyCta = document.getElementById('step2-stripe-buy-link');
  const careCheckbox = document.getElementById('buy-outright-care-checkbox');
  const includeCare = Boolean(careCheckbox && careCheckbox.checked);

  const buyBaseUrl = includeCare
    ? STRIPE_SMART_SITE_LINKS.buyOutrightWithCare
    : STRIPE_SMART_SITE_LINKS.buyOutright2400;

  if (rentCta) {
    rentCta.href = buildStripeHref(STRIPE_SMART_SITE_LINKS.rentToOwn297, state.leadEmail);
  }
  if (buyCta) {
    buyCta.href = buildStripeHref(buyBaseUrl, state.leadEmail);
  }
  if (careCta) {
    careCta.href = buildStripeHref(STRIPE_SMART_SITE_LINKS.carePlan100, state.leadEmail);
  }
  if (step2RentCta) {
    step2RentCta.href = buildStripeHref(STRIPE_SMART_SITE_LINKS.rentToOwn297, state.leadEmail);
  }
  if (step2BuyCta) {
    step2BuyCta.href = buildStripeHref(buyBaseUrl, state.leadEmail);
  }
}

/* ============================================================================
   1. SILENT URL AD VARIATIONS (?loc=nb | ?v=nb | ?loc=tx | ?v=tx | ?loc=national)
   ============================================================================ */
function normalizeGeoKey(rawParam) {
  const val = (rawParam || '').toLowerCase().trim();
  if (val === 'nb') return 'nb';
  if (val === 'tx') return 'tx';
  if (val === 'national' || val === 'default') return 'national';
  return 'national';
}

function applyGeoLocation(locParam, persistSession = true) {
  const key = normalizeGeoKey(locParam);
  state.locationTag = key;

  if (persistSession) {
    try {
      sessionStorage.setItem('tiberius_ad_loc', key);
    } catch (_err) {
      // Ignore storage restrictions
    }
  }

  const geoTextEl = document.getElementById('dynamic-geo-text');
  if (geoTextEl) {
    geoTextEl.textContent = GEO_COPY_MAP[key] || GEO_COPY_MAP.national;
  }

  const nbBanner = document.getElementById('nb-local-banner');
  if (nbBanner) {
    nbBanner.hidden = key !== 'nb';
  }

  const txBanner = document.getElementById('tx-local-banner');
  if (txBanner) {
    txBanner.hidden = key !== 'tx';
  }

  const smsCopy = GEO_SMS_MAP[key] || GEO_SMS_MAP.national;
  const alertPillEl = document.getElementById('hero-sms-alert-pill');
  if (alertPillEl && smsCopy.alertPill) {
    alertPillEl.textContent = smsCopy.alertPill;
  }

  const userBubbleEl = document.getElementById('hero-sms-user-bubble');
  if (userBubbleEl && smsCopy.userBubble) {
    userBubbleEl.textContent = smsCopy.userBubble;
  }
}

function initGeoDetection() {
  const params = new URLSearchParams(window.location.search);
  const cleanPath = (window.location.pathname || '').replace(/^\/+|\/+$/g, '').toLowerCase();
  const pathLoc = cleanPath === 'nb' || cleanPath === 'tx' ? cleanPath : null;
  const urlLoc = params.get('loc') || params.get('v') || pathLoc;

  if (urlLoc) {
    applyGeoLocation(urlLoc, true);
  } else {
    let savedLoc = null;
    try {
      savedLoc = sessionStorage.getItem('tiberius_ad_loc');
    } catch (_err) {
      savedLoc = null;
    }
    applyGeoLocation(savedLoc || 'national', false);
  }

  // Only show footer debug/location controls if ?debug=true is in the URL
  const debugControls = document.getElementById('footer-debug-controls');
  if (debugControls) {
    const isDebug = params.get('debug') === 'true';
    debugControls.hidden = !isDebug;
    if (isDebug) {
      debugControls.querySelectorAll('[data-debug-loc]').forEach((btn) => {
        btn.addEventListener('click', () => {
          applyGeoLocation(btn.getAttribute('data-debug-loc'), true);
        });
      });
    }
  }
}

window.applyGeoLocation = applyGeoLocation;

/* ============================================================================
   1B. TOP NAVBAR: LEGAL DROPDOWN & MOBILE HAMBURGER DRAWER
   ============================================================================ */
function initNavbarControls() {
  const legalBtn = document.getElementById('legal-dropdown-btn');
  const legalMenu = document.getElementById('legal-dropdown-menu');
  const legalDropdown = document.getElementById('legal-nav-dropdown');

  function closeLegalDropdown() {
    if (!legalBtn || !legalMenu) return;
    legalBtn.setAttribute('aria-expanded', 'false');
    legalMenu.hidden = true;
    if (legalDropdown) legalDropdown.classList.remove('is-open');
  }

  function toggleLegalDropdown(e) {
    e.stopPropagation();
    if (!legalBtn || !legalMenu) return;
    const isExpanded = legalBtn.getAttribute('aria-expanded') === 'true';
    const nextState = !isExpanded;
    legalBtn.setAttribute('aria-expanded', nextState ? 'true' : 'false');
    legalMenu.hidden = !nextState;
    if (legalDropdown) legalDropdown.classList.toggle('is-open', nextState);
  }

  if (legalBtn && legalMenu) {
    legalBtn.addEventListener('click', toggleLegalDropdown);
  }

  document.addEventListener('click', (e) => {
    if (legalDropdown && !legalDropdown.contains(e.target)) {
      closeLegalDropdown();
    }
  });

  // Mobile Hamburger Menu Drawer
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');

  function closeMobileMenu() {
    if (!mobileToggle || !mobileDrawer) return;
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.classList.remove('is-active');
    mobileDrawer.hidden = true;
  }

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      const nextState = !isExpanded;
      mobileToggle.setAttribute('aria-expanded', nextState ? 'true' : 'false');
      mobileToggle.classList.toggle('is-active', nextState);
      mobileDrawer.hidden = !nextState;
    });

    mobileDrawer.querySelectorAll('a, button').forEach((item) => {
      item.addEventListener('click', () => {
        closeMobileMenu();
      });
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLegalDropdown();
      closeMobileMenu();
    }
  });
}

/* ============================================================================
   2. THE 2-STEP "50% PROGRESS" POPUP MODAL
   ============================================================================ */
function setModalSlide(slideNumber) {
  const slide1 = document.getElementById('modal-slide-1');
  const slide2 = document.getElementById('modal-slide-2');
  const progressFill = document.getElementById('modal-progress-fill');
  const progressLabel = document.getElementById('modal-progress-label');

  if (!slide1 || !slide2 || !progressFill || !progressLabel) return;

  if (slideNumber === 1) {
    slide1.hidden = false;
    slide2.hidden = true;
    progressFill.style.width = '50%';
    progressLabel.textContent = '50%';
  } else {
    slide1.hidden = true;
    slide2.hidden = false;
    // Animate smoothly from 50% to 85%
    requestAnimationFrame(() => {
      progressFill.style.width = '85%';
      progressLabel.textContent = '85%';
    });
    const nameInput = document.getElementById('lead-name');
    if (nameInput) {
      setTimeout(() => nameInput.focus(), 80);
    }
  }
}

function openLeadModal({ demoId = null, presetOwnership = null } = {}) {
  const modal = document.getElementById('lead-popup-modal');
  const demoPill = document.getElementById('modal-selected-demo-pill');
  const demoNameEl = document.getElementById('modal-selected-demo-name');

  if (!modal) return;

  if (demoId) {
    const foundDemo = DEMO_SITES.find((d) => d.id === demoId);
    state.selectedDemo = foundDemo ? foundDemo.id : demoId;
    if (foundDemo && demoPill && demoNameEl) {
      demoNameEl.textContent = foundDemo.categoryLabel;
      demoPill.hidden = false;
    }
  } else {
    state.selectedDemo = null;
    if (demoPill) demoPill.hidden = true;
  }

  if (presetOwnership) {
    selectOwnershipPill(presetOwnership);
  }

  setModalSlide(1);
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeLeadModal() {
  const modal = document.getElementById('lead-popup-modal');
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = '';
}

function applySelectedPlanHighlight(ownershipValue) {
  const raw = String(ownershipValue || state.selectedOwnership || '$297/mo 12-Month Rent-to-Own');
  const isBuyOutright =
    raw.toLowerCase().includes('2,400') ||
    raw.toLowerCase().includes('2400') ||
    raw.toLowerCase().includes('outright');

  const canonicalPlan = isBuyOutright
    ? '$2,400 Buy It Outright'
    : '$297/mo 12-Month Rent-to-Own';

  state.selectedOwnership = canonicalPlan;

  const rentCard = document.getElementById('pricing-card-rent');
  const buyCard = document.getElementById('pricing-card-buy');
  const rentBadge = document.getElementById('selected-badge-rent');
  const buyBadge = document.getElementById('selected-badge-buy');

  if (rentCard) {
    rentCard.classList.toggle('is-user-selected', !isBuyOutright);
  }
  if (buyCard) {
    buyCard.classList.toggle('is-user-selected', isBuyOutright);
  }
  if (rentBadge) {
    rentBadge.hidden = isBuyOutright;
  }
  if (buyBadge) {
    buyBadge.hidden = !isBuyOutright;
  }
}

function selectOwnershipPill(ownershipValue) {
  state.selectedOwnership = ownershipValue;
  document.querySelectorAll('.ownership-pill').forEach((pill) => {
    const isMatch = pill.getAttribute('data-ownership') === ownershipValue;
    pill.classList.toggle('is-selected', isMatch);
    pill.setAttribute('aria-checked', isMatch ? 'true' : 'false');
  });
  applySelectedPlanHighlight(ownershipValue);
}

function unlockStep2View({ lead = null, scrollIntoView = true } = {}) {
  state.step2Unlocked = true;
  const step2Section = document.getElementById('step-2-unlocked');
  const greetingEl = document.getElementById('unlocked-personal-greeting');
  const toggleBtn = document.getElementById('preview-step-2-toggle');

  if (step2Section) {
    step2Section.hidden = false;
  }

  if (lead && lead.ownershipPreference) {
    applySelectedPlanHighlight(lead.ownershipPreference);
  }

  if (greetingEl) {
    const firstName = lead && lead.name ? String(lead.name).trim().split(/\s+/)[0] : '';
    greetingEl.textContent = firstName
      ? `WELCOME ${firstName.toUpperCase()} • LIVE 3-SEC AI TEXT SENT + CUSTOM MOCK-UP QUEUED`
      : 'STEP 2 UNLOCKED • LIVE 3-SEC AI TEXT SENT + CUSTOM MOCK-UP QUEUED';
  }

  if (toggleBtn) {
    toggleBtn.textContent = '✓ Step 2 Unlocked (Jump to Walkthrough)';
  }

  // Hydrate saved lead email for Stripe prefill
  if (lead && lead.email) {
    applyStripeEmailPrefill(lead.email);
  }

  if (scrollIntoView && step2Section) {
    setTimeout(() => {
      step2Section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
}

function hydrateWatchPageLeadContext() {
  const params = new URLSearchParams(window.location.search);
  let savedLead = null;
  try {
    const raw = localStorage.getItem('tiberius_latest_lead');
    if (raw) savedLead = JSON.parse(raw);
  } catch (_err) {
    savedLead = null;
  }

  const urlName = params.get('name');
  const urlPhone = params.get('phone');
  const urlEmail = params.get('email');
  const urlIndustry = params.get('industry');
  const urlPlan = params.get('plan');
  const urlDemo = params.get('demo');

  const hasUrlLeadParams = Boolean(urlName || urlPhone || urlEmail || urlIndustry || urlPlan);

  const mergedLead = {
    industry:
      urlIndustry ||
      (savedLead && savedLead.industry) ||
      'Home Services & Contracting (Remodel, Roof, Trades)',
    name: urlName || (savedLead && savedLead.name) || '',
    phone: urlPhone || (savedLead && savedLead.phone) || '',
    email: urlEmail || (savedLead && savedLead.email) || '',
    ownershipPreference:
      urlPlan ||
      (savedLead && savedLead.ownershipPreference) ||
      '$297/mo 12-Month Rent-to-Own',
    locationTag: state.locationTag || (savedLead && savedLead.locationTag) || 'national',
    selectedDemo: urlDemo || (savedLead && savedLead.selectedDemo) || null,
    timestamp: (savedLead && savedLead.timestamp) || new Date().toISOString()
  };

  if (hasUrlLeadParams) {
    try {
      localStorage.setItem('tiberius_latest_lead', JSON.stringify(mergedLead));
    } catch (_err) {
      // Ignore storage errors
    }
  }

  applySelectedPlanHighlight(mergedLead.ownershipPreference);

  if (mergedLead.name || mergedLead.phone || mergedLead.email) {
    unlockStep2View({ lead: mergedLead, scrollIntoView: false });
  }
}

function initModalHandlers() {
  // Open triggers (Video Gate, Main CTA, Header CTA, Showcase CTAs)
  document.querySelectorAll('.js-open-modal').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      openLeadModal();
    });
    if (trigger.getAttribute('role') === 'button') {
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLeadModal();
        }
      });
    }
  });

  // Close button & backdrop click
  const closeBtn = document.getElementById('popup-close-btn');
  const modalBackdrop = document.getElementById('lead-popup-modal');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLeadModal);
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeLeadModal();
    });
  }

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLeadModal();
      closeLightbox();
    }
  });

  // Slide 1: 4 Industry Selection Buttons -> Immediately advance to Slide 2 (85%)
  document.querySelectorAll('.industry-option-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.selectedIndustry = btn.getAttribute('data-industry') || btn.textContent.trim();
      setModalSlide(2);
    });
  });

  // Slide 2: Back link
  const backBtn = document.getElementById('modal-back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => setModalSlide(1));
  }

  // Slide 2: 3-Pill Ownership Selector
  document.querySelectorAll('.ownership-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      selectOwnershipPill(pill.getAttribute('data-ownership'));
    });
  });

  // Slide 2: Form Submit -> Save inputs to localStorage/URL params, fire webhook, and redirect to watch.html
  const leadForm = document.getElementById('modal-lead-form');
  if (leadForm) {
    leadForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('lead-name').value.trim();
      const phone = document.getElementById('lead-phone').value.trim();
      const email = document.getElementById('lead-email').value.trim();

      const leadPayload = {
        industry: state.selectedIndustry || 'Home Services & Contracting (Remodel, Roof, Trades)',
        name,
        phone,
        email,
        ownershipPreference: state.selectedOwnership || '$297/mo 12-Month Rent-to-Own',
        locationTag: state.locationTag || 'default',
        selectedDemo: state.selectedDemo || null,
        timestamp: new Date().toISOString()
      };

      // Log & persist lead payload
      console.log('[Tiberius Smart Sites Lead Captured]', leadPayload);
      window.__TIBERIUS_LEADS__.push(leadPayload);
      try {
        localStorage.setItem('tiberius_latest_lead', JSON.stringify(leadPayload));
      } catch (_err) {
        // Ignore storage errors
      }

      // Build URL parameters for Step 2 (watch.html)
      const watchParams = new URLSearchParams();
      watchParams.set('industry', leadPayload.industry);
      watchParams.set('name', leadPayload.name);
      watchParams.set('phone', leadPayload.phone);
      watchParams.set('email', leadPayload.email);
      watchParams.set('plan', leadPayload.ownershipPreference);
      if (leadPayload.locationTag && leadPayload.locationTag !== 'default' && leadPayload.locationTag !== 'national') {
        watchParams.set('loc', leadPayload.locationTag);
      }
      if (leadPayload.selectedDemo) {
        watchParams.set('demo', leadPayload.selectedDemo);
      }

      const submitBtn = document.getElementById('modal-submit-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '⚡ Sending Live AI Text & Unlocking Video...';
      }

      // Fire webhook POST to /api/lead with keepalive before redirecting
      try {
        await Promise.race([
          fetch('/api/lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadPayload),
            keepalive: true
          }),
          new Promise((resolve) => setTimeout(resolve, 1800))
        ]);
      } catch (_err) {
        // Non-blocking fallback
      }

      closeLeadModal();
      window.location.href = `watch.html?${watchParams.toString()}`;
    });
  }
}

/* ============================================================================
   2B. ON-PAGE 3-SECOND AI TEXT RESCUE SIMULATOR (HOME PAGE)
   ============================================================================ */
function initSmsSimulatorControls() {
  const simForm = document.getElementById('instant-sms-test-form');
  const phoneInput = document.getElementById('sms-test-phone');
  const nicheSelect = document.getElementById('sms-test-niche');
  const consoleBody = document.getElementById('sms-console-body');

  if (!simForm || !phoneInput || !consoleBody) return;

  simForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const phone = phoneInput.value.trim();
    const industry = (nicheSelect && nicheSelect.value) || 'Remodeling & Contracting';
    if (!phone) return;

    const submitBtn = simForm.querySelector('.sms-trigger-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = '⚡ Dispatching 3-Second AI Text...';
    }

    consoleBody.innerHTML = `
      <div class="console-line">[0.2s] 📞 Simulated missed call / web inquiry from <strong>${phone}</strong> (${industry})...</div>
      <div class="console-line">[0.9s] 🧠 Tiberius AI Agent drafting instant response + queuing custom mock-up...</div>
    `;

    try {
      const resp = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'home-3-sec-sms-simulator',
          phone,
          industry,
          locationTag: state.locationTag || 'default'
        })
      });
      const data = await resp.json().catch(() => ({}));
      const preview =
        (data && data.smsPreview) ||
        `⚡ Tiberius 3-Second AI Text Demo (${industry}): Boom—delivered in under 3 seconds! Want us to make a custom mock-up site for your business to try out soon? Reply with your business name + what you do!`;

      consoleBody.innerHTML += `
        <div class="console-line console-highlight">[2.1s] ✓ SMS DISPATCHED TO ${phone}: "${preview}"</div>
        <div class="console-line">[READY] 📲 Check your phone &amp; reply with your business type to test the 2-way AI reply!</div>
      `;
    } catch (_err) {
      consoleBody.innerHTML += `
        <div class="console-line console-highlight">[2.1s] ✓ SMS QUEUED FOR ${phone} — Check your mobile device!</div>
      `;
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = '✓ Sent! Fire Another 3-Second AI Text Test →';
      }
    }
  });
}

/* ============================================================================
   3. BELOW THE FOLD: INTERACTIVE DEMO SITE SHOWCASE + LIGHTBOX
   ============================================================================ */
function renderDemoShowcase(filterKey = 'all') {
  state.activeFilter = filterKey;
  const grid = document.getElementById('demo-cards-grid');
  if (!grid) return;

  const filtered =
    filterKey === 'all'
      ? DEMO_SITES
      : DEMO_SITES.filter((site) => site.category === filterKey);

  grid.innerHTML = filtered
    .map(
      (site) => `
      <article class="demo-card" data-demo-id="${site.id}" data-category="${site.category}">
        <div
          class="dual-device-stage js-expand-demo"
          data-demo-id="${site.id}"
          role="button"
          tabindex="0"
          aria-label="Inspect full-screen preview of ${site.title}"
        >
          <div class="macbook-frame">
            <div class="macbook-topbar">
              <div class="browser-dots"><span></span><span></span><span></span></div>
              <span class="macbook-domain">${site.domain}</span>
              <span class="macbook-pan-hint">↕ Hover to Auto-Scroll</span>
            </div>
            <div class="macbook-screen-viewport">
              <img
                src="${site.image.replace(/^\//, '')}"
                alt="${site.title} Full-Page Preview"
                class="macbook-pan-img"
                loading="eager"
              />
            </div>
          </div>

          <div class="iphone-sms-overlay">
            <div class="mini-iphone-pill">
              <span class="mini-pill-dot"></span>
              <span>💬 3-Sec AI Text Reply • Hover to View</span>
            </div>
            <div class="mini-iphone-expanded">
              <div class="mini-iphone-header">
                <span>📱 iPhone AI Text</span>
                <span>${site.smsOverlay.badge}</span>
              </div>
              <div class="mini-sms-bubble">
                ${site.smsOverlay.message}
              </div>
              <div class="mini-sms-meta">
                <span>Tiberius AI</span>
                <span>${site.smsOverlay.outcome}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="demo-card-body">
          <div class="demo-card-tags">
            <span class="demo-cat-pill">${site.categoryLabel}</span>
            <span class="demo-rating-pill">${site.ratingText}</span>
          </div>
          <h3 class="demo-card-title">${site.title}</h3>
          <p class="demo-card-desc">${site.description}</p>
          <div class="demo-feature-chips">
            ${site.chips.map((c) => `<span class="demo-chip">${c}</span>`).join('')}
          </div>
          <div class="demo-card-actions">
            <button
              type="button"
              class="demo-expand-btn js-expand-demo"
              data-demo-id="${site.id}"
            >
              🔍 Expand Full Preview
            </button>
            <button
              type="button"
              class="demo-build-cta-btn js-build-like-this"
              data-demo-id="${site.id}"
            >
              Build a Site Like This →
            </button>
          </div>
        </div>
      </article>
    `
    )
    .join('');

  // Bind Lightbox Expand handlers
  grid.querySelectorAll('.js-expand-demo').forEach((el) => {
    el.addEventListener('click', () => {
      openLightbox(el.getAttribute('data-demo-id'));
    });
    if (el.getAttribute('role') === 'button') {
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(el.getAttribute('data-demo-id'));
        }
      });
    }
  });

  // Bind "Build a Site Like This" buttons -> Opens 50% Progress Popup Modal pre-tagged
  grid.querySelectorAll('.js-build-like-this').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const demoId = btn.getAttribute('data-demo-id');
      openLeadModal({ demoId });
    });
  });
}

function openLightbox(demoId) {
  const site = DEMO_SITES.find((d) => d.id === demoId);
  if (!site) return;

  const modal = document.getElementById('demo-lightbox-modal');
  const badge = document.getElementById('lightbox-category-badge');
  const title = document.getElementById('lightbox-title');
  const fullImg = document.getElementById('lightbox-full-img');
  const highlights = document.getElementById('lightbox-highlights');
  const smsThread = document.getElementById('lightbox-sms-thread');
  const claimBtn = document.getElementById('lightbox-claim-btn');
  const sidebarCta = document.getElementById('lightbox-sidebar-cta');

  if (!modal) return;

  state.selectedDemo = site.id;
  if (badge) badge.textContent = site.categoryLabel.toUpperCase();
  if (title) title.textContent = site.title;
  if (fullImg) {
    fullImg.src = site.image.replace(/^\//, '');
    fullImg.alt = `${site.title} Full Preview`;
  }
  if (highlights) {
    highlights.innerHTML = site.highlights.map((h) => `<li>✓ ${h}</li>`).join('');
  }
  if (smsThread) {
    smsThread.innerHTML = `
      <div class="sms-bubble sms-ai">${site.smsOverlay.message}</div>
      <div style="color:#4ADE80; font-weight:800; font-size:12px;">${site.smsOverlay.outcome}</div>
    `;
  }

  const triggerModalFromLightbox = () => {
    closeLightbox();
    openLeadModal({ demoId: site.id });
  };

  if (claimBtn) claimBtn.onclick = triggerModalFromLightbox;
  if (sidebarCta) sidebarCta.onclick = triggerModalFromLightbox;

  modal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('demo-lightbox-modal');
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = '';
}

function initShowcaseControls() {
  renderDemoShowcase('all');

  document.querySelectorAll('.filter-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const filterKey = tab.getAttribute('data-filter');
      document.querySelectorAll('.filter-tab').forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      renderDemoShowcase(filterKey);
    });
  });

  const lbClose = document.getElementById('lightbox-close-btn');
  const lbModal = document.getElementById('demo-lightbox-modal');
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbModal) {
    lbModal.addEventListener('click', (e) => {
      if (e.target === lbModal) closeLightbox();
    });
  }
}

/* ============================================================================
   4. UNLOCKED STEP 2 VIEW: LIVE WALKTHROUGH VIDEO + STYLED ON-PLAYER CAPTIONS
   ============================================================================ */
const VSL_CAPTIONS = [
  { start: 0.0, end: 2.6, html: 'Very cool—glad you made it over to <span class="vsl-cap-gold">Step 2!</span>' },
  { start: 2.6, end: 5.5, html: 'Since you just filled out that quick form on the last page,' },
  { start: 5.5, end: 10.2, html: 'keep an eye on your phone right now—you’re about to get a <span class="vsl-cap-green">live text message</span> from our system.' },
  { start: 10.2, end: 13.2, html: 'I wanted you to see that firsthand before we even dive in,' },
  { start: 13.2, end: 20.3, html: 'because what’s happening on your phone right now is the <span class="vsl-cap-gold">exact instant speed</span> your customers experience on your site.' },
  { start: 20.3, end: 25.3, html: 'Thing is, most local business websites have a <span class="vsl-cap-gold">massive problem</span> that nobody talks about.' },
  { start: 25.3, end: 29.8, html: 'They are expensive <span class="vsl-cap-gold">digital brochures</span> sitting on the internet collecting dust.' },
  { start: 29.8, end: 35.3, html: 'Business owners either pay thousands of dollars upfront for a pretty design that does nothing—or worse,' },
  { start: 35.3, end: 41.1, html: 'they get trapped paying every single month to some <span class="vsl-cap-gold">GoHighLevel reseller</span> on a cookie-cutter template' },
  { start: 41.1, end: 44.8, html: 'that just sits there, hoping somebody fills out a 10-line contact form.' },
  { start: 44.8, end: 49.6, html: 'Think about what actually happens during a normal workday when you’re out on a job site,' },
  { start: 49.6, end: 54.8, html: 'driving between estimates, or finally sitting down with your family for dinner.' },
  { start: 54.8, end: 60.5, html: 'A homeowner finds your business on Google, clicks on your site, and has <span class="vsl-cap-gold">one quick question</span> before they book.' },
  { start: 60.5, end: 64.5, html: 'Nobody wants to fill out an email form and wait <span class="vsl-cap-gold">two days</span> for a reply.' },
  { start: 64.5, end: 67.5, html: 'If they cannot get an answer and get on your schedule <span class="vsl-cap-green">right away</span>,' },
  { start: 67.5, end: 73.0, html: 'they bounce right back to Google, call the next contractor on the list, and <span class="vsl-cap-gold">that job is gone for good.</span>' },
  { start: 73.0, end: 79.5, html: 'Even worse, when you do knock a job out of the park, you get busy and forget to chase down the <span class="vsl-cap-gold">Google review.</span>' },
  { start: 79.5, end: 86.5, html: 'So a competitor with half your experience ends up outranking you on Google Maps simply because they have more <span class="vsl-cap-gold">5-star reviews.</span>' },
  { start: 86.5, end: 92.1, html: 'Once you see how many high-ticket jobs quietly leak out of a traditional website every single week,' },
  { start: 92.1, end: 94.6, html: 'it completely changes how you look at your business.' },
  { start: 94.6, end: 100.5, html: 'That is why we engineered <span class="vsl-cap-gold">Tiberius Smart Sites</span> from the ground up as true <span class="vsl-cap-green">functional websites.</span>' },
  { start: 100.5, end: 103.8, html: 'When you switch to a <span class="vsl-cap-green">functional website</span> built the Tiberius way,' },
  { start: 103.8, end: 107.8, html: 'your site stops acting like a poster on the wall—' },
  { start: 107.8, end: 112.6, html: 'and starts working like your sharpest <span class="vsl-cap-gold">24/7 sales rep, receptionist, and reputation manager</span> rolled into one.' },
  { start: 112.6, end: 116.8, html: 'It starts with <span class="vsl-cap-gold">superior AI lead capture</span> built by Tiberius.' },
  { start: 116.8, end: 121.4, html: 'The very second a visitor lands on your page, your site <span class="vsl-cap-green">actively engages with them.</span>' },
  { start: 121.4, end: 125.7, html: 'It qualifies the scope of their project and captures their details <span class="vsl-cap-green">on the spot</span>—' },
  { start: 125.7, end: 128.1, html: 'instead of waiting on a boring contact form.' },
  { start: 128.1, end: 133.0, html: 'Plus, you have an <span class="vsl-cap-gold">AI voice receptionist</span> ready to pick up the phone whenever your hands are full,' },
  { start: 133.0, end: 136.7, html: 'answering customer questions and <span class="vsl-cap-green">booking appointments</span> straight onto your calendar' },
  { start: 136.7, end: 139.6, html: 'while your competitors are still letting calls roll to voicemail.' },
  { start: 139.6, end: 143.8, html: 'Then comes the <span class="vsl-cap-gold">follow-up magic</span>—and this is the part that totally kicks ass!' },
  { start: 143.8, end: 149.6, html: 'Seriously, this is where business owners see the <span class="vsl-cap-green">biggest jump in booked jobs</span> right out of the gate.' },
  { start: 149.6, end: 157.9, html: 'Huge numbers of estimates go cold simply because nobody has the bandwidth to call and text every prospect 5 or 6 times while running a crew.' },
  { start: 157.9, end: 164.1, html: 'Just like the text that hit your phone a minute ago, our functional websites handle all of that <span class="vsl-cap-gold">follow-up magic automatically.</span>' },
  { start: 164.1, end: 169.0, html: 'Every web inquiry, every single conversation, and every pending quote gets nurtured' },
  { start: 169.0, end: 174.0, html: 'with natural, well-timed <span class="vsl-cap-green">text and email check-ins</span> until they book the job on your schedule.' },
  { start: 174.0, end: 177.7, html: 'You never have to wake up at midnight wondering who you forgot to call back.' },
  { start: 177.7, end: 179.8, html: 'Oh, wait a sec—almost forgot!' },
  { start: 179.8, end: 184.9, html: 'You need more <span class="vsl-cap-gold">5-star reviews</span>, right? Well, we got you covered, and we’re going to town!' },
  { start: 184.9, end: 192.8, html: 'To keep the whole engine feeding itself every month, we build <span class="vsl-cap-green">automated 5-star review generation</span> right into your daily workflow.' },
  { start: 192.8, end: 198.5, html: 'The moment you wrap up a job, a quick automated request goes straight to your customer’s phone asking how everything went.' },
  { start: 198.5, end: 204.7, html: 'Happy customers get guided directly to your Google Business Profile to drop a <span class="vsl-cap-gold">5-star review in 30 seconds flat,</span>' },
  { start: 204.7, end: 211.0, html: 'while any private concerns get routed <span class="vsl-cap-green">straight to you first</span>, so you can make things right before they touch the public internet.' },
  { start: 211.0, end: 215.8, html: 'As those <span class="vsl-cap-gold">5-star reviews</span> stack up week after week, Google pushes your business higher up the local Map Pack,' },
  { start: 215.8, end: 220.3, html: 'sending even more <span class="vsl-cap-green">high-intent traffic</span> right back into your site.' },
  { start: 220.3, end: 222.4, html: 'I mean, how cool is that? Okay—' },
  { start: 222.4, end: 228.5, html: 'here is the <span class="vsl-cap-gold">biggest advantage</span> of building the Tiberius way instead of signing up with a typical marketing agency.' },
  { start: 228.5, end: 232.8, html: 'Most <span class="vsl-cap-gold">GoHighLevel resellers</span>—and those guys are everywhere, right?—' },
  { start: 232.8, end: 236.6, html: 'what they do is <span class="vsl-cap-gold">lock you into renting</span> their template forever.' },
  { start: 236.6, end: 240.9, html: 'You pay them month after month for years, and the second you decide to stop paying,' },
  { start: 240.9, end: 244.9, html: 'they pull the plug and <span class="vsl-cap-gold">hold your website hostage</span>—leaving you with nothing.' },
  { start: 244.9, end: 250.0, html: 'Absolutely nothing. And quite frankly, that does suck. But get this:' },
  { start: 250.0, end: 254.9, html: 'What we at Tiberius believe is that you should actually <span class="vsl-cap-green">own your digital real estate,</span>' },
  { start: 254.9, end: 258.8, html: 'because your <span class="vsl-cap-gold">Tiberius Smart Site</span> is an investment in your business growth.' },
  { start: 258.8, end: 262.6, html: 'And that is why we give you <span class="vsl-cap-green">two simple paths to complete ownership.</span>' },
  { start: 262.6, end: 267.8, html: 'One: you can buy your custom Smart Site outright from Day 1 for <span class="vsl-cap-green">$2,400</span>,' },
  { start: 267.8, end: 272.2, html: 'which <span class="vsl-cap-gold">saves you over $1,100</span> and eliminates monthly lease payments completely.' },
  { start: 272.2, end: 275.8, html: 'Or two: if you want to keep more cash in your pocket upfront,' },
  { start: 275.8, end: 280.7, html: 'you can start on our <span class="vsl-cap-gold">12-month Rent-to-Own plan</span> for just <span class="vsl-cap-green">$297 a month.</span>' },
  { start: 280.7, end: 284.2, html: 'With Rent-to-Own, we launch your custom build in <span class="vsl-cap-green">7 days.</span>' },
  { start: 284.2, end: 290.2, html: 'You can buy it out anytime you want, and after 12 payments, <span class="vsl-cap-gold">that website is 100% yours to keep.</span>' },
  { start: 290.2, end: 293.7, html: 'Best of all, this is a <span class="vsl-cap-green">completely risk-free investment.</span>' },
  { start: 293.7, end: 298.3, html: 'Every build is backed by our <span class="vsl-cap-green">🛡️ 30-Day 100% Money-Back Guarantee.</span>' },
  { start: 298.3, end: 302.1, html: 'And that’s for both plans—doesn’t matter, <span class="vsl-cap-gold">your investment is safe.</span>' },
  { start: 302.1, end: 306.4, html: 'For example, you can start with the <span class="vsl-cap-green">$297 Rent-to-Own plan</span> today,' },
  { start: 306.4, end: 310.0, html: 'let us build and launch your custom functional website in <span class="vsl-cap-gold">7 days,</span>' },
  { start: 310.0, end: 312.8, html: 'and test-drive the entire system for a <span class="vsl-cap-green">full month.</span>' },
  { start: 312.8, end: 316.9, html: 'If you are not thrilled with the build and the leads it captures in your first 30 days,' },
  { start: 316.9, end: 321.4, html: 'we <span class="vsl-cap-green">refund your $297 in full</span> with no hard feelings.' },
  { start: 321.4, end: 324.5, html: 'But deep down, you know that’s not going to happen, right?' },
  { start: 324.5, end: 329.7, html: '<span class="vsl-cap-gold">Tiberius is the best</span>, and you’re going to see some serious move-the-needle results—no doubt about it.' },
  { start: 329.7, end: 334.4, html: 'When you combine <span class="vsl-cap-gold">functional websites</span> with superior AI lead capture,' },
  { start: 334.4, end: 339.0, html: 'relentless follow-up magic, <span class="vsl-cap-gold">automated 5-star reviews</span>, and <span class="vsl-cap-green">true ownership,</span>' },
  { start: 339.0, end: 345.6, html: 'you stop chasing leads by hand and let your website <span class="vsl-cap-green">fill your calendar</span>—while you focus on what you do best.' },
  { start: 345.6, end: 348.5, html: 'So here is all you need to do <span class="vsl-cap-gold">right now:</span>' },
  { start: 348.5, end: 353.3, html: 'Look right below this video, where we already highlighted the option you picked on the last page.' },
  { start: 353.3, end: 360.6, html: 'Choose whether you want to start on the <span class="vsl-cap-green">$297/mo Rent-to-Own plan</span>, or buy your site outright to <span class="vsl-cap-gold">save over $1,100.</span>' },
  { start: 360.6, end: 363.7, html: 'And after that, just <span class="vsl-cap-green">click the button below</span> to lock in your build.' },
  { start: 363.7, end: 368.1, html: 'Now, the second you complete that checkout, <span class="vsl-cap-gold">two things happen immediately:</span>' },
  { start: 368.1, end: 375.3, html: 'First, you’ll go straight to a quick <span class="vsl-cap-green">2-minute onboarding page</span> where we grab your logo, service areas, and calendar preferences' },
  { start: 375.3, end: 378.2, html: 'so you do not have to lift a finger on the tech side.' },
  { start: 378.2, end: 382.4, html: 'Second, my team gets to work right away, and within the next <span class="vsl-cap-green">7 days,</span>' },
  { start: 382.4, end: 386.9, html: 'we will hand you the keys to your brand-new <span class="vsl-cap-gold">functional website</span>—completely live,' },
  { start: 386.9, end: 391.5, html: 'wired up to your phone, and backed by our full <span class="vsl-cap-green">30-Day Money-Back Guarantee.</span>' },
  { start: 391.5, end: 397.0, html: 'So that’s it! Go ahead and <span class="vsl-cap-green">click your plan right below this video right now</span>, and let’s get your site built.' },
  { start: 397.0, end: 400.5, html: 'Thank you, and I will see you on the other side!' },
  { start: 400.5, end: 445.0, html: '👇 <span class="vsl-cap-gold">Select Your Plan Below</span> (<span class="vsl-cap-green">$297/mo Rent-to-Own</span> or <span class="vsl-cap-green">$2,400 Buy Outright</span>) • 30-Day Money-Back Guarantee' }
];

const VSL_CHAPTER_BREAKPOINTS = [
  { idx: 0, start: 0, label: 'CHAPTER 1 OF 4 • INSTANT SMS + FUNCTIONAL SITES' },
  { idx: 1, start: 112.8, label: 'CHAPTER 2 OF 4 • AI LEAD CAPTURE & FOLLOW-UP MAGIC' },
  { idx: 2, start: 180.0, label: 'CHAPTER 3 OF 4 • AUTOMATED 5-STAR REVIEW ENGINE' },
  { idx: 3, start: 228.7, label: 'CHAPTER 4 OF 4 • $297/MO RENT-TO-OWN & 30-DAY GUARANTEE' }
];

function formatVslTime(sec) {
  const s = Math.max(0, Math.floor(sec || 0));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${String(m).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
}

function selectVslChapter(idx, { seekVideo = false } = {}) {
  const chapter = VSL_CHAPTERS[idx] || VSL_CHAPTERS[0];
  state.activeChapterIdx = idx;

  document.querySelectorAll('.chapter-btn').forEach((btn, i) => {
    const active = i === idx;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
  });

  const videoEl = document.getElementById('watch-walkthrough-video');
  const statusPill = document.getElementById('vsl-playing-indicator');
  const timecodeEl = document.getElementById('vsl-timecode-display');
  const tagEl = document.getElementById('vsl-chapter-tag');
  const headingEl = document.getElementById('vsl-chapter-heading');
  const descEl = document.getElementById('vsl-chapter-desc');
  const bulletsEl = document.getElementById('vsl-chapter-bullets');
  const imgEl = document.getElementById('vsl-chapter-img');
  const scrubberFill = document.getElementById('vsl-scrubber-fill');

  if (videoEl && seekVideo) {
    const bp = VSL_CHAPTER_BREAKPOINTS[idx] || VSL_CHAPTER_BREAKPOINTS[0];
    try {
      videoEl.currentTime = bp.start;
      videoEl.play().catch(() => {});
    } catch (_err) {
      // Ignore seek before metadata ready
    }
  }

  const bpMeta = VSL_CHAPTER_BREAKPOINTS[idx] || VSL_CHAPTER_BREAKPOINTS[0];
  if (statusPill) {
    const isPlaying = videoEl ? !videoEl.paused : state.vslPlaying;
    statusPill.textContent = `${isPlaying ? '🔊 PLAYING WALKTHROUGH' : '⏸ PAUSED'} • ${bpMeta.label}`;
  }
  if (!videoEl && timecodeEl) timecodeEl.textContent = chapter.timecodeDisplay;
  if (tagEl) tagEl.textContent = chapter.tag;
  if (headingEl) headingEl.textContent = chapter.heading;
  if (descEl) descEl.textContent = chapter.desc;
  if (imgEl) imgEl.src = chapter.image;
  if (scrubberFill) scrubberFill.style.width = `${chapter.progressPct}%`;
  if (bulletsEl) {
    bulletsEl.innerHTML = chapter.bullets.map((b) => `<li>${b}</li>`).join('');
  }
}

function initStep2Controls() {
  // Footer discreet "Preview Step 2" dev toggle
  const previewToggle = document.getElementById('preview-step-2-toggle');
  if (previewToggle) {
    previewToggle.addEventListener('click', () => {
      window.location.href = 'watch.html';
    });
  }

  // Live Video + Styled On-Player VSL Captions Synchronization
  const videoEl = document.getElementById('watch-walkthrough-video');
  const playOverlay = document.getElementById('watch-video-play-overlay');
  const captionStage = document.getElementById('vsl-styled-caption-stage');
  const captionBox = document.getElementById('vsl-styled-caption-box');
  const ccToggleBtn = document.getElementById('vsl-cc-toggle-btn');
  const ccToggleLabel = document.getElementById('vsl-cc-toggle-label');
  const timecodeEl = document.getElementById('vsl-timecode-display');
  const statusPill = document.getElementById('vsl-playing-indicator');

  let lastCaptionHtml = '';
  let captionsEnabled = true;

  function syncNativeTrackVisibility() {
    if (!videoEl || !videoEl.textTracks) return;
    for (let i = 0; i < videoEl.textTracks.length; i += 1) {
      // Keep native browser track hidden while custom styled captions are visible on stage
      videoEl.textTracks[i].mode = 'hidden';
    }
  }

  function updateVslCaptionForTime(t) {
    if (!captionBox) return;
    let activeCue = null;
    for (let i = 0; i < VSL_CAPTIONS.length; i += 1) {
      const cue = VSL_CAPTIONS[i];
      if (t >= cue.start && t <= cue.end) {
        activeCue = cue;
        break;
      }
    }
    if (!activeCue && t < VSL_CAPTIONS[0].start) {
      activeCue = VSL_CAPTIONS[0];
    }
    const nextHtml = activeCue ? activeCue.html : '';
    if (nextHtml && nextHtml !== lastCaptionHtml) {
      captionBox.innerHTML = nextHtml;
      lastCaptionHtml = nextHtml;
    }

    // Sync active chapter button based on current playback timestamp
    let chapterIdx = 0;
    for (let i = VSL_CHAPTER_BREAKPOINTS.length - 1; i >= 0; i -= 1) {
      if (t >= VSL_CHAPTER_BREAKPOINTS[i].start) {
        chapterIdx = VSL_CHAPTER_BREAKPOINTS[i].idx;
        break;
      }
    }
    if (chapterIdx !== state.activeChapterIdx) {
      selectVslChapter(chapterIdx, { seekVideo: false });
    }

    // Update timecode display (6:40 spoken walkthrough length or full video duration)
    if (timecodeEl) {
      const totalDur = videoEl && Number.isFinite(videoEl.duration) && videoEl.duration > 0 ? Math.min(videoEl.duration, 400) : 400;
      timecodeEl.textContent = `${formatVslTime(t)} / ${formatVslTime(totalDur)}`;
    }
  }

  if (videoEl) {
    syncNativeTrackVisibility();
    videoEl.addEventListener('loadedmetadata', () => {
      syncNativeTrackVisibility();
      updateVslCaptionForTime(videoEl.currentTime || 0);
    });
    videoEl.addEventListener('timeupdate', () => {
      updateVslCaptionForTime(videoEl.currentTime || 0);
    });
    videoEl.addEventListener('seeking', () => {
      updateVslCaptionForTime(videoEl.currentTime || 0);
    });
    videoEl.addEventListener('play', () => {
      state.vslPlaying = true;
      if (playOverlay) playOverlay.classList.add('is-hidden');
      const bp = VSL_CHAPTER_BREAKPOINTS[state.activeChapterIdx] || VSL_CHAPTER_BREAKPOINTS[0];
      if (statusPill) statusPill.textContent = `🔊 PLAYING WALKTHROUGH • ${bp.label}`;
    });
    videoEl.addEventListener('pause', () => {
      state.vslPlaying = false;
      const bp = VSL_CHAPTER_BREAKPOINTS[state.activeChapterIdx] || VSL_CHAPTER_BREAKPOINTS[0];
      if (statusPill) statusPill.textContent = `⏸ PAUSED • ${bp.label}`;
    });
  }

  if (playOverlay && videoEl) {
    playOverlay.addEventListener('click', () => {
      playOverlay.classList.add('is-hidden');
      videoEl.muted = false;
      videoEl.play().catch(() => {});
    });
  }

  if (ccToggleBtn && captionStage) {
    ccToggleBtn.addEventListener('click', () => {
      captionsEnabled = !captionsEnabled;
      ccToggleBtn.classList.toggle('is-active', captionsEnabled);
      ccToggleBtn.setAttribute('aria-pressed', captionsEnabled ? 'true' : 'false');
      captionStage.classList.toggle('is-cc-off', !captionsEnabled);
      if (ccToggleLabel) {
        ccToggleLabel.textContent = captionsEnabled ? 'Captions: ON' : 'Captions: OFF';
      }
    });
  }

  // Chapter buttons (Seek real video & update active chapter tab)
  document.querySelectorAll('.chapter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-chapter-idx'), 10) || 0;
      selectVslChapter(idx, { seekVideo: true });
    });
  });

  // Legacy Play/Pause & Next Chapter buttons (if present)
  const playToggleBtn = document.getElementById('vsl-play-toggle-btn');
  const nextChapterBtn = document.getElementById('vsl-next-chapter-btn');
  if (playToggleBtn) {
    playToggleBtn.addEventListener('click', () => {
      state.vslPlaying = !state.vslPlaying;
      playToggleBtn.textContent = state.vslPlaying ? '⏸ Pause Walkthrough' : '▶ Resume Walkthrough';
      selectVslChapter(state.activeChapterIdx);
    });
  }
  if (nextChapterBtn) {
    nextChapterBtn.addEventListener('click', () => {
      const nextIdx = (state.activeChapterIdx + 1) % VSL_CHAPTERS.length;
      selectVslChapter(nextIdx, { seekVideo: true });
    });
  }

  // Pricing Card Plan Selection -> Highlights plan & Scrolls to 24/7 AI Text Support (on watch.html) or Opens Modal
  document.querySelectorAll('.js-select-plan').forEach((btn) => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan');
      selectOwnershipPill(plan);
      const textSupportBlock = document.getElementById('text-us-support');
      if (textSupportBlock) {
        textSupportBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const qInput = document.getElementById('text-support-question-input');
        if (qInput) {
          setTimeout(() => qInput.focus(), 450);
        }
      } else {
        openLeadModal({ presetOwnership: plan });
      }
    });
  });

  // Buy Outright + Optional $100/mo Care Plan Checkbox Toggle
  const careCheckbox = document.getElementById('buy-outright-care-checkbox');
  const buyLabelEl = document.getElementById('stripe-label-buy-outright');
  const buyPeriodEl = document.getElementById('buy-outright-price-period');
  const buyTaglineEl = document.getElementById('buy-outright-tagline');
  const step2BuyCta = document.getElementById('step2-stripe-buy-link');

  function syncBuyOutrightCareMode() {
    const includeCare = Boolean(careCheckbox && careCheckbox.checked);
    if (buyLabelEl) {
      buyLabelEl.textContent = includeCare
        ? 'Buy Outright ($2,400) + $100/mo Care Plan →'
        : 'Buy My Website Outright for $2,400 →';
    }
    if (buyPeriodEl) {
      buyPeriodEl.textContent = includeCare ? 'one-time + $100/mo care' : 'one-time';
    }
    if (buyTaglineEl) {
      buyTaglineEl.innerHTML = includeCare
        ? '<strong>You own it from Day 1 + All Hosting, AI &amp; Texting Covered</strong>'
        : '<strong>You own it from Day 1</strong>';
    }
    if (step2BuyCta) {
      step2BuyCta.textContent = includeCare
        ? '⚡ Buy Outright + $100/mo Care Plan →'
        : '⚡ Buy Website Outright ($2,400) →';
    }
    applyStripeEmailPrefill(state.leadEmail || '');
  }

  if (careCheckbox) {
    careCheckbox.addEventListener('change', syncBuyOutrightCareMode);
  }

  // Hydrate saved lead email for Stripe prefill
  try {
    const savedLeadRaw = localStorage.getItem('tiberius_latest_lead');
    if (savedLeadRaw) {
      const savedLead = JSON.parse(savedLeadRaw);
      if (savedLead && savedLead.email) {
        applyStripeEmailPrefill(savedLead.email);
      }
    }
  } catch (_err) {
    // Ignore storage restrictions
  }

  // 24/7 Live AI Text Us Support Section (Zero Sales Calls)
  const textUsPrimaryBtn = document.getElementById('text-us-primary-btn');
  const textSupportForm = document.getElementById('text-support-form');
  const textQuestionInput = document.getElementById('text-support-question-input');
  const textPhoneInput = document.getElementById('text-support-phone-input');
  const textSupportThread = document.getElementById('text-support-thread');
  const textSupportConfirmMsg = document.getElementById('text-support-confirm-msg');

  const AI_CONCIERGE_TOPICS = [
    {
      id: 'vs-regular-websites',
      patterns: [
        /regular\s+web/i,
        /normal\s+web/i,
        /traditional\s+web/i,
        /standard\s+web/i,
        /other\s+web/i,
        /old\s+web/i,
        /brochure/i,
        /better\s+than/i,
        /different\s+from/i,
        /what\s+makes\s+(this|a\s+smart\s+site|your)/i,
        /why\s+is\s+this\s+better/i,
        /\b(wix|squarespace|wordpress|webflow|godaddy\s+builder)\b/i,
        /web\s+designer/i,
        /typical\s+agency/i,
        /why\s+smart\s+site/i,
        /what\s+is\s+a\s+smart\s+site/i
      ],
      reply:
        "Regular 'brochure' websites are passive—92% of visitors look around and leave without calling, and missed calls go straight to voicemail while you're on a job site. A Tiberius Smart Site actively turns web traffic and missed calls into booked jobs: (1) It greets visitors and starts a 2-way text conversation within 3 seconds, (2) Its ballpark/photo quote calculator collects project photos and pre-screens budgets before you ever roll a truck, (3) When you miss a phone call, it texts the caller back in 3 seconds so they don't call the next company on Google, and (4) It automatically texts happy customers 1-tap Google review links to rank you #1 locally."
    },
    {
      id: 'build-time-onboarding',
      patterns: [
        /7-day/i,
        /7\s+day/i,
        /how\s+much\s+of\s+my\s+time/i,
        /how\s+long\s+does/i,
        /build\s+take/i,
        /build\s+process/i,
        /onboarding/i,
        /auto-scan/i,
        /autoscan/i,
        /homework/i,
        /after\s+checkout/i,
        /how\s+do\s+we\s+start/i,
        /turnaround/i
      ],
      reply:
        'About 60 seconds of your time! Right after checkout, enter your business name or current website URL and our system auto-scans your logo, project photos, services, and best Google reviews—zero long forms or sales calls. Our Texas build team constructs your custom Smart Site and trains your AI agent over Days 2–5, then texts a private live preview link straight to your phone by Day 7.'
    },
    {
      id: 'existing-phone-number',
      patterns: [
        /keep\s+my/i,
        /existing\s+.*phone/i,
        /existing\s+.*number/i,
        /current\s+.*phone/i,
        /current\s+.*number/i,
        /my\s+business\s+phone/i,
        /my\s+phone\s+number/i,
        /same\s+number/i,
        /change\s+my\s+number/i,
        /port\s+my/i,
        /call\s+forwarding/i
      ],
      reply:
        'Yes—100%! You keep your existing business phone number. Your current number keeps ringing just like normal, and we pair a dedicated A2P-verified local texting line with missed-call detection so whenever you miss a call on a job site, our AI texts your caller back in 3 seconds.'
    },
    {
      id: 'photo-quote-calculator',
      patterns: [
        /photo\s+quote/i,
        /calculator/i,
        /know\s+my\s+pricing/i,
        /ballpark/i,
        /estimator/i,
        /tire-kicker/i,
        /tire\s+kicker/i,
        /how\s+does\s+it\s+price/i,
        /my\s+pricing/i,
        /my\s+prices/i,
        /collect.*photo/i
      ],
      reply:
        'We train your photo quote calculator and 3-second AI text agent on your exact services and ballpark price ranges—or we can configure it to collect 2–3 project photos and scope details without showing prices publicly. Homeowners get an instant response and you see pre-screened project photos on your phone before you ever drive out for an estimate.'
    },
    {
      id: 'after-12-payments-ownership',
      patterns: [
        /12th/i,
        /after\s+12/i,
        /after\s+month\s+12/i,
        /12\s+months/i,
        /12-month/i,
        /rent-to-own/i,
        /rent\s+to\s+own/i,
        /\$?297/,
        /\$?2,?400/,
        /buy\s+it\s+outright/i,
        /buy\s+outright/i,
        /ownership/i,
        /own\s+my/i,
        /own\s+the/i,
        /buyout/i,
        /pay\s+off/i,
        /hostage/i
      ],
      reply:
        'After your 12th monthly payment of $297, your lease payments end and you own 100% of your custom Smart Site outright—with zero buyout fees or hostage contracts! During months 1–12, all hosting, dedicated texting lines, and 24/7 AI usage are included at $0 extra. Afterward, you can keep our optional $100/mo Web & AI Care Plan or move the site to your own hosting anytime. (Or choose $2,400 Buy It Outright to own 100% from Day 1 and save $1,164.)'
    },
    {
      id: 'care-plan-100',
      patterns: [
        /\$?100/,
        /care\s+plan/i,
        /hosting/i,
        /carrier\s+registration/i,
        /a2p/i,
        /monthly\s+fee/i,
        /ongoing\s+cost/i
      ],
      reply:
        'The optional $100/mo Web & AI Care Plan covers high-speed cloud hosting, your dedicated local texting number, telecom carrier registration, 24/7 AI usage fees, and routine text/photo edits on your site. During your 12-month Rent-to-Own term, all of this is already included in your $297/mo at $0 extra—and once you own your site, the $100/mo Care Plan is 100% optional.'
    },
    {
      id: 'guarantee-cancellation',
      patterns: [
        /guarantee/i,
        /money-back/i,
        /money\s+back/i,
        /refund/i,
        /30-day/i,
        /30\s+day/i,
        /cancel/i,
        /contract/i,
        /lock-in/i,
        /locked\s+in/i,
        /risk/i
      ],
      reply:
        "You are 100% protected by our Zero-Risk 30-Day Money-Back Guarantee and zero lock-in contracts. Because we launch your custom Smart Site in 7 days, you get over 3 full weeks inside your first 30 days to test the live site and 3-second AI text agent with real customers. If you aren't thrilled, just text us within 30 days for a full 100% refund—no hard feelings. You can also buy out early or cancel with 30 days' notice anytime."
    },
    {
      id: 'domain-name',
      patterns: [
        /domain/i,
        /\burl\b/i,
        /\.com\b/i,
        /\bdns\b/i,
        /godaddy/i,
        /namecheap/i,
        /already\s+have\s+a\s+(site|website)/i,
        /replace\s+my/i
      ],
      reply:
        'Yes—you keep 100% ownership of your domain name! Whether your domain is on GoDaddy, Namecheap, Squarespace, or Google, our auto-scanner pulls your best photos and info from your current site in 60 seconds, and on Day 7 we point your domain to your new Smart Site with zero downtime (or help you grab a new domain if you need one).'
    },
    {
      id: 'missed-call-rescue',
      patterns: [
        /missed\s+call/i,
        /missed-call/i,
        /text\s+rescue/i,
        /voicemail/i,
        /miss\s+a\s+call/i,
        /text\s+back/i,
        /text-back/i,
        /3-second/i,
        /3\s+second/i
      ],
      reply:
        "Whenever you're on a loud job site, in a meeting, or after hours and miss a call, our system detects it and texts the caller back within 3 seconds from your business line (e.g., 'Hey! Sorry we missed your call on the job site—how can we help, or want to text a quick photo of your project?'). It answers their questions, collects job photos, and books the estimate before they call the next company on Google."
    },
    {
      id: 'reviews-seo-ranking',
      patterns: [
        /review/i,
        /5-star/i,
        /5\s+star/i,
        /google/i,
        /\bseo\b/i,
        /\brank/i,
        /\bmaps\b/i,
        /search/i,
        /traffic/i,
        /more\s+leads/i,
        /chatgpt/i
      ],
      reply:
        'Every Smart Site is engineered for local Google Maps & search ranking—with sub-second load speeds, local schema markup, and dedicated service pages—plus our Automated 5-Star Google Review Engine. Right after you finish a job, 1 tap sends a friendly text to your customer with your direct Google review link so you stack 5-star reviews automatically and outrank competitors.'
    },
    {
      id: 'edits-updates-support',
      patterns: [
        /\bedit/i,
        /\bupdate/i,
        /change\s+text/i,
        /add\s+photo/i,
        /new\s+photo/i,
        /who\s+manages/i,
        /make\s+changes/i,
        /support/i
      ],
      reply:
        'You never have to wrestle with a DIY website builder! Anytime you want to add new job photos, update pricing, add a service, or tweak text on your site, just text the photo or request to our 24/7 support line and our team updates your site for you—included during your 12-month Rent-to-Own term and under the $100/mo Care Plan.'
    },
    {
      id: 'ai-control-human-takeover',
      patterns: [
        /robot/i,
        /sound\s+like/i,
        /take\s+over/i,
        /pause/i,
        /office\s+hours/i,
        /reply\s+myself/i,
        /inbox/i,
        /conversation\s+room/i,
        /human/i,
        /ai\s+agent/i
      ],
      reply:
        'Our AI is trained on your exact services, service area, and tone so it replies like a sharp, friendly office manager—never a pushy bot. You also get a simple mobile & web inbox where you can see every text thread and jump in from your phone anytime; the AI automatically pauses the instant you reply, or can be set to run only on missed calls and after hours.'
    },
    {
      id: 'industries-trades',
      patterns: [
        /\btrade/i,
        /industr/i,
        /\bniche/i,
        /contractor/i,
        /\broof/i,
        /remodel/i,
        /\bhvac/i,
        /\bplumb/i,
        /electric/i,
        /\btree\b/i,
        /landscap/i,
        /concrete/i,
        /\bpest/i,
        /mortgage/i,
        /\bcpa\b/i,
        /legal/i,
        /\blaw\b/i,
        /cafe/i,
        /bakery/i,
        /restaurant/i,
        /\bshop\b/i,
        /medspa/i,
        /salon/i
      ],
      reply:
        'We custom-build Smart Sites for contractors & home service trades (remodeling, roofing, HVAC, plumbing, electrical, tree service, concrete, pest control), professional services (mortgage, CPA, legal, real estate), and busy local storefronts/cafes. Every build is tailored to how your specific customers buy—whether that is photo estimates, emergency dispatch, or appointment booking.'
    }
  ];

  function getAiSupportReply(questionText, phoneVal = '') {
    const q = String(questionText || '').trim();
    const cleanDigits = String(phoneVal || '').replace(/\D/g, '');
    const hasValidPhone = cleanDigits.length >= 10;

    const matchedReplies = [];
    for (const topic of AI_CONCIERGE_TOPICS) {
      if (topic.patterns.some((rx) => rx.test(q))) {
        matchedReplies.push(topic.reply);
      }
    }

    let baseAnswer = '';
    if (matchedReplies.length > 0) {
      baseAnswer = matchedReplies.slice(0, 2).join(' ');
    } else if (/website|site|lead|customer|call|text|business|work|how|what|why|can\s+you|do\s+you/i.test(q)) {
      baseAnswer =
        "Unlike a regular brochure website where 92% of visitors leave without calling, your Tiberius Smart Site actively turns traffic and missed calls into booked jobs: it starts a 2-way text conversation in 3 seconds, collects project photos & pre-screens budgets with an interactive calculator, texts back missed callers when you're on a job site, and automates 5-star Google reviews—all built for you in 7 days with 100% ownership ($297/mo Rent-to-Own or $2,400 Outright) and a 30-Day Money-Back Guarantee.";
    } else {
      baseAnswer =
        'Every Tiberius Smart Site is custom-built for your business in 7 days and combines a high-converting website, interactive ballpark/photo quote calculator, 3-second missed-call & web-lead AI text reply, and automated 5-star Google review requests—all backed by 100% ownership ($297/mo Rent-to-Own or $2,400 Outright) and our 30-Day Money-Back Guarantee.';
    }

    if (hasValidPhone) {
      return `${baseAnswer} (📲 We also dispatched this thread via SMS to ${phoneVal} so you can reply from your phone anytime!)`;
    }
    return baseAnswer;
  }

  async function dispatchTextSupportQuestion(questionText) {
    if (!questionText) return;
    const phoneVal = (textPhoneInput && textPhoneInput.value.trim()) || '';
    const hasValidPhone = phoneVal.replace(/\D/g, '').length >= 10;

    if (textSupportThread) {
      const userWrap = document.createElement('div');
      userWrap.className = 'support-msg support-msg-user text-support-msg text-support-msg-user';
      const userBubble = document.createElement('div');
      userBubble.className = 'support-msg-bubble';
      userBubble.textContent = questionText;
      userWrap.appendChild(userBubble);
      textSupportThread.appendChild(userWrap);
      textSupportThread.scrollTop = textSupportThread.scrollHeight;
    }

    const aiReply = getAiSupportReply(questionText, phoneVal);

    setTimeout(() => {
      if (textSupportThread) {
        const aiWrap = document.createElement('div');
        aiWrap.className = 'support-msg support-msg-ai text-support-msg text-support-msg-ai';
        const aiBubble = document.createElement('div');
        aiBubble.className = 'support-msg-bubble';
        aiBubble.innerHTML = `<strong>Tiberius AI Agent (Instant 24/7 Reply):</strong> ${aiReply}`;
        const aiMeta = document.createElement('span');
        aiMeta.className = 'support-msg-meta';
        aiMeta.textContent = hasValidPhone
          ? `Tiberius AI Agent • Instant Web Reply + SMS Sent to ${phoneVal} ⚡`
          : 'Tiberius AI Agent • Instant Web Reply ⚡ (Optional: enter mobile # below to text from your phone)';
        aiWrap.appendChild(aiBubble);
        aiWrap.appendChild(aiMeta);
        textSupportThread.appendChild(aiWrap);
        textSupportThread.scrollTop = textSupportThread.scrollHeight;
      }
      if (textSupportConfirmMsg) {
        textSupportConfirmMsg.hidden = false;
        textSupportConfirmMsg.textContent = hasValidPhone
          ? `✓ Instant AI reply posted above & live SMS thread dispatched to ${phoneVal}!`
          : '✓ Instant AI reply posted above! Enter your mobile number anytime if you want to move this conversation to your phone via SMS.';
      }
    }, 450);

    const supportPayload = {
      source: 'step-2-24-7-ai-text-support',
      question: questionText,
      phone: phoneVal,
      ownershipPreference: state.selectedOwnership,
      locationTag: state.locationTag,
      timestamp: new Date().toISOString()
    };

    window.__TIBERIUS_LEADS__.push(supportPayload);
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(supportPayload)
      });
    } catch (_err) {
      // Non-blocking fallback
    }
  }

  if (textUsPrimaryBtn) {
    textUsPrimaryBtn.addEventListener('click', () => {
      if (textQuestionInput) {
        textQuestionInput.focus();
        textQuestionInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  document.querySelectorAll('.text-quick-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      const q = pill.getAttribute('data-question') || pill.textContent.trim();
      if (textQuestionInput) {
        textQuestionInput.value = q;
      }
      dispatchTextSupportQuestion(q);
    });
  });

  if (textSupportForm) {
    textSupportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = textQuestionInput ? textQuestionInput.value.trim() : '';
      if (!q) return;
      if (textQuestionInput) textQuestionInput.value = '';
      dispatchTextSupportQuestion(q);
    });
  }
}

function initStripeCheckoutReturn() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('checkout') !== 'success') return;

  const planCode = (params.get('plan') || 'rent_to_own_297').toLowerCase();
  const banner = document.getElementById('checkout-success-banner');
  const titleEl = document.getElementById('checkout-success-title');
  const descEl = document.getElementById('checkout-success-desc');

  const PLAN_LABELS = {
    rent_to_own_297: '12-Month Rent-to-Own ($297/mo)',
    buy_outright_2400: 'Buy It Outright ($2,400 — 100% Day-1 Ownership)',
    buy_outright_with_care: 'Buy It Outright ($2,400) + $100/mo Web & AI Care Plan',
    care_plan_100: '$100/mo Web & AI Care Plan'
  };

  const planLabel = PLAN_LABELS[planCode] || PLAN_LABELS.rent_to_own_297;

  if (titleEl) {
    titleEl.textContent = `Welcome to Tiberius Smart Sites™! Your ${planLabel} Is Confirmed.`;
  }
  if (descEl) {
    descEl.textContent =
      'Your Stripe checkout is complete and your 7-day custom build slot is locked in—with zero phone calls needed. Click Auto-Scan Website to preload your business details right now, or message our 24/7 Live AI Text Agent below anytime.';
  }
  if (banner) {
    banner.hidden = false;
  }

  unlockStep2View({ scrollIntoView: true });
}

/* ============================================================================
   BOOT
   ============================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initGeoDetection();
  initNavbarControls();
  initModalHandlers();
  initSmsSimulatorControls();
  initShowcaseControls();
  initStep2Controls();
  hydrateWatchPageLeadContext();
  initStripeCheckoutReturn();
});
