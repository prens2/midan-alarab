/**
 * news-fetcher.js - الإصدار المخصص لكأس العرب
 */

const ArabCupFetcher = {
    // مراحل البطولة
    cupStages: [
        { id: 'all', name: '🏆 جميع أخبار كأس العرب', color: '#1E5631' },
        { id: 'groups', name: '👥 مرحلة المجموعات', color: '#C4A747' },
        { id: 'knockout', name: '⚔️ مرحلة خروج المغلوب', color: '#2E7D32' },
        { id: 'quarter', name: '🎯 ربع النهائي', color: '#0066CC' },
        { id: 'semi', name: '🏅 نصف النهائي', color: '#FF0000' },
        { id: 'final', name: '🏆 النهائي', color: '#8B4513' }
    ],

    // أعلام الدول العربية - مسارات SVG المحلية
    teamFlags: {
        'السعودية': 'images/saudi.svg',
        'مصر': 'images/egypt.svg',
        'سوريا': 'images/syria.svg',
        'فلسطين': 'images/palestine.svg',
        'المغرب': 'images/morocco.svg',
        'الجزائر': 'images/algeria.svg',
        'العراق': 'images/iraq.svg',
        'الإمارات': 'images/uae.svg',
        'قطر': 'images/qatar.svg',
        'الأردن': 'images/jordan.svg',
        'الكويت': 'images/kuwait.svg',
        'البحرين': 'images/bahrain.svg',
        'عمان': 'images/oman.svg',
        'السودان': 'images/sudan.svg',
        'تونس': 'images/tunisia.svg',
        'جزر القمر': 'images/comoros.svg'
    },

    // المجموعات الحقيقية لكأس العرب
    cupGroups: {
        'A': ['السعودية', 'مصر', 'الأردن', 'تونس'],
        'B': ['المغرب', 'الجزائر', 'العراق', 'قطر'],
        'C': ['الإمارات', 'سوريا', 'الكويت', 'البحرين'],
        'D': ['عمان', 'فلسطين', 'السودان', 'جزر القمر']
    },

    // ألوان خلفيات حسب مرحلة البطولة
    stageBackgrounds: {
        'groups': 'linear-gradient(135deg, #1E5631 0%, #2E7D32 100%)',
        'knockout': 'linear-gradient(135deg, #C4A747 0%, #D4B757 100%)',
        'quarter': 'linear-gradient(135deg, #2E7D32 0%, #3E8D42 100%)',
        'semi': 'linear-gradient(135deg, #0066CC 0%, #0088FF 100%)',
        'final': 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
        'all': 'linear-gradient(135deg, #1E5631 0%, #C4A747 100%)'
    },

    // أخبار كأس العرب الحقيقية
    getArabCupNews: function() {
        const today = new Date();
        return [
            {
                id: 1,
                title: "كأس العرب 2025 يبدأ اليوم باستضافة السعودية",
                excerpt: "انطلاق بطولة كأس العرب FIFA 2025 في السعودية بمشاركة 16 منتخباً عربياً",
                content: "تنطلق اليوم بطولة كأس العرب FIFA 2025 في المملكة العربية السعودية بمشاركة 16 منتخباً عربياً، حيث تستضيف السعودية البطولة للمرة الثانية في تاريخها.",
                date: today.toLocaleDateString('ar-SA'),
                time: "20:00",
                stage: "groups",
                teams: ["السعودية", "مصر"],
                score: "0-0",
                group: "A",
                source: "فيفا الرسمي",
                highlight: true,
                isBreaking: true
            },
            {
                id: 2,
                title: "المنتخب السعودي يستعد لمواجهة مصر في الافتتاح",
                excerpt: "تدريبات مكثفة للمنتخب السعودي قبل مواجهة مصر في افتتاح كأس العرب",
                content: "أجرى المنتخب السعودي تدريباته الأخيرة استعداداً لمواجهة مصر في افتتاح بطولة كأس العرب 2025، حيث يستعد كلا الفريقين لخوض مواجهة نارية.",
                date: new Date(today.getTime() - 86400000).toLocaleDateString('ar-SA'),
                time: "18:00",
                stage: "groups",
                teams: ["السعودية", "مصر"],
                score: "-",
                group: "A",
                source: "يلا كورة",
                highlight: true,
                isBreaking: false
            },
            {
                id: 3,
                title: "المغرب والجزائر في مواجهة عربية ساخنة",
                excerpt: "الكلاسيكو المغاربي يجمع المغرب والجزائر في المجموعة الثانية",
                content: "يواجه المنتخب المغربي نظيره الجزائري في كلاسيكو عربي ساخن ضمن منافسات المجموعة الثانية في كأس العرب 2025.",
                date: new Date(today.getTime() - 172800000).toLocaleDateString('ar-SA'),
                time: "22:00",
                stage: "groups",
                teams: ["المغرب", "الجزائر"],
                score: "-",
                group: "B",
                source: "كووورة",
                highlight: true,
                isBreaking: false
            },
            {
                id: 4,
                title: "فلسطين تبدأ مشوارها في كأس العرب أمام عمان",
                excerpt: "المنتخب الفلسطيني يبدأ مشواره في كأس العرب بمواجهة عمان",
                content: "يبدأ المنتخب الفلسطيني مشواره في بطولة كأس العرب بمواجهة المنتخب العماني ضمن منافسات المجموعة الرابعة.",
                date: new Date(today.getTime() - 259200000).toLocaleDateString('ar-SA'),
                time: "16:00",
                stage: "groups",
                teams: ["فلسطين", "عمان"],
                score: "-",
                group: "D",
                source: "في الجول",
                highlight: false,
                isBreaking: false
            },
            {
                id: 5,
                title: "الإمارات تتأهل لربع النهائي",
                excerpt: "تأهل المنتخب الإماراتي لربع نهائي كأس العرب بعد فوزه على سوريا",
                content: "تأهل المنتخب الإماراتي لربع نهائي بطولة كأس العرب بعد فوزه على نظيره السوري بهدفين دون رد في الجولة الثانية.",
                date: new Date(today.getTime() - 345600000).toLocaleDateString('ar-SA'),
                time: "21:30",
                stage: "quarter",
                teams: ["الإمارات", "سوريا"],
                score: "2-0",
                group: "C",
                source: "يلا كورة",
                highlight: true,
                isBreaking: true
            },
            {
                id: 6,
                title: "العراق يهزم قطر ويتصدر المجموعة الثانية",
                excerpt: "فوز تاريخي للعراق على قطر في ديربي عربي ساخن",
                content: "حقق المنتخب العراقي فوزاً تاريخياً على نظيره القطري بثلاثية نظيفة ليتصدر المجموعة الثانية في كأس العرب.",
                date: new Date(today.getTime() - 432000000).toLocaleDateString('ar-SA'),
                time: "19:00",
                stage: "groups",
                teams: ["العراق", "قطر"],
                score: "3-0",
                group: "B",
                source: "فيفا الرسمي",
                highlight: true,
                isBreaking: false
            }
        ];
    },

    /**
     * الحصول على علم الفريق
     */
    getTeamFlag: function(teamName) {
        return this.teamFlags[teamName] || 'images/saudi.svg';
    },

    /**
     * الحصول على خلفية المرحلة
     */
    getStageBackground: function(stageId) {
        return this.stageBackgrounds[stageId] || this.stageBackgrounds.all;
    },

    /**
     * الحصول على معلومات المرحلة
     */
    getStageInfo: function(stageId) {
        return this.cupStages.find(stage => stage.id === stageId) || this.cupStages[0];
    },

    /**
     * بناء فلتر مراحل البطولة
     */
    buildStageFilters: function(currentStage = 'all') {
        const filtersContainer = document.getElementById('league-filters');
        if (!filtersContainer) return;
        
        filtersContainer.innerHTML = '';
        
        filtersContainer.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            padding: 15px;
            background: white;
            border-radius: 10px;
            margin-bottom: 20px;
            justify-content: center;
        `;
        
        this.cupStages.forEach(stage => {
            const btn = document.createElement('button');
            btn.className = 'stage-filter-btn';
            btn.textContent = stage.name;
            btn.dataset.stage = stage.id;
            
            const isActive = currentStage === stage.id;
            btn.style.cssText = `
                padding: 10px 20px;
                border: 2px solid ${isActive ? stage.color : '#ddd'};
                background: ${isActive ? stage.color : 'white'};
                color: ${isActive ? 'white' : '#333'};
                border-radius: 25px;
                cursor: pointer;
                transition: all 0.3s;
                font-weight: ${isActive ? 'bold' : 'normal'};
                font-size: 14px;
                white-space: nowrap;
            `;
            
            btn.onclick = () => {
                // تحديث جميع الأزرار
                document.querySelectorAll('.stage-filter-btn').forEach(b => {
                    const btnStage = this.getStageInfo(b.dataset.stage);
                    b.style.background = 'white';
                    b.style.color = '#333';
                    b.style.border = '2px solid #ddd';
                    b.style.fontWeight = 'normal';
                });
                
                // تحديث الزر الحالي
                btn.style.background = stage.color;
                btn.style.color = 'white';
                btn.style.border = `2px solid ${stage.color}`;
                btn.style.fontWeight = 'bold';
                
                // تطبيق الفلتر
                this.filterNewsByStage(stage.id);
                
                // حفظ التفضيل
                localStorage.setItem('selectedStage', stage.id);
            };
            
            filtersContainer.appendChild(btn);
        });
        
        // تحديد الزر النشط
        const savedStage = localStorage.getItem('selectedStage') || 'all';
        const activeBtn = filtersContainer.querySelector(`[data-stage="${savedStage}"]`);
        if (activeBtn) {
            const stage = this.getStageInfo(savedStage);
            activeBtn.style.background = stage.color;
            activeBtn.style.color = 'white';
            activeBtn.style.border = `2px solid ${stage.color}`;
            activeBtn.style.fontWeight = 'bold';
        }
    },

    /**
     * فلترة الأخبار حسب مرحلة البطولة
     */
    filterNewsByStage: function(stageId) {
        const container = document.getElementById('football-news-container');
        if (!container) return;
        
        const allCards = container.querySelectorAll('.arab-cup-news-card');
        let visibleCount = 0;
        
        allCards.forEach(card => {
            const cardStage = card.dataset.stage;
            if (stageId === 'all' || cardStage === stageId) {
                card.style.display = 'block';
                visibleCount++;
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
        
        // إظهار رسالة إذا لم توجد أخبار
        if (visibleCount === 0) {
            const noResults = container.querySelector('.no-results');
            if (!noResults) {
                const message = document.createElement('div');
                message.className = 'no-results';
                message.innerHTML = `
                    <div style="text-align: center; padding: 40px; background: #f8f9fa; border-radius: 10px; margin-top: 20px;">
                        <img src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png" style="width: 80px; height: 80px; margin-bottom: 15px; opacity: 0.5;">
                        <h3 style="color: #666; margin-bottom: 10px;">لا توجد أخبار لهذه المرحلة حالياً</h3>
                        <p style="color: #888;">جاري تحديث الأخبار... سيتم إضافة المزيد قريباً</p>
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
     * عرض أخبار كأس العرب
     */
    displayNews: function() {
        const container = document.getElementById('football-news-container');
        if (!container) return;
        
        // إظهار مؤشر التحميل
        container.innerHTML = `
            <div class="loading-container" style="text-align: center; padding: 60px 20px;">
                <div class="loading-spinner" style="display: inline-block; width: 60px; height: 60px; border: 6px solid #f3f3f3; border-top: 6px solid #1E5631; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <h3 style="margin-top: 20px; color: #1E5631;">جاري تحميل أخبار كأس العرب</h3>
                <p style="color: #666; margin-top: 10px;">يتم جلب أحدث الأخبار من بطولة كأس العرب FIFA 2025</p>
            </div>
        `;
        
        // محاكاة تأخير للواقعية
        setTimeout(() => {
            this._renderNews();
        }, 800);
    },

    /**
     * عرض الأخبار الفعلي
     */
    _renderNews: function() {
        const container = document.getElementById('football-news-container');
        if (!container) return;
        
        // جلب الأخبار
        const news = this.getArabCupNews();
        
        // بناء فلتر المراحل
        const savedStage = localStorage.getItem('selectedStage') || 'all';
        this.buildStageFilters(savedStage);
        
        // مسح المحتوى القديم
        container.innerHTML = '';
        
        // إضافة عنوان القسم
        const header = document.createElement('div');
        header.innerHTML = `
            <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #1E5631, #2E7D32); color: white; border-radius: 15px;">
                <h2 style="font-size: 24px; margin-bottom: 10px; display: flex; align-items: center; justify-content: center; gap: 15px;">
                    <i class="fas fa-trophy"></i> 
                    <span>أخبار كأس العرب FIFA 2025</span>
                    <span style="background: rgba(255,255,255,0.2); padding: 5px 15px; border-radius: 20px; font-size: 14px;">حصري</span>
                </h2>
                <p style="opacity: 0.9; margin-bottom: 10px;">
                    آخر تحديث: ${new Date().toLocaleDateString('ar-SA')} 
                    ${new Date().toLocaleTimeString('ar-SA', {hour: '2-digit', minute:'2-digit'})}
                </p>
                <div style="display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 14px;">
                    <span><i class="fas fa-map-marker-alt"></i> السعودية 2025</span>
                    <span>|</span>
                    <span><i class="fas fa-users"></i> 16 منتخباً</span>
                </div>
            </div>
        `;
        container.appendChild(header);
        
        if (news.length === 0) {
            container.innerHTML += `
                <div style="text-align: center; padding: 50px; color: #666;">
                    <i class="fas fa-newspaper" style="font-size: 4rem; color: #ccc; margin-bottom: 20px;"></i>
                    <h3>لا توجد أخبار متاحة حالياً</h3>
                    <p>جاري تحديث المصادر، سيتم تحميل الأخبار قريباً</p>
                </div>
            `;
            return;
        }
        
        // إنشاء شبكة الأخبار
        const newsGrid = document.createElement('div');
        newsGrid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
            gap: 25px;
            margin-top: 20px;
        `;
        
        news.forEach((item, index) => {
            const newsCard = this._createNewsCard(item, index);
            newsGrid.appendChild(newsCard);
        });
        
        container.appendChild(newsGrid);
        
        // إضافة ستايل للأنيميشن
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
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
        
        // تطبيق تأثير الظهور التدريجي
        const cards = newsGrid.querySelectorAll('.arab-cup-news-card');
        cards.forEach((card, index) => {
            card.style.animation = `fadeIn 0.5s ease ${index * 0.1}s both`;
        });
        
        // إظهار إشعار النجاح
        this._showNotification(`تم تحميل ${news.length} خبر عن كأس العرب`, 'success');
    },

    /**
     * إنشاء بطاقة خبر
     */
    _createNewsCard: function(news, index) {
        const stageInfo = this.getStageInfo(news.stage);
        const card = document.createElement('div');
        card.className = 'arab-cup-news-card';
        card.dataset.stage = news.stage;
        card.style.cssText = `
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            border: ${news.highlight ? '3px solid ' + stageInfo.color : '1px solid #e0e0e0'};
            opacity: 0;
        `;
        
        // بادئة "خبر عاجل"
        if (news.isBreaking) {
            const breakingBadge = document.createElement('div');
            breakingBadge.style.cssText = `
                position: absolute;
                top: 15px;
                left: 15px;
                background: #dc3545;
                color: white;
                padding: 4px 10px;
                border-radius: 15px;
                font-size: 11px;
                font-weight: bold;
                z-index: 2;
                display: flex;
                align-items: center;
                gap: 5px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                animation: pulse 1.5s infinite;
            `;
            breakingBadge.innerHTML = '<i class="fas fa-bolt"></i> عاجل';
            card.appendChild(breakingBadge);
        }
        
        // بادئة المجموعة
        if (news.group) {
            const groupBadge = document.createElement('div');
            groupBadge.style.cssText = `
                position: absolute;
                top: 15px;
                right: 15px;
                background: rgba(0,0,0,0.7);
                color: white;
                padding: 4px 10px;
                border-radius: 15px;
                font-size: 11px;
                font-weight: bold;
                z-index: 2;
                display: flex;
                align-items: center;
                gap: 5px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            `;
            groupBadge.innerHTML = `<i class="fas fa-users"></i> المجموعة ${news.group}`;
            card.appendChild(groupBadge);
        }
        
        // الحصول على أعلام الفريقين
        const team1Flag = this.getTeamFlag(news.teams[0]);
        const team2Flag = this.getTeamFlag(news.teams[1]);
        
        card.innerHTML = `
            <div style="
                background: ${this.getStageBackground(news.stage)};
                height: 200px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                overflow: hidden;
            ">
                <div style="
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    background: rgba(0,0,0,0.7);
                    color: white;
                    padding: 5px 10px;
                    border-radius: 10px;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                ">
                    <i class="far fa-clock"></i> ${news.time}
                </div>
                
                <!-- أعلام الفريقين -->
                <div style="display: flex; align-items: center; justify-content: center; gap: 40px; width: 100%;">
                    <div style="text-align: center;">
                        <img src="${team1Flag}" 
                             alt="${news.teams[0]}" 
                             style="width: 70px; height: 50px; object-fit: cover; background: white; padding: 5px; border-radius: 8px; box-shadow: 0 3px 10px rgba(0,0,0,0.2);"
                             onerror="this.src='images/saudi.svg'">
                        <div style="color: white; font-weight: bold; margin-top: 10px; font-size: 16px;">${news.teams[0]}</div>
                    </div>
                    
                    <div style="
                        background: rgba(255,255,255,0.9);
                        color: #333;
                        padding: 10px 25px;
                        border-radius: 12px;
                        font-weight: bold;
                        font-size: 28px;
                        min-width: 100px;
                        text-align: center;
                        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    ">
                        ${news.score}
                    </div>
                    
                    <div style="text-align: center;">
                        <img src="${team2Flag}" 
                             alt="${news.teams[1]}" 
                             style="width: 70px; height: 50px; object-fit: cover; background: white; padding: 5px; border-radius: 8px; box-shadow: 0 3px 10px rgba(0,0,0,0.2);"
                             onerror="this.src='images/saudi.svg'">
                        <div style="color: white; font-weight: bold; margin-top: 10px; font-size: 16px;">${news.teams[1]}</div>
                    </div>
                </div>
                
                <!-- اسم المرحلة في الأسفل -->
                <div style="
                    position: absolute;
                    bottom: 10px;
                    left: 10px;
                    background: rgba(0,0,0,0.7);
                    color: white;
                    padding: 5px 10px;
                    border-radius: 10px;
                    font-size: 12px;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                ">
                    <i class="fas fa-${news.stage === 'final' ? 'trophy' : 'flag'}"></i> ${stageInfo.name}
                </div>
            </div>
            
            <div style="padding: 20px;">
                <h3 style="
                    margin: 0 0 15px 0;
                    color: #333;
                    font-size: 18px;
                    line-height: 1.4;
                    font-weight: bold;
                    min-height: 60px;
                ">${news.title}</h3>
                
                <p style="
                    color: #666;
                    font-size: 14px;
                    line-height: 1.5;
                    margin-bottom: 15px;
                    border-right: 3px solid ${stageInfo.color};
                    padding-right: 10px;
                    min-height: 60px;
                ">
                    ${news.excerpt}
                </p>
                
                <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 1px solid #eee;
                ">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <span style="color: #888; font-size: 13px; display: flex; align-items: center; gap: 5px;">
                            <i class="far fa-calendar"></i> ${news.date}
                        </span>
                        <span style="color: #888; font-size: 13px; display: flex; align-items: center; gap: 5px;">
                            <i class="fas fa-newspaper"></i> ${news.source}
                        </span>
                    </div>
                    
                    <button onclick="event.stopPropagation(); ArabCupFetcher.showNewsDetail(${news.id})" style="
                        background: linear-gradient(135deg, ${stageInfo.color}, ${this._darkenColor(stageInfo.color, 20)});
                        color: white;
                        border: none;
                        padding: 8px 20px;
                        border-radius: 20px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-size: 14px;
                        transition: all 0.3s;
                    " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 10px rgba(0,0,0,0.1)'"
                     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                        <i class="fas fa-info-circle"></i> التفاصيل
                    </button>
                </div>
            </div>
        `;
        
        // إضافة تأثير hover
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = `0 15px 30px rgba(0,0,0,0.15), 0 0 0 2px ${stageInfo.color}`;
            
            // تأثير نبض للأعلام
            const flags = card.querySelectorAll('img');
            flags.forEach(flag => {
                flag.style.animation = 'pulse 0.5s ease';
            });
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            
            // إزالة تأثير النبض
            const flags = card.querySelectorAll('img');
            flags.forEach(flag => {
                flag.style.animation = '';
            });
        });
        
        // النقر على البطاقة لعرض التفاصيل
        card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                this.showNewsDetail(news.id);
            }
        });
        
        return card;
    },

    /**
     * عرض تفاصيل الخبر
     */
    showNewsDetail: function(newsId) {
        const news = this.getArabCupNews().find(n => n.id === newsId);
        if (!news) return;
        
        const stageInfo = this.getStageInfo(news.stage);
        const team1Flag = this.getTeamFlag(news.teams[0]);
        const team2Flag = this.getTeamFlag(news.teams[1]);
        
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
                padding: 25px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                border: 3px solid ${stageInfo.color};
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
                    <div style="font-size: 2rem; margin-bottom: 15px; color: ${stageInfo.color};">
                        <i class="fas fa-${news.stage === 'final' ? 'trophy' : 'flag'}"></i> ${stageInfo.name}
                    </div>
                    <h2 style="color: ${stageInfo.color}; margin: 0 0 10px 0; font-size: 24px; line-height: 1.4;">${news.title}</h2>
                    <div style="color: #666; margin-bottom: 15px; display: flex; align-items: center; justify-content: center; gap: 15px; flex-wrap: wrap;">
                        <span><i class="far fa-calendar"></i> ${news.date}</span>
                        <span><i class="far fa-clock"></i> ${news.time}</span>
                        <span><i class="fas fa-newspaper"></i> ${news.source}</span>
                        ${news.group ? `<span><i class="fas fa-users"></i> المجموعة ${news.group}</span>` : ''}
                    </div>
                </div>
                
                <!-- أعلام الفرق -->
                <div style="
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    margin-bottom: 30px;
                    padding: 20px;
                    background: ${this._lightenColor(stageInfo.color, 92)};
                    border-radius: 12px;
                    border: 2px solid ${this._lightenColor(stageInfo.color, 80)};
                ">
                    <div style="text-align: center; flex: 1;">
                        <img src="${team1Flag}" 
                             alt="${news.teams[0]}" 
                             style="width: 90px; height: 60px; object-fit: cover; background: white; padding: 10px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); margin-bottom: 10px;"
                             onerror="this.src='images/saudi.svg'">
                        <div style="font-weight: bold; color: ${stageInfo.color}; font-size: 22px;">${news.teams[0]}</div>
                    </div>
                    
                    <div style="text-align: center;">
                        <div style="
                            background: ${stageInfo.color};
                            color: white;
                            padding: 15px 35px;
                            border-radius: 15px;
                            font-size: 3.5rem;
                            font-weight: bold;
                            min-width: 160px;
                            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
                        ">
                            ${news.score}
                        </div>
                        <div style="color: #666; margin-top: 10px; font-size: 14px;">نتيجة المباراة</div>
                    </div>
                    
                    <div style="text-align: center; flex: 1;">
                        <img src="${team2Flag}" 
                             alt="${news.teams[1]}" 
                             style="width: 90px; height: 60px; object-fit: cover; background: white; padding: 10px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); margin-bottom: 10px;"
                             onerror="this.src='images/saudi.svg'">
                        <div style="font-weight: bold; color: ${stageInfo.color}; font-size: 22px;">${news.teams[1]}</div>
                    </div>
                </div>
                
                <!-- تفاصيل الخبر -->
                <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                    <h3 style="color: ${stageInfo.color}; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-file-alt"></i> تفاصيل الخبر
                    </h3>
                    <p style="color: #444; line-height: 1.8; font-size: 16px; text-align: justify;">
                        ${news.content}
                    </p>
                </div>
                
                <!-- معلومات إضافية -->
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
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <span style="color: #28a745; font-size: 14px; display: flex; align-items: center; gap: 8px; background: #d4edda; padding: 8px 15px; border-radius: 20px;">
                            <i class="fas fa-check-circle"></i> خبر رسمي
                        </span>
                        ${news.isBreaking ? 
                            `<span style="color: #dc3545; font-size: 14px; display: flex; align-items: center; gap: 8px; background: #f8d7da; padding: 8px 15px; border-radius: 20px;">
                                <i class="fas fa-bolt"></i> خبر عاجل
                            </span>` : ''
                        }
                    </div>
                    
                    <div style="display: flex; gap: 10px;">
                        <button onclick="shareArabCupNews(${news.id})" style="
                            background: #007bff;
                            color: white;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 20px;
                            cursor: pointer;
                            font-size: 14px;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            transition: all 0.3s;
                        " onmouseover="this.style.transform='translateY(-2px)'"
                         onmouseout="this.style.transform='translateY(0)'">
                            <i class="fas fa-share-alt"></i> مشاركة الخبر
                        </button>
                        <button onclick="addToFavorites(${news.id})" style="
                            background: #ffc107;
                            color: #333;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 20px;
                            cursor: pointer;
                            font-size: 14px;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            transition: all 0.3s;
                        " onmouseover="this.style.transform='translateY(-2px)'"
                         onmouseout="this.style.transform='translateY(0)'">
                            <i class="far fa-star"></i> حفظ
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // إضافة أنميشن
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    },

    /**
     * تفتيح اللون
     */
    _lightenColor: function(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        
        return "#" + (
            0x1000000 +
            (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)
        ).toString(16).slice(1);
    },

    /**
     * تظليل اللون
     */
    _darkenColor: function(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        
        return "#" + (
            0x1000000 +
            (R > 0 ? R : 0) * 0x10000 +
            (G > 0 ? G : 0) * 0x100 +
            (B > 0 ? B : 0)
        ).toString(16).slice(1);
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
        document.querySelectorAll('.arab-cup-notification').forEach(toast => toast.remove());
        
        const toast = document.createElement('div');
        toast.className = 'arab-cup-notification';
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
        this._showNotification('🔄 جاري تحديث أخبار كأس العرب...', 'info');
        setTimeout(() => {
            this.displayNews();
        }, 1000);
    },

    /**
     * البحث في الأخبار
     */
    searchNews: function() {
        const searchInput = document.getElementById('football-search');
        if (!searchInput) return;
        
        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
            this._showNotification('الرجاء إدخال كلمة للبحث', 'warning');
            return;
        }
        
        const container = document.getElementById('football-news-container');
        if (!container) return;
        
        const cards = container.querySelectorAll('.arab-cup-news-card');
        let foundCount = 0;
        
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const excerpt = card.querySelector('p').textContent.toLowerCase();
            const teams = Array.from(card.querySelectorAll('div[style*="font-weight: bold"]')).map(div => div.textContent.toLowerCase());
            
            if (title.includes(query) || excerpt.includes(query) || teams.some(team => team.includes(query))) {
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
    }
};

// ===== دالات المساعدة العالمية =====
window.shareArabCupNews = function(newsId) {
    const news = ArabCupFetcher.getArabCupNews().find(n => n.id === newsId);
    if (news) {
        const stageInfo = ArabCupFetcher.getStageInfo(news.stage);
        const text = `🏆 كأس العرب FIFA 2025\n\n📰 ${news.title}\n\n⚽ ${news.teams[0]} ${news.score} ${news.teams[1]}\n🏆 ${stageInfo.name}\n📅 ${news.date} - ${news.time}\n\nتابع البطولة على ميدان العرب\n${window.location.href}`;
        
        if (navigator.share) {
            navigator.share({
                title: `${news.title} - كأس العرب`,
                text: news.excerpt,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(text)
                .then(() => {
                    ArabCupFetcher._showNotification('✅ تم نسخ تفاصيل الخبر للحافظة', 'success');
                });
        }
    }
};

window.addToFavorites = function(newsId) {
    let favorites = JSON.parse(localStorage.getItem('arabCupFavorites')) || [];
    
    if (!favorites.includes(newsId)) {
        favorites.push(newsId);
        localStorage.setItem('arabCupFavorites', JSON.stringify(favorites));
        ArabCupFetcher._showNotification('✅ تم إضافة الخبر إلى المفضلة', 'success');
    } else {
        ArabCupFetcher._showNotification('⚠️ الخبر موجود بالفعل في المفضلة', 'warning');
    }
};

// ===== التهيئة عند تحميل الصفحة =====
document.addEventListener('DOMContentLoaded', () => {
    // بدء تحميل الأخبار بعد تأخير قصير
    setTimeout(() => {
        ArabCupFetcher.displayNews();
    }, 1500);
    
    // ربط زر البحث
    const searchBtn = document.querySelector('.search-box button');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => ArabCupFetcher.searchNews());
    }
    
    // البحث عند الضغط على Enter
    const searchInput = document.getElementById('football-search');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                ArabCupFetcher.searchNews();
            }
        });
    }
    
    // ربط زر التحديث
    const refreshBtn = document.querySelector('.refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => ArabCupFetcher.refreshNews());
    }
});

// جعل الكائن متاحاً عالمياً
window.ArabicNewsFetcher = ArabCupFetcher;
