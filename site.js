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

/* ---- Accessibility + contrast fixes ---- */
(function () {
  if (document.getElementById('ft-a11y-css')) return;
  var css = [
    '.eyebrow{color:#9A7A2E!important;}',
    '.ages{color:#9A7A2E!important;}',
    '.pathcard .go,.sb-go,.lblock .go{color:#8A6A24!important;}',
    '.band-forest .eyebrow{color:#D4B36A!important;}',
    'a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible,.card:focus-visible,.pathcard:focus-visible,.stageblock:focus-visible,.lblock:focus-visible{outline:3px solid #C6A15B!important;outline-offset:2px;border-radius:4px;}',
    '.ft-hcta{color:#1a2e22!important;}',
    '.muted,.stage-desc,.sb-desc,.lblock .ds{color:#4E5A50!important;}'
  ].join('\n');
  var s = document.createElement('style'); s.id = 'ft-a11y-css'; s.textContent = css;
  (document.head || document.documentElement).appendChild(s);
})();

/* ---- Lesson & guide reading polish ---- */
(function () {
  if (document.getElementById('ft-prose-css')) return;
  var css = [
    '.prose{font-size:17.5px;line-height:1.75;color:#2A322B;max-width:70ch;}',
    '.prose p{margin:0 0 18px;}',
    '.prose h2{font-family:var(--serif);font-weight:600;color:var(--forest);font-size:26px;margin:34px 0 12px;letter-spacing:-.01em;}',
    '.prose h3{font-family:var(--serif);font-weight:600;color:var(--forest);font-size:21px;margin:28px 0 10px;}',
    '.prose h2::after{content:"";display:block;width:44px;height:3px;border-radius:2px;margin-top:10px;background:linear-gradient(90deg,#C6A15B,#8A4B32);}',
    '.prose ul,.prose ol{margin:0 0 18px;padding-left:22px;}',
    '.prose li{margin-bottom:9px;line-height:1.65;}',
    '.prose li::marker{color:#B8923F;}',
    '.prose strong{color:var(--forest);}',
    '.prose a{color:var(--moss);text-underline-offset:2px;}',
    '.prose blockquote{border-left:3px solid #C6A15B;margin:22px 0;padding:4px 0 4px 20px;font-family:var(--serif);font-style:italic;font-size:20px;color:var(--forest);}',
    '.callout,.prose .callout{background:#FBF4E3;border:1px solid #E8D9B4;border-left:4px solid #C6A15B;border-radius:10px;padding:16px 20px;margin:22px 0;font-size:15.5px;line-height:1.6;}',
    '.callout strong{color:var(--forest);}'
  ].join('\n');
  var s = document.createElement('style'); s.id = 'ft-prose-css'; s.textContent = css;
  (document.head || document.documentElement).appendChild(s);
})();
