/**
 * ميدان العرب - الوظائف الأساسية
 * @version 2.0 - وظائف أساسية فقط
 */

(function() {
    'use strict';
    
    console.log('⚽ ميدان العرب - جاهز للتشغيل');
    
    // وظائف المساعدة
    const Utils = {
        // تنسيق التاريخ
        formatDate: function(date) {
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
            };
            return date.toLocaleDateString('ar-SA', options);
        },
        
        // تنسيق الوقت
        formatTime: function(date) {
            return date.toLocaleTimeString('ar-SA', {
                hour: '2-digit',
                minute: '2-digit'
            });
        },
        
        // توليد لون عشوائي
        generateColor: function() {
            const colors = ['#1E5631', '#2E7D32', '#C4A747', '#D4B757', '#3E8D42'];
            return colors[Math.floor(Math.random() * colors.length)];
        }
    };
    
    // ===== عدادات متحركة =====
    function animateCounters() {
        const counters = document.querySelectorAll('.count');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current).toLocaleString();
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            
            setTimeout(updateCounter, 500);
        });
    }
    
    // ===== تغيير الأخبار العاجلة =====
    function rotateBreakingNews() {
        const breakingTexts = [
            "الأخبار العربية الحية من 16 دوري عربي مختلف",
            "مصادر موثوقة: يلا كورة، كووورة، في الجول",
            "تغطية شاملة لجميع البطولات العربية",
            "أخبار حقيقية بدون أي محتوى وهمي",
            "تحديث تلقائي كل 5 دقائق",
            "أخبار من السعودية، مصر، سوريا، فلسطين، والإمارات",
            "متابعة حصرية للدوري السعودي والمصري",
            "أخبار الدوريات العربية الناشئة"
        ];
        
        let breakingIndex = 0;
        const breakingElement = document.getElementById('breaking-text');
        
        if (breakingElement) {
            // تغيير الخبر كل 8 ثواني
            setInterval(() => {
                breakingIndex = (breakingIndex + 1) % breakingTexts.length;
                breakingElement.textContent = breakingTexts[breakingIndex];
                
                // إضافة تأثير التلاشي
                breakingElement.style.opacity = '0';
                setTimeout(() => {
                    breakingElement.style.transition = 'opacity 0.5s ease';
                    breakingElement.style.opacity = '1';
                }, 300);
            }, 8000);
        }
    }
    
    // ===== إدارة القائمة الجوال =====
    function setupMobileMenu() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
            });
            
            // إغلاق القائمة عند النقر على رابط
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.style.display = 'none';
                });
            });
            
            // إغلاق القائمة عند النقر خارجها
            document.addEventListener('click', (e) => {
                if (mobileMenu.style.display === 'flex' && 
                    !mobileMenu.contains(e.target) && 
                    !menuBtn.contains(e.target)) {
                    mobileMenu.style.display = 'none';
                }
            });
        }
    }
    
    // ===== إرسال نموذج الاتصال =====
    function setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;
                
                // هنا يمكنك إرسال البيانات إلى الخادم
                console.log('تم إرسال الرسالة:', { name, email, message });
                
                // إظهار رسالة نجاح
                showMessage('تم إرسال رسالتك بنجاح! سنرد عليك قريباً.', 'success');
                
                // إعادة تعيين النموذج
                contactForm.reset();
            });
        }
    }
    
    // ===== إظهار رسالة =====
    function showMessage(text, type = 'info') {
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        
        // إزالة الرسائل القديمة
        document.querySelectorAll('.site-message').forEach(msg => msg.remove());
        
        const message = document.createElement('div');
        message.className = 'site-message';
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 30px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 9999;
            background: ${colors[type] || colors.info};
            animation: slideDown 0.3s ease;
            max-width: 90%;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            text-align: center;
            direction: rtl;
        `;
        
        document.body.appendChild(message);
        
        // إضافة أنيميشن
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideDown {
                from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
                to { transform: translateX(-50%) translateY(0); opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateX(-50%) translateY(0); opacity: 1; }
                to { transform: translateX(-50%) translateY(-100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // إزالة الرسالة بعد 3 ثواني
        setTimeout(() => {
            message.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }
    
    // ===== تتبع التمرير للقائمة =====
    function setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollY >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}` || 
                    (current === '' && link.getAttribute('href') === '/')) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // ===== التهيئة عند تحميل الصفحة =====
    document.addEventListener('DOMContentLoaded', function() {
        console.log('✅ ميدان العرب - التهيئة الكاملة');
        
        // تحديث السنة في الفوتر
        document.getElementById('current-year').textContent = new Date().getFullYear();
        
        // تشغيل العدادات المتحركة
        animateCounters();
        
        // تشغيل الأخبار العاجلة
        rotateBreakingNews();
        
        // إعداد القائمة الجوال
        setupMobileMenu();
        
        // إعداد نموذج الاتصال
        setupContactForm();
        
        // إعداد تتبع التمرير
        setupScrollSpy();
        
        // إضافة تأثيرات للبطاقات
        setupCardHoverEffects();
        
        // إعداد التحديث التلقائي للمحتوى
        setupAutoRefresh();
        
        // إظهار رسالة ترحيب
        setTimeout(() => {
            showMessage('مرحباً بك في ميدان العرب! 🇸🇦⚽', 'success');
        }, 1500);
    });
    
    // ===== تأثيرات Hover للبطاقات =====
    function setupCardHoverEffects() {
        // إضافة تأثيرات لبطاقات الأخبار والمقالات
        const cards = document.querySelectorAll('.news-card, .article-card, .league-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
            });
        });
    }
    
    // ===== التحديث التلقائي =====
    function setupAutoRefresh() {
        // تحديث العداد كل 30 دقيقة
        setInterval(() => {
            const viewsCounter = document.querySelector('.count[data-target="25300"]');
            if (viewsCounter) {
                const current = parseInt(viewsCounter.textContent.replace(/,/g, ''));
                const increment = Math.floor(Math.random() * 10) + 1;
                viewsCounter.textContent = (current + increment).toLocaleString();
            }
        }, 1800000); // 30 دقيقة
    }
    
    // ===== جعل الدوال متاحة عالمياً =====
    window.Utils = Utils;
    window.showMessage = showMessage;
    
})();
