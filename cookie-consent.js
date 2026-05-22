// ── COOKIE CONSENT BANNER (GDPR / LGPD compliant) ──
(function(){
  var KEY='cle_cookie_consent_v1';
  var existing=localStorage.getItem(KEY);
  if(existing){ window.__cookieConsent=JSON.parse(existing); return; }

  var lang=(document.documentElement.lang||'en').toLowerCase().startsWith('es')?'es':'en';
  var T={
    en:{
      title:'Privacy &amp; Cookies',
      body:'We use strictly necessary cookies to operate this site. With your consent, we also use analytics cookies to improve our service. Read our <a href="privacy.html">Privacy Policy</a>.',
      accept:'Accept all',
      reject:'Necessary only',
      settings:'Customize'
    },
    es:{
      title:'Privacidad y Cookies',
      body:'Usamos cookies estrictamente necesarias para operar este sitio. Con su consentimiento, también utilizamos cookies analíticas para mejorar el servicio. Consulte nuestra <a href="privacy.html">Política de Privacidad</a>.',
      accept:'Aceptar todas',
      reject:'Solo necesarias',
      settings:'Personalizar'
    }
  };
  var t=T[lang];

  var style=document.createElement('style');
  style.textContent='#cookie-banner{position:fixed;bottom:24px;left:24px;right:24px;max-width:520px;background:rgba(15,15,15,.98);backdrop-filter:blur(20px);border:1px solid rgba(201,168,76,.25);padding:24px 26px;z-index:9998;font-family:Montserrat,sans-serif;color:#e8e6e0;box-shadow:0 30px 80px rgba(0,0,0,.6);animation:cb-in .5s ease both}@keyframes cb-in{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}#cookie-banner h4{font-family:Cormorant Garamond,serif;font-size:18px;font-weight:400;color:#c9a84c;letter-spacing:1px;margin-bottom:10px;text-transform:uppercase}#cookie-banner p{font-size:12px;line-height:1.65;color:rgba(232,230,224,.8);margin-bottom:16px;font-weight:300}#cookie-banner p a{color:#c9a84c;text-decoration:underline}#cookie-banner .cb-actions{display:flex;gap:10px;flex-wrap:wrap}#cookie-banner button{flex:1;min-width:120px;background:none;border:1px solid rgba(201,168,76,.4);color:#c9a84c;padding:11px 16px;font-family:Montserrat,sans-serif;font-size:10px;font-weight:500;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .25s}#cookie-banner button:hover{background:#c9a84c;color:#0a0a0a;border-color:#c9a84c}#cookie-banner button.primary{background:#c9a84c;color:#0a0a0a}#cookie-banner button.primary:hover{background:#d4b35c}@media(max-width:560px){#cookie-banner{left:12px;right:12px;bottom:12px;padding:20px}#cookie-banner button{min-width:0;padding:10px 8px;font-size:9px;letter-spacing:1.5px}}';
  document.head.appendChild(style);

  var banner=document.createElement('div');
  banner.id='cookie-banner';
  banner.setAttribute('role','dialog');
  banner.setAttribute('aria-labelledby','cb-title');
  banner.innerHTML='<h4 id="cb-title">'+t.title+'</h4><p>'+t.body+'</p><div class="cb-actions"><button type="button" data-c="reject">'+t.reject+'</button><button type="button" class="primary" data-c="accept">'+t.accept+'</button></div>';
  document.body.appendChild(banner);

  function save(consent){
    var data={analytics:consent==='accept',ts:Date.now()};
    localStorage.setItem(KEY,JSON.stringify(data));
    window.__cookieConsent=data;
    banner.style.animation='cb-in .3s ease reverse both';
    setTimeout(function(){banner.remove();},300);
    if(consent==='accept' && typeof window.loadAnalytics==='function'){
      window.loadAnalytics();
    }
  }
  banner.querySelectorAll('[data-c]').forEach(function(b){
    b.addEventListener('click',function(){save(b.getAttribute('data-c'));});
  });
})();
