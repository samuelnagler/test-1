const ROOT=window.SITE_BASE||'';
const asset=p=>ROOT+p;
const webPath=p=>(p||'').replace(/^\/assets\//,'/assets-web/').replace(/\.(?:jpe?g|png|webp)$/i,'.webp');
const webAsset=p=>asset(webPath(p));
let products=[],site={};
let path=(ROOT&&location.pathname.startsWith(ROOT)?location.pathname.slice(ROOT.length):location.pathname).replace(/\/$/,'')||'/';
const de=path==='/de'||path.startsWith('/de/');
const t=de?{
  bio:'Biographie',art:'Werke',contact:'Kontakt',works:'Werke',inquire:'Zum Werk anfragen',back:'Zurück zu den Werken',
  available:'Auf Lager',sold:'Verkauft',worksSub:'40 Arbeiten · Originalkunstwerke',send:'Senden',comment:'Kommentar',
  thanks:'Danke fürs Vorbeischauen ♥️',prev:'Vorheriges Bild',next:'Nächstes Bild',collectionTitle:'Kategorie: Werke',filter:'Filter:',availabilityLabel:'Verfügbarkeit',inStockLabel:'Auf Lager',outStockLabel:'Nicht vorrätig',sortLabel:'Sortieren nach:',productsLabel:'Produkte',reset:'Zurücksetzen',sortRelevant:'Am relevantesten',sortBest:'meistverkauft',sortAZ:'Alphabetisch, A-Z',sortZA:'Alphabetisch, Z-A',sortLow:'Preis, niedrig nach hoch',sortHigh:'Preis, hoch nach niedrig',sortOld:'Datum, alt zu neu',sortNew:'Datum, neu zu alt',prevPage:'Vorherige Seite',nextPage:'Nächste Seite'
}:{
  bio:'Biography',art:'Artworks',contact:'Contact',works:'Artworks',inquire:'Inquire about this artwork',back:'Back to artworks',
  available:'In stock',sold:'Sold',worksSub:'40 works · Original artworks',send:'Send',comment:'Comment',
  thanks:'Thank you for visiting ♥️',prev:'Previous image',next:'Next image',collectionTitle:'Collection: Paintings',filter:'Filter:',availabilityLabel:'Availability',inStockLabel:'In stock',outStockLabel:'Out of stock',sortLabel:'Sort by:',productsLabel:'products',reset:'Reset',sortRelevant:'Most relevant',sortBest:'Best selling',sortAZ:'Alphabetically, A-Z',sortZA:'Alphabetically, Z-A',sortLow:'Price, low to high',sortHigh:'Price, high to low',sortOld:'Date, old to new',sortNew:'Date, new to old',prevPage:'Previous page',nextPage:'Next page'
};
function money(cents){return new Intl.NumberFormat(de?'de-DE':'en-US',{style:'currency',currency:'EUR'}).format((cents||0)/100)}
function fixLinks(){document.querySelectorAll('a[href^="/"]').forEach(a=>{const h=a.getAttribute('href');if(ROOT&&!h.startsWith(ROOT+'/'))a.setAttribute('href',ROOT+h)})}
function setChrome(){
  document.documentElement.lang=de?'de':'en';
  const logo=document.querySelector('.brand img'); if(logo&&site.logo) logo.src=webAsset(site.logo);
  const brand=document.querySelector('.brand'); brand.href=de?'/de':'/';
  const nBio=document.querySelector('[data-nav="bio"]'), nArt=document.querySelector('[data-nav="art"]'), nContact=document.querySelector('[data-nav="contact"]');
  nBio.textContent=t.bio;nBio.href=de?'/de':'/';
  nArt.textContent=t.art;nArt.href=de?'/de/collections/prints':'/collections/prints';
  nContact.textContent=t.contact;nContact.href=de?'/de/pages/contact':'/pages/contact';
  const langs=document.querySelectorAll('.lang a');
  let enPath=path, dePath=path;
  if(path==='/de'){enPath='/';dePath='/de'}
  else if(path.startsWith('/de/')){enPath=path.slice(3)||'/';dePath=path}
  else {enPath=path;dePath=path==='/'?'/de':'/de'+path}
  if(langs[0])langs[0].href=enPath;if(langs[1])langs[1].href=dePath;
  const foot=document.querySelector('footer .footlinks');
  if(foot){
    foot.innerHTML=`
      <a href="${de?'/de/pages/contact':'/pages/contact'}">${t.contact}</a>
      <a href="${de?'/de/impressum':'/impressum'}">${de?'Impressum':'Legal notice'}</a>
      <a href="${de?'/de/datenschutz':'/datenschutz'}">${de?'Datenschutz':'Privacy'}</a>
      <a href="https://www.instagram.com/samuelnagler/" target="_blank" rel="noreferrer">Instagram</a>`;
  }
  fixLinks();
}
const app=document.getElementById('app');
const SITE_ORIGIN='https://samuelnagler.com';
function metaTag(selector,attrs){
  let el=document.head.querySelector(selector);
  if(!el){el=document.createElement('meta');document.head.appendChild(el)}
  Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));
  return el;
}
function linkTag(rel,hreflang,href){
  let selector='link[rel="'+rel+'"]'+(hreflang?'[hreflang="'+hreflang+'"]':'');
  let el=document.head.querySelector(selector);
  if(!el){el=document.createElement('link');el.rel=rel;if(hreflang)el.hreflang=hreflang;document.head.appendChild(el)}
  el.href=href;
}
function setMeta(title,description,imagePath='',robots='noindex,nofollow'){
  document.title=title;
  let d=document.head.querySelector('meta[name="description"]');
  if(!d){d=document.createElement('meta');d.name='description';document.head.appendChild(d)}
  d.content=description;
  metaTag('meta[name="robots"]',{name:'robots',content:robots});
  metaTag('meta[property="og:title"]',{property:'og:title',content:title});
  metaTag('meta[property="og:description"]',{property:'og:description',content:description});
  metaTag('meta[property="og:type"]',{property:'og:type',content:'website'});
  metaTag('meta[property="og:url"]',{property:'og:url',content:SITE_ORIGIN+path});
  metaTag('meta[name="twitter:card"]',{name:'twitter:card',content:'summary_large_image'});
  metaTag('meta[name="twitter:title"]',{name:'twitter:title',content:title});
  metaTag('meta[name="twitter:description"]',{name:'twitter:description',content:description});
  if(imagePath){
    const img=SITE_ORIGIN+webPath(imagePath);
    metaTag('meta[property="og:image"]',{property:'og:image',content:img});
    metaTag('meta[name="twitter:image"]',{name:'twitter:image',content:img});
  }
  linkTag('canonical','',SITE_ORIGIN+path);
  let enPath=path, dePath=path;
  if(path==='/de'){enPath='/';dePath='/de'}
  else if(path.startsWith('/de/')){enPath=path.slice(3)||'/';dePath=path}
  else {enPath=path;dePath=path==='/'?'/de':'/de'+path}
  linkTag('alternate','en',SITE_ORIGIN+enPath);
  linkTag('alternate','de',SITE_ORIGIN+dePath);
  linkTag('alternate','x-default',SITE_ORIGIN+enPath);
}
function rich(heading,body,cls=''){
  const paras=body.split('\n').filter(Boolean).map(p=>`<p>${p}</p>`).join('');
  return `<section class="shop-rich ${cls}"><div class="shop-rich-inner">${heading?`<h2>${heading}</h2>`:''}${paras}</div></section>`;
}
function carousel(images,labels=[]){
  return `<section class="shop-slideshow" data-carousel><div class="slides">${images.map((im,i)=>`<figure class="slide ${i===0?'active':''}"><img ${i===0?`src="${webAsset(im)}"`:`data-src="${webAsset(im)}"`} alt="${labels[i]||'Samuel Nagler'}">${labels[i]?`<figcaption>${labels[i]}</figcaption>`:''}</figure>`).join('')}</div><button class="slide-prev" aria-label="${t.prev}">‹</button><button class="slide-next" aria-label="${t.next}">›</button><div class="slide-count"><span>1</span> / ${images.length}</div></section>`;
}
function featured(){
 const wanted=['Ancestor','Animals','Aqua','Argentum','Aura','Aurum','Beginning','Blossom'];
 const list=wanted.map(name=>products.find(p=>p.title===name)).filter(Boolean);
 const base=de?'/de/products/':'/products/';
 return `<section class="featured"><h2>${de?'Ausgewählte Produkte':'Featured products'}</h2><div class="featured-grid">${list.map(p=>`<a class="featured-card" href="${base+p.handle}"><img loading="lazy" src="${webAsset(p.images[0])}" alt="${p.title}"><h3>${p.title}</h3><div class="featured-price">${money(p.price)}</div></a>`).join('')}</div><a class="view-all" href="${de?'/de/collections/prints':'/collections/prints'}">${de?'Alle Produkte anzeigen':'View all products'}</a></section>`;
}
function home(){
 const hero=webAsset(site.hero);
 setMeta(
   de?'Samuel Nagler | Künstler & Tätowierer':'Samuel Nagler | Artist & Tattoo Artist',
   de?'Samuel Nagler – Künstler, Tätowierer und Auftragsmaler aus Berlin. Originale Kunstwerke, Biografie und Kontakt.':'Samuel Nagler – Berlin-based artist, tattoo artist and commission painter. Original artworks, biography and contact.',
   site.hero
 );
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
   ${carousel(early,de?['','','','','']:['Age 17','Age 20','Age 21','Age 21','Age 21'])}
   <section class="shop-rich milestones"><div class="shop-rich-inner">${de?
     '<p><strong>Mit:<br><br>21 Jahren</strong> kreierte er bereits beeindruckende realistische Kunst.</p><p><strong>22 Jahren </strong>arbeitete Samuel Nagler in einem der angesagtesten Studios Deutschlands – mit drei Standorten, eigener TV-Show und Convention.</p><p><strong>23 Jahren</strong> folgte eine Zusammenarbeit mit einem der berühmtesten Studios Deutschlands und im selben Jahr noch mit dem größten Tattoo-Studio der Welt.</p><p><strong>24 Jahren </strong>verkaufte er seine Werke bereits national und international.<br><br><strong>25 Jahren</strong> eröffnete er sein Atelier in Berlin Schöneberg, wo er eine neue Technik in der abstrakten Kunst entwickelte.</p><p>Heute steht sein Name für Perfektion, künstlerische Tiefe und unverwechselbares Aussehen.</p>':
     '<p><strong>At:<br><br>21 years old</strong> he was already creating impressive realistic art.</p><p><strong>22 years old </strong>Samuel Nagler was working in one of the most sought after studio in Germany - with three locations, own TV show and convention.</p><p><strong>23 years old</strong> he collaborated with one of the most famous studio in Germany and in the same year with the biggest tattoo studio in the world.</p><p><strong>24 years old </strong>Samuel was selling his work nationally and internationally.<br><br><strong>25 years old</strong> he opened his atelier in Berlin Schöneberg where he developed an unseen technique in abstract art.</p><p>Today, his name stands for perfection, artistic depth, and a distinctive appearance.</p>'
   }</div></section>
   ${carousel(age25)}
   <section class="shop-rich age-label"><div class="shop-rich-inner"><p>Age 25</p></div></section>
   <section class="shop-rich paintings-copy"><div class="shop-rich-inner">${de?
     '<p>Alle Bilder sind unterschiedlich aufhängbar, wodurch sich <strong>Wirkung und Aussehen komplett verändern lassen</strong>. Sie spielen mit Licht, Perspektive und Bewegung, wirken mal entspannend, mal energetisch, mal fließend, mal brennend. Kunst, die nicht nur betrachtet, sondern erlebt wird.</p><p>Die Serien sind abgeschlossene Werkreihen, jede mit individueller künstlerischer Handschrift. Es gibt keine Reproduktionen – jede Serie ist einzigartig und auf zehn Werke limitiert.</p>':
     '<p>All paintings can be hung in different ways <strong>completely changing its effect and appearance</strong>. They play with light, perspective and movement, sometimes relaxing, sometimes energetic, sometimes flowing, sometimes burning. Art that is not only viewed but experienced.</p><p>The series are complete, self-contained bodies of work, each with its own distinct artistic signature. There are no reproductions – each series is unique and limited to ten pieces.</p>'
   }</div></section>
   ${carousel(age26)}
   <section class="shop-rich age-label"><div class="shop-rich-inner"><p>Age 26</p></div></section>
   ${rich('CV',cv,'cv')}
   ${featured()}
 `;
}
function works(){
 setMeta(
   de?'Werke | Samuel Nagler':'Artworks | Samuel Nagler',
   de?'Originale Kunstwerke von Samuel Nagler. Abstrakte und realistische Arbeiten, Verfügbarkeit und Werkdetails.':'Original artworks by Samuel Nagler. Abstract and realistic works, availability and artwork details.',
   products[0]?.images?.[0]||site.hero
 );
 const base=de?'/de/products/':'/products/';
 const originalOrder=new Map(products.map((p,i)=>[p.handle,i]));
 const counts={inStock:products.filter(p=>p.available).length,outStock:products.filter(p=>!p.available).length};
 const PAGE_SIZE=16;
 const params=new URLSearchParams(location.search);
 let currentPage=Math.max(1,parseInt(params.get('page')||'1',10)||1);
 app.innerHTML=`
   <section class="page-head collection-head"><h1>${t.collectionTitle}</h1></section>
   <section class="collection-toolbar">
     <div class="toolbar-left">
       <span class="toolbar-label">${t.filter}</span>
       <label class="availability-filter"><span>${t.availabilityLabel}</span>
         <select id="availability-filter" aria-label="${t.availabilityLabel}">
           <option value="all">${t.reset}</option>
           <option value="in">${t.inStockLabel} (${counts.inStock})</option>
           <option value="out">${t.outStockLabel} (${counts.outStock})</option>
         </select>
       </label>
     </div>
     <div class="toolbar-right">
       <label for="sort-products">${t.sortLabel}</label>
       <select id="sort-products">
         <option value="relevant">${t.sortRelevant}</option>
         <option value="best">${t.sortBest}</option>
         <option value="az">${t.sortAZ}</option>
         <option value="za">${t.sortZA}</option>
         <option value="low">${t.sortLow}</option>
         <option value="high">${t.sortHigh}</option>
         <option value="old">${t.sortOld}</option>
         <option value="new" selected>${t.sortNew}</option>
       </select>
       <span id="product-count">${products.length} ${t.productsLabel}</span>
     </div>
   </section>
   <section class="products" id="products-grid"></section>
   <nav class="collection-pagination" id="collection-pagination" aria-label="${de?'Seitennummerierung':'Pagination'}"></nav>`;

 const setPageInUrl=page=>{
   const u=new URL(location.href);
   if(page<=1)u.searchParams.delete('page');else u.searchParams.set('page',String(page));
   history.replaceState({},'',u.pathname+(u.search?'?'+u.searchParams.toString():''));
 };
 const renderPagination=(totalPages)=>{
   const nav=document.getElementById('collection-pagination');
   if(totalPages<=1){nav.innerHTML='';return}
   nav.innerHTML=`<ul>
     ${currentPage>1?`<li><a class="page-arrow prev" href="?page=${currentPage-1}" aria-label="${t.prevPage}">‹</a></li>`:''}
     ${Array.from({length:totalPages},(_,i)=>i+1).map(n=>`<li><a class="page-number ${n===currentPage?'current':''}" ${n===currentPage?'aria-current="page"':''} href="${n===1?'?':'?page='+n}" data-page="${n}">${n}</a></li>`).join('')}
     ${currentPage<totalPages?`<li><a class="page-arrow next" href="?page=${currentPage+1}" aria-label="${t.nextPage}">›</a></li>`:''}
   </ul>`;
   nav.querySelectorAll('a[data-page],a.page-arrow').forEach(a=>a.addEventListener('click',e=>{
     e.preventDefault();
     const m=a.getAttribute('href').match(/page=(\d+)/);
     currentPage=m?parseInt(m[1],10):1;
     setPageInUrl(currentPage);
     renderGrid(true);
     document.querySelector('.collection-head')?.scrollIntoView({behavior:'smooth',block:'start'});
   }));
 };
 const renderGrid=(keepPage=false)=>{
   const filter=document.getElementById('availability-filter')?.value||'all';
   const sort=document.getElementById('sort-products')?.value||'new';
   let list=products.filter(p=>filter==='all'||(filter==='in'?p.available:!p.available));
   list=[...list];
   if(sort==='az')list.sort((a,b)=>a.title.localeCompare(b.title));
   else if(sort==='za')list.sort((a,b)=>b.title.localeCompare(a.title));
   else if(sort==='low')list.sort((a,b)=>a.price-b.price);
   else if(sort==='high')list.sort((a,b)=>b.price-a.price);
   else if(sort==='old')list.sort((a,b)=>new Date(a.publishedAt||0)-new Date(b.publishedAt||0));
   else if(sort==='new')list.sort((a,b)=>new Date(b.publishedAt||0)-new Date(a.publishedAt||0));
   else list.sort((a,b)=>(originalOrder.get(a.handle)||0)-(originalOrder.get(b.handle)||0));
   const totalPages=Math.max(1,Math.ceil(list.length/PAGE_SIZE));
   if(!keepPage)currentPage=1;
   if(currentPage>totalPages)currentPage=totalPages;
   setPageInUrl(currentPage);
   const pageItems=list.slice((currentPage-1)*PAGE_SIZE,currentPage*PAGE_SIZE);
   const grid=document.getElementById('products-grid');
   grid.innerHTML=pageItems.map(p=>`<a class="product-card" href="${base+p.handle}">
     <div class="product-image-wrap">
       <img loading="lazy" src="${webAsset(p.images[0])}" alt="${p.title}">
       ${!p.available?`<span class="sold-image-badge"><i></i>${de?'Verkauft':'Sold'}</span>`:''}
     </div>
     <div class="product-meta"><div class="product-title">${p.title}</div><div class="product-sub"><span>${money(p.price)}</span></div></div>
   </a>`).join('');
   document.getElementById('product-count').textContent=list.length+' '+t.productsLabel;
   renderPagination(totalPages);
   fixLinks();
 };
 document.getElementById('availability-filter').addEventListener('change',()=>renderGrid(false));
 document.getElementById('sort-products').addEventListener('change',()=>renderGrid(false));
 renderGrid(true);
}
function detail(handle){
 const p=products.find(x=>x.handle===handle);if(!p)return notfound();
 const desc=(de&&p.descriptionDe)?p.descriptionDe:p.description;
 const metaDescription=((desc||'Original artwork by Samuel Nagler').replace(/\s+/g,' ').trim()).slice(0,155);
 setMeta(p.title+' | Samuel Nagler',metaDescription,p.images[0]||site.hero);
 const paragraphs=(desc||'').split(/\n+/).filter(Boolean).map(x=>`<p>${x}</p>`).join('');
 const gallery=`<div class="product-gallery" data-product-gallery tabindex="0" aria-label="${de?'Bildergalerie':'Image gallery'} ${p.title}">
   <div class="product-gallery-stage">
     ${p.images.map((im,i)=>`<figure class="product-gallery-slide ${i===0?'active':''}" data-index="${i}">
       <img ${i===0?`src="${webAsset(im)}"`:`data-src="${webAsset(im)}"`} alt="${p.title}${i?' – '+(de?'Ansicht ':'view ')+(i+1):''}" draggable="false">
       ${!p.available?`<span class="sold-image-badge detail-sold"><i></i>${de?'Verkauft':'Sold'}</span>`:''}
     </figure>`).join('')}
     ${p.images.length>1?`<button class="product-prev" type="button" aria-label="${t.prev}">‹</button><button class="product-next" type="button" aria-label="${t.next}">›</button>`:''}
   </div>
   ${p.images.length>1?`<div class="product-gallery-counter"><span>1</span> / ${p.images.length}</div>`:''}
 </div>`;
 app.innerHTML=`<section class="detail"><div class="detail-media">${gallery}</div><div class="detail-copy"><a href="${de?'/de/collections/prints':'/collections/prints'}">← ${t.back}</a><h1>${p.title}</h1><div class="price">${money(p.price)}</div><div class="description">${paragraphs}</div><a class="link-btn" href="mailto:info@samuelnagler.com?subject=${encodeURIComponent((de?'Anfrage zu ':'Inquiry about ')+p.title)}">${t.inquire}</a></div></section>`;
}
function contact(){
 setMeta(
   de?'Kontakt | Samuel Nagler':'Contact | Samuel Nagler',
   de?'Kontakt zu Samuel Nagler für Kunstwerke, Auftragsarbeiten und weitere Anfragen.':'Contact Samuel Nagler about artworks, commissions and other inquiries.',
   site.logo
 );
 app.innerHTML=`<section class="contact-card"><h1>${t.contact}</h1><form onsubmit="event.preventDefault();const f=new FormData(this);const phone=f.get('phone')?('\\n'+(de?'Telefon: ':'Phone: ')+f.get('phone')):'';location.href='mailto:info@samuelnagler.com?subject='+encodeURIComponent(f.get('name')+' – Website')+'&body='+encodeURIComponent(f.get('message')+'\\n\\n'+f.get('email')+phone);"><label>Name<input name="name" required></label><label>${de?'E-Mail':'Email'}<input name="email" type="email" required></label><label>${de?'Telefonnummer':'Phone number'}<input name="phone" type="tel"></label><label>${t.comment}<textarea name="message" required></textarea></label><button type="submit">${t.send}</button></form><div class="small-note">${de?'Das Formular öffnet dein E-Mail-Programm; die Website speichert keine Formulardaten.':'The form opens your email client; this website stores no form data.'}</div></section>`;
}
function imprint(){
 setMeta(de?'Impressum | Samuel Nagler':'Legal notice | Samuel Nagler',de?'Impressum und Anbieterkennzeichnung von Samuel Nagler.':'Legal notice and provider information for Samuel Nagler.',site.logo);
 app.innerHTML=`<section class="contact-card legal-page">
   <h1>${de?'Impressum':'Impressum / Legal notice'}</h1>
   <h2>${de?'Angaben gemäß § 5 DDG':'Information pursuant to § 5 DDG'}</h2>
   <p><strong>Samuel Nagler</strong><br>Einzelunternehmer<br>Eresburgstraße 28<br>12103 Berlin<br>Deutschland</p>
   <h2>${de?'Kontakt':'Contact'}</h2>
   <p>E-Mail: <a href="mailto:info@samuelnagler.com">info@samuelnagler.com</a></p>
   <h2>${de?'Verantwortlich für den Inhalt':'Responsible for content'}</h2>
   <p>Samuel Nagler<br>Eresburgstraße 28<br>12103 Berlin</p>
   <h2>${de?'Urheberrecht':'Copyright'}</h2>
   <p>${de?'Die auf dieser Website veröffentlichten Bilder, Kunstwerke und Texte stammen – soweit nicht anders gekennzeichnet – von Samuel Nagler und sind urheberrechtlich geschützt. Eine Verwendung oder Vervielfältigung bedarf der vorherigen Zustimmung.':'Images, artworks and texts published on this website are, unless otherwise indicated, by Samuel Nagler and are protected by copyright. Use or reproduction requires prior permission.'}</p>
 </section>`;
}
function privacy(){
 setMeta(de?'Datenschutz | Samuel Nagler':'Privacy | Samuel Nagler',de?'Datenschutzerklärung für samuelnagler.com.':'Privacy policy for samuelnagler.com.',site.logo);
 app.innerHTML=`<section class="contact-card legal-page">
   <h1>${de?'Datenschutzerklärung':'Privacy policy'}</h1>
   <p><strong>${de?'Stand: September 2026':'Last updated: September 2026'}</strong></p>
   <h2>1. ${de?'Verantwortlicher':'Controller'}</h2>
   <p>Samuel Nagler<br>Eresburgstraße 28<br>12103 Berlin<br>Deutschland<br>E-Mail: <a href="mailto:info@samuelnagler.com">info@samuelnagler.com</a></p>
   <h2>2. ${de?'Hosting über GitHub Pages':'Hosting via GitHub Pages'}</h2>
   <p>${de?'Diese Website wird als statische Website über GitHub Pages bereitgestellt. Beim Aufruf der Website werden technisch notwendige Verbindungsdaten verarbeitet. GitHub dokumentiert insbesondere, dass die IP-Adresse von Besuchern zu Sicherheitszwecken protokolliert und gespeichert wird. Die Verarbeitung erfolgt zur sicheren und zuverlässigen Bereitstellung der Website auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. GitHub kann Daten auch außerhalb der Europäischen Union verarbeiten. Weitere Informationen finden sich in der Datenschutzerklärung von GitHub.':'This website is provided as a static website through GitHub Pages. When the site is accessed, technically necessary connection data is processed. GitHub states that visitors’ IP addresses are logged and stored for security purposes. Processing is based on Art. 6(1)(f) GDPR for the secure and reliable provision of the website. GitHub may also process data outside the European Union. Further information is available in GitHub’s privacy statement.'}</p>
   <p><a href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noreferrer">GitHub Privacy Statement</a></p>
   <h2>3. ${de?'Kontakt per E-Mail':'Contact by email'}</h2>
   <p>${de?'Wenn du per E-Mail Kontakt aufnimmst, werden die von dir übermittelten Daten zur Bearbeitung deiner Anfrage verarbeitet. Rechtsgrundlage ist – je nach Inhalt der Anfrage – Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche bzw. vertragliche Kommunikation) oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen). Das Kontaktformular dieser Website überträgt keine Daten an einen eigenen Webserver, sondern öffnet dein lokal eingerichtetes E-Mail-Programm.':'If you contact me by email, the data you provide is processed to handle your request. Depending on the nature of the request, the legal basis is Art. 6(1)(b) GDPR (pre-contractual or contractual communication) or Art. 6(1)(f) GDPR (legitimate interest in responding to inquiries). The contact form on this website does not transmit data to a separate web server; it opens your locally configured email application.'}</p>
   <h2>4. ${de?'Cookies, Tracking und eingebettete Dienste':'Cookies, tracking and embedded services'}</h2>
   <p>${de?'Diese Website verwendet derzeit keine eigenen Analyse- oder Marketing-Cookies, kein Web-Tracking und keine eingebetteten Drittanbieter-Inhalte wie YouTube, Google Maps oder externe Schriftarten. Externe Seiten – etwa Instagram – werden erst aufgerufen, wenn du den entsprechenden Link anklickst.':'This website currently uses no first-party analytics or marketing cookies, no web tracking and no embedded third-party content such as YouTube, Google Maps or externally hosted fonts. External sites such as Instagram are only contacted when you click the corresponding link.'}</p>
   <h2>5. ${de?'Speicherdauer':'Retention'}</h2>
   <p>${de?'Personenbezogene Daten werden nur so lange gespeichert, wie dies für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Auf die von GitHub für Sicherheitszwecke geführten Protokolle hat der Websitebetreiber keinen unmittelbaren Zugriff oder Einfluss auf die Speicherdauer.':'Personal data is stored only for as long as necessary for the relevant purpose or as required by statutory retention obligations. The website operator has no direct access to, or control over, GitHub’s security logs or their retention periods.'}</p>
   <h2>6. ${de?'Deine Rechte':'Your rights'}</h2>
   <p>${de?'Du hast nach Maßgabe der DSGVO insbesondere das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen bestimmte Verarbeitungen. Außerdem besteht ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde.':'Subject to the GDPR, you have in particular rights of access, rectification, erasure, restriction of processing, data portability and objection to certain processing. You also have the right to lodge a complaint with a data protection supervisory authority.'}</p>
   <h2>7. ${de?'Änderungen':'Changes'}</h2>
   <p>${de?'Diese Datenschutzerklärung wird angepasst, wenn sich die technische oder rechtliche Ausgestaltung der Website ändert.':'This privacy policy will be updated if the technical or legal configuration of the website changes.'}</p>
 </section>`;
}

function notfound(){setMeta('404 | Samuel Nagler',de?'Seite nicht gefunden.':'Page not found.',site.logo,'noindex,follow');app.innerHTML=`<div class="notfound"><h1>404</h1><p>${de?'Seite nicht gefunden.':'Page not found.'}</p><a class="link-btn" href="${de?'/de':'/'}">Home</a></div>`}
function initCarousels(){
 document.querySelectorAll('[data-carousel]').forEach(c=>{
   const slides=[...c.querySelectorAll('.slide')],count=c.querySelector('.slide-count span');let i=0;
   const loadSlide=k=>{const img=slides[k]?.querySelector('img[data-src]');if(img){img.src=img.dataset.src;img.removeAttribute('data-src')}};
   const show=n=>{i=(n+slides.length)%slides.length;loadSlide(i);loadSlide((i+1)%slides.length);slides.forEach((slide,k)=>slide.classList.toggle('active',k===i));count.textContent=i+1};
   loadSlide(1);
   c.querySelector('.slide-prev').addEventListener('click',()=>show(i-1));
   c.querySelector('.slide-next').addEventListener('click',()=>show(i+1));
 });
 document.querySelectorAll('[data-product-gallery]').forEach(g=>{
   const slides=[...g.querySelectorAll('.product-gallery-slide')],count=g.querySelector('.product-gallery-counter span');let i=0,touchStart=0;
   const load=k=>{const img=slides[k]?.querySelector('img[data-src]');if(img){img.src=img.dataset.src;img.removeAttribute('data-src')}};
   const show=n=>{
     if(!slides.length)return;
     i=(n+slides.length)%slides.length;load(i);load((i+1)%slides.length);load((i-1+slides.length)%slides.length);
     slides.forEach((slide,k)=>slide.classList.toggle('active',k===i));
     if(count)count.textContent=i+1;
   };
   if(slides.length>1){
     load(1);
     g.querySelector('.product-prev')?.addEventListener('click',()=>show(i-1));
     g.querySelector('.product-next')?.addEventListener('click',()=>show(i+1));
     g.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();show(i-1)}if(e.key==='ArrowRight'){e.preventDefault();show(i+1)}});
     g.addEventListener('touchstart',e=>{touchStart=e.changedTouches[0].clientX},{passive:true});
     g.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-touchStart;if(Math.abs(d)>45)show(d>0?i-1:i+1)},{passive:true});
   }
 });
}
function render(){if(path==='/'||path==='/de')home();else if(path.includes('/collections/prints')||path.includes('/collections/all')||path.includes('/collections/frontpage'))works();else if(path.includes('/pages/contact'))contact();else if(path.endsWith('/impressum')||path==='/impressum')imprint();else if(path.endsWith('/datenschutz')||path==='/datenschutz'||path.includes('/policies/privacy-policy'))privacy();else{const m=path.match(/\/products\/([^/]+)$/);m?detail(m[1]):notfound()}fixLinks();initCarousels()}
async function boot(){
 try{const r=await fetch(asset('/assets/products.json'),{cache:'no-store'});const d=await r.json();products=d.products;site=d.site}catch(e){app.innerHTML='<div class="notfound"><p>Content could not be loaded.</p></div>';return}
 setChrome();render();
 const menuBtn=document.querySelector('.menu-btn'),nav=document.querySelector('.site-header nav');if(menuBtn&&nav)menuBtn.addEventListener('click',()=>{nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',nav.classList.contains('open')?'true':'false')});
}
boot();