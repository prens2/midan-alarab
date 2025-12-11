/**
 * ميدان العرب - الوظائف الأساسية للمنتخبات العربية
 * @version 3.0 - تركز على المنتخبات العربية فقط
 */

(function() {
    'use strict';
    
    console.log('🇸🇦 ميدان العرب - المنتخبات العربية | جاهز للتشغيل');
    
    // وظائف المساعدة
    const Utils = {
        // تنسيق التاريخ العربي
        formatDate: function(date) {
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
            };
            return date.toLocaleDateString('ar-SA', options);
        },
        
        // تنسيق الوقت العربي
        formatTime: function(date) {
            return date.toLocaleTimeString('ar-SA', {
                hour: '2-digit',
                minute: '2-digit'
            });
        },
        
        // تنسيق العد التنازلي
        formatCountdown: function(days, hours, minutes, seconds) {
            return `${days} يوم ${hours} ساعة ${minutes} دقيقة ${seconds} ثانية`;
        },
        
        // تلوين حسب المنتخب
        getTeamColor: function(teamId) {
            const colors = {
                'saudi': '#1E5631',
                'egypt': '#C4A747',
                'morocco': '#FF00FF',
                'algeria': '#00FFFF',
                'tunisia': '#FF0000',
                'iraq': '#0000FF',
                'uae': '#FF4444',
                'qatar': '#8B4513',
                'jordan': '#4444FF',
                'syria': '#2E7D32',
                'palestine': '#0066CC'
            };
            return colors[teamId] || '#1E5631';
        },
        
        // الحصول على علم المنتخب
        getTeamFlag: function(teamId) {
            const flags = {
                'saudi': '🇸🇦',
                'egypt': '🇪🇬',
                'morocco': '🇲🇦',
                'algeria': '🇩🇿',
                'tunisia': '🇹🇳',
                'iraq': '🇮🇶',
                'uae': '🇦🇪',
                'qatar': '🇶🇦',
                'jordan': '🇯🇴',
                'syria': '🇸🇾',
                'palestine': '🇵🇸'
            };
            return flags[teamId] || '🏴';
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
                    counter.textContent = Math.floor(current).toLocaleString('ar-SA');
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target.toLocaleString('ar-SA');
                }
            };
            
            setTimeout(updateCounter, 500);
        });
    }
    
    // ===== تغيير الأخبار العاجلة =====
    function rotateBreakingNews() {
        const breakingTexts = [
            "🏆 كأس العرب 2025: السعودية تستضيف البطولة في ديسمبر 2025",
            "🇸🇦 المنتخب السعودي يستعد لنهائيات كأس آسيا 2023",
            "🇲🇦 المغرب يتأهل لدور الـ16 في كأس الأمم الأفريقية",
            "🇪🇬 مصر تعلن القائمة النهائية لكأس الأمم الأفريقية",
            "🇩🇿 الجزائر تحتفظ بلقب كأس العرب 2021",
            "🌍 جميع المنتخبات العربية تشارك في تصفيات كأس العالم 2026",
            "⚽ 16 منتخباً عربياً يتنافسون على لقب كأس العرب 2025",
            "📊 تصنيفات فيفا: تقدم للمنتخبات العربية في التصنيف العالمي"
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
            menuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
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
            
            // منع إغلاق القائمة عند النقر داخلها
            mobileMenu.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }
    
    // ===== تتبع التمرير للقائمة =====
    function setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
        
        if (sections.length === 0 || navLinks.length === 0) return;
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                
                if (href === `#${current}` || 
                    (current === '' && href === '/') ||
                    (current === 'arab-cup' && href.includes('arab-cup')) ||
                    (current === 'national-teams' && href.includes('national-teams')) ||
                    (current === 'live-news' && href.includes('live-news'))) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // ===== إظهار رسالة =====
    function showMessage(text, type = 'info', duration = 3000) {
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
        message.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${text}</span>
            </div>
        `;
        
        message.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 30px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            background: ${colors[type] || colors.info};
            animation: slideDown 0.3s ease;
            max-width: 90%;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            text-align: center;
            direction: rtl;
            display: flex;
            align-items: center;
            justify-content: center;
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
        
        // إزالة الرسالة بعد المدة المحددة
        setTimeout(() => {
            message.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => message.remove(), 300);
        }, duration);
    }
    
    // ===== تحديث العد التنازلي لكأس العرب =====
    function setupArabCupCountdown() {
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (!daysElement || !hoursElement || !minutesElement || !secondsElement) return;
        
        function updateCountdown() {
            const cupDate = new Date('December 1, 2025 00:00:00').getTime();
            const now = new Date().getTime();
            const distance = cupDate - now;
            
            if (distance < 0) {
                daysElement.textContent = '0';
                hoursElement.textContent = '00';
                minutesElement.textContent = '00';
                secondsElement.textContent = '00';
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            daysElement.textContent = days;
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        }
        
        // تحديث العد التنازلي كل ثانية
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // ===== تأثيرات Hover للبطاقات =====
    function setupCardHoverEffects() {
        // إضافة تأثيرات لبطاقات المنتخبات
        const teamCards = document.querySelectorAll('.team-card, .tournament-card, .team-news-card');
        
        teamCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // ===== التحديث التلقائي للمحتوى =====
    function setupAutoRefresh() {
        // تحديث عداد المشاهدات كل ساعة
        setInterval(() => {
            const viewsCounter = document.querySelector('.count[data-target="1270"]');
            if (viewsCounter) {
                const current = parseInt(viewsCounter.textContent.replace(/,/g, ''));
                const increment = Math.floor(Math.random() * 5) + 1;
                const newTotal = current + increment;
                viewsCounter.textContent = newTotal.toLocaleString('ar-SA');
                
                // تحديث الهدف أيضاً
                viewsCounter.setAttribute('data-target', newTotal);
            }
        }, 60 * 60 * 1000); // كل ساعة
    }
    
    // ===== تحميل أعلام المنتخبات =====
    function loadTeamFlags() {
        // هذه الوظيفة يمكن توسيعها لتحميل أعلام حقيقية من API
        const teamFlags = document.querySelectorAll('.team-flag');
        
        teamFlags.forEach(flag => {
            const teamName = flag.textContent.trim();
            if (teamName.includes('🇸🇦')) flag.title = 'علم السعودية';
            else if (teamName.includes('🇪🇬')) flag.title = 'علم مصر';
            else if (teamName.includes('🇲🇦')) flag.title = 'علم المغرب';
            else if (teamName.includes('🇩🇿')) flag.title = 'علم الجزائر';
            else if (teamName.includes('🇹🇳')) flag.title = 'علم تونس';
            else if (teamName.includes('🇮🇶')) flag.title = 'علم العراق';
            else if (teamName.includes('🇦🇪')) flag.title = 'علم الإمارات';
            else if (teamName.includes('🇶🇦')) flag.title = 'علم قطر';
            else if (teamName.includes('🇯🇴')) flag.title = 'علم الأردن';
            else if (teamName.includes('🇸🇾')) flag.title = 'علم سوريا';
            else if (teamName.includes('🇵🇸')) flag.title = 'علم فلسطين';
        });
    }
    
    // ===== إظهار تفاصيل المنتخب =====
    function setupTeamDetails() {
        const teamButtons = document.querySelectorAll('.team-news-btn');
        
        teamButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const teamCard = this.closest('.team-card');
                if (!teamCard) return;
                
                const teamName = teamCard.querySelector('h3').textContent;
                const teamFlag = teamCard.querySelector('.team-flag').textContent;
                const teamRank = teamCard.querySelector('.team-rank span').textContent;
                const coach = teamCard.querySelector('.coach-info p').textContent;
                const nextMatch = teamCard.querySelector('.next-match p').textContent;
                const matchDetails = teamCard.querySelector('.match-details').textContent;
                
                // يمكن توسيع هذه الوظيفة لعرض تفاصيل أكثر
                showMessage(
                    `${teamFlag} ${teamName}<br>
                    ${teamRank}<br>
                    المدرب: ${coach}<br>
                    ${nextMatch}<br>
                    ${matchDetails}`,
                    'info',
                    5000
                );
            });
        });
    }
    
    // ===== إنشاء فلتر للمنتخبات =====
    function setupTeamFilters() {
        const container = document.getElementById('team-filters');
        if (!container) return;
        
        // قائمة المنتخبات العربية
        const teams = [
            { id: 'all', name: 'جميع المنتخبات', flag: '🏆' },
            { id: 'saudi', name: 'السعودية', flag: '🇸🇦' },
            { id: 'egypt', name: 'مصر', flag: '🇪🇬' },
            { id: 'morocco', name: 'المغرب', flag: '🇲🇦' },
            { id: 'algeria', name: 'الجزائر', flag: '🇩🇿' },
            { id: 'tunisia', name: 'تونس', flag: '🇹🇳' },
            { id: 'iraq', name: 'العراق', flag: '🇮🇶' },
            { id: 'uae', name: 'الإمارات', flag: '🇦🇪' },
            { id: 'qatar', name: 'قطر', flag: '🇶🇦' },
            { id: 'jordan', name: 'الأردن', flag: '🇯🇴' },
            { id: 'syria', name: 'سوريا', flag: '🇸🇾' },
            { id: 'palestine', name: 'فلسطين', flag: '🇵🇸' }
        ];
        
        // إنشاء أزرار الفلتر
        teams.forEach(team => {
            const button = document.createElement('button');
            button.className = 'team-filter-btn';
            if (team.id === 'all') button.classList.add('active');
            button.dataset.team = team.id;
            button.innerHTML = `${team.flag} ${team.name}`;
            
            button.style.cssText = `
                padding: 10px 20px;
                border: 2px solid ${team.id === 'all' ? '#1E5631' : '#ddd'};
                background: ${team.id === 'all' ? '#1E5631' : 'white'};
                color: ${team.id === 'all' ? 'white' : '#333'};
                border-radius: 25px;
                cursor: pointer;
                transition: all 0.3s;
                font-size: 14px;
                white-space: nowrap;
                display: flex;
                align-items: center;
                gap: 8px;
            `;
            
            button.addEventListener('click', () => {
                // إزالة النشط من جميع الأزرار
                container.querySelectorAll('.team-filter-btn').forEach(btn => {
                    btn.style.background = 'white';
                    btn.style.color = '#333';
                    btn.style.border = '2px solid #ddd';
                });
                
                // إضافة النشط للزر الحالي
                button.style.background = '#1E5631';
                button.style.color = 'white';
                button.style.border = '2px solid #1E5631';
                
                // تطبيق الفلتر
                filterTeams(team.id);
            });
            
            container.appendChild(button);
        });
        
        // دالة الفلتر
        function filterTeams(teamId) {
            const newsCards = document.querySelectorAll('.team-news-card');
            
            if (teamId === 'all') {
                newsCards.forEach(card => {
                    card.style.display = 'block';
                });
            } else {
                newsCards.forEach(card => {
                    if (card.dataset.team === teamId) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        }
    }
    
    // ===== البحث في أخبار المنتخبات =====
    function setupTeamsSearch() {
        const searchInput = document.getElementById('teams-search');
        const searchButton = document.querySelector('.teams-search-btn');
        
        if (!searchInput || !searchButton) return;
        
        function performSearch() {
            const query = searchInput.value.trim().toLowerCase();
            
            if (!query) {
                showMessage('الرجاء إدخال كلمة للبحث', 'warning');
                return;
            }
            
            const teamCards = document.querySelectorAll('.team-card, .team-news-card');
            let foundCount = 0;
            
            teamCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(query)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                    foundCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            if (foundCount === 0) {
                showMessage(`لم يتم العثور على نتائج للبحث: "${query}"`, 'warning');
            } else {
                showMessage(`تم العثور على ${foundCount} نتيجة`, 'success');
            }
        }
        
        // البحث عند النقر على الزر
        searchButton.addEventListener('click', performSearch);
        
        // البحث عند الضغط على Enter
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // ===== التهيئة عند تحميل الصفحة =====
    document.addEventListener('DOMContentLoaded', function() {
        console.log('✅ ميدان العرب - تهيئة المنتخبات العربية');
        
        // تحديث السنة في الفوتر
        const currentYear = new Date().getFullYear();
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = currentYear;
        }
        
        // تشغيل العدادات المتحركة
        animateCounters();
        
        // تشغيل الأخبار العاجلة
        rotateBreakingNews();
        
        // إعداد القائمة الجوال
        setupMobileMenu();
        
        // إعداد تتبع التمرير
        setupScrollSpy();
        
        // إعداد العد التنازلي لكأس العرب
        setupArabCupCountdown();
        
        // إضافة تأثيرات للبطاقات
        setupCardHoverEffects();
        
        // إعداد التحديث التلقائي
        setupAutoRefresh();
        
        // تحميل أعلام المنتخبات
        loadTeamFlags();
        
        // إعداد تفاصيل المنتخبات
        setupTeamDetails();
        
        // إعداد فلتر المنتخبات
        setupTeamFilters();
        
        // إعداد البحث
        setupTeamsSearch();
        
        // إظهار رسالة ترحيب
        setTimeout(() => {
            showMessage('🇸🇦 مرحباً بك في ميدان العرب - المنتخبات العربية ⚽', 'success', 4000);
        }, 1000);
        
        // إضافة أنيميشن للعناصر عند الظهور
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // مراقبة العناصر لإضافة أنيميشن
        const animatedElements = document.querySelectorAll('.team-card, .tournament-card, .team-news-card');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
        
        // إضافة أنيميشن CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
            
            .highlight-pulse {
                animation: pulse 2s infinite;
            }
            
            .highlight-shake {
                animation: shake 0.5s;
            }
            
            /* أنميشن للعد التنازلي */
            .countdown-item {
                animation: fadeInUp 0.6s ease;
            }
            
            /* أنميشن للأخبار العاجلة */
            .breaking-text {
                animation: slideInRight 20s linear infinite;
            }
            
            @keyframes slideInRight {
                0%, 25% { transform: translateX(0); }
                30%, 55% { transform: translateX(-100%); }
                60%, 85% { transform: translateX(-200%); }
                90%, 100% { transform: translateX(-300%); }
            }
        `;
        document.head.appendChild(style);
    });
    
    // ===== جعل الدوال متاحة عالمياً =====
    window.Utils = Utils;
    window.showMessage = showMessage;
    
    // ===== وظائف خاصة بالمنتخبات =====
    window.getTeamInfo = function(teamId) {
        const teams = {
            'saudi': { name: 'السعودية', color: '#1E5631', flag: '🇸🇦' },
            'egypt': { name: 'مصر', color: '#C4A747', flag: '🇪🇬' },
            'morocco': { name: 'المغرب', color: '#FF00FF', flag: '🇲🇦' },
            'algeria': { name: 'الجزائر', color: '#00FFFF', flag: '🇩🇿' },
            'tunisia': { name: 'تونس', color: '#FF0000', flag: '🇹🇳' }
        };
        return teams[teamId] || { name: 'منتخب عربي', color: '#1E5631', flag: '🏴' };
    };
    
    // ===== نسخ رابط الموقع =====
    window.copySiteLink = function() {
        const url = window.location.href;
        navigator.clipboard.writeText(url)
            .then(() => showMessage('✅ تم نسخ رابط الموقع', 'success'))
            .catch(() => showMessage('❌ تعذر نسخ الرابط', 'error'));
    };
    
    // ===== مشاركة الموقع =====
    window.shareSite = function() {
        if (navigator.share) {
            navigator.share({
                title: 'ميدان العرب - المنتخبات العربية',
                text: 'تابع أخبار المنتخبات العربية وكأس العرب 2025',
                url: window.location.href
            });
        } else {
            window.copySiteLink();
        }
    };
    
})();
