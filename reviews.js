/* MEIY 2032 — design-fiction review scenarios and reader-local responses.
   No remote storage or real purchaser testimonials. */
(function(){
  'use strict';
  const root=document.querySelector('[data-reviews-product]');
  if(!root)return;
  const productId=root.getAttribute('data-reviews-product');
  const samples=(window.MEIY_CONCEPT_REVIEWS || {})[productId] || [];
  const key=`meiy-2032-reader-reflection-${productId}`;
  const list=root.querySelector('#review-list');
  const form=root.querySelector('[data-review-form]');
  const note=root.querySelector('#my-reflection');
  const status=root.querySelector('[data-review-status]');

  function elm(tag, cls, text){
    const node=document.createElement(tag);
    if(cls)node.className=cls;
    if(text!==undefined)node.textContent=text;
    return node;
  }
  function reviewCard(item,index,local=false){
    const card=elm('article','review-card');
    const top=elm('div','review-card-top');
    const avatar=elm('div','review-avatar',(item.name||'M').trim().charAt(0).toUpperCase());
    avatar.setAttribute('aria-hidden','true');
    const attribution=elm('div','review-attribution');
    attribution.append(elm('b',null,item.name));
    attribution.append(elm('small',null,local?'Your private reflection':`Imagined voice / ${String(index+1).padStart(2,'0')}`));
    top.append(avatar,attribution);
    const rating=Math.max(1,Math.min(5,Number(item.rating)||1));
    const stars=elm('div','review-card-stars', '★'.repeat(rating)+'☆'.repeat(5-rating));
    stars.setAttribute('aria-label',`${rating} out of 5 stars`);
    const title=elm('h4',null,item.title||'My thoughts on this object');
    const body=elm('p',null,item.body);
    card.append(top,stars,title,body);
    return card;
  }
  samples.forEach((item,i)=>list.append(reviewCard(item,i)));
  function readLocal(){
    try{
      const data=JSON.parse(localStorage.getItem(key)||'null');
      if(data && typeof data.name==='string' && typeof data.body==='string' && Number(data.rating)>=1 && Number(data.rating)<=5)return data;
    }catch{}
    return null;
  }
  function showLocal(){
    const data=readLocal();
    note.replaceChildren();
    note.hidden=!data;
    if(!data)return;
    const header=elm('p','eyebrow','SAVED IN THIS BROWSER');
    const card=reviewCard(data,0,true);
    const remove=elm('button','review-delete','Remove my reflection');
    remove.type='button';
    remove.addEventListener('click',()=>{
      try{localStorage.removeItem(key)}catch{}
      showLocal();
      status.textContent='Your local reflection has been removed.';
      form.reset();
    });
    note.append(header,card,remove);
  }
  form.addEventListener('submit',event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    const formData=new FormData(form);
    const name=String(formData.get('name')||'').trim().slice(0,48);
    const body=String(formData.get('body')||'').trim().slice(0,950);
    const rating=Number(formData.get('rating'));
    if(!name || body.length<20 || !Number.isInteger(rating) || rating<1 || rating>5){
      status.textContent='Add your initials, select a rating, and write at least 20 characters.';
      return;
    }
    try{
      localStorage.setItem(key,JSON.stringify({name,body,rating,title:'My thoughts on this object'}));
      status.textContent='Saved on this device. Your note is not public.';
      showLocal();
      note.scrollIntoView({block:'nearest',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    }catch{
      status.textContent='This browser cannot save local data. Your note has not been published.';
    }
  });
  showLocal();
})();
