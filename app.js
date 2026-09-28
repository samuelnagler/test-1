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
function fixLinks(){document.querySelectorAll('a[href^="/"]').forEach(a=>{const h=a.getAttribute('href');if(ROOT&&!h.startsWith(ROOT+'/'))a.setAttribute('href',ROOT+h)})}
function setChrome(){
  document.documentElement.lang=de?'de':'en';
  const logo=document.querySelector('.brand img'); if(logo&&site.logo) logo.src=asset(site.logo);
  const brand=document.querySelector('.brand'); brand.href=de?'/de':'/';
  const nBio=document.querySelector('[data-nav="bio"]'), nArt=document.querySelector('[data-nav="art"]'), nContact=document.querySelector('[data-nav="contact"]');
  nBio.textContent=t.bio;nBio.href=de?'/de':'/';
  nArt.textContent=t.art;nArt.href=de?'/de/collections/prints':'/collections/prints';
  nContact.textContent=t.contact;nContact.href=de?'/de/pages/contact':'/pages/contact';
  const langs=document.querySelectorAll('.lang a'); if(langs[0])langs[0].href='/';if(langs[1])langs[1].href='/de';
  const footerContact=document.querySelector('footer .footlinks a:first-child');if(footerContact){footerContact.textContent=t.contact;footerContact.href=de?'/de/pages/contact':'/pages/contact'}
  fixLinks();
}
const app=document.getElementById('app');
function rich(heading,body,cls=''){
  const paras=body.split('\n').filter(Boolean).map(p=>`<p>${p}</p>`).join('');
  return `<section class="shop-rich ${cls}"><div class="shop-rich-inner">${heading?`<h2>${heading}</h2>`:''}${paras}</div></section>`;
}
function carousel(images,labels=[]){
  return `<section class="shop-slideshow" data-carousel><div class="slides">${images.map((im,i)=>`<figure class="slide ${i===0?'active':''}"><img src="${asset(im)}" alt="${labels[i]||'Samuel Nagler'}">${labels[i]?`<figcaption>${labels[i]}</figcaption>`:''}</figure>`).join('')}</div><button class="slide-prev" aria-label="Previous slide">‹</button><button class="slide-next" aria-label="Next slide">›</button><div class="slide-count"><span>1</span> / ${images.length}</div></section>`;
}
function featured(){
 const wanted=['Ancestor','Animals','Aqua','Argentum','Aura','Aurum','Beginning','Blossom'];
 const list=wanted.map(name=>products.find(p=>p.title===name)).filter(Boolean);
 const base=de?'/de/products/':'/products/';
 return `<section class="featured"><h2>${de?'Ausgewählte Produkte':'Featured products'}</h2><div class="featured-grid">${list.map(p=>`<a class="featured-card" href="${base+p.handle}"><img loading="lazy" src="${asset(p.images[0])}" alt="${p.title}"><h3>${p.title}</h3><div class="featured-price">${money(p.price)}</div></a>`).join('')}</div><a class="view-all" href="${de?'/de/collections/prints':'/collections/prints'}">${de?'Alle Produkte anzeigen':'View all products'}</a></section>`;
}
function home(){
 const hero=asset(site.hero);
 const early=['/assets/site/slides/early-1.jpg','/assets/site/slides/early-2.jpg','/assets/site/slides/early-3.jpg','/assets/site/slides/early-4.jpg','/assets/site/slides/early-5.jpg'];
 const age25=['/assets/site/slides/age25-1.jpg','/assets/site/slides/age25-2.jpg','/assets/site/slides/age25-3.jpg','/assets/site/slides/age25-4.jpg','/assets/site/slides/age25-5.jpg'];
 const age26=['/assets/site/slides/age26-1.jpg','/assets/site/slides/age26-2.jpg','/assets/site/slides/age26-3.jpg','/assets/site/slides/age26-4.jpg','/assets/site/slides/age26-5.jpg'];
 const introDE='ist ein renommierter Künstler, Tätowierer und Auftragsmaler mit einer Leidenschaft für abstrakte und realistische Kunst. Er entwickelte eine noch nie dagewesene Technik in der abstrakten Malerei, wodurch seine Bilder aussehen wie keine zuvor. Schon früh arbeitete er mit einigen der größten Studios der Welt zusammen, darunter bekannte Namen mit eigener TV-Show.';
 const introEN='is a renowned artist, tattooist and commission painter with a passion for abstract and realistic art. He developed an unprecedented technique in abstract painting, making his images look like none before. Early on he worked with some of the biggest studios in the world, including household names with their own TV show.';
 const milestonesEN='21 years old he was already creating impressive realistic art.\n22 years old Samuel Nagler was working in one of the most sought after studio in Germany - with three locations, own TV show and convention.\n23 years old he collaborated with one of the most famous studio in Germany and in the same year with the biggest tattoo studio in the world.\n24 years old Samuel was selling his work nationally and internationally.\n25 years old he opened his atelier in Berlin Schöneberg where he developed an unseen technique in abstract art.\nToday, his name stands for perfection, artistic depth, and a distinctive appearance.';
 const milestonesDE='Mit 21 Jahren kreierte er bereits beeindruckende realistische Kunst.\nMit 22 Jahren arbeitete Samuel Nagler in einem der angesagtesten Studios Deutschlands – mit drei Standorten, eigener TV-Show und Convention.\nMit 23 Jahren folgte eine Zusammenarbeit mit einem der berühmtesten Studios Deutschlands und im selben Jahr mit dem größten Tattoo-Studio der Welt.\nMit 24 Jahren verkaufte er seine Werke bereits national und international.\nMit 25 Jahren eröffnete er sein Atelier in Berlin Schöneberg, wo er eine neue Technik in der abstrakten Kunst entwickelte.\nHeute steht sein Name für Perfektion, künstlerische Tiefe und unverwechselbares Aussehen.';
 const paintingsEN='completely changing its effect and appearance. They play with light, perspective and movement, sometimes relaxing, sometimes energetic, sometimes flowing, sometimes burning. Art that is not only viewed but experienced.\nThe series are complete, self-contained bodies of work, each with its own distinct artistic signature. There are no reproductions – each series is unique and limited to ten pieces.';
 const paintingsDE='wodurch sich Wirkung und Aussehen komplett verändern lassen. Sie spielen mit Licht, Perspektive und Bewegung, wirken mal entspannend, mal energetisch, mal fließend, mal brennend. Kunst, die nicht nur betrachtet, sondern erlebt wird.\nDie Serien sind abgeschlossene Werkreihen, jede mit individueller künstlerischer Handschrift. Es gibt keine Reproduktionen – jede Serie ist einzigartig und auf zehn Werke limitiert.';
 const cv='2019 - Monasteria, Münster DE\n2019 - Nadelstil, Berlin DE\n2020 - Jenny B, TV-Show: Coverup, 3 locations, own convention, Göttingen DE\n2020 - Jenny B, Kassel DE\n2021 - Classic Tattoo, TV-Show: Berlin Tag und Nacht, 5 locations, Berlin DE\n2021 - Vean, 150+ locations in Europe, biggest Tattoo Studio in the world, Berlin DE\n2022 - Vean, Kassel DE\n2022 - LX Factory, Lisbon PT\n2022 - Tintenherz, Rostock DE\n2022 - Bee One, Berlin DE\n2023 - Brennnessel, Berlin DE\n2023 - Opening Atelier Samuel Nagler in Schöneberg, Berlin DE\n2024 - Sorry Mom, Braunschweig DE\n2024 - LX Factory, Lisbon PT\n2024 - Color Clinic, Leipzig DE\n2024 - Culture Shocks, Wolfsburg DE\n2024 - Kustom Kings, Hannover DE\n2025 - Release: LOVE Series, Berlin DE\n2025 - Release: Monochrome Series, Berlin DE\n2025 - Release: Original Series, Berlin DE\n2025 - Release: Duo Series, Berlin DE\n2026 - Burning Mountain, St. Moritz SUI';
 app.innerHTML=`
   <section class="shop-hero"><img src="${hero}" alt="Samuel Nagler"></section>
   ${rich('Samuel Nagler',de?introDE:introEN,'intro-rich')}
   ${carousel(early,de?['','', '', '', '']:['Age 17','Age 20','Age 21','Age 21','Age 21'])}
   ${rich(de?'Mit:':'At:',de?milestonesDE:milestonesEN,'milestones')}
   ${carousel(age25,['Age 25','','','',''])}
   ${rich(de?'Alle Bilder sind unterschiedlich aufhängbar':'All paintings can be hung in different ways',de?paintingsDE:paintingsEN,'paintings-copy')}
   ${carousel(age26,['Age 26','','','',''])}
   ${rich('CV',cv,'cv')}
   ${featured()}
 `;
}
function works(){
 const base=de?'/de/products/':'/products/';
 app.innerHTML=`<section class="page-head"><h1>${t.works}</h1><p>${t.worksSub}</p></section><section class="products">${products.map(p=>`<a class="product-card" href="${base+p.handle}"><img loading="lazy" src="${asset(p.images[0])}" alt="${p.title}"><div class="product-meta"><div class="product-title">${p.title}</div><div class="product-sub"><span>${money(p.price)}</span><span class="${p.available?'':'sold'}">${p.available?t.available:t.sold}</span></div></div></a>`).join('')}</section>`;
}
function detail(handle){
 const p=products.find(x=>x.handle===handle);if(!p)return notfound();
 const paragraphs=(p.description||'').split(/\n+/).filter(Boolean).map(x=>`<p>${x}</p>`).join('');
 app.innerHTML=`<section class="detail"><div class="detail-media">${p.images.map((im,i)=>`<img loading="${i?'lazy':'eager'}" src="${asset(im)}" alt="${p.title}${i?' – view '+(i+1):''}">`).join('')}</div><div class="detail-copy"><a href="${de?'/de/collections/prints':'/collections/prints'}">← ${t.back}</a><h1>${p.title}</h1><div class="price">${money(p.price)}</div><div class="status">${p.available?t.available:t.sold}</div><div class="description">${paragraphs}</div><a class="link-btn" href="mailto:info@samuelnagler.com?subject=${encodeURIComponent((de?'Anfrage zu ':'Inquiry about ')+p.title)}">${t.inquire}</a></div></section>`;
}
function contact(){
 app.innerHTML=`<section class="contact-card"><h1>${t.contact}</h1><p>${t.thanks}</p><p><a href="mailto:info@samuelnagler.com">info@samuelnagler.com</a></p><form onsubmit="event.preventDefault();const f=new FormData(this);location.href='mailto:info@samuelnagler.com?subject='+encodeURIComponent(f.get('name')+' – Website')+'&body='+encodeURIComponent(f.get('message')+'\\n\\n'+f.get('email'));"><input name="name" required placeholder="Name"><input name="email" type="email" required placeholder="${de?'E-Mail':'Email'}"><textarea name="message" required placeholder="${t.comment}"></textarea><button type="submit">${t.send}</button></form><div class="small-note">${de?'Das Formular öffnet dein E-Mail-Programm; die Website speichert keine Formulardaten.':'The form opens your email client; this website stores no form data.'}</div></section>`;
}
function notfound(){app.innerHTML=`<div class="notfound"><h1>404</h1><p>${de?'Seite nicht gefunden.':'Page not found.'}</p><a class="link-btn" href="${de?'/de':'/'}">Home</a></div>`}
function initCarousels(){
 document.querySelectorAll('[data-carousel]').forEach(c=>{
   const slides=[...c.querySelectorAll('.slide')],count=c.querySelector('.slide-count span');let i=0;
   const show=n=>{i=(n+slides.length)%slides.length;slides.forEach((s,k)=>s.classList.toggle('active',k===i));count.textContent=i+1};
   c.querySelector('.slide-prev').addEventListener('click',()=>show(i-1));
   c.querySelector('.slide-next').addEventListener('click',()=>show(i+1));
 });
}
function render(){if(path==='/'||path==='/de')home();else if(path.includes('/collections/prints')||path.includes('/collections/all')||path.includes('/collections/frontpage'))works();else if(path.includes('/pages/contact'))contact();else{const m=path.match(/\/products\/([^/]+)$/);m?detail(m[1]):notfound()}fixLinks();initCarousels()}
async function boot(){
 try{const r=await fetch(asset('/assets/products.json'),{cache:'no-store'});const d=await r.json();products=d.products;site=d.site}catch(e){app.innerHTML='<div class="notfound"><p>Content could not be loaded.</p></div>';return}
 setChrome();render();
 const menuBtn=document.querySelector('.menu-btn'),nav=document.querySelector('.site-header nav');if(menuBtn&&nav)menuBtn.addEventListener('click',()=>{nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',nav.classList.contains('open')?'true':'false')});
}
boot();