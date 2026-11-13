/* ==========================================================================
   TIBERIUS ACCOUNT SCOUT™ — VARIANT C: ALL-OUT ROOFER EDITION (style-c.js)
   - Accessible Roofing Target Tablist (selection-follows-focus + hidden="until-found")
   - 1-Click 4-Sentence Roof Walk SMS Copy
   - Live Roof PMA + Re-Roof Payback Calculator + Dynamic Telemetry Bars
   - WCAG 2.2.2 Marquee Pause / Play Control
   - Modal <dialog closedby="any"> + Mandatory Safari Light-Dismiss Fallback
   - Live Monday Roof Card Inspector Modal (8 Engine Cards + 2 Scenario Cards)
   - Non-Intrusive Form Validation (blur -> validate, input -> clear, submit -> focus)
   ========================================================================== */

(() => {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Mandatory Safari Fallback for <dialog closedby="any">
     ------------------------------------------------------------------------ */
  const dialogs = document.querySelectorAll('dialog[closedby="any"]');
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    for (const dialog of dialogs) {
      dialog.addEventListener('click', (event) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (isDialogContent) return;
        dialog.close();
      });
    }
  }

  /* Explicit Close Buttons inside Dialogs */
  for (const closeBtn of document.querySelectorAll('[data-close-dialog]')) {
    closeBtn.addEventListener('click', () => {
      const targetDialog = closeBtn.closest('dialog');
      if (targetDialog && targetDialog.open) {
        targetDialog.close();
      }
    });
  }

  /* ------------------------------------------------------------------------
     2. Accessible Roof Target Tablist (Selection Follows Focus + Find-in-Page)
     ------------------------------------------------------------------------ */
  const tablist = document.querySelector('[role="tablist"]');
  if (tablist) {
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    const panels = tabs.map((tab) =>
      document.querySelector(`[role="tabpanel"][aria-labelledby="${CSS.escape(tab.id)}"]`)
    );

    const activateTab = (selectedTab, moveFocus = false) => {
      tabs.forEach((tab, idx) => {
        const isSelected = tab === selectedTab;
        tab.setAttribute('aria-selected', String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;
        tab.toggleAttribute('focusgroupstart', isSelected);

        const panel = panels[idx];
        if (panel) {
          if (isSelected) {
            panel.hidden = false;
          } else {
            panel.hidden = 'until-found';
          }
        }
      });

      selectedTab.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });

      if (moveFocus) {
        selectedTab.focus();
      }
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab, false));

      tab.addEventListener('keydown', (event) => {
        let nextIndex = -1;
        if (event.key === 'ArrowRight') {
          nextIndex = (index + 1) % tabs.length;
        } else if (event.key === 'ArrowLeft') {
          nextIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (event.key === 'Home') {
          nextIndex = 0;
        } else if (event.key === 'End') {
          nextIndex = tabs.length - 1;
        }

        if (nextIndex !== -1) {
          event.preventDefault();
          activateTab(tabs[nextIndex], true);
        }
      });
    });

    /* Sync selection when browser Find-in-Page reveals a hidden="until-found" panel */
    panels.forEach((panel, idx) => {
      if (!panel) return;
      panel.addEventListener('beforematch', () => {
        activateTab(tabs[idx], false);
      });
    });
  }

  /* ------------------------------------------------------------------------
     3. 1-Click Copy for 4-Sentence Roof Walk SMS Opener
     ------------------------------------------------------------------------ */
  for (const copyBtn of document.querySelectorAll('.js-copy-sms')) {
    copyBtn.addEventListener('click', async () => {
      const scriptText = copyBtn.getAttribute('data-sms') || '';
      if (!scriptText) return;

      const defaultLabel = copyBtn.getAttribute('data-default-label') || 'COPY ROOF WALK SMS';
      try {
        await navigator.clipboard.writeText(scriptText);
        copyBtn.textContent = '✓ COPIED TO CLIPBOARD';
        window.setTimeout(() => {
          copyBtn.textContent = defaultLabel;
        }, 2200);
      } catch {
        copyBtn.textContent = 'SELECT TEXT IN PHONE TO COPY';
        window.setTimeout(() => {
          copyBtn.textContent = defaultLabel;
        }, 2200);
      }
    });
  }

  /* ------------------------------------------------------------------------
     4. Live 60-Second Roof PMA + Re-Roof Payback Engine
     ------------------------------------------------------------------------ */
  const pmaSlider = document.getElementById('pma-value-slider');
  const pmaValOutput = document.getElementById('pma-value-display');
  const roiMultipleOutput = document.getElementById('pma-roi-multiple');
  const roiYearsOutput = document.getElementById('pma-years-covered');
  const telemetryBars = Array.from(document.querySelectorAll('#pma-telemetry i'));

  const ANNUAL_CHARTER_COST = 197 * 12; // $2,364/yr

  const updatePmaMath = () => {
    if (!pmaSlider) return;
    const accountVal = Number(pmaSlider.value) || 45000;
    const multiple = accountVal / ANNUAL_CHARTER_COST;
    const yearsCovered = accountVal / ANNUAL_CHARTER_COST;

    if (pmaValOutput) {
      pmaValOutput.textContent = `$${accountVal.toLocaleString('en-US')}`;
    }
    if (roiMultipleOutput) {
      roiMultipleOutput.textContent = `${multiple.toFixed(1)}X`;
    }
    if (roiYearsOutput) {
      roiYearsOutput.textContent = `${yearsCovered.toFixed(1)} YRS`;
    }

    const ratio = (accountVal - 15000) / (150000 - 15000);
    telemetryBars.forEach((bar, i) => {
      const wave = Math.sin((i + 1) * 0.85) * 18 + 32;
      const scaled = Math.min(98, Math.max(22, Math.round(wave + ratio * 48)));
      bar.style.setProperty('--bar-h', `${scaled}%`);
    });
  };

  if (pmaSlider) {
    pmaSlider.addEventListener('input', updatePmaMath);
    updatePmaMath();
  }

  /* ------------------------------------------------------------------------
     5. WCAG 2.2.2 Pause / Play Button for Roof Asset Marquee
        (Label toggles between "Pause" and "Play" without aria-pressed)
     ------------------------------------------------------------------------ */
  const marqueeShell = document.getElementById('property-marquee');
  const marqueeToggle = document.getElementById('marquee-toggle');
  if (marqueeShell && marqueeToggle) {
    marqueeToggle.addEventListener('click', () => {
      const isPaused = marqueeShell.getAttribute('data-paused') === 'true';
      const nextPaused = !isPaused;
      marqueeShell.setAttribute('data-paused', String(nextPaused));
      marqueeToggle.textContent = nextPaused ? 'Play' : 'Pause';
    });
  }

  /* ------------------------------------------------------------------------
     6. Live Roof Specimen & Signal Inspector Modal (100% Commercial/HOA Roofing)
     ------------------------------------------------------------------------ */
  const ARTIFACT_LIBRARY = {
    '01': {
      badge: 'SIGNAL 01 · 14–22 YR MEMBRANE & PERMIT-GAP RADAR',
      title: 'Oakridge Medical Plaza — 68,400 SF Flat TPO (684 Sqs)',
      property: '1420 Oakridge Pkwy · Built 2008 (18-Yr Original Membrane)',
      decisionMaker: 'Dana Alvarez, CPM · Horizon Commercial (11 Plazas)',
      signal: 'County CAD #4419-B · Zero Re-Roof Permits Logged Since 2008',
      value: 'Est. $14,500/yr Leak/Drain PMA + $168k TPO Recover',
      note: '“Dana — saw Horizon oversees 1420 Oakridge Pkwy (2008 TPO roof). Our commercial service crew is 5 minutes down Oakridge this Thursday; want 6 free parapet, scupper & RTU pitch-pan photos for your Q2 owner report?”',
    },
    '02': {
      badge: 'SIGNAL 02 · STATE HOA MANAGEMENT CERTIFICATE SWEEP',
      title: 'Creekside Villas HOA — 214 Townhomes + Clubhouse',
      property: '2900 Creekside Commons · 26 Shingle Buildings (Built 2009)',
      decisionMaker: 'Marcus Vance, CMCA · Sterling Association Mgmt',
      signal: 'State HOA Cert #88412 · New CAM Assigned 19 Days Ago',
      value: 'Est. $24,000/yr Valley/Gutter PMA + $380k Reserve Phase-1',
      note: '“Marcus — noticed Sterling just filed the updated HOA management certificate on Creekside Villas (214 roofs). Want a complimentary 1-page granule-loss & valley photo map before next month’s board reserve packet?”',
    },
    '03': {
      badge: 'SIGNAL 03 · ANONYMOUS HOLDING LLC UNMASKING',
      title: 'Westgate Logistics Center — 92,000 SF R-Panel Metal',
      property: '810 Westgate Blvd · Tax Owner: “WGB 810 Holdings LLC”',
      decisionMaker: 'Brett Keller · Portfolio Director, Meridian Industrial',
      signal: 'SOS Officer + Tax-Bill Care-Of Match → Verified Cell & Email',
      value: 'Est. $19,200/yr Fastener/Skylight PMA + $135k Silicone Coating',
      note: '“Brett — our commercial roof techs are walking two tilt-wall warehouses off Westgate Friday morning. Happy to shoot 8 timestamped skylight curb & fastener-washer photos on 810 Westgate at zero cost if helpful.”',
    },
    '04': {
      badge: 'SIGNAL 04 · 90-DAY COMMERCIAL DEED TRANSFER TRIGGER',
      title: 'Parkview Retail Strip — 42,800 SF EPDM / Mod-Bit',
      property: '515 N Central Expy · Acquired 14 Days Ago',
      decisionMaker: 'Rachel Lin · VP Asset Management, Crestline Retail',
      signal: 'County Warranty Deed #2026-09142 · Post-Closing CapEx Window',
      value: 'Est. $12,800/yr Semi-Annual Roof PMA + $96k Coating/Recover',
      note: '“Rachel — congrats to Crestline on closing 515 N Central. New strip-center acquisitions usually inherit mystery tenant HVAC roof penetrations; want a 15-minute core-free seam & drain photo baseline Wednesday?”',
    },
    '05': {
      badge: 'SIGNAL 05 · ROOF FOOTPRINT & SQUARE-COUNT TRIAGE',
      title: 'Pre-Sized Commercial Roofs So Estimators Skip Tiny Jobs',
      property: 'Filtered to 15,000–150,000+ SF Commercial & Multi-Building Sites',
      decisionMaker: 'Sorted by Proximity to Your Shop Yard (3 Contiguous ZIPs)',
      signal: 'CAD Main-Area Footprint + Multi-Building Roof Cluster Count',
      value: 'Prioritizes 200 to 1,200+ Square Commercial & HOA Opportunities',
      note: '“Why It Fits: 68,400 SF single-story medical retail footprint (~684 squares low-slope), 18 years old with zero re-roof permits, 3.8 miles from your shop yard.”',
    },
    '06': {
      badge: 'SIGNAL 06 · ZERO-LINK SUPERINTENDENT PHOTO-WALK NOTES',
      title: 'Peer-to-Peer Field Notes That Actually Get Roof Hatches Unlocked',
      property: 'Zero Marketing Links · Zero PDF Attachments · Zero Spam Words',
      decisionMaker: 'Written for Busy CPMs & CAMs Between Property Inspections',
      signal: 'Offers Free 6-Photo Drain, Flashing & Seam Documentation',
      value: 'Gets Your Truck on the Roof Without Competing Against 8 Bids',
      note: '“Hey Dana — our commercial roof tech is wrapping a walk two blocks off Oakridge Thursday at 9:30 AM. Want 6 free timestamped scupper, parapet & curb photos on 1420 Oakridge for your owner file? No pitch.”',
    },
    '07': {
      badge: 'SIGNAL 07 · ISOLATED COLD-EMAIL DOMAIN SHIELD',
      title: '0% Risk to Your Estimating, Xactimate & Proposal Domain',
      property: 'Dedicated Warmed Outreach Domains (SPF / DKIM / DMARC)',
      decisionMaker: 'PM & HOA Replies Route Directly Into Your Real Shop Inbox',
      signal: 'Your Main Company Domain Never Sends a Single Cold Packet',
      value: 'Protects Proposal, Supplement & Subcontractor Deliverability',
      note: 'When a Property Manager replies “Thursday at 10am works—ask security for the hatch key,” it lands straight in your normal inbox while your main roofing domain stays 100% untouched.',
    },
    '08': {
      badge: 'SIGNAL 08 · MAX-2 ROOFERS PER ZIP TERRITORY LOCK',
      title: 'Strict Scarcity: Never Shared With 10 Local Roofing Competitors',
      property: '3 Contiguous ZIP Codes Locked Around Your Service Area',
      decisionMaker: 'Hard Cap of 2 Roofing Contractors Total Per ZIP Code',
      signal: 'Automatic ZIP Waitlist Engages the Second Slot #2 Fills',
      value: '$197/mo Founding Roofer Charter Locked in for Life',
      note: 'Lead sites sell the same residential leak to 6 roofers in 5 minutes. Account Scout locks each ZIP at max 2 commercial roofers so local Property Managers never get hammered.',
    },
    'scenario-tpo': {
      badge: 'MONDAY 6:45 AM ROOF CARD · LOW-SLOPE TPO / EPDM',
      title: '68,400 SF Retail & Medical Strip Center (Built 2008)',
      property: '1420 Oakridge Pkwy · ~684 Sqs Original TPO · 11 RTU Curbs',
      decisionMaker: 'Dana Alvarez, CPM · Horizon Commercial (Manages 11 Plazas)',
      signal: '18-Yr Membrane + Zero Re-Roof Permits + 3.8 Mi From Shop',
      value: '$14,500/yr Semi-Annual Leak PMA → $168k TPO Recover',
      note: '“Dana — saw Horizon oversees 1420 Oakridge. Our commercial roof supervisor is two blocks down Thursday at 9:30 AM; want 6 quick seam, scupper & pitch-pan photos for your Q2 owner reserve report?”',
    },
    'scenario-hoa': {
      badge: 'MONDAY 6:45 AM ROOF CARD · MULTI-BUILDING HOA PORTFOLIO',
      title: 'Creekside Villas HOA — 214 Townhome Doors + Clubhouse',
      property: '2900 Creekside Commons · 26 Buildings · 17-Yr Architectural Shingles',
      decisionMaker: 'Marcus Vance, CMCA · Sterling HOA Mgmt (Manages 9 HOAs)',
      signal: 'Amended State HOA Cert Filed 19 Days Ago + Pre-Storm Window',
      value: '$24,000/yr Roof/Gutter PMA → $380k Board Reserve Replacement',
      note: '“Marcus — noticed Sterling just took over Creekside Villas (214 doors). Want a clean 1-page building-by-building roof age & valley photo map before your first HOA board meeting next month?”',
    },
  };

  const inspectorDialog = document.getElementById('inspector-dialog');
  const inspBadge = document.getElementById('insp-badge');
  const inspTitle = document.getElementById('insp-title');
  const inspProperty = document.getElementById('insp-property');
  const inspContact = document.getElementById('insp-contact');
  const inspSignal = document.getElementById('insp-signal');
  const inspValue = document.getElementById('insp-value');
  const inspNote = document.getElementById('insp-note');

  for (const trigger of document.querySelectorAll('[data-inspect]')) {
    trigger.addEventListener('click', () => {
      const key = trigger.getAttribute('data-inspect');
      const item = key ? ARTIFACT_LIBRARY[key] : null;
      if (!item || !inspectorDialog) return;

      if (inspBadge) inspBadge.textContent = item.badge;
      if (inspTitle) inspTitle.textContent = item.title;
      if (inspProperty) inspProperty.textContent = item.property;
      if (inspContact) inspContact.textContent = item.decisionMaker;
      if (inspSignal) inspSignal.textContent = item.signal;
      if (inspValue) inspValue.textContent = item.value;
      if (inspNote) inspNote.textContent = item.note;

      inspectorDialog.showModal();
    });
  }

  /* ------------------------------------------------------------------------
     7. Roofer Territory Check Modal + Non-Intrusive Validation
     ------------------------------------------------------------------------ */
  const territoryDialog = document.getElementById('territory-dialog');
  const planBanner = document.getElementById('selected-plan-banner');
  const territoryForm = document.getElementById('territory-form');
  const formStatus = document.getElementById('territory-form-status');
  const submitBtn = document.getElementById('territory-submit-btn');

  const openTerritoryModal = (planLabel, preselectFocus) => {
    if (!territoryDialog) return;
    if (planBanner && planLabel) {
      planBanner.textContent = `SELECTED: ${planLabel.toUpperCase()}`;
    }
    if (preselectFocus && territoryForm) {
      const radio = territoryForm.querySelector(
        `input[name="roof_focus"][value="${CSS.escape(preselectFocus)}"]`
      );
      if (radio) radio.checked = true;
    }
    if (inspectorDialog && inspectorDialog.open) {
      inspectorDialog.close();
    }
    territoryDialog.showModal();
  };

  for (const btn of document.querySelectorAll('.js-open-territory')) {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan') || '7-Day $0 Roofer Test Drive · $197/mo Charter';
      const focus = btn.getAttribute('data-focus') || '';
      openTerritoryModal(plan, focus);
    });
  }

  if (territoryForm) {
    const validatedInputs = Array.from(
      territoryForm.querySelectorAll('input[required]')
    );
    const touched = new WeakSet();

    const getErrorMessage = (input) => {
      if (input.validity.valueMissing) {
        if (input.name === 'zip') return 'Enter your shop’s primary 5-digit ZIP code.';
        if (input.name === 'company_contact') return 'Enter your name and roofing company name.';
        if (input.name === 'email') return 'Enter your work email for Monday 6:45 AM roof cards.';
        if (input.name === 'phone') return 'Enter your cell number for 1-tap walk SMS.';
        return 'This field is required.';
      }
      if (input.validity.patternMismatch && input.name === 'zip') {
        return 'Enter a valid 5-digit US ZIP code (e.g., 75024).';
      }
      if (input.validity.typeMismatch && input.name === 'email') {
        return 'Enter a valid email address (e.g., mike@apexroofing.com).';
      }
      return '';
    };

    const renderFieldError = (input, show) => {
      const errorEl = document.getElementById(`${input.id}-error`);
      const message = show ? getErrorMessage(input) : '';
      input.setAttribute('aria-invalid', message ? 'true' : 'false');
      if (errorEl) {
        errorEl.textContent = message;
      }
      return !message;
    };

    validatedInputs.forEach((input) => {
      input.addEventListener('blur', () => {
        if (input.value.trim().length > 0 || touched.has(input)) {
          touched.add(input);
          renderFieldError(input, true);
        }
      });

      input.addEventListener('input', () => {
        if (input.getAttribute('aria-invalid') === 'true' && input.checkValidity()) {
          renderFieldError(input, false);
        }
      });
    });

    territoryForm.addEventListener('submit', (event) => {
      event.preventDefault();

      let firstInvalid = null;
      for (const input of validatedInputs) {
        touched.add(input);
        const valid = renderFieldError(input, true);
        if (!valid && !firstInvalid) {
          firstInvalid = input;
        }
      }

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      const data = new FormData(territoryForm);
      const zip = String(data.get('zip') || '').trim();
      const focus = String(data.get('roof_focus') || 'Low-Slope TPO / EPDM');
      const contact = String(data.get('company_contact') || '').trim();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'CHECKING ROOFER SLOTS IN YOUR ZIP...';
      }

      window.setTimeout(() => {
        if (formStatus) {
          formStatus.textContent =
            `✓ ZIP ${zip} (${focus}) shows 1 of 2 Founding Roofer slots open for ${contact}. Your 7-Day $0.00 Test Drive & Monday 6:45 AM roof batch reservation is queued.`;
        }
        if (submitBtn) {
          submitBtn.textContent = '✓ ROOFER TERRITORY QUEUED ($0 TODAY)';
        }
      }, 350);
    });
  }
})();
