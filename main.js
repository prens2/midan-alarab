/**
 * ميدان العرب - الملف الرئيسي للجافاسكريبت
 * ⚽ الموقع الرياضي العربي الشامل
 */

console.log('%c⚽ ميدان العرب %c- جاهز للتشغيل!', 
    'color: #1E5631; font-size: 16px; font-weight: bold;', 
    'color: #666; font-size: 14px;');

// ===== ثوابت وأعداد =====
const SITE_CONFIG = {
    name: 'ميدان العرب',
    version: '1.0.0',
    author: 'فريق ميدان العرب',
    colors: {
        primary: '#1E5631',
        secondary: '#C4A747',
        accent: '#2E7D32'
    }
};

// ===== وظائف المساعدة =====
const Utils = {
    /**
     * تنسيق التاريخ بالعربية
     */
    formatDate: function(date) {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return date.toLocaleDateString('ar-EG', options);
    },

    /**
     * تأثير اهتزاز بسيط للعنصر
     */
    shakeElement: function(element) {
        element.style.transform = 'translateX(5px)';
        setTimeout(() => {
            element.style.transform = 'translateX(0)';
        }, 100);
    },

    /**
     * نسخ النص للحافظة
     */
    copyToClipboard: function(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('تم نسخ النص: ' + text);
        });
    }
};

// ===== إدارة الأخبار =====
const NewsManager = {
    news: [
        {
            id: 1,
            title: 'فوز كبير للنادي الأهلي في دوري الأبطال',
            description: 'تغلب النادي الأهلي على منافسه بنتيجة 3-0 في إطار منافسات دوري أبطال آسيا.',
            category: 'دوري الأبطال',
            date: 'ديسمبر 5, 2024',
            icon: '🏆'
        },
        {
            id: 2,
            title: 'مفاجأة في الدوري السعودي',
            description: 'فوز غير متوقع لفريق الخليج على أحد الكبار في مباراة مثيرة.',
            category: 'الدوري السعودي',
            date: 'ديسمبر 4, 2024',
            icon: '🌟'
        },
        {
            id: 3,
            title: 'المنتخب الوطني يبدأ تحضيراته',
            description: 'بدأ المنتخب الوطني تدريباته استعداداً للبطولة القارية المقبلة.',
            category: 'منتخبات',
            date: 'ديسمبر 3, 2024',
            icon: '⚽'
        }
    ],

    /**
     * عرض الأخبار في الصفحة
     */
    displayNews: function() {
        const newsGrid = document.querySelector('.news-grid');
        if (!newsGrid) return;

        newsGrid.innerHTML = this.news.map(newsItem => `
            <article class="news-card" data-id="${newsItem.id}">
                <div class="news-image">${newsItem.icon}</div>
                <div class="news-content">
                    <div class="news-meta">
                        <span class="news-category">${newsItem.category}</span>
                        <span class="news-date">${newsItem.date}</span>
                    </div>
                    <h3 class="news-title">${newsItem.title}</h3>
                    <p class="news-desc">${newsItem.description}</p>
                    <a href="#" class="read-more" onclick="NewsManager.readMore(${newsItem.id})">
                        اقرأ المزيد →
                    </a>
                </div>
            </article>
        `).join('');
    },

    /**
     * عند النقر على اقرأ المزيد
     */
    readMore: function(newsId) {
        const newsItem = this.news.find(item => item.id === newsId);
        if (newsItem) {
            alert(`قراءة الخبر: ${newsItem.title}\n\n${newsItem.description}\n\nسيتم إضافة صفحة كاملة قريباً!`);
        }
    }
};

// ===== تأثيرات تفاعلية =====
const InteractiveEffects = {
    /**
     * إضافة تأثيرات التمرير الناعمة
     */
    initSmoothScrolling: function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    },

    /**
     * تأثيرات عند التمرير
     */
    initScrollEffects: function() {
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.boxShadow = '0 4px 12px rgba(30, 86, 49, 0.2)';
                navbar.style.backdropFilter = 'none';
            }
        });
    },

    /**
     * تأثيرات عند تحريك الماوس
     */
    initHoverEffects: function() {
        document.querySelectorAll('.news-card, .btn, .nav-links a').forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.cursor = 'pointer';
            });
        });
    }
};

