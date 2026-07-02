/* Family Tree — shared nav + footer + personalization.
   Injected on every page. Reads the saved profile (from the profile builder)
   and shows a "your stage" resume chip; also powers lesson progress ticks. */
(function () {
  var PKEY = 'familyTreeProfile';
  var DKEY = 'familyTreeDone';

  function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }

  function getProfile(){ try{ var v=localStorage.getItem(PKEY); return v?JSON.parse(v):null; }catch(e){ return null; } }
  function getDone(){ try{ var v=localStorage.getItem(DKEY); return v?JSON.parse(v):{}; }catch(e){ return {}; } }
  function setDone(d){ try{ localStorage.setItem(DKEY, JSON.stringify(d)); }catch(e){} }

  function stageFromAge(a){
    if(a<=10) return {slug:'first-roots.html', name:'First Roots'};
    if(a<=15) return {slug:'growing.html', name:'Growing'};
    if(a<=22) return {slug:'branching-out.html', name:'Branching Out'};
    if(a<=30) return {slug:'taking-root.html', name:'Taking Root'};
    return {slug:'canopy.html', name:'The Canopy'};
  }

  ready(function () {
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

    // ---- personalization: "your stage" resume chip ----
    var p = getProfile();
    if (p && p.age) {
      var st = stageFromAge(p.age);
      var link = document.getElementById('ft-resume');
      if (link) {
        link.href = st.slug;
        link.textContent = (p.who === 'child' ? "Your child's stage: " : 'Your stage: ') + st.name + ' →';
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

    // ---- lesson progress: add a "mark complete" toggle on lesson pages ----
    // A page counts as a lesson if its filename contains a hyphen after a stage prefix
    // and it has a "Back to" link. We tag lessons with data-lesson via the Back button's target.
    var backBtn = document.querySelector('a.btn[href$=".html"]');
    var path = location.pathname.split('/').pop() || '';
    var isLesson = /-(earning|saving|needs|budget|goal|banks|paycheck|credit|accounts|debt|investing|housing|insurance|estate)\.html$/.test(path);
    if (isLesson) {
      var done = getDone();
      var wrap = document.querySelector('.prose');
      if (wrap && wrap.parentNode) {
        var box = document.createElement('div');
        box.style.cssText = 'margin-top:22px; padding:14px 16px; border:1px solid var(--line); border-radius:12px; background:#fff; display:flex; align-items:center; gap:10px;';
        var b = document.createElement('button');
        b.className = 'btn';
        function render(){
          if (done[path]) { b.textContent = '✓ Completed'; b.style.background = 'var(--sprout)'; b.style.color = '#12352b'; }
          else { b.textContent = 'Mark as complete'; b.style.background = 'var(--moss)'; b.style.color = '#fff'; }
        }
        b.addEventListener('click', function(){ done[path] = !done[path]; setDone(done); render(); });
        render();
        box.appendChild(b);
        var note = document.createElement('span');
        note.className = 'muted';
        note.style.fontSize = '13px';
        note.textContent = 'Saved on this device.';
        box.appendChild(note);
        wrap.parentNode.insertBefore(box, wrap.nextSibling);
      }
    }
  });
})();
