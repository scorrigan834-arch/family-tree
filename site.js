/* Family Tree — shared header (search + menu), footer, and personalization.
   Everything is injected here so every page stays in sync. Memory is per-device
   via localStorage (accounts come later). */
(function () {
  var PKEY = 'familyTreeProfile';
  var DKEY = 'familyTreeDone';

  var STAGE_LESSONS = {
    'first-roots.html':   ['first-roots-earning.html','first-roots-saving.html','first-roots-needs.html','first-roots-giving.html'],
    'growing.html':       ['growing-budget.html','growing-goal.html','growing-banks.html','growing-spending.html','growing-safety.html','growing-earning.html'],
    'branching-out.html': ['branching-paycheck.html','branching-credit.html','branching-accounts.html','branching-aid.html','branching-apartment.html','branching-invest.html','branching-car.html'],
    'taking-root.html':   ['taking-budget.html','taking-debt.html','taking-investing.html','taking-housing.html','taking-emergency.html','taking-taxes.html','taking-family.html'],
    'canopy.html':        ['canopy-investing.html','canopy-insurance.html','canopy-estate.html','canopy-teaching.html','canopy-heirs.html','canopy-giving.html','canopy-healthcare.html']
  };
  var ALL_LESSONS = [];
  Object.keys(STAGE_LESSONS).forEach(function(k){ ALL_LESSONS = ALL_LESSONS.concat(STAGE_LESSONS[k]); });

  // search index
  var INDEX = [
    {u:'first-roots-earning.html', t:'Earning your first dollar', c:'Lesson', k:'earn work chores allowance kids'},
    {u:'first-roots-saving.html', t:'Saving for something you want', c:'Lesson', k:'save jar goal waiting kids'},
    {u:'first-roots-needs.html', t:'Needs versus wants', c:'Lesson', k:'needs wants spending kids'},
    {u:'growing-budget.html', t:'Making a simple budget', c:'Lesson', k:'budget plan spend save give'},
    {u:'growing-goal.html', t:'Setting a savings goal', c:'Lesson', k:'goal save weekly target'},
    {u:'growing-banks.html', t:'How banks and interest work', c:'Lesson', k:'bank interest savings account'},
    {u:'branching-paycheck.html', t:'Your first paycheck and taxes', c:'Lesson', k:'paycheck gross net taxes pay stub'},
    {u:'branching-credit.html', t:'Student loans and credit', c:'Lesson', k:'credit score apr loan student debt card'},
    {u:'branching-accounts.html', t:'Opening real accounts', c:'Lesson', k:'checking savings debit credit account'},
    {u:'branching-aid.html', t:'Paying for college: aid, FAFSA, and loans', c:'Lesson', k:'fafsa financial aid grants scholarships student loans college'},
    {u:'branching-apartment.html', t:'Your first apartment', c:'Lesson', k:'apartment rent lease deposit roommates renters insurance'},
    {u:'branching-invest.html', t:'Start investing early', c:'Lesson', k:'invest roth ira index fund young compound early'},
    {u:'activity-needs-wants.html', t:'Needs & Wants game', c:'Activity', k:'game play needs wants sorting kids first roots'},
    {u:'activity-jars.html', t:'Spend, Save, Give game', c:'Activity', k:'game play jars spend save give allowance coins kids'},
    {u:'activity-grow.html', t:'Watch your money grow', c:'Activity', k:'game play compound interest grow money savings visual'},
    {u:'taking-budget.html', t:'Budgeting a real salary', c:'Lesson', k:'budget 50 30 20 salary automate'},
    {u:'taking-debt.html', t:'Paying down debt', c:'Lesson', k:'debt avalanche snowball credit card interest'},
    {u:'taking-investing.html', t:'Investing for the first time', c:'Lesson', k:'invest 401k roth ira index fund stocks'},
    {u:'taking-housing.html', t:'Renting versus buying', c:'Lesson', k:'rent buy home house mortgage equity'},
    {u:'canopy-investing.html', t:'Investing for the long run', c:'Lesson', k:'invest diversify rebalance fees'},
    {u:'canopy-insurance.html', t:'Family and insurance', c:'Lesson', k:'insurance emergency life health disability'},
    {u:'canopy-estate.html', t:'Estate planning and what to pass on', c:'Lesson', k:'estate will beneficiary legacy inheritance'},
    {u:'growing-earning.html', t:'Earning money as a teen', c:'Lesson', k:'earn teen job babysitting entrepreneur side hustle'},
    {u:'branching-car.html', t:'Your first car', c:'Lesson', k:'car buy used insurance cost transportation'},
    {u:'taking-family.html', t:'Money and relationships', c:'Lesson', k:'couples marriage relationships combining finances family'},
    {u:'canopy-healthcare.html', t:'Healthcare and long-term care', c:'Lesson', k:'healthcare medicare long term care hsa retirement'},
    {u:'activity-invest-early.html', t:'Start early vs start late', c:'Activity', k:'game compound investing early start age simulator'},
    {u:'activity-credit.html', t:'Build your credit', c:'Activity', k:'game credit score decisions choices simulator'},
    {u:'first-roots-giving.html', t:'Sharing and giving', c:'Lesson', k:'give giving generosity sharing charity kids'},
    {u:'growing-spending.html', t:'Smart spending and ads', c:'Lesson', k:'spending ads advertising marketing wants comparison'},
    {u:'growing-safety.html', t:'Money online: apps and scams', c:'Lesson', k:'online scams fraud apps safety digital passwords'},
    {u:'taking-emergency.html', t:'Building your emergency fund', c:'Lesson', k:'emergency fund savings cushion months'},
    {u:'taking-taxes.html', t:'Understanding your taxes', c:'Lesson', k:'taxes brackets marginal withholding deduction credit w4'},
    {u:'canopy-teaching.html', t:'Teaching your kids about money', c:'Lesson', k:'teaching kids children money parents heirs'},
    {u:'canopy-heirs.html', t:'Preparing your heirs', c:'Lesson', k:'heirs prepare wealth transfer values estate legacy'},
    {u:'canopy-giving.html', t:'Giving and philanthropy', c:'Lesson', k:'giving philanthropy donor advised charity legacy'},
    {u:'activity-first-month.html', t:'Your first month on your own', c:'Activity', k:'game budget paycheck simulator rent savings'},
    {u:'compound-interest.html', t:'Compound interest', c:'Tool', k:'compound interest growth invest save'},
    {u:'budget.html', t:'Budget builder', c:'Tool', k:'budget 50 30 20 needs wants savings'},
    {u:'debt-payoff.html', t:'Debt payoff', c:'Tool', k:'debt payoff credit card interest'},
    {u:'savings-goal.html', t:'Savings goal', c:'Tool', k:'savings goal months'},
    {u:'net-worth.html', t:'Net worth', c:'Tool', k:'net worth assets liabilities'},
    {u:'emergency-fund.html', t:'Emergency fund', c:'Tool', k:'emergency fund savings target'},
    {u:'take-home-pay.html', t:'Take-home pay', c:'Tool', k:'take home pay net salary taxes'},
    {u:'mortgage.html', t:'Mortgage payment', c:'Tool', k:'mortgage payment home loan interest'},
    {u:'retirement.html', t:'Retirement projection', c:'Tool', k:'retirement 401k savings projection'},
    {u:'retirement-check.html', t:'Am I on track for retirement?', c:'Tool', k:'retirement on track benchmark savings age readiness check'},
    {u:'rent-vs-buy.html', t:'Rent vs. buy', c:'Tool', k:'rent buy home compare'},
    {u:'inflation.html', t:'Inflation and buying power', c:'Tool', k:'inflation buying power future cost'},
    {u:'college-savings.html', t:'College savings', c:'Tool', k:'college savings 529 education'},
    {u:'salary-vs-hourly.html', t:'Salary and hourly', c:'Tool', k:'salary hourly wage convert'},
    {u:'first-roots.html', t:'First Roots (ages 5–10)', c:'Stage', k:'stage kids young'},
    {u:'growing.html', t:'Growing (ages 10–15)', c:'Stage', k:'stage teen'},
    {u:'branching-out.html', t:'Branching Out (ages 15–22)', c:'Stage', k:'stage college teen'},
    {u:'taking-root.html', t:'Taking Root (ages 22–30)', c:'Stage', k:'stage adult'},
    {u:'canopy.html', t:'The Canopy (ages 30+)', c:'Stage', k:'stage legacy'},
    {u:'profile.html', t:'Build your profile', c:'Page', k:'profile personalize'},
    {u:'tools.html', t:'All tools', c:'Page', k:'tools calculators'},
    {u:'start-here.html', t:'Start here', c:'Page', k:'start how it works'},
    {u:'about.html', t:'About', c:'Page', k:'about mission'},
    {u:'glossary.html', t:'Glossary', c:'Page', k:'glossary terms definitions'},
    {u:'faq.html', t:'FAQ', c:'Page', k:'faq questions'},
    {u:'resources.html', t:'Resources', c:'Page', k:'resources links'},
    {u:'guides.html', t:'All guides', c:'Guides', k:'guides library topics reference'},
    {u:'games.html', t:'Games — learn money by playing', c:'Activity', k:'games play interactive activities fun kids'},
    {u:'tracks.html', t:'Tracks — follow a skill across stages', c:'Page', k:'tracks skills earn save spend invest grow protect give path'},
    {u:'adventure.html', t:'Your Money Journey (game)', c:'Activity', k:'game adventure money journey life choices simulator interactive'},
    {u:'guide-estate.html', t:'Estate planning and protecting your family', c:'Guide', k:'estate will trust beneficiary power of attorney legacy heirs'},
    {u:'guide-behavioral.html', t:'Why smart people make bad money decisions', c:'Guide', k:'behavioral psychology bias loss aversion lifestyle creep'},
    {u:'guide-kids.html', t:'What changes when children arrive', c:'Guide', k:'kids children baby 529 guardianship life insurance'},
    {u:'guide-couples.html', t:'How couples can manage money', c:'Guide', k:'couples marriage joint separate prenup money'},
    {u:'guide-retirement-accounts.html', t:'Roth vs Traditional vs HSA', c:'Guide', k:'roth traditional hsa 401k retirement account tax'},
    {u:'guide-index-vs-stocks.html', t:'Index funds vs individual stocks', c:'Guide', k:'index funds stocks investing diversification fees'},
    {u:'guide-banking.html', t:'Banking basics', c:'Guide', k:'bank checking savings high yield hysa fees fdic'},
    {u:'guide-credit-unions.html', t:'Credit unions vs banks', c:'Guide', k:'credit union bank fees membership'},
    {u:'guide-credit.html', t:'How credit scores work', c:'Guide', k:'credit score utilization payment history report'},
    {u:'guide-credit-card.html', t:'Using a credit card without debt', c:'Guide', k:'credit card balance apr autopay rewards'},
    {u:'guide-taxes.html', t:'Taxes 101', c:'Guide', k:'taxes brackets deductions credits withholding refund'},
    {u:'guide-paycheck.html', t:'Your first paycheck, line by line', c:'Guide', k:'paycheck pay stub gross net fica withholding'},
    {u:'guide-side-taxes.html', t:'Side-income and self-employment taxes', c:'Guide', k:'side hustle freelance self employment 1099 quarterly estimated tax'},
    {u:'guide-investing.html', t:'Should I start investing now?', c:'Guide', k:'investing start begin index fund roth compound'},
    {u:'guide-social-security.html', t:'Social Security basics', c:'Guide', k:'social security retirement claiming age benefit'},
    {u:'guide-capital-gains.html', t:'Capital gains taxes', c:'Guide', k:'capital gains tax long term short term harvesting basis'},
    {u:'guide-insurance.html', t:'What insurance do you need?', c:'Guide', k:'insurance health auto home life disability umbrella'},
    {u:'guide-life-insurance.html', t:'How much life insurance?', c:'Guide', k:'life insurance term whole dime coverage'},
    {u:'guide-disability.html', t:'Disability insurance', c:'Guide', k:'disability insurance income own occupation protect'},
    {u:'guide-college.html', t:'Is college worth it?', c:'Guide', k:'college university degree roi major tuition'},
    {u:'guide-student-debt.html', t:'How much student debt is too much?', c:'Guide', k:'student loans debt federal repayment'},
    {u:'guide-grad-school.html', t:'Is grad school worth it?', c:'Guide', k:'grad school graduate degree masters opportunity cost'},
    {u:'guide-job-offer.html', t:'How to evaluate a job offer', c:'Guide', k:'job offer compensation equity rsu benefits negotiate'},
    {u:'guide-salary.html', t:'How to negotiate your salary', c:'Guide', k:'salary negotiate raise pay compensation'},
    {u:'guide-change-jobs.html', t:'Should I change jobs?', c:'Guide', k:'change jobs switch employer raise vesting 401k rollover'},
    {u:'guide-rent-buy.html', t:'Rent or buy a home?', c:'Guide', k:'rent buy home house mortgage equity'},
    {u:'guide-house.html', t:'How much house can I afford?', c:'Guide', k:'house afford mortgage 28 36 down payment'},
    {u:'guide-llc.html', t:'When should I form an LLC?', c:'Guide', k:'llc business entity liability s-corp self employment'},
    {u:'guide-freelance.html', t:'Freelancing vs a full-time job', c:'Guide', k:'freelance full time benefits rate self employment'},
    {u:'guide-car.html', t:'New vs used car', c:'Guide', k:'car new used depreciation buy vehicle'},
    {u:'guide-lease.html', t:'Lease or buy a car?', c:'Guide', k:'car lease buy vehicle payment'},
    {u:'guide-emergency.html', t:'How to build an emergency fund', c:'Guide', k:'emergency fund savings cushion 3 6 months'},
    {u:'guide-checkup.html', t:'Am I on track for my age?', c:'Guide', k:'on track benchmark net worth savings age retirement'},
    {u:'guide-mental-health.html', t:'Money and mental health', c:'Guide', k:'mental health money stress anxiety wellbeing'},
    {u:'advisors.html', t:'For advisors & families', c:'Page', k:'advisors wealth management firms families clients heirs next generation offering'}
  ];

  function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }
  function getProfile(){ try{ var v=localStorage.getItem(PKEY); return v?JSON.parse(v):null; }catch(e){ return null; } }
  function getDone(){ try{ var v=localStorage.getItem(DKEY); return v?JSON.parse(v):{}; }catch(e){ return {}; } }
  function setDone(d){ try{ localStorage.setItem(DKEY, JSON.stringify(d)); }catch(e){} }
  function fname(){ return (location.pathname.split('/').pop() || 'index.html'); }
  function base(href){ return (href || '').split('/').pop(); }
  function stageFromAge(a){
    if(a<=10) return {slug:'first-roots.html', name:'First Roots'};
    if(a<=15) return {slug:'growing.html', name:'Growing'};
    if(a<=22) return {slug:'branching-out.html', name:'Branching Out'};
    if(a<=30) return {slug:'taking-root.html', name:'Taking Root'};
    return {slug:'canopy.html', name:'The Canopy'};
  }

  function injectCSS(){
    if(document.getElementById('ft-css')) return;
    var s=document.createElement('style'); s.id='ft-css';
    s.textContent =
      '.nav .row{display:flex;gap:14px;align-items:center;padding:10px 24px;max-width:1000px;margin:0 auto;}' +
      '.ft-search{position:relative;flex:1;max-width:440px;}' +
      '.ft-search input{width:100%;padding:9px 15px;border-radius:99px;border:1px solid #2a5344;background:#0f2a22;color:#eaf1e3;font-family:var(--sans);font-size:14px;}' +
      '.ft-search input::placeholder{color:#8fa596;}' +
      '.ft-search input:focus{outline:2px solid var(--sprout);}' +
      '.ft-results{position:absolute;top:120%;left:0;right:0;background:#fff;border:1px solid var(--line);border-radius:12px;box-shadow:0 14px 34px rgba(15,42,34,.18);overflow:hidden;display:none;z-index:60;max-height:360px;overflow-y:auto;}' +
      '.ft-results a{display:block;padding:10px 14px;text-decoration:none;border-bottom:1px solid var(--sand);}' +
      '.ft-results a:last-child{border-bottom:0;}' +
      '.ft-results a:hover,.ft-results a.active{background:var(--sand);}' +
      '.ft-results .cat{font-size:11px;color:var(--clay);font-weight:600;text-transform:uppercase;letter-spacing:.05em;}' +
      '.ft-results .t{display:block;font-size:14px;color:var(--forest);font-weight:500;}' +
      '.ft-results .empty{padding:12px 14px;color:var(--stone);font-size:14px;}' +
      '.ft-menu{position:relative;}' +
      '.ft-menu-btn{background:transparent;border:1px solid #2a5344;color:#eaf1e3;font-family:var(--sans);font-weight:600;font-size:14px;padding:8px 14px;border-radius:9px;cursor:pointer;white-space:nowrap;}' +
      '.ft-menu-btn:hover{background:#0f2a22;}' +
      '.ft-menu-panel{position:absolute;right:0;top:120%;background:#fff;border:1px solid var(--line);border-radius:12px;box-shadow:0 14px 34px rgba(15,42,34,.18);min-width:230px;padding:8px;display:none;z-index:60;}' +
      '.ft-menu-panel a{display:block;padding:8px 12px;text-decoration:none;color:var(--ink);border-radius:8px;font-size:14px;}' +
      '.ft-menu-panel a:hover{background:var(--sand);color:var(--forest);}' +
      '.ft-menu-panel a.home{font-weight:600;color:var(--forest);}' +
      '.ft-menu-label{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--stone);padding:10px 12px 4px;}' +
      '@media (max-width:560px){.nav .row{gap:8px;padding:8px 14px;}.ft-search{max-width:none;}}';
    document.head.appendChild(s);
  }

  ready(function () {
    injectCSS();
    var path = fname();
    var p = getProfile();
    var done = getDone();
    var st = (p && p.age) ? stageFromAge(p.age) : null;

    // ---- build unified header (replace any existing page nav) ----
    var existing = document.querySelector('nav.nav');
    if (existing) existing.remove();

    var menuLinks = '<a class="home" href="index.html">Home</a>';
    if (st) menuLinks += '<a href="' + st.slug + '" style="color:var(--moss);font-weight:600;">Resume: ' + st.name + ' \u2192</a>';
    menuLinks +=
      '<div class="ft-menu-label">Stages</div>' +
      '<a href="first-roots.html">First Roots</a>' +
      '<a href="growing.html">Growing</a>' +
      '<a href="branching-out.html">Branching Out</a>' +
      '<a href="taking-root.html">Taking Root</a>' +
      '<a href="canopy.html">The Canopy</a>' +
      '<div class="ft-menu-label">Explore</div>' +
      '<a href="advisors.html" style="color:var(--clay);font-weight:600;">For advisors &amp; families</a>' +
      '<a href="profile.html">Build your profile</a>' +
      '<a href="tools.html">Tools</a>' +
      '<a href="games.html">Games</a>' +
      '<a href="guides.html">Guides</a>' +
      '<a href="tracks.html">Tracks</a>' +
      '<a href="adventure.html">Money Journey</a>' +
      '<a href="start-here.html">Start here</a>' +
      '<a href="about.html">About</a>' +
      '<a href="glossary.html">Glossary</a>' +
      '<a href="faq.html">FAQ</a>' +
      '<a href="resources.html">Resources</a>' +
      '<a href="privacy.html">Privacy</a>';

    var nav = document.createElement('nav');
    nav.className = 'nav';
    nav.innerHTML =
      '<div class="row">' +
        '<div class="ft-search">' +
          '<input id="ft-q" type="search" placeholder="Search lessons and tools\u2026" autocomplete="off" aria-label="Search" />' +
          '<div id="ft-results" class="ft-results"></div>' +
        '</div>' +
        '<span style="flex:1"></span>' +
        '<div class="ft-menu">' +
          '<button id="ft-menu-btn" class="ft-menu-btn" aria-expanded="false">Menu \u25be</button>' +
          '<div id="ft-menu-panel" class="ft-menu-panel">' + menuLinks + '</div>' +
        '</div>' +
      '</div>';
    var hdr = document.querySelector('header.topbar');
    hdr ? hdr.insertAdjacentElement('afterend', nav) : document.body.insertAdjacentElement('afterbegin', nav);

    // ---- search behavior ----
    var q = document.getElementById('ft-q');
    var rbox = document.getElementById('ft-results');
    function renderResults(list){
      if(!list.length){ rbox.innerHTML = '<div class="empty">No matches. Try another word.</div>'; rbox.style.display='block'; return; }
      rbox.innerHTML = list.map(function(it){
        return '<a href="' + it.u + '"><span class="cat">' + it.c + '</span><span class="t">' + it.t + '</span></a>';
      }).join('');
      rbox.style.display='block';
    }
    function runSearch(){
      var v = q.value.trim().toLowerCase();
      if(!v){ rbox.style.display='none'; return; }
      var words = v.split(/\s+/);
      var res = INDEX.filter(function(it){
        var hay = (it.t + ' ' + it.c + ' ' + it.k).toLowerCase();
        return words.every(function(w){ return hay.indexOf(w) >= 0; });
      });
      res.sort(function(a,b){ return (b.t.toLowerCase().indexOf(v)===0?1:0) - (a.t.toLowerCase().indexOf(v)===0?1:0); });
      renderResults(res.slice(0,8));
    }
    q.addEventListener('input', runSearch);
    q.addEventListener('keydown', function(e){
      var items = Array.prototype.slice.call(rbox.querySelectorAll('a'));
      var idx = -1; for(var i=0;i<items.length;i++){ if(items[i].classList.contains('active')) idx=i; }
      if(e.key === 'ArrowDown'){ e.preventDefault(); if(items.length){ if(idx>=0)items[idx].classList.remove('active'); items[Math.min(idx+1,items.length-1)].classList.add('active'); } }
      else if(e.key === 'ArrowUp'){ e.preventDefault(); if(items.length){ if(idx>=0)items[idx].classList.remove('active'); items[Math.max(idx-1,0)].classList.add('active'); } }
      else if(e.key === 'Enter'){ var a = rbox.querySelector('a.active') || rbox.querySelector('a'); if(a){ location.href = a.getAttribute('href'); } }
      else if(e.key === 'Escape'){ rbox.style.display='none'; }
    });

    // ---- menu toggle ----
    var btn = document.getElementById('ft-menu-btn');
    var panel = document.getElementById('ft-menu-panel');
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      var open = panel.style.display === 'block';
      panel.style.display = open ? 'none' : 'block';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
    document.addEventListener('click', function(e){
      if(!e.target.closest('.ft-search')) rbox.style.display='none';
      if(!e.target.closest('.ft-menu')){ panel.style.display='none'; btn.setAttribute('aria-expanded','false'); }
    });

    // ---- footer (skip if page already has one) ----
    if (!document.querySelector('.sitefoot') && !document.querySelector('.bigfoot')) {
      var f = document.createElement('footer');
      f.className = 'sitefoot';
      f.innerHTML = '<div class="row"><a href="glossary.html">Glossary</a> &middot; <a href="faq.html">FAQ</a> &middot; <a href="resources.html">Resources</a> &middot; <a href="privacy.html">Privacy</a></div>';
      document.body.appendChild(f);
    }

    // ---- homepage welcome-back banner ----
    if ((path === '' || path === 'index.html') && st) {
      var banner = document.createElement('div');
      banner.style.cssText = 'background:var(--sand);border-bottom:1px solid var(--line);';
      banner.innerHTML = '<div class="inner" style="padding:12px 24px;display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap;">' +
        '<span style="font-size:14px;">Welcome back. Continue in <strong>' + st.name + '</strong>' + (p.who === 'child' ? ' (your child\u2019s stage)' : '') + '.</span>' +
        '<a class="btn" href="' + st.slug + '" style="padding:9px 16px;">Resume \u2192</a></div>';
      nav.insertAdjacentElement('afterend', banner);
    }

    // ---- stage pages: progress count + ticks ----
    if (STAGE_LESSONS[path]) {
      var lessons = STAGE_LESSONS[path];
      var dc = lessons.filter(function(l){ return done[l]; }).length;
      var head = document.querySelector('#lessons .sec-head');
      if (head) {
        var chip = document.createElement('span');
        chip.style.cssText = 'display:inline-block;margin-top:8px;font-size:13px;font-weight:600;color:var(--moss);background:#EAF1E3;border:1px solid #D3E3C6;border-radius:99px;padding:5px 13px;';
        chip.textContent = dc + ' of ' + lessons.length + ' lessons complete';
        head.appendChild(chip);
      }
      document.querySelectorAll('#lessons a.stage-card').forEach(function(card){
        if (done[base(card.getAttribute('href'))]) {
          var tag = document.createElement('div');
          tag.style.cssText = 'color:var(--moss);font-weight:600;font-size:13px;margin-top:8px;';
          tag.textContent = '\u2713 Completed';
          card.appendChild(tag);
        }
      });
    }

    // ---- lesson pages: mark-complete toggle ----
    if (ALL_LESSONS.indexOf(path) >= 0) {
      var wrap = document.querySelector('.prose');
      if (wrap && wrap.parentNode) {
        var boxEl = document.createElement('div');
        boxEl.style.cssText = 'margin-top:22px;padding:14px 16px;border:1px solid var(--line);border-radius:12px;background:#fff;display:flex;align-items:center;gap:10px;';
        var mb = document.createElement('button');
        mb.className = 'btn';
        function renderMark(){
          if (done[path]) { mb.textContent='\u2713 Completed'; mb.style.background='var(--sprout)'; mb.style.color='#12352b'; }
          else { mb.textContent='Mark as complete'; mb.style.background='var(--moss)'; mb.style.color='#fff'; }
        }
        mb.addEventListener('click', function(){ done[path] = !done[path]; setDone(done); renderMark(); if (done[path] && window.ftCelebrate) window.ftCelebrate('Nice! Your tree just grew.'); });
        renderMark();
        boxEl.appendChild(mb);
        var note = document.createElement('span'); note.className='muted'; note.style.fontSize='13px'; note.textContent='Saved on this device.';
        boxEl.appendChild(note);
        wrap.parentNode.insertBefore(boxEl, wrap.nextSibling);
      }
    }
  });
})();

