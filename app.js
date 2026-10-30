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

function selectOwnershipPill(ownershipValue) {
  state.selectedOwnership = ownershipValue;
  document.querySelectorAll('.ownership-pill').forEach((pill) => {
    const isMatch = pill.getAttribute('data-ownership') === ownershipValue;
    pill.classList.toggle('is-selected', isMatch);
    pill.setAttribute('aria-checked', isMatch ? 'true' : 'false');
  });
}

function unlockStep2View({ lead = null, scrollIntoView = true } = {}) {
  state.step2Unlocked = true;
  const step2Section = document.getElementById('step-2-unlocked');
  const greetingEl = document.getElementById('unlocked-personal-greeting');
  const toggleBtn = document.getElementById('preview-step-2-toggle');

  if (step2Section) {
    step2Section.hidden = false;
  }

  if (greetingEl && lead && lead.name) {
    const firstName = lead.name.trim().split(' ')[0];
    greetingEl.textContent = `WELCOME, ${firstName.toUpperCase()}! STEP 2 UNLOCKED: Your 5-Min Walkthrough & ${lead.ownershipPreference} Options`;
  }

  if (toggleBtn) {
    toggleBtn.textContent = '✓ Step 2 Unlocked (Jump to Walkthrough)';
  }

  // Pre-fill booking form if lead data exists
  if (lead) {
    const bName = document.getElementById('booking-name');
    const bPhone = document.getElementById('booking-phone');
    const smsPhone = document.getElementById('sms-test-phone');
    if (bName && !bName.value && lead.name) bName.value = lead.name;
    if (bPhone && !bPhone.value && lead.phone) bPhone.value = lead.phone;
    if (smsPhone && !smsPhone.value && lead.phone) smsPhone.value = lead.phone;
    if (lead.email) applyStripeEmailPrefill(lead.email);
  }

  if (scrollIntoView && step2Section) {
    setTimeout(() => {
      step2Section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
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

  // Slide 2: Form Submit -> Close modal, unlock Step 2, log/webhook lead payload
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

      // Close modal & unlock Step 2 immediately for zero-friction UX
      closeLeadModal();
      unlockStep2View({ lead: leadPayload, scrollIntoView: true });

      // Fire non-blocking webhook POST to /api/lead
      try {
        await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadPayload)
        });
      } catch (_err) {
        // Non-blocking fallback
      }
    });
  }
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
   4. UNLOCKED STEP 2 VIEW: CHAPTER PLAYER, PRICING & LIVE SMS SIMULATOR
   ============================================================================ */
function selectVslChapter(idx) {
  const chapter = VSL_CHAPTERS[idx] || VSL_CHAPTERS[0];
  state.activeChapterIdx = idx;

  document.querySelectorAll('.chapter-btn').forEach((btn, i) => {
    const active = i === idx;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
  });

  const statusPill = document.getElementById('vsl-playing-indicator');
  const timecodeEl = document.getElementById('vsl-timecode-display');
  const tagEl = document.getElementById('vsl-chapter-tag');
  const headingEl = document.getElementById('vsl-chapter-heading');
  const descEl = document.getElementById('vsl-chapter-desc');
  const bulletsEl = document.getElementById('vsl-chapter-bullets');
  const imgEl = document.getElementById('vsl-chapter-img');
  const scrubberFill = document.getElementById('vsl-scrubber-fill');

  if (statusPill) {
    statusPill.textContent = `${state.vslPlaying ? '🔊 UNMUTED WALKTHROUGH' : '⏸ PAUSED'} • CHAPTER ${idx + 1} OF 4`;
  }
  if (timecodeEl) timecodeEl.textContent = chapter.timecodeDisplay;
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
      unlockStep2View({ scrollIntoView: true });
    });
  }

  // Chapter buttons
  document.querySelectorAll('.chapter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-chapter-idx'), 10) || 0;
      selectVslChapter(idx);
    });
  });

  // Play/Pause & Next Chapter buttons
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
      selectVslChapter(nextIdx);
    });
  }

  // Pricing Card Plan Selection -> Scrolls to Booking (if Step 2 unlocked) or Opens Modal with that plan
  document.querySelectorAll('.js-select-plan').forEach((btn) => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan');
      selectOwnershipPill(plan);
      if (state.step2Unlocked) {
        const bookingBlock = document.getElementById('booking-and-sms-trigger');
        if (bookingBlock) {
          bookingBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  // Hydrate saved lead email for Stripe prefill if available
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

  // Direct Booking Calendar Day & Time Pills
  document.querySelectorAll('#booking-day-pills .day-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      state.bookingDay = pill.getAttribute('data-day');
      document.querySelectorAll('#booking-day-pills .day-pill').forEach((p) => {
        p.classList.toggle('is-selected', p === pill);
      });
    });
  });

  document.querySelectorAll('#booking-time-pills .time-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      state.bookingTime = pill.getAttribute('data-time');
      document.querySelectorAll('#booking-time-pills .time-pill').forEach((p) => {
        p.classList.toggle('is-selected', p === pill);
      });
    });
  });

  // Direct Booking Submit
  const bookingForm = document.getElementById('direct-booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('booking-name').value.trim();
      const phone = document.getElementById('booking-phone').value.trim();
      const confirmMsg = document.getElementById('booking-confirmation-msg');

      const bookingPayload = {
        source: 'step-2-direct-booking',
        name,
        phone,
        day: state.bookingDay,
        time: state.bookingTime,
        ownershipPreference: state.selectedOwnership,
        locationTag: state.locationTag
      };

      window.__TIBERIUS_LEADS__.push(bookingPayload);
      if (confirmMsg) {
        confirmMsg.hidden = false;
        confirmMsg.textContent = `✓ Locked In! Your 15-Minute Demo Call is confirmed for ${state.bookingDay} at ${state.bookingTime}. Confirmation SMS dispatched to ${phone}.`;
      }

      try {
        await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingPayload)
        });
      } catch (_err) {
        // Ignore network error
      }
    });
  }

  // Instant 3-Second AI Text Test Trigger
  const smsForm = document.getElementById('instant-sms-test-form');
  if (smsForm) {
    smsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const phone = document.getElementById('sms-test-phone').value.trim();
      const niche = document.getElementById('sms-test-niche').value;
      const consoleBody = document.getElementById('sms-console-body');
      if (!consoleBody) return;

      consoleBody.innerHTML = `
        <div class="console-line">[0.0s] 📞 Simulating missed customer call from ${phone} (${niche})...</div>
      `;

      setTimeout(() => {
        consoleBody.innerHTML += `
          <div class="console-line">[0.9s] 🧠 Tiberius AI drafting custom ${niche} response...</div>
        `;
      }, 650);

      setTimeout(() => {
        consoleBody.innerHTML += `
          <div class="console-line console-highlight">[2.4s] ⚡ SMS DELIVERED TO ${phone}: "Hi! Sorry we missed your call. We're with a customer right now. How can we help with your ${niche.toLowerCase()} needs today?"</div>
        `;
      }, 1500);
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
      'Your Stripe checkout is complete and your 7-day custom build slot is locked in. Pick your 15-minute kickoff call slot below so we can review your custom mockup, or click Auto-Scan Website to preload your business details right now.';
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
  initShowcaseControls();
  initStep2Controls();
  initStripeCheckoutReturn();
});
