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
    title: 'Aether Architectural Remodeling (Dark Luxury)',
    category: 'remodel-trades',
    categoryLabel: 'Remodeling & Trades',
    industryPreset: 'Home Services & Contracting (Remodel, Roof, Trades)',
    domain: 'aether-remodel.tiberiussmartsites.com',
    image: '/demos/remodel-1.webp',
    ratingText: '★ 5.0 Google Verified (142 Reviews)',
    description:
      'Flagship dark-obsidian architectural design-build Smart Site featuring an interactive 3D LiDAR transformation slider, instant photo quote dock, and remodel ROI calculator.',
    chips: [
      'Interactive Photo Quote Dock',
      'Before/After 3D Slider',
      '3-Sec Missed-Call SMS',
      '5.0★ Authority Bento'
    ],
    smsOverlay: {
      badge: '⚡ 2.1s AI Text Reply',
      message:
        '"Hi Mark! Saw your kitchen + patio photo upload. Turnkey builds in your neighborhood run $85k–$135k. Want a free 3D scan this Thursday at 2 PM?"',
      outcome: '✓ Booked $110k Estimate'
    },
    highlights: [
      'Interactive Before/After Architectural Scanline Slider',
      'Single-Card Instant Photo Quote & Equity Lift Calculator',
      '5.0-Star Verified Authority Bento with Owner Direct Response',
      '24/7 AI SMS Concierge + Office-Hours Manual Handover Mode'
    ]
  },
  {
    id: 'remodel-2',
    title: 'Aether Suburban Estates & Whole-Home Remodel',
    category: 'remodel-trades',
    categoryLabel: 'Remodeling & Trades',
    industryPreset: 'Home Services & Contracting (Remodel, Roof, Trades)',
    domain: 'suburban-estates.tiberiussmartsites.com',
    image: '/demos/remodel-2.webp',
    ratingText: '★ 5.0 Google Verified (98 Reviews)',
    description:
      'Warm daylight architectural remodel & exterior transformation Smart Site built for high-ticket residential contractors, roofing, custom decks, and exterior trades.',
    chips: [
      'Daylight Editorial Theme',
      'Manual Drag Comparison',
      'Instant Ballpark Estimator',
      'Automated Review Engine'
    ],
    smsOverlay: {
      badge: '⚡ 2.6s Missed-Call Rescue',
      message:
        '"Hey Sarah! Sorry we missed your call on the job site. Are you looking for an exterior facade remodel, roofing, or a custom addition quote?"',
      outcome: '✓ Saved Missed Call Lead'
    },
    highlights: [
      'Warm Editorial Daylight Aesthetic for Suburban Homeowners',
      'Interactive Drag-to-Inspect Before/After Property Transformations',
      'Automated Post-Walkthrough 5-Star Google Review Request Flow',
      '3-Pane Back-Office Conversation Room for Crew & Estimators'
    ]
  },
  {
    id: 'pest-control',
    title: 'Lone Star Shield Pest & Termite Control',
    category: 'remodel-trades',
    categoryLabel: 'Remodeling & Trades',
    industryPreset: 'Home Services & Contracting (Remodel, Roof, Trades)',
    domain: 'lonestarshield-pest.tiberiussmartsites.com',
    image: '/demos/pest-control.webp',
    ratingText: '★ 4.9 Google Verified (412 Reviews)',
    description:
      'High-urgency same-day pest, bark scorpion & termite control Smart Site featuring an AI Bug/Damage Photo ID Estimator, upfront treatment calculator, and instant route dispatch.',
    chips: [
      'AI Bug & Damage Photo ID',
      'Upfront Pricing Calculator',
      'Same-Day Route Dispatch',
      '3-Sec Missed-Call SMS'
    ],
    smsOverlay: {
      badge: '⚡ 1.8s Shield AI Dispatch',
      message:
        '"Hi Sarah! Saw your photo. That is a Central TX bark scorpion entry gap. Full weep-hole seal + perimeter barrier is $160 initial. Want our 2 PM route slot today?"',
      outcome: '✓ Same-Day Route Booked'
    },
    highlights: [
      'Snap-a-Photo AI Pest, Mud Tube & Entry Point Identification Dock',
      'Interactive Quarterly vs. One-Time Knockdown Pricing Calculator',
      'TPCL #089412 Protocol Cards with Kid & Pet Safety Specs',
      'Instant 1-to-1 SMS Route Dispatch & 412+ Verified Review Engine'
    ]
  },
  {
    id: 'tree-service',
    title: 'IronOak Tree Service, Crane Removal & Land Clearing',
    category: 'remodel-trades',
    categoryLabel: 'Remodeling & Trades',
    industryPreset: 'Home Services & Contracting (Remodel, Roof, Trades)',
    domain: 'ironoaktree.tiberiussmartsites.com',
    image: '/demos/tree-service.webp',
    ratingText: '★ 5.0 Google Verified (285 Reviews)',
    description:
      'ISA Certified Arborist, zero-impact crane removal & forestry mulching Smart Site with an Instant Tree/Canopy Photo Ballpark Estimator and interactive acreage cost calculator.',
    chips: [
      'Tree & Canopy Photo Quote',
      'Acreage & Crane Calculator',
      'Texas Oak Wilt Protocol',
      '24/7 Storm SMS Rescue'
    ],
    smsOverlay: {
      badge: '⚡ 2.2s Arborist AI Reply',
      message:
        '"Howdy! Based on your photo of the 50ft live oak overhanging the roof, crane-assisted removal + stump grinding runs $2,400–$3,200. Want our ISA Arborist out tomorrow?"',
      outcome: '✓ $2,850 Crane Job Booked'
    },
    highlights: [
      'Instant Tree, Overhang & Acreage Photo Ballpark Estimator',
      'Interactive Tree Scale, Drop-Zone & Land Clearing Cost Calculator',
      'ISA Certified Arborist & Texas Oak Wilt Containment Credentials',
      '24/7 Emergency Storm Damage Missed-Call SMS Text Rescue'
    ]
  },
  {
    id: 'pro-services',
    title: 'Roam & Root Home Loans, CPA & Advisory',
    category: 'pro-services',
    categoryLabel: 'CPA, Mortgage & Pro Services',
    industryPreset: 'Professional Services (Mortgage, CPA, Legal, Real Estate)',
    domain: 'roamandroot-loans.tiberiussmartsites.com',
    image: '/demos/pro-services.webp',
    ratingText: '★ 5.0 Client Rating (215+ Closings)',
    description:
      'Editorial warm-paper financial & professional services Smart Site featuring a live interactive rate & payment explorer, 60-second pre-qual quiz, and instant SMS advisor.',
    chips: [
      'Live Rate & ROI Table',
      '3-Mode AI Pre-Qual Dock',
      'SAFE Act / TCPA Compliant',
      'Direct Calendar Dispatch'
    ],
    smsOverlay: {
      badge: '⚡ 1.9s Advisor SMS',
      message:
        '"Hi David! Based on a $525k purchase in Comal County with 10% down, your estimated P&I is ~$2,790/mo. Want your custom PDF rate sheet texted over?"',
      outcome: '✓ Pre-Qual Application Started'
    },
    highlights: [
      'Low-Saturation Warm Paper Editorial Design System',
      'Interactive Scenario & Payment Comparison Table',
      'Embedded 3-Mode Conversational AI Pre-Qualification Concierge',
      'Built-In 1-to-1 TCPA & Professional Compliance Guardrails'
    ]
  },
  {
    id: 'local-cafe',
    title: 'Opa’s Hill Country Bakery, Cafe & Main Street Shop',
    category: 'local-shops',
    categoryLabel: 'Local Cafes & Shops',
    industryPreset: 'Local Storefront, Cafe, Bakery or Restaurant',
    domain: 'opasbakery-nb.tiberiussmartsites.com',
    image: '/demos/local-cafe.webp',
    ratingText: '★ 5.0 Google Rating (412 Local Reviews)',
    description:
      'High-converting local storefront, cafe & catering Smart Site with 3-second SMS hot-box pre-ordering, catering quote concierge, and 1-tap Google review velocity.',
    chips: [
      'SMS Skip-the-Line Ordering',
      'Event & Office Catering AI',
      '412+ 5-Star Google Reviews',
      'Main Street Geo-SEO'
    ],
    smsOverlay: {
      badge: '⚡ 2.3s Catering & Order AI',
      message:
        '"Guten Morgen! We can have 2 dozen warm brisket kolaches + a 96oz espresso tote ready at 7:30 AM ($74 total). Reply YES to lock in pickup!"',
      outcome: '✓ $145 Catering Order + 5★ Review'
    },
    highlights: [
      'Mouthwatering Daily Bake Sheet & Local Story Showcase',
      'Instant Text-to-Reserve & Corporate Catering Quote Concierge',
      'Automated VIP Text Club & 5-Star Google Review Booster',
      'Built to Rank #1 in Local Map Pack Searches'
    ]
  }
];