/* ---- Discovery add-ons: advisors band + guide recommendations ---- */
(function () {
  function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }
  function fname(){ return (location.pathname.split('/').pop() || 'index.html'); }
  function getProfile(){ try{ var v=localStorage.getItem('familyTreeProfile'); return v?JSON.parse(v):null; }catch(e){ return null; } }
  function stageFromAge(a){
    if(a<=10) return 'first-roots.html';
    if(a<=15) return 'growing.html';
    if(a<=22) return 'branching-out.html';
    if(a<=30) return 'taking-root.html';
    return 'canopy.html';
  }
  var SG = {
    'first-roots.html': [['guide-kids.html','When children arrive'],['guide-college.html','Is college worth it?'],['guide-behavioral.html','Why smart people make bad money decisions']],
    'growing.html': [['guide-banking.html','Banking basics'],['guide-behavioral.html','Why smart people make bad money decisions'],['guide-college.html','Is college worth it?']],
    'branching-out.html': [['guide-college.html','Is college worth it?'],['guide-student-debt.html','How much student debt?'],['guide-credit.html','How credit scores work'],['guide-paycheck.html','Your first paycheck, line by line']],
    'taking-root.html': [['guide-investing.html','Should I start investing now?'],['guide-retirement-accounts.html','Roth vs Traditional vs HSA'],['guide-rent-buy.html','Rent or buy a home?'],['guide-salary.html','Negotiate your salary']],
    'canopy.html': [['guide-estate.html','Estate planning & your family'],['guide-insurance.html','What insurance do you need?'],['guide-index-vs-stocks.html','Index funds vs stocks'],['guide-couples.html','Couples & money']]
  };
  var GENERAL = [['guide-estate.html','Estate planning & your family'],['guide-investing.html','Should I start investing now?'],['guide-behavioral.html','Why smart people make bad money decisions'],['guide-kids.html','When children arrive']];

  function cardRow(pairs){
    return pairs.map(function(p){
      return '<a class="card" href="' + p[0] + '" style="margin-bottom:8px;"><strong style="font-family:var(--serif);color:var(--forest);font-size:16px;">' + p[1] + '</strong></a>';
    }).join('');
  }
  function band(cls, inner){
    var s = document.createElement('section'); s.className = 'section ' + cls;
    var d = document.createElement('div'); d.className = 'inner'; d.innerHTML = inner;
    s.appendChild(d); return s;
  }
  function beforeFooter(el){
    var f = document.querySelector('.sitefoot') || document.querySelector('.bigfoot');
    if (f && f.parentNode) { f.parentNode.insertBefore(el, f); } else { document.body.appendChild(el); }
  }

  ready(function () {
    var path = fname();

    // (1) homepage — advisors & families band
    if (path === '' || path === 'index.html') {
      beforeFooter(band('band-sand',
        '<div style="text-align:center;">' +
          '<span class="eyebrow">For advisors &amp; families</span>' +
          '<h2 class="sec-title">Built for advisors, their clients, and every parent.</h2>' +
          '<p class="subhead" style="max-width:640px;margin:8px auto 0;">Whether you manage wealth for client families or you\'re raising a money-smart kid, see exactly what Family Tree offers you and your children.</p>' +
          '<div class="cta-row" style="justify-content:center;margin-top:18px;"><a class="btn btn-lg" href="advisors.html">See what\'s in it for you &rarr;</a></div>' +
        '</div>'));
    }

    // (2) stage pages — guides for this stage
    if (SG[path]) {
      beforeFooter(band('band-sand',
        '<span class="eyebrow">Guides for this stage</span>' +
        '<h2 class="sec-title">Go deeper with related guides.</h2>' +
        '<div class="grid" style="margin-top:16px;">' + cardRow(SG[path]) + '</div>' +
        '<p style="margin-top:16px;"><a href="guides.html">Browse all guides &rarr;</a></p>'));
    }

    // (3) profile page — recommended guides (personalized when a profile exists)
    if (path === 'profile.html') {
      var p = getProfile();
      var pairs, heading;
      if (p && p.age) { pairs = SG[stageFromAge(p.age)] || GENERAL; heading = 'Guides for your stage.'; }
      else { pairs = GENERAL; heading = 'Guides worth starting with.'; }
      beforeFooter(band('band-paper',
        '<span class="eyebrow">Recommended guides</span>' +
        '<h2 class="sec-title">' + heading + '</h2>' +
        '<div class="grid" style="margin-top:16px;">' + cardRow(pairs) + '</div>' +
        '<p style="margin-top:16px;"><a href="guides.html">Browse all 33 guides &rarr;</a></p>'));
    }
  });
})();

