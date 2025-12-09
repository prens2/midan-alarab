/**
 * ميدان العرب - الوظائف الأساسية
 * @version 3.0 - تحديثات كأس العرب
 */

(function() {
    'use strict';
    
    console.log('🏆 ميدان العرب - كأس العرب 2025 جاهز للتشغيل');
    
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
                minute: '2-digit',
                hour12: true
            });
        },
        
        // توليد لون عشوائي
        generateColor: function() {
            const colors = ['#1E5631', '#2E7D32', '#C4A747', '#D4B757', '#3E8D42'];
            return colors[Math.floor(Math.random() * colors.length)];
        },
        
        // تحميل صورة
        loadImage: function(src) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
            });
        }
    };
    
    // ===== بيانات كأس العرب =====
    const ArabCupData = {
        // المجموعات والفرق
        groups: {
            'A': ['السعودية', 'مصر', 'الأردن', 'تونس'],
            'B': ['المغرب', 'الجزائر', 'العراق', 'قطر'],
            'C': ['الإمارات', 'سوريا', 'الكويت', 'البحرين'],
            'D': ['عمان', 'فلسطين', 'السودان', 'جزر القمر']
        },
        
        // جدول المباريات الكامل
        matches: [
            // المجموعة أ
            {
                id: 1,
                group: 'A',
                stage: 'groups',
                home: 'السعودية',
                away: 'مصر',
                date: '2024-12-15',
                time: '20:00',
                stadium: 'ملعب الملك فهد',
                status: 'قادمة',
                score: '-'
            },
            {
                id: 2,
                group: 'A',
                stage: 'groups',
                home: 'الأردن',
                away: 'تونس',
                date: '2024-12-15',
                time: '16:00',
                stadium: 'ملعب الملك عبدالله',
                status: 'قادمة',
                score: '-'
            },
            {
                id: 3,
                group: 'A',
                stage: 'groups',
                home: 'مصر',
                away: 'الأردن',
                date: '2024-12-19',
                time: '20:00',
                stadium: 'ملعب الملك فهد',
                status: 'قادمة',
                score: '-'
            },
            {
                id: 4,
                group: 'A',
                stage: 'groups',
                home: 'تونس',
                away: 'السعودية',
                date: '2024-12-19',
                time: '16:00',
                stadium: 'ملعب الملك عبدالله',
                status: 'قادمة',
                score: '-'
            },
            // المجموعة ب
            {
                id: 5,
                group: 'B',
                stage: 'groups',
                home: 'المغرب',
                away: 'الجزائر',
                date: '2024-12-16',
                time: '20:00',
                stadium: 'ملعب المدينة التعليمية',
                status: 'قادمة',
                score: '-'
            },
            {
                id: 6,
                group: 'B',
                stage: 'groups',
                home: 'العراق',
                away: 'قطر',
                date: '2024-12-16',
                time: '16:00',
                stadium: 'ملعب الملك سلمان',
                status: 'قادمة',
                score: '-'
            },
            // المجموعة ج
            {
                id: 7,
                group: 'C',
                stage: 'groups',
                home: 'الإمارات',
                away: 'سوريا',
                date: '2024-12-17',
                time: '20:00',
                stadium: 'ملعب الملك عبدالله',
                status: 'قادمة',
                score: '-'
            },
            {
                id: 8,
                group: 'C',
                stage: 'groups',
                home: 'الكويت',
                away: 'البحرين',
                date: '2024-12-17',
                time: '16:00',
                stadium: 'ملعب الملك فهد',
                status: 'قادمة',
                score: '-'
            },
            // المجموعة د
            {
                id: 9,
                group: 'D',
                stage: 'groups',
                home: 'عمان',
                away: 'فلسطين',
                date: '2024-12-18',
                time: '20:00',
                stadium: 'ملعب الملك سلمان',
                status: 'قادمة',
                score: '-'
            },
            {
                id: 10,
                group: 'D',
                stage: 'groups',
                home: 'السودان',
                away: 'جزر القمر',
                date: '2024-12-18',
                time: '16:00',
                stadium: 'ملعب المدينة التعليمية',
                status: 'قادمة',
                score: '-'
            }
        ],
        
        // ترتيب الهدافين
        scorers: [
            { rank: 1, name: 'محمد صلاح', team: 'مصر', goals: 0 },
            { rank: 2, name: 'سلامة العبدي', team: 'السعودية', goals: 0 },
            { rank: 3, name: 'أشرف حكيمي', team: 'المغرب', goals: 0 },
            { rank: 4, name: 'رياض محرز', team: 'الجزائر', goals: 0 },
            { rank: 5, name: 'عمر السومة', team: 'سوريا', goals: 0 }
        ]
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
            "⚽ كأس العرب 2025 يبدأ في السعودية بمشاركة 16 منتخباً عربياً",
            "🏆 البطل الحالي: الجزائر تتوج بلقب النسخة الماضية",
            "🌟 أكبر بطولات كرة القدم العربية تنطلق الشهر القادم",
            "🇸🇦 السعودية تستضيف كأس العرب للمرة الثانية في تاريخها",
            "🔥 مواجهات نارية تنتظرنا في المجموعات الأربع",
            "🎯 محمد صلاح يقود مصر للبحث عن اللقب الأول",
            "⚡ المنتخب السعودي يطمح للفوز باللقب على أرضه",
            "🏅 المغرب يطمح لتكرار إنجازاته العالمية في البطولة العربية"
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
    
    // ===== فلترة مباريات كأس العرب =====
    function setupMatchesFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const matchesCategories = document.querySelectorAll('.matches-category');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // إزالة النشاط من جميع الأزرار
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // إضافة النشاط للزر المضغوط
                button.classList.add('active');
                
                const stage = button.dataset.stage;
                
                // إظهار/إخفاء فئات المباريات
                matchesCategories.forEach(category => {
                    if (stage === 'all' || category.dataset.stage === stage) {
                        category.style.display = 'block';
                        // تأثير الظهور
                        category.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        category.style.display = 'none';
                    }
                });
                
                // إظهار رسالة
                const stageNames = {
                    'all': 'جميع المباريات',
                    'groups': 'مرحلة المجموعات',
                    'knockout': 'دور الـ16',
                    'quarter': 'ربع النهائي',
                    'semi': 'نصف النهائي',
                    'final': 'النهائي'
                };
                
                showMessage(`تم عرض ${stageNames[stage]}`, 'success');
            });
        });
    }
    
    // ===== تحديث نتائج المباريات =====
    function setupMatchesUpdates() {
        const matchCards = document.querySelectorAll('.match-card');
        
        // تحديث كل 30 ثانية
        setInterval(() => {
            matchCards.forEach(card => {
                const status = card.querySelector('.status');
                const score = card.querySelector('.score');
                
                // محاكاة تحديث المباريات القادمة إلى مباشرة
                if (status && status.textContent === 'قادمة') {
                    // 10% فرصة لتغيير حالة المباراة إلى مباشرة
                    if (Math.random() < 0.1) {
                        status.textContent = 'مباشر';
                        status.className = 'status live';
                        
                        // توليد نتيجة عشوائية
                        const homeScore = Math.floor(Math.random() * 3);
                        const awayScore = Math.floor(Math.random() * 3);
                        score.textContent = `${homeScore}-${awayScore}`;
                        
                        // إشعار بالمباراة المباشرة
                        const teams = card.querySelectorAll('.team span');
                        if (teams.length >= 2) {
                            showMessage(`🔴 مباراة مباشرة: ${teams[0].textContent} vs ${teams[1].textContent}`, 'warning');
                        }
                    }
                }
                
                // محاكاة انتهاء المباريات المباشرة
                if (status && status.textContent === 'مباشر') {
                    // 5% فرصة لإنهاء المباراة
                    if (Math.random() < 0.05) {
                        status.textContent = 'انتهت';
                        status.className = 'status finished';
                    }
                }
            });
        }, 30000); // كل 30 ثانية
    }
    
    // ===== تحديث ترتيب المجموعات =====
    function updateGroupStandings() {
        // محاكاة تحديث النقاط
        setInterval(() => {
            const teamItems = document.querySelectorAll('.team-item');
            
            teamItems.forEach(item => {
                const pointsElement = item.querySelector('.team-points');
                if (pointsElement) {
                    const currentPoints = parseInt(pointsElement.textContent) || 0;
                    
                    // 5% فرصة لزيادة النقاط
                    if (Math.random() < 0.05) {
                        const newPoints = currentPoints + 3;
                        pointsElement.textContent = newPoints;
                        
                        // تأثير التحديث
                        pointsElement.style.transition = 'all 0.3s';
                        pointsElement.style.transform = 'scale(1.2)';
                        setTimeout(() => {
                            pointsElement.style.transform = 'scale(1)';
                        }, 300);
                    }
                }
            });
        }, 60000); // كل دقيقة
    }
    
    // ===== عرض مباريات المجموعة =====
    function showGroupMatches(groupId) {
        const matches = ArabCupData.matches.filter(match => match.group === groupId);
        
        if (matches.length === 0) {
            showMessage('لا توجد مباريات لهذه المجموعة بعد', 'warning');
            return;
        }
        
        let matchesHTML = `
            <div class="group-matches-modal">
                <h3><i class="fas fa-users"></i> مباريات المجموعة ${groupId}</h3>
                <div class="matches-list">
        `;
        
        matches.forEach(match => {
            matchesHTML += `
                <div class="match-item">
                    <div class="match-teams">
                        <span class="team">${match.home}</span>
                        <span class="vs">VS</span>
                        <span class="team">${match.away}</span>
                    </div>
                    <div class="match-info">
                        <span class="date">${match.date}</span>
                        <span class="time">${match.time}</span>
                        <span class="stadium">${match.stadium}</span>
                    </div>
                    <div class="match-status ${match.status}">
                        ${match.status === 'قادمة' ? '<i class="far fa-clock"></i>' : 
                          match.status === 'مباشر' ? '<i class="fas fa-bolt"></i>' : 
                          '<i class="fas fa-check-circle"></i>'}
                        ${match.status}
                    </div>
                </div>
            `;
        });
        
        matchesHTML += `
                </div>
                <button class="close-modal" onclick="closeModal()">
                    <i class="fas fa-times"></i> إغلاق
                </button>
            </div>
        `;
        
        // إنشاء نافذة عرض
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = matchesHTML;
        document.body.appendChild(modal);
        
        // إضافة أنماط للمودال
        const style = document.createElement('style');
        style.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .group-matches-modal {
                background: white;
                border-radius: 15px;
                padding: 30px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            
            .group-matches-modal h3 {
                color: #1E5631;
                margin-bottom: 20px;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }
            
            .matches-list {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .match-item {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 10px;
                border: 1px solid #e0e0e0;
            }
            
            .match-teams {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
                font-weight: bold;
                color: #333;
            }
            
            .match-info {
                display: flex;
                justify-content: space-between;
                color: #666;
                font-size: 0.9rem;
                margin-bottom: 10px;
                flex-wrap: wrap;
                gap: 10px;
            }
            
            .match-status {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 5px 15px;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 500;
            }
            
            .match-status.قادمة {
                background: #ffc107;
                color: #856404;
            }
            
            .match-status.مباشر {
                background: #dc3545;
                color: white;
                animation: pulse 1.5s infinite;
            }
            
            .match-status.انتهت {
                background: #28a745;
                color: white;
            }
            
            .close-modal {
                background: #1E5631;
                color: white;
                border: none;
                padding: 10px 25px;
                border-radius: 20px;
                cursor: pointer;
                font-size: 1rem;
                display: flex;
                align-items: center;
                gap: 8px;
                margin: 20px auto 0;
                transition: all 0.3s;
            }
            
            .close-modal:hover {
                background: #2E7D32;
                transform: scale(1.05);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.7; }
                100% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // دالة إغلاق المودال
        window.closeModal = function() {
            modal.remove();
            style.remove();
        };
        
        // إغلاق المودال عند النقر خارج المحتوى
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // ===== تحديث الهدافين =====
    function updateTopScorers() {
        setInterval(() => {
            const scorersTable = document.querySelector('.scorers-table tbody');
            if (!scorersTable) return;
            
            const rows = scorersTable.querySelectorAll('tr');
            
            rows.forEach(row => {
                const goalsCell = row.querySelector('td:last-child');
                if (goalsCell) {
                    // 2% فرصة لزيادة الأهداف
                    if (Math.random() < 0.02) {
                        const currentGoals = parseInt(goalsCell.textContent) || 0;
                        goalsCell.textContent = currentGoals + 1;
                        
                        // تأثير التحديث
                        goalsCell.style.transition = 'all 0.3s';
                        goalsCell.style.backgroundColor = '#d4edda';
                        goalsCell.style.transform = 'scale(1.1)';
                        
                        setTimeout(() => {
                            goalsCell.style.backgroundColor = '';
                            goalsCell.style.transform = 'scale(1)';
                        }, 500);
                    }
                }
            });
        }, 120000); // كل دقيقتين
    }
    
    // ===== تحديث التحديثات المباشرة =====
    function setupLiveUpdates() {
        const updatesContainer = document.querySelector('.updates-container');
        if (!updatesContainer) return;
        
        const updates = [
            {
                type: 'live',
                title: 'مباراة مباشرة: السعودية vs مصر',
                text: 'الدقيقة 45 - النتيجة: 0-0',
                time: 'الآن مباشر'
            },
            {
                type: 'upcoming',
                title: 'المباراة القادمة: المغرب vs الجزائر',
                text: 'تبدأ بعد 30 دقيقة',
                time: '16:30'
            },
            {
                type: 'finished',
                title: 'المباراة المنتهية: الأردن 1-0 تونس',
                text: 'انتهت المباراة',
                time: 'منذ ساعة'
            }
        ];
        
        // تحديث كل 45 ثانية
        setInterval(() => {
            // تغيير ترتيب التحديثات عشوائياً
            const shuffledUpdates = [...updates].sort(() => Math.random() - 0.5);
            
            // تحديث المحتوى
            updatesContainer.innerHTML = '';
            
            shuffledUpdates.forEach(update => {
                const updateItem = document.createElement('div');
                updateItem.className = `update-item ${update.type}`;
                
                updateItem.innerHTML = `
                    <div class="update-icon">
                        <i class="fas ${update.type === 'live' ? 'fa-circle' : 
                                       update.type === 'upcoming' ? 'fa-clock' : 
                                       'fa-check-circle'}"></i>
                    </div>
                    <div class="update-content">
                        <h4>${update.title}</h4>
                        <p>${update.text}</p>
                        <span class="update-time">${update.time}</span>
                    </div>
                `;
                
                updatesContainer.appendChild(updateItem);
            });
            
            // تأثير التحديث
            updatesContainer.style.opacity = '0.5';
            setTimeout(() => {
                updatesContainer.style.transition = 'opacity 0.5s ease';
                updatesContainer.style.opacity = '1';
            }, 300);
        }, 45000); // كل 45 ثانية
    }
    
    // ===== تحميل الأعلام =====
    async function loadTeamFlags() {
        const flagImages = document.querySelectorAll('.team-flag');
        
        flagImages.forEach(img => {
            const src = img.getAttribute('src');
            if (src && src.includes('.svg')) {
                // إضافة حدث لتحميل الصور
                img.onerror = function() {
                    this.src = 'images/saudi.svg'; // صورة افتراضية
                };
            }
        });
    }
    
    // ===== تهيئة القسم الرياضي =====
    function setupSportsSection() {
        // إضافة تأثيرات للبطاقات
        const cards = document.querySelectorAll('.team-card, .group-card, .match-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
            });
        });
        
        // إضافة أزرار التفاعل
        const groupButtons = document.querySelectorAll('.group-matches-btn');
        groupButtons.forEach(button => {
            button.addEventListener('click', function() {
                const groupId = this.closest('.group-card').querySelector('.group-header').textContent.replace('المجموعة ', '');
                showGroupMatches(groupId.trim());
            });
        });
    }
    
    // ===== التحديث التلقائي =====
    function setupAutoRefresh() {
        // تحديث عدد المشاهدات كل 30 دقيقة
        setInterval(() => {
            const viewsCounter = document.querySelector('.count[data-target="25300"]');
            if (viewsCounter) {
                const current = parseInt(viewsCounter.textContent.replace(/,/g, '')) || 25300;
                const increment = Math.floor(Math.random() * 10) + 1;
                viewsCounter.textContent = (current + increment).toLocaleString();
            }
        }, 1800000); // 30 دقيقة
    }
    
    // ===== التهيئة عند تحميل الصفحة =====
    document.addEventListener('DOMContentLoaded', function() {
        console.log('✅ ميدان العرب - التهيئة الكاملة لكأس العرب');
        
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
        
        // إعداد فلتر المباريات
        setupMatchesFilter();
        
        // إعداد تحديثات المباريات
        setupMatchesUpdates();
        
        // تحديث ترتيب المجموعات
        updateGroupStandings();
        
        // تحديث الهدافين
        updateTopScorers();
        
        // تحديث التحديثات المباشرة
        setupLiveUpdates();
        
        // تحميل الأعلام
        loadTeamFlags();
        
        // تهيئة القسم الرياضي
        setupSportsSection();
        
        // إعداد التحديث التلقائي
        setupAutoRefresh();
        
        // إضافة أنيميشن للأعلام
        const flags = document.querySelectorAll('.team-flag');
        flags.forEach(flag => {
            flag.addEventListener('mouseenter', () => {
                flag.style.transition = 'transform 0.3s ease';
                flag.style.transform = 'scale(1.2) rotate(5deg)';
            });
            
            flag.addEventListener('mouseleave', () => {
                flag.style.transform = 'scale(1) rotate(0deg)';
            });
        });
        
        // إظهار رسالة ترحيب
        setTimeout(() => {
            showMessage('مرحباً بك في متابعة كأس العرب 2025! 🇸🇦⚽', 'success');
        }, 1500);
    });
    
    // ===== جعل الدوال متاحة عالمياً =====
    window.Utils = Utils;
    window.showMessage = showMessage;
    window.showGroupMatches = showGroupMatches;
    window.closeModal = function() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) modal.remove();
    };
    
    // إضافة أنماط إضافية للأنيميشن
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInLeft {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        .live {
            animation: pulse 1.5s infinite;
        }
        
        .bounce {
            animation: bounce 0.5s ease;
        }
    `;
    document.head.appendChild(animationStyles);
    
})();
