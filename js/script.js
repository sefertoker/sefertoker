document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    if (slider) {
        const images = document.querySelectorAll('.slider-img');
        const prevBtn = document.querySelector('.slider-btn.prev');
        const nextBtn = document.querySelector('.slider-btn.next');
        let currentImageIndex = 0;
        let autoSlideInterval;

        function showImage(index) {
            images.forEach((img, i) => {
                img.classList.remove('active');
                if (i === index) {
                    img.classList.add('active');
                }
            });
        }

        function nextImage() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            showImage(currentImageIndex);
        }

        function prevImage() {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            showImage(currentImageIndex);
        }
        
        function startAutoSlide() {
            if (images.length > 1) {
                autoSlideInterval = setInterval(nextImage, 5000);
            }
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                stopAutoSlide();
                nextImage();
                startAutoSlide();
            });

            prevBtn.addEventListener('click', () => {
                stopAutoSlide();
                prevImage();
                startAutoSlide();
            });
        }
        
        if(images.length > 0) {
            showImage(currentImageIndex);
            startAutoSlide();
        }
    }


    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    const hamburger = document.querySelector('.hamburger');
    const navLinksList = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links li');

    if (hamburger && navLinksList) {
        hamburger.addEventListener('click', () => {
            navLinksList.classList.toggle('nav-active');

            document.body.classList.toggle('nav-open');

            navLinkItems.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            hamburger.classList.toggle('toggle');
        });
    }

    const themeToggleButton = document.querySelector('.theme-toggle');
    const body = document.body;

    // Güvenlik: target=_blank linklere rel ekle
    document.querySelectorAll('a[target="_blank"]').forEach(a => a.setAttribute('rel','noopener noreferrer'));

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            body.classList.toggle('light-mode');

            if (body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        });
    }
});
