/* Family Tree — shared nav + footer, injected on every page that includes this file.
   Skips injection if the page already has its own .nav or .sitefoot (like the homepage). */
(function () {
  function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }
  ready(function () {
    if (!document.querySelector('.nav')) {
      var nav = document.createElement('nav');
      nav.className = 'nav';
      nav.innerHTML = '<div class="row">' +
        '<a href="index.html">Home</a>' +
        '<a href="profile.html">Build your profile</a>' +
        '<a href="tools.html">Tools</a>' +
        '<a href="start-here.html">Start here</a>' +
        '<a href="about.html">About</a>' +
        '</div>';
      var hdr = document.querySelector('header.topbar');
      hdr ? hdr.insertAdjacentElement('afterend', nav) : document.body.insertAdjacentElement('afterbegin', nav);
    }
    if (!document.querySelector('.sitefoot')) {
      var f = document.createElement('footer');
      f.className = 'sitefoot';
      f.innerHTML = '<div class="row"><a href="glossary.html">Glossary</a> &middot; <a href="faq.html">FAQ</a> &middot; <a href="resources.html">Resources</a> &middot; <a href="privacy.html">Privacy</a></div>';
      document.body.appendChild(f);
    }
  });
})();
