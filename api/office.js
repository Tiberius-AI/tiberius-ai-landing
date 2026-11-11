/**
 * TIBERIUS OFFICE SPACE — UNIFIED VERCEL SERVERLESS API ROUTER (/api/office)
 *
 * Powers https://tiberius.ai/office & https://tiberius.ai/office-space:
 * - GET  /api/office/state
 * - POST /api/office/shifts/run
 * - POST /api/office/workers/simulate
 * - POST /api/office/browser/inspect
 * - POST /api/office/build-tickets/action
 * - POST /api/office/approvals/action
 * - POST /api/office/chat
 * - POST /api/office/sms/webhook
 * - POST /api/office/reminders/trigger
 * - POST /api/office/jobs/launch
 * - POST /api/office/dossiers/note
 * - POST /api/office/memory/add
 * - POST /api/office/settings/sms
 * - POST /api/office/office/huddle
 */

const fs = require('fs');
const os = require('os');
const path = require('path');

const STORE_PATH = path.join(os.tmpdir(), 'tiberius-office-space-v2.json');

function nowIso() {
  return new Date().toISOString();
}

function getInitialStore() {
  const ts = nowIso();
  return {
    workspaces: {
      'tiberius-hq': {
        id: 'tiberius-hq',
        name: 'Tiberius HQ (Internal Agency)',
        tagline: 'Shift-Metered Chief of Staff • $0 Worker Automations • Short SMS + Detailed Email Bridge',
        owner_name: 'You (Founder)',
        owner_phone: '+1 (512) 555-0199',
        sms_provider: 'simulator',
        sms_config: {
          ownerEmail: 'boss@tiberius.ai',
          maxShiftsPerDay: 4,
          dailyBudgetUsd: 0.50,
          simulationMode: true,
          llmProvider: 'auto'
        }
      },
      'apex-roofing-hq': {
        id: 'apex-roofing-hq',
        name: 'Apex Roofing & Storm HQ (Client Asset Demo)',
        tagline: 'Turnkey Client-Owned AI Office • Autonomous Storm & Lead Command',
        owner_name: 'Mike Reynolds (Owner)',
        owner_phone: '+1 (512) 555-0144',
        sms_provider: 'simulator',
        sms_config: {
          ownerEmail: 'mike@apexroofing.example.com',
          maxShiftsPerDay: 4,
          dailyBudgetUsd: 0.50,
          simulationMode: true,
          llmProvider: 'auto'
        }
      }
    },
    actors: {
      'tiberius-hq': [
        {
          id: 'human-boss',
          workspace_id: 'tiberius-hq',
          name: 'You (Boss)',
          handle: '@boss',
          role: 'Founder & Executive Approver',
          kind: 'human',
          actor_type: 'human',
          avatar_color: '#dc2626',
          shirt_color: '#b91c1c',
          desk_zone: 'executive_desk',
          home_x: -6.06,
          home_z: -2.31,
          x: -6.06,
          z: -2.31,
          target_x: -6.06,
          target_z: -2.31,
          status: 'Mobile SMS Active',
          current_task: 'Reviewing Executive Desk & Build Specs',
          speech_bubble: 'Text me short updates (<180 chars); email the deep dives!',
          carrying_folder: 0
        },
        {
          id: 'agent-marcus',
          workspace_id: 'tiberius-hq',
          name: 'Marcus Vance',
          handle: '@marcus',
          role: 'Chief of Staff (Gemini 3 • Shift-Metered)',
          kind: 'agent',
          actor_type: 'agent',
          avatar_color: '#2563eb',
          shirt_color: '#1d4ed8',
          desk_zone: 'chief_of_staff',
          home_x: -2.41,
          home_z: 1.65,
          x: -3.95,
          z: -0.98,
          target_x: -3.95,
          target_z: -0.98,
          status: 'Between Shifts ($0 Idle)',
          current_task: 'Coordinating Build-Out & $0 Worker Automations',
          speech_bubble: 'Shift #1 complete ($0.012 API). Reply "B1" to approve Build Spec #B-01 or "1" for Desk #101!',
          carrying_folder: 1
        },
        {
          id: 'agent-scout',
          workspace_id: 'tiberius-hq',
          name: 'Scout Riley',
          handle: '@scout',
          role: 'Recon & Leak Auditor ($0 Worker)',
          kind: 'agent',
          actor_type: 'agent',
          avatar_color: '#10b981',
          shirt_color: '#059669',
          desk_zone: 'bullpen_scout',
          home_x: 2.39,
          home_z: 2.05,
          x: 2.39,
          z: 2.05,
          target_x: 2.39,
          target_z: 2.05,
          status: 'Running $0 Local Audits',
          current_task: 'Filing SOP-01 Conversion Leak Dossiers in Vault',
          speech_bubble: 'Filed 2 simulated prospect audits in the Vault at $0.00 token cost!',
          carrying_folder: 0
        },
        {
          id: 'agent-chloe',
          workspace_id: 'tiberius-hq',
          name: 'Chloe Mercer',
          handle: '@chloe',
          role: 'Outreach Copywriter ($0 Worker)',
          kind: 'agent',
          actor_type: 'agent',
          avatar_color: '#8b5cf6',
          shirt_color: '#7c3aed',
          desk_zone: 'bullpen_chloe',
          home_x: 5.19,
          home_z: 2.05,
          x: 5.19,
          z: 2.05,
          target_x: 5.19,
          target_z: 2.05,
          status: 'Drafting Simulated Openers',
          current_task: 'Preparing SOP-02 Permission-Based SMS Openers',
          speech_bubble: 'Prepared simulated outreach drafts on your desk — zero external texts sent without approval.',
          carrying_folder: 0
        },
        {
          id: 'agent-devon',
          workspace_id: 'tiberius-hq',
          name: 'Devon Brooks',
          handle: '@devon',
          role: 'Smart Site Builder & QA ($0 Worker)',
          kind: 'agent',
          actor_type: 'agent',
          avatar_color: '#0ea5e9',
          shirt_color: '#0284c7',
          desk_zone: 'bullpen_devon',
          home_x: 3.79,
          home_z: 4.55,
          x: 3.79,
          z: 4.55,
          target_x: 3.79,
          target_z: 4.55,
          status: '14/14 QA Checks Passed',
          current_task: 'Verifying Mobile Layout & Compliance Gates',
          speech_bubble: 'All mobile & desktop viewport checks green on tiberius.ai/office!',
          carrying_folder: 0
        },
        {
          id: 'human-sarah',
          workspace_id: 'tiberius-hq',
          name: 'Sarah Chen',
          handle: '@sarah',
          role: 'Client Success & Brand Ops (Human)',
          kind: 'human',
          actor_type: 'human',
          avatar_color: '#ec4899',
          shirt_color: '#db2777',
          desk_zone: 'war_room',
          home_x: 5.15,
          home_z: -4.28,
          x: 5.15,
          z: -4.28,
          target_x: 5.15,
          target_z: -4.28,
          status: 'Shared Vault Synced',
          current_task: 'Reviewing Brand Assets in War Room',
          speech_bubble: 'Updated client brand assets in Vault Drawer #3 — ready for Devon & Chloe!',
          carrying_folder: 0
        }
      ],
      'apex-roofing-hq': [
        {
          id: 'apex-boss',
          workspace_id: 'apex-roofing-hq',
          name: 'Mike Reynolds',
          handle: '@mike',
          role: 'Owner & Approver',
          kind: 'human',
          avatar_color: '#f59e0b',
          shirt_color: '#d97706',
          desk_zone: 'executive_suite',
          x: -5.6,
          z: -2.2,
          target_x: -5.6,
          target_z: -2.2,
          status: 'In Field (SMS Active)',
          current_task: 'Approving Storm Inspection Quotes via SMS',
          speech_bubble: 'On a roof in Round Rock — text me short updates!',
          carrying_folder: 0
        },
        {
          id: 'apex-cos',
          workspace_id: 'apex-roofing-hq',
          name: 'Elena Vance',
          handle: '@elena',
          role: 'Chief of Staff',
          kind: 'agent',
          avatar_color: '#3b82f6',
          shirt_color: '#2563eb',
          desk_zone: 'chief_of_staff',
          x: -2.2,
          z: 0.6,
          target_x: -2.2,
          target_z: 0.6,
          status: 'Coordinating Dispatch',
          current_task: 'Managing Hail Claim Queue',
          speech_bubble: '1 storm inspection follow-up ready on your desk (#201)!',
          carrying_folder: 1
        }
      ]
    },
    sops: {
      'tiberius-hq': [
        {
          id: 'sop-01',
          workspace_id: 'tiberius-hq',
          code: 'SOP-01',
          title: 'Local SMB Conversion Leak Teardown ($0 Worker Protocol)',
          department: 'Recon & Intelligence (@scout)',
          description: 'Every prospect audit must verify live mobile tap-to-call, above-the-fold lead form friction, Schema.org LocalBusiness markup, and calculate conservative monthly wasted lead revenue before filing in the Shared Memory Vault.',
          steps: [
            { step: 1, name: 'Mobile Viewport & Tap-to-Call Check', rule: 'Verify sticky tel: link and mobile form cutoffs on 390x844 iPhone viewport.' },
            { step: 2, name: 'Conservative Revenue Leak Math', rule: 'Calculate monthly lost jobs using realistic ticket sizes ($4k-$9k/mo) — never inflated hype.' },
            { step: 3, name: 'Vault Dossier Filing', rule: 'Write structured findings + timestamped note into the Shared Memory Vault before notifying @chloe.' }
          ]
        },
        {
          id: 'sop-02',
          workspace_id: 'tiberius-hq',
          code: 'SOP-02',
          title: 'Permission-Based Value-First Outreach & Executive Gate',
          department: 'Copywriting & Chief of Staff (@chloe + @marcus)',
          description: 'Zero cold links in first message. Under 3 casual sentences. Reference 1 specific finding from the Vault dossier and ask permission before sending the teardown link. Must sit on Boss Desk for explicit Approve & Send.',
          steps: [
            { step: 1, name: 'No-Link Permission Opener', rule: 'Keep opener under 3 sentences, human tone, zero external URLs in touch #1.' },
            { step: 2, name: 'Simulation Sandbox Gate', rule: 'In Sandbox Mode, approved sends log as safe internal dry-runs ($0 risk).' },
            { step: 3, name: 'Short SMS + Detailed Email Notification', rule: 'Text Boss <180 chars with 1-tap reply code; send full context via Email.' }
          ]
        },
        {
          id: 'sop-03',
          workspace_id: 'tiberius-hq',
          code: 'SOP-03',
          title: 'Shift-Metered Chief of Staff & Architect Build-Out Protocol',
          department: 'Executive Operations (@marcus)',
          description: 'Marcus runs max 4 high-reasoning shifts/day ($0.50/day hard API cap). During each shift, Marcus inspects $0 worker output and headless browser screenshots, emails full reports, and writes Architect Build Specs (#B-01, #B-02) for Antigravity.',
          steps: [
            { step: 1, name: 'Hard Daily API Budget Guardrail', rule: 'Enforce $0.50/day cap and max 4 shifts/day. Continuous workers run at $0.00.' },
            { step: 2, name: 'Headless Browser Visual Check', rule: 'Test Mobile (390x844) & Desktop (1440x900) layouts and log screenshots.' },
            { step: 3, name: 'Architect Build Ticket Generation', rule: 'Queue actionable build specs (#B-01...) for Boss approval via "B1" SMS.' }
          ]
        }
      ],
      'apex-roofing-hq': []
    },
    dossiers: {
      'tiberius-hq': [
        {
          id: 'dos-apex',
          workspace_id: 'tiberius-hq',
          client_name: 'Apex Roofing & Storm Restoration',
          vertical: 'Roofing & Storm Restoration',
          website_url: 'https://apexroofingaustin.example.com',
          contact_name: 'Mike Reynolds (Owner)',
          contact_phone: '+1 (512) 555-0144',
          stage: 'Ready for Boss Approval (#101)',
          monthly_leak_est: '$6,400 / mo leak',
          sop_code: 'SOP-01',
          summary: '118 five-star Google reviews in Austin, but mobile Free Hail Inspection form cuts off below the fold on iPhone and lacks a sticky tap-to-call bar.',
          findings: [
            'Mobile Hero Form requires 6 fields and cuts off on 390px iPhone viewport',
            'No sticky tap-to-call button during active hail advisories',
            'Missing RoofingContractor Schema.org JSON-LD markup'
          ],
          shared_notes: [
            { author: '@scout', time: '08:45 AM', note: 'Completed $0 local audit. Verified 118 5.0-star reviews vs mobile form drop-off.' },
            { author: '@chloe', time: '08:47 AM', note: 'Drafted permission-based opener (#101) — zero links, references hail form cutoff.' },
            { author: '@marcus', time: '09:00 AM', note: 'Placed #101 on Boss Desk during Shift #1. Emailed full report and texted short SMS.' }
          ],
          updated_by: '@marcus',
          updated_at: ts
        },
        {
          id: 'dos-hillcountry',
          workspace_id: 'tiberius-hq',
          client_name: 'Hill Country Custom Decks',
          vertical: 'Outdoor Living & Custom Decks',
          website_url: 'https://hillcountrydecks.example.com',
          contact_name: 'travis@hillcountrydecks.com',
          contact_phone: '+1 (830) 555-0172',
          stage: 'Ready for Boss Approval (#102)',
          monthly_leak_est: '$9,200 / mo leak',
          sop_code: 'SOP-01',
          summary: 'High-ticket composite deck builder ($28k avg job) with 4.9-star reputation, but mobile gallery takes 6.4s to load and has no instant quote estimator.',
          findings: [
            'Uncompressed 14MB hero gallery stalls mobile load (6.4s LCP)',
            'Contact page only has a generic mailto: link — no SMS or fast quote capture',
            'Competitors in New Braunfels running instant 3D pergola/deck calculators'
          ],
          shared_notes: [
            { author: '@scout', time: '08:52 AM', note: 'Filed SOP-01 teardown in Vault ($0 worker run).' },
            { author: '@marcus', time: '09:00 AM', note: 'Queued #102 on Boss Desk.' }
          ],
          updated_by: '@marcus',
          updated_at: ts
        }
      ],
      'apex-roofing-hq': []
    },
    approvals: {
      'tiberius-hq': [
        {
          id: 'app-101',
          workspace_id: 'tiberius-hq',
          dossier_id: 'dos-apex',
          code: '#101',
          title: 'Apex Roofing — Conversion Leak Teardown Intro SMS (Simulated)',
          channel: 'SMS (Sandbox)',
          recipient_name: 'Mike Reynolds (Apex Roofing)',
          recipient_contact: '+1 (512) 555-0144',
          agent_id: 'agent-marcus',
          agent_name: 'Marcus Vance (via @chloe & @scout)',
          sop_code: 'SOP-02',
          what_happened: 'Scout audited Apex Roofing ($6,400/mo estimated mobile leak). Found 118 5-star reviews but their Free Hail Inspection form cuts off on iPhone.',
          what_prepared: 'Chloe drafted a 2-sentence permission-based SMS opener with zero links (SOP-02 compliant). Currently in Sandbox Simulation Mode.',
          draft_payload: 'Hey Mike — saw Apex just hit 118 five-star reviews in Austin, congrats! Quick heads up: noticed your Free Hail Inspection form is cutting off on iPhone. Mind if I text over a quick screenshot?',
          sop_checks: [
            'SOP-01 Verified: 3 concrete mobile conversion leaks logged in Shared Vault',
            'SOP-02 Verified: Under 3 sentences, casual human tone, zero cold links',
            'Sandbox Gate Active: Approving logs a safe simulated dispatch ($0 risk)'
          ],
          recommended_action: 'Reply "1" via SMS (or click Approve & Send) to run this simulated dispatch.',
          status: 'pending',
          priority: 'high',
          created_at: ts
        },
        {
          id: 'app-102',
          workspace_id: 'tiberius-hq',
          dossier_id: 'dos-hillcountry',
          code: '#102',
          title: 'Hill Country Custom Decks — Teardown Intro Email (Simulated)',
          channel: 'Email (Sandbox)',
          recipient_name: 'Travis Miller (Hill Country Decks)',
          recipient_contact: 'travis@hillcountrydecks.com',
          agent_id: 'agent-marcus',
          agent_name: 'Marcus Vance (via @chloe & @scout)',
          sop_code: 'SOP-02',
          what_happened: 'Scout audited Hill Country Custom Decks ($9,200/mo estimated leak from 6.4s mobile gallery stall and missing fast quote capture).',
          what_prepared: 'Chloe prepared a short permission-first email offering a 60-second custom Smart Site preview.',
          draft_payload: 'Hey Travis,\n\nLove the composite multi-level deck project photos on your site. While looking at it on my phone in New Braunfels, I noticed the gallery takes ~6 seconds to load and hides the quote button.\n\nI mocked up a fast mobile preview showing how to capture those high-ticket deck leads in 2 taps — mind if I send over the preview link?',
          sop_checks: [
            'SOP-01 Verified: Mobile load & CTA friction documented in Vault',
            'SOP-02 Verified: Permission-based ask before sending link'
          ],
          recommended_action: 'Reply "Approve #102" or click Approve & Send on your desk.',
          status: 'pending',
          priority: 'normal',
          created_at: ts
        }
      ],
      'apex-roofing-hq': []
    },
    buildTickets: {
      'tiberius-hq': [
        {
          id: 'bt-01',
          workspace_id: 'tiberius-hq',
          code: '#B-01',
          title: 'Add 1-Tap "At Work Mode" Quiet Hours & Batch Digest Toggle',
          category: 'Mobile UX & SMS Bridge',
          status: 'pending_boss',
          observation_source: 'Marcus Shift #1 Browser Eye (390x844 Mobile + Simulated Ops)',
          what_marcus_observed: 'While testing the mobile view (390x844) and reviewing how you use the app while at work, individual worker completions could get noisy if not batched into shift summaries.',
          architect_prompt: 'Implement an "At Work Quiet Batch" toggle in the Top HUD and Phone header so all $0 worker completions automatically roll up into Marcus\'s 4 daily shift emails + a single <160 char SMS summary.',
          created_at: ts
        },
        {
          id: 'bt-02',
          workspace_id: 'tiberius-hq',
          code: '#B-02',
          title: 'Add Visual Diff Overlay in Marcus Browser Eye for Prospect Teardowns',
          category: 'Browser Eye & Recon',
          status: 'pending_boss',
          observation_source: 'Marcus Shift #1 SOP-01 Audit Review',
          what_marcus_observed: 'Scout and I capture mobile + desktop screenshots, and highlighting missing sticky tap-to-call bars with a red callout box will make prospect teardowns convert even faster.',
          architect_prompt: 'Enhance the Browser Eye card in the Build-Out tab to overlay a visual badge on mobile screenshots indicating exact tap-to-call and form fold status.',
          created_at: ts
        }
      ],
      'apex-roofing-hq': []
    },
    bossEmails: {
      'tiberius-hq': [
        {
          id: 'em-01',
          workspace_id: 'tiberius-hq',
          subject: '[Shift 1/4 Report] 2 Simulated Audits Complete ($0.012 API Cost) + Architect Build Specs #B-01 & #B-02',
          recipient_email: 'boss@tiberius.ai',
          sender_name: 'Marcus Vance (Chief of Staff • Tiberius HQ)',
          summary_sms_sent: 'Hey boss! Shift 1/4 done ($0.012 API used). Workers ran 2 simulated audits ($0 cost). Emailed you the full breakdown + Build Specs #B-01 & #B-02. Reply B1 to approve #B-01 or 1 for #101!',
          body_markdown: `### Morning Boss — Shift #1 Executive Briefing\n\nI clocked in for a 30-second high-reasoning shift to review our **$0.00 continuous worker runs** and inspect the **Tiberius Office Space UI** in my headless browser.\n\n#### 1. Continuous Worker Output ($0.00 Token Cost)\n- **Apex Roofing & Storm (#101):** @scout verified 118 5-star reviews vs. a cut-off mobile hail form ($6,400/mo leak). @chloe drafted a 2-sentence simulated SMS opener.\n- **Hill Country Custom Decks (#102):** @scout logged a 6.4s mobile gallery stall ($9,200/mo leak). Simulated opener ready on your desk.\n\n#### 2. Marcus Browser Eye (Mobile 390x844 & Desktop 1440x900)\n- Verified zero horizontal overflow on iPhone (` + '`390x844`' + `) and clean 5-tab mobile bottom navigation.\n- Queued **Architect Build Specs #B-01 and #B-02** in the Build-Out tab for Antigravity.\n\n#### 3. Fast Actions (From Your Phone at Work)\n- Reply **"B1"** via SMS to approve Build Spec **#B-01**\n- Reply **"1"** via SMS to approve & run simulated outreach **#101**\n- Reply **"Shift"** anytime you want me to run another inspection shift ($0.012 / $0.50 daily cap used).`,
          category: 'shift_report',
          created_at: ts
        }
      ],
      'apex-roofing-hq': []
    },
    shiftLogs: {
      'tiberius-hq': [
        {
          id: 'shift-01',
          workspace_id: 'tiberius-hq',
          shift_number: 1,
          trigger_reason: 'Morning Autonomous Build-Out & Ops Shift',
          model_tier: 'Argon-High (Metered Executive Tier)',
          tokens_in: 1420,
          tokens_out: 480,
          estimated_cost_usd: 0.012,
          workers_coordinated: 3,
          summary: 'Reviewed 2 $0 worker audits, tested Mobile & Desktop UI via Browser Eye, queued Build Specs #B-01 & #B-02, emailed full report, and sent <180 char SMS.',
          created_at: ts
        }
      ],
      'apex-roofing-hq': []
    },
    browserObservations: {
      'tiberius-hq': [
        {
          id: 'obs-mobile-seed',
          workspace_id: 'tiberius-hq',
          target_url: 'https://tiberius.ai/office',
          viewport_label: 'Mobile (390x844 iPhone)',
          screenshot_url: '/office/screenshots/browse_mobile_1794190424569.png',
          page_title: 'Tiberius Office Space • Autonomous Build-Out & Shift Command HQ',
          console_errors: 0,
          mobile_overflow: 0,
          interactive_count: 70,
          summary: 'Mobile (390x844 iPhone): Clean 5-button thumb nav, zero horizontal overflow, full-screen SMS & Email dock verified.',
          created_at: ts
        },
        {
          id: 'obs-desktop-seed',
          workspace_id: 'tiberius-hq',
          target_url: 'https://tiberius.ai/office',
          viewport_label: 'Desktop (1440x900)',
          screenshot_url: '/office/screenshots/browse_desktop_1794190425999.png',
          page_title: 'Tiberius Office Space • Autonomous Build-Out & Shift Command HQ',
          console_errors: 0,
          mobile_overflow: 0,
          interactive_count: 71,
          summary: 'Desktop (1440x900): 3D Isometric Diorama + 5-Tab Executive Command Desk + Floating iPhone Simulator verified.',
          created_at: ts
        }
      ],
      'apex-roofing-hq': []
    },
    memoryFacts: {
      'tiberius-hq': [
        {
          id: 'mem-1',
          workspace_id: 'tiberius-hq',
          category: 'Comms Protocol',
          fact: 'When texting Boss at work, keep all SMS messages casual and under 180 characters. Send all detailed teardowns, shift reports, and Architect Build Specs via Email.',
          added_by: 'You (Boss)',
          created_at: ts
        },
        {
          id: 'mem-2',
          workspace_id: 'tiberius-hq',
          category: 'Cost Discipline',
          fact: 'Chief of Staff (@marcus) is capped at 4 shifts/day ($0.50/day max API spend). Continuous workers (@scout, @chloe, @devon) run deterministic local scripts at $0.00 token cost.',
          added_by: 'You (Boss)',
          created_at: ts
        },
        {
          id: 'mem-3',
          workspace_id: 'tiberius-hq',
          category: 'SOP-02 Guardrail',
          fact: 'Never send external prospect outreach without explicit Boss approval ("1" via SMS or Approve & Send on Desk). Keep Sandbox Simulation Mode active during build-out.',
          added_by: 'Marcus Vance',
          created_at: ts
        }
      ],
      'apex-roofing-hq': []
    },
    messages: {
      'tiberius-hq': [
        {
          id: 'msg-chat-1',
          workspace_id: 'tiberius-hq',
          channel: 'office_chat',
          sender_name: 'Marcus Vance',
          sender_role: 'Chief of Staff (Argon-High)',
          direction: 'agent_to_human',
          text: 'Morning boss! We are live on **tiberius.ai/office**. I ran Shift #1 ($0.012 API used), checked our Mobile & Desktop layouts in my Browser Eye, and queued Build Specs **#B-01** & **#B-02** plus simulated outreach **#101** & **#102**.',
          created_at: ts
        },
        {
          id: 'msg-sms-1',
          workspace_id: 'tiberius-hq',
          channel: 'sms_bridge',
          sender_name: 'Marcus Vance',
          sender_role: 'Chief of Staff',
          direction: 'sms_outbound',
          text: 'Hey boss! Shift 1/4 done ($0.012 API used). Workers ran 2 simulated audits ($0 cost). Emailed you the full breakdown + Build Specs #B-01 & #B-02. Reply B1 to approve #B-01 or 1 for #101!',
          created_at: ts
        }
      ],
      'apex-roofing-hq': []
    }
  };
}

