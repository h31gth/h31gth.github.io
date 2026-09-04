/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  function eclipse() {
    let A = document.querySelector("[data-exe-visor]");
    if (!A)
        return;
    m.set(A, {
        clipPath: "ellipse(70% 0% at 50% 0%)"
    }),
    m.to(A, {
        clipPath: "ellipse(70% 100% at 50% 0%)",
        ease: "none",
        scrollTrigger: {
            trigger: A,
            start: "top bottom",
            end: "bottom center",
            scrub: !0
        }
    })
  }
  window.addEventListener("load", eclipse);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2500
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);
  
  /**
   * Theme-switch
   */
  let darkmode = localStorage.getItem('dark-background')
  const themeSwitch = document.getElementById('theme-switch')
  const enableDarkmode = () => {
  document.body.classList.add('dark-background')
  localStorage.setItem('dark-background', 'active')
  }

  const disableDarkmode = () => {
  document.body.classList.remove('dark-background')
  localStorage.setItem('dark-background', null)
  }

  if(darkmode === "active") enableDarkmode()

  themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('dark-background')
    darkmode !== "active" ? enableDarkmode() : disableDarkmode()
  })

  /**
   * Design-skill-section
   */

  document.querySelectorAll('.skill-item').forEach(item => {
  const iconWrap = item.querySelector('.skill-icon-wrap');

  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -18; // maksimal miring 18deg
    const rotateY = ((x - centerX) / centerX) * 18;

    iconWrap.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(24px) scale(1.32)`;
    });    

    item.addEventListener('mouseleave', () => {
      iconWrap.style.transform = ''; // balik netral, transition CSS yang handle smooth-nya
    });
  });

  /**
   * Design-project-section
   */

  // 3D tilt di project card — pakai custom property, BUKAN transform langsung
  // (biar gak bentrok sama transform lain, sesuai prinsip yang sudah dibahas)
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / rect.height) * -6;
      const rotateY = ((x - rect.width / 2) / rect.width) * 6;
      card.style.setProperty('--tilt-x', `${rotateX}deg`);
      card.style.setProperty('--tilt-y', `${rotateY}deg`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });

  // Modal detail project
  const modal = document.getElementById('projectModal');
  const modalImage = document.getElementById('modalImage');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalRole = document.getElementById('modalRole');
  const modalDuration = document.getElementById('modalDuration');
  const modalDesc = document.getElementById('modalDesc');
  const modalStack = document.getElementById('modalStack');
  const modalLive = document.getElementById('modalLive');
  const modalPdf = document.getElementById('modalPdf');

  const techLabels = {
    html5: 'HTML', css3: 'CSS', bootstrap: 'Bootstrap', tailwindcss: 'Tailwind',
    javascript: 'JavaScript', react: 'React', php: 'PHP', laravel: 'Laravel',
    mysql: 'MySQL', python: 'Python', csharp: 'C#'
  };

  document.querySelectorAll('.project-open-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const d = btn.dataset;

      modalImage.src = d.image;
      modalImage.alt = d.title;
      modalCategory.textContent = d.category || '';
      modalTitle.textContent = d.title || '';
      modalRole.textContent = d.role || '-';
      modalDuration.textContent = d.duration || '-';
      modalDesc.textContent = d.desc || '';

      modalStack.innerHTML = '';
      if (d.tech) {
        d.tech.split(',').forEach(t => {
          const key = t.trim();
          const span = document.createElement('span');
          span.innerHTML = `<i class="devicon-${key}-plain colored"></i> ${techLabels[key] || key}`;
          modalStack.appendChild(span);
        });
      }

      if (d.live) {
        modalLive.href = d.live;
        modalLive.style.display = 'inline-flex';
      } else {
        modalLive.style.display = 'none';
      }

      if (d.pdf) {
        modalPdf.href = d.pdf;
        modalPdf.style.display = 'inline-flex';
      } else {
        modalPdf.style.display = 'none';
      }

      openModal();
    });
  });

  function openModal() {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modal.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

   /**
   * Design-consol-log
    */  

  console.log(`%c
    __    __ __    __  ______  __    __ __    __ __       
  |  \\  |  \\  \\  |  \\/      \\|  \\  |  \\  \\  |  \\  \\      
  | ▓▓  | ▓▓ ▓▓  | ▓▓  ▓▓▓▓▓▓\\ ▓▓\\ | ▓▓ ▓▓  | ▓▓ ▓▓      
  | ▓▓__| ▓▓ ▓▓  | ▓▓ ▓▓___\\▓▓ ▓▓▓\\| ▓▓ ▓▓  | ▓▓ ▓▓      
  | ▓▓    ▓▓ ▓▓  | ▓▓\\▓▓    \\| ▓▓▓▓\\ ▓▓ ▓▓  | ▓▓ ▓▓      
  | ▓▓▓▓▓▓▓▓ ▓▓  | ▓▓_\\▓▓▓▓▓▓\\ ▓▓\\▓▓ ▓▓ ▓▓  | ▓▓ ▓▓      
  | ▓▓  | ▓▓ ▓▓__/ ▓▓  \\__| ▓▓ ▓▓ \\▓▓▓▓ ▓▓__/ ▓▓ ▓▓_____ 
  | ▓▓  | ▓▓\\▓▓    ▓▓\\▓▓    ▓▓ ▓▓  \\▓▓▓\\▓▓    ▓▓ ▓▓     \\
   \\▓▓   \\▓▓ \\▓▓▓▓▓▓  \\▓▓▓▓▓▓ \\▓▓   \\▓▓ \\▓▓▓▓▓▓ \\▓▓▓▓▓▓▓▓
  %c
    __    __  ______  _______  ______ _______  ______ ________ 
  |  \\  |  \\/      \\|       \\|      \\       \\|      \\        \\
  | ▓▓  | ▓▓  ▓▓▓▓▓▓\\ ▓▓▓▓▓▓▓\\\\▓▓▓▓▓▓ ▓▓▓▓▓▓▓\\\\▓▓▓▓▓▓ ▓▓▓▓▓▓▓▓
  | ▓▓__| ▓▓ ▓▓__| ▓▓ ▓▓__/ ▓▓ | ▓▓ | ▓▓__/ ▓▓ | ▓▓ | ▓▓__    
  | ▓▓    ▓▓ ▓▓    ▓▓ ▓▓    ▓▓ | ▓▓ | ▓▓    ▓▓ | ▓▓ | ▓▓  \\   
  | ▓▓▓▓▓▓▓▓ ▓▓▓▓▓▓▓▓ ▓▓▓▓▓▓▓\\ | ▓▓ | ▓▓▓▓▓▓▓\\ | ▓▓ | ▓▓▓▓▓   
  | ▓▓  | ▓▓ ▓▓  | ▓▓ ▓▓__/ ▓▓_| ▓▓_| ▓▓__/ ▓▓_| ▓▓_| ▓▓_____ 
  | ▓▓  | ▓▓ ▓▓  | ▓▓ ▓▓    ▓▓   ▓▓ \\ ▓▓    ▓▓   ▓▓ \\ ▓▓     \\
   \\▓▓   \\▓▓\\▓▓   \\▓▓\\▓▓▓▓▓▓▓ \\▓▓▓▓▓▓\\▓▓▓▓▓▓▓ \\▓▓▓▓▓▓\\▓▓▓▓▓▓▓▓
  %c%c`, "color: #31ff31; font: 100 1em monospace;", "", "background-color: #31ff31; color: black; font: 500 1em monospace; font-weight: bold;", "")

})();