cat >> site.js << 'EOF'

/* ---- Auto glow-halo on plain forest heroes (lesson pages, etc.) ---- */
(function () {
  function ready(fn){ document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }
  if (!document.getElementById('ft-halo-css')) {
    var css = [
      '.ft-halo{position:relative;overflow:hidden;}',
      '.ft-halo>.inner{position:relative;z-index:1;}',
      '.ft-halo .ft-glow{position:absolute;border-radius:50%;filter:blur(70px);pointer-events:none;}',
      '.ft-halo .ft-g1{width:440px;height:440px;background:radial-gradient(circle,rgba(47,125,83,.6),transparent 70%);top:-150px;right:-120px;}',
      '.ft-halo .ft-g2{width:340px;height:340px;background:radial-gradient(circle,rgba(198,161,91,.36),transparent 70%);bottom:-150px;left:-120px;}'
    ].join('\n');
    var s = document.createElement('style'); s.id = 'ft-halo-css'; s.textContent = css;
    (document.head || document.documentElement).appendChild(s);
  }
  ready(function () {
    var hero = document.querySelector('section.band-forest');
    if (!hero) return;
    if (hero.querySelector('.glow') || hero.querySelector('.ft-glow')) return;
    if (!hero.querySelector('.inner')) return;
    hero.classList.add('ft-halo');
    var g1 = document.createElement('span'); g1.className = 'ft-glow ft-g1';
    var g2 = document.createElement('span'); g2.className = 'ft-glow ft-g2';
    hero.insertBefore(g2, hero.firstChild);
    hero.insertBefore(g1, hero.firstChild);
  });
})();
EOF