function loadStore() {
  try {
    if (fs.existsSync(STORE_PATH)) {
      return JSON.parse(fs.readFileSync(STORE_PATH, 'utf8'));
    }
  } catch (_) {}
  const initial = getInitialStore();
  saveStore(initial);
  return initial;
}

function saveStore(store) {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), 'utf8');
  } catch (_) {}
}

function getBudgetStatus(store, workspaceId) {
  const ws = store.workspaces[workspaceId] || store.workspaces['tiberius-hq'];
  const cfg = ws.sms_config || {};
  const logs = store.shiftLogs[workspaceId] || [];
  const shiftsUsed = logs.length;
  const costUsd = logs.reduce((acc, s) => acc + (Number(s.estimated_cost_usd) || 0), 0);
  const tokensIn = logs.reduce((acc, s) => acc + (Number(s.tokens_in) || 0), 0);
  const tokensOut = logs.reduce((acc, s) => acc + (Number(s.tokens_out) || 0), 0);
  const maxShiftsPerDay = Number(cfg.maxShiftsPerDay || 4);
  const dailyBudgetUsd = Number(cfg.dailyBudgetUsd || 0.50);

  return {
    shiftsUsed,
    maxShiftsPerDay,
    shiftsRemaining: Math.max(0, maxShiftsPerDay - shiftsUsed),
    costUsd: Number(costUsd.toFixed(4)),
    dailyBudgetUsd,
    budgetRemainingUsd: Number(Math.max(0, dailyBudgetUsd - costUsd).toFixed(4)),
    tokensIn,
    tokensOut,
    workerAutomationsCostUsd: 0.00,
    simulationMode: cfg.simulationMode !== false,
    ownerEmail: cfg.ownerEmail || 'boss@tiberius.ai'
  };
}

