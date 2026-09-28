const ROOT=window.SITE_BASE||'';
const asset=p=>ROOT+p;
let products=[],site={};
let path=(ROOT&&location.pathname.startsWith(ROOT)?location.pathname.slice(ROOT.length):location.pathname).replace(/\/$/,'')||'/';
const de=path==='/de'||path.startsWith('/de/');
const t=de?{
  bio:'Biographie',art:'Werke',contact:'Kontakt',works:'Werke',inquire:'Zum Werk anfragen',back:'Zurück zu den Werken',
  available:'Auf Lager',sold:'Verkauft',worksSub:'40 Arbeiten · Originalkunstwerke',send:'Senden',comment:'Kommentar',
  thanks:'Danke fürs Vorbeischauen ♥️'
}:{
  bio:'Biography',art:'Artworks',contact:'Contact',works:'Artworks',inquire:'Inquire about this artwork',back:'Back to artworks',
  available:'In stock',sold:'Sold',worksSub:'40 works · Original artworks',send:'Send',comment:'Comment',
  thanks:'Thank you for visiting ♥️'
};

function money(cents){return new Intl.NumberFormat(de?'de-DE':'en-US',{style:'currency',currency:'EUR'}).format((cents||0)/100)}
function localHref(h){return ROOT+h}
function fixLinks(){document.querySelectorAll('a[href^="/"]').forEach(a=>{const h=a.getAttribute('href');if(ROOT&&!h.startsWith(ROOT+'/'))a.setAttribute('href',ROOT+h)})}
function setChrome(){
  document.documentElement.lang=de?'de':'en';
  const logo=document.querySelector('.brand img'); if(logo&&site.logo) logo.src=asset(site.logo);
  document.querySelector('[data-nav="bio"]').textContent=t.bio;
  document.querySelector('[data-nav="art"]').textContent=t.art;
  document.querySelector('[data-nav="contact"]').textContent=t.contact;
  fixLinks();
}
const app=document.getElementById('app');

