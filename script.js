document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. Dark Mode (com LocalStorage)
    // ==========================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });

    // ==========================================================================
    // 2. Header Glassmorphism no Scroll
    // ==========================================================================
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================================================
    // 3. Menu Mobile
    // ==========================================================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.add('active'));
    closeMenuBtn.addEventListener('click', () => mobileMenu.classList.remove('active'));
    
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.remove('active'));
    });

    // ==========================================================================
    // 4. FAQ Accordion
    // ==========================================================================
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.parentElement;
            const isActive = item.classList.contains('active');
            
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ==========================================================================
    // 5. Rastreamento de UTMs e WhatsApp Inteligente (Foco em Conversão)
    // ==========================================================================
    const urlParams = new URLSearchParams(window.location.search);
    let utmData = {};
    
    ['utm_source', 'utm_medium', 'utm_campaign'].forEach(param => {
        if (urlParams.has(param)) {
            utmData[param] = urlParams.get(param);
        }
    });

    if (Object.keys(utmData).length > 0) {
        localStorage.setItem('utm_data', JSON.stringify(utmData));
    }

    const savedUtm = JSON.parse(localStorage.getItem('utm_data') || '{}');
    let utmMessage = "Olá, vim pelo site e preciso de um orçamento de ferramentas.";
    
    if (savedUtm.utm_source) {
        utmMessage = `Olá, vim pelo site (Fonte: ${savedUtm.utm_source}) e preciso de um orçamento de ferramentas.`;
    }

    const waNumber = "55119719804022";
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(utmMessage)}`;

    // Atualiza todos os links do WhatsApp no site
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        if (!link.href.includes('gostaria%20de%20cotar')) {
            link.href = waLink;
        } else {
            let currentText = decodeURIComponent(link.href.split('text=')[1] || "");
            if (savedUtm.utm_source) {
                currentText += ` (Vim por: ${savedUtm.utm_source})`;
                link.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(currentText)}`;
            }
        }
    });

    // ==========================================================================
    // 6. Formulário Inteligente (Fallback Mailto/WA)
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const closeModal = document.querySelector('.close-modal');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const company = formData.get('company') || 'Não informada';
            const message = formData.get('message');

            const waText = `Olá, sou ${name} da empresa ${company}. \n\nDetalhes da necessidade:\n${message}`;
            const emailSubject = `Cotação Técnica Site - ${company}`;
            const emailBody = `Nome: ${name}\nEmpresa: ${company}\n\nMensagem:\n${message}`;

            document.getElementById('modal-wa-link').href = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;
            document.getElementById('modal-email-link').href = `mailto:segura.comercial777@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

            successModal.classList.add('show');
            contactForm.reset();
            
            trackEvent('form_submit', 'contact_form');
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => successModal.classList.remove('show'));
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === successModal) successModal.classList.remove('show');
    });

    // ==========================================================================
    // 7. Banner de Cookies LGPD e Controle de Scripts
    // ==========================================================================
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');
    
    if (!localStorage.getItem('cookie_consent')) {
        setTimeout(() => cookieBanner.classList.add('show'), 1500);
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'accepted');
        cookieBanner.classList.remove('show');
        enableTracking();
    });

    rejectBtn.addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'rejected');
        cookieBanner.classList.remove('show');
    });

    // Função de rastreamento segura (Respeita LGPD)
    window.trackEvent = function(eventName, category) {
        const consent = localStorage.getItem('cookie_consent');
        if (consent === 'accepted') {
            if (typeof gtag !== 'undefined') {
                gtag('event', eventName, { 'event_category': category });
            }
            if (typeof fbq !== 'undefined') {
                fbq('trackCustom', eventName);
            }
            console.log(`[Tracking Permitido] ${eventName} disparado.`);
        } else {
            console.log(`[Tracking Bloqueado] ${eventName} não disparado por falta de consentimento LGPD.`);
        }
    };

    function enableTracking() {
        console.log("Consentimento LGPD dado. Scripts de marketing ativados.");
    }
});