  (function() {
    window.addEventListener('scroll',()=>{
      const nav=document.getElementById('mainNav');
      if(nav) nav.classList.toggle('scrolled',window.scrollY>50);
      const st=document.getElementById('scrollTop');
      if(st) st.style.display=window.scrollY>400?'flex':'none';
    });
    const reveals=document.querySelectorAll('.reveal');
    const observer=new IntersectionObserver((entries)=>{
      entries.forEach((e,i)=>{
        if(e.isIntersecting){
          setTimeout(()=>e.target.classList.add('visible'),i*80);
          observer.unobserve(e.target);
        }
      });
    },{threshold:0.1});
    reveals.forEach(el=>observer.observe(el));
    const sections=document.querySelectorAll('section[id]');
    window.addEventListener('scroll',()=>{
      let cur='';
      sections.forEach(s=>{if(window.scrollY>=s.offsetTop-100)cur=s.id;});
      document.querySelectorAll('.nav-link').forEach(l=>{
        l.classList.toggle('active',l.getAttribute('href')===('#'+cur));
      });
    });
    const form = document.getElementById('contactForm');
    if(form){
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
        btn.disabled = true;
        const formData = new FormData(form);
        try {
          const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
          });
          if (response.ok) {
            const successDiv = document.getElementById('formSuccess');
            successDiv.style.display = 'block';
            btn.innerHTML = '<i class="fas fa-check me-2"></i> Sent Successfully!';
            btn.style.background = 'linear-gradient(135deg,#2e7d32,#43a047)';
            form.reset();
            setTimeout(() => {
              successDiv.style.display = 'none';
              btn.innerHTML = originalText;
              btn.style.background = '';
              btn.disabled = false;
            }, 5000);
          } else {
            throw new Error('Formspree error');
          }
        } catch (error) {
          btn.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i> Failed, try again';
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
          }, 3000);
        }
      });
    }
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click',e=>{
        const target=document.querySelector(a.getAttribute('href'));
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth',block:'start'});
          const collapse=document.getElementById('navMenu');
          if(collapse && collapse.classList.contains('show')){
            new bootstrap.Collapse(collapse).hide();
          }
        }
      });
    });
  })();