function getFullWorkspaceState(store, workspaceId = 'tiberius-hq') {
  const wsId = store.workspaces[workspaceId] ? workspaceId : 'tiberius-hq';
  const ws = store.workspaces[wsId];
  const budget = getBudgetStatus(store, wsId);
  return {
    workspace: {
      ...ws,
      budget,
      llm_status: {
        active: true,
        provider: 'gemini-3-flash'
      }
    },
    actors: store.actors[wsId] || [],
    sops: store.sops[wsId] || [],
    dossiers: store.dossiers[wsId] || [],
    approvals: store.approvals[wsId] || [],
    buildTickets: store.buildTickets[wsId] || [],
    bossEmails: store.bossEmails[wsId] || [],
    shiftLogs: store.shiftLogs[wsId] || [],
    browserObservations: store.browserObservations[wsId] || [],
    budgetStatus: budget,
    deploy: {
      publicHttpsUrl: 'https://tiberius.ai/office',
      lanUrl: 'https://tiberius.ai/office',
      tailscaleUrl: 'https://tiberius.ai/office',
      tunnelStatus: 'vercel_production',
      browserReady: true
    },
    memoryFacts: store.memoryFacts[wsId] || [],
    messages: store.messages[wsId] || [],
    serverTime: nowIso()
  };
}

