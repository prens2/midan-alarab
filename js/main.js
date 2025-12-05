/**
 * ميدان العرب - الملف الرئيسي للجافاسكريبت
 * ⚽ الموقع الرياضي العربي الشامل
 * الإصدار: 1.0.0
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
        version: '1.0.0',
        author: 'فريق ميدان العرب',
        colors: {
            primary: '#1E5631',
            secondary: '#C4A747',
            accent: '#2E7D32'
        },
        api: {
            baseUrl: 'https://midan-alarab.onrender.com',
            endpoints: {
                news: '/api/news',
                leagues: '/api/leagues'
            }
        }
    };
    
    // ===== حالة التطبيق =====
    let appState = {
        isMobileMenuOpen: false,
        darkMode: false,
        userLocation: null,
        lastNewsUpdate: null,
        notifications: []
    };
    
    // ===== مكتبة الأدوات المساعدة =====
    const Utils = {
        /**
         * تنسيق التاريخ بالعربية
         * @param {Date} date - التاريخ
         * @returns {string} التاريخ المنسق
         */
        formatDate: function(date) {
            if (!date) return '';
            
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            
            return new Intl.DateTimeFormat('ar-EG', options).format(date);
        },
        
        /**
         * تنسيق الأرقام العربية
         * @param {number} number - الرقم
         * @returns {string} الرقم المنسق
         */
        formatNumber: function(number) {
            return new Intl.NumberFormat('ar-EG').format(number);
        },
        
        /**
         * حساب الوقت المنقضي
         * @param {Date} date - التاريخ
         * @returns {string} الوقت المنقضي
         */
        timeAgo: function(date) {
            const now = new Date();
            const diff = now - new Date(date);
            const minutes = Math.floor(diff / 60000);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            
            if (days > 0) return `منذ ${days} يوم`;
            if (hours > 0) return `منذ ${hours} ساعة`;
            if (minutes > 0) return `منذ ${minutes} دقيقة`;
            return 'الآن';
        },
        
        /**
         * نسخ النص للحافظة
         * @param {string} text - النص للنسخ
         */
        copyToClipboard: function(text) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    this.showToast('تم نسخ النص بنجاح', 'success');
                })
                .catch(err => {
                    console.error('خطأ في النسخ:', err);
                    this.showToast('حدث خطأ في النسخ', 'error');
                });
        },
        
        /**
         * عرض رسالة تنبيه
         * @param {string} message - الرسالة
         * @param {string} type - النوع (success, error, warning, info)
         */
        showToast: function(message, type = 'info') {
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.textContent = message;
            
            // الأنماط
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                left: 20px;
                padding: 12px 24px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 9999;
                animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
                max-width: 400px;
            `;
            
            // ألوان حسب النوع
            const colors = {
                success: '#2E7D32',
                error: '#D32F2F',
                warning: '#F57C00',
                info: '#1976D2'
            };
            
            toast.style.background = colors[type] || colors.info;
            
            // إضافة للصفحة
            document.body.appendChild(toast);
            
            // إزالة بعد 3 ثواني
            setTimeout(() => {
                if (toast.parentNode) {
                    document.body.removeChild(toast);
                }
            }, 3000);
        },
        
        /**
         * التحقق من صحة البريد الإلكتروني
         * @param {string} email - البريد الإلكتروني
         * @returns {boolean} صحيح أم لا
         */
        validateEmail: function(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },
        
        /**
         * تحميل صورة مع معالجة الأخطاء
         * @param {string} url - رابط الصورة
         * @returns {Promise} وعد بتحميل الصورة
         */
        loadImage: function(url) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = () => reject(new Error('فشل تحميل الصورة'));
                img.src = url;
            });
        },
        
        /**
         * إضافة تأثير اهتزاز للعنصر
         * @param {HTMLElement} element - العنصر
         */
        shakeElement: function(element) {
            element.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                element.style.animation = '';
            }, 500);
        }
    };
    
    // ===== إدارة الأخبار =====
    const NewsManager = {
        /**
         * قائمة الأخبار
         */
        news: [
            {
                id: 1,
                title: 'فوز تاريخي للأهلي في دوري أبطال آسيا',
                description: 'تغلب النادي الأهلي المصري على منافسه الكوري بنتيجة 3-0 في إطار منافسات دوري أبطال آسيا.',
                content: 'المحتوى الكامل للخبر...',
                category: 'دوري الأبطال',
                date: new Date('2024-12-05T10:30:00'),
                views: 2543,
                comments: 45,
                likes: 128,
                icon: '🏆',
                tags: ['الأهلي', 'دوري الأبطال', 'مصر']
            },
            {
                id: 2,
                title: 'مفاجأة في ديربي الرياض',
                description: 'فوز غير متوقع للخليج على الهلال في مباراة مثيرة انتهت بنتيجة 2-1.',
                content: 'المحتوى الكامل للخبر...',
                category: 'الدوري السعودي',
                date: new Date('2024-12-05T08:15:00'),
                views: 1832,
                comments: 32,
                likes: 89,
                icon: '🌟',
                tags: ['الهلال', 'الدوري السعودي', 'ديربي']
            },
            {
                id: 3,
                title: 'المنتخب السعودي يبدأ تحضيراته لكأس آسيا',
                description: 'بدأ المنتخب السعودي الأول لكرة القدم تدريباته المركزية استعداداً للبطولة القارية المقبلة.',
                content: 'المحتوى الكامل للخبر...',
                category: 'منتخبات',
                date: new Date('2024-12-04T14:20:00'),
                views: 3124,
                comments: 67,
                likes: 215,
                icon: '⚽',
                tags: ['السعودية', 'كأس آسيا', 'منتخبات']
            }
        ],
        
        /**
         * عرض الأخبار في الصفحة
         */
        displayNews: function() {
            const newsGrid = document.querySelector('.news-grid');
            if (!newsGrid) return;
            
            // ترتيب الأخبار حسب التاريخ
            const sortedNews = [...this.news].sort((a, b) => b.date - a.date);
            
            newsGrid.innerHTML = sortedNews.map(newsItem => `
                <article class="news-card ${newsItem.id === 1 ? 'featured' : ''}" data-id="${newsItem.id}">
                    ${newsItem.id === 1 ? '<div class="news-badge">مميز</div>' : ''}
                    <div class="news-image" style="background: linear-gradient(45deg, ${this.getCategoryColor(newsItem.category)});">
                        <span>${newsItem.icon}</span>
                    </div>
                    <div class="news-content">
                        <div class="news-meta">
                            <span class="news-category">${newsItem.category}</span>
                            <span class="news-date">
                                <i class="far fa-clock"></i> ${Utils.timeAgo(newsItem.date)}
                            </span>
                        </div>
                        <h3 class="news-title">${newsItem.title}</h3>
                        <p class="news-desc">${newsItem.description}</p>
                        <div class="news-footer">
                            <a href="#" class="read-more" onclick="NewsManager.readMore(${newsItem.id})" aria-label="قراءة المزيد عن ${newsItem.title}">
                                اقرأ التفاصيل <i class="fas fa-arrow-left"></i>
                            </a>
                            <div class="news-stats">
                                <span title="عدد المشاهدات">
                                    <i class="far fa-eye"></i> ${Utils.formatNumber(newsItem.views)}
                                </span>
                                <span title="عدد التعليقات">
                                    <i class="far fa-comment"></i> ${Utils.formatNumber(newsItem.comments)}
                                </span>
                            </div>
                        </div>
                    </div>
                </article>
            `).join('');
            
            // تحديث الوقت
            appState.lastNewsUpdate = new Date();
        },
        
        /**
         * الحصول على لون حسب التصنيف
         * @param {string} category - التصنيف
         * @returns {string} اللون
         */
        getCategoryColor: function(category) {
            const colors = {
                'دوري الأبطال': '#1E5631, #2E7D32',
                'الدوري السعودي': '#C4A747, #D4B757',
                'منتخبات': '#2E7D32, #3E8D42',
                'الدوري المصري': '#1565C0, #1976D2',
                'الدوري الإنجليزي': '#C62828, #D32F2F'
            };
            
            return colors[category] || '#1E5631, #2E7D32';
        },
        
        /**
         * عند النقر على اقرأ المزيد
         * @param {number} newsId - معرف الخبر
         */
        readMore: function(newsId) {
            const newsItem = this.news.find(item => item.id === newsId);
            if (!newsItem) return;
            
            // زيادة عدد المشاهدات
            newsItem.views++;
            
            // عرض تفاصيل الخبر
            const modalContent = `
                <div class="news-modal">
                    <div class="modal-header">
                        <h2>${newsItem.title}</h2>
                        <button class="close-modal" aria-label="إغلاق">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="news-meta">
                            <span class="news-category">${newsItem.category}</span>
                            <span class="news-date">
                                <i class="far fa-clock"></i> ${Utils.formatDate(newsItem.date)}
                            </span>
                        </div>
                        <div class="news-image-large">
                            <span>${newsItem.icon}</span>
                        </div>
                        <div class="news-content-full">
                            <p>${newsItem.content}</p>
                        </div>
                        <div class="news-tags">
                            ${newsItem.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <div class="news-stats">
                            <span><i class="far fa-eye"></i> ${Utils.formatNumber(newsItem.views)} مشاهدة</span>
                            <span><i class="far fa-comment"></i> ${Utils.formatNumber(newsItem.comments)} تعليق</span>
                            <span><i class="far fa-heart"></i> ${Utils.formatNumber(newsItem.likes)} إعجاب</span>
                        </div>
                    </div>
                </div>
            `;
            
            this.showModal(modalContent);
        },
        
        /**
         * عرض نافذة منبثقة
         * @param {string} content - محتوى النافذة
         */
        showModal: function(content) {
            // إنشاء الـ overlay
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                padding: 20px;
                animation: fadeIn 0.3s ease;
            `;
            
            // إضافة المحتوى
            overlay.innerHTML = content;
            
            // إضافة للصفحة
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden'; // منع التمرير
            
            // إضافة حدث لإغلاق النافذة
            const closeBtn = overlay.querySelector('.close-modal');
            if (closeBtn) {
                closeBtn.onclick = () => this.closeModal(overlay);
            }
            
            // إغلاق بالنقر خارج النافذة
            overlay.onclick = (e) => {
                if (e.target === overlay) {
                    this.closeModal(overlay);
                }
            };
            
            // إغلاق بـ ESC
            document.addEventListener('keydown', function closeOnEsc(e) {
                if (e.key === 'Escape') {
                    NewsManager.closeModal(overlay);
                    document.removeEventListener('keydown', closeOnEsc);
                }
            });
        },
        
        /**
         * إغلاق النافذة المنبثقة
         * @param {HTMLElement} overlay - الـ overlay
         */
        closeModal: function(overlay) {
            overlay.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (overlay.parentNode) {
                    document.body.removeChild(overlay);
                    document.body.style.overflow = ''; // إعادة التمرير
                }
            }, 300);
        },
        
        /**
         * البحث في الأخبار
         * @param {string} query - كلمة البحث
         */
        searchNews: function(query) {
            if (!query.trim()) {
                this.displayNews();
                return;
            }
            
            const filteredNews = this.news.filter(item => 
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.description.toLowerCase().includes(query.toLowerCase()) ||
                item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
            );
            
            // عرض نتائج البحث
            const newsGrid = document.querySelector('.news-grid');
            if (newsGrid) {
                // تحديث العرض
                // (يمكن تطوير هذا الجزء)
                Utils.showToast(`تم العثور على ${filteredNews.length} نتيجة`, 'info');
            }
        }
    };
    
    // ===== إدارة القائمة الجوال =====
    const MobileMenu = {
        /**
         * تهيئة القائمة الجوال
         */
        init: function() {
            const menuBtn = document.querySelector('.mobile-menu-btn');
            const mobileMenu = document.querySelector('.mobile-menu');
            
            if (!menuBtn || !mobileMenu) return;
            
            menuBtn.addEventListener('click', () => this.toggle());
            
            // إغلاق القائمة عند النقر على رابط
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => this.close());
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
            const mobileMenu = document.querySelector('.mobile-menu');
            const menuIcon = document.querySelector('.mobile-menu-btn i');
            
            if (appState.isMobileMenuOpen) {
                this.close();
            } else {
                this.open();
            }
            
            appState.isMobileMenuOpen = !appState.isMobileMenuOpen;
        },
        
        /**
         * فتح القائمة
         */
        open: function() {
            const mobileMenu = document.querySelector('.mobile-menu');
            const menuIcon = document.querySelector('.mobile-menu-btn i');
            
            mobileMenu.classList.add('active');
            mobileMenu.style.display = 'flex';
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
            
            // منع التمرير
            document.body.style.overflow = 'hidden';
        },
        
        /**
         * إغلاق القائمة
         */
        close: function() {
            const mobileMenu = document.querySelector('.mobile-menu');
            const menuIcon = document.querySelector('.mobile-menu-btn i');
            
            mobileMenu.classList.remove('active');
            setTimeout(() => {
                mobileMenu.style.display = 'none';
            }, 300);
            
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
            
            // إعادة التمرير
            document.body.style.overflow = '';
            
            appState.isMobileMenuOpen = false;
        }
    };
    
    // ===== إدارة النمط =====
    const ThemeManager = {
        /**
         * تهيئة النمط
         */
        init: function() {
            // التحقق من تفضيلات النظام
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
            appState.darkMode = prefersDark.matches;
            
            // تحديث النمط
            this.updateTheme();
            
            // الاستماع لتغير تفضيلات النظام
            prefersDark.addEventListener('change', (e) => {
                appState.darkMode = e.matches;
                this.updateTheme();
            });
        },
        
        /**
         * تحديث النمط
         */
        updateTheme: function() {
            if (appState.darkMode) {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
        },
        
        /**
         * تبديل الوضع الليلي
         */
        toggleDarkMode: function() {
            appState.darkMode = !appState.darkMode;
            this.updateTheme();
            
            // حفظ التفضيل
            localStorage.setItem('darkMode', appState.darkMode);
            
            Utils.showToast(
                appState.darkMode ? 'تم تفعيل الوضع الليلي' : 'تم تعطيل الوضع الليلي',
                'info'
            );
        }
    };
    
    // ===== تأثيرات التمرير =====
    const ScrollEffects = {
        /**
         * تهيئة تأثيرات التمرير
         */
        init: function() {
            // تأثير شريط التنقل
            window.addEventListener('scroll', () => this.handleNavbarScroll());
            
            // تأثير ظهور العناصر
            this.initIntersectionObserver();
            
            // التمرير الناعم
            this.initSmoothScrolling();
        },
        
        /**
         * التعامل مع تمرير شريط التنقل
         */
        handleNavbarScroll: function() {
            const navbar = document.querySelector('.navbar');
            if (!navbar) return;
            
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(30, 86, 49, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 100%)';
                navbar.style.backdropFilter = 'none';
                navbar.style.boxShadow = 'var(--shadow-md)';
            }
        },
        
        /**
         * تهيئة Intersection Observer للعناصر
         */
        initIntersectionObserver: function() {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, observerOptions);
            
            // مراقبة العناصر
            document.querySelectorAll('.news-card, .league-card, .stat').forEach(el => {
                observer.observe(el);
            });
        },
        
        /**
         * تهيئة التمرير الناعم
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
                            MobileMenu.close();
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
    
    // ===== نموذج الاتصال =====
    const ContactForm = {
        /**
         * تهيئة نموذج الاتصال
         */
        init: function() {
            const form = document.querySelector('.contact-form');
            if (!form) return;
            
            form.addEventListener('submit', (e) => this.handleSubmit(e));
            
            // التحقق أثناء الكتابة
            form.querySelectorAll('input, textarea').forEach(input => {
                input.addEventListener('input', () => this.validateField(input));
            });
        },
        
        /**
         * التحقق من حقل
         * @param {HTMLInputElement|HTMLTextAreaElement} field - الحقل
         */
        validateField: function(field) {
            const value = field.value.trim();
            let isValid = true;
            let message = '';
            
            switch (field.id) {
                case 'name':
                    isValid = value.length >= 2;
                    message = isValid ? '' : 'الاسم يجب أن يكون على الأقل حرفين';
                    break;
                    
                case 'email':
                    isValid = Utils.validateEmail(value);
                    message = isValid ? '' : 'البريد الإلكتروني غير صحيح';
                    break;
                    
                case 'message':
                    isValid = value.length >= 10;
                    message = isValid ? '' : 'الرسالة يجب أن تكون على الأقل 10 أحرف';
                    break;
            }
            
            this.updateFieldStatus(field, isValid, message);
        },
        
        /**
         * تحديث حالة الحقل
         * @param {HTMLElement} field - الحقل
         * @param {boolean} isValid - إذا كان صحيحاً
         * @param {string} message - رسالة الخطأ
         */
        updateFieldStatus: function(field, isValid, message) {
            const formGroup = field.closest('.form-group');
            if (!formGroup) return;
            
            // إزالة الرسائل السابقة
            const oldError = formGroup.querySelector('.error-message');
            if (oldError) {
                formGroup.removeChild(oldError);
            }
            
            // إزالة الأنماط السابقة
            field.classList.remove('is-valid', 'is-invalid');
            formGroup.classList.remove('has-error', 'has-success');
            
            // تحديث الأنماط
            if (isValid && field.value.trim()) {
                field.classList.add('is-valid');
                formGroup.classList.add('has-success');
            } else if (!isValid && field.value.trim()) {
                field.classList.add('is-invalid');
                formGroup.classList.add('has-error');
                
                // إضافة رسالة الخطأ
                const errorSpan = document.createElement('span');
                errorSpan.className = 'error-message';
                errorSpan.textContent = message;
                errorSpan.style.cssText = `
                    color: #D32F2F;
                    font-size: 0.85rem;
                    margin-top: 5px;
                    display: block;
                `;
                formGroup.appendChild(errorSpan);
            }
        },
        
        /**
         * التعامل مع إرسال النموذج
         * @param {Event} e - حدث الإرسال
         */
        handleSubmit: function(e) {
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
            this.submitForm(data)
                .then(response => {
                    Utils.showToast('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
                    form.reset();
                    
                    // إعادة تعيين الأنماط
                    form.querySelectorAll('.form-group').forEach(group => {
                        group.classList.remove('has-success');
                    });
                    form.querySelectorAll('input, textarea').forEach(field => {
                        field.classList.remove('is-valid');
                    });
                })
                .catch(error => {
                    console.error('خطأ في الإرسال:', error);
                    Utils.showToast('حدث خطأ في إرسال الرسالة. حاول مرة أخرى.', 'error');
                });
        },
        
        /**
         * إرسال النموذج (محاكاة)
         * @param {Object} data - بيانات النموذج
         * @returns {Promise} وعد بالإرسال
         */
        submitForm: function(data) {
            return new Promise((resolve, reject) => {
                // محاكاة تأخير الشبكة
                setTimeout(() => {
                    // في الواقع، هنا نرسل البيانات لخادم
                    console.log('بيانات النموذج:', data);
                    
                    // نجاح محاكاة
                    resolve({ success: true, message: 'تم الإرسال' });
                    
                    // فشل محاكاة (للاختبار)
                    // reject(new Error('فشل الاتصال بالخادم'));
                }, 1500);
            });
        }
    };
    
    // ===== العد التنازلي =====
    const Countdown = {
        nextMatch: {
            team1: 'الهلال',
            team2: 'النصر',
            date: new Date('2024-12-10T20:00:00'),
            competition: 'دوري المحترفين السعودي',
            venue: 'ملعب الملك فهد الدولي'
        },
        
        /**
         * بدء العد التنازلي
         */
        init: function() {
            const countdownElement = document.createElement('div');
            countdownElement.className = 'match-countdown';
            countdownElement.style.cssText = `
                background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
                color: white;
                padding: 1.5rem;
                border-radius: var(--border-radius);
                text-align: center;
                margin: 2rem 0;
                box-shadow: var(--shadow-md);
            `;
            
            countdownElement.innerHTML = `
                <div class="countdown-header">
                    <h4><i class="fas fa-clock"></i> العد التنازلي للمباراة القادمة</h4>
                    <p class="match-info">${this.nextMatch.team1} vs ${this.nextMatch.team2}</p>
                    <p class="competition">${this.nextMatch.competition}</p>
                </div>
                <div class="countdown-timer" id="countdown-timer"></div>
                <div class="venue">
                    <i class="fas fa-map-marker-alt"></i> ${this.nextMatch.venue}
                </div>
            `;
            
            // إضافة للصفحة
            const newsSection = document.querySelector('.news-section');
            if (newsSection) {
                newsSection.parentNode.insertBefore(countdownElement, newsSection.nextSibling);
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
                    timerElement.innerHTML = `
                        <div class="match-started">
                            <i class="fas fa-play-circle"></i>
                            <span>بدأت المباراة!</span>
                        </div>
                    `;
                    return;
                }
                
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                
                timerElement.innerHTML = `
                    <div class="time-unit">
                        <span class="number">${days.toString().padStart(2, '0')}</span>
                        <span class="label">يوم</span>
                    </div>
                    <div class="time-unit">
                        <span class="number">${hours.toString().padStart(2, '0')}</span>
                        <span class="label">ساعة</span>
                    </div>
                    <div class="time-unit">
                        <span class="number">${minutes.toString().padStart(2, '0')}</span>
                        <span class="label">دقيقة</span>
                    </div>
                    <div class="time-unit">
                        <span class="number">${seconds.toString().padStart(2, '0')}</span>
                        <span class="label">ثانية</span>
                    </div>
                `;
            };
            
            update();
            setInterval(update, 1000);
        }
    };
    
    // ===== تهيئة الموقع عند التحميل =====
    document.addEventListener('DOMContentLoaded', function() {
        // عرض معلومات التطبيق
        console.log(`%c${APP_CONFIG.name} v${APP_CONFIG.version}`, 
            `background: ${APP_CONFIG.colors.primary}; color: white; padding: 5px 10px; border-radius: 3px;`);
        
        // تحديث سنة حقوق النشر
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
        
        // تهيئة المكونات
        NewsManager.displayNews();
        MobileMenu.init();
        ThemeManager.init();
        ScrollEffects.init();
        ContactForm.init();
        Countdown.init();
        
        // إضافة تاريخ اليوم
        const today = new Date();
        const dateElement = document.createElement('div');
        dateElement.className = 'current-date';
        dateElement.style.cssText = `
            text-align: center;
            margin: 15px 0;
            color: var(--text-light);
            font-size: 0.9rem;
        `;
        dateElement.innerHTML = `<i class="far fa-calendar-alt"></i> ${Utils.formatDate(today)}`;
        
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.appendChild(dateElement);
        }
        
        // مراقبة حالة الاتصال
        window.addEventListener('online', () => {
            Utils.showToast('تم استعادة الاتصال بالإنترنت', 'success');
        });
        
        window.addEventListener('offline', () => {
            Utils.showToast('فقدت الاتصال بالإنترنت', 'warning');
        });
        
        // تحميل الصفحة
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            Utils.showToast('مرحباً بك في ميدان العرب! ⚽', 'success');
        });
    });
    
    // ===== وظائف عامة (عالمية) =====
    window.shareSite = function() {
        if (navigator.share) {
            navigator.share({
                title: 'ميدان العرب',
                text: 'موقع رياضي عربي رائع! تابع أحدث الأخبار والتحليلات.',
                url: window.location.href
            });
        } else {
            Utils.copyToClipboard(window.location.href);
        }
    };
    
    window.toggleDarkMode = function() {
        ThemeManager.toggleDarkMode();
    };
    
    window.searchNews = function() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            NewsManager.searchNews(searchInput.value);
        }
    };
    
    // ===== معالجة الأخطاء =====
    window.addEventListener('error', function(e) {
        console.error('حدث خطأ:', e.error);
        // يمكن إرسال الخطأ لخادم التحليلات هنا
    });
    
    window.addEventListener('unhandledrejection', function(e) {
        console.error('وعد مرفوض:', e.reason);
    });
    
    // ===== الأنماط المتحركة الإضافية =====
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes slideIn {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .animate-in {
            animation: fadeIn 0.6s ease;
        }
        
        .news-modal {
            background: white;
            border-radius: var(--border-radius);
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            animation: slideIn 0.3s ease;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid var(--border-color);
        }
        
        .close-modal {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-secondary);
            transition: var(--transition);
        }
        
        .close-modal:hover {
            color: var(--primary-color);
        }
        
        .modal-body {
            padding: 1.5rem;
        }
        
        .news-image-large {
            height: 300px;
            background: linear-gradient(45deg, var(--primary-color), var(--primary-light));
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 8rem;
            border-radius: var(--border-radius);
            margin: 1.5rem 0;
        }
        
        .news-content-full {
            line-height: 1.8;
            font-size: 1.1rem;
            margin-bottom: 1.5rem;
        }
        
        .news-tags {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
            margin-bottom: 1.5rem;
        }
        
        .tag {
            background: var(--bg-secondary);
            padding: 0.3rem 0.8rem;
            border-radius: 15px;
            font-size: 0.9rem;
            color: var(--text-secondary);
        }
        
        .countdown-timer {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin: 1.5rem 0;
            flex-wrap: wrap;
        }
        
        .time-unit {
            background: rgba(255, 255, 255, 0.1);
            padding: 1rem;
            border-radius: var(--border-radius-sm);
            min-width: 80px;
        }
        
        .time-unit .number {
            display: block;
            font-size: 2rem;
            font-weight: bold;
            color: var(--secondary-color);
        }
        
        .time-unit .label {
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.8);
        }
        
        .match-started {
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        
        .match-started i {
            color: var(--secondary-color);
            font-size: 2rem;
        }
        
        .match-info {
            font-size: 1.3rem;
            font-weight: 600;
            margin: 0.5rem 0;
        }
        
        .competition {
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 0.5rem;
        }
        
        .venue {
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.9rem;
            margin-top: 1rem;
        }
        
        .venue i {
            margin-left: 5px;
        }
        
        /* إمكانية الوصول */
        :focus {
            outline: 2px solid var(--secondary-color);
            outline-offset: 2px;
        }
        
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
        
        /* تحسين الطباعة */
        @media print {
            .news-modal,
            .modal-overlay,
            .match-countdown,
            .breaking-news {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ===== التحسينات النهائية =====
    // إضافة فئة loaded عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    });
    
    // منع سلوك الروابط الفارغة
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
            e.preventDefault();
        }
    });
})();
