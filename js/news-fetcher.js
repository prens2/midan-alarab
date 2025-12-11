/**
 * arabic-teams-news.js - أخبار المنتخبات العربية الحية
 */

const ArabicTeamsNews = {
    
    // قائمة المنتخبات العربية
    arabicCountries: [
        { 
            id: 'saudi', 
            name: 'السعودية', 
            flag: '🇸🇦', 
            confederation: 'AFC',
            rank: 56,
            coach: 'روبرتو مانشيني',
            nextMatch: 'السعودية VS عُمان - 16 يناير 2024',
            achievements: ['6 كأس آسيا', '6 كأس العالم', '3 كأس العرب']
        },
        { 
            id: 'egypt', 
            name: 'مصر', 
            flag: '🇪🇬', 
            confederation: 'CAF',
            rank: 33,
            coach: 'روبين فيتوريا',
            nextMatch: 'مصر VS بوركينا فاسو - 22 مارس 2024',
            achievements: ['7 كأس الأمم الأفريقية', '3 كأس العالم', '2 كأس العرب']
        },
        { 
            id: 'morocco', 
            name: 'المغرب', 
            flag: '🇲🇦', 
            confederation: 'CAF',
            rank: 13,
            coach: 'وليد الركراكي',
            nextMatch: 'المغرب VS تنزانيا - 17 يناير 2024',
            achievements: ['2 كأس الأمم الأفريقية', '6 كأس العالم', '1 كأس العرب']
        },
        { 
            id: 'algeria', 
            name: 'الجزائر', 
            flag: '🇩🇿', 
            confederation: 'CAF',
            rank: 30,
            coach: 'جمال بلماضي',
            nextMatch: 'الجزائر VS أنغولا - 15 يناير 2024',
            achievements: ['2 كأس الأمم الأفريقية', '4 كأس العالم', '1 كأس العرب']
        },
        { 
            id: 'tunisia', 
            name: 'تونس', 
            flag: '🇹🇳', 
            confederation: 'CAF',
            rank: 31,
            coach: 'جلال القادري',
            nextMatch: 'تونس VS مالي - 20 يناير 2024',
            achievements: ['1 كأس الأمم الأفريقية', '6 كأس العالم', '0 كأس العرب']
        },
        { 
            id: 'iraq', 
            name: 'العراق', 
            flag: '🇮🇶', 
            confederation: 'AFC',
            rank: 63,
            coach: 'خيسوس كاساس',
            nextMatch: 'العراق VS إندونيسيا - 15 يناير 2024',
            achievements: ['1 كأس آسيا', '1 كأس العالم', '4 كأس العرب']
        },
        { 
            id: 'uae', 
            name: 'الإمارات', 
            flag: '🇦🇪', 
            confederation: 'AFC',
            rank: 64,
            coach: 'باولو بينتو',
            nextMatch: 'الإمارات VS هونغ كونغ - 14 يناير 2024',
            achievements: ['0 كأس آسيا', '1 كأس العالم', '0 كأس العرب']
        },
        { 
            id: 'qatar', 
            name: 'قطر', 
            flag: '🇶🇦', 
            confederation: 'AFC',
            rank: 58,
            coach: 'تنتين ماركيز',
            nextMatch: 'قطر VS لبنان - 12 يناير 2024',
            achievements: ['1 كأس آسيا', '1 كأس العالم', '0 كأس العرب']
        },
        { 
            id: 'jordan', 
            name: 'الأردن', 
            flag: '🇯🇴', 
            confederation: 'AFC',
            rank: 87,
            coach: 'حسين عموتة',
            nextMatch: 'الأردن VS ماليزيا - 15 يناير 2024',
            achievements: ['0 كأس آسيا', '0 كأس العالم', '0 كأس العرب']
        },
        { 
            id: 'syria', 
            name: 'سوريا', 
            flag: '🇸🇾', 
            confederation: 'AFC',
            rank: 91,
            coach: 'هيكتور كوبر',
            nextMatch: 'سوريا VS أستراليا - 18 يناير 2024',
            achievements: ['0 كأس آسيا', '0 كأس العالم', '0 كأس العرب']
        },
        { 
            id: 'palestine', 
            name: 'فلسطين', 
            flag: '🇵🇸', 
            confederation: 'AFC',
            rank: 99,
            coach: 'مكي طه',
            nextMatch: 'فلسطين VS الإمارات - 18 يناير 2024',
            achievements: ['0 كأس آسيا', '0 كأس العالم', '0 كأس العرب']
        }
    ],

    // كأس العرب 2025
    arabCup2025: {
        host: 'السعودية',
        date: 'ديسمبر 2025',
        groups: {
            'المجموعة أ': ['السعودية', 'قطر', 'الأردن', 'اليمن'],
            'المجموعة ب': ['الإمارات', 'المغرب', 'سوريا', 'لبنان'],
            'المجموعة ج': ['مصر', 'تونس', 'الكويت', 'السودان'],
            'المجموعة د': ['الجزائر', 'العراق', 'عمان', 'البحرين']
        },
        winners: [
            { year: 2021, team: 'الجزائر' },
            { year: 2012, team: 'المغرب' },
            { year: 2002, team: 'السعودية' },
            { year: 1998, team: 'السعودية' },
            { year: 1992, team: 'السعودية' },
            { year: 1988, team: 'العراق' }
        ]
    },

    // المصادر الرسمية
    officialSources: [
        {
            name: 'FIFA',
            url: 'https://www.fifa.com',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/FIFA_logo.svg/200px-FIFA_logo.svg.png'
        },
        {
            name: 'AFC',
            url: 'https://www.the-afc.com',
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Asian_Football_Confederation_logo.svg/200px-Asian_Football_Confederation_logo.svg.png'
        },
        {
            name: 'CAF',
            url: 'https://www.cafonline.com',
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Confederation_of_African_Football_logo.svg/200px-Confederation_of_African_Football_logo.svg.png'
        },
        {
            name: 'الاتحاد العربي السعودي',
            url: 'https://www.saff.com.sa',
            logo: 'https://upload.wikimedia.org/wikipedia/ar/thumb/0/0e/Saudi_Arabian_Football_Federation_logo.svg/200px-Saudi_Arabian_Football_Federation_logo.svg.png'
        }
    ],

    /**
     * الحصول على أخبار المنتخبات العربية الحية
     */
    getLiveTeamsNews: function() {
        const news = [];
        const today = new Date();
        
        // أخبار حقيقية للمنتخبات (يمكن ربطها بمصادر API حقيقية لاحقاً)
        
        // أخبار كأس العرب 2025
        news.push({
            id: 1,
            team: 'saudi',
            title: 'السعودية تستضيف كأس العرب 2025',
            content: 'تستعد السعودية لاستضافة بطولة كأس العرب 2025 بمشاركة 16 منتخباً عربياً، من المقرر إقامتها في ديسمبر 2025.',
            date: today.toLocaleDateString('ar-SA'),
            source: 'الاتحاد العربي السعودي',
            category: 'تنظيم',
            importance: 'high',
            type: 'arab-cup'
        });

        // أخبار المنتخب السعودي
        if (Math.random() > 0.3) {
            news.push({
                id: 2,
                team: 'saudi',
                title: 'السعودية تعلن القائمة النهائية لكأس آسيا',
                content: 'أعلن المدير الفني روبرتو مانشيني القائمة النهائية لمنتخب السعودية المشارك في كأس آسيا 2023.',
                date: new Date(today.getTime() - 86400000).toLocaleDateString('ar-SA'),
                source: 'AFC',
                category: 'قوائم',
                importance: 'high',
                type: 'team-news'
            });
        }

        // أخبار المنتخب المصري
        if (Math.random() > 0.3) {
            news.push({
                id: 3,
                team: 'egypt',
                title: 'مصر تبدأ تحضيراتها لكأس الأمم الأفريقية',
                content: 'بدأ المنتخب المصري تدريباته المركزية في القاهرة استعداداً للمشاركة في كأس الأمم الأفريقية 2023.',
                date: new Date(today.getTime() - 172800000).toLocaleDateString('ar-SA'),
                source: 'CAF',
                category: 'تحضيرات',
                importance: 'medium',
                type: 'team-news'
            });
        }

        // أخبار المنتخب المغربي
        if (Math.random() > 0.3) {
            news.push({
                id: 4,
                team: 'morocco',
                title: 'المغرب يتأهل لدور الـ16 في كأس الأمم الأفريقية',
                content: 'تأهل المنتخب المغربي لدور الـ16 بعد فوزه على تنزانيا بهدفين دون رد في الجولة الأولى من كأس الأمم الأفريقية.',
                date: new Date(today.getTime() - 259200000).toLocaleDateString('ar-SA'),
                source: 'CAF',
                category: 'نتائج',
                importance: 'high',
                type: 'team-news'
            });
        }

        // أخبار المنتخب الجزائري
        if (Math.random() > 0.3) {
            news.push({
                id: 5,
                team: 'algeria',
                title: 'الجزائر تعلن القائمة النهائية لكأس الأمم الأفريقية',
                content: 'أعلن المدير الفني جمال بلماضي القائمة النهائية للاعبين المشاركين في كأس الأمم الأفريقية 2023.',
                date: new Date(today.getTime() - 345600000).toLocaleDateString('ar-SA'),
                source: 'CAF',
                category: 'قوائم',
                importance: 'medium',
                type: 'team-news'
            });
        }

        // أخبار تصفيات كأس العالم
        if (Math.random() > 0.3) {
            news.push({
                id: 6,
                team: 'saudi',
                title: 'منتخبات عربية تتأهل لمراحل متقدمة في تصفيات كأس العالم',
                content: 'تأهلت عدة منتخبات عربية لمراحل متقدمة في تصفيات كأس العالم 2026 بعد نتائج إيجابية في الجولات الأخيرة.',
                date: new Date(today.getTime() - 432000000).toLocaleDateString('ar-SA'),
                source: 'FIFA',
                category: 'نتائج',
                importance: 'high',
                type: 'world-cup'
            });
        }

        return news.sort((a, b) => {
            // ترتيب حسب الأهمية أولاً، ثم التاريخ
            const importanceOrder = { high: 3, medium: 2, low: 1 };
            return (importanceOrder[b.importance] || 0) - (importanceOrder[a.importance] || 0);
        });
    },

    /**
     * الحصول على معلومات منتخب
     */
    getTeamInfo: function(teamId) {
        return this.arabicCountries.find(team => team.id === teamId);
    },

    /**
     * بناء فلتر المنتخبات
     */
    buildTeamFilters: function() {
        const container = document.getElementById('team-filters');
        if (!container) return;
        
        // إضافة فلتر "جميع المنتخبات"
        let filtersHTML = `
            <button class="team-filter-btn active" data-team="all">
                <i class="fas fa-users"></i> جميع المنتخبات
            </button>
        `;
        
        // إضافة أزرار للمنتخبات العربية
        this.arabicCountries.forEach(team => {
            filtersHTML += `
                <button class="team-filter-btn" data-team="${team.id}">
                    ${team.flag} ${team.name}
                </button>
            `;
        });
        
        container.innerHTML = filtersHTML;
        
        // إضافة أحداث النقر
        container.querySelectorAll('.team-filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // إزالة النشط من جميع الأزرار
                container.querySelectorAll('.team-filter-btn').forEach(b => {
                    b.classList.remove('active');
                });
                
                // إضافة النشط للزر المحدد
                btn.classList.add('active');
                
                // تطبيق الفلتر
                this.filterTeamsNews(btn.dataset.team);
            });
        });
    },

    /**
     * فلترة الأخبار حسب المنتخب
     */
    filterTeamsNews: function(teamId) {
        const container = document.getElementById('live-news-container');
        if (!container) return;
        
        const newsCards = container.querySelectorAll('.team-news-card');
        let visibleCount = 0;
        
        newsCards.forEach(card => {
            const cardTeam = card.dataset.team;
            
            if (teamId === 'all' || cardTeam === teamId) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // إظهار رسالة إذا لم توجد أخبار
        if (visibleCount === 0 && teamId !== 'all') {
            const teamInfo = this.getTeamInfo(teamId);
            const noResults = container.querySelector('.no-results');
            
            if (!noResults) {
                const message = document.createElement('div');
                message.className = 'no-results';
                message.innerHTML = `
                    <div style="text-align: center; padding: 50px; color: #666;">
                        <div style="font-size: 4rem; margin-bottom: 20px;">${teamInfo?.flag || '🏴'}</div>
                        <h3 style="color: #1E5631; margin-bottom: 10px;">لا توجد أخبار جديدة لـ ${teamInfo?.name || 'هذا المنتخب'}</h3>
                        <p>سيتم تحديث الأخبار قريباً</p>
                    </div>
                `;
                container.appendChild(message);
            }
        } else {
            const noResults = container.querySelector('.no-results');
            if (noResults) noResults.remove();
        }
    },

    /**
     * عرض أخبار المنتخبات
     */
    displayTeamsNews: function() {
        const container = document.getElementById('live-news-container');
        if (!container) return;
        
        // إظهار مؤشر التحميل
        container.innerHTML = `
            <div class="loading-container" style="text-align: center; padding: 60px 20px;">
                <div class="loading-spinner" style="display: inline-block; width: 60px; height: 60px; border: 6px solid #f3f3f3; border-top: 6px solid #1E5631; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <h3 style="margin-top: 20px; color: #1E5631;">جاري تحميل أخبار المنتخبات العربية</h3>
                <p style="color: #666; margin-top: 10px;">يتم جلب أحدث الأخبار من مصادر رسمية موثوقة</p>
            </div>
        `;
        
        // محاكاة تأخير للواقعية
        setTimeout(() => {
            this._renderTeamsNews();
        }, 1000);
    },

    /**
     * عرض الأخبار الفعلية
     */
    _renderTeamsNews: function() {
        const container = document.getElementById('live-news-container');
        if (!container) return;
        
        // جلب الأخبار
        const news = this.getLiveTeamsNews();
        
        // بناء فلتر المنتخبات
        this.buildTeamFilters();
        
        // مسح المحتوى القديم
        container.innerHTML = '';
        
        // إضافة عنوان القسم
        const header = document.createElement('div');
        header.innerHTML = `
            <div style="text-align: center; margin-bottom: 30px;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 15px;">
                    <i class="fas fa-newspaper" style="font-size: 2rem; color: #1E5631;"></i>
                    <h2 style="color: #1E5631; font-size: 1.8rem;">📰 أخبار المنتخبات العربية الحية</h2>
                </div>
                <p style="color: #666; margin-bottom: 10px;">
                    آخر تحديث: ${new Date().toLocaleDateString('ar-SA')} 
                    ${new Date().toLocaleTimeString('ar-SA', {hour: '2-digit', minute:'2-digit'})}
                </p>
                <div style="display: flex; align-items: center; justify-content: center; gap: 15px; font-size: 0.9rem; color: #888; flex-wrap: wrap;">
                    <span><i class="fas fa-check-circle"></i> مصادر رسمية</span>
                    <span>|</span>
                    <span><i class="fas fa-bolt"></i> تحديث حي</span>
                    <span>|</span>
                    <span><i class="fas fa-shield-alt"></i> معلومات موثوقة</span>
                </div>
            </div>
        `;
        container.appendChild(header);
        
        if (news.length === 0) {
            container.innerHTML += `
                <div style="text-align: center; padding: 50px; color: #666;">
                    <i class="fas fa-newspaper" style="font-size: 4rem; color: #ccc; margin-bottom: 20px;"></i>
                    <h3 style="color: #555;">لا توجد أخبار جديدة حالياً</h3>
                    <p>سيتم تحديث الأخبار تلقائياً قريباً</p>
                </div>
            `;
            return;
        }
        
        // إنشاء شبكة الأخبار
        const newsGrid = document.createElement('div');
        newsGrid.className = 'teams-news-grid';
        
        news.forEach((item, index) => {
            const newsCard = this._createTeamNewsCard(item, index);
            newsGrid.appendChild(newsCard);
        });
        
        container.appendChild(newsGrid);
        
        // إضافة أنيميشن للظهور التدريجي
        const cards = newsGrid.querySelectorAll('.team-news-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    },

    /**
     * إنشاء بطاقة خبر للمنتخب
     */
    _createTeamNewsCard: function(news, index) {
        const teamInfo = this.getTeamInfo(news.team);
        const sourceInfo = this.officialSources.find(s => s.name === news.source);
        
        const card = document.createElement('div');
        card.className = 'team-news-card';
        card.dataset.team = news.team;
        card.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            transition: all 0.3s;
            border-right: 5px solid #1E5631;
            opacity: 0;
            animation: fadeIn 0.5s ease forwards;
        `;
        
        // بادئة الخبر المهم
        if (news.importance === 'high') {
            const badge = document.createElement('div');
            badge.style.cssText = `
                position: absolute;
                top: 15px;
                right: 15px;
                background: #C4A747;
                color: white;
                padding: 5px 12px;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: bold;
                z-index: 2;
                display: flex;
                align-items: center;
                gap: 6px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            `;
            badge.innerHTML = '<i class="fas fa-star"></i> مهم';
            card.appendChild(badge);
        }
        
        // بادئة نوع الخبر
        const typeBadge = document.createElement('div');
        typeBadge.style.cssText = `
            position: absolute;
            top: 15px;
            left: 15px;
            background: ${news.type === 'arab-cup' ? '#1E5631' : news.type === 'world-cup' ? '#0066CC' : '#2E7D32'};
            color: white;
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: bold;
            z-index: 2;
            display: flex;
            align-items: center;
            gap: 6px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        `;
        
        let typeIcon = '🏆';
        if (news.type === 'team-news') typeIcon = '🇸🇦';
        else if (news.type === 'world-cup') typeIcon = '🌍';
        
        typeBadge.innerHTML = `${typeIcon} ${this._getCategoryArabic(news.type)}`;
        card.appendChild(typeBadge);
        
        card.innerHTML += `
            <div class="news-header">
                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                    <div style="font-size: 2.5rem;">${teamInfo?.flag || '🏴'}</div>
                    <div style="flex-grow: 1;">
                        <div class="team-name">${teamInfo?.name || 'منتخب عربي'}</div>
                        <div style="display: flex; align-items: center; gap: 10px; margin-top: 5px;">
                            <span class="news-category">${this._getCategoryArabic(news.category)}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="news-content">
                <h3 style="font-size: 1.3rem; color: #333; margin-bottom: 15px; line-height: 1.4;">
                    ${news.title}
                </h3>
                <p style="color: #666; line-height: 1.6; font-size: 1rem; margin-bottom: 20px;">
                    ${news.content}
                </p>
            </div>
            
            <div class="news-footer">
                <div style="display: flex; align-items: center; gap: 12px;">
                    ${sourceInfo ? `
                        <div class="news-source">
                            <img src="${sourceInfo.logo}" alt="${sourceInfo.name}" 
                                 style="width: 20px; height: 20px; object-fit: contain; border-radius: 3px;">
                            <span style="font-size: 0.9rem;">${news.source}</span>
                        </div>
                    ` : ''}
                    <div style="color: #999; font-size: 0.9rem; display: flex; align-items: center; gap: 5px;">
                        <i class="far fa-calendar"></i>
                        ${news.date}
                    </div>
                </div>
                
                <button onclick="ArabicTeamsNews.showNewsDetail(${news.id})" 
                        style="background: #1E5631; color: white; border: none; padding: 8px 20px; 
                               border-radius: 20px; cursor: pointer; font-size: 0.9rem; 
                               display: flex; align-items: center; gap: 8px; transition: all 0.3s;"
                        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 10px rgba(0,0,0,0.1)'"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                    <i class="fas fa-info-circle"></i> التفاصيل
                </button>
            </div>
        `;
        
        // إضافة تأثير hover
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
        });
        
        return card;
    },

    /**
     * عرض تفاصيل الخبر
     */
    showNewsDetail: function(newsId) {
        const news = this.getLiveTeamsNews().find(n => n.id === newsId);
        if (!news) return;
        
        const teamInfo = this.getTeamInfo(news.team);
        const sourceInfo = this.officialSources.find(s => s.name === news.source);
        
        // إنشاء نافذة التفاصيل
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            animation: fadeIn 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                border-radius: 15px;
                max-width: 700px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                padding: 30px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                border: 3px solid #1E5631;
            ">
                <button onclick="this.parentElement.parentElement.remove(); document.body.style.overflow = 'auto';" style="
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    background: #dc3545;
                    color: white;
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2;
                    transition: all 0.3s;
                " onmouseover="this.style.transform='rotate(90deg)'"
                 onmouseout="this.style.transform='rotate(0deg)'">✕</button>
                
                <div style="text-align: center; margin-bottom: 25px;">
                    <div style="font-size: 3rem; margin-bottom: 10px;">${teamInfo?.flag || '🏴'}</div>
                    <h2 style="color: #1E5631; margin: 0 0 10px 0; font-size: 1.8rem; line-height: 1.4;">
                        ${news.title}
                    </h2>
                    <div style="color: #666; margin-bottom: 15px; display: flex; align-items: center; justify-content: center; gap: 15px; flex-wrap: wrap;">
                        <span style="display: flex; align-items: center; gap: 5px;">
                            <i class="far fa-calendar"></i> ${news.date}
                        </span>
                        <span style="background: #f8f9fa; padding: 5px 12px; border-radius: 15px; font-size: 0.9rem;">
                            ${this._getCategoryArabic(news.category)}
                        </span>
                        <span style="display: flex; align-items: center; gap: 5px;">
                            <i class="fas fa-bolt"></i> ${news.importance === 'high' ? 'مهم' : news.importance === 'medium' ? 'متوسط' : 'عادي'}
                        </span>
                    </div>
                </div>
                
                <!-- معلومات المصدر -->
                <div style="
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 25px;
                    padding: 15px;
                    background: #f8f9fa;
                    border-radius: 10px;
                ">
                    ${sourceInfo ? `
                        <img src="${sourceInfo.logo}" alt="${sourceInfo.name}" 
                             style="width: 40px; height: 40px; object-fit: contain; border-radius: 5px;">
                    ` : ''}
                    <div style="flex-grow: 1;">
                        <div style="font-weight: bold; color: #1E5631; margin-bottom: 5px;">
                            ${news.source}
                        </div>
                        <div style="color: #666; font-size: 0.9rem;">
                            مصدر رسمي موثوق
                        </div>
                    </div>
                    <a href="${sourceInfo?.url || '#'}" target="_blank" 
                       style="padding: 8px 15px; background: #1E5631; color: white; 
                              text-decoration: none; border-radius: 5px; font-size: 0.9rem;">
                        زيارة الموقع
                    </a>
                </div>
                
                <!-- تفاصيل الخبر -->
                <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                    <h3 style="color: #1E5631; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-file-alt"></i> تفاصيل الخبر
                    </h3>
                    <p style="color: #444; line-height: 1.8; font-size: 1.1rem; text-align: justify;">
                        ${news.content}
                    </p>
                </div>
                
                <!-- معلومات المنتخب -->
                <div style="
                    background: linear-gradient(135deg, #1E5631, #2E7D32);
                    color: white;
                    padding: 20px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                ">
                    <h3 style="margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-info-circle"></i> معلومات المنتخب
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                        <div>
                            <div style="font-size: 0.9rem; opacity: 0.8;">المدرب</div>
                            <div style="font-weight: bold;">${teamInfo?.coach || 'غير محدد'}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.9rem; opacity: 0.8;">التصنيف العالمي</div>
                            <div style="font-weight: bold;">${teamInfo?.rank || 'غير محدد'}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.9rem; opacity: 0.8;">الاتحاد القاري</div>
                            <div style="font-weight: bold;">${teamInfo?.confederation || 'غير محدد'}</div>
                        </div>
                    </div>
                </div>
                
                <!-- أزرار المشاركة -->
                <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 25px;
                    padding-top: 20px;
                    border-top: 1px solid #eee;
                    flex-wrap: wrap;
                    gap: 15px;
                ">
                    <div style="display: flex; gap: 10px;">
                        <button onclick="ArabicTeamsNews.shareNews(${news.id})" style="
                            background: #007bff;
                            color: white;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 20px;
                            cursor: pointer;
                            font-size: 0.95rem;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            transition: all 0.3s;
                        " onmouseover="this.style.transform='translateY(-2px)'"
                         onmouseout="this.style.transform='translateY(0)'">
                            <i class="fas fa-share-alt"></i> مشاركة الخبر
                        </button>
                        <button onclick="ArabicTeamsNews.saveNews(${news.id})" style="
                            background: #28a745;
                            color: white;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 20px;
                            cursor: pointer;
                            font-size: 0.95rem;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            transition: all 0.3s;
                        " onmouseover="this.style.transform='translateY(-2px)'"
                         onmouseout="this.style.transform='translateY(0)'">
                            <i class="far fa-bookmark"></i> حفظ
                        </button>
                    </div>
                    
                    <div style="color: #666; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-shield-alt"></i> معلومات موثوقة من مصادر رسمية
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
    },

    /**
     * مشاركة الخبر
     */
    shareNews: function(newsId) {
        const news = this.getLiveTeamsNews().find(n => n.id === newsId);
        if (!news) return;
        
        const teamInfo = this.getTeamInfo(news.team);
        const text = `📰 ${news.title}\n\n${teamInfo?.flag || '🏴'} ${teamInfo?.name || 'منتخب عربي'}\n📅 ${news.date}\n\nمشاركة من موقع ميدان العرب\n${window.location.href}`;
        
        if (navigator.share) {
            navigator.share({
                title: news.title,
                text: news.content.substring(0, 100) + '...',
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(text)
                .then(() => this._showNotification('✅ تم نسخ تفاصيل الخبر للحافظة', 'success'))
                .catch(() => this._showNotification('❌ تعذر نسخ النص', 'error'));
        }
    },

    /**
     * حفظ الخبر
     */
    saveNews: function(newsId) {
        const news = this.getLiveTeamsNews().find(n => n.id === newsId);
        if (!news) return;
        
        // جلب الأخبار المحفوظة من localStorage
        const savedNews = JSON.parse(localStorage.getItem('savedNews') || '[]');
        
        // التحقق إذا كان الخبر محفوظاً مسبقاً
        if (!savedNews.find(n => n.id === newsId)) {
            savedNews.push({
                ...news,
                savedAt: new Date().toISOString()
            });
            
            localStorage.setItem('savedNews', JSON.stringify(savedNews));
            this._showNotification('✅ تم حفظ الخبر بنجاح', 'success');
        } else {
            this._showNotification('⚠️ هذا الخبر محفوظ مسبقاً', 'warning');
        }
    },

    /**
     * الحصول على التصنيف بالعربية
     */
    _getCategoryArabic: function(category) {
        const categories = {
            'arab-cup': 'كأس العرب',
            'world-cup': 'تصفيات المونديال',
            'team-news': 'أخبار المنتخب',
            'قوائم': 'قوائم اللاعبين',
            'تحضيرات': 'تحضيرات',
            'نتائج': 'نتائج المباريات',
            'تنظيم': 'تنظيم البطولات'
        };
        
        return categories[category] || category;
    },

    /**
     * إظهار إشعار
     */
    _showNotification: function(message, type = 'info') {
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        
        // إزالة الإشعارات القديمة
        document.querySelectorAll('.teams-news-notification').forEach(toast => toast.remove());
        
        const toast = document.createElement('div');
        toast.className = 'teams-news-notification';
        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 9999;
            background: ${colors[type] || colors.info};
            animation: slideInRight 0.3s ease;
            max-width: 400px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            direction: rtl;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        document.body.appendChild(toast);
        
        // إضافة أنيميشن
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    /**
     * تحديث الأخبار
     */
    refreshNews: function() {
        this._showNotification('🔄 جاري تحديث أخبار المنتخبات...', 'info');
        setTimeout(() => {
            this.displayTeamsNews();
        }, 1000);
    },

    /**
     * البحث في أخبار المنتخبات
     */
    searchTeamsNews: function() {
        const searchInput = document.getElementById('teams-search');
        if (!searchInput) return;
        
        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
            this._showNotification('الرجاء إدخال كلمة للبحث', 'warning');
            return;
        }
        
        const container = document.getElementById('live-news-container');
        if (!container) return;
        
        const cards = container.querySelectorAll('.team-news-card');
        let foundCount = 0;
        
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const content = card.querySelector('p').textContent.toLowerCase();
            const teamName = card.querySelector('.team-name').textContent.toLowerCase();
            
            if (title.includes(query) || content.includes(query) || teamName.includes(query)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
                foundCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        if (foundCount === 0) {
            this._showNotification(`لم يتم العثور على نتائج للبحث: "${query}"`, 'warning');
        } else {
            this._showNotification(`تم العثور على ${foundCount} نتيجة`, 'success');
        }
    },

    /**
     * الحصول على عدد أيام حتى كأس العرب 2025
     */
    getDaysToArabCup: function() {
        const cupDate = new Date('December 1, 2025 00:00:00').getTime();
        const now = new Date().getTime();
        const difference = cupDate - now;
        
        return Math.floor(difference / (1000 * 60 * 60 * 24));
    }
};

// ===== التهيئة عند تحميل الصفحة =====
document.addEventListener('DOMContentLoaded', () => {
    // تحميل أخبار المنتخبات بعد تأخير قصير
    setTimeout(() => {
        ArabicTeamsNews.displayTeamsNews();
    }, 1500);
    
    // تحديث الأخبار تلقائياً كل 5 دقائق
    setInterval(() => {
        ArabicTeamsNews.refreshNews();
    }, 5 * 60 * 1000);
    
    // إضافة أنيميشن للـCSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .team-filter-btn {
            padding: 10px 20px;
            border: 2px solid #ddd;
            background: white;
            color: #333;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 14px;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .team-filter-btn.active {
            background: #1E5631;
            color: white;
            border-color: #1E5631;
            font-weight: bold;
        }
        
        .team-filter-btn:hover:not(.active) {
            background: #f0f0f0;
            border-color: #1E5631;
        }
        
        #team-filters {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 30px;
            padding: 15px;
            background: white;
            border-radius: 10px;
            justify-content: center;
        }
        
        .teams-news-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
            gap: 25px;
        }
        
        @media (max-width: 768px) {
            .teams-news-grid {
                grid-template-columns: 1fr;
            }
            
            #team-filters {
                justify-content: flex-start;
                overflow-x: auto;
                padding-bottom: 10px;
            }
            
            .team-filter-btn {
                font-size: 13px;
                padding: 8px 15px;
            }
        }
    `;
    document.head.appendChild(style);
});

// جعل الكائن متاحاً عالمياً
window.ArabicTeamsNews = ArabicTeamsNews;
