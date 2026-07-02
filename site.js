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
    {u:'guide-index-vs-stocks.html', t:'Index funds vs individual stocks', c:'Guide', k:'index funds stocks investing diversification fees'}
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
