/**
 * ميدان العرب - ملف كرة القدم المتخصص
 * اخبار ومتابعات كرة القدم العربية والعالمية
 * الاصدار: 1.0.0
 */

// ===== تهيئة التطبيق =====
(function() {
    'use strict';
    
    console.log('⚽ ميدان العرب - كرة القدم - جاهز للتشغيل!');

    // ===== ثوابت التطبيق =====
    const APP_CONFIG = {
        name: 'ميدان العرب - كرة القدم',
        version: '1.0.0',
        colors: {
            primary: '#1E5631',
            secondary: '#C4A747',
            accent: '#2E7D32'
        }
    };
    
    // ===== مكتبة الادوات المساعدة =====
    const Utils = {
        showToast: function(message, type = 'info') {
            const colors = {
                success: '#2E5631',
                error: '#D32F2F',
                warning: '#FF9800',
                info: '#2196F3'
            };
            
            document.querySelectorAll('.custom-toast').forEach(toast => toast.remove());
            
            const toast = document.createElement('div');
            toast.className = 'custom-toast';
            toast.textContent = message;
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 12px 24px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 9999;
                background: ${colors[type] || colors.info};
                animation: toastIn 0.3s ease, toastOut 0.3s ease 2.7s;
                max-width: 400px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                direction: rtl;
            `;
            
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }
    };
    
    // ===== محرك اخبار كرة القدم =====
    const FootballNews = {
        currentLeague: 'all',
        
        // ===== اخبار افتراضية =====
        getDefaultNews: function() {
            return [
                {
                    id: 1,
                    title: "الهلال يتأهل لدور الـ16 من دوري ابطال اسيا",
                    excerpt: "تأهل الهلال السعودي بعد فوزه على النصر 2-0 في ديربي الرياض الملحمي",
                    content: `
                        <div class="article-header">
                            <h1>الهلال يتأهل لدور الـ16 من دوري ابطال اسيا</h1>
                            <div class="article-meta">
                                <span class="match-result" style="background: #1E5631; color: white; padding: 5px 15px; border-radius: 20px;">2 - 0</span>
                                <span><i class="far fa-clock"></i> مساء اليوم</span>
                                <span><i class="fas fa-map-marker-alt"></i> ملعب الملك فهد الدولي</span>
                            </div>
                        </div>
                        
                        <div class="match-details">
                            <div class="teams">
                                <div class="team">
                                    <div class="team-logo">H</div>
                                    <div class="team-name">الهلال</div>
                                    <div class="team-score">2</div>
                                </div>
                                <div class="vs">VS</div>
                                <div class="team">
                                    <div class="team-logo">N</div>
                                    <div class="team-name">النصر</div>
                                    <div class="team-score">0</div>
                                </div>
                            </div>
                            
                            <div class="scorers">
                                <h3><i class="fas fa-futbol"></i> الهدافون:</h3>
                                <ul>
                                    <li>ميشال دوكي (35)</li>
                                    <li>سيرغي ميلينكوفيتش سافيتش (78)</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="article-content">
                            <h2>تحليل المباراة:</h2>
                            <p>سيطر الهلال على مجريات المباراة منذ الصافرة الاولى، وتمكن من تسجيل الهدف الاول عن طريق البرازيلي ميشال دوكي في الدقيقة 35 بعد كرة عرضية متقنة من سالم الدوسري.</p>
                            
                            <div class="stats">
                                <h3><i class="fas fa-chart-bar"></i> احصائيات المباراة:</h3>
                                <div class="stat-row">
                                    <span>التسديدات على المرمى</span>
                                    <div class="stat-bar">
                                        <div class="stat-fill" style="width: 70%; background: #1E5631;">7</div>
                                        <div class="stat-fill" style="width: 30%; background: #D32F2F;">3</div>
                                    </div>
                                </div>
                                <div class="stat-row">
                                    <span>الاستحواذ</span>
                                    <div class="stat-bar">
                                        <div class="stat-fill" style="width: 60%; background: #1E5631;">60%</div>
                                        <div class="stat-fill" style="width: 40%; background: #D32F2F;">40%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `,
                    image: 'H',
                    date: 'اليوم',
                    time: '22:30',
                    league: 'دوري ابطال اسيا',
                    teams: ['الهلال', 'النصر'],
                    score: '2-0',
                    highlight: true
                },
                {
                    id: 2,
                    title: "الاهلي المصري يفوز بالدوري للمرة الـ44",
                    excerpt: "تتويج تاريخي للاهلي بلقب الدوري المصري بعد فوز صعب على الزمالك",
                    content: "تفاصيل المباراة...",
                    image: 'T',
                    date: 'امس',
                    time: '21:00',
                    league: 'الدوري المصري',
                    teams: ['الاهلي', 'الزمالك'],
                    score: '1-0',
                    highlight: true
                },
                {
                    id: 3,
                    title: "ريال مدريد يعزز صدارته للليغا",
                    excerpt: "فوز صعب لريال مدريد على برشلونة في الكلاسيكو 3-2",
                    content: "تفاصيل المباراة...",
                    image: 'R',
                    date: 'الجمعة',
                    time: '23:00',
                    league: 'الدوري الاسباني',
                    teams: ['ريال مدريد', 'برشلونة'],
                    score: '3-2',
                    highlight: true
                },
                {
                    id: 4,
                    title: "ميسي يحرز هدفين في فوز الانتر ميامي",
                    excerpt: "ميسي يقود فريقه للفوز في الدوري الامريكي",
                    content: "تفاصيل المباراة...",
                    image: 'M',
                    date: 'الخميس',
                    time: '03:00',
                    league: 'الدوري الامريكي',
                    teams: ['انتر ميامي', 'نيويورك سيتي'],
                    score: '2-1',
                    highlight: false
                },
                {
                    id: 5,
                    title: "الاتحاد يهزم الاتفاق في ديربي الدمام",
                    excerpt: "فوز قاتل للاتحاد بهدف نظيف في ديربي المنطقة الشرقية",
                    content: "تفاصيل المباراة...",
                    image: 'U',
                    date: 'الخميس',
                    time: '20:00',
                    league: 'الدوري السعودي',
                    teams: ['الاتحاد', 'الاتفاق'],
                    score: '1-0',
                    highlight: false
                },
                {
                    id: 6,
                    title: "منتخب المغرب يتأهل لكأس الامم الافريقية",
                    excerpt: "المغرب يتأهل رسميا بعد فوزه على تنزانيا 2-0",
                    content: "تفاصيل المباراة...",
                    image: 'MA',
                    date: 'الاربعاء',
                    time: '22:00',
                    league: 'كأس امم افريقيا',
                    teams: ['المغرب', 'تنزانيا'],
                    score: '2-0',
                    highlight: true
                }
            ];
        },
        
        // ===== فلترة الاخبار حسب الدوري =====
        filterByLeague: function(league) {
            this.currentLeague = league;
            this.displayNews();
        },
        
        // ===== عرض الاخبار =====
        displayNews: function() {
            const container = document.getElementById('football-news-container');
            if (!container) return;
            
            const allNews = this.getDefaultNews();
            
            // تطبيق الفلتر
            const filteredNews = this.currentLeague === 'all' 
                ? allNews 
                : allNews.filter(news => news.league.includes(this.currentLeague));
            
            // مسح المحتوى القديم
            container.innerHTML = '';
            
            // انشاء عنصر الفلاتر
            const filterBar = document.createElement('div');
            filterBar.className = 'league-filters';
            filterBar.style.cssText = `
                display: flex;
                gap: 10px;
                margin-bottom: 30px;
                flex-wrap: wrap;
                justify-content: center;
            `;
            
            const leagues = ['all', 'الدوري السعودي', 'دوري ابطال اسيا', 'الدوري المصري', 'الدوري الاسباني', 'الدوري الانجليزي', 'كأس امم افريقيا'];
            const leagueNames = {
                'all': 'جميع الاخبار',
                'الدوري السعودي': 'الدوري السعودي',
                'دوري ابطال اسيا': 'دوري ابطال اسيا',
                'الدوري المصري': 'الدوري المصري',
                'الدوري الاسباني': 'الدوري الاسباني',
                'الدوري الانجليزي': 'الدوري الانجليزي',
                'كأس امم افريقيا': 'كأس امم افريقيا'
            };
            
            leagues.forEach(league => {
                const btn = document.createElement('button');
                btn.textContent = leagueNames[league];
                btn.style.cssText = `
                    padding: 10px 20px;
                    border: 2px solid ${this.currentLeague === league ? '#1E5631' : '#ddd'};
                    background: ${this.currentLeague === league ? '#1E5631' : 'white'};
                    color: ${this.currentLeague === league ? 'white' : '#333'};
                    border-radius: 25px;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-weight: ${this.currentLeague === league ? 'bold' : 'normal'};
                `;
                
                btn.addEventListener('click', () => {
                    this.filterByLeague(league);
                    // تحديث الازرار
                    document.querySelectorAll('.league-filters button').forEach(b => {
                        b.style.background = 'white';
                        b.style.color = '#333';
                        b.style.border = '2px solid #ddd';
                        b.style.fontWeight = 'normal';
                    });
                    btn.style.background = '#1E5631';
                    btn.style.color = 'white';
                    btn.style.border = '2px solid #1E5631';
                    btn.style.fontWeight = 'bold';
                });
                
                filterBar.appendChild(btn);
            });
            
            container.appendChild(filterBar);
            
            // عرض الاخبار
            if (filteredNews.length === 0) {
                container.innerHTML += `
                    <div style="text-align: center; padding: 50px; color: #666;">
                        <p>لا توجد اخبار متاحة لهذا الدوري حاليا</p>
                    </div>
                `;
                return;
            }
            
            // انشاء شبكة الاخبار
            const newsGrid = document.createElement('div');
            newsGrid.className = 'football-news-grid';
            newsGrid.style.cssText = `
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 25px;
                margin-top: 20px;
            `;
            
            filteredNews.forEach((news, index) => {
                const newsCard = this.createNewsCard(news, index);
                newsGrid.appendChild(newsCard);
            });
            
            container.appendChild(newsGrid);
            
            // اضافة تحديث تلقائي
            this.setupAutoRefresh();
        },
        
        // ===== انشاء بطاقة خبر =====
        createNewsCard: function(news, index) {
            const card = document.createElement('div');
            card.className = 'football-news-card';
            card.style.cssText = `
                background: white;
                border-radius: 15px;
                overflow: hidden;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                transition: transform 0.3s ease;
                cursor: pointer;
                position: relative;
                border: ${news.highlight ? '2px solid #C4A747' : 'none'};
            `;
            
            // شارة الاخبار المميزة
            if (news.highlight) {
                const badge = document.createElement('div');
                badge.style.cssText = `
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    background: #C4A747;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 15px;
                    font-size: 12px;
                    font-weight: bold;
                    z-index: 2;
                `;
                badge.innerHTML = '<i class="fas fa-star"></i> مميز';
                card.appendChild(badge);
            }
            
            card.innerHTML = `
                <div style="
                    background: linear-gradient(135deg, ${this.getLeagueColor(news.league)});
                    height: 200px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 4rem;
                    position: relative;
                    overflow: hidden;
                    color: white;
                    font-weight: bold;
                ">
                    <div style="
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        background: rgba(0,0,0,0.7);
                        color: white;
                        padding: 5px 10px;
                        border-radius: 10px;
                        font-size: 12px;
                    ">
                        <i class="far fa-clock"></i> ${news.time}
                    </div>
                    ${news.image}
                    <div style="
                        position: absolute;
                        bottom: 10px;
                        left: 10px;
                        background: rgba(0,0,0,0.7);
                        color: white;
                        padding: 5px 10px;
                        border-radius: 10px;
                        font-size: 12px;
                    ">
                        ${news.league}
                    </div>
                </div>
                
                <div style="padding: 20px;">
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        margin-bottom: 15px;
                    ">
                        <h3 style="
                            margin: 0;
                            color: #333;
                            font-size: 18px;
                            line-height: 1.4;
                            flex: 1;
                        ">${news.title}</h3>
                        
                        <div style="
                            background: #1E5631;
                            color: white;
                            padding: 8px 15px;
                            border-radius: 20px;
                            font-weight: bold;
                            font-size: 20px;
                            margin-left: 10px;
                        ">
                            ${news.score}
                        </div>
                    </div>
                    
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 15px;
                        padding: 10px;
                        background: #f8f9fa;
                        border-radius: 10px;
                    ">
                        <div style="text-align: center;">
                            <div style="font-size: 2rem; font-weight: bold;">${this.getTeamLogo(news.teams[0])}</div>
                            <div style="font-weight: bold; margin-top: 5px;">${news.teams[0]}</div>
                        </div>
                        
                        <div style="
                            background: #333;
                            color: white;
                            padding: 5px 10px;
                            border-radius: 10px;
                            font-weight: bold;
                        ">
                            VS
                        </div>
                        
                        <div style="text-align: center;">
                            <div style="font-size: 2rem; font-weight: bold;">${this.getTeamLogo(news.teams[1])}</div>
                            <div style="font-weight: bold; margin-top: 5px;">${news.teams[1]}</div>
                        </div>
                    </div>
                    
                    <p style="
                        color: #666;
                        font-size: 14px;
                        line-height: 1.5;
                        margin-bottom: 15px;
                    ">${news.excerpt}</p>
                    
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: 15px;
                        padding-top: 15px;
                        border-top: 1px solid #eee;
                    ">
                        <span style="color: #888; font-size: 14px;">
                            <i class="far fa-calendar"></i> ${news.date}
                        </span>
                        
                        <button onclick="FootballNews.openNewsDetail(${news.id})" style="
                            background: linear-gradient(135deg, #1E5631, #2E7D32);
                            color: white;
                            border: none;
                            padding: 8px 20px;
                            border-radius: 20px;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                        ">
                            <i class="fas fa-play-circle"></i> التفاصيل
                        </button>
                    </div>
                </div>
            `;
            
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            });
            
            card.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    this.openNewsDetail(news.id);
                }
            });
            
            return card;
        },
        
        // ===== فتح تفاصيل الخبر =====
        openNewsDetail: function(newsId) {
            const news = this.getDefaultNews().find(n => n.id === newsId);
            if (!news) return;
            
            // انشاء نافذة التفاصيل
            const modal = document.createElement('div');
            modal.className = 'football-news-modal';
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                z-index: 10000;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
            `;
            
            modal.innerHTML = `
                <div style="
                    background: white;
                    border-radius: 20px;
                    max-width: 800px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                ">
                    <button onclick="this.closest('.football-news-modal').remove(); document.body.style.overflow = '';" style="
                        position: absolute;
                        top: 15px;
                        right: 15px;
                        background: #D32F2F;
                        color: white;
                        border: none;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        cursor: pointer;
                        z-index: 10001;
                        font-size: 18px;
                    ">
                        X
                    </button>
                    
                    <div style="
                        background: linear-gradient(135deg, ${this.getLeagueColor(news.league)});
                        padding: 30px;
                        color: white;
                        position: relative;
                    ">
                        <h1 style="margin: 0; font-size: 24px; text-align: center;">${news.title}</h1>
                        <div style="text-align: center; margin-top: 15px;">
                            <span style="background: rgba(255,255,255,0.2); padding: 5px 15px; border-radius: 20px; margin: 0 5px;">
                                <i class="far fa-calendar"></i> ${news.date}
                            </span>
                            <span style="background: rgba(255,255,255,0.2); padding: 5px 15px; border-radius: 20px; margin: 0 5px;">
                                <i class="far fa-clock"></i> ${news.time}
                            </span>
                            <span style="background: rgba(255,255,255,0.2); padding: 5px 15px; border-radius: 20px; margin: 0 5px;">
                                <i class="fas fa-trophy"></i> ${news.league}
                            </span>
                        </div>
                    </div>
                    
                    <div style="padding: 30px;">
                        ${news.content}
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                            <h3><i class="fas fa-share-alt"></i> شارك الخبر:</h3>
                            <div style="display: flex; gap: 10px; margin-top: 10px;">
                                <button style="
                                    flex: 1;
                                    padding: 10px;
                                    border: 1px solid #1877F2;
                                    background: white;
                                    color: #1877F2;
                                    border-radius: 8px;
                                    cursor: pointer;
                                ">
                                    <i class="fab fa-facebook"></i> فيسبوك
                                </button>
                                <button style="
                                    flex: 1;
                                    padding: 10px;
                                    border: 1px solid #1DA1F2;
                                    background: white;
                                    color: #1DA1F2;
                                    border-radius: 8px;
                                    cursor: pointer;
                                ">
                                    <i class="fab fa-twitter"></i> تويتر
                                </button>
                                <button style="
                                    flex: 1;
                                    padding: 10px;
                                    border: 1px solid #25D366;
                                    background: white;
                                    color: #25D366;
                                    border-radius: 8px;
                                    cursor: pointer;
                                ">
                                    <i class="fab fa-whatsapp"></i> واتساب
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
        },
        
        // ===== الوان الدوري =====
        getLeagueColor: function(league) {
            const colors = {
                'الدوري السعودي': '#1E5631, #2E7D32',
                'دوري ابطال اسيا': '#00529B, #1E5631',
                'الدوري المصري': '#C8102E, #FFD700',
                'الدوري الاسباني': '#F0B400, #AD1519',
                'الدوري الانجليزي': '#3D195B, #E03C31',
                'كأس امم افريقيا': '#FFD700, #007A3D',
                'الدوري الامريكي': '#6CACE4, #1E5631'
            };
            
            for (const [key, value] of Object.entries(colors)) {
                if (league.includes(key)) return value;
            }
            
            return '#1E5631, #2E7D32';
        },
        
        // ===== شعارات الفرق =====
        getTeamLogo: function(team) {
            const logos = {
                'الهلال': 'H',
                'النصر': 'N',
                'الاهلي': 'A',
                'الزمالك': 'Z',
                'ريال مدريد': 'RM',
                'برشلونة': 'FCB',
                'انتر ميامي': 'IM',
                'الاتحاد': 'Itt',
                'الاتفاق': 'Ett',
                'المغرب': 'MA'
            };
            
            return logos[team] || team.charAt(0);
        },
        
        // ===== تحديث تلقائي =====
        setupAutoRefresh: function() {
            // ازالة اي مؤقت سابق
            if (this.refreshTimer) {
                clearInterval(this.refreshTimer);
            }
            
            // تحديث كل 5 دقائق
            this.refreshTimer = setInterval(() => {
                Utils.showToast('جاري تحديث اخبار كرة القدم...', 'info');
                this.displayNews();
            }, 300000); // 5 دقائق
        },
        
        // ===== البحث عن اخبار =====
        searchNews: function() {
            const searchInput = document.getElementById('football-search');
            if (!searchInput) return;
            
            const query = searchInput.value.toLowerCase();
            if (!query.trim()) {
                this.displayNews();
                return;
            }
            
            const allNews = this.getDefaultNews();
            const results = allNews.filter(news => 
                news.title.toLowerCase().includes(query) ||
                news.teams.some(team => team.toLowerCase().includes(query)) ||
                news.league.toLowerCase().includes(query)
            );
            
            const container = document.getElementById('football-news-container');
            if (!container) return;
            
            // مسح المحتوى
            container.innerHTML = '';
            
            if (results.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 50px;">
                        <p style="color: #666; font-size: 18px;">لا توجد نتائج للبحث: "${query}"</p>
                    </div>
                `;
                return;
            }
            
            container.innerHTML = `
                <div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 10px;">
                    <h3 style="margin: 0; color: #1E5631;">
                        <i class="fas fa-search"></i> نتائج البحث: "${query}" (${results.length} نتيجة)
                    </h3>
                </div>
            `;
            
            const newsGrid = document.createElement('div');
            newsGrid.style.cssText = `
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 25px;
            `;
            
            results.forEach((news, index) => {
                const newsCard = this.createNewsCard(news, index);
                newsGrid.appendChild(newsCard);
            });
            
            container.appendChild(newsGrid);
        },
        
        // ===== اضافة خبر جديد =====
        addNews: function(newNews) {
            const newsContainer = document.getElementById('football-news-container');
            if (!newsContainer) return;
            
            const newsCard = this.createNewsCard(newNews, Date.now());
            const newsGrid = newsContainer.querySelector('.football-news-grid');
            
            if (newsGrid) {
                newsGrid.insertBefore(newsCard, newsGrid.firstChild);
                Utils.showToast('تم اضافة خبر جديد!', 'success');
            }
        }
    };
    
    // ===== التهيئة عند التحميل =====
    document.addEventListener('DOMContentLoaded', function() {
        console.log(APP_CONFIG.name + ' v' + APP_CONFIG.version);
        
        // اضافة انماط CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes toastIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes toastOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .match-details {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
            }
            
            .teams {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 30px;
                margin-bottom: 20px;
            }
            
            .team {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
            }
            
            .team-logo {
                font-size: 3rem;
                font-weight: bold;
            }
            
            .team-name {
                font-weight: bold;
                font-size: 18px;
            }
            
            .team-score {
                font-size: 2rem;
                font-weight: bold;
                color: #1E5631;
            }
            
            .vs {
                font-size: 24px;
                font-weight: bold;
                color: #666;
            }
            
            .stat-row {
                display: flex;
                align-items: center;
                margin: 10px 0;
            }
            
            .stat-bar {
                flex: 1;
                height: 10px;
                background: #e0e0e0;
                border-radius: 5px;
                overflow: hidden;
                margin-left: 10px;
                display: flex;
            }
            
            .stat-fill {
                height: 100%;
            }
        `;
        document.head.appendChild(style);
        
        // عرض الاخبار عند التحميل
        setTimeout(() => {
            FootballNews.displayNews();
            Utils.showToast('مرحبا بك في ميدان العرب - اخبار كرة القدم', 'success');
        }, 1000);
    });
    
    // ===== جعل الوظائف متاحة عالميا =====
    window.FootballNews = FootballNews;
    window.Utils = Utils;
})();
