/* Family Tree — shared nav + footer + personalization.
   - Shared nav (with "your stage" resume chip) and footer on every page
   - Homepage "welcome back / resume" banner for returning visitors
   - Stage pages: "X of Y lessons complete" + ticks on finished lessons
   - Lesson pages: a "mark complete" toggle
   All memory is per-device via localStorage (accounts come later). */
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

  ready(function () {
    var path = fname();
    var p = getProfile();
    var done = getDone();

    // ---- shared nav (skip if the page already has one) ----
    if (!document.querySelector('.nav')) {
      var nav = document.createElement('nav');
      nav.className = 'nav';
      nav.innerHTML = '<div class="row">' +
        '<a href="index.html">Home</a>' +
        '<a href="profile.html">Build your profile</a>' +
        '<a href="tools.html">Tools</a>' +
        '<a href="start-here.html">Start here</a>' +
        '<a href="about.html">About</a>' +
        '<span style="flex:1"></span>' +
        '<a id="ft-resume" href="profile.html" style="display:none; color:#fff; font-weight:600;"></a>' +
        '</div>';
      var hdr = document.querySelector('header.topbar');
      hdr ? hdr.insertAdjacentElement('afterend', nav) : document.body.insertAdjacentElement('afterbegin', nav);
    }

    // ---- resume chip in nav ----
    if (p && p.age) {
      var st = stageFromAge(p.age);
      var link = document.getElementById('ft-resume');
      if (link) {
        link.href = st.slug;
        link.textContent = (p.who === 'child' ? "Your child's stage: " : 'Your stage: ') + st.name + ' \u2192';
        link.style.display = 'inline';
      }
    }

    // ---- footer (skip if page already has one) ----
    if (!document.querySelector('.sitefoot')) {
      var f = document.createElement('footer');
      f.className = 'sitefoot';
      f.innerHTML = '<div class="row"><a href="glossary.html">Glossary</a> &middot; <a href="faq.html">FAQ</a> &middot; <a href="resources.html">Resources</a> &middot; <a href="privacy.html">Privacy</a></div>';
      document.body.appendChild(f);
    }

    // ---- homepage: welcome-back / resume banner ----
    if ((path === '' || path === 'index.html') && p && p.age) {
      var s2 = stageFromAge(p.age);
      var banner = document.createElement('div');
      banner.style.cssText = 'background:var(--sand); border-bottom:1px solid var(--line);';
      banner.innerHTML = '<div class="inner" style="padding:12px 24px; display:flex; gap:12px; align-items:center; justify-content:space-between; flex-wrap:wrap;">' +
        '<span style="font-size:14px;">Welcome back. Continue in <strong>' + s2.name + '</strong>' + (p.who === 'child' ? ' (your child\u2019s stage)' : '') + '.</span>' +
        '<a class="btn" href="' + s2.slug + '" style="padding:9px 16px;">Resume \u2192</a></div>';
      var navEl = document.querySelector('nav.nav');
      navEl ? navEl.insertAdjacentElement('afterend', banner) : document.body.insertAdjacentElement('afterbegin', banner);
    }

    // ---- stage pages: progress count + ticks ----
    if (STAGE_LESSONS[path]) {
      var lessons = STAGE_LESSONS[path];
      var doneCount = lessons.filter(function(l){ return done[l]; }).length;
      var head = document.querySelector('#lessons .sec-head');
      if (head) {
        var chip = document.createElement('span');
        chip.style.cssText = 'display:inline-block; margin-top:8px; font-size:13px; font-weight:600; color:var(--moss); background:#EAF1E3; border:1px solid #D3E3C6; border-radius:99px; padding:5px 13px;';
        chip.textContent = doneCount + ' of ' + lessons.length + ' lessons complete';
        head.appendChild(chip);
      }
      document.querySelectorAll('#lessons a.stage-card').forEach(function(card){
        var lf = base(card.getAttribute('href'));
        if (done[lf]) {
          var tag = document.createElement('div');
          tag.style.cssText = 'color:var(--moss); font-weight:600; font-size:13px; margin-top:8px;';
          tag.textContent = '\u2713 Completed';
          card.appendChild(tag);
        }
      });
    }

    // ---- lesson pages: mark-complete toggle ----
    if (ALL_LESSONS.indexOf(path) >= 0) {
      var wrap = document.querySelector('.prose');
      if (wrap && wrap.parentNode) {
        var box = document.createElement('div');
        box.style.cssText = 'margin-top:22px; padding:14px 16px; border:1px solid var(--line); border-radius:12px; background:#fff; display:flex; align-items:center; gap:10px;';
        var b = document.createElement('button');
        b.className = 'btn';
        function renderBtn(){
          if (done[path]) { b.textContent = '\u2713 Completed'; b.style.background = 'var(--sprout)'; b.style.color = '#12352b'; }
          else { b.textContent = 'Mark as complete'; b.style.background = 'var(--moss)'; b.style.color = '#fff'; }
        }
        b.addEventListener('click', function(){ done[path] = !done[path]; setDone(done); renderBtn(); });
        renderBtn();
        box.appendChild(b);
        var note = document.createElement('span');
        note.className = 'muted'; note.style.fontSize = '13px';
        note.textContent = 'Saved on this device.';
        box.appendChild(note);
        wrap.parentNode.insertBefore(box, wrap.nextSibling);
      }
    }
  });
})();