/* ---- Lesson knowledge-check quizzes ---- */
(function () {
  function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }
  function fname(){ return (location.pathname.split('/').pop() || 'index.html'); }

  var QUIZZES = {
    "growing-earning.html": [
      {q:"A good way to earn money as a teen is...", a:["babysitting, tutoring, or yard work","waiting for it to appear","borrowing forever"], c:0, e:"Small jobs build skills and real earning."},
      {q:"Thinking like an entrepreneur means...", a:["finding a need people will pay to solve","spending all you make","copying homework"], c:0, e:"Spot a need, do good work, and people pay."},
      {q:"Earning your own money helps you see a purchase as...", a:["hours of work it costs","free","someone else's problem"], c:0, e:"When $30 equals three hours of work, you spend more thoughtfully."}
    ],
    "branching-car.html": [
      {q:"A new car loses about how much value in its first year?", a:["about 20%","nothing","it gains value"], c:0, e:"That fast drop is why a slightly used car is often the best value."},
      {q:"The true cost of a car includes...", a:["insurance, fuel, and maintenance too","only the sticker price","just the down payment"], c:0, e:"Owning a car costs far more than the purchase price."},
      {q:"A good guideline is to keep all car costs under about...", a:["15 to 20% of take-home pay","80% of your pay","all of your pay"], c:0, e:"Keeping cars affordable leaves room to save and live."}
    ],
    "taking-family.html": [
      {q:"The healthiest approach to money in a relationship is to...", a:["talk about it openly","avoid the topic","hide accounts"], c:0, e:"Openness prevents most money conflict."},
      {q:"A common way couples combine finances is...", a:["a hybrid of joint and personal accounts","never sharing anything","one person controlling it secretly"], c:0, e:"Joint for shared costs plus personal accounts is popular and flexible."},
      {q:"When incomes differ, splitting shared costs...", a:["by proportion of income often feels fairer","must always be 50/50","should be hidden"], c:0, e:"Proportional splitting keeps it fair when earnings differ."}
    ],
    "canopy-healthcare.html": [
      {q:"Medicare begins at age...", a:["65","40","80"], c:0, e:"Medicare starts at 65, but it does not cover everything."},
      {q:"Long-term care is...", a:["expensive and rarely covered by Medicare","fully free","covered by every plan"], c:0, e:"That gap is exactly why it is worth planning for."},
      {q:"An HSA is valuable because it is...", a:["triple tax-advantaged for medical costs","a type of loan","only for the wealthy"], c:0, e:"Deductible in, tax-free growth, and tax-free out for medical costs."}
    ],
    "first-roots-giving.html": [
      {q:"Giving some of your money means...", a:["helping others","losing it forever","it disappears"], c:0, e:"Giving helps someone else, and it often feels good too."},
      {q:"A good way to give is to...", a:["keep a give jar and pick a cause you care about","give away everything you own","never give"], c:0, e:"A give jar plus a cause you care about makes giving a habit."},
      {q:"Besides money, you can also give your...", a:["time by helping","password","homework"], c:0, e:"Helping others with your time is a kind of giving too."}
    ],
    "growing-spending.html": [
      {q:"Advertising is designed to...", a:["make you feel you need something","help you save money","only tell the truth"], c:0, e:"Ads exist to sell, so they make wants feel like needs."},
      {q:"A smart-spending habit is to...", a:["wait a day or two before buying","buy the first thing you see","ignore the price"], c:0, e:"A short wait lets fake wants fade."},
      {q:"The popular brand is...", a:["always the best buy","not always the better value","free"], c:1, e:"Hype is not the same as value; compare before you buy."}
    ],
    "growing-safety.html": [
      {q:"A message saying you won a prize and asking for payment is...", a:["probably a scam","always real","a great deal"], c:0, e:"Prizes that ask you to pay first are a classic scam."},
      {q:"Real companies will never ask for your...", a:["password","first name","favorite color"], c:0, e:"Never share a password; real companies do not ask for it."},
      {q:"Scams usually work by creating...", a:["rush and excitement","calm and patience","boredom"], c:0, e:"Slowing down is your best protection."}
    ],
    "taking-emergency.html": [
      {q:"An emergency fund is best kept...", a:["invested in risky stocks","in an accessible high-yield savings account","spent right away"], c:1, e:"It should be safe and easy to reach, not invested."},
      {q:"A common target is...", a:["3 to 6 months of essential expenses","one day of expenses","ten years of income"], c:0, e:"Three to six months of essentials is the usual goal."},
      {q:"The main job of an emergency fund is to...", a:["earn the highest return","keep a surprise from becoming debt","impress people"], c:1, e:"It protects your plan when life throws a curveball."}
    ],
    "taking-taxes.html": [
      {q:"With marginal tax brackets, a raise...", a:["never lowers your take-home pay","cuts your whole paycheck","is taxed at 100 percent"], c:0, e:"Only the income within a higher bracket is taxed more."},
      {q:"A tax credit...", a:["reduces your tax bill dollar for dollar","is the same as a deduction","raises your taxes"], c:0, e:"Credits are more powerful than deductions of the same size."},
      {q:"A very large refund usually means you...", a:["over-withheld during the year","won a prize","paid too little"], c:0, e:"A big refund is an interest-free loan you gave the government."}
    ],
    "canopy-teaching.html": [
      {q:"Kids learn about money mostly by...", a:["watching and doing","one big talk","ignoring it"], c:0, e:"Small lessons over years beat a single lecture."},
      {q:"A good approach is to let children...", a:["earn, choose, and make small mistakes","never touch money","only inherit it"], c:0, e:"Low-stakes practice builds real skill."},
      {q:"The most valuable financial gift to a child is...", a:["the ability to handle money","a large lump sum","a credit card"], c:0, e:"Capability lasts; a lump sum without it often does not."}
    ],
    "canopy-heirs.html": [
      {q:"Preparing heirs means preparing...", a:["the people, not just the assets","only the paperwork","only the taxes"], c:0, e:"Prepared people are what preserve wealth."},
      {q:"Family wealth is most often lost because...", a:["heirs were not prepared","the will was too long","of one bad year"], c:0, e:"It is usually about readiness, not the plan itself."},
      {q:"A good step is to...", a:["introduce heirs to your advisors gradually","keep everything secret","never discuss money"], c:0, e:"Early, gradual involvement builds trust and skill."}
    ],
    "canopy-giving.html": [
      {q:"A tax-smart way to give is to donate...", a:["appreciated investments instead of cash","only pennies","borrowed money"], c:0, e:"Gifting appreciated stock avoids capital-gains tax."},
      {q:"A donor-advised fund lets you...", a:["contribute now and grant to charities over time","avoid all giving","spend it on yourself"], c:0, e:"You deduct now and give out over time."},
      {q:"Involving kids in giving decisions helps...", a:["pass on values","hide money","raise taxes"], c:0, e:"Giving together is a powerful way to teach values."}
    ],
    "first-roots-earning.html": [
      {q:"How do most people get money?", a:["It grows on trees","They earn it by doing work","They find it on the ground"], c:1, e:"Money comes from effort — doing something useful and being paid for it."},
      {q:"You did your chores and earned two dollars. What is a good first thing to do?", a:["Spend it all right away without thinking","Stop and think about whether to save or spend it","Throw it away"], c:1, e:"Even little kids can pause and choose. Choosing on purpose is the whole lesson."},
      {q:"Earning money teaches us that money comes from...", a:["luck","effort and work","nowhere"], c:1, e:"When money is tied to effort, it never feels like it just appears."}
    ],
    "first-roots-saving.html": [
      {q:"Saving means...", a:["spending money right away","setting money aside for later","giving all your money away"], c:1, e:"Saving is patience made visible — money kept for something bigger, later."},
      {q:"Why is a clear jar helpful for saving?", a:["So you can watch your money grow toward the goal","To hide the money","Because jars look pretty"], c:0, e:"Seeing the pile grow keeps a young saver motivated."},
      {q:"You want a ten-dollar toy and you have six dollars. What helps you get it?", a:["Give up","Keep saving a little more","Nothing can help"], c:1, e:"A little more saving, and a little patience, gets you there."}
    ],
    "first-roots-needs.html": [
      {q:"Which of these is a NEED?", a:["Candy","A warm coat in winter","A new toy"], c:1, e:"Needs are things we must have to live and stay safe, like food, shelter, and warm clothes."},
      {q:"Which of these is a WANT?", a:["Water","Food","A video game"], c:2, e:"Wants are nice to have, but we can live without them."},
      {q:"Knowing needs from wants helps you...", a:["spend on purpose instead of by accident","never buy anything fun","spend all your money"], c:0, e:"It turns spending into a choice rather than a reflex."}
    ],
    "growing-budget.html": [
      {q:"A budget is...", a:["a plan for your money before you spend it","a type of bank","a kind of loan"], c:0, e:"A plan made before the money arrives keeps you in control of it."},
      {q:"A common way to split money is spend, save, and...", a:["give","hide","lose"], c:0, e:"Spend, save, and give — the give jar builds generosity early."},
      {q:"Why decide your split before the money arrives?", a:["So you never wonder where it all went","To make spending harder","There is no reason"], c:0, e:"Plan first, and there is no puzzled feeling later about where it went."}
    ],
    "growing-goal.html": [
      {q:"A good savings goal is...", a:["vague and far away","specific, with an amount and a timeline","impossible"], c:1, e:"Specific goals with a number and a deadline are the ones you actually reach."},
      {q:"If you save ten dollars a week toward a sixty-dollar goal, it takes about...", a:["6 weeks","60 weeks","1 week"], c:0, e:"Sixty divided by ten is six weeks — the price divided by your weekly amount."},
      {q:"Breaking a goal into weekly amounts makes it feel...", a:["impossible","like a countdown you control","more confusing"], c:1, e:"A distant wish becomes a countdown you can see yourself finishing."}
    ],
    "growing-banks.html": [
      {q:"Interest is...", a:["money the bank pays you for keeping savings there","a fee for using a jar","a type of coin"], c:0, e:"The bank pays you a small amount for holding your savings."},
      {q:"What makes savings grow faster over time?", a:["Earning interest on your interest too","Spending it","Hiding it"], c:0, e:"Earning interest on past interest is the snowball that builds real wealth."},
      {q:"Compared with cash in a drawer, a bank is...", a:["less safe","safer","exactly the same"], c:1, e:"A bank keeps your money far safer than a drawer at home."}
    ],
    "branching-paycheck.html": [
      {q:"Gross pay is...", a:["what you take home","what you earned before anything is taken out","your yearly bonus"], c:1, e:"Gross is the full amount earned, before taxes and deductions."},
      {q:"Net pay, or take-home pay, is...", a:["the amount before taxes","what actually reaches your account after deductions","the same as gross pay"], c:1, e:"Net pay is what lands in your account once taxes and deductions come out."},
      {q:"The form that tells your employer how much tax to withhold is the...", a:["W-4","1099","receipt"], c:0, e:"You fill out a W-4 when you start a job to set your withholding."}
    ],
    "branching-credit.html": [
      {q:"APR tells you...", a:["how much borrowing costs per year","your bank balance","your shoe size"], c:0, e:"APR is the yearly cost of borrowing — higher APR means costlier debt."},
      {q:"On your first credit card, the safest habit is to...", a:["pay the full balance every month","pay only the minimum","skip payments"], c:0, e:"Paying in full builds credit history for free and avoids interest."},
      {q:"A good credit score can help you...", a:["rent an apartment and get better loan rates","avoid all taxes","earn a paycheck"], c:0, e:"Reliable repayment history makes borrowing and renting easier and cheaper."}
    ],
    "branching-accounts.html": [
      {q:"A debit card spends...", a:["borrowed money","money you already have","the bank's money"], c:1, e:"Debit spends your own money; credit borrows it."},
      {q:"A high-yield savings account is good because it...", a:["pays more interest for the same safety","is riskier","charges more fees"], c:0, e:"Same safety, more interest — a simple upgrade over a standard account."},
      {q:"When choosing a bank account, look for...", a:["high monthly fees","no monthly fee and no minimum balance","hidden charges"], c:1, e:"Avoiding fees keeps more of your money working for you."}
    ],
    "branching-aid.html": [
      {q:"What is the single most important form for college aid?", a:["The FAFSA","A credit card application","A lease"], c:0, e:"The FAFSA is free and unlocks grants, work-study, and federal loans."},
      {q:"Which money is best to use first?", a:["Private loans","Grants and scholarships","Credit cards"], c:1, e:"Grants and scholarships are free money you never repay \u2014 chase those first."},
      {q:"A good rule for borrowing is to keep total loans at or below...", a:["your first-year salary after graduating","ten times your salary","any amount offered"], c:0, e:"Staying at or below your expected first-year pay keeps repayment manageable."}
    ],
    "branching-apartment.html": [
      {q:"A common guideline is to keep rent at or below about...", a:["30% of your take-home pay","80% of your take-home pay","all of your pay"], c:0, e:"Keeping rent near 30% of take-home leaves room for everything else."},
      {q:"Moving in usually costs, all at once, about...", a:["nothing extra","two to three times the monthly rent","one dollar"], c:1, e:"Deposit plus first (and sometimes last) month add up fast."},
      {q:"Renters insurance is...", a:["a waste of money","usually cheap and protects your belongings","only for homeowners"], c:1, e:"It is inexpensive and covers your things plus some liability."}
    ],
    "branching-invest.html": [
      {q:"The biggest advantage in investing is usually...", a:["picking perfect stocks","starting young","getting lucky"], c:1, e:"Time lets compounding do the heavy lifting."},
      {q:"With earned income from a job, you can open a...", a:["Roth IRA","mortgage","car lease"], c:0, e:"A Roth IRA grows tax-free and is perfect for young earners."},
      {q:"To start investing simply, a good choice is a...", a:["single hot stock","low-cost index fund","lottery ticket"], c:1, e:"An index fund spreads your money across the whole market."}
    ],
    "taking-budget.html": [
      {q:"In the 50/30/20 rule, the 50% goes to...", a:["wants","needs","savings"], c:1, e:"Half to needs, 30% to wants, 20% to saving and extra debt payoff."},
      {q:"The single most effective budgeting move is to...", a:["automate saving on payday","check your balance daily","spend first, save what's left"], c:0, e:"Automating transfers before you can spend the money is what actually works."},
      {q:"Lifestyle creep means...", a:["spending quietly rises to match every raise","your rent shrinks over time","you save more automatically"], c:0, e:"When spending grows with income, higher pay never becomes higher wealth."}
    ],
    "taking-debt.html": [
      {q:"The debt to attack first is usually...", a:["the highest-interest debt","your mortgage","the newest debt"], c:0, e:"High-interest debt compounds against you fastest, so it goes first."},
      {q:"The avalanche method targets the...", a:["smallest balance first","highest interest rate first","debts in alphabetical order"], c:1, e:"Avalanche pays the highest rate first, which costs you the least overall."},
      {q:"Paying only the minimum on a credit card...", a:["clears it quickly","keeps you in debt for years","is always the best move"], c:1, e:"Minimums are designed to keep you paying interest for a long time."}
    ],
    "taking-investing.html": [
      {q:"Your biggest advantage when investing young is...", a:["time for compounding","picking perfect stocks","pure luck"], c:0, e:"Decades of compounding do the heavy lifting — time beats timing."},
      {q:"If your employer offers a 401(k) match, you should...", a:["contribute enough to get the full match","ignore it","opt out"], c:0, e:"A match is an immediate, guaranteed return you shouldn't leave behind."},
      {q:"A low-cost index fund...", a:["bets everything on one company","spreads money across the whole market","guarantees a profit"], c:1, e:"Index funds own a broad slice of the market, so no single failure sinks you."}
    ],
    "taking-housing.html": [
      {q:"Buying a home usually pays off if you'll stay for about...", a:["a few months","five or more years","one year"], c:1, e:"Staying long enough lets you outrun the big upfront costs of buying."},
      {q:"Besides the mortgage, owning a home also costs...", a:["nothing extra","property taxes, insurance, and maintenance","only utilities"], c:1, e:"The payment is just part of the picture — plan for the rest."},
      {q:"Renting is...", a:["always throwing money away","a reasonable choice that offers flexibility","never allowed"], c:1, e:"Renting buys flexibility and freedom from repairs — not wasted money."}
    ],
    "canopy-investing.html": [
      {q:"Diversifying means...", a:["putting everything in one stock","spreading across many investments","avoiding investing entirely"], c:1, e:"Spreading out means no single investment can sink you."},
      {q:"The biggest permanent losses often come from...", a:["panic-selling during downturns","staying invested","rebalancing occasionally"], c:0, e:"Selling in a panic locks in losses at the worst possible time."},
      {q:"Over decades, investment fees...", a:["don't really matter","compound and can cost a great deal","help your returns"], c:1, e:"Small percentages compound into large sums over long periods."}
    ],
    "canopy-insurance.html": [
      {q:"An emergency fund should hold roughly...", a:["one day of expenses","several months of essential expenses","nothing at all"], c:1, e:"A few months of essentials keeps a surprise from becoming a crisis."},
      {q:"Life insurance becomes essential when...", a:["no one depends on you","other people depend on your income","you retire"], c:1, e:"Once others rely on your earnings, life insurance protects them."},
      {q:"Umbrella liability insurance is...", a:["expensive and useless","inexpensive extra protection as assets grow","only for cars"], c:1, e:"It's low-cost coverage that shields your net worth from a big lawsuit."}
    ],
    "canopy-estate.html": [
      {q:"Beneficiary designations on your accounts...", a:["override what your will says","don't matter","are illegal"], c:0, e:"Beneficiaries take priority over a will, so keep them current."},
      {q:"A will lets you name...", a:["your favorite color","who raises your children and who receives what","your salary"], c:1, e:"A will directs your belongings and names guardians for children."},
      {q:"Family wealth is most often lost because...", a:["heirs weren't prepared","the planning was wrong","of taxes alone"], c:0, e:"Preparing the people matters even more than preparing the documents."}
    ]
  };

  function injectCSS(){
    if(document.getElementById('ft-quiz-css')) return;
    var s=document.createElement('style'); s.id='ft-quiz-css';
    s.textContent =
      '.ft-quiz{margin-top:24px;padding:20px 22px;border:1px solid var(--line);border-radius:14px;background:#fff;}' +
      '.ftq{margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid var(--sand);}' +
      '.ftq:last-of-type{border-bottom:0;margin-bottom:8px;}' +
      '.ftq-opt{display:block;width:100%;text-align:left;padding:10px 14px;margin:6px 0;border:1px solid var(--line);border-radius:10px;background:var(--paper);font-family:var(--sans);font-size:14px;color:var(--ink);cursor:pointer;}' +
      '.ftq-opt:hover:not(:disabled){border-color:var(--moss);}' +
      '.ftq-opt.correct{background:#EAF1E3;border-color:var(--sprout);color:var(--forest);font-weight:600;}' +
      '.ftq-opt.wrong{background:#F7E7DF;border-color:var(--clay);color:#9a4a24;}' +
      '.ftq-exp{margin-top:8px;font-size:13px;color:var(--stone);background:var(--sand);border-radius:8px;padding:9px 12px;}' +
      '.ft-quiz-score{margin-top:8px;font-weight:600;color:var(--forest);font-size:14px;}';
    document.head.appendChild(s);
  }

  ready(function () {
    var quiz = QUIZZES[fname()];
    if(!quiz) return;
    var prose = document.querySelector('.prose');
    if(!prose || !prose.parentNode) return;
    injectCSS();

    var wrap = document.createElement('div');
    wrap.className = 'ft-quiz';
    var html = '<div class="eyebrow" style="margin-bottom:6px;">Quick check</div>' +
      '<h3 style="font-family:var(--serif);color:var(--forest);margin:0 0 14px;font-size:20px;">Test what you learned</h3>';
    quiz.forEach(function(item, qi){
      html += '<div class="ftq" data-c="' + item.c + '"><p style="font-weight:600;margin:0 0 8px;">' + (qi+1) + '. ' + item.q + '</p><div class="ftq-opts">';
      item.a.forEach(function(opt, oi){ html += '<button class="ftq-opt" data-i="' + oi + '">' + opt + '</button>'; });
      html += '</div><div class="ftq-exp" style="display:none;">' + item.e + '</div></div>';
    });
    html += '<div class="ft-quiz-score"></div>';
    wrap.innerHTML = html;
    prose.parentNode.insertBefore(wrap, prose.nextSibling);

    var total = quiz.length, answered = 0, correct = 0;
    var scoreEl = wrap.querySelector('.ft-quiz-score');
    wrap.querySelectorAll('.ftq').forEach(function(q){
      var c = parseInt(q.getAttribute('data-c'), 10);
      var opts = q.querySelectorAll('.ftq-opt');
      var exp = q.querySelector('.ftq-exp');
      opts.forEach(function(btn){
        btn.addEventListener('click', function(){
          if(q.getAttribute('data-done')) return;
          q.setAttribute('data-done','1');
          var i = parseInt(btn.getAttribute('data-i'), 10);
          answered++;
          if(i === c){ btn.classList.add('correct'); correct++; }
          else { btn.classList.add('wrong'); opts[c].classList.add('correct'); }
          opts.forEach(function(b){ b.disabled = true; });
          if(exp) exp.style.display = 'block';
          if(answered < total){ scoreEl.textContent = answered + ' of ' + total + ' answered · ' + correct + ' correct'; }
          else if(correct === total){ scoreEl.textContent = 'Perfect — ' + correct + ' of ' + total + ' correct!'; if(window.ftCelebrate) window.ftCelebrate('Perfect score!'); }
          else if(correct >= Math.ceil(total/2)){ scoreEl.textContent = 'Nice work — ' + correct + ' of ' + total + ' correct.'; }
          else { scoreEl.textContent = 'Good try — ' + correct + ' of ' + total + '. Give the lesson another read!'; }
        });
      });
    });
  });
})();