const VSL_CHAPTERS = [
  {
    time: '0:00',
    timecodeDisplay: '00:42 / 05:12',
    progressPct: 25,
    tag: 'CHAPTER 1 • 0:00 • SMART SITE + INSTANT SMS',
    heading: '1. Custom AI Smart Site + Instant SMS Quote Dock',
    desc: 'Instead of a dead brochure website where 92% of visitors leave without calling, your Smart Site features an interactive photo/project estimator and AI concierge that texts the customer within 3 seconds of their question.',
    image: 'demos/remodel-1.webp',
    bullets: [
      '✓ Custom scrollytelling & before/after visual proof built for your exact niche',
      '✓ Embedded Instant SMS Quote Dock captures name, mobile number & project scope',
      '✓ Works on autopilot 24/7, or pauses automatically during office hours so your team can reply'
    ]
  },
  {
    time: '1:18',
    timecodeDisplay: '01:54 / 05:12',
    progressPct: 50,
    tag: 'CHAPTER 2 • 1:18 • 5-STAR GOOGLE REVIEW ENGINE',
    heading: '2. Automated 5-Star Google Review Engine & Authority Bento',
    desc: 'Every happy customer receives a polite, conversational text right after their job or visit with a direct 1-tap Google review link, while your site showcases your verified 5.0-star reviews in a luxury Bento grid.',
    image: 'demos/local-cafe.webp',
    bullets: [
      '✓ 1-Tap SMS review invites sent automatically after completed jobs or visits',
      '✓ TOS-safe sentiment routing alerts you privately if a customer ever has an issue',
      '✓ Live 5.0-Star Verified Authority Bento with LocalBusiness JSON-LD SEO schema'
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
    tag: 'CHAPTER 4 • 3:45 • FLEXIBLE OWNERSHIP MATRIX',
    heading: '4. Lease ($297/mo), Rent-to-Own ($300/mo), or Buy Outright',
    desc: 'Most agencies charge $5,000+ upfront or hold your website hostage forever. With Tiberius Smart Sites, you can lease for $297/mo, build 100% equity via Rent-to-Own, or own your GitHub & Vercel code on Day 1.',
    image: 'demos/pro-services.webp',
    bullets: [
      '✓ $297/mo All-In Monthly Lease: Zero huge upfront fee, hosting & AI included',
      '✓ $300/mo Rent-to-Own: $200/mo goes directly toward paying off your custom site code',
      '✓ Buy Outright: Own 100% of your GitHub & Vercel source code on Day 1'
    ]
  }
];

// Global state for the funnel
const state = {
  locationTag: 'national',
  selectedIndustry: '',
  selectedOwnership: '$297/mo Lease',
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
      demoNameEl.textContent = foundDemo.title;
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
        ownershipPreference: state.selectedOwnership || '$297/mo Lease',
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
            <div class="mini-iphone-header">
              <span>📱 iPhone AI Text Rescue</span>
              <span>${site.smsOverlay.badge}</span>
            </div>
            <div class="mini-sms-bubble">
              ${site.smsOverlay.message}
            </div>
            <div class="mini-sms-meta">
              <span>Tiberius AI Concierge</span>
              <span>${site.smsOverlay.outcome}</span>
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

  // Pricing Card Plan Selection -> Scrolls to Booking / Opens Modal with that plan
  document.querySelectorAll('.js-select-plan').forEach((btn) => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan');
      selectOwnershipPill(plan);
      const bookingBlock = document.getElementById('booking-and-sms-trigger');
      if (bookingBlock) {
        bookingBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

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

/* ============================================================================
   BOOT
   ============================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initGeoDetection();
  initNavbarControls();
  initModalHandlers();
  initShowcaseControls();
  initStep2Controls();
});