function home(){
  const hero=asset(site.hero), art=[site.art1,site.art2,site.art3].map(asset), career=asset(site.career1);
  app.innerHTML=de?`
  <section class="hero"><img class="hero-image" src="${hero}" alt="Samuel Nagler"></section>
  <section class="intro"><h1>Samuel Nagler</h1><p>ist ein renommierter Künstler, Tätowierer und Auftragsmaler mit einer Leidenschaft für abstrakte und realistische Kunst. Er entwickelte eine noch nie dagewesene Technik in der abstrakten Malerei, wodurch seine Bilder aussehen wie keine zuvor. Schon früh arbeitete er mit einigen der größten Studios der Welt zusammen, darunter bekannte Namen mit eigener TV-Show.</p><a class="link-btn" href="/de/collections/prints">Weiter zu den Werken</a></section>
  <section class="home-section"><div class="section-media grid3">${art.map(x=>`<img src="${x}" alt="Kunst von Samuel Nagler">`).join('')}</div><div class="section-copy"><h2>Kunst und Technik</h2><p>Heute steht sein Name für Perfektion, künstlerische Tiefe und ein unverwechselbares Erscheinungsbild. Alle Bilder sind unterschiedlich aufhängbar, wodurch sich Wirkung und Aussehen vollständig verändern lassen. Sie spielen mit Licht, Perspektive und Bewegung, wirken mal entspannend, mal energetisch, mal fließend, mal brennend.</p><a class="link-btn" href="/de/collections/prints">Werke ansehen</a></div></section>
  <section class="home-section reverse"><div class="section-copy"><h2>Künstlerischer Werdegang</h2><p>Mit 21 Jahren kreierte er bereits beeindruckende realistische Kunst. Mit 22 Jahren arbeitete Samuel Nagler in einem der angesagtesten Studios Deutschlands. Mit 24 Jahren verkaufte er seine Arbeiten national und international. In Berlin-Schöneberg eröffnete er sein Atelier und entwickelte seine eigene Technik in der abstrakten Kunst.</p><a class="link-btn" href="/de/pages/contact">Kontakt</a></div><div class="section-media"><img src="${career}" alt="Samuel Nagler Atelier"></div></section>
  `:`
  <section class="hero"><img class="hero-image" src="${hero}" alt="Samuel Nagler"></section>
  <section class="intro"><h1>Samuel Nagler</h1><p>is a renowned artist, tattooist and commission painter with a passion for abstract and realistic art. He developed an unprecedented technique in abstract painting, making his images look like none before. Early on he worked with some of the biggest studios in the world, including household names with their own TV show.</p><a class="link-btn" href="/collections/prints">Explore Artworks</a></section>
  <section class="home-section"><div class="section-media grid3">${art.map(x=>`<img src="${x}" alt="Art by Samuel Nagler">`).join('')}</div><div class="section-copy"><h2>Art and Technique</h2><p>Today, his name stands for perfection, artistic depth, and a distinctive appearance. All paintings can be hung in different ways, completely changing their effect and appearance. They play with light, perspective and movement, sometimes relaxing, sometimes energetic, sometimes flowing, sometimes burning.</p><a class="link-btn" href="/collections/prints">Explore Artworks</a></div></section>
  <section class="home-section reverse"><div class="section-copy"><h2>Career Highlights</h2><p>At 21 years old he was already creating impressive realistic art and by 24 Samuel was selling his work nationally and internationally. He opened his atelier in Berlin-Schöneberg where he developed his own technique in abstract art.</p><a class="link-btn" href="/pages/contact">Contact</a></div><div class="section-media"><img src="${career}" alt="Samuel Nagler atelier"></div></section>
  `;
}
function works(){
  const base=de?'/de/products/':'/products/';
  app.innerHTML=`<section class="page-head"><h1>${t.works}</h1><p>${t.worksSub}</p></section><section class="products">${products.map(p=>`<a class="product-card" href="${base+p.handle}"><img loading="lazy" src="${asset(p.images[0])}" alt="${p.title}"><div class="product-meta"><div class="product-title">${p.title}</div><div class="product-sub"><span>${money(p.price)}</span><span class="${p.available?'':'sold'}">${p.available?t.available:t.sold}</span></div></div></a>`).join('')}</section>`;
}
function detail(handle){
  const p=products.find(x=>x.handle===handle); if(!p)return notfound();
  const paragraphs=(p.description||'').split(/\n+/).filter(Boolean).map(x=>`<p>${x}</p>`).join('');
  app.innerHTML=`<section class="detail"><div class="detail-media">${p.images.map((im,i)=>`<img loading="${i?'lazy':'eager'}" src="${asset(im)}" alt="${p.title}${i?' – Ansicht '+(i+1):''}">`).join('')}</div><div class="detail-copy"><a href="${de?'/de/collections/prints':'/collections/prints'}">← ${t.back}</a><h1>${p.title}</h1><div class="price">${money(p.price)}</div><div class="status">${p.available?t.available:t.sold}</div><div class="description">${paragraphs}</div><a class="link-btn" href="mailto:info@samuelnagler.com?subject=${encodeURIComponent((de?'Anfrage zu ':'Inquiry about ')+p.title)}">${t.inquire}</a></div></section>`;
}
function contact(){
  app.innerHTML=`<section class="contact-card"><h1>${t.contact}</h1><p>${t.thanks}</p><p><a href="mailto:info@samuelnagler.com">info@samuelnagler.com</a></p><form onsubmit="event.preventDefault();const f=new FormData(this);location.href='mailto:info@samuelnagler.com?subject='+encodeURIComponent(f.get('name')+' – Website')+'&body='+encodeURIComponent(f.get('message')+'\\n\\n'+f.get('email'));"><input name="name" required placeholder="Name"><input name="email" type="email" required placeholder="${de?'E-Mail':'Email'}"><textarea name="message" required placeholder="${t.comment}"></textarea><button type="submit">${t.send}</button></form><div class="small-note">${de?'Das Formular öffnet dein E-Mail-Programm; die Website speichert keine Formulardaten.':'The form opens your email client; this website stores no form data.'}</div></section>`;
}
function notfound(){app.innerHTML=`<div class="notfound"><h1>404</h1><p>${de?'Seite nicht gefunden.':'Page not found.'}</p><a class="link-btn" href="${de?'/de':'/'}">Home</a></div>`}
function render(){if(path==='/'||path==='/de')home();else if(path.includes('/collections/prints')||path.includes('/collections/all')||path.includes('/collections/frontpage'))works();else if(path.includes('/pages/contact'))contact();else{const m=path.match(/\/products\/([^/]+)$/);m?detail(m[1]):notfound()}fixLinks()}
async function boot(){
  try{const r=await fetch(asset('/assets/products.json'),{cache:'no-store'});const d=await r.json();products=d.products;site=d.site}catch(e){app.innerHTML='<div class="notfound"><p>Content could not be loaded.</p></div>';return}
  setChrome();render();
  const menuBtn=document.querySelector('.menu-btn'),nav=document.querySelector('.site-header nav');if(menuBtn&&nav)menuBtn.addEventListener('click',()=>{nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',nav.classList.contains('open')?'true':'false')});
}
boot();