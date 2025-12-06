/**
 * ميدان العرب - الملف الرئيسي للجافاسكريبت
 * ⚽ الموقع الرياضي العربي الشامل - الإصدار المتوافق
 * الإصدار: 2.0.0 - متوافق مع التصميم الجديد
 */

// ===== تهيئة التطبيق =====
(function() {
    'use strict';
    
    console.log('%c⚽ ميدان العرب %c- جاهز للتشغيل!', 
        'color: #1E5631; font-size: 16px; font-weight: bold;', 
        'color: #666; font-size: 14px;');
    
    // ===== ثوابت التطبيق =====
    const APP_CONFIG = {
        name: 'ميدان العرب',
        version: '2.0.0',
        colors: {
            primary: '#1E5631',
            secondary: '#C4A747',
            accent: '#2E7D32'
        }
    };
    
    // ===== حالة التطبيق =====
    const appState = {
        isMobileMenuOpen: false,
        donationTotal: 1300,
        totalDonations: 0
    };
    
    // ===== مكتبة الأدوات المساعدة =====
    const Utils = {
        /**
         * تنسيق الأرقام العربية
         */
        formatNumber: function(number) {
            return new Intl.NumberFormat('ar-EG').format(number);
        },
        
        /**
         * عرض رسالة تنبيه
         */
        showToast: function(message, type = 'info') {
            const colors = {
                success: '#2E7D32',
                error: '#D32F2F',
                warning: '#F57C00',
                info: '#1976D2'
            };
            
            // إزالة الرسائل القديمة
            document.querySelectorAll('.custom-toast').forEach(toast => toast.remove());
            
            const toast = document.createElement('div');
            toast.className = 'custom-toast';
            toast.textContent = message;
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                left: 20px;
                padding: 12px 24px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 9999;
                background: ${colors[type] || colors.info};
                animation: toastIn 0.3s ease, toastOut 0.3s ease 2.7s;
                max-width: 400px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            `;
            
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        },
        
        /**
         * تأثير اهتزاز للعنصر
         */
        shakeElement: function(element) {
            element.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                element.style.animation = '';
            }, 500);
        }
    };
    
    // ===== إدارة القائمة الجوال =====
    const MobileMenuManager = {
        /**
         * تهيئة القائمة الجوال
         */
        init: function() {
            const menuBtn = document.querySelector('.mobile-menu-btn');
            if (!menuBtn) return;
            
            menuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggle();
            });
            
            // إغلاق القائمة عند النقر خارجها
            document.addEventListener('click', (e) => {
                if (appState.isMobileMenuOpen && 
                    !e.target.closest('.mobile-menu') && 
                    !e.target.closest('.mobile-menu-btn')) {
                    this.close();
                }
            });
            
            // إغلاق القائمة عند التمرير
            window.addEventListener('scroll', () => {
                if (appState.isMobileMenuOpen) {
                    this.close();
                }
            });
        },
        
        /**
         * تبديل حالة القائمة
         */
        toggle: function() {
            if (appState.isMobileMenuOpen) {
                this.close();
            } else {
                this.open();
            }
        },
        
        /**
         * فتح القائمة
         */
        open: function() {
            const mobileMenu = document.querySelector('.mobile-menu');
            const menuIcon = document.querySelector('.mobile-menu-btn i');
            
            if (!mobileMenu || !menuIcon) return;
            
            mobileMenu.style.display = 'flex';
            setTimeout(() => {
                mobileMenu.classList.add('active');
            }, 10);
            
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
            document.body.style.overflow = 'hidden';
            appState.isMobileMenuOpen = true;
        },
        
        /**
         * إغلاق القائمة
         */
        close: function() {
            const mobileMenu = document.querySelector('.mobile-menu');
            const menuIcon = document.querySelector('.mobile-menu-btn i');
            
            if (!mobileMenu || !menuIcon) return;
            
            mobileMenu.classList.remove('active');
            
            setTimeout(() => {
                mobileMenu.style.display = 'none';
            }, 300);
            
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
            document.body.style.overflow = '';
            appState.isMobileMenuOpen = false;
        }
    };
    
    // ===== إدارة المقالات =====
    const ArticleManager = {
        /**
         * بيانات المقالات
         */
        articles: {
            1: {
                title: "كيف تشاهد الدوري السعودي مجاناً وبجودة عالية؟",
                content: `
                    <h1>كيف تشاهد الدوري السعودي مجاناً وبجودة عالية؟</h1>
                    
                    <div class="article-meta">
                        <span class="article-category">الدوري السعودي</span>
                        <span class="article-date"><i class="far fa-clock"></i> ديسمبر 2024</span>
                        <span class="article-read-time"><i class="far fa-clock"></i> 5 دقائق قراءة</span>
                    </div>
                    
                    <div class="article-image-full">
                        <div style="background: linear-gradient(45deg, #1E5631, #2E7D32); height: 300px; display: flex; align-items: center; justify-content: center; color: white; font-size: 5rem; border-radius: 15px; margin: 2rem 0;">
                            📺
                        </div>
                    </div>
                    
                    <div class="article-body">
                        <h2>📺 الطرق المجانية القانونية</h2>
                        
                        <h3>1. يوتيوب الرسمي</h3>
                        <p>قناة SSC الرسمية على يوتيوب تنشر ملخصات كاملة للمباريات مع تعليق عربي احترافي.</p>
                        <ul>
                            <li>✅ ملخصات كاملة للمباريات</li>
                            <li>✅ أفضل اللحظات والأهداف</li>
                            <li>✅ تعليق عربي احترافي</li>
                            <li>✅ مجاني 100%</li>
                        </ul>
                        
                        <h3>2. تطبيق Shahid (تجربة مجانية)</h3>
                        <p>يقدم تطبيق Shahid تجربة مجانية لمدة 7 أيام تشمل جميع مباريات الدوري السعودي.</p>
                        
                        <h3>3. البث الأرضي</h3>
                        <p>القنوات الأرضية المجانية تبث أهم مباريات الدوري السعودي مباشرة.</p>
                        
                        <h2>💡 نصائح احترافية</h2>
                        <p>1. استخدم VPN للدول المجاورة التي تبث المباريات مجاناً</p>
                        <p>2. تابع صفحات الفرق الرسمية على وسائل التواصل</p>
                        <p>3. اشترك في تنبيهات المباريات عبر تطبيقات الرياضة</p>
                        
                        <h2>❌ ما تتجنبه</h2>
                        <p>- المواقع غير القانونية (مخاطر أمنية)</p>
                        <p>- الروابط المشبوهة (فيروسات)</p>
                        <p>- البث المتقطع (يخرب متعة المباراة)</p>
                        
                        <div class="article-tags">
                            <span class="tag">الدوري السعودي</span>
                            <span class="tag">مشاهدة مجانية</span>
                            <span class="tag">نصائح</span>
                            <span class="tag">رياضة</span>
                        </div>
                    </div>
                `
            },
            2: {
                title: "السر وراء أجور نجوم الدوري السعودي",
                content: `
                    <h1>السر وراء أجور نجوم الدوري السعودي</h1>
                    
                    <div class="article-meta">
                        <span class="article-category">تحليل</span>
                        <span class="article-date"><i class="far fa-clock"></i> ديسمبر 2024</span>
                        <span class="article-read-time"><i class="far fa-clock"></i> 7 دقائق قراءة</span>
                    </div>
                    
                    <div class="article-body">
                        <p>تحليل مفصل لهيكل الرواتب والمكافآت في الدوري السعودي...</p>
                        <!-- محتوى المقال الكامل -->
                    </div>
                `
            },
            3: {
                title: "تاريخ الكرة السعودية: من البداية إلى العالمية",
                content: `
                    <h1>تاريخ الكرة السعودية: من البداية إلى العالمية</h1>
                    
                    <div class="article-meta">
                        <span class="article-category">تاريخ</span>
                        <span class="article-date"><i class="far fa-clock"></i> ديسمبر 2024</span>
                        <span class="article-read-time"><i class="far fa-clock"></i> 10 دقائق قراءة</span>
                    </div>
                    
                    <div class="article-body">
                        <p>رحلة تطور كرة القدم السعودية عبر العقود...</p>
                        <!-- محتوى المقال الكامل -->
                    </div>
                `
            }
        },
        
        /**
         * عرض المقال الكامل
         */
        showFullArticle: function(articleId) {
            const article = this.articles[articleId];
            if (!article) {
                Utils.showToast('المقال غير موجود', 'error');
                return;
            }
            
            const modal = document.getElementById('articleModal');
            const content = document.getElementById('articleContent');
            
            if (!modal || !content) {
                Utils.showToast('حدث خطأ في تحميل المقال', 'error');
                return;
            }
            
            content.innerHTML = article.content;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // إضافة حدث لإغلاق النافذة
            const closeBtn = modal.querySelector('.close-article-modal');
            if (closeBtn) {
                closeBtn.onclick = () => this.closeArticle();
            }
            
            // إغلاق بالنقر خارج النافذة
            modal.onclick = (e) => {
                if (e.target === modal) {
                    this.closeArticle();
                }
            };
            
            // إغلاق بـ ESC
            const closeOnEsc = (e) => {
                if (e.key === 'Escape') {
                    this.closeArticle();
                    document.removeEventListener('keydown', closeOnEsc);
                }
            };
            document.addEventListener('keydown', closeOnEsc);
        },
        
        /**
         * إغلاق نافذة المقال
         */
        closeArticle: function() {
            const modal = document.getElementById('articleModal');
            if (!modal) return;
            
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
                modal.style.opacity = '1';
                document.body.style.overflow = '';
            }, 300);
        }
    };
    
    // ===== إدارة التبرعات =====
    const DonationManager = {
        /**
         * عرض نافذة التبرع
         */
        showDonation: function() {
            const modal = document.getElementById('donationModal');
            if (!modal) return;
            
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // إخفاء معلومات البنك
            const bankInfo = document.getElementById('bankInfo');
            if (bankInfo) {
                bankInfo.style.display = 'none';
            }
        },
        
        /**
         * إغلاق نافذة التبرع
         */
        closeDonation: function() {
            const modal = document.getElementById('donationModal');
            if (!modal) return;
            
            modal.style.display = 'none';
            document.body.style.overflow = '';
        },
        
        /**
         * التبرع بمبلغ محدد
         */
        donate: function(amount) {
            if (!amount || amount <= 0) {
                Utils.showToast('الرجاء إدخال مبلغ صحيح', 'error');
                return;
            }
            
            this.showDonation();
            Utils.showToast(`شكراً لدعمك بمبلغ ${amount}$! اختر طريقة الدفع`, 'success');
        },
        
        /**
         * التبرع بمبلغ مخصص
         */
        donateCustom: function() {
            const amountInput = document.getElementById('custom-amount');
            if (!amountInput) return;
            
            const amount = parseInt(amountInput.value);
            if (!amount || amount <= 0) {
                Utils.shakeElement(amountInput);
                Utils.showToast('الرجاء إدخال مبلغ صحيح', 'error');
                return;
            }
            
            this.donate(amount);
            amountInput.value = '';
        },
        
        /**
         * عرض معلومات البنك
         */
        showBankInfo: function() {
            const bankInfo = document.getElementById('bankInfo');
            if (bankInfo) {
                bankInfo.style.display = 'block';
            }
        },
        
        /**
         * محاكاة الدفع
         */
        processPayment: function(method) {
            Utils.showToast(`جاري معالجة الدفع عبر ${method}...`, 'info');
            
            // محاكاة تأخير الدفع
            setTimeout(() => {
                this.closeDonation();
                appState.totalDonations += 1;
                Utils.showToast('تمت عملية الدفع بنجاح! شكراً لدعمك.', 'success');
                
                // تحديث شريط التقدم
                this.updateProgress();
            }, 1500);
        }
    };
    
    // ===== تأثيرات التمرير =====
    const ScrollManager = {
        /**
         * تهيئة تأثيرات التمرير
         */
        init: function() {
            // تأثير شريط التنقل
            window.addEventListener('scroll', () => this.handleNavbarScroll());
            
            // التمرير الناعم
            this.initSmoothScrolling();
        },
        
        /**
         * تأثير شريط التنقل عند التمرير
         */
        handleNavbarScroll: function() {
            const navbar = document.querySelector('.navbar');
            if (!navbar) return;
            
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(30, 86, 49, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = '';
                navbar.style.backdropFilter = '';
            }
        },
        
        /**
         * التمرير الناعم للروابط
         */
        initSmoothScrolling: function() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        // إغلاق القائمة الجوال إذا كانت مفتوحة
                        if (appState.isMobileMenuOpen) {
                            MobileMenuManager.close();
                        }
                        
                        // التمرير الناعم
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    };
    
    // ===== إدارة النماذج =====
    const FormManager = {
        /**
         * تهيئة النماذج
         */
        init: function() {
            this.initContactForm();
        },
        
        /**
         * تهيئة نموذج الاتصال
         */
        initContactForm: function() {
            const form = document.getElementById('contactForm');
            if (!form) return;
            
            form.addEventListener('submit', (e) => this.handleContactSubmit(e));
            
            // التحقق أثناء الكتابة
            form.querySelectorAll('input, textarea').forEach(input => {
                input.addEventListener('input', () => this.validateField(input));
            });
        },
        
        /**
         * التحقق من حقل
         */
        validateField: function(field) {
            const value = field.value.trim();
            let isValid = true;
            
            switch (field.id) {
                case 'name':
                    isValid = value.length >= 2;
                    break;
                case 'email':
                    isValid = Utils.validateEmail(value);
                    break;
                case 'message':
                    isValid = value.length >= 10;
                    break;
            }
            
            this.updateFieldStatus(field, isValid);
        },
        
        /**
         * تحديث حالة الحقل
         */
        updateFieldStatus: function(field, isValid) {
            field.classList.remove('is-valid', 'is-invalid');
            
            if (isValid && field.value.trim()) {
                field.classList.add('is-valid');
            } else if (!isValid && field.value.trim()) {
                field.classList.add('is-invalid');
            }
        },
        
        /**
         * معالجة إرسال نموذج الاتصال
         */
        handleContactSubmit: function(e) {
            e.preventDefault();
            
            const form = e.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // التحقق النهائي
            let isValid = true;
            form.querySelectorAll('input[required], textarea[required]').forEach(field => {
                this.validateField(field);
                if (field.classList.contains('is-invalid')) {
                    isValid = false;
                    Utils.shakeElement(field);
                }
            });
            
            if (!isValid) {
                Utils.showToast('يرجى تصحيح الأخطاء في النموذج', 'error');
                return;
            }
            
            // محاكاة الإرسال
            Utils.showToast('جاري إرسال رسالتك...', 'info');
            
            setTimeout(() => {
                form.reset();
                form.querySelectorAll('input, textarea').forEach(field => {
                    field.classList.remove('is-valid');
                });
                Utils.showToast('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
            }, 1500);
        }
    };
    
    // ===== العدادات المتحركة =====
    const CounterManager = {
        /**
         * تهيئة العدادات
         */
        init: function() {
            this.animateCounters();
        },
        
        /**
         * تحريك العدادات
         */
        animateCounters: function() {
            const counters = document.querySelectorAll('.count[data-target]');
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.floor(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = Utils.formatNumber(target);
                    }
                };
                
                // بدء العد بعد تأخير
                setTimeout(updateCounter, 500);
            });
        }
    };
    
    // ===== الأخبار العاجلة المتحركة =====
    const BreakingNewsManager = {
        /**
         * تهيئة الأخبار العاجلة
         */
        init: function() {
            this.rotateBreakingNews();
        },
        
        /**
         * تدوير الأخبار العاجلة
         */
        rotateBreakingNews: function() {
            const breakingElement = document.getElementById('breaking-text');
            if (!breakingElement) return;
            
            const newsItems = [
                "الهلال يتأهل لدور الـ16 من دوري أبطال آسيا",
                "مفاجأة: الخليج يتغلب على الهلال في ديربي الرياض",
                "المنتخب السعودي يبدأ تحضيراته لكأس آسيا",
                "الأهلي المصري يحقق فوزاً تاريخياً في دوري الأبطال"
            ];
            
            let currentIndex = 0;
            
            setInterval(() => {
                currentIndex = (currentIndex + 1) % newsItems.length;
                breakingElement.style.opacity = '0';
                
                setTimeout(() => {
                    breakingElement.textContent = newsItems[currentIndex];
                    breakingElement.style.opacity = '1';
                }, 500);
            }, 10000);
        }
    };
    
    // ===== تهيئة الموقع عند التحميل =====
    document.addEventListener('DOMContentLoaded', function() {
        console.log(`%c${APP_CONFIG.name} v${APP_CONFIG.version}`, 
            `background: ${APP_CONFIG.colors.primary}; color: white; padding: 5px 10px; border-radius: 3px;`);
        
        // تحديث سنة حقوق النشر
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
        
        // تهيئة المكونات
        MobileMenuManager.init();
        ScrollManager.init();
        FormManager.init();
        CounterManager.init();
        BreakingNewsManager.init();
        
        // إضافة الأنماط المتحركة
        this.addAnimationStyles();
        
        // تحميل الصفحة
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            Utils.showToast('مرحباً بك في ميدان العرب! ⚽', 'success');
        });
    });
    
    // ===== إضافة الأنماط المتحركة =====
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes toastIn {
                from { transform: translateX(-100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes toastOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
            
            .is-valid {
                border-color: #2E7D32 !important;
                background-color: rgba(46, 125, 50, 0.05) !important;
            }
            
            .is-invalid {
                border-color: #D32F2F !important;
                background-color: rgba(211, 47, 47, 0.05) !important;
            }
            
            .loaded .hero {
                animation: fadeIn 1s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===== جعل الوظائف متاحة عالمياً =====
    window.ArticleManager = ArticleManager;
    window.DonationManager = DonationManager;
    
    window.showFullArticle = function(articleId) {
        ArticleManager.showFullArticle(articleId);
    };
    
    window.closeArticle = function() {
        ArticleManager.closeArticle();
    };
    
    window.showDonation = function() {
        DonationManager.showDonation();
    };
    
    window.closeDonation = function() {
        DonationManager.closeDonation();
    };
    
    window.donate = function(amount) {
        DonationManager.donate(amount);
    };
    
    window.donateCustom = function() {
        DonationManager.donateCustom();
    };
    
    window.showBankInfo = function() {
        DonationManager.showBankInfo();
    };
    
    window.processPayment = function(method) {
        DonationManager.processPayment(method);
    };
    
    // ===== معالجة الأخطاء =====
    window.addEventListener('error', function(e) {
        console.error('حدث خطأ:', e.error);
    });
    
    window.addEventListener('unhandledrejection', function(e) {
        console.error('وعد مرفوض:', e.reason);
    });
})();
