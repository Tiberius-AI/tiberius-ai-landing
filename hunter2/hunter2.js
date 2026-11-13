/* ==========================================================================
   TIBERIUS ROOFER EDITION (HUNTER 2) — INTERACTIVE CLIENT LOGIC
   - Accessible Two-Avatar Tablist (`tabs` guide: focusgroup + hidden="until-found")
   - Paired 90s Walkthrough Video Stage + Beat Jump Controls
   - Interactive "Try It From Your Truck" Proof Station (SMS + Real Audio + Permit Card)
   - Interactive 2-Slider Roofing Replacement Math ROI Calculator
   - Modal `<dialog closedby="any">` + Safari Fallback (`light-dismiss-a-dialog`)
   - Deferred `:user-invalid` + `aria-invalid` Sync (`validate-input-after-interaction`)
   ========================================================================== */

(() => {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Mandatory Safari Fallback for `<dialog closedby="any">`
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

  for (const closeBtn of document.querySelectorAll('[data-close-dialog]')) {
    closeBtn.addEventListener('click', () => {
      const dlg = closeBtn.closest('dialog');
      if (dlg && dlg.open) dlg.close();
    });
  }

  /* ------------------------------------------------------------------------
     2. Two Roofer Avatars Accessible Tablist (`⛈️ Storm` vs `🏠 Retail & HOA`)
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

      try {
        selectedTab.scrollIntoView({
          block: 'nearest',
          inline: 'nearest',
          container: 'nearest',
        });
      } catch {
        selectedTab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      }

      if (moveFocus) {
        selectedTab.focus();
      }
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab, false));

      tab.addEventListener('keydown', (event) => {
        let nextIndex = -1;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = tabs.length - 1;

        if (nextIndex !== -1) {
          event.preventDefault();
          activateTab(tabs[nextIndex], true);
        }
      });
    });

    panels.forEach((panel, idx) => {
      if (!panel) return;
      panel.addEventListener('beforematch', () => {
        activateTab(tabs[idx], false);
      });
    });
  }

  /* ------------------------------------------------------------------------
     3. Paired 90-Second Video Walkthrough Stage + Chapter Jumps
     ------------------------------------------------------------------------ */
  const walkthroughVideo = document.getElementById('walkthrough-video');
  const posterBtn = document.getElementById('video-poster-btn');

  const startWalkthroughAt = (sec = null) => {
    if (!walkthroughVideo) return;
    if (posterBtn) posterBtn.hidden = true;
    if (typeof sec === 'number' && !Number.isNaN(sec)) {
      try {
        walkthroughVideo.currentTime = sec;
      } catch {
        // Metadata still loading; seek once loadedmetadata fires
        walkthroughVideo.addEventListener(
          'loadedmetadata',
          () => {
            walkthroughVideo.currentTime = sec;
          },
          { once: true }
        );
      }
    }
    walkthroughVideo.controls = true;
    walkthroughVideo.play().catch(() => {});
  };

  if (posterBtn) {
    posterBtn.addEventListener('click', () => startWalkthroughAt(null));
  }

  if (walkthroughVideo) {
    walkthroughVideo.addEventListener('play', () => {
      if (posterBtn) posterBtn.hidden = true;
    });
  }

  for (const chapBtn of document.querySelectorAll('[data-jump-sec]')) {
    chapBtn.addEventListener('click', () => {
      const sec = Number(chapBtn.getAttribute('data-jump-sec') || '0');
      const section = document.getElementById('video-walkthrough');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'center' });
      startWalkthroughAt(sec);
    });
  }

  /* ------------------------------------------------------------------------
     4. Section 3A: Live Sub-8-Second SMS Speed-to-Lead Simulator
     ------------------------------------------------------------------------ */
  const simPhoneInput = document.getElementById('sim-phone-input');
  const simSmsBtn = document.getElementById('sim-sms-btn');
  const simTimerEl = document.getElementById('sim-timer');
  const simThreadEl = document.getElementById('sim-thread');
  let simRunning = false;

  if (simSmsBtn && simThreadEl) {
    simSmsBtn.addEventListener('click', () => {
      if (simRunning) return;
      simRunning = true;

      const rawPhone = (simPhoneInput && simPhoneInput.value.trim()) || '(830) 555-0194';
      simSmsBtn.textContent = 'Rescuing Call...';

      simThreadEl.innerHTML = `
        <div class="r2-msg r2-msg-missed">
          ☎ MISSED CALL FROM ${escapeText(rawPhone)} (Owner on 8/12 Roof Pitch)
        </div>
      `;

      let elapsed = 0;
      const tick = window.setInterval(() => {
        elapsed += 0.6;
        if (simTimerEl) {
          simTimerEl.textContent = `RESPONSE: ${Math.min(4.2, elapsed).toFixed(1)}s`;
        }
        if (elapsed >= 4.2) {
          window.clearInterval(tick);
          const aiBubble = document.createElement('div');
          aiBubble.className = 'r2-msg r2-msg-ai';
          aiBubble.textContent =
            'Apex Roofing here — sorry we missed you while our crew is up on a steep tear-off! Is this an active roof leak, storm/hail damage, or a replacement quote? Text your street address & we can roll a truck.';
          simThreadEl.appendChild(aiBubble);

          window.setTimeout(() => {
            const replyBubble = document.createElement('div');
            replyBubble.className = 'r2-msg r2-msg-homeowner';
            replyBubble.textContent =
              '412 Oak Creek Dr — pipe boot drip in master bath after Tuesday’s hail cell. 18-yr shingles. Tomorrow AM open?';
            simThreadEl.appendChild(replyBubble);

            const crmBadge = document.createElement('div');
            crmBadge.className = 'r2-crm-sync-tag';
            crmBadge.textContent =
              '✓ Saved $16,400 RCV Job • Synced to JobNimbus & Texted to Owner F-250';
            simThreadEl.appendChild(crmBadge);

            simSmsBtn.textContent = '✓ Rescued in 4.2s (Run Again)';
            simRunning = false;
          }, 550);
        }
      }, 95);
    });
  }

  function escapeText(str) {
    return String(str).replace(/[<>&"]/g, '');
  }

  /* ------------------------------------------------------------------------
     5. Section 3B: "Listen to a Real Call Save" Audio Player
     ------------------------------------------------------------------------ */
  const callAudio = document.getElementById('call-save-audio');
  const audioPlayBtn = document.getElementById('audio-play-btn');
  const audioWaveform = document.getElementById('audio-waveform');
  const audioTimeDisplay = document.getElementById('audio-time-display');
  const audioTranscript = document.getElementById('audio-transcript');

  const formatTime = (sec) => {
    const s = Math.max(0, Math.floor(sec || 0));
    const m = Math.floor(s / 60);
    const rem = String(s % 60).padStart(2, '0');
    return `${m}:${rem}`;
  };

  if (callAudio && audioPlayBtn) {
    audioPlayBtn.addEventListener('click', () => {
      if (callAudio.paused) {
        callAudio.play().catch(() => {});
      } else {
        callAudio.pause();
      }
    });

    callAudio.addEventListener('play', () => {
      audioPlayBtn.textContent = '⏸ Pause Call Save';
      if (audioWaveform) audioWaveform.classList.add('is-playing');
    });

    callAudio.addEventListener('pause', () => {
      audioPlayBtn.textContent = '▶ Play 23s Call Save';
      if (audioWaveform) audioWaveform.classList.remove('is-playing');
    });

    callAudio.addEventListener('ended', () => {
      audioPlayBtn.textContent = '▶ Replay 23s Call Save';
      if (audioWaveform) audioWaveform.classList.remove('is-playing');
    });

    callAudio.addEventListener('timeupdate', () => {
      const cur = callAudio.currentTime || 0;
      const dur = callAudio.duration || 23;
      if (audioTimeDisplay) {
        audioTimeDisplay.textContent = `${formatTime(cur)} / ${formatTime(dur)}`;
      }
      if (audioTranscript) {
        if (cur < 6.5) {
          audioTranscript.textContent =
            '“Thanks for calling Apex Roofing. Our crews are up on an 8/12 pitch right now, so let’s get your roof taken care of fast...”';
        } else if (cur < 14.5) {
          audioTranscript.textContent =
            '“I pulled up 412 Oak Creek Drive — is this an active ceiling leak or hail damage from Tuesday’s storm cell?”';
        } else {
          audioTranscript.textContent =
            '“Got it, active pipe-boot drip on an 18-year architectural shingle roof. Locked into tomorrow’s 8:30 AM ladder inspection!”';
        }
      }
    });
  }

  /* ------------------------------------------------------------------------
     6. Section 3C: Live County Permit & Aging Roof Recon Card Switcher
     ------------------------------------------------------------------------ */
  const PERMIT_RECORDS = [
    {
      id: 'CAD PARCEL #4419-B',
      val: '684 Sqs • $168K Est',
      title: 'Oakridge Medical Plaza — 68,400 SF Flat TPO',
      zip: 'ZIP 78130 • Built 2008',
      contact: 'Dana Alvarez, CPM (11 Plazas)',
      signal: 'Zero Re-Roof Permits in 18 Yrs',
      scope: 'Annual Leak PMA + TPO Recover',
      opener:
        '1-Tap Walk SMS: “Morning Dana — crew is 5 mins off Oakridge Thu; want 6 free scupper, parapet & pitch-pan photos for your Q2 owner file?”',
    },
    {
      id: 'PERMIT #BLD-2026-8841',
      val: '$38,400 Valuation',
      title: '412 Oak Creek Dr — 44-Sq Steep-Slope + Patio Tie-In',
      zip: 'ZIP 78132 • 10/12 Pitch',
      contact: 'R. & M. Henderson (Homeowner)',
      signal: 'Structural Tie-In + 19-Yr Shingles',
      scope: 'Class 4 Impact Architectural Tear-Off',
      opener:
        '1-Tap Alert: Structural rear addition filed yesterday with no roofing sub named on permit — 19-year GAF Timberline tie-in window.',
    },
    {
      id: 'HOA CERT #88412-TX',
      val: '214 Doors • $380K Est',
      title: 'Creekside Villas HOA — 26 Townhome Buildings',
      zip: 'ZIP 78130 • 17-Yr Roofs',
      contact: 'Marcus Vance, CMCA (9 HOAs)',
      signal: 'New CAM Assigned 19 Days Ago',
      scope: '$24K/yr Gutter/Valley PMA + Phase-1',
      opener:
        '1-Tap Walk SMS: “Hey Marcus — saw Sterling took over Creekside Villas (214 roofs). Want a free 1-page valley & granule-loss map before board packet?”',
    },
  ];

  let permitIndex = 0;
  const cyclePermitBtn = document.getElementById('cycle-permit-btn');
  if (cyclePermitBtn) {
    cyclePermitBtn.addEventListener('click', () => {
      permitIndex = (permitIndex + 1) % PERMIT_RECORDS.length;
      const rec = PERMIT_RECORDS[permitIndex];
      const setTxt = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
      };
      setTxt('p-id', rec.id);
      setTxt('p-val', rec.val);
      setTxt('p-title', rec.title);
      setTxt('p-zip', rec.zip);
      setTxt('p-contact', rec.contact);
      setTxt('p-signal', rec.signal);
      setTxt('p-scope', rec.scope);
      setTxt('p-opener', rec.opener);
    });
  }

  /* ------------------------------------------------------------------------
     7. Section 4: Interactive "1 Roof Pays for 3 Years" Replacement Math ROI
     ------------------------------------------------------------------------ */
  const ticketSlider = document.getElementById('ticket-slider');
  const missedSlider = document.getElementById('missed-slider');
  const ticketOutput = document.getElementById('ticket-output');
  const missedOutput = document.getElementById('missed-output');
  const monthlyLeakOutput = document.getElementById('monthly-leak-output');
  const annualLeakOutput = document.getElementById('annual-leak-output');
  const scoutMonthsOutput = document.getElementById('scout-months-output');
  const stackMonthsOutput = document.getElementById('stack-months-output');
  const roiPunchline = document.getElementById('roi-punchline');

  const SCOUT_MONTHLY = 197;
  const FULL_STACK_MONTHLY = 297 + 197; // $494/mo ($297 Own-It Smart Site + $197 Account Scout)

  const updateRoiCalculator = () => {
    if (!ticketSlider || !missedSlider) return;
    const ticket = Number(ticketSlider.value) || 14500;
    const missed = Number(missedSlider.value) || 6;

    // Conservative 33.3% (1-in-3) close rate on warm roof calls & quotes sitting in truck
    const monthlyLeak = Math.round((ticket * missed) / 3);
    const annualLeak = monthlyLeak * 12;
    const scoutMonths = Math.floor(ticket / SCOUT_MONTHLY);
    const stackMonths = Math.floor(ticket / FULL_STACK_MONTHLY);

    const fmtUsd = (n) => `$${n.toLocaleString('en-US')}`;

    if (ticketOutput) ticketOutput.textContent = fmtUsd(ticket);
    if (missedOutput) missedOutput.textContent = `${missed} calls / quotes`;
    if (monthlyLeakOutput) monthlyLeakOutput.textContent = `${fmtUsd(monthlyLeak)}/mo`;
    if (annualLeakOutput) annualLeakOutput.textContent = `${fmtUsd(annualLeak)}/yr leaking to competitors`;
    if (scoutMonthsOutput) scoutMonthsOutput.textContent = `${scoutMonths} Mos`;
    if (stackMonthsOutput) stackMonthsOutput.textContent = `${stackMonths} Mos`;

    if (roiPunchline) {
      roiPunchline.textContent =
        `Catching just ONE extra ${fmtUsd(ticket)} tear-off this year covers your $297/mo Own-It Smart Site + $197/mo Account Scout Radar for the next ${stackMonths} months (or ${scoutMonths} months of standalone Account Scout).`;
    }
  };

  if (ticketSlider && missedSlider) {
    ticketSlider.addEventListener('input', updateRoiCalculator);
    missedSlider.addEventListener('input', updateRoiCalculator);
    updateRoiCalculator();
  }

  /* ------------------------------------------------------------------------
     8. Claim Dialog + Deferred `:user-invalid` Validation & ARIA Live Sync
     ------------------------------------------------------------------------ */
  const claimDialog = document.getElementById('claim-dialog');
  const claimForm = document.getElementById('claim-form');
  const claimStatus = document.getElementById('claim-form-status');
  const claimSubmitBtn = document.getElementById('claim-submit-btn');

  for (const trigger of document.querySelectorAll('.js-open-claim')) {
    trigger.addEventListener('click', () => {
      if (!claimDialog) return;
      const presetPlan = trigger.getAttribute('data-plan-choice');
      if (presetPlan && claimForm) {
        const radio = claimForm.querySelector(
          `input[name="selected_stack"][value="${CSS.escape(presetPlan)}"]`
        );
        if (radio) radio.checked = true;
      }
      claimDialog.showModal();
    });
  }

  // Polite live region for screen-reader error announcements (`validate-input-after-interaction`)
  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', 'polite');
  announcer.classList.add('visually-hidden');
  document.body.append(announcer);
  let announceTimer;
  let announcedField;

  const linkError = (el, shown) => {
    const errorId = el.dataset ? el.dataset.error : '';
    if (!errorId) return;
    const ids = (el.getAttribute('aria-describedby') || '')
      .split(/\s+/)
      .filter((id) => id && id !== errorId);
    if (shown) ids.push(errorId);
    if (ids.length) el.setAttribute('aria-describedby', ids.join(' '));
    else el.removeAttribute('aria-describedby');
  };

  const spokenText = (node) => {
    const copy = node.cloneNode(true);
    copy.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
    copy.querySelectorAll('[role="img"][aria-label]').forEach((n) => {
      n.replaceWith(`${n.getAttribute('aria-label')}: `);
    });
    return copy.textContent.replace(/\s+/g, ' ').trim();
  };

  const announceError = (el) => {
    const error = document.getElementById(el.dataset.error);
    if (!error) return;
    const label = el.labels && el.labels[0] ? `${spokenText(el.labels[0])}: ` : '';
    window.clearTimeout(announceTimer);
    announcer.textContent = '';
    announcedField = el;
    announceTimer = window.setTimeout(() => {
      announcer.textContent = label + spokenText(error);
    }, 500);
  };

  if (claimForm) {
    const supportsUserInvalid = CSS.supports('selector(:user-invalid)');
    const dirtyMap = new WeakMap();
    const flagged = new WeakSet();
    const announced = new WeakSet();

    const syncAria = (el, announce = false) => {
      if (!el || !el.matches || !el.matches('input, select, textarea')) return;
      let invalid = false;
      if (supportsUserInvalid) {
        invalid = el.matches(':user-invalid');
      } else {
        const st = dirtyMap.get(el);
        invalid = Boolean(st && st.hasInteracted && st.hasBlurred && !el.validity.valid);
        el.classList.toggle('user-invalid-fallback', invalid);
        el.classList.toggle('user-valid-fallback', Boolean(st && st.hasBlurred && el.validity.valid));
      }

      if (invalid) {
        if (announce && !announced.has(el)) {
          announceError(el);
          announced.add(el);
        }
        el.setAttribute('aria-invalid', 'true');
        linkError(el, true);
        flagged.add(el);
      } else if (flagged.has(el) || el.getAttribute('aria-invalid') !== 'true') {
        el.setAttribute('aria-invalid', 'false');
        linkError(el, false);
        flagged.delete(el);
        announced.delete(el);
        if (announcedField === el) {
          window.clearTimeout(announceTimer);
          announcer.textContent = '';
        }
      }
    };

    claimForm.querySelectorAll('input, select, textarea').forEach((el) => syncAria(el));

    claimForm.addEventListener(
      'blur',
      (e) => {
        const st = dirtyMap.get(e.target) || { hasInteracted: false, hasBlurred: false };
        st.hasBlurred = true;
        dirtyMap.set(e.target, st);
        syncAria(e.target, true);
      },
      true
    );

    claimForm.addEventListener('input', (e) => {
      const st = dirtyMap.get(e.target) || { hasInteracted: false, hasBlurred: false };
      st.hasInteracted = true;
      dirtyMap.set(e.target, st);
      if (e.target.hasAttribute('aria-invalid')) syncAria(e.target);
    });

    claimForm.addEventListener(
      'invalid',
      (e) => {
        dirtyMap.set(e.target, { hasInteracted: true, hasBlurred: true });
        announced.add(e.target);
        syncAria(e.target);
      },
      true
    );

    claimForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!claimForm.checkValidity()) {
        const firstInvalid = claimForm.querySelector(':invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const data = new FormData(claimForm);
      const zip = String(data.get('zip') || '').trim();
      const company = String(data.get('company_name') || '').trim();
      const stack = String(data.get('selected_stack') || 'account_scout_197');
      const stackLabel =
        stack === 'full_stack_494'
          ? 'Own-It Smart Site ($297) + Account Scout ($197)'
          : stack === 'smart_site_297'
          ? 'Own-It Roofing Smart Site ($297/mo • $200/mo Equity)'
          : 'Account Scout Roofer Charter ($197/mo • 7-Day $0 Test Drive)';

      if (claimSubmitBtn) {
        claimSubmitBtn.disabled = true;
        claimSubmitBtn.textContent = 'VERIFYING ZIP EXCLUSIVITY...';
      }

      window.setTimeout(() => {
        if (claimStatus) {
          claimStatus.textContent =
            `✓ ZIP ${zip} verified open for ${company} (${stackLabel}). $0.00 charged today — your Monday 6:45 AM roof drop & live SMS number setup link are queued.`;
        }
        if (claimSubmitBtn) {
          claimSubmitBtn.textContent = '✓ ROOFING TERRITORY RESERVED ($0 TODAY)';
        }
      }, 320);
    });
  }
})();
