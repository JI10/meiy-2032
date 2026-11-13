(function(){
  'use strict';
  const $=(sel,root=document)=>root.querySelector(sel);
  const $$=(sel,root=document)=>Array.from(root.querySelectorAll(sel));
  const products=window.MEIY_PRODUCTS||[];
  const find=id=>products.find(p=>p.id===id);
  const money=n=>'₹'+Number(n).toLocaleString('en-IN');
  const cartKey='meiy-2032-fixed-bag';
  let bag=[];
  try{const v=JSON.parse(localStorage.getItem(cartKey)||'[]');bag=Array.isArray(v)?v:[]}catch{}
  function save(){try{localStorage.setItem(cartKey,JSON.stringify(bag))}catch{}renderBag()}
  function toast(msg){const el=$('[data-toast]');if(!el)return;el.textContent=msg;el.classList.add('show');clearTimeout(window.meiyToast);window.meiyToast=setTimeout(()=>el.classList.remove('show'),2600)}
  function renderBag(){const count=bag.reduce((a,e)=>a+e.qty,0);$$('[data-bag-count]').forEach(el=>el.textContent=count);
    const entries=$('[data-cart-entries]');if(!entries)return;
    const base=document.querySelector('main[data-product-id]')?'../':'./';
    entries.innerHTML=bag.length?bag.map((e,i)=>{const p=find(e.id);if(!p)return '';return `<div class="cartentry"><img alt="" src="${base}assets/${p.card}"><div><h3>${p.title} · ${e.qty}</h3><p>${e.color} / ${e.texture}</p><strong>${money(p.price*e.qty)}</strong></div><button data-remove="${i}" aria-label="Remove ${p.title}">×</button></div>`}).join(''):'<p>Your bag is quiet. Explore a speculative object.</p>';
    $('[data-cart-total]').textContent='Subtotal: '+money(bag.reduce((a,e)=>a+(find(e.id)?.price||0)*e.qty,0));
    $$('[data-remove]',entries).forEach(b=>b.addEventListener('click',()=>{bag.splice(Number(b.dataset.remove),1);save()}));
  }
  function openBag(){document.body.classList.add('bag-open')}
  function closeBag(){document.body.classList.remove('bag-open')}
  $$('[data-open-bag]').forEach(b=>b.addEventListener('click',openBag));$$('[data-close-bag]').forEach(b=>b.addEventListener('click',closeBag));
  $('[data-concept-checkout]')?.addEventListener('click',()=>{closeBag();$('#concept-dialog')?.showModal()});$$('[data-close-dialog]').forEach(b=>b.addEventListener('click',()=>$('#concept-dialog')?.close()));
  $('[data-menu]')?.addEventListener('click',()=>{const nav=$('#navitems');const open=nav.classList.toggle('open');$('[data-menu]').setAttribute('aria-expanded',String(open))});
  $$('[data-add-bag]').forEach(b=>b.addEventListener('click',()=>{
    const id=b.dataset.addBag;const p=find(id);if(!p)return;
    const isDetail=Boolean($('main[data-product-id]'));
    const color=isDetail?($('[data-color-name]')?.textContent||'Ivory'):'Default';
    const texture=isDetail?($('[data-texture-name]')?.textContent||'Standard'):'Standard';
    const qty=isDetail?Number($('[data-qty]')?.textContent||'1'):1;
    const existing=bag.find(x=>x.id===id&&x.color===color&&x.texture===texture);
    if(existing)existing.qty+=qty;else bag.push({id,color,texture,qty});
    save();toast(p.title+' added to your bag');openBag();
  }));
  function filterProducts(){const filter=$('.filter.active')?.dataset.filter||'All';const q=($('#product-search')?.value||'').trim().toLowerCase();let visible=0;
    $$('#product-list .card').forEach(card=>{const ok=(filter==='All'||card.dataset.category===filter)&&(card.dataset.search||'').includes(q);card.hidden=!ok;if(ok)visible++});
    const empty=$('#empty-list');if(empty)empty.hidden=visible>0;
  }
  $$('[data-filter]').forEach(b=>b.addEventListener('click',()=>{$$('[data-filter]').forEach(el=>{el.classList.toggle('active',el===b);el.setAttribute('aria-pressed',String(el===b))});filterProducts()}));
  $('#product-search')?.addEventListener('input',filterProducts);
  $$('[data-jump-phones]').forEach(a=>a.addEventListener('click',()=>{try{sessionStorage.setItem('meiy-nav-filter','Phones')}catch{}}));
  try{if(sessionStorage.getItem('meiy-nav-filter')==='Phones'&&$('#product-list')){sessionStorage.removeItem('meiy-nav-filter');$('[data-filter="Phones"]')?.click()}}catch{}
  const main=$('[data-main-image]');if(main){
    const id=$('main[data-product-id]')?.dataset.productId;
    const film=$('[data-main-video]');
    const returnMotion=$('[data-return-video]');
    const arrows=$('.motion-hero .image-nav');
    let stage=1;
    function showMotion(){
      if(!film)return;
      main.hidden=true;
      film.hidden=false;
      if(returnMotion)returnMotion.hidden=true;
      if(arrows)arrows.hidden=true;
      const marker=$('[data-frame-count]');if(marker)marker.textContent='THE TRANSFORMATION / 2032';
      $$('[data-stage]').forEach(b=>{b.classList.remove('current');b.setAttribute('aria-pressed','false')});
      const cap=$('[data-stage-caption]');if(cap)cap.textContent='Observe the full movement, or select a frame above to inspect the material state.';
      const shouldReduce=window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
      if(!shouldReduce)film.play().catch(()=>{});
    }
    function setStage(n){
      stage=((n-1+600)%6)+1;
      if(film){film.pause();film.hidden=true;}
      main.hidden=false;
      main.src=`../assets/${id}-${stage}.webp`;
      main.alt=`${id} transformation stage ${stage} of 6`;
      if(returnMotion)returnMotion.hidden=false;
      if(arrows)arrows.hidden=false;
      const marker=$('[data-frame-count]');if(marker)marker.textContent=`FRAME ${String(stage).padStart(2,'0')} / 06`;
      const stages=$$('[data-stage]');stages.forEach(b=>{const on=Number(b.dataset.stage)===stage;b.classList.toggle('current',on);b.setAttribute('aria-pressed',String(on))});
      const cap=$('[data-stage-caption]');if(cap)cap.textContent=stages[stage-1]?.getAttribute('aria-label')?.replace(/^View stage \d+: /,'')||'';
    }
    if(film){
      film.addEventListener('error',()=>setStage(1));
      if(window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches)film.pause();
      document.addEventListener('visibilitychange',()=>{if(document.hidden)film.pause()});
    }
    returnMotion?.addEventListener('click',showMotion);
    $$('[data-stage]').forEach(b=>b.addEventListener('click',()=>setStage(Number(b.dataset.stage))));
    $('[data-prev]')?.addEventListener('click',()=>setStage(stage-1));
    $('[data-next]')?.addEventListener('click',()=>setStage(stage+1));
    $$('[data-swatch]').forEach(b=>b.addEventListener('click',()=>{$$('[data-swatch]').forEach(e=>{e.classList.toggle('selected',e===b);e.setAttribute('aria-pressed',String(e===b))});$('[data-color-name]').textContent=b.dataset.swatch}));
    $$('[data-texture]').forEach(b=>b.addEventListener('click',()=>{$$('[data-texture]').forEach(e=>{e.classList.toggle('selected',e===b);e.setAttribute('aria-pressed',String(e===b))});$('[data-texture-name]').textContent=b.dataset.texture}));
    $('[data-minus]')?.addEventListener('click',()=>{const n=$('[data-qty]');n.textContent=Math.max(1,Number(n.textContent)-1)});
    $('[data-plus]')?.addEventListener('click',()=>{const n=$('[data-qty]');n.textContent=Math.min(20,Number(n.textContent)+1)});
  }
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeBag()});
  renderBag();
})();