/* ---- The growing Family Tree (progress visual) ---- */
(function () {
  function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }
  function fname(){ return (location.pathname.split('/').pop() || 'index.html'); }
  function getDone(){ try{ var v=localStorage.getItem('familyTreeDone'); return v?JSON.parse(v):{}; }catch(e){ return {}; } }

  var STAGES = [
    {slug:'first-roots.html', name:'First Roots', lessons:['first-roots-earning.html','first-roots-saving.html','first-roots-needs.html','first-roots-giving.html']},
    {slug:'growing.html', name:'Growing', lessons:['growing-budget.html','growing-goal.html','growing-banks.html','growing-spending.html','growing-safety.html','growing-earning.html']},
    {slug:'branching-out.html', name:'Branching Out', lessons:['branching-paycheck.html','branching-credit.html','branching-accounts.html','branching-aid.html','branching-apartment.html','branching-invest.html','branching-car.html']},
    {slug:'taking-root.html', name:'Taking Root', lessons:['taking-budget.html','taking-debt.html','taking-investing.html','taking-housing.html','taking-emergency.html','taking-taxes.html','taking-family.html']},
    {slug:'canopy.html', name:'The Canopy', lessons:['canopy-investing.html','canopy-insurance.html','canopy-estate.html','canopy-teaching.html','canopy-heirs.html','canopy-giving.html','canopy-healthcare.html']}
  ];

  function op(f){ return (0.18 + 0.82 * f).toFixed(2); }
  function leaves(x, y, color){
    return '<ellipse cx="'+x+'" cy="'+y+'" rx="16" ry="13" fill="'+color+'"/>' +
           '<ellipse cx="'+(x-14)+'" cy="'+(y+6)+'" rx="12" ry="10" fill="'+color+'"/>' +
           '<ellipse cx="'+(x+12)+'" cy="'+(y+4)+'" rx="12" ry="10" fill="'+color+'"/>';
  }
  function buildTree(fr){
    var s = '<svg viewBox="0 0 400 430" width="100%" style="max-width:340px;display:block;margin:0 auto;" xmlns="http://www.w3.org/2000/svg">';
    s += '<ellipse cx="200" cy="349" rx="150" ry="13" fill="#EFEBDF"/>';
    // roots
    s += '<g opacity="'+op(fr[0])+'" fill="none" stroke="#6E4A2F" stroke-width="7" stroke-linecap="round">' +
         '<path d="M198,346 C190,374 168,384 150,410"/>' +
         '<path d="M202,346 C210,374 232,384 250,410"/>' +
         '<path d="M200,347 C200,378 200,392 200,414"/></g>';
    // trunk
    s += '<g opacity="'+op(fr[1])+'"><polygon points="190,348 196,208 204,208 210,348" fill="#6E4A2F"/></g>';
    // lower branches + leaves
    s += '<g opacity="'+op(fr[2])+'">' +
         '<path d="M200,300 C172,292 152,280 130,266" fill="none" stroke="#6E4A2F" stroke-width="7" stroke-linecap="round"/>' +
         '<path d="M200,300 C228,292 248,280 270,266" fill="none" stroke="#6E4A2F" stroke-width="7" stroke-linecap="round"/>' +
         leaves(122,258,'#8FB75B') + leaves(278,258,'#8FB75B') + '</g>';
    // upper branches + leaves
    s += '<g opacity="'+op(fr[3])+'">' +
         '<path d="M200,255 C178,246 162,236 144,224" fill="none" stroke="#6E4A2F" stroke-width="6" stroke-linecap="round"/>' +
         '<path d="M200,255 C222,246 238,236 256,224" fill="none" stroke="#6E4A2F" stroke-width="6" stroke-linecap="round"/>' +
         leaves(138,218,'#2F5D46') + leaves(262,218,'#2F5D46') + '</g>';
    // canopy
    s += '<g opacity="'+op(fr[4])+'">' +
         '<ellipse cx="200" cy="180" rx="46" ry="40" fill="#8FB75B"/>' +
         '<ellipse cx="168" cy="196" rx="30" ry="26" fill="#7CA84C"/>' +
         '<ellipse cx="232" cy="196" rx="30" ry="26" fill="#7CA84C"/>' +
         '<ellipse cx="184" cy="158" rx="26" ry="24" fill="#9BC06A"/>' +
         '<ellipse cx="216" cy="158" rx="26" ry="24" fill="#9BC06A"/></g>';
    s += '</svg>';
    return s;
  }
  function buildLegend(done){
    var total = 0, dn = 0, fr = [];
    STAGES.forEach(function(st){
      var d = 0; st.lessons.forEach(function(l){ if(done[l]) d++; });
      st._d = d; total += st.lessons.length; dn += d; fr.push(st.lessons.length ? d/st.lessons.length : 0);
    });
    var h = '<div style="display:flex;justify-content:space-between;font-size:13px;color:var(--stone);margin-bottom:6px;"><span>Your progress</span><span><span class="ft-count" data-n="' + dn + '">0</span> of ' + total + ' lessons</span></div>';
    h += '<div style="height:10px;background:var(--sand);border-radius:99px;overflow:hidden;"><div class="ft-treebar" data-w="' + (dn/total*100) + '" style="height:100%;width:0;background:var(--sprout);border-radius:99px;transition:width 1s cubic-bezier(.2,.8,.2,1);"></div></div>';
    STAGES.forEach(function(st){
      var full = st._d === st.lessons.length && st.lessons.length > 0;
      h += '<div style="display:flex;align-items:center;gap:9px;margin-top:9px;font-size:14px;">' +
           '<span style="width:11px;height:11px;border-radius:50%;background:' + (full ? 'var(--sprout)' : 'var(--dim)') + ';flex:none;"></span>' +
           '<a href="' + st.slug + '" style="color:var(--forest);text-decoration:none;flex:1;">' + st.name + '</a>' +
           '<span style="color:var(--stone);">' + st._d + '/' + st.lessons.length + (full ? ' \u2713' : '') + '</span></div>';
    });
    return { html: h, fr: fr, done: dn, total: total };
  }
  function band(heading){
    var done = getDone();
    var leg = buildLegend(done);
    var sec = document.createElement('section');
    sec.className = 'section';
    sec.style.background = 'linear-gradient(180deg,#F4F7EE,#FBFAF5)';
    sec.innerHTML = '<div class="inner">' +
      '<span class="eyebrow">Your Family Tree</span>' +
      '<h2 class="sec-title">' + heading + '</h2>' +
      '<p class="subhead" style="max-width:620px;">Complete lessons across the five stages and watch your tree grow — from first roots to full canopy.</p>' +
      '<div style="display:flex;flex-wrap:wrap;gap:28px;align-items:center;margin-top:20px;">' +
        '<div style="flex:1;min-width:260px;">' + buildTree(leg.fr) + '</div>' +
        '<div style="flex:1;min-width:240px;">' + leg.html +
          '<p style="margin-top:16px;"><a class="btn" href="start-here.html">Continue learning &rarr;</a></p>' +
        '</div>' +
      '</div></div>';
    return { el: sec, done: leg.done, total: leg.total };
  }
  function beforeFooter(el){
    var f = document.querySelector('.sitefoot') || document.querySelector('.bigfoot');
    if (f && f.parentNode) { f.parentNode.insertBefore(el, f); } else { document.body.appendChild(el); }
  }

  ready(function () {
    var path = fname();
    var doneCount = Object.keys(getDone()).filter(function(k){ return getDone()[k]; }).length;

    if (path === 'profile.html') {
      var heading = doneCount === 0 ? 'Plant your first seed.' : (doneCount >= 16 ? 'Fully grown — beautiful work.' : 'Your Family Tree is growing.');
      beforeFooter(band(heading).el);
    } else if ((path === '' || path === 'index.html') && doneCount >= 1) {
      var h2 = doneCount >= 16 ? 'Fully grown — beautiful work.' : 'Your Family Tree is growing.';
      beforeFooter(band(h2).el);
    }
  });
})();

/* ---- Stage add-ons: extra lessons + games injected onto stage pages ---- */
(function () {
  function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }
  function fname(){ return (location.pathname.split('/').pop() || 'index.html'); }
  function getDone(){ try{ var v=localStorage.getItem('familyTreeDone'); return v?JSON.parse(v):{}; }catch(e){ return {}; } }

  var NEW_LESSONS = {
    'first-roots.html': [
      ['first-roots-giving.html','Sharing and giving','Why giving feels good, and how to start.']
    ],
    'growing.html': [
      ['growing-earning.html','Earning money as a teen','Jobs, ventures, and thinking like an entrepreneur.'],
      ['growing-spending.html','Smart spending and ads','Spot the tricks that make you want to buy.'],
      ['growing-safety.html','Money online: apps and scams','Stay safe with money on screens.']
    ],
    'branching-out.html': [
      ['branching-aid.html','Paying for college: aid, FAFSA & loans','FAFSA, grants, and how to borrow smart.'],
      ['branching-apartment.html','Your first apartment','What you can afford, and the hidden upfront costs.'],
      ['branching-invest.html','Start investing early','The head start that is hard to catch up to.'],
      ['branching-car.html','Your first car','New vs used, and the true cost of owning one.']
    ],
    'taking-root.html': [
      ['taking-emergency.html','Building your emergency fund','The cushion that protects every other plan.'],
      ['taking-taxes.html','Understanding your taxes','Brackets, withholding, and the big myth.'],
      ['taking-family.html','Money and relationships','Combining finances, fairly and openly.']
    ],
    'canopy.html': [
      ['canopy-teaching.html','Teaching your kids about money','The highest-return gift you can give.'],
      ['canopy-heirs.html','Preparing your heirs','The other, often-missed half of estate planning.'],
      ['canopy-giving.html','Giving and philanthropy','Where wealth becomes meaning.'],
      ['canopy-healthcare.html','Healthcare and long-term care','Plan for later-life costs before they arrive.']
    ]
  };
  var GAMES = {
    'first-roots.html': [
      ['activity-needs-wants.html','Needs &amp; Wants game','Tap to sort needs from wants.'],
      ['activity-jars.html','Spend, Save, Give','Split 12 coins into three jars.']
    ],
    'growing.html': [
      ['activity-jars.html','Spend, Save, Give','Plan how to split your money.'],
      ['activity-grow.html','Watch your money grow','See how saving adds up over time.']
    ],
    'branching-out.html': [
      ['activity-credit.html','Build your credit','Make choices and watch your score move.'],
      ['activity-invest-early.html','Start early vs start late','See what a 10-year head start does.']
    ],
    'taking-root.html': [
      ['activity-first-month.html','Your first month on your own','Budget a real paycheck and see if it balances.']
    ]
  };

  function card(u, t, desc, doneMark){
    return '<a class="card" href="' + u + '" style="margin-bottom:8px;">' +
      '<div style="font-family:var(--serif);color:var(--forest);font-size:17px;">' + t + '</div>' +
      '<div class="muted" style="font-size:14px;margin-top:5px;">' + desc + '</div>' +
      (doneMark ? '<div style="color:var(--moss);font-weight:600;font-size:13px;margin-top:8px;">\u2713 Completed</div>' : '') +
      '</a>';
  }
  function section(cls, eyebrow, title, cardsHtml, footHtml){
    var sec = document.createElement('section');
    sec.className = 'section ' + cls;
    sec.innerHTML = '<div class="inner">' +
      '<span class="eyebrow">' + eyebrow + '</span>' +
      '<h2 class="sec-title">' + title + '</h2>' +
      '<div class="grid" style="margin-top:16px;">' + cardsHtml + '</div>' +
      (footHtml || '') + '</div>';
    return sec;
  }
  function afterLessons(el){
    var l = document.getElementById('lessons');
    var sec = l ? (l.closest('section') || l) : null;
    if (sec) { sec.insertAdjacentElement('afterend', el); }
    else {
      var f = document.querySelector('.sitefoot') || document.querySelector('.bigfoot');
      if (f && f.parentNode) f.parentNode.insertBefore(el, f); else document.body.appendChild(el);
    }
  }

  ready(function () {
    var path = fname();
    var done = getDone();
    if (GAMES[path]) {
      var g = GAMES[path].map(function(x){ return card(x[0], x[1], x[2], false); }).join('');
      afterLessons(section('band-paper', 'Play &amp; practice', 'Learn by doing', g,
        '<p class="muted" style="margin-top:12px;font-size:13px;">Great for doing together — perfect for younger learners.</p>'));
    }
    if (NEW_LESSONS[path]) {
      var cards = NEW_LESSONS[path].map(function(x){ return card(x[0], x[1], x[2], !!done[x[0]]); }).join('');
      afterLessons(section('band-sand', 'More in this stage', 'Keep going', cards,
        '<p style="margin-top:14px;"><a href="tools.html">Explore the calculators &rarr;</a></p>'));
    }
  });
})();

/* ---- Surface the retirement-check tool on the tools index ---- */
(function () {
  function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }
  function fname(){ return (location.pathname.split('/').pop() || 'index.html'); }
  ready(function () {
    if (fname() !== 'tools.html') return;
    if (document.getElementById('ft-retcheck')) return;
    var html = '<a class="card" href="retirement-check.html" id="ft-retcheck" style="margin-bottom:8px;">' +
      '<div style="font-family:var(--serif);color:var(--forest);font-size:17px;">Am I on track for retirement?</div>' +
      '<div class="muted" style="font-size:14px;margin-top:5px;">Benchmark your savings and see your next step.</div></a>';
    var grids = document.querySelectorAll('.grid');
    if (grids.length) { grids[grids.length - 1].insertAdjacentHTML('beforeend', html); }
    else {
      var sec = document.createElement('section'); sec.className = 'section band-sand';
      sec.innerHTML = '<div class="inner"><span class="eyebrow">New tool</span><h2 class="sec-title">Retirement readiness</h2><div class="grid" style="margin-top:16px;">' + html + '</div></div>';
      var f = document.querySelector('.sitefoot') || document.querySelector('.bigfoot');
      if (f && f.parentNode) f.parentNode.insertBefore(sec, f); else document.body.appendChild(sec);
    }
  });
})();

/* ---- Per-stage age-appropriate visual themes ---- */
(function () {
  function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }
  function fname(){ return (location.pathname.split('/').pop() || 'index.html'); }

  var THEME = {
    'ft-kids': ['first-roots.html','first-roots-earning.html','first-roots-saving.html','first-roots-needs.html','first-roots-giving.html','activity-needs-wants.html','activity-jars.html'],
    'ft-tween': ['growing.html','growing-budget.html','growing-goal.html','growing-banks.html','growing-spending.html','growing-safety.html','growing-earning.html','activity-grow.html'],
    'ft-young': ['branching-out.html','branching-paycheck.html','branching-credit.html','branching-accounts.html','branching-aid.html','branching-apartment.html','branching-invest.html','branching-car.html','activity-credit.html','activity-invest-early.html'],
    'ft-adult': ['taking-root.html','taking-budget.html','taking-debt.html','taking-investing.html','taking-housing.html','taking-emergency.html','taking-taxes.html','taking-family.html','activity-first-month.html'],
    'ft-pro': ['canopy.html','canopy-investing.html','canopy-insurance.html','canopy-estate.html','canopy-teaching.html','canopy-heirs.html','canopy-giving.html','canopy-healthcare.html']
  };
  function themeFor(f){
    for (var cls in THEME){ if (THEME[cls].indexOf(f) >= 0) return cls; }
    return null;
  }

  function injectCSS(){
    if (document.getElementById('ft-theme-css')) return;
    var s = document.createElement('style'); s.id = 'ft-theme-css';
    s.textContent = [
      /* ===== KIDS (First Roots) — super stimulating ===== */
      'body.ft-kids{background:#FFFDF5;}',
      'body.ft-kids .band-forest{background:linear-gradient(135deg,#12603f 0%,#2E8B57 50%,#7FB86A 100%);}',
      'body.ft-kids .display{font-size:clamp(34px,7vw,56px)!important;letter-spacing:-.01em;}',
      'body.ft-kids .subhead{font-size:19px;}',
      'body.ft-kids .eyebrow{color:#E8912F!important;font-size:14px;letter-spacing:.06em;font-weight:600;}',
      'body.ft-kids .sec-title{font-size:clamp(24px,4.6vw,36px);}',
      'body.ft-kids .btn,body.ft-kids .btn-lg{border-radius:999px!important;background:#F0873E!important;color:#fff!important;font-weight:700!important;box-shadow:0 6px 0 #cf6a26;transition:transform .1s,box-shadow .1s;}',
      'body.ft-kids .btn:hover,body.ft-kids .btn-lg:hover{transform:translateY(-2px);}',
      'body.ft-kids .btn:active,body.ft-kids .btn-lg:active{transform:translateY(3px);box-shadow:0 2px 0 #cf6a26;}',
      'body.ft-kids .btn-ghost{border-radius:999px!important;border-width:2px;}',
      'body.ft-kids .card,body.ft-kids .stage-card{border-radius:22px!important;border-width:2px;}',
      'body.ft-kids .card:hover,body.ft-kids .stage-card:hover{transform:translateY(-4px) rotate(-.5deg);}',
      'body.ft-kids .chip{border-radius:999px;font-weight:600;}',
      'body.ft-kids .ft-quiz{border-radius:22px;border-width:2px;}',
      'body.ft-kids .ftq-opt{border-radius:14px!important;font-size:16px;padding:14px!important;}',
      /* ===== TWEEN (Growing) — fun, energetic ===== */
      'body.ft-tween .band-forest{background:linear-gradient(135deg,#123529 0%,#2F5D46 55%,#3E8E7E 100%);}',
      'body.ft-tween .display{font-size:clamp(30px,6vw,48px);}',
      'body.ft-tween .eyebrow{color:#3E9E86!important;font-weight:600;letter-spacing:.06em;}',
      'body.ft-tween .btn,body.ft-tween .btn-lg{border-radius:14px!important;font-weight:600!important;}',
      'body.ft-tween .btn:hover,body.ft-tween .btn-lg:hover{transform:translateY(-2px);}',
      'body.ft-tween .card,body.ft-tween .stage-card{border-radius:16px!important;}',
      'body.ft-tween .card:hover,body.ft-tween .stage-card:hover{transform:translateY(-3px);}',
      /* ===== YOUNG (Branching Out) — bold, modern ===== */
      'body.ft-young .band-forest{background:linear-gradient(120deg,#0F2A22 0%,#123529 55%,#1f4d3a 100%);}',
      'body.ft-young .eyebrow{color:var(--sprout)!important;letter-spacing:.14em;text-transform:uppercase;font-size:12px;font-weight:600;}',
      'body.ft-young .display{font-weight:600;letter-spacing:-.015em;}',
      'body.ft-young .btn,body.ft-young .btn-lg{border-radius:10px!important;background:var(--sprout)!important;color:#12352b!important;font-weight:700!important;}',
      'body.ft-young .btn-ghost{border-radius:10px!important;}',
      'body.ft-young .card,body.ft-young .stage-card{border-radius:12px!important;}',
      'body.ft-young .card:hover,body.ft-young .stage-card:hover{transform:translateY(-3px);box-shadow:0 14px 30px rgba(15,42,34,.15);}',
      /* ===== ADULT (Taking Root) — clean, contemporary ===== */
      'body.ft-adult .band-forest{background:linear-gradient(120deg,#0F2A22 0%,#123529 100%);}',
      'body.ft-adult .eyebrow{color:var(--moss)!important;letter-spacing:.1em;}',
      'body.ft-adult .btn,body.ft-adult .btn-lg{border-radius:10px!important;background:var(--moss)!important;}',
      'body.ft-adult .btn-ghost{border-radius:10px!important;}',
      'body.ft-adult .card,body.ft-adult .stage-card{border-radius:12px!important;}',
      /* ===== PRO (The Canopy) — refined, professional ===== */
      'body.ft-pro .band-forest{background:#0F2A22;}',
      'body.ft-pro .eyebrow{color:var(--stone)!important;letter-spacing:.2em;text-transform:uppercase;font-size:11px;font-weight:600;}',
      'body.ft-pro .display{font-weight:500;letter-spacing:-.015em;}',
      'body.ft-pro .subhead{color:#3a463c;}',
      'body.ft-pro .sec-title{font-weight:500;}',
      'body.ft-pro .btn,body.ft-pro .btn-lg{border-radius:6px!important;background:var(--forest)!important;color:#fff!important;font-weight:600!important;}',
      'body.ft-pro .btn-ghost{border-radius:6px!important;}',
      'body.ft-pro .card,body.ft-pro .stage-card{border-radius:8px!important;}',
      'body.ft-pro .section{padding-top:80px;padding-bottom:80px;}'
    ].join('\n');
    document.head.appendChild(s);
  }

  (function apply(){
    var cls = themeFor(fname());
    if (!cls) return;
    injectCSS();
    function add(){ if (document.body) document.body.classList.add(cls); }
    if (document.body) add(); else document.addEventListener('DOMContentLoaded', add);
  })();
})();

