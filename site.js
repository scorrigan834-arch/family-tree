/* Family Tree — shared header (search + menu), footer, and personalization.
   Everything is injected here so every page stays in sync. Memory is per-device
   via localStorage (accounts come later). */
(function () {
  var PKEY = 'familyTreeProfile';
  var DKEY = 'familyTreeDone';

  var STAGE_LESSONS = {
    'first-roots.html':   ['first-roots-earning.html','first-roots-saving.html','first-roots-needs.html'],
    'growing.html':       ['growing-budget.html','growing-goal.html','growing-banks.html'],
    'branching-out.html': ['branching-paycheck.html','branching-credit.html','branching-accounts.html'],
    'taking-root.html':   ['taking-budget.html','taking-debt.html','taking-investing.html','taking-housing.html'],
    'canopy.html':        ['canopy-investing.html','canopy-insurance.html','canopy-estate.html']
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
    {u:'taking-budget.html', t:'Budgeting a real salary', c:'Lesson', k:'budget 50 30 20 salary automate'},
    {u:'taking-debt.html', t:'Paying down debt', c:'Lesson', k:'debt avalanche snowball credit card interest'},
    {u:'taking-investing.html', t:'Investing for the first time', c:'Lesson', k:'invest 401k roth ira index fund stocks'},
    {u:'taking-housing.html', t:'Renting versus buying', c:'Lesson', k:'rent buy home house mortgage equity'},
    {u:'canopy-investing.html', t:'Investing for the long run', c:'Lesson', k:'invest diversify rebalance fees'},
    {u:'canopy-insurance.html', t:'Family and insurance', c:'Lesson', k:'insurance emergency life health disability'},
    {u:'canopy-estate.html', t:'Estate planning and what to pass on', c:'Lesson', k:'estate will beneficiary legacy inheritance'},
    {u:'compound-interest.html', t:'Compound interest', c:'Tool', k:'compound interest growth invest save'},
    {u:'budget.html', t:'Budget builder', c:'Tool', k:'budget 50 30 20 needs wants savings'},
    {u:'debt-payoff.html', t:'Debt payoff', c:'Tool', k:'debt payoff credit card interest'},
    {u:'savings-goal.html', t:'Savings goal', c:'Tool', k:'savings goal months'},
    {u:'net-worth.html', t:'Net worth', c:'Tool', k:'net worth assets liabilities'},
    {u:'emergency-fund.html', t:'Emergency fund', c:'Tool', k:'emergency fund savings target'},
    {u:'take-home-pay.html', t:'Take-home pay', c:'Tool', k:'take home pay net salary taxes'},
    {u:'mortgage.html', t:'Mortgage payment', c:'Tool', k:'mortgage payment home loan interest'},
    {u:'retirement.html', t:'Retirement projection', c:'Tool', k:'retirement 401k savings projection'},
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
      '<a href="guides.html">Guides</a>' +
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
        mb.addEventListener('click', function(){ done[path] = !done[path]; setDone(done); renderMark(); });
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
          else if(correct === total){ scoreEl.textContent = 'Perfect — ' + correct + ' of ' + total + ' correct!'; }
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
    {slug:'first-roots.html', name:'First Roots', lessons:['first-roots-earning.html','first-roots-saving.html','first-roots-needs.html']},
    {slug:'growing.html', name:'Growing', lessons:['growing-budget.html','growing-goal.html','growing-banks.html']},
    {slug:'branching-out.html', name:'Branching Out', lessons:['branching-paycheck.html','branching-credit.html','branching-accounts.html']},
    {slug:'taking-root.html', name:'Taking Root', lessons:['taking-budget.html','taking-debt.html','taking-investing.html','taking-housing.html']},
    {slug:'canopy.html', name:'The Canopy', lessons:['canopy-investing.html','canopy-insurance.html','canopy-estate.html']}
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
    var h = '<div style="display:flex;justify-content:space-between;font-size:13px;color:var(--stone);margin-bottom:6px;"><span>Your progress</span><span>' + dn + ' of ' + total + ' lessons</span></div>';
    h += '<div style="height:10px;background:var(--sand);border-radius:99px;overflow:hidden;"><div style="height:100%;width:' + (dn/total*100) + '%;background:var(--sprout);border-radius:99px;"></div></div>';
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
