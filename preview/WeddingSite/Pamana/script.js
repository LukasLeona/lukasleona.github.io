(() => {
  const $ = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => [...c.querySelectorAll(s)];
  const body = document.body;
  const header = $('.site-header');
  const progress = $('.scroll-progress span');
  const backTop = $('.back-to-top');
  const menuButton = $('.menu-toggle');
  const mobileMenu = $('.mobile-menu');
  const cursor = $('.cursor-aura');

  // Header, progress, back-to-top
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 35);
    backTop.classList.toggle('show', y > 650);
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${max ? (y / max) * 100 : 0}%`;
  };
  onScroll(); addEventListener('scroll', onScroll, {passive:true});
  backTop.addEventListener('click', () => scrollTo({top:0, behavior:'smooth'}));

  // Mobile menu
  const closeMenu = () => {
    menuButton.classList.remove('open'); mobileMenu.classList.remove('open');
    menuButton.setAttribute('aria-expanded','false'); mobileMenu.setAttribute('aria-hidden','true'); body.classList.remove('menu-open');
  };
  menuButton.addEventListener('click', () => {
    const open = !mobileMenu.classList.contains('open');
    menuButton.classList.toggle('open', open); mobileMenu.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open)); mobileMenu.setAttribute('aria-hidden', String(!open)); body.classList.toggle('menu-open', open);
  });
  $$('.mobile-menu a').forEach(a => a.addEventListener('click', closeMenu));

  // Reveal animations
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  }), {threshold:.14, rootMargin:'0px 0px -40px'});
  $$('.reveal, .timeline').forEach(el => revealObserver.observe(el));

  // Active navigation
  const navLinks = $$('.nav-link');
  const sections = $$('main section[id]');
  const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  }), {rootMargin:'-35% 0px -58%'});
  sections.forEach(section => sectionObserver.observe(section));

  // Countdown
  const countdown = $('.countdown');
  const target = new Date(countdown.dataset.date).getTime();
  const updateCountdown = () => {
    const distance = Math.max(0, target - Date.now());
    const units = {
      days: Math.floor(distance / 86400000),
      hours: Math.floor(distance / 3600000) % 24,
      minutes: Math.floor(distance / 60000) % 60,
      seconds: Math.floor(distance / 1000) % 60
    };
    Object.entries(units).forEach(([key,value]) => {
      const el = $(`[data-unit="${key}"]`);
      const text = key === 'days' ? String(value).padStart(3,'0') : String(value).padStart(2,'0');
      if (el.textContent !== text) { el.animate([{opacity:.4, transform:'translateY(-4px)'},{opacity:1,transform:'none'}],{duration:260}); el.textContent=text; }
    });
  };
  updateCountdown(); setInterval(updateCountdown, 1000);

  // Parallax
  const heroImage = $('.hero-photo img');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    addEventListener('scroll', () => {
      const rect = $('.hero').getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < innerHeight) heroImage.style.transform = `scale(1.08) translateY(${window.scrollY * .045}px)`;
    }, {passive:true});
  }

  // Cursor aura and magnetic hover
  if (cursor && matchMedia('(pointer:fine)').matches) {
    addEventListener('mousemove', e => { cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`; });
    $$('a,button,.gallery-item').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    $$('.magnetic').forEach(el => {
      el.addEventListener('mousemove', e => { const r=el.getBoundingClientRect(); el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.14}px)`; });
      el.addEventListener('mouseleave', () => el.style.transform='');
    });
  }

  // Image tilt
  $$('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => { const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5; card.style.transform=`rotateY(${x*6}deg) rotateX(${-y*6}deg) rotate(2deg)`; });
    card.addEventListener('mouseleave', () => card.style.transform='rotate(2deg)');
  });

  // Scroll trigger buttons
  $$('[data-scroll]').forEach(btn => btn.addEventListener('click', () => $(btn.dataset.scroll)?.scrollIntoView({behavior:'smooth'})));

  // Calendar download
  $('#calendarButton').addEventListener('click', () => {
    const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Pamana Wedding//EN\nBEGIN:VEVENT\nUID:pamana-20260920@example.com\nDTSTAMP:20260801T000000Z\nDTSTART:20260920T070000Z\nDTEND:20260920T150000Z\nSUMMARY:Miguel & Isabella's Wedding\nLOCATION:The Orchard Garden, Tagaytay, Cavite, Philippines\nDESCRIPTION:Wedding ceremony and reception for Miguel and Isabella.\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([ics], {type:'text/calendar'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='miguel-isabella-wedding.ics'; a.click(); URL.revokeObjectURL(a.href);
  });

  // Modal helpers
  const modal = $('#successModal');
  const modalTitle = $('#modalTitle'); const modalMessage = $('#modalMessage');
  const openModal = (title,message) => { modalTitle.textContent=title; modalMessage.textContent=message; modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); body.classList.add('modal-open'); };
  const closeModal = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); body.classList.remove('modal-open'); };
  $$('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
  addEventListener('keydown', e => { if(e.key==='Escape'){ closeModal(); closeLightbox(); } });

  // RSVP
  const rsvpForm = $('#rsvpForm');
  const validate = form => {
    let okay=true;
    $$('[required]',form).forEach(field => { const bad=!field.value.trim(); field.classList.toggle('field-error',bad); if(bad) okay=false; field.addEventListener('input',()=>field.classList.remove('field-error'),{once:true}); });
    return okay;
  };
  rsvpForm.addEventListener('submit', e => {
    e.preventDefault(); if(!validate(rsvpForm)) return;
    const attending = new FormData(rsvpForm).get('attendance');
    openModal('Your RSVP has been received.', attending.includes('accepts') ? 'Thank you. We cannot wait to celebrate this beautiful day with you.' : 'Thank you for letting us know. You will be warmly remembered on our special day.');
    rsvpForm.reset();
  });

  // Gift registry with local storage
  const defaultGifts = [
    {id:'d1',giver:'Carlos & Anna',gift:'Air Fryer',category:'Kitchen',price:3500,note:'For your first Sunday brunch at home.'},
    {id:'d2',giver:'The Reyes Family',gift:'Dinnerware Set',category:'Home',price:5200,note:'For many meals shared together.'},
    {id:'d3',giver:'Ana & Paolo',gift:'Cash Gift',category:'Cash Gift',price:5000,note:'A little something for your honeymoon.'},
    {id:'d4',giver:'Liza Santos',gift:'Stand Mixer',category:'Kitchen',price:8900,note:'For sweet beginnings.'}
  ];
  const storageKey='pam-gifts-v1';
  let gifts;
  try { gifts=JSON.parse(localStorage.getItem(storageKey)) || defaultGifts; } catch { gifts=defaultGifts; }
  const iconFor = cat => ({Kitchen:'◫',Home:'⌂',Travel:'✈','Cash Gift':'₱',Experience:'♡',Other:'✦'}[cat]||'✦');
  const money = n => n ? `₱${Number(n).toLocaleString('en-PH')}` : '—';
  const renderGifts = () => {
    const list=$('#giftList'); list.innerHTML='';
    $('#giftCount').textContent=`${gifts.length} thoughtful gift${gifts.length===1?'':'s'}`;
    if(!gifts.length){list.innerHTML='<div class="empty-gifts">No gifts have been added yet. Be the first to share one.</div>';return;}
    gifts.forEach(g => {
      const item=document.createElement('article'); item.className='gift-item';
      item.innerHTML=`<span class="gift-icon">${iconFor(g.category)}</span><div class="gift-info"><strong>${escapeHTML(g.gift)}</strong><small>From ${escapeHTML(g.giver)}${g.note?` · ${escapeHTML(g.note)}`:''}</small></div><span class="gift-price">${money(g.price)}</span>${!String(g.id).startsWith('d')?`<button class="gift-remove" type="button" data-remove="${g.id}" aria-label="Remove ${escapeHTML(g.gift)}">×</button>`:'<span></span>'}`;
      list.appendChild(item);
    });
    $$('[data-remove]',list).forEach(btn=>btn.addEventListener('click',()=>{gifts=gifts.filter(g=>g.id!==btn.dataset.remove);saveGifts();renderGifts();}));
  };
  const saveGifts=()=>localStorage.setItem(storageKey,JSON.stringify(gifts));
  const escapeHTML = str => String(str).replace(/[&<>'"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  renderGifts();
  $('#giftForm').addEventListener('submit', e => {
    e.preventDefault(); const form=e.currentTarget; if(!validate(form)) return; const data=new FormData(form);
    const gift={id:`g${Date.now()}`,giver:data.get('giver').trim(),gift:data.get('gift').trim(),category:data.get('category'),price:data.get('price')||0,note:data.get('note').trim()};
    gifts.unshift(gift); saveGifts(); renderGifts(); form.reset();
    openModal('Your gift has been added.', `${gift.gift} now appears in the guest registry. Thank you, ${gift.giver}.`);
  });
  $('#clearGifts').addEventListener('click',()=>{if(confirm('Reset the demo registry to its original gifts?')){gifts=[...defaultGifts];saveGifts();renderGifts();}});

  // Gallery lightbox
  const galleryItems=$$('.gallery-item'); const lightbox=$('#lightbox'); const lightboxImg=$('img',lightbox); const lightboxCaption=$('figcaption',lightbox); let current=0;
  const showImage = index => { current=(index+galleryItems.length)%galleryItems.length; const item=galleryItems[current]; lightboxImg.src=item.dataset.image; lightboxImg.alt=$('img',item).alt; lightboxCaption.textContent=item.dataset.caption; };
  const openLightbox = index => {showImage(index);lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');body.classList.add('modal-open');};
  function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');body.classList.remove('modal-open');}
  galleryItems.forEach((item,index)=>item.addEventListener('click',()=>openLightbox(index)));
  $('.lightbox-close').addEventListener('click',closeLightbox); $('.lightbox-nav.prev').addEventListener('click',()=>showImage(current-1)); $('.lightbox-nav.next').addEventListener('click',()=>showImage(current+1));
  lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});

  // touch swipe in lightbox
  let startX=0; lightbox.addEventListener('touchstart',e=>startX=e.touches[0].clientX,{passive:true}); lightbox.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>50)showImage(current+(dx<0?1:-1));},{passive:true});
})();