/* ---- Tier 1: motion, count-ups, and celebration ---- */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }

  function injectCSS(){
    if (document.getElementById('ft-motion-css')) return;
    var s = document.createElement('style'); s.id = 'ft-motion-css';
    s.textContent = [
      '.ft-reveal{opacity:0;transform:translateY(18px);transition:opacity .6s ease,transform .6s ease;}',
      '.ft-reveal.in{opacity:1;transform:none;}',
      '.btn,.btn-lg,.btn-ghost{transition:transform .12s ease,box-shadow .15s ease,background .15s ease;}',
      'a.card{transition:transform .15s ease,box-shadow .15s ease;}',
      '.ft-toast{position:fixed;left:50%;bottom:28px;transform:translateX(-50%) translateY(20px);background:var(--forest);color:#fff;padding:12px 22px;border-radius:999px;font-family:var(--sans);font-weight:600;font-size:15px;box-shadow:0 12px 34px rgba(15,42,34,.28);opacity:0;transition:opacity .35s ease,transform .35s ease;z-index:10000;}',
      '.ft-toast.in{opacity:1;transform:translateX(-50%) translateY(0);}',
      '.ft-confetti{position:fixed;left:50%;top:42%;width:0;height:0;pointer-events:none;z-index:9999;}',
      '.ft-confetti span{position:absolute;left:0;top:0;width:9px;height:9px;border-radius:2px;opacity:0;animation:ftpop 1.4s cubic-bezier(.15,.7,.3,1) forwards;}',
      '@keyframes ftpop{0%{opacity:1;transform:translate(0,0) rotate(0);}70%{opacity:1;}100%{opacity:0;transform:translate(var(--dx),var(--dy)) rotate(400deg);}}',
      '@media (prefers-reduced-motion: reduce){.ft-reveal{opacity:1!important;transform:none!important;transition:none!important;}}'
    ].join('\n');
    document.head.appendChild(s);
  }

  function animateIn(scope){
    scope.querySelectorAll('.ft-count').forEach(function(el){
      if (el.getAttribute('data-anim')) return; el.setAttribute('data-anim','1');
      var n = +el.getAttribute('data-n') || 0;
      if (reduce || n === 0){ el.textContent = n; return; }
      var start = null, dur = 900;
      function tick(t){ if(!start) start=t; var p=Math.min(1,(t-start)/dur); el.textContent=Math.round(p*n); if(p<1) requestAnimationFrame(tick); }
      requestAnimationFrame(tick);
    });
    scope.querySelectorAll('.ft-treebar').forEach(function(el){
      if (el.getAttribute('data-anim')) return; el.setAttribute('data-anim','1');
      var w = (el.getAttribute('data-w') || 0) + '%';
      if (reduce){ el.style.width = w; return; }
      requestAnimationFrame(function(){ el.style.width = w; });
    });
  }

  function toast(msg){
    var t = document.createElement('div'); t.className = 'ft-toast'; t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(function(){ t.classList.add('in'); });
    setTimeout(function(){ t.classList.remove('in'); setTimeout(function(){ t.remove(); }, 400); }, 3000);
  }
  function confetti(){
    var colors = ['#8FB75B','#2F5D46','#C96F3F','#F0B44A','#3E9E86','#7CA84C'];
    var c = document.createElement('div'); c.className = 'ft-confetti';
    for (var i=0;i<44;i++){
      var p = document.createElement('span');
      p.style.background = colors[i % colors.length];
      var ang = Math.random()*Math.PI*2, dist = 90 + Math.random()*180;
      p.style.setProperty('--dx', (Math.cos(ang)*dist).toFixed(0)+'px');
      p.style.setProperty('--dy', (Math.sin(ang)*dist - 120).toFixed(0)+'px');
      p.style.animationDelay = (Math.random()*0.12).toFixed(2)+'s';
      c.appendChild(p);
    }
    document.body.appendChild(c);
    setTimeout(function(){ c.remove(); }, 1700);
  }
  window.ftCelebrate = function(msg){ toast(msg || 'Nice!'); if(!reduce) confetti(); };

  ready(function () {
    injectCSS();
    var reveals = Array.prototype.slice.call(document.querySelectorAll('.section > .inner'));
    if (reduce || !('IntersectionObserver' in window)) {
      reveals.forEach(function(el){ animateIn(el); });
      return;
    }
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ e.target.classList.add('in'); animateIn(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function(el){
      var r = el.getBoundingClientRect();
      if (r.top < vh - 40){ animateIn(el); return; }
      el.classList.add('ft-reveal');
      io.observe(el);
    });
  });
})();

/* ---- Tier 2: Sprout, the friendly guide ---- */
(function () {
  function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }
  function fname(){ return (location.pathname.split('/').pop() || 'index.html'); }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var STAGES = ['first-roots.html','growing.html','branching-out.html','taking-root.html','canopy.html'];

  function cuteSVG(){
    return '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M32 26 C32 19 32 17 32 14" stroke="#5f8f3e" stroke-width="3" stroke-linecap="round" fill="none"/>' +
      '<path d="M32 18 C36 15 40 17 39 22 C34 23 32 21 32 18 Z" fill="#8FB75B"/>' +
      '<ellipse cx="32" cy="42" rx="16" ry="17" fill="#7CA84C"/>' +
      '<path d="M18 43 C10 40 10 49 18 49 Z" fill="#5f8f3e"/>' +
      '<path d="M46 43 C54 40 54 49 46 49 Z" fill="#5f8f3e"/>' +
      '<ellipse cx="32" cy="46" rx="10" ry="10" fill="#8FB75B"/>' +
      '<circle cx="23" cy="45" r="2.4" fill="#E79A7A" opacity=".6"/>' +
      '<circle cx="41" cy="45" r="2.4" fill="#E79A7A" opacity=".6"/>' +
      '<circle cx="27" cy="40" r="3.2" fill="#1E241F"/><circle cx="37" cy="40" r="3.2" fill="#1E241F"/>' +
      '<circle cx="28.2" cy="39" r="1" fill="#fff"/><circle cx="38.2" cy="39" r="1" fill="#fff"/>' +
      '<path d="M28 46 Q32 50 36 46" stroke="#1E241F" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '</svg>';
  }
  function refinedSVG(){
    return '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style="color:var(--moss)">' +
      '<path d="M24 43C24 35 24 30 24 17" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M24 31C15 32 9.5 25.5 11 18C18.5 19 23 24.5 24 31Z" fill="currentColor"/>' +
      '<path d="M24 24C32.5 25 38.5 18.5 37 11C29.5 12 24.5 17.5 24 24Z" fill="currentColor"/>' +
      '<circle cx="24" cy="14" r="3.1" fill="currentColor"/></svg>';
  }

  function themeName(){
    var m = document.body.className.match(/ft-(kids|tween|young|adult|pro)/);
    return m ? m[1] : null;
  }
  function shouldShow(){
    var f = fname();
    return !!themeName() || f === '' || f === 'index.html' || f === 'profile.html';
  }

  function greeting(){
    var f = fname(), th = themeName();
    if (f === '' || f === 'index.html') return "Hi, I'm <b>Sprout</b>! I help your whole family grow money-smart. Build a profile to begin.";
    if (f === 'profile.html') return "This is your <b>Family Tree</b>. Finish lessons and watch it grow \u2014 I'll cheer you on!";
    if (f.indexOf('activity-') === 0) return "Have fun \u2014 money can be a game! Give it a try.";
    if (STAGES.indexOf(f) >= 0) {
      if (th === 'kids') return "Yay! Tap a lesson and let's learn about money together.";
      if (th === 'pro') return "Welcome. Lessons on investing, protection, and legacy are ready when you are.";
      return "Pick a lesson to start \u2014 every one grows your tree.";
    }
    // lesson pages
    if (th === 'kids' || th === 'tween') return "Great pick! Read along, then try the Quick Check at the end.";
    if (th === 'pro') return "Take your time \u2014 the Quick Check is here whenever you're ready.";
    return "Nice choice. Read on, then test yourself with the Quick Check.";
  }
  var TIPS = [
    "Saving a little, often, beats saving a lot once.",
    "Money invested young has the most time to grow.",
    "Every lesson you finish grows your tree a bit more.",
    "Needs come first. Wants can wait \u2014 and that's okay!",
    "Giving a little is one of the happiest things money does."
  ];
  var CHEERS = ["Woohoo! Your tree just grew!", "Amazing \u2014 keep going!", "Look at you go! Another one done."];

  function injectCSS(){
    if (document.getElementById('ft-sprout-css')) return;
    var s = document.createElement('style'); s.id = 'ft-sprout-css';
    s.textContent = [
      '#ft-sprout{position:fixed;right:18px;bottom:18px;z-index:9998;}',
      '#ft-sprout.hidden{display:none;}',
      '.ft-sprout-btn{width:60px;height:60px;border:none;background:#fff;border-radius:50%;box-shadow:0 8px 24px rgba(15,42,34,.22);cursor:pointer;padding:7px;position:relative;}',
      '.ft-sprout-btn svg{width:100%;height:100%;display:block;}',
      '.ft-sprout-bubble{position:absolute;right:72px;bottom:6px;width:230px;background:#fff;border:1px solid var(--line);border-radius:16px 16px 4px 16px;padding:12px 14px;font-family:var(--sans);font-size:14px;color:var(--ink);line-height:1.45;box-shadow:0 12px 32px rgba(15,42,34,.18);opacity:0;transform:translateY(8px) scale(.96);transform-origin:bottom right;transition:opacity .3s ease,transform .3s ease;pointer-events:none;}',
      '.ft-sprout-bubble.in{opacity:1;transform:none;pointer-events:auto;}',
      '.ft-sprout-bubble b{color:var(--forest);}',
      '.ft-sprout-x{position:absolute;top:-7px;right:-7px;width:22px;height:22px;border-radius:50%;background:var(--stone);color:#fff;border:none;font-size:13px;line-height:20px;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,.2);padding:0;}',
      '@keyframes ftbob{0%,100%{transform:translateY(0);}50%{transform:translateY(-5px);}}',
      '@keyframes ftjump{0%{transform:translateY(0);}30%{transform:translateY(-16px);}55%{transform:translateY(0);}72%{transform:translateY(-7px);}100%{transform:translateY(0);}}',
      '.ft-sprout-btn{animation:ftbob 3s ease-in-out infinite;}',
      'body.ft-kids .ft-sprout-btn{animation:ftbob 1.7s ease-in-out infinite;}',
      'body.ft-tween .ft-sprout-btn{animation:ftbob 2.2s ease-in-out infinite;}',
      'body.ft-pro .ft-sprout-btn,body.ft-adult .ft-sprout-btn{animation:none;}',
      '.ft-sprout-btn.jump{animation:ftjump .7s ease;}',
      '@media (max-width:560px){.ft-sprout-bubble{width:180px;}}',
      '@media (prefers-reduced-motion: reduce){.ft-sprout-btn{animation:none!important;}}'
    ].join('\n');
    document.head.appendChild(s);
  }

  ready(function () {
    if (!shouldShow()) return;
    try { if (sessionStorage.getItem('ftSproutOff')) return; } catch(e){}
    injectCSS();

    var refined = /ft-(adult|pro)/.test(document.body.className);
    var wrap = document.createElement('div'); wrap.id = 'ft-sprout';
    wrap.innerHTML =
      '<div class="ft-sprout-bubble" id="ft-sprout-bubble"></div>' +
      '<button class="ft-sprout-btn" id="ft-sprout-btn" aria-label="Sprout, your guide">' + (refined ? refinedSVG() : cuteSVG()) + '</button>' +
      '<button class="ft-sprout-x" id="ft-sprout-x" aria-label="Hide Sprout">\u00D7</button>';
    document.body.appendChild(wrap);

    var bubble = document.getElementById('ft-sprout-bubble');
    var btn = document.getElementById('ft-sprout-btn');
    var hideTimer = null;
    function showBubble(html, ms){
      bubble.innerHTML = html; bubble.classList.add('in');
      if (hideTimer) clearTimeout(hideTimer);
      if (ms) hideTimer = setTimeout(function(){ bubble.classList.remove('in'); }, ms);
    }
    function jump(){ if(reduce) return; btn.classList.remove('jump'); void btn.offsetWidth; btn.classList.add('jump'); }

    var tipI = 0;
    btn.addEventListener('click', function(){
      showBubble(TIPS[tipI % TIPS.length], 6000); tipI++; jump();
    });
    document.getElementById('ft-sprout-x').addEventListener('click', function(){
      wrap.classList.add('hidden');
      try { sessionStorage.setItem('ftSproutOff','1'); } catch(e){}
    });

    // greet shortly after load
    setTimeout(function(){ showBubble(greeting(), 7000); }, 700);

    // react to celebrations
    var prev = window.ftCelebrate;
    window.ftCelebrate = function(msg){
      if (prev) prev(msg);
      if (wrap.classList.contains('hidden')) return;
      jump();
      showBubble(CHEERS[Math.floor(Math.random()*CHEERS.length)], 4000);
    };
  });
})();