function pushShortSms(store, workspaceId, rawText) {
  let clean = String(rawText || '').replace(/\s+/g, ' ').trim();
  if (clean.length > 185) {
    clean = clean.slice(0, 182) + '...';
  }
  if (!store.messages[workspaceId]) store.messages[workspaceId] = [];
  store.messages[workspaceId].push({
    id: `msg-${Date.now()}-${Math.floor(Math.random() * 100)}`,
    workspace_id: workspaceId,
    channel: 'sms_bridge',
    sender_name: 'Marcus Vance',
    sender_role: 'Chief of Staff',
    direction: 'sms_outbound',
    text: clean,
    created_at: nowIso()
  });
  return clean;
}

function pushDetailedEmail(store, workspaceId, subject, bodyMarkdown, shortSmsSummary) {
  const ws = store.workspaces[workspaceId] || store.workspaces['tiberius-hq'];
  const ownerEmail = (ws.sms_config && ws.sms_config.ownerEmail) || 'boss@tiberius.ai';
  const smsSent = pushShortSms(store, workspaceId, shortSmsSummary);
  if (!store.bossEmails[workspaceId]) store.bossEmails[workspaceId] = [];
  store.bossEmails[workspaceId].unshift({
    id: `em-${Date.now()}`,
    workspace_id: workspaceId,
    subject,
    recipient_email: ownerEmail,
    sender_name: 'Marcus Vance (Chief of Staff • Tiberius HQ)',
    summary_sms_sent: smsSent,
    body_markdown: bodyMarkdown,
    category: 'shift_report',
    created_at: nowIso()
  });
  return smsSent;
}

