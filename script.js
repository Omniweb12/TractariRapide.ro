// Smooth scroll functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }
    
    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow when scrolling
        if (scrollTop > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // CTA button tracking (console logging for analytics)
    const ctaButtons = document.querySelectorAll('.btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const buttonHref = this.getAttribute('href');
            
            // Log for analytics tracking
            console.log('CTA Button clicked:', {
                text: buttonText,
                href: buttonHref,
                timestamp: new Date().toISOString()
            });
            
            // Track phone calls
            if (buttonHref && buttonHref.startsWith('tel:')) {
                console.log('Phone call initiated:', buttonHref);
            }
            
            // Track WhatsApp clicks
            if (buttonHref && buttonHref.includes('wa.me')) {
                console.log('WhatsApp contact initiated:', buttonHref);
            }
        });
    });
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    const answer = item.querySelector('.faq-answer');
                    if (answer) {
                        answer.style.maxHeight = null;
                    }
                }
            });
            
            // Toggle current FAQ item
            if (!isActive) {
                faqItem.classList.add('active');
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
            } else {
                faqItem.classList.remove('active');
                faqAnswer.style.maxHeight = null;
            }
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .feature-card, .review-card, .zone-column');
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Phone number formatting and validation
    function formatPhoneNumber(phone) {
        // Remove all non-numeric characters except +
        const cleaned = phone.replace(/[^\d+]/g, '');
        
        // Format Romanian phone number
        if (cleaned.startsWith('+4') && cleaned.length === 12) {
            return cleaned.replace(/(\+4)(\d{2})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4 $5');
        }
        
        return phone;
    }
    
    // Format all phone numbers on the page
    const phoneElements = document.querySelectorAll('a[href^="tel:"]');
    phoneElements.forEach(element => {
        const phoneText = element.textContent.trim();
        if (phoneText && !phoneText.includes('Suna')) {
            element.textContent = formatPhoneNumber(phoneText);
        }
    });
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Error handling for failed image loads
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Failed to load image:', this.src);
            // Could add placeholder or retry logic here
        });
    });
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log('Page load time:', loadTime + 'ms');
        });
    }
    
    // Service Worker registration (for future PWA features)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            // Uncomment when service worker is ready
            // navigator.serviceWorker.register('/sw.js')
            //     .then(registration => console.log('SW registered'))
            //     .catch(error => console.log('SW registration failed'));
        });
    }
});

function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
      'send_to': 'AW-17610734718/ephQCLmf4qUbEP74uc1B',
      'transaction_id': '',
      'event_callback': callback
  });
  return false;
}
