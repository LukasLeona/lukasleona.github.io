const CONFIG={weddingDate:'2027-09-26T16:30:00-04:00',title:'Eleanor & Julian Wedding',location:'Kiawah Island, South Carolina',description:'Join Eleanor and Julian for their wedding celebration at The Sanctuary on Kiawah Island.'};
const $=(s,c=document)=>c.querySelector(s);const $$=(s,c=document)=>[...c.querySelectorAll(s)];
const pad=n=>String(n).padStart(2,'0');
function updateCountdown(){const distance=new Date(CONFIG.weddingDate)-new Date();const safe=Math.max(0,distance);$('#days').textContent=String(Math.floor(safe/86400000)).padStart(3,'0');$('#hours').textContent=pad(Math.floor((safe%86400000)/3600000));$('#minutes').textContent=pad(Math.floor((safe%3600000)/60000));$('#seconds').textContent=pad(Math.floor((safe%60000)/1000));}
updateCountdown();setInterval(updateCountdown,1000);
const header=$('.site-header');const progress=$('#pageProgress');window.addEventListener('scroll',()=>{header.classList.toggle('scrolled',scrollY>90);const total=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${total?scrollY/total*100:0}%`;},{passive:true});
const menuToggle=$('#menuToggle'),mobileMenu=$('#mobileMenu');function closeMenu(){menuToggle.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');mobileMenu.classList.remove('open');document.body.style.overflow='';}
menuToggle.addEventListener('click',()=>{const open=!menuToggle.classList.contains('open');menuToggle.classList.toggle('open',open);menuToggle.setAttribute('aria-expanded',String(open));mobileMenu.classList.toggle('open',open);document.body.style.overflow=open?'hidden':'';});$$('#mobileMenu a').forEach(a=>a.addEventListener('click',closeMenu));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});$$('.reveal').forEach(el=>observer.observe(el));
function downloadCalendar(){const start='20270926T203000Z',end='20270927T033000Z';const text=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Midnight Rose//Wedding//EN','BEGIN:VEVENT',`DTSTART:${start}`,`DTEND:${end}`,`SUMMARY:${CONFIG.title}`,`LOCATION:${CONFIG.location}`,`DESCRIPTION:${CONFIG.description}`,'END:VEVENT','END:VCALENDAR'].join('\r\n');const blob=new Blob([text],{type:'text/calendar'});const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download='eleanor-julian-wedding.ics';link.click();URL.revokeObjectURL(link.href)}
$('#calendarHero').addEventListener('click',downloadCalendar);$('#calendarDetails').addEventListener('click',downloadCalendar);
const modal=$('#successModal');function showModal(eyebrow,title,message){$('#modalEyebrow').textContent=eyebrow;$('#modalTitle').textContent=title;$('#modalMessage').textContent=message;modal.showModal()}$$('.modal-close,.modal-action').forEach(b=>b.addEventListener('click',()=>modal.close()));modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
const lightbox=$('#lightbox'),lightboxImage=$('#lightboxImage');$$('.gallery-item').forEach(item=>item.addEventListener('click',()=>{lightboxImage.src=item.dataset.image;lightbox.showModal()}));$('.lightbox-close').addEventListener('click',()=>lightbox.close());lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close()});
$('#rsvpForm').addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;if(!form.checkValidity()){form.reportValidity();return}const name=$('#rsvpName').value.trim().split(' ')[0]||'Guest';const attending=$('#attendance').value==='yes';showModal(attending?'Seat confirmed':'Response received',attending?`We can’t wait, ${name}.`:`Thank you, ${name}.`,attending?'Your RSVP has been submitted. We look forward to celebrating by the sea with you.':'Your response has been received. You will be missed, and we are grateful you let us know.');form.reset()});
const STORAGE_KEY='midnightRoseGuestGifts';let memoryGifts=[];const giftGrid=$('#giftGrid'),giftCount=$('#giftCount');
const icons={home:'heart',kitchen:'gift',experience:'location',keepsake:'ring',cash:'gift'};
function escapeHtml(value){return String(value).replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]))}
function getGifts(){try{const stored=JSON.parse(localStorage.getItem(STORAGE_KEY));return Array.isArray(stored)?stored:memoryGifts}catch{return memoryGifts}}
function saveGifts(gifts){memoryGifts=gifts;try{localStorage.setItem(STORAGE_KEY,JSON.stringify(gifts))}catch{}}
function renderGuestGifts(){giftGrid.querySelectorAll('.new-gift').forEach(el=>el.remove());const gifts=getGifts();gifts.forEach(g=>{const article=document.createElement('article');article.className='gift-card new-gift';article.dataset.id=g.id;const value=g.value?escapeHtml(g.value):'With love';article.innerHTML=`<div class="gift-art ${escapeHtml(g.category)}"><svg><use href="#i-${icons[g.category]||'gift'}"/></svg></div><div><span>${escapeHtml(g.category)}</span><h4>${escapeHtml(g.name)}</h4><p>Registered by ${escapeHtml(g.guest)}${g.note?` · ${escapeHtml(g.note)}`:''}</p></div><strong>${value}</strong><em>Guest added</em><button class="remove-gift" type="button" aria-label="Remove ${escapeHtml(g.name)}"><svg><use href="#i-trash"/></svg></button>`;giftGrid.prepend(article)});giftCount.textContent=`${6+gifts.length} gift${6+gifts.length===1?'':'s'}`;$$('.remove-gift',giftGrid).forEach(btn=>btn.addEventListener('click',()=>{const card=btn.closest('.gift-card');saveGifts(getGifts().filter(g=>g.id!==card.dataset.id));renderGuestGifts()}))}
renderGuestGifts();
$('#giftForm').addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;if(!form.checkValidity()){form.reportValidity();return}const gift={id:`gift-${Date.now()}`,guest:$('#giftGuest').value.trim(),name:$('#giftName').value.trim(),category:$('#giftCategory').value,value:$('#giftValue').value.trim(),note:$('#giftNote').value.trim()};const gifts=getGifts();gifts.unshift(gift);saveGifts(gifts);renderGuestGifts();showModal('Gift registered','How thoughtful.',`${gift.name} has been added to the registered-gifts list under ${gift.guest}.`);form.reset();setTimeout(()=>document.querySelector(`[data-id="${gift.id}"]`)?.scrollIntoView({behavior:'smooth',block:'center'}),250)});
$('#clearGuestGifts').addEventListener('click',()=>{if(!getGifts().length){showModal('Registry demo','Nothing to clear.','No guest-added gifts are currently stored in this browser.');return}memoryGifts=[];try{localStorage.removeItem(STORAGE_KEY)}catch{}renderGuestGifts();showModal('Registry reset','Guest gifts cleared.','The original demonstration gifts remain in the registry list.')});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(lightbox.open)lightbox.close();if(modal.open)modal.close();closeMenu()}});

// Keep the desktop navigation active state clear while scrolling.
const navigationLinks = $$('.desktop-nav a');
const trackedSections = navigationLinks
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const navigationObserver = new IntersectionObserver(entries => {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navigationLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`);
  });
}, { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.2, 0.45] });

trackedSections.forEach(section => navigationObserver.observe(section));
