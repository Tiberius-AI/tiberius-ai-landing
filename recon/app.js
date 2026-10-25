/**
 * TIBERIUS RECON™ — "THE SILVER PLATTER" INTERACTIVE APPLICATION ENGINE
 * 1. Sticky Command Navbar & Mobile Drawer Navigation
 * 2. 16:9 System Overview Video Player Card (MP4 Ready + Interactive 90-Second Walkthrough)
 * 3. Streamlined 7:00 AM "Silver Platter" Morning Briefing Demo (3 Core Engine Cards)
 * 4. Offense + Defense Smart Site Equity Pricing Toggle ($297 / $597 / $897)
 * 5. Frictionless Territory Activation Form (Mobile Native <select> + Desktop Pills + 7:00 AM Countdown)
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. STICKY NAVBAR SCROLL STATE & SMOOTH ANCHOR SCROLLING
     ========================================================================== */
  const commandNavbar = document.getElementById('command-navbar');

  function syncNavbarScrollState() {
    if (!commandNavbar) return;
    if (window.scrollY > 20) {
      commandNavbar.classList.add('is-scrolled');
    } else {
      commandNavbar.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', syncNavbarScrollState, { passive: true });
  syncNavbarScrollState();

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ==========================================================================
     2. MOBILE NAVIGATION DRAWER TOGGLE
     ========================================================================== */
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');

  if (mobileNavToggle && mobileNavDrawer) {
    mobileNavToggle.addEventListener('click', () => {
      const isHidden = mobileNavDrawer.classList.contains('hidden');
      mobileNavDrawer.classList.toggle('hidden', !isHidden);
      mobileNavToggle.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
    });

    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.add('hidden');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================================================
     3. HERO 16:9 VIDEO OVERVIEW PLAYER CARD
     ========================================================================== */
  const videoPlayerCard = document.getElementById('hero-video-player-card');
  const videoPosterView = document.getElementById('hero-video-poster-view');
  const videoActiveView = document.getElementById('hero-video-active-view');
  const videoCloseBtn = document.getElementById('hero-video-close-btn');
  const walkthroughStepBadge = document.getElementById('walkthrough-step-badge');
  const walkthroughStepTitle = document.getElementById('walkthrough-step-title');
  const walkthroughStepDesc = document.getElementById('walkthrough-step-desc');
  const walkthroughStepTelemetry = document.getElementById('walkthrough-step-telemetry');
  const walkthroughStepButtons = Array.from(document.querySelectorAll('[data-walkthrough-step]'));

  const WALKTHROUGH_STEPS = [
    {
      badge: 'STEP 1 OF 3 • 02:00 AM DEEP PORTAL RECON',
      title: '02:00 AM: Live Browser Sweeps Non-API Building Portals',
      desc: 'Your Digital Scout opens a headless browser while you sleep—navigating suburban Accela & EnerGov building departments, bid boards, and commercial directories to extract high-ticket permits.',
      telemetry: 'LIVE CAPTURE: PERMIT #BP-2026-08941 • $240,000 COMMERCIAL TI BUILDOUT • FILED 14 HRS AGO',
      accent: 'amber'
    },
    {
      badge: 'STEP 2 OF 3 • 04:30 AM OWNER & CAD X-RAY',
      title: '04:30 AM: Verifies the Dirt & the Decision-Maker',
      desc: 'Cross-references County Appraisal District (CAD) tax rolls for assessed value, square footage, and true homeowner match—or pulls the exact commercial GC Project Manager or Facility Director contact.',
      telemetry: 'CAD X-RAY MATCH: $940,000 ASSESSED • 4,120 SQ FT • VERIFIED OWNER + DIRECT PM CELL',
      accent: 'sky'
    },
    {
      badge: 'STEP 3 OF 3 • 07:00 AM SILVER PLATTER QUEUE',
      title: '07:00 AM: 100% Human-in-the-Loop Morning Briefing',
      desc: 'Hands you researched morning cards with proof on top and a custom 4-sentence intro written in your voice below. You just sip your coffee and tap [ ✓ Approve & Send ].',
      telemetry: '07:00:00 AM QUEUE READY: 3 UNREDACTED DEALS UNLOCKED • 1-TAP SEND ARMED ✓',
      accent: 'emerald'
    }
  ];

  let walkthroughTimer = null;

  function renderWalkthroughStep(index) {
    const step = WALKTHROUGH_STEPS[index] || WALKTHROUGH_STEPS[0];
    if (walkthroughStepBadge) walkthroughStepBadge.textContent = step.badge;
    if (walkthroughStepTitle) walkthroughStepTitle.textContent = step.title;
    if (walkthroughStepDesc) walkthroughStepDesc.textContent = step.desc;
    if (walkthroughStepTelemetry) walkthroughStepTelemetry.textContent = step.telemetry;

    walkthroughStepButtons.forEach((btn, idx) => {
      if (idx === index) {
        btn.className =
          'walkthrough-pill px-2.5 py-1 rounded text-[10px] font-mono-telemetry bg-emerald-500/25 border border-emerald-400 text-emerald-200 cursor-pointer';
      } else {
        btn.className =
          'walkthrough-pill px-2.5 py-1 rounded text-[10px] font-mono-telemetry bg-slate-900 border border-white/15 text-slate-400 hover:text-white cursor-pointer';
      }
    });
  }

  function openVideoWalkthrough() {
    if (!videoPlayerCard || !videoPosterView || !videoActiveView) return;

    const customVideoSrc = videoPlayerCard.getAttribute('data-video-src');
    if (customVideoSrc && customVideoSrc.trim() !== '') {
      videoPosterView.classList.add('hidden');
      videoActiveView.classList.remove('hidden');
      videoActiveView.innerHTML = `
        <video src="${customVideoSrc}" controls autoplay playsinline class="w-full h-full object-cover rounded-xl"></video>
      `;
      return;
    }

    videoPosterView.classList.add('hidden');
    videoActiveView.classList.remove('hidden');
    let currentStepIdx = 0;
    renderWalkthroughStep(currentStepIdx);

    if (walkthroughTimer) clearInterval(walkthroughTimer);
    walkthroughTimer = setInterval(() => {
      currentStepIdx = (currentStepIdx + 1) % WALKTHROUGH_STEPS.length;
      renderWalkthroughStep(currentStepIdx);
    }, 5500);
  }

  function closeVideoWalkthrough(e) {
    if (e) e.stopPropagation();
    if (walkthroughTimer) {
      clearInterval(walkthroughTimer);
      walkthroughTimer = null;
    }
    if (videoPosterView && videoActiveView) {
      videoActiveView.classList.add('hidden');
      videoPosterView.classList.remove('hidden');
    }
  }

  if (videoPlayerCard) {
    videoPlayerCard.addEventListener('click', (e) => {
      if (e.target.closest('#hero-video-close-btn') || e.target.closest('[data-walkthrough-step]') || e.target.closest('a')) {
        return;
      }
      if (videoActiveView && !videoActiveView.classList.contains('hidden')) {
        return;
      }
      openVideoWalkthrough();
    });

    videoPlayerCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openVideoWalkthrough();
      }
    });
  }

  if (videoCloseBtn) {
    videoCloseBtn.addEventListener('click', closeVideoWalkthrough);
  }

  walkthroughStepButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (walkthroughTimer) {
        clearInterval(walkthroughTimer);
        walkthroughTimer = null;
      }
      const stepIdx = parseInt(btn.getAttribute('data-walkthrough-step') || '0', 10);
      renderWalkthroughStep(stepIdx);
    });
  });

  /* ==========================================================================
     4. SECTION 5: STREAMLINED 7:00 AM "SILVER PLATTER" DEMO SECTION
        (3 Core Engine Cards — No Scenario-Switching Required)
     ========================================================================== */
  const MORNING_BRIEFING_CARDS = [
    {
      id: 'deal-1',
      engineBadge: 'DEAL #1 • [COMMERCIAL PERMIT RADAR]',
      engineColorClass: 'text-amber-300',
      unlockedTag: 'UNLOCKED #01',
      triggerPill: 'FILED 14 HRS AGO • ACCELA PORTAL #BP-2026-08941',
      triggerPillStyle: 'bg-amber-500/15 border-amber-400/40 text-amber-300',
      headline: '$240,000 Commercial TI Buildout Permit',
      subMeta: '4820 Industrial Pkwy, Suite B — 18,500 Sq Ft Commercial Space & Dock Apron',
      contactLabel: 'MATCHED GC PROJECT MANAGER:',
      contactLabelColor: 'text-amber-300',
      decisionMaker: 'Marcus Vance • Sr. PM @ Apex Commercial Builders',
      decisionMakerShort: 'Marcus Vance (Apex Commercial Builders)',
      verifiedMeta: 'Direct Email + Mobile Verified • 3.8 Miles Away',
      introLabel: 'PRE-WRITTEN BID INTRO (YOUR VOICE):',
      outreachDraft:
        '"Hey Marcus — saw the $240,000 commercial TI buildout permit filed yesterday at 4820 Industrial Pkwy. Our commercial crew just wrapped a 22,000 sq ft project two miles east on Commerce Dr and passed city inspection ahead of schedule. We have a crew opening up next month and would love to drop off numbers on this scope. Mind if I send over our commercial spec sheet and bid calendar this afternoon?"'
    },
    {
      id: 'deal-2',
      engineBadge: 'DEAL #2 • [B2B ACCOUNT SCOUT]',
      engineColorClass: 'text-sky-300',
      unlockedTag: 'UNLOCKED #02',
      triggerPill: 'NEWLY ACQUIRED 140-UNIT COMPLEX • VENDOR WINDOW',
      triggerPillStyle: 'bg-amber-500/15 border-amber-400/40 text-amber-300',
      headline: 'Regional Property Manager Trigger',
      subMeta: 'Oakridge Commons & 3 Retail Pads — 6100 Westheimer Rd (Newly Acquired Asset)',
      contactLabel: 'MATCHED FACILITY DIRECTOR:',
      contactLabelColor: 'text-amber-300',
      decisionMaker: 'Dana Sterling • Regional Facilities Dir. @ Crestview Mgmt',
      decisionMakerShort: 'Dana Sterling (Crestview Mgmt)',
      verifiedMeta: 'Direct Inbox + Office Line • Q4 CapEx Budget Active',
      introLabel: 'PRE-WRITTEN VENDOR INTRO (YOUR VOICE):',
      outreachDraft:
        '"Hi Dana — congrats to the Crestview team on closing the acquisition of the 140-unit Oakridge Commons complex and adjacent retail pads. Usually during the first 30 days of a transition, inherited exterior trade vendors get re-evaluated to bring the property up to your standards. We carry full commercial coverage and specialize in weekend phased work so zero tenants lose access. Can I swing by Thursday to leave you a clean CapEx bid breakdown?"'
    },
    {
      id: 'deal-3',
      engineBadge: 'DEAL #3 • [RESIDENTIAL PERMIT + CAD X-RAY]',
      engineColorClass: 'text-emerald-300',
      unlockedTag: 'UNLOCKED #03',
      triggerPill: '$940K ASSESSED VALUE • 4,120 SQ FT • PARCEL #CAD-90418',
      triggerPillStyle: 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300',
      headline: 'Custom Home Addition Permit + County Tax Roll Match',
      subMeta: '1140 Whispering Pines Ln — 1.4-Acre Estate Addition & Exterior Upgrade Permit',
      contactLabel: 'VERIFIED HOMEOWNER (CAD DEED MATCH):',
      contactLabelColor: 'text-emerald-300',
      decisionMaker: 'Dr. Robert & Elena Harrison • Verified Property Owners',
      decisionMakerShort: 'Dr. Robert & Elena Harrison',
      verifiedMeta: '$940k Assessed • 4,120 Sq Ft • Direct Owner Contact Unlocked',
      introLabel: 'PRE-WRITTEN HOMEOWNER INTRO (YOUR VOICE):',
      outreachDraft:
        '"Hi Robert — noticed the city permit approved this week for the custom addition on your 4,120 sq ft estate on Whispering Pines Ln. Our custom residential team specializes in high-end estate projects across the neighborhood with zero day-labor subs and a 100% clean-site guarantee. Because we coordinate directly with your framing schedule, we keep your project on timeline without headaches. Would you be open to a quick 10-minute site walk this week?"'
    }
  ];

  const cardStates = {
    'deal-1': 'ready',
    'deal-2': 'ready',
    'deal-3': 'ready'
  };

  const simulatorCardsGrid = document.getElementById('simulator-cards-grid');
  const dealsFiredCounterEl = document.getElementById('deals-fired-counter');
  const resetAllSimulatorBtn = document.getElementById('reset-all-simulator-btn');

  function updateDealsFiredHeader() {
    const firedCount = MORNING_BRIEFING_CARDS.reduce((acc, card) => {
      return acc + (cardStates[card.id] === 'sent' ? 1 : 0);
    }, 0);

    if (dealsFiredCounterEl) {
      dealsFiredCounterEl.textContent = `Deals Fired This Morning: ${firedCount}/3`;
    }
  }

  function renderSimulatorCards() {
    if (!simulatorCardsGrid) return;

    simulatorCardsGrid.innerHTML = MORNING_BRIEFING_CARDS.map((card, idx) => {
      const state = cardStates[card.id] || 'ready';

      if (state === 'sent') {
        return `
          <article class="glass-emerald-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300" data-card-id="${card.id}">
            <div>
              <div class="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-emerald-400/30">
                <span class="px-3 py-1 rounded-full bg-emerald-500/25 border border-emerald-400/60 font-mono-telemetry text-xs text-emerald-200 font-bold">
                  SENT IN 3.2 SECONDS ✓
                </span>
                <span class="font-mono-telemetry text-[11px] text-emerald-300">07:01:${12 + idx * 14} AM CST</span>
              </div>

              <div class="w-12 h-12 rounded-2xl bg-emerald-500/25 border border-emerald-400/50 flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.4" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div class="font-mono-telemetry text-[11px] text-emerald-300 mb-1">${card.engineBadge}</div>
              <h3 class="font-display font-bold text-xl text-white mb-2">
                Dispatched to ${card.decisionMakerShort}
              </h3>

              <p class="text-emerald-100 text-sm leading-relaxed mb-4 font-medium">
                "Boom. In real life, that message just landed in their inbox from your address while your competitors are still asleep."
              </p>

              <div class="p-3.5 rounded-xl bg-slate-950/75 border border-emerald-500/30 mb-4">
                <div class="font-mono-telemetry text-[10px] text-emerald-400 mb-1">DISPATCHED MESSAGE:</div>
                <p class="text-xs text-slate-300 line-clamp-3 italic">${card.outreachDraft}</p>
              </div>
            </div>

            <div class="pt-3 border-t border-emerald-500/25 flex items-center justify-between">
              <span class="font-mono-telemetry text-[11px] text-emerald-300">1-CLICK HUMAN APPROVAL VERIFIED</span>
              <button type="button" data-action="reset-card" data-card-id="${card.id}" class="text-xs font-mono-telemetry text-white hover:text-amber-300 underline cursor-pointer">
                Reset Card ↺
              </button>
            </div>
          </article>
        `;
      }

      return `
        <article class="glass-card glass-card-interactive rounded-2xl p-5 sm:p-6 flex flex-col justify-between border border-white/15" data-card-id="${card.id}">
          <div>
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="font-mono-telemetry text-[11px] ${card.engineColorClass} font-bold">${card.engineBadge}</span>
              <span class="px-2.5 py-0.5 rounded bg-slate-900/90 border border-white/10 font-mono-telemetry text-[10px] text-emerald-400">${card.unlockedTag}</span>
            </div>

            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border font-mono-telemetry text-[11px] font-bold mb-3 ${card.triggerPillStyle}">
              <span>⚡</span>
              <span>${card.triggerPill}</span>
            </div>

            <h3 class="font-display font-extrabold text-xl text-white leading-snug mb-2">
              ${card.headline}
            </h3>
            <p class="text-xs text-slate-400 mb-3">
              ${card.subMeta}
            </p>

            <div class="p-3 rounded-xl bg-slate-950/75 border border-white/10 mb-4">
              <div class="font-mono-telemetry text-[10px] ${card.contactLabelColor} mb-0.5">${card.contactLabel}</div>
              <div class="text-xs sm:text-sm font-bold text-white">${card.decisionMaker}</div>
              <div class="text-[11px] text-slate-400 mt-0.5">${card.verifiedMeta}</div>
            </div>

            <div class="mb-5">
              <div class="flex items-center justify-between mb-1.5">
                <span class="font-mono-telemetry text-[10px] text-slate-300">${card.introLabel}</span>
                <span class="font-mono-telemetry text-[10px] text-emerald-400">READY TO SEND</span>
              </div>
              <div class="outreach-preview-box">
                ${card.outreachDraft}
              </div>
            </div>
          </div>

          <div class="pt-3 border-t border-white/10">
            <button
              type="button"
              data-action="approve-send"
              data-card-id="${card.id}"
              class="btn-emerald-primary w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-center cursor-pointer"
            >
              [ ✓ Approve &amp; Send ]
            </button>
          </div>
        </article>
      `;
    }).join('');

    updateDealsFiredHeader();
  }

  if (simulatorCardsGrid) {
    simulatorCardsGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;

      const action = btn.getAttribute('data-action');
      const cardId = btn.getAttribute('data-card-id');
      if (!cardId || !(cardId in cardStates)) return;

      if (action === 'approve-send') {
        cardStates[cardId] = 'sent';
        renderSimulatorCards();
      } else if (action === 'reset-card') {
        cardStates[cardId] = 'ready';
        renderSimulatorCards();
      }
    });
  }

  if (resetAllSimulatorBtn) {
    resetAllSimulatorBtn.addEventListener('click', () => {
      Object.keys(cardStates).forEach((key) => {
        cardStates[key] = 'ready';
      });
      renderSimulatorCards();
    });
  }

  /* ==========================================================================
     5. SECTION 7: INTERACTIVE PRICING MATRIX WITH "OFFENSE + DEFENSE"
        SMART SITE EQUITY TOGGLE
     ========================================================================== */
  const toggleStandaloneBtn = document.getElementById('toggle-mode-standalone');
  const toggleBundleBtn = document.getElementById('toggle-mode-bundle');
  const priceTier1El = document.getElementById('price-tier-1');
  const priceTier2El = document.getElementById('price-tier-2');
  const priceTier3El = document.getElementById('price-tier-3');
  const priceSub1El = document.getElementById('price-sub-tier-1');
  const priceSub2El = document.getElementById('price-sub-tier-2');
  const priceSub3El = document.getElementById('price-sub-tier-3');
  const bundleSavingsBadges = Array.from(document.querySelectorAll('.bundle-savings-badge'));
  const smartSiteBonusPanels = Array.from(document.querySelectorAll('.smart-site-bonus-panel'));
  const vaultSmartSiteCheckbox = document.getElementById('vault-smart-site-checkbox');

  let currentPricingMode = 'standalone'; // 'standalone' | 'bundle'

  function setPricingMode(mode) {
    currentPricingMode = mode === 'bundle' ? 'bundle' : 'standalone';
    const isBundle = currentPricingMode === 'bundle';

    if (toggleStandaloneBtn && toggleBundleBtn) {
      toggleStandaloneBtn.setAttribute('aria-pressed', (!isBundle).toString());
      toggleBundleBtn.setAttribute('aria-pressed', isBundle.toString());

      if (isBundle) {
        toggleStandaloneBtn.classList.remove('is-active-standalone');
        toggleStandaloneBtn.classList.add('text-slate-300');
        toggleBundleBtn.classList.add('is-active-bundle');
        toggleBundleBtn.classList.remove('text-slate-300');
      } else {
        toggleStandaloneBtn.classList.add('is-active-standalone');
        toggleStandaloneBtn.classList.remove('text-slate-300');
        toggleBundleBtn.classList.remove('is-active-bundle');
        toggleBundleBtn.classList.add('text-slate-300');
      }
    }

    if (priceTier1El) priceTier1El.textContent = isBundle ? '$547' : '$297';
    if (priceTier2El) priceTier2El.textContent = isBundle ? '$847' : '$597';
    if (priceTier3El) priceTier3El.textContent = isBundle ? '$1,147' : '$897';

    if (priceSub1El) {
      priceSub1El.textContent = isBundle
        ? 'INCLUDES SMART SITE (+$200/MO EQUITY CREDIT)'
        : 'STARTS WITH 7-DAY FREE TEST DRIVE (3 DEALS/DAY)';
    }
    if (priceSub2El) {
      priceSub2El.textContent = isBundle
        ? 'INCLUDES SMART SITE (+$200/MO EQUITY CREDIT)'
        : 'STARTS WITH 7-DAY FREE TEST DRIVE (3 DEALS/DAY)';
    }
    if (priceSub3El) {
      priceSub3El.textContent = isBundle
        ? '100% ZIP EXCLUSIVE + SMART SITE EQUITY BUNDLE'
        : 'LOCKS OUT DIRECT COMPETITORS IN YOUR ZIP';
    }

    bundleSavingsBadges.forEach((badge) => {
      badge.classList.toggle('hidden', !isBundle);
    });

    smartSiteBonusPanels.forEach((panel) => {
      panel.classList.toggle('hidden', !isBundle);
    });

    if (vaultSmartSiteCheckbox) {
      vaultSmartSiteCheckbox.checked = isBundle;
    }
  }

  if (toggleStandaloneBtn) {
    toggleStandaloneBtn.addEventListener('click', () => setPricingMode('standalone'));
  }
  if (toggleBundleBtn) {
    toggleBundleBtn.addEventListener('click', () => setPricingMode('bundle'));
  }

  document.querySelectorAll('[data-activate-bundle="true"]').forEach((link) => {
    link.addEventListener('click', () => {
      setPricingMode('bundle');
    });
  });

  /* ==========================================================================
     6. SECTION 8: FRICTIONLESS SINGLE-CARD TERRITORY ACTIVATION VAULT
        (Synced Mobile Native <select> Dropdowns + Desktop Pills)
     ========================================================================== */
  let selectedVaultTrade = 'Commercial Concrete';
  let selectedVaultTier = 'Tier 2: Commercial Permits';
  let countdownInterval = null;

  const vaultTradeButtons = Array.from(document.querySelectorAll('#vault-trade-pills [data-vault-trade]'));
  const vaultTierButtons = Array.from(document.querySelectorAll('#vault-tier-pills [data-vault-tier]'));
  const vaultTradeSelectMobile = document.getElementById('vault-trade-select-mobile');
  const vaultTierSelectMobile = document.getElementById('vault-tier-select-mobile');
  const pricingTierCtas = Array.from(document.querySelectorAll('.pricing-tier-cta[data-select-tier]'));
  const activationForm = document.getElementById('territory-activation-form');
  const vaultFormView = document.getElementById('vault-form-view');
  const vaultConfirmationView = document.getElementById('vault-confirmation-view');
  const vaultResetBtn = document.getElementById('vault-reset-btn');

  const confirmTradeVal = document.getElementById('confirm-trade-val');
  const confirmZipVal = document.getElementById('confirm-zip-val');
  const confirmTierVal = document.getElementById('confirm-tier-val');
  const confirmContactVal = document.getElementById('confirm-contact-val');
  const sevenAmCountdownEl = document.getElementById('seven-am-countdown');

  function selectVaultTrade(tradeName) {
    selectedVaultTrade = tradeName;
    vaultTradeButtons.forEach((btn) => {
      const match = btn.getAttribute('data-vault-trade') === tradeName;
      btn.classList.toggle('is-selected', match);
    });
    if (vaultTradeSelectMobile && vaultTradeSelectMobile.value !== tradeName) {
      vaultTradeSelectMobile.value = tradeName;
    }
  }

  function selectVaultTier(tierName) {
    selectedVaultTier = tierName;
    vaultTierButtons.forEach((btn) => {
      const match = btn.getAttribute('data-vault-tier') === tierName;
      btn.classList.toggle('is-selected', match);
    });
    if (vaultTierSelectMobile && vaultTierSelectMobile.value !== tierName) {
      vaultTierSelectMobile.value = tierName;
    }
  }

  vaultTradeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-vault-trade');
      if (val) selectVaultTrade(val);
    });
  });

  if (vaultTradeSelectMobile) {
    vaultTradeSelectMobile.addEventListener('change', (e) => {
      if (e.target.value) selectVaultTrade(e.target.value);
    });
  }

  vaultTierButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-vault-tier');
      if (val) selectVaultTier(val);
    });
  });

  if (vaultTierSelectMobile) {
    vaultTierSelectMobile.addEventListener('change', (e) => {
      if (e.target.value) selectVaultTier(e.target.value);
    });
  }

  pricingTierCtas.forEach((cta) => {
    cta.addEventListener('click', () => {
      const tier = cta.getAttribute('data-select-tier');
      if (tier) selectVaultTier(tier);
    });
  });

  function formatSecondsToHHMMSS(totalSeconds) {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return [hrs, mins, secs].map((n) => String(n).padStart(2, '0')).join(':');
  }

  function getSecondsUntilNextSevenAM() {
    const now = new Date();
    const target7AM = new Date(now);
    target7AM.setHours(7, 0, 0, 0);
    if (now >= target7AM) {
      target7AM.setDate(target7AM.getDate() + 1);
    }
    return Math.max(1, Math.floor((target7AM.getTime() - now.getTime()) / 1000));
  }

  function startSevenAMCountdown() {
    if (countdownInterval) clearInterval(countdownInterval);
    let remaining = getSecondsUntilNextSevenAM();
    if (sevenAmCountdownEl) {
      sevenAmCountdownEl.textContent = formatSecondsToHHMMSS(remaining);
    }
    countdownInterval = setInterval(() => {
      remaining = Math.max(0, remaining - 1);
      if (sevenAmCountdownEl) {
        sevenAmCountdownEl.textContent = formatSecondsToHHMMSS(remaining);
      }
    }, 1000);
  }

  if (activationForm) {
    activationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const zipInput = document.getElementById('vault-zip-input');
      const phoneInput = document.getElementById('vault-phone-input');
      const emailInput = document.getElementById('vault-email-input');

      const zipVal = zipInput && zipInput.value.trim() ? zipInput.value.trim() : '75024 (Local Metro Radius)';
      const phoneVal = phoneInput && phoneInput.value.trim() ? phoneInput.value.trim() : 'SMS Queue Armed';
      const emailVal = emailInput && emailInput.value.trim() ? emailInput.value.trim() : 'Primary Inbox Armed';
      const includeSmartSite = vaultSmartSiteCheckbox && vaultSmartSiteCheckbox.checked;

      if (confirmTradeVal) confirmTradeVal.textContent = selectedVaultTrade;
      if (confirmZipVal) confirmZipVal.textContent = zipVal;
      if (confirmTierVal) {
        confirmTierVal.textContent = includeSmartSite
          ? `${selectedVaultTier} + Smart Site Equity`
          : selectedVaultTier;
      }
      if (confirmContactVal) {
        confirmContactVal.textContent = `DISPATCH ARMED FOR: ${phoneVal.toUpperCase()} • ${emailVal.toUpperCase()}`;
      }

      if (vaultFormView && vaultConfirmationView) {
        vaultFormView.classList.add('hidden');
        vaultConfirmationView.classList.remove('hidden');
      }

      startSevenAMCountdown();
    });
  }

  if (vaultResetBtn) {
    vaultResetBtn.addEventListener('click', () => {
      if (vaultFormView && vaultConfirmationView) {
        vaultConfirmationView.classList.add('hidden');
        vaultFormView.classList.remove('hidden');
      }
    });
  }
})();