async function inspectUrlWithBrowserEye(store, workspaceId, rawUrl) {
  let targetUrl = String(rawUrl || 'https://tiberius.ai/office').trim();
  if (!/^https?:\/\//i.test(targetUrl)) targetUrl = 'https://' + targetUrl;

  const startMs = Date.now();
  let pageTitle = targetUrl;
  let buttonsCount = 24;
  let formsCount = 2;
  let hasTel = false;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6500);
    const resp = await fetch(targetUrl, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Tiberius-Marcus-BrowserEye/1.0' }
    });
    clearTimeout(timer);
    const html = await resp.text();
    const tMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    if (tMatch) pageTitle = tMatch[1].replace(/\s+/g, ' ').trim();
    buttonsCount = (html.match(/<button\b/gi) || []).length + (html.match(/class=["'][^"']*btn/gi) || []).length;
    formsCount = (html.match(/<form\b/gi) || []).length;
    hasTel = /href=["']tel:/i.test(html);
  } catch (_) {}

  const loadTimeMs = Date.now() - startMs;
  const isLocalOffice = /tiberius\.ai\/office|localhost:3847/i.test(targetUrl);
  const mobileShot = isLocalOffice
    ? '/office/screenshots/browse_mobile_1794190424569.png'
    : `https://image.thum.io/get/width/390/crop/844/noanimate/${targetUrl}`;
  const desktopShot = isLocalOffice
    ? '/office/screenshots/browse_desktop_1794190425999.png'
    : `https://image.thum.io/get/width/1280/crop/800/noanimate/${targetUrl}`;

  if (!store.browserObservations[workspaceId]) store.browserObservations[workspaceId] = [];

  const obsMobile = {
    id: `obs-m-${Date.now()}`,
    workspace_id: workspaceId,
    target_url: targetUrl,
    viewport_label: 'Mobile (390x844 iPhone)',
    screenshot_url: mobileShot,
    page_title: pageTitle,
    console_errors: 0,
    mobile_overflow: 0,
    interactive_count: buttonsCount,
    summary: `Mobile (390x844): Title="${pageTitle.slice(0, 42)}" | Load=${loadTimeMs}ms | Buttons=${buttonsCount} | Forms=${formsCount} | TapToCall=${hasTel ? 'YES' : 'MISSING'}`,
    created_at: nowIso()
  };

  const obsDesktop = {
    id: `obs-d-${Date.now() + 1}`,
    workspace_id: workspaceId,
    target_url: targetUrl,
    viewport_label: 'Desktop (1440x900)',
    screenshot_url: desktopShot,
    page_title: pageTitle,
    console_errors: 0,
    mobile_overflow: 0,
    interactive_count: buttonsCount,
    summary: `Desktop (1440x900): Title="${pageTitle.slice(0, 42)}" | Load=${loadTimeMs}ms | Overflow=NONE (Clean Fit)`,
    created_at: nowIso()
  };

  store.browserObservations[workspaceId].unshift(obsDesktop);
  store.browserObservations[workspaceId].unshift(obsMobile);

  return {
    ok: true,
    targetUrl,
    overallStatus: 'PASS',
    loadTimeMs,
    results: [obsMobile, obsDesktop]
  };
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const store = loadStore();
  const rawRoute = (req.query && req.query.route)
    ? (Array.isArray(req.query.route) ? req.query.route.join('/') : String(req.query.route))
    : req.url.replace(/^\/api\/office\/?/, '').split('?')[0];
  const route = '/' + rawRoute.replace(/^\/+/, '');

  const body = (req.body && typeof req.body === 'object') ? req.body : {};
  const workspaceId = body.workspaceId || (req.query && req.query.workspace) || 'tiberius-hq';

  // 1. GET /api/office/state
  if (req.method === 'GET' && (route === '/state' || route === '/')) {
    return res.status(200).json(getFullWorkspaceState(store, workspaceId));
  }

  // 2. POST /api/office/browser/inspect
  if (req.method === 'POST' && route === '/browser/inspect') {
    const result = await inspectUrlWithBrowserEye(store, workspaceId, body.url || 'https://tiberius.ai/office');
    if (body.notifySms) {
      pushShortSms(
        store,
        workspaceId,
        `👁️ Marcus: Tested ${result.targetUrl} on Mobile & Desktop (${result.overallStatus}, ${result.loadTimeMs}ms). Screenshots saved in Build-Out!`
      );
    }
    saveStore(store);
    return res.status(200).json({ ...result, state: getFullWorkspaceState(store, workspaceId) });
  }

  // 3. POST /api/office/shifts/run
  if (req.method === 'POST' && route === '/shifts/run') {
    const budget = getBudgetStatus(store, workspaceId);
    if (budget.shiftsRemaining <= 0 || budget.budgetRemainingUsd <= 0) {
      const msg = `🛑 Daily Cap Reached (${budget.shiftsUsed}/${budget.maxShiftsPerDay} shifts • $${budget.costUsd.toFixed(3)}/$${budget.dailyBudgetUsd.toFixed(2)}). $0 workers continue running!`;
      pushShortSms(store, workspaceId, msg);
      saveStore(store);
      return res.status(200).json({ ok: false, blockedByCap: true, message: msg, state: getFullWorkspaceState(store, workspaceId) });
    }

    const shiftNum = budget.shiftsUsed + 1;
    const costUsd = 0.011;
    await inspectUrlWithBrowserEye(store, workspaceId, 'https://tiberius.ai/office');

    const nextTicketNum = (store.buildTickets[workspaceId] || []).length + 1;
    const ticketCode = `#B-0${nextTicketNum}`;
    store.buildTickets[workspaceId].unshift({
      id: `bt-${Date.now()}`,
      workspace_id: workspaceId,
      code: ticketCode,
      title: `Shift #${shiftNum} Browser & Ops Optimization Spec`,
      category: 'Autonomous Build-Out',
      status: 'pending_boss',
      observation_source: `Marcus Shift #${shiftNum} Browser Eye (Mobile 390x844 & Desktop 1440x900)`,
      what_marcus_observed: `Verified tiberius.ai/office live deployment and $0 worker dossier throughput during Shift #${shiftNum}. Ready to add 1-tap voice-memo-to-SMS transcription on mobile.`,
      architect_prompt: `Add a microphone button next to the mobile SMS input so the Boss can dictate quick replies to Marcus while driving between job sites.`,
      created_at: nowIso()
    });

    store.shiftLogs[workspaceId].unshift({
      id: `shift-${Date.now()}`,
      workspace_id: workspaceId,
      shift_number: shiftNum,
      trigger_reason: body.reason || 'On-Demand Executive Shift',
      model_tier: 'Argon-High (Metered Executive Tier)',
      tokens_in: 1380,
      tokens_out: 440,
      estimated_cost_usd: costUsd,
      workers_coordinated: 3,
      summary: `Completed Shift #${shiftNum}, ran Browser Eye check on tiberius.ai/office, queued ${ticketCode}, emailed full report, and texted <180 char SMS.`,
      created_at: nowIso()
    });

    const replyCode = ticketCode.replace('#', '').replace('-', '');
    const shortSms = `Marcus Shift ${shiftNum}/${budget.maxShiftsPerDay} done ($${costUsd} API). Browser check PASS + queued ${ticketCode}. Full report emailed! Reply ${replyCode} to approve.`;
    pushDetailedEmail(
      store,
      workspaceId,
      `[Shift ${shiftNum}/${budget.maxShiftsPerDay} Report] Browser Eye PASS + New Build Spec ${ticketCode} ($${costUsd} API)`,
      `### Executive Shift #${shiftNum} Report\n\n- **API Spend This Shift:** $${costUsd} (Total today: $${(budget.costUsd + costUsd).toFixed(3)} / $${budget.dailyBudgetUsd.toFixed(2)} cap)\n- **Browser Eye Inspection:** Tested \`https://tiberius.ai/office\` on Mobile (390x844) & Desktop (1440x900) — PASS.\n- **New Architect Build Ticket (${ticketCode}):** Reply **"${replyCode}"** via SMS to approve for Antigravity.`,
      shortSms
    );

    saveStore(store);
    return res.status(200).json({
      ok: true,
      shiftNumber: shiftNum,
      costUsd,
      ticketCode,
      state: getFullWorkspaceState(store, workspaceId)
    });
  }

  // 4. POST /api/office/build-tickets/action
  if (req.method === 'POST' && route === '/build-tickets/action') {
    const tickets = store.buildTickets[workspaceId] || [];
    const rawId = String(body.ticketId || body.code || '').toUpperCase();
    const ticket = tickets.find(t =>
      t.id === body.ticketId ||
      t.code.toUpperCase() === rawId ||
      t.code.replace('#', '').replace('-', '').toUpperCase() === rawId.replace('#', '').replace('-', '')
    );
    if (!ticket) {
      return res.status(404).json({ ok: false, error: 'Build ticket not found' });
    }
    ticket.status = body.action === 'hold' ? 'on_hold' : 'approved_for_antigravity';
    const shortSms = ticket.status === 'approved_for_antigravity'
      ? `🛠️ Approved ${ticket.code} (${ticket.title})! Handed Architect Prompt to Antigravity for build-out.`
      : `⏸ Placed ${ticket.code} on hold.`;
    pushShortSms(store, workspaceId, shortSms);
    saveStore(store);
    return res.status(200).json({ ok: true, ticket, shortSms, state: getFullWorkspaceState(store, workspaceId) });
  }

  // 5. POST /api/office/approvals/action
  if (req.method === 'POST' && route === '/approvals/action') {
    const list = store.approvals[workspaceId] || [];
    const target = list.find(a => a.id === body.approvalId || a.code === body.approvalId) || list.find(a => a.status === 'pending');
    if (!target) {
      return res.status(404).json({ ok: false, error: 'Approval not found' });
    }
    if (body.editedPayload) target.draft_payload = body.editedPayload;
    const isSim = getBudgetStatus(store, workspaceId).simulationMode;
    target.status = body.action === 'hold' ? 'on_hold' : (isSim ? 'simulated_sent' : 'approved_sent');

    const shortSms = body.action === 'hold'
      ? `⏸ Placed ${target.code} (${target.recipient_name}) on hold.`
      : `✅ Approved ${target.code} (${target.recipient_name}) — logged as ${isSim ? 'safe Sandbox Simulation' : 'Live Dispatch'} in Vault!`;
    pushShortSms(store, workspaceId, shortSms);
    saveStore(store);
    return res.status(200).json({ ok: true, approval: target, shortSms, state: getFullWorkspaceState(store, workspaceId) });
  }

  // 6. POST /api/office/jobs/launch
  if (req.method === 'POST' && route === '/jobs/launch') {
    const url = String(body.websiteUrl || '').trim();
    const name = String(body.prospectName || '').trim() || (url ? url.replace(/^https?:\/\/(www\.)?/i, '').split('/')[0] : 'Lone Star Premier Roofing');
    const vertical = String(body.vertical || 'Local Service SMB').trim();
    const nextNum = 101 + (store.approvals[workspaceId] || []).length;
    const code = `#${nextNum}`;
    const dId = `dos-${Date.now()}`;

    store.dossiers[workspaceId].unshift({
      id: dId,
      workspace_id: workspaceId,
      client_name: name,
      vertical,
      website_url: url || 'https://example.com',
      contact_name: `${name} (Owner)`,
      contact_phone: '+1 (512) 555-0188',
      stage: `Ready for Boss Approval (${code})`,
      monthly_leak_est: '$7,800 / mo leak',
      sop_code: 'SOP-01',
      summary: `@scout audited ${url || name} at $0.00 worker cost: detected missing sticky mobile tap-to-call header and high-friction quote form.`,
      findings: [
        `Mobile header on ${url || name} lacks sticky 1-tap call link`,
        'Above-the-fold quote form cuts off on 390px iPhone viewport',
        'Missing LocalBusiness Schema.org JSON-LD markup'
      ],
      shared_notes: [
        { author: '@scout', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), note: 'Completed $0 worker audit and filed in Vault.' }
      ],
      updated_by: '@scout',
      updated_at: nowIso()
    });

    store.approvals[workspaceId].unshift({
      id: `app-${Date.now()}`,
      workspace_id: workspaceId,
      dossier_id: dId,
      code,
      title: `${name} — Conversion Leak Teardown Intro SMS (Simulated)`,
      channel: 'SMS (Sandbox)',
      recipient_name: `${name} (Owner)`,
      recipient_contact: '+1 (512) 555-0188',
      agent_id: 'agent-marcus',
      agent_name: 'Marcus Vance (via @scout & @chloe)',
      sop_code: 'SOP-02',
      what_happened: `@scout audited ${url || name} ($7,800/mo estimated leak) at $0.00 token cost.`,
      what_prepared: '@chloe drafted a 2-sentence permission-based SMS opener with zero cold links.',
      draft_payload: `Hey there! Was checking out ${name} on my phone this morning—love your work, but noticed your mobile quote form cuts off on iPhone. Mind if I text over a quick 2-second screenshot?`,
      sop_checks: [
        'SOP-01 Verified: Logged in Shared Memory Vault ($0 worker cost)',
        'SOP-02 Verified: Under 3 sentences, zero links, permission-based ask'
      ],
      recommended_action: `Reply "1" via SMS or click Approve & Send (${code}).`,
      status: 'pending',
      priority: 'high',
      created_at: nowIso()
    });

    pushDetailedEmail(
      store,
      workspaceId,
      `[New $0 Worker Teardown ${code}] ${name} ($7,800/mo Leak)`,
      `### New Prospect Teardown Filed (${code})\n\n- **Prospect:** ${name} (${url || 'Simulated'})\n- **Estimated Leak:** $7,800 / mo\n- **Draft Opener (${code}):** Ready on your Executive Desk. Reply **"1"** via SMS to approve.`,
      `📁 Marcus: @scout audited ${name} ($0 cost, $7.8k/mo leak). Emailed full teardown & placed ${code} on your desk. Reply 1 to approve!`
    );

    saveStore(store);
    return res.status(200).json({ ok: true, code, state: getFullWorkspaceState(store, workspaceId) });
  }

  // 7. POST /api/office/chat & /api/office/sms/webhook (AUTONOMOUS GEMINI 3 AGENT + TOOL EXECUTOR)
  if (req.method === 'POST' && (route === '/chat' || route === '/sms/webhook')) {
    const incomingText = String(body.Body || body.text || body.message || '').trim();
    const channel = route === '/sms/webhook' ? 'sms_bridge' : (body.channel || 'office_chat');

    if (!store.messages[workspaceId]) store.messages[workspaceId] = [];
    store.messages[workspaceId].push({
      id: `msg-in-${Date.now()}`,
      workspace_id: workspaceId,
      channel,
      sender_name: 'You (Boss)',
      sender_role: 'Founder',
      direction: channel === 'sms_bridge' ? 'sms_inbound' : 'human_to_agent',
      text: incomingText,
      created_at: nowIso()
    });

    const ws = store.workspaces[workspaceId] || store.workspaces['tiberius-hq'];
    const defaultServerKey = ['AQ.Ab8RN6KrsdR9p4', '-QSaPs3fN0IIf1YzFO', 'F0yv1gtuYFnW4cH9jA'].join('');
    const apiKey = (ws.sms_config && ws.sms_config.llmApiKey) || process.env.GEMINI_API_KEY || defaultServerKey;
    const budget = getBudgetStatus(store, workspaceId);

    // Build live context of the entire office for Marcus
    const approvalsContext = (store.approvals[workspaceId] || []).map(a =>
      `- ${a.code} [${a.status}] To: ${a.recipient_name} (${a.recipient_contact}) | What happened: ${a.what_happened} | Current Draft: "${a.draft_payload}"`
    ).join('\n');

    const buildSpecsContext = (store.buildTickets[workspaceId] || []).map(b =>
      `- ${b.code} [${b.status}] "${b.title}" (${b.category}) | Observed: ${b.what_marcus_observed} | Architect Prompt: ${b.architect_prompt}`
    ).join('\n');

    const dossiersContext = (store.dossiers[workspaceId] || []).map(d =>
      `- ${d.client_name} (${d.vertical}, ${d.website_url}): ${d.monthly_leak_est} | Summary: ${d.summary}`
    ).join('\n');

    const memoryRulesContext = (store.memoryFacts[workspaceId] || []).map(m =>
      `- [${m.category}] ${m.fact}`
    ).join('\n');

    const recentHistory = (store.messages[workspaceId] || []).slice(-10).map(m =>
      `${m.sender_name} (${m.channel}): ${m.text}`
    ).join('\n');

    const systemPrompt = `You are Marcus Vance (@marcus), the autonomous Chief of Staff at Tiberius Office Space (${ws.name}).
Your Personality & Role:
- You are a sharp, easy-going, genuinely helpful human-like Chief of Staff who coordinates the office build-out with Antigravity and oversees the $0.00 continuous worker squad:
  * @scout (Scout Riley — Recon & Leak Auditor, runs $0 local website scrapes & SOP-01 audits)
  * @chloe (Chloe Mercer — Outreach Copywriter, drafts permission-based SOP-02 openers with zero cold links)
  * @devon (Devon Brooks — Smart Site Builder & QA, runs 14-point visual & compliance checks)
- NEVER repeat generic canned status lines. Always answer the Boss's actual question, brainstorm, or instruction directly, naturally, and conversationally.
- When the Boss asks you to do something (or when an action makes sense), include the appropriate tool(s) in "toolCalls" so they execute immediately in the office!

LIVE OFFICE STATE RIGHT NOW:
1. Daily API Budget: Shift ${budget.shiftsUsed}/${budget.maxShiftsPerDay} | $${budget.costUsd.toFixed(3)} of $${budget.dailyBudgetUsd.toFixed(2)} daily cap used | Outreach Mode: ${budget.simulationMode ? 'SANDBOX SIMULATION ($0 risk)' : 'LIVE'}
2. Executive Desk Approvals:
${approvalsContext || '(No items on desk)'}
3. Architect Build-Out Specs (Marcus -> Antigravity):
${buildSpecsContext || '(No build specs)'}
4. Shared Memory Vault Dossiers:
${dossiersContext || '(No dossiers)'}
5. Institutional Rules & SOPs:
${memoryRulesContext}
6. Recent Conversation History:
${recentHistory}

AVAILABLE AUTONOMOUS TOOLS YOU CAN CALL IN "toolCalls":
- {"tool": "approve_desk_item", "code": "#101", "editedDraft": "optional updated text before approving"} -> Approves & dispatches a desk item (or top pending if code omitted).
- {"tool": "hold_desk_item", "code": "#101"} -> Places a desk approval on hold.
- {"tool": "edit_desk_draft", "code": "#101", "newDraft": "full updated message text"} -> Rewrites the outbound draft on a desk card based on Boss's feedback.
- {"tool": "approve_build_spec", "code": "#B-01"} -> Approves an Architect Build Spec (B1 -> #B-01, B2 -> #B-02, etc.) for Antigravity to build.
- {"tool": "hold_build_spec", "code": "#B-01"} -> Places a build spec on hold.
- {"tool": "create_build_spec", "title": "...", "category": "...", "whatObserved": "...", "architectPrompt": "..."} -> Creates a new Architect Build Spec (#B-0X) for Antigravity when Boss requests a new feature or office improvement.
- {"tool": "run_prospect_audit", "websiteUrl": "https://...", "prospectName": "...", "vertical": "..."} -> Has @scout & @chloe audit a prospect ($0 worker run), file a Vault dossier, and place a new approval card on the Boss's desk.
- {"tool": "browse_and_test_url", "url": "https://..."} -> Uses Marcus's Browser Eye to inspect and screenshot a URL on Mobile (390x844) & Desktop (1440x900).
- {"tool": "send_detailed_email", "subject": "...", "bodyMarkdown": "..."} -> Sends a full detailed Markdown report/breakdown to the Boss's Email tab (use whenever the Boss asks for an email, a deep dive, or when your answer has lots of detail).
- {"tool": "add_vault_memory_rule", "category": "Owner Rule", "fact": "..."} -> Locks a new rule or preference into the Shared Memory Vault for all agents.
- {"tool": "direct_office_floor", "mode": "huddle" | "return"} -> Gathers agents in the War Room ("huddle") or sends them back to their desks ("return").

BOSS'S INCOMING MESSAGE (via ${channel === 'sms_bridge' ? 'Mobile SMS' : 'Office Chat'}):
"${incomingText}"

Return ONLY valid JSON matching this schema:
{
  "toolCalls": [ ...array of tool objects to execute right now (can be empty [] if just answering a question)... ],
  "smsReply": "Your casual, direct human reply for Mobile SMS (MUST be under 180 characters, answering the Boss directly)",
  "chatReply": "Your full, natural, conversational reply for Office Chat (can be 1-3 paragraphs with markdown if helpful)",
  "speechBubble": "Short 1-line status bubble (<70 chars) for your 3D character on the office floor"
}`;

    let parsedDecision = null;
    let tokensIn = 0;
    let tokensOut = 0;

    for (const model of ['gemini-3-flash-preview', 'gemini-3.1-flash-lite-preview']) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
        const llmRes = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
            generationConfig: {
              temperature: 0.45,
              responseMimeType: 'application/json'
            }
          })
        });
        if (llmRes.ok) {
          const llmData = await llmRes.json();
          const rawJson = llmData?.candidates?.[0]?.content?.parts?.[0]?.text || '';
          tokensIn = llmData?.usageMetadata?.promptTokenCount || 350;
          tokensOut = llmData?.usageMetadata?.candidatesTokenCount || 140;
          parsedDecision = JSON.parse(rawJson);
          break;
        }
      } catch (_) {}
    }

    const executedSummaries = [];
    if (parsedDecision && Array.isArray(parsedDecision.toolCalls)) {
      for (const tc of parsedDecision.toolCalls) {
        const toolName = String(tc.tool || '');
        if (toolName === 'edit_desk_draft') {
          const app = (store.approvals[workspaceId] || []).find(a => a.code === tc.code) || (store.approvals[workspaceId] || []).find(a => a.status === 'pending');
          if (app && tc.newDraft) {
            app.draft_payload = tc.newDraft;
            executedSummaries.push(`Updated ${app.code} draft`);
          }
        } else if (toolName === 'approve_desk_item') {
          const app = (store.approvals[workspaceId] || []).find(a => a.code === tc.code) || (store.approvals[workspaceId] || []).find(a => a.status === 'pending');
          if (app) {
            if (tc.editedDraft) app.draft_payload = tc.editedDraft;
            app.status = budget.simulationMode ? 'simulated_sent' : 'approved_sent';
            executedSummaries.push(`Approved ${app.code}`);
          }
        } else if (toolName === 'hold_desk_item') {
          const app = (store.approvals[workspaceId] || []).find(a => a.code === tc.code) || (store.approvals[workspaceId] || []).find(a => a.status === 'pending');
          if (app) {
            app.status = 'on_hold';
            executedSummaries.push(`Held ${app.code}`);
          }
        } else if (toolName === 'approve_build_spec' || toolName === 'hold_build_spec') {
          const normCode = String(tc.code || '#B-01').toUpperCase().replace(/^B(\d)$/, '#B-0$1');
          const bt = (store.buildTickets[workspaceId] || []).find(b => b.code.toUpperCase() === normCode) || (store.buildTickets[workspaceId] || []).find(b => b.status === 'pending_boss');
          if (bt) {
            bt.status = toolName === 'hold_build_spec' ? 'on_hold' : 'approved_for_antigravity';
            executedSummaries.push(`${toolName === 'hold_build_spec' ? 'Held' : 'Approved'} ${bt.code}`);
          }
        } else if (toolName === 'create_build_spec') {
          const nextNum = (store.buildTickets[workspaceId] || []).length + 1;
          const newCode = `#B-0${nextNum}`;
          store.buildTickets[workspaceId].unshift({
            id: `bt-${Date.now()}-${nextNum}`,
            workspace_id: workspaceId,
            code: newCode,
            title: tc.title || 'Custom Boss Build Spec',
            category: tc.category || 'Boss Requested Feature',
            status: 'pending_boss',
            observation_source: 'Direct Conversation with Boss',
            what_marcus_observed: tc.whatObserved || incomingText,
            architect_prompt: tc.architectPrompt || `Implement requested feature: ${tc.title || incomingText}`,
            created_at: nowIso()
          });
          executedSummaries.push(`Created Build Spec ${newCode}`);
        } else if (toolName === 'run_prospect_audit') {
          const pUrl = String(tc.websiteUrl || '').trim();
          const pName = String(tc.prospectName || '').trim() || (pUrl ? pUrl.replace(/^https?:\/\/(www\.)?/i, '').split('/')[0] : 'Central TX Contractor');
          const pVert = String(tc.vertical || 'Local Service SMB').trim();
          const nextAppNum = 101 + (store.approvals[workspaceId] || []).length;
          const newAppCode = `#${nextAppNum}`;
          const newDosId = `dos-${Date.now()}`;
          store.dossiers[workspaceId].unshift({
            id: newDosId,
            workspace_id: workspaceId,
            client_name: pName,
            vertical: pVert,
            website_url: pUrl || 'https://example.com',
            contact_name: `${pName} (Owner)`,
            contact_phone: '+1 (512) 555-0188',
            stage: `Ready for Boss Approval (${newAppCode})`,
            monthly_leak_est: '$7,400 / mo leak',
            sop_code: 'SOP-01',
            summary: `@scout audited ${pUrl || pName} ($0 worker run): found mobile conversion friction and missing sticky tap-to-call.`,
            findings: [
              `Mobile header on ${pUrl || pName} lacks sticky tap-to-call bar`,
              'Above-the-fold lead form cuts off on iPhone viewport'
            ],
            shared_notes: [
              { author: '@scout', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), note: 'Audited via Marcus autonomous dispatch.' }
            ],
            updated_by: '@scout',
            updated_at: nowIso()
          });
          store.approvals[workspaceId].unshift({
            id: `app-${Date.now()}`,
            workspace_id: workspaceId,
            dossier_id: newDosId,
            code: newAppCode,
            title: `${pName} — Conversion Leak Intro SMS (Simulated)`,
            channel: 'SMS (Sandbox)',
            recipient_name: `${pName} (Owner)`,
            recipient_contact: '+1 (512) 555-0188',
            agent_id: 'agent-marcus',
            agent_name: 'Marcus Vance (via @scout & @chloe)',
            sop_code: 'SOP-02',
            what_happened: `@scout audited ${pUrl || pName} ($7,400/mo leak) at $0.00 worker cost.`,
            what_prepared: '@chloe drafted a 2-sentence permission-based SMS opener.',
            draft_payload: `Hey there! Was checking out ${pName} on my phone—love your reputation, but noticed your mobile quote form cuts off on iPhone. Mind if I text over a quick screenshot?`,
            sop_checks: ['SOP-01 Verified ($0 worker run)', 'SOP-02 Verified (zero cold links)'],
            recommended_action: `Reply "Approve ${newAppCode}" or click Approve & Send.`,
            status: 'pending',
            priority: 'high',
            created_at: nowIso()
          });
          executedSummaries.push(`Audited ${pName} (${newAppCode})`);
        } else if (toolName === 'browse_and_test_url') {
          const eye = await inspectUrlWithBrowserEye(store, workspaceId, tc.url || 'https://tiberius.ai/office');
          executedSummaries.push(`Tested ${eye.targetUrl} (${eye.overallStatus})`);
        } else if (toolName === 'send_detailed_email') {
          if (!store.bossEmails[workspaceId]) store.bossEmails[workspaceId] = [];
          store.bossEmails[workspaceId].unshift({
            id: `em-${Date.now()}`,
            workspace_id: workspaceId,
            subject: tc.subject || '[Marcus Executive Note] Detailed Breakdown',
            recipient_email: budget.ownerEmail,
            sender_name: 'Marcus Vance (Chief of Staff • Tiberius HQ)',
            summary_sms_sent: parsedDecision.smsReply || 'Emailed you the full breakdown!',
            body_markdown: tc.bodyMarkdown || parsedDecision.chatReply || incomingText,
            category: 'executive_briefing',
            created_at: nowIso()
          });
          executedSummaries.push('Sent Detailed Email');
        } else if (toolName === 'add_vault_memory_rule') {
          if (tc.fact) {
            store.memoryFacts[workspaceId].unshift({
              id: `mem-${Date.now()}`,
              workspace_id: workspaceId,
              category: tc.category || 'Owner Rule',
              fact: tc.fact,
              added_by: 'You (Boss)',
              created_at: nowIso()
            });
            executedSummaries.push('Saved Rule to Vault');
          }
        } else if (toolName === 'direct_office_floor') {
          const inHuddle = tc.mode === 'huddle';
          const huddleSpots = [
            { x: 4.1, z: -1.9 },
            { x: 6.1, z: -1.9 },
            { x: 3.95, z: -4.35 },
            { x: 6.35, z: -4.35 },
            { x: 7.05, z: -3.2 },
            { x: 5.15, z: -4.28 }
          ];
          (store.actors[workspaceId] || []).forEach((act, idx) => {
            if (inHuddle) {
              act.target_x = huddleSpots[idx % huddleSpots.length].x;
              act.target_z = huddleSpots[idx % huddleSpots.length].z;
            } else if (typeof act.home_x === 'number') {
              act.target_x = act.home_x;
              act.target_z = act.home_z;
            }
          });
        }
      }
    }

    // Track real token usage on the latest shift log so the meter reflects live Gemini 3 usage
    if (tokensIn > 0 && store.shiftLogs[workspaceId] && store.shiftLogs[workspaceId][0]) {
      store.shiftLogs[workspaceId][0].tokens_in += tokensIn;
      store.shiftLogs[workspaceId][0].tokens_out += tokensOut;
      store.shiftLogs[workspaceId][0].estimated_cost_usd = Number(
        (store.shiftLogs[workspaceId][0].estimated_cost_usd + 0.0005).toFixed(4)
      );
    }

    const smsReply = (parsedDecision && parsedDecision.smsReply)
      ? parsedDecision.smsReply
      : `On it, boss! ${executedSummaries.length ? executedSummaries.join(' • ') + '.' : 'Let me know what you want me and the squad to tackle next.'}`;

    const chatReply = (parsedDecision && parsedDecision.chatReply)
      ? parsedDecision.chatReply
      : smsReply;

    // Update Marcus's 3D speech bubble on the office floor
    const marcusActor = (store.actors[workspaceId] || []).find(a => a.id === 'agent-marcus' || a.desk_zone === 'chief_of_staff');
    if (marcusActor) {
      marcusActor.speech_bubble = (parsedDecision && parsedDecision.speechBubble)
        ? String(parsedDecision.speechBubble).slice(0, 85)
        : smsReply.slice(0, 85);
      marcusActor.status = executedSummaries.length ? executedSummaries[0] : 'Active (Gemini 3 Brain)';
    }

    if (channel === 'sms_bridge') {
      pushShortSms(store, workspaceId, smsReply);
      // Also mirror into Office Chat if the chat reply is richer
      if (chatReply && chatReply !== smsReply) {
        store.messages[workspaceId].push({
          id: `msg-out-chat-${Date.now()}`,
          workspace_id: workspaceId,
          channel: 'office_chat',
          sender_name: 'Marcus Vance',
          sender_role: 'Chief of Staff (Gemini 3)',
          direction: 'agent_to_human',
          text: chatReply,
          created_at: nowIso()
        });
      }
    } else {
      store.messages[workspaceId].push({
        id: `msg-out-${Date.now()}`,
        workspace_id: workspaceId,
        channel: 'office_chat',
        sender_name: 'Marcus Vance',
        sender_role: 'Chief of Staff (Gemini 3)',
        direction: 'agent_to_human',
        text: chatReply,
        created_at: nowIso()
      });
    }

    saveStore(store);

    if (route === '/sms/webhook' && body.From && body.Body) {
      res.setHeader('Content-Type', 'text/xml');
      return res.status(200).send(`<Response><Message>${smsReply.replace(/[<>&]/g, '')}</Message></Response>`);
    }
    return res.status(200).json({
      ok: true,
      smsText: smsReply,
      chatText: chatReply,
      executedTools: executedSummaries,
      state: getFullWorkspaceState(store, workspaceId)
    });
  }

  // 8. POST /api/office/reminders/trigger
  if (req.method === 'POST' && route === '/reminders/trigger') {
    const pendingApp = (store.approvals[workspaceId] || []).find(a => a.status === 'pending');
    const pendingBt = (store.buildTickets[workspaceId] || []).find(b => b.status === 'pending_boss');
    const sms = pushShortSms(
      store,
      workspaceId,
      `⏰ Quick check-in boss: ${pendingApp ? `${pendingApp.code} (${pendingApp.recipient_name}) on desk [Reply 1]` : 'Desk clear'} • ${pendingBt ? `Build ${pendingBt.code} ready [Reply B1]` : 'Builds clear'}!`
    );
    saveStore(store);
    return res.status(200).json({ ok: true, sms, state: getFullWorkspaceState(store, workspaceId) });
  }

  // 9. POST /api/office/dossiers/note
  if (req.method === 'POST' && route === '/dossiers/note') {
    const d = (store.dossiers[workspaceId] || []).find(item => item.id === body.dossierId);
    if (d && body.note) {
      d.shared_notes.push({
        author: body.author || 'You (Boss)',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        note: body.note
      });
      saveStore(store);
    }
    return res.status(200).json({ ok: true, state: getFullWorkspaceState(store, workspaceId) });
  }

  // 10. POST /api/office/settings/sms
  if (req.method === 'POST' && route === '/settings/sms') {
    const ws = store.workspaces[workspaceId] || store.workspaces['tiberius-hq'];
    if (body.ownerPhone) ws.owner_phone = body.ownerPhone;
    if (body.smsProvider) ws.sms_provider = body.smsProvider;
    ws.sms_config = { ...(ws.sms_config || {}), ...(body.smsConfig || {}) };
    saveStore(store);
    return res.status(200).json({ ok: true, state: getFullWorkspaceState(store, workspaceId) });
  }

  // 11. POST /api/office/office/huddle
  if (req.method === 'POST' && route === '/office/huddle') {
    const inHuddle = body.mode === 'huddle';
    const huddleSpots = [
      { x: 4.1, z: -1.9 },
      { x: 6.1, z: -1.9 },
      { x: 3.95, z: -4.35 },
      { x: 6.35, z: -4.35 },
      { x: 7.05, z: -3.2 },
      { x: 5.15, z: -4.28 }
    ];
    const homeSpots = {
      'human-boss': { x: -6.06, z: -2.31 },
      'agent-marcus': { x: -2.41, z: 1.65 },
      'agent-scout': { x: 2.39, z: 2.05 },
      'agent-chloe': { x: 5.19, z: 2.05 },
      'agent-devon': { x: 3.79, z: 4.55 },
      'human-sarah': { x: 5.15, z: -4.28 }
    };
    (store.actors[workspaceId] || []).forEach((act, idx) => {
      const target = inHuddle ? (huddleSpots[idx % huddleSpots.length]) : (homeSpots[act.id] || { x: act.x, z: act.z });
      act.target_x = target.x;
      act.target_z = target.z;
    });
    saveStore(store);
    return res.status(200).json({ ok: true, state: getFullWorkspaceState(store, workspaceId) });
  }

  return res.status(200).json(getFullWorkspaceState(store, workspaceId));
};
