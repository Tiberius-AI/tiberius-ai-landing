(() => {
  'use strict';
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  function closeMenu(){if(!menu||!nav)return;menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');nav.classList.remove('is-open');}
  menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav?.classList.toggle('is-open',open);});
  nav?.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});

  const states = {
    invoices:['Job details received','Invoice ready to review','Creation and sending approved','Invoice sent'],
    receptionist:['Incoming customer call','Alfred is taking the details','Name, number and request captured','New inquiry ready for you'],
    marketing:['Your offer is the starting point','Research and recommendations prepared','Three creative directions to review','Ad draft ready for review']
  };
  let selected = document.body.dataset.demo || 'invoices', step = 0, timer = null;
  const tabs = [...document.querySelectorAll('[data-scenario]')];
  const activePanel = () => document.getElementById('panel-'+selected);
  function stop(){if(timer!==null)clearInterval(timer);timer=null;const label=activePanel()?.querySelector('[data-play] span');if(label)label.textContent=step===3?'Replay example':'Play example';}
  function render(){const panel=activePanel();if(!panel)return;panel.querySelector('[data-status-text]').textContent=states[selected][step];panel.querySelectorAll('[data-step]').forEach((el,i)=>{el.classList.toggle('is-done',i<step);if(i===step)el.setAttribute('aria-current','step');else el.removeAttribute('aria-current');});const next=panel.querySelector('[data-next]');next.firstChild.textContent=step===3?'Start again ':'Next step ';if(timer===null)panel.querySelector('[data-play] span').textContent=step===3?'Replay example':'Play example';}
  function choose(key,focus=false){if(!Object.hasOwn(states,key))return;stop();selected=key;step=0;for(const tab of tabs){const on=tab.dataset.scenario===key;tab.setAttribute('aria-selected',String(on));tab.tabIndex=on?0:-1;document.getElementById(tab.getAttribute('aria-controls')).hidden=!on;if(on&&focus)tab.focus();}render();}
  tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>choose(tab.dataset.scenario));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;else if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;else return;e.preventDefault();choose(tabs[next].dataset.scenario,true);});});
  document.querySelectorAll('[data-demo-jump]').forEach(link=>link.addEventListener('click',()=>choose(link.dataset.demoJump)));
  document.querySelectorAll('[data-next]').forEach(button=>button.addEventListener('click',()=>{stop();step=(step+1)%4;render();}));
  document.querySelectorAll('[data-play]').forEach(button=>button.addEventListener('click',()=>{if(timer!==null){stop();return;}if(step===3)step=0;render();button.querySelector('span').textContent='Pause example';timer=setInterval(()=>{if(step===3){stop();return;}step++;render();if(step===3)stop();},1800);}));
  document.querySelectorAll('[data-format]').forEach(button=>button.addEventListener('click',()=>{const panel=button.closest('.demo-panel');panel.querySelectorAll('[data-format]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));panel.querySelector('.waveform').hidden=button.dataset.format==='text';}));
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  window.addEventListener('pagehide',stop);

  const form=document.getElementById('trial-form');
  if(!form)return;
  const plans={receptionist:{name:'Alfred Receptionist',price:57},premium:{name:'Alfred Premium',price:369}};
  const requested=new URLSearchParams(location.search).get('plan');
  const planInput=()=>form.querySelector('input[name="plan"]:checked');
  let saved='';try{saved=sessionStorage.getItem('alfred-selected-plan')||'';}catch{}
  const plan=Object.hasOwn(plans,requested)?requested:Object.hasOwn(plans,saved)?saved:'premium';
  form.querySelector('input[value="'+plan+'"]').checked=true;
  function save(){try{sessionStorage.setItem('alfred-selected-plan',planInput().value);}catch{}}
  form.addEventListener('change',save);
  function add(parent,tag,text){const el=document.createElement(tag);el.textContent=text;parent.append(el);return el;}
  function summary(){
    const key=planInput().value,selectedPlan=plans[key],target=document.getElementById('trial-summary');target.replaceChildren();add(target,'h3',selectedPlan.name);
    const dl=add(target,'dl','');
    for(const [label,value] of [['Your trial','7 days free for new customers'],['Card at checkout','Required'],['After the trial','$'+selectedPlan.price+'/month plus applicable tax, billed automatically'],['Cancel','Before the trial ends to avoid the first charge']]){add(dl,'dt',label);add(dl,'dd',value);}
    add(target,'p','Usage limits and supported connections apply. Advertising spend, third-party subscriptions and custom work are separate.');
    document.getElementById('account-continue').href='/dashboard/login?signup=1&plan='+encodeURIComponent(key);
  }
  function show(number){save();if(number===2)summary();form.querySelectorAll('[data-form-step]').forEach(section=>section.hidden=Number(section.dataset.formStep)!==number);form.querySelectorAll('[data-progress]').forEach(item=>{if(Number(item.dataset.progress)===number)item.setAttribute('aria-current','step');else item.removeAttribute('aria-current');});const heading=form.querySelector('[data-form-step="'+number+'"] h2');heading.tabIndex=-1;heading.focus({preventScroll:true});form.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}
  form.querySelectorAll('[data-continue]').forEach(button=>button.addEventListener('click',()=>show(Number(button.dataset.continue))));form.querySelectorAll('[data-back]').forEach(button=>button.addEventListener('click',()=>show(Number(button.dataset.back))));
  form.addEventListener('submit',e=>{e.preventDefault();});
})();