// ===== العد التنازلي للمباريات =====
const MatchCountdown = {
    nextMatch: {
        team1: 'النادي الأهلي',
        team2: 'النادي الهلال',
        date: new Date('2024-12-10T20:00:00'),
        competition: 'دوري المحترفين'
    },

    /**
     * بدء العد التنازلي
     */
    startCountdown: function() {
        const countdownElement = document.createElement('div');
        countdownElement.className = 'match-countdown';
        countdownElement.innerHTML = `
            <div style="background: #1E5631; color: white; padding: 15px; border-radius: 10px; text-align: center; margin: 20px 0;">
                <h4>⏰ العد التنازلي للمباراة القادمة</h4>
                <p>${this.nextMatch.team1} vs ${this.nextMatch.team2}</p>
                <div id="countdown-timer" style="font-size: 1.5rem; font-weight: bold; color: #C4A747;"></div>
                <p style="font-size: 0.9rem; opacity: 0.8;">${this.nextMatch.competition}</p>
            </div>
        `;

        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.parentNode.insertBefore(countdownElement, heroSection.nextSibling);
            this.updateCountdown();
        }
    },

    /**
     * تحديث العد التنازلي
     */
    updateCountdown: function() {
        const timerElement = document.getElementById('countdown-timer');
        if (!timerElement) return;

        const update = () => {
            const now = new Date();
            const timeLeft = this.nextMatch.date - now;

            if (timeLeft <= 0) {
                timerElement.textContent = 'بدأت المباراة!';
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            timerElement.textContent = `${days} يوم ${hours} ساعة ${minutes} دقيقة ${seconds} ثانية`;
        };

        update();
        setInterval(update, 1000);
    }
};

// ===== تهيئة الموقع عند التحميل =====
document.addEventListener('DOMContentLoaded', function() {
    console.log(`%c${SITE_CONFIG.name} v${SITE_CONFIG.version}`, 
        `background: ${SITE_CONFIG.colors.primary}; color: white; padding: 5px 10px; border-radius: 3px;`);

    // عرض تاريخ اليوم
    const today = new Date();
    const dateElement = document.createElement('div');
    dateElement.className = 'current-date';
    dateElement.style.textAlign = 'center';
    dateElement.style.margin = '10px 0';
    dateElement.style.color = '#666';
    dateElement.innerHTML = `<small>📅 ${Utils.formatDate(today)}</small>`;
    
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.appendChild(dateElement);
    }

    // تهيئة المكونات
    NewsManager.displayNews();
    InteractiveEffects.initSmoothScrolling();
    InteractiveEffects.initScrollEffects();
    InteractiveEffects.initHoverEffects();
    
    // إضافة العد التنازلي (اختياري)
    // MatchCountdown.startCountdown();

    // رسالة ترحيب
    setTimeout(() => {
        console.log('%cمرحباً بك في عالم الرياضة العربية! ⚽', 'color: #2E7D32; font-weight: bold;');
    }, 1000);
});

// ===== وظائف عامة =====
window.toggleDarkMode = function() {
    document.body.classList.toggle('dark-mode');
    console.log('تم تبديل الوضع الليلي');
};

window.shareSite = function() {
    if (navigator.share) {
        navigator.share({
            title: 'ميدان العرب',
            text: 'موقع رياضي عربي رائع!',
            url: window.location.href
        });
    } else {
        Utils.copyToClipboard(window.location.href);
    }
};

// ===== معالجة الأخطاء =====
window.addEventListener('error', function(e) {
    console.error('حدث خطأ:', e.error);
});

// ===== حالة الاتصال =====
window.addEventListener('online', () => {
    console.log('%c✓ متصل بالإنترنت', 'color: green;');
});

window.addEventListener('offline', () => {
    console.log('%c✗ غير متصل بالإنترنت', 'color: red;');
    alert('فقدت الاتصال بالإنترنت. بعض المميزات قد لا تعمل.');
});