document.addEventListener('DOMContentLoaded', () => {
  const projectData = {
    "WebPage Ders": { category: "web", languages: ["HTML", "CSS", "JavaScript"] },
    "Weather App": { category: "uygulama", languages: ["JavaScript"] },
    "SpaceX Meteor": { category: "oyun", languages: ["HTML", "CSS", "JavaScript"] },
    "PansionAppWPF": { category: "masaustu", languages: ["C#"] },
    "Kisisel Uygulama Kiti": { category: "uygulama", languages: ["Rust", "Node.js"] },
    "Todo List": { category: "web", languages: ["Node.js", "JavaScript"] },
    "Pansion Kayit Uygulamasi": { category: "web", languages: ["C#", "ASP.NET Core"] },
    "Cspacegame": { category: "console", languages: ["C"] },
    "C++ SpaceWars": { category: "oyun", languages: ["C++"] },
    "Cogrenci Kayit": { category: "console", languages: ["C"] },
    "LoginApp": { category: "web", languages: ["C#", "ASP.NET Core"] },
    "C++ Blackjack": { category: "console", languages: ["C++"] },
    "WPFgame": { category: "masaustu", languages: ["C#"] },
    "Quiz APP": { category: "oyun", languages: ["C++"] },
    "Auto Showroom Expo": { category: "uygulama", languages: ["JavaScript", "React Native"] }
  };

  document.querySelectorAll('img').forEach(img => img.setAttribute('loading', 'lazy'));

  const projectMeta = {
    "WebPage Ders": { categories: ["web", "uygulama"], newTitle: "Code Tutor", description: "HTML, CSS ve JavaScript öğrenmek için interaktif eğitim platformu." },
    "Weather App": { categories: ["uygulama", "web", "api"], newTitle: "WeatherNow", description: "OpenWeatherMap API kullanan gerçek zamanlı hava durumu uygulaması." },
    "SpaceX Meteor": { categories: ["oyun", "web"], newTitle: "Meteor Dodge", description: "Tarayıcıda oynanan uzayda meteor kaçış oyunu." },
    "PansionAppWPF": { categories: ["uygulama", "masaustu"], newTitle: "Pansion Manager WPF", description: "Pansiyon yönetimi için masaüstü uygulaması (C# WPF)." },
    "Kisisel Uygulama Kiti": { categories: ["uygulama", "web", "api"], newTitle: "Personal App Kit", description: "Kişisel projeler için Rust backend ve Node.js araç kiti." },
    "Todo List": { categories: ["uygulama", "web"], newTitle: "Node Todo", description: "Node.js ile yapılmış basit yapılacaklar listesi." },
    "Pansion Kayit Uygulamasi": { categories: ["uygulama", "web", "masaustu", "api"], newTitle: "Pansion Registration System", description: "ASP.NET Core Web API ile hem masaüstü hem web pansiyon kayıt sistemi." },
    "Cspacegame": { categories: ["oyun", "console"], newTitle: "C Space Shooter", description: "C dilinde yazılmış retro uzay nişancı oyunu." },
    "C++ SpaceWars": { categories: ["oyun", "console"], newTitle: "C++ Space Wars", description: "C++ ile geliştirilmiş uzay savaşları oyunu." },
    "Cogrenci Kayit": { categories: ["uygulama", "console"], newTitle: "C Student Registry", description: "C dilinde öğrenci kayıt otomasyonu." },
    "LoginApp": { categories: ["uygulama", "web"], newTitle: "ASP.NET Login", description: "ASP.NET Core MVC + SQLite ile kullanıcı kayıt ve game control uygulaması." },
    "C++ Blackjack": { categories: ["oyun", "console"], newTitle: "C++ Blackjack", description: "Terminal tabanlı C++ blackjack oyunu." },
    "WPFgame": { categories: ["oyun", "masaustu"], newTitle: "WPF Retro Game", description: "C# WPF ile geliştirilmiş retro arcade oyunu." },
    "Quiz APP": { categories: ["oyun", "uygulama", "console"], newTitle: "Quiz Master", description: "Öğretmen ve öğrenci girişi olan dil öğrenme uygulaması. " },
    "Auto Showroom Expo": { categories: ["uygulama", "web", "mobil"], newTitle: "Auto Showroom Expo", description: "Expo ve React Native ile geliştirilen araç showroom uygulaması." }
  };

  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    const title = card.querySelector('h2')?.innerText.trim();
    const info = projectData[title];

    if (info) {
      const meta = projectMeta[title] || {};
      const categories = (meta.categories ?? [info.category]).filter(Boolean);
      card.dataset.categories = categories.join(',');

      if (meta.newTitle) {
        card.querySelector('h2').innerText = meta.newTitle;
      }
      if (meta.description) {
        card.querySelector('p').innerText = meta.description;
      }

      const badgesWrapper = document.createElement('div');
      badgesWrapper.className = 'badges';
      info.languages.forEach(lang => {
        const span = document.createElement('span');
        span.className = 'badge';
        span.innerText = lang;
        badgesWrapper.appendChild(span);
      });
      const linkElem = card.querySelector('a');
      card.insertBefore(badgesWrapper, linkElem);
    }
  });

  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.filter-btn.active')?.classList.remove('active');
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const categories = card.dataset.categories.split(',');
        const show = filter === 'all' || categories.includes(filter);
        card.style.display = show ? 'flex' : 'none';
      });
    });
  });

  const imageModal = document.getElementById('image-modal');
  const modalImg = imageModal?.querySelector('.modal-img');
  const closeBtn = imageModal?.querySelector('.close-btn');

  document.addEventListener('click', (e) => {
    const img = e.target.closest('.project-card img');
    if (img && modalImg && imageModal) {
      modalImg.src = img.src;
      imageModal.classList.add('open');
    }
  });

  closeBtn?.addEventListener('click', () => imageModal.classList.remove('open'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') imageModal?.classList.remove('open');
  });

  imageModal?.addEventListener('click', (e) => {
    if (e.target === imageModal) imageModal.classList.remove('open');
  });
});