/* ---- Tier 3: gamification — levels, streaks, badges, sharing ---- */
(function () {
  function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }
  function fname(){ return (location.pathname.split('/').pop() || 'index.html'); }
  function getDone(){ try{ var v=localStorage.getItem('familyTreeDone'); return v?JSON.parse(v):{}; }catch(e){ return {}; } }
  function getJSON(k,d){ try{ var v=localStorage.getItem(k); return v?JSON.parse(v):d; }catch(e){ return d; } }
  function setJSON(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} }

  var STAGES = [
    {key:'first-roots', name:'First Roots', lessons:['first-roots-earning.html','first-roots-saving.html','first-roots-needs.html','first-roots-giving.html']},
    {key:'growing', name:'Growing', lessons:['growing-budget.html','growing-goal.html','growing-banks.html','growing-spending.html','growing-safety.html','growing-earning.html']},
    {key:'branching-out', name:'Branching Out', lessons:['branching-paycheck.html','branching-credit.html','branching-accounts.html','branching-aid.html','branching-apartment.html','branching-invest.html','branching-car.html']},
    {key:'taking-root', name:'Taking Root', lessons:['taking-budget.html','taking-debt.html','taking-investing.html','taking-housing.html','taking-emergency.html','taking-taxes.html','taking-family.html']},
    {key:'canopy', name:'The Canopy', lessons:['canopy-investing.html','canopy-insurance.html','canopy-estate.html','canopy-teaching.html','canopy-heirs.html','canopy-giving.html','canopy-healthcare.html']}
  ];
  var TOTAL = STAGES.reduce(function(a,s){ return a + s.lessons.length; }, 0);

  function state(){
    var done = getDone(), dc = 0;
    STAGES.forEach(function(s){ s._d = s.lessons.filter(function(l){ return done[l]; }).length; dc += s._d; });
    return { done: dc, total: TOTAL };
  }
  function stageDone(key){ for (var i=0;i<STAGES.length;i++){ if(STAGES[i].key===key) return STAGES[i]._d===STAGES[i].lessons.length; } return false; }

  var LEVELS = [
    {min:0,name:'Seed'},{min:1,name:'Seedling'},{min:5,name:'Sprout'},
    {min:11,name:'Sapling'},{min:18,name:'Young Tree'},{min:25,name:'Mighty Tree'},{min:TOTAL,name:'Full Canopy'}
  ];
  function levelFor(done){
    var cur=LEVELS[0], idx=0;
    for (var i=0;i<LEVELS.length;i++){ if(done>=LEVELS[i].min){ cur=LEVELS[i]; idx=i; } }
    var next = LEVELS[idx+1] || null;
    return { cur:cur, next:next, idx:idx };
  }

  var BADGES = [
    {id:'first', name:'First Sprout', desc:'Finish your first lesson', test:function(s){ return s.done>=1; }},
    {id:'five', name:'Growing Strong', desc:'Finish five lessons', test:function(s){ return s.done>=5; }},
    {id:'half', name:'Halfway There', desc:'Finish half the lessons', test:function(s){ return s.done>=Math.ceil(s.total/2); }},
    {id:'all', name:'Money Master', desc:'Finish every lesson', test:function(s){ return s.done>=s.total; }},
    {id:'s0', name:'Rooted', desc:'Complete First Roots', test:function(){ return stageDone('first-roots'); }},
    {id:'s1', name:'Branching Up', desc:'Complete Growing', test:function(){ return stageDone('growing'); }},
    {id:'s2', name:'Out on a Limb', desc:'Complete Branching Out', test:function(){ return stageDone('branching-out'); }},
    {id:'s3', name:'Deeply Rooted', desc:'Complete Taking Root', test:function(){ return stageDone('taking-root'); }},
    {id:'s4', name:'Reached the Canopy', desc:'Complete The Canopy', test:function(){ return stageDone('canopy'); }}
  ];

  function dayNum(str){ var p=str.split('-'); return Math.floor(Date.UTC(+p[0],+p[1]-1,+p[2])/86400000); }
  function today(){ var d=new Date(); return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); }
  function updateStreak(){
    var s = getJSON('ftStreak', {last:'', count:0, best:0}), t = today();
    if (s.last === t) return s;
    var diff = s.last ? dayNum(t) - dayNum(s.last) : 999;
    s.count = (diff === 1) ? (s.count + 1) : 1;
    s.last = t; s.best = Math.max(s.best || 0, s.count);
    setJSON('ftStreak', s); return s;
  }
  function displayStreak(){
    var s = getJSON('ftStreak', {last:'', count:0, best:0});
    var cur = 0;
    if (s.last){ var diff = dayNum(today()) - dayNum(s.last); cur = (diff <= 1) ? s.count : 0; }
    return { cur:cur, best:s.best||0 };
  }

  function showTop(html){
    var t = document.createElement('div'); t.className = 'ft-top-toast'; t.innerHTML = html;
    document.body.appendChild(t);
    requestAnimationFrame(function(){ t.classList.add('in'); });
    setTimeout(function(){ t.classList.remove('in'); setTimeout(function(){ t.remove(); }, 400); }, 3600);
  }
  function checkBadges(){
    var s = state();
    var earned = BADGES.filter(function(b){ return b.test(s); }).map(function(b){ return b.id; });
    var storedRaw = null; try { storedRaw = localStorage.getItem('ftBadges'); } catch(e){}
    if (storedRaw === null){ setJSON('ftBadges', earned); return; } // seed silently, no retro spam
    var stored = getJSON('ftBadges', []);
    var fresh = earned.filter(function(id){ return stored.indexOf(id) < 0; });
    if (fresh.length){
      setJSON('ftBadges', earned);
      fresh.forEach(function(id, i){
        var b = BADGES.filter(function(x){ return x.id===id; })[0];
        setTimeout(function(){ showTop('<b>Badge unlocked:</b> ' + b.name); }, i*900);
      });
    }
  }

  function injectCSS(){
    if (document.getElementById('ft-game-css')) return;
    var s = document.createElement('style'); s.id = 'ft-game-css';
    s.textContent = [
      '.ft-top-toast{position:fixed;left:50%;top:22px;transform:translateX(-50%) translateY(-16px);background:var(--forest);color:#fff;padding:11px 20px;border-radius:999px;font-family:var(--sans);font-size:14.5px;box-shadow:0 12px 34px rgba(15,42,34,.28);opacity:0;transition:opacity .35s,transform .35s;z-index:10001;}',
      '.ft-top-toast.in{opacity:1;transform:translateX(-50%) translateY(0);}',
      '.ft-top-toast b{color:var(--sprout);}',
      '.ach-cards{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:18px;}',
      '@media (max-width:560px){.ach-cards{grid-template-columns:1fr;}}',
      '.ach-card{background:#fff;border:1px solid var(--line);border-radius:16px;padding:20px;}',
      '.ach-card .k{font-size:13px;color:var(--stone);text-transform:uppercase;letter-spacing:.08em;font-weight:600;}',
      '.ach-card .v{font-family:var(--serif);font-size:28px;color:var(--forest);margin-top:4px;}',
      '.ach-card .sub{font-size:13px;color:var(--stone);margin-top:4px;}',
      '.lvlbar{height:9px;background:var(--sand);border-radius:99px;overflow:hidden;margin-top:12px;}',
      '.lvlbar > div{height:100%;background:var(--sprout);border-radius:99px;transition:width 1s cubic-bezier(.2,.8,.2,1);}',
      '.badges{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:14px;margin-top:20px;}',
      '.badge{background:#fff;border:1px solid var(--line);border-radius:14px;padding:14px;text-align:center;}',
      '.badge .m{width:46px;height:46px;border-radius:50%;margin:0 auto 8px;display:flex;align-items:center;justify-content:center;}',
      '.badge.on .m{background:var(--sprout);}',
      '.badge.off .m{background:#E4E1D5;}',
      '.badge .m svg{width:24px;height:24px;}',
      '.badge.off{opacity:.72;}',
      '.badge .bn{font-family:var(--serif);color:var(--forest);font-size:15px;}',
      '.badge .bd{font-size:12px;color:var(--stone);margin-top:3px;}',
      '.badge .lk{font-size:11px;color:var(--stone);margin-top:4px;text-transform:uppercase;letter-spacing:.06em;}'
    ].join('\n');
    document.head.appendChild(s);
  }

  function checkSVG(color){ return '<svg viewBox="0 0 24 24"><path d="M5 12l4 4 10-10" stroke="' + color + '" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'; }

  function renderPanel(){
    injectCSS();
    var s = state(), lv = levelFor(s.done), st = displayStreak();
    var stored = getJSON('ftBadges', []);
    var nextTxt = lv.next ? ('Next: ' + lv.next.name + ' at ' + lv.next.min + ' lessons') : 'Top level reached';
    var pct = lv.next ? Math.min(100, (s.done - lv.cur.min) / (lv.next.min - lv.cur.min) * 100) : 100;

    var badgesHtml = BADGES.map(function(b){
      var on = stored.indexOf(b.id) >= 0 || b.test(s);
      return '<div class="badge ' + (on?'on':'off') + '"><div class="m">' + checkSVG(on?'#fff':'#B7B09A') + '</div>' +
        '<div class="bn">' + b.name + '</div><div class="bd">' + b.desc + '</div>' +
        (on ? '' : '<div class="lk">Locked</div>') + '</div>';
    }).join('');

    var sec = document.createElement('section');
    sec.className = 'section';
    sec.style.background = 'linear-gradient(180deg,#F4F7EE,#FBFAF5)';
    sec.innerHTML = '<div class="inner">' +
      '<span class="eyebrow">Achievements</span>' +
      '<h2 class="sec-title">Your rewards</h2>' +
      '<div class="ach-cards">' +
        '<div class="ach-card"><div class="k">Level</div><div class="v">' + lv.cur.name + '</div>' +
          '<div class="sub">' + s.done + ' of ' + s.total + ' lessons \u00B7 ' + nextTxt + '</div>' +
          '<div class="lvlbar"><div style="width:' + pct + '%"></div></div></div>' +
        '<div class="ach-card"><div class="k">Streak</div><div class="v">' + st.cur + (st.cur===1?' day':' days') + '</div>' +
          '<div class="sub">Longest: ' + st.best + (st.best===1?' day':' days') + ' \u00B7 learn something daily to keep it alive</div></div>' +
      '</div>' +
      '<div class="badges">' + badgesHtml + '</div>' +
      '<p style="margin-top:20px;"><button class="btn" id="ft-share">Share my progress</button></p>' +
      '</div>';

    var f = document.querySelector('.sitefoot') || document.querySelector('.bigfoot');
    if (f && f.parentNode) f.parentNode.insertBefore(sec, f); else document.body.appendChild(sec);

    var shareBtn = document.getElementById('ft-share');
    shareBtn.addEventListener('click', function(){
      var txt = "I'm growing my Family Tree! Level: " + lv.cur.name + " (" + s.done + "/" + s.total + " lessons). Financial learning for every stage of life.";
      var url = location.href.replace(/profile\.html.*$/, 'index.html');
      if (navigator.share){ navigator.share({ title:'My Family Tree', text:txt, url:url }).catch(function(){}); }
      else if (navigator.clipboard){ navigator.clipboard.writeText(txt + ' ' + url).then(function(){ showTop('Progress copied to clipboard'); }).catch(function(){ showTop(txt); }); }
      else { showTop('Share: ' + txt); }
    });
  }

  ready(function () {
    checkBadges();
    if (fname() === 'profile.html') renderPanel();
    var prev = window.ftCelebrate;
    window.ftCelebrate = function(msg){
      if (prev) prev(msg);
      updateStreak();
      checkBadges();
    };
  });
})();

/* ---- Tier 4: homepage feature band for the Money Journey ---- */
(function () {
  function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }
  function fname(){ return (location.pathname.split('/').pop() || 'index.html'); }
  ready(function () {
    var f = fname();
    if (f !== '' && f !== 'index.html') return;
    if (document.getElementById('ft-adv-band')) return;
    var sec = document.createElement('section');
    sec.className = 'section'; sec.id = 'ft-adv-band';
    sec.style.background = 'linear-gradient(120deg,#123529 0%,#2F5D46 55%,#C96F3F 130%)';
    sec.innerHTML = '<div class="inner" style="text-align:center;">' +
      '<span class="eyebrow" style="color:var(--sprout);">Try the interactive</span>' +
      '<h2 class="display" style="font-size:clamp(26px,5vw,42px);color:#fff;">Play Your Money Journey</h2>' +
      '<p class="subhead" style="color:#EAF1E3;max-width:600px;margin:8px auto 0;">Make life\u2019s big money choices from age 16 to 40 and see where you land. Three minutes, surprisingly revealing \u2014 and fun.</p>' +
      '<div class="cta-row" style="justify-content:center;margin-top:18px;"><a class="btn btn-lg" href="adventure.html">Start the journey \u2192</a><a class="btn-ghost btn-lg" href="games.html">All games</a></div>' +
      '</div>';
    var first = document.querySelector('section.section');
    if (first) first.insertAdjacentElement('afterend', sec);
    else {
      var f2 = document.querySelector('.sitefoot') || document.querySelector('.bigfoot');
      if (f2 && f2.parentNode) f2.parentNode.insertBefore(sec, f2); else document.body.appendChild(sec);
    }
  });
})();

/* ---- Tier 5a: visual polish (warmer scheme, depth, accents) ---- */
(function () {
  if (document.getElementById('ft-polish-css')) return;
  var css = [
    'body{background:#FBFAF5;}',
    '.band-paper{background:linear-gradient(180deg,#FDFCF8 0%,#F5F1E6 100%)!important;}',
    '.band-sand{background:linear-gradient(180deg,#F2EDDF 0%,#E9E1CF 100%)!important;}',
    '.band-forest{position:relative;overflow:hidden;}',
    '.band-forest>.inner{position:relative;z-index:1;}',
    '.band-forest::before{content:"";position:absolute;top:-30%;right:-12%;width:65%;height:160%;background:radial-gradient(closest-side,rgba(143,183,91,.16),transparent 70%);pointer-events:none;}',
    '.card,a.card{box-shadow:0 1px 2px rgba(15,42,34,.04),0 10px 26px rgba(15,42,34,.06);border-color:#E7E2D2;}',
    'a.card{transition:transform .15s ease,box-shadow .2s ease;}',
    'a.card:hover{box-shadow:0 6px 14px rgba(15,42,34,.09),0 20px 44px rgba(15,42,34,.13);}',
    '.sec-title{position:relative;}',
    '.sec-title::after{content:"";display:block;width:48px;height:4px;border-radius:2px;margin-top:14px;background:linear-gradient(90deg,var(--sprout),var(--clay));}',
    '.inner[style*="center"] .sec-title::after{margin-left:auto;margin-right:auto;}',
    'body.ft-pro .sec-title::after{background:var(--moss);width:40px;height:3px;}',
    '.prose a{color:var(--moss);text-underline-offset:2px;}',
    '.eyebrow{font-weight:600;}',
    '.sitefoot,.bigfoot{border-top:3px solid var(--sprout);}'
  ].join('\n');
  var s = document.createElement('style'); s.id = 'ft-polish-css'; s.textContent = css;
  (document.head || document.documentElement).appendChild(s);
})();

/* ---- Premium overhaul: typography, color depth, components ---- */
(function () {
  if (document.getElementById('ft-premium-css')) return;
  var css = [
    '.display,.hero2{font-weight:600!important;letter-spacing:-.02em;line-height:1.06;}',
    '.subhead{font-size:19px;line-height:1.6;}',
    '.sec-title{font-weight:600;letter-spacing:-.01em;position:relative;}',
    '.sec-title::after{content:"";display:block;width:50px;height:4px;border-radius:2px;margin-top:14px;background:linear-gradient(90deg,var(--sprout),var(--clay));}',
    '.inner[style*="center"] .sec-title::after{margin-left:auto;margin-right:auto;}',
    '.eyebrow{text-transform:uppercase;letter-spacing:.14em;font-weight:600;font-size:12px;}',
    '.prose{font-size:17px;line-height:1.72;}',
    '.prose h3{font-family:var(--serif);font-weight:600;color:var(--forest);font-size:21px;margin:30px 0 10px;letter-spacing:-.01em;}',
    '.prose p{margin:0 0 16px;}',
    '.prose li{margin-bottom:9px;line-height:1.6;}',
    '.prose strong{color:var(--forest);}',
    '.prose a{color:var(--moss);text-underline-offset:2px;}',
    '.btn,.btn-lg{font-family:var(--sans);font-weight:600;letter-spacing:.005em;border-radius:12px;box-shadow:0 4px 14px rgba(15,42,34,.16);transition:transform .14s ease,box-shadow .22s ease,filter .2s ease;}',
    '.btn-lg{padding:16px 30px;font-size:16px;}',
    '.btn:hover,.btn-lg:hover{transform:translateY(-2px);box-shadow:0 10px 26px rgba(15,42,34,.24);filter:brightness(1.06);}',
    '.btn:active,.btn-lg:active{transform:translateY(0);box-shadow:0 4px 12px rgba(15,42,34,.18);}',
    '.btn-ghost{border-radius:12px;font-weight:600;transition:transform .14s ease,background .2s,border-color .2s;}',
    '.btn-ghost:hover{transform:translateY(-2px);}',
    '.band-forest{background:linear-gradient(140deg,#0F2A22 0%,#143A2C 62%,#1b4835 100%)!important;position:relative;overflow:hidden;}',
    '.band-forest>.inner{position:relative;z-index:1;}',
    '.band-forest::before{content:"";position:absolute;top:-35%;right:-14%;width:70%;height:170%;background:radial-gradient(closest-side,rgba(143,183,91,.18),transparent 70%);pointer-events:none;}',
    '.band-sprout{background:linear-gradient(140deg,#93BC60,#79A548)!important;}',
    '.band-paper{background:linear-gradient(180deg,#FDFCF8,#F4F0E4)!important;}',
    '.band-sand{background:linear-gradient(180deg,#F2EDDF,#E7DFCC)!important;}',
    '.card,a.card{border-radius:16px;border:1px solid #E7E2D2;box-shadow:0 1px 3px rgba(15,42,34,.05),0 14px 32px rgba(15,42,34,.07);}',
    'a.card{transition:transform .16s ease,box-shadow .22s ease;}',
    'a.card:hover{transform:translateY(-4px);box-shadow:0 10px 20px rgba(15,42,34,.10),0 26px 52px rgba(15,42,34,.15);}',
    '.nav{box-shadow:0 2px 14px rgba(15,42,34,.18);}',
    '.section{padding-top:76px;padding-bottom:76px;}',
    '.section.tight{padding-top:44px;padding-bottom:44px;}',
    'input,select,textarea{border-radius:10px!important;}',
    'input:focus,select:focus,textarea:focus{outline:2px solid var(--sprout);}'
  ].join('\n');
  var s = document.createElement('style'); s.id = 'ft-premium-css'; s.textContent = css;
  (document.head || document.documentElement).appendChild(s);
})();
/* ---- Slick UI: pill buttons + persistent header CTA (goodshire-inspired) ---- */
(function () {
  function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }
  function fname(){ return (location.pathname.split('/').pop() || 'index.html'); }
  if (!document.getElementById('ft-slick-css')) {
    var css = [
      '.btn,.btn-lg,.btn-ghost{border-radius:999px!important;font-weight:600;letter-spacing:.01em;}',
      '.btn,.btn-lg{box-shadow:0 6px 18px rgba(15,42,34,.18);transition:transform .16s cubic-bezier(.34,1.4,.5,1),box-shadow .2s ease,filter .2s ease;}',
      '.btn:hover,.btn-lg:hover{transform:translateY(-2px) scale(1.02);box-shadow:0 12px 28px rgba(15,42,34,.26);filter:brightness(1.05);}',
      '.btn:active,.btn-lg:active{transform:translateY(0) scale(.99);}',
      '.btn-lg{padding:16px 32px!important;font-size:16px;}',
      '.btn-ghost{border-width:1.5px;transition:transform .16s ease,background .2s ease,border-color .2s ease;}',
      '.btn-ghost:hover{transform:translateY(-2px);background:rgba(255,255,255,.12);}',
      '.ft-hcta{margin-left:auto;display:inline-flex;align-items:center;gap:6px;background:var(--sprout);color:#12352b!important;font-family:var(--sans);font-weight:700;font-size:14px;padding:9px 18px;border-radius:999px;text-decoration:none;box-shadow:0 4px 14px rgba(143,183,91,.4);transition:transform .15s ease,box-shadow .2s ease,filter .2s ease;white-space:nowrap;}',
      '.ft-hcta:hover{transform:translateY(-1px) scale(1.03);box-shadow:0 8px 20px rgba(143,183,91,.55);filter:brightness(1.04);color:#12352b!important;}',
      '@media(max-width:520px){.ft-hcta{font-size:13px;padding:8px 14px;}}'
    ].join('\n');
    var s = document.createElement('style'); s.id = 'ft-slick-css'; s.textContent = css;
    (document.head || document.documentElement).appendChild(s);
  }
  ready(function () {
    var f = fname();
    if (f === 'profile.html') return;
    if (document.querySelector('.ft-hcta')) return;
    var bar = document.querySelector('.topbar .bar') || document.querySelector('.topbar');
    if (!bar) return;
    var a = document.createElement('a');
    a.className = 'ft-hcta'; a.href = 'profile.html'; a.textContent = 'Build your profile';
    bar.appendChild(a);
  });
})();
/* ---- Brand A (Heritage Oak): forest + brass gold + ivory; and mobile bottom CTA ---- */
(function () {
  function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }
  function fname(){ return (location.pathname.split('/').pop() || 'index.html'); }
  if (!document.getElementById('ft-brandA-css')) {
    var css = [
      'body{background:#F6F1E6!important;}',
      '.band-paper{background:linear-gradient(180deg,#FBF7EC,#F3ECDB)!important;}',
      '.band-sand{background:linear-gradient(180deg,#F0E8D5,#E6DDC4)!important;}',
      '.eyebrow{color:#B8923F!important;}',
      '.band-forest .eyebrow{color:#C6A15B!important;}',
      '.ages{color:#B8923F!important;}',
      '.sec-title::after{background:linear-gradient(90deg,#C6A15B,#8A4B32)!important;}',
      '.statnum,.step .num{color:#C6A15B!important;}',
      '.stage-card .arrow{color:#C6A15B!important;}',
      '.chip{border-color:rgba(198,161,91,.5)!important;color:#E8E1D0!important;}',
      '.ft-hcta{background:#C6A15B!important;color:#17281f!important;box-shadow:0 4px 14px rgba(198,161,91,.45)!important;}',
      '.hero-bg .g2{background:radial-gradient(circle,rgba(198,161,91,.42),transparent 70%)!important;}',
      '#ft-bottombar{display:none;}',
      '@media(max-width:640px){',
      '.ft-hcta{display:none!important;}',
      'body{padding-bottom:76px;}',
      '#ft-sprout{bottom:82px!important;}',
      '#ft-bottombar{display:block;position:fixed;left:0;right:0;bottom:0;z-index:9997;padding:10px 14px calc(10px + env(safe-area-inset-bottom));background:rgba(15,42,34,.96);box-shadow:0 -4px 20px rgba(0,0,0,.22);}',
      '#ft-bottombar a{display:block;text-align:center;background:#C6A15B;color:#17281f;font-family:var(--sans);font-weight:700;padding:14px;border-radius:999px;text-decoration:none;font-size:16px;}',
      '}'
    ].join('\n');
    var s = document.createElement('style'); s.id = 'ft-brandA-css'; s.textContent = css;
    (document.head || document.documentElement).appendChild(s);
  }
  ready(function () {
    var f = fname();
    if (f === 'profile.html') return;
    if (document.getElementById('ft-bottombar')) return;
    var b = document.createElement('div'); b.id = 'ft-bottombar';
    b.innerHTML = '<a href="profile.html">Build your profile \u2192</a>';
    document.body.appendChild(b);
  });
})();

/* ---- Lesson blocks for stage pages (Heritage) ---- */
(function () {
  if (document.getElementById('ft-lessonblocks-css')) return;
  var css = [
    '.lblocks{border-top:1px solid var(--line);margin-top:6px;}',
    '.lblock{display:flex;align-items:center;gap:20px;text-decoration:none;color:inherit;border-bottom:1px solid var(--line);padding:22px 4px;position:relative;transition:background .2s ease;}',
    '.lblock::before{content:"";position:absolute;left:0;top:0;bottom:0;width:0;background:linear-gradient(180deg,#C6A15B,#8A4B32);transition:width .2s ease;}',
    '.lblock:hover{background:rgba(198,161,91,.06);}',
    '.lblock:hover::before{width:4px;}',
    '.lblock .n{font-family:var(--serif);font-size:26px;color:#D9CBA6;font-weight:600;width:46px;flex:0 0 auto;text-align:center;}',
    '.lblock .nm{font-family:var(--serif);font-weight:600;font-size:19px;color:var(--forest);margin:0;}',
    '.lblock .ds{color:var(--stone);font-size:14px;margin:2px 0 0;}',
    '.lblock .go{margin-left:auto;color:#B8923F;font-weight:700;font-size:14px;flex:0 0 auto;transition:transform .2s ease;}',
    '.lblock:hover .go{transform:translateX(4px);}',
    '@media(max-width:600px){.lblock .go{display:none;}.lblock{gap:14px;}.lblock .n{width:34px;font-size:22px;}}'
  ].join('\n');
  var s = document.createElement('style'); s.id = 'ft-lessonblocks-css'; s.textContent = css;
  (document.head || document.documentElement).appendChild(s);
})();
