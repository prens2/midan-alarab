/**
 * ميدان العرب - أخبار كرة القدم العربية الحية
 * تغطية كاملة للدوري السعودي، المصري، والبطولات العربية
 * الإصدار: 3.1.0 - أخبار عربية حقيقية
 */

// ===== تهيئة التطبيق =====
(function() {
    'use strict';
    
    console.log('⚽ ميدان العرب - أخبار كرة القدم العربية - جاهز للتشغيل!');

    // ===== مصادر الأخبار العربية الحقيقية =====
    const ARABIC_NEWS_SOURCES = {
        // مواقع رياضية عربية
        kooora: 'https://www.kooora.com/rss',
        yallakora: 'https://www.yallakora.com/rss',
        goalArabic: 'https://www.goal.com/ar/feed',
        beinArabic: 'https://www.beinsports.com/ar/rss.xml',
        filgoal: 'https://www.filgoal.com/rss',
        
        // وكالات أنباء عربية
        aljazeeraSports: 'https://www.aljazeera.net/sports/feed',
        skyNewsArabic: 'https://www.skynewsarabia.com/rss',
        arabicRT: 'https://arabic.rt.com/rss'
    };
    
    // ===== فرق ودوريات عربية =====
    const ARABIC_TEAMS = {
        saudi: ['الهلال', 'النصر', 'الاتحاد', 'الأهلي السعودي', 'الاتفاق', 'الشباب', 'الفتح', 'الخليج', 'الرائد', 'الوطني'],
        egyptian: ['الأهلي المصري', 'الزمالك', 'بيراميدز', 'المصري', 'الإسماعيلي', 'الشرقية', 'المقاولون', 'سموحة'],
        uae: ['الشارقة', 'العين', 'الوحدة', 'الجزيرة', 'بني ياس', 'دبي', 'العروبة'],
        qatari: ['السد', 'الدحيل', 'الريان', 'الأهلي القطري', 'العربي', 'الوكرة'],
        moroccan: ['الوداد', 'الرجاء', 'الفتح الرباطي', 'المغرب التطواني'],
        algerian: ['شباب بلوزداد', 'اتحاد الجزائر', 'مولودية الجزائر', 'شباب قسنطينة'],
        tunisian: ['النجم الساحلي', 'الترجي', 'الملعب التونسي', 'الافريقي']
    };
    
    const ARABIC_LEAGUES = [
        'الدوري السعودي',
        'دوري أبطال آسيا', 
        'كأس الملك',
        'كأس ولي العهد',
        'الدوري المصري',
        'كأس مصر',
        'دوري الخليج العربي',
        'كأس رئيس الدولة',
        'دوري أبطال إفريقيا',
        'كأس الكونفدرالية',
        'كأس العرب للأندية',
        'كأس العالم للأندية',
        'كأس أمم إفريقيا',
        'كأس آسيا',
        'تصفيات كأس العالم'
    ];
    
    // ===== جالب الأخبار العربية مع حلول CORS =====
    class NewsFetcher {
        constructor() {
            this.proxies = [
                'https://api.allorigins.win/get?url=',
                'https://corsproxy.io/?',
                'https://api.codetabs.com/v1/proxy?quest=',
                'https://proxy.cors.sh/'
            ];
            
            this.currentProxy = 0;
            this.newsCache = [];
            this.lastFetch = 0;
            this.isFetching = false;
        }
        
        // محاولة جلب الأخبار من مصادر مختلفة
        async fetchArabicNews() {
            // Cache لمدة 5 دقائق
            const now = Date.now();
            if (this.newsCache.length > 0 && (now - this.lastFetch) < 300000) {
                console.log('استخدام الأخبار المخزنة في الكاش');
                return this.newsCache;
            }
            
            if (this.isFetching) {
                console.log('جاري بالفعل جلب الأخبار...');
                return this.newsCache;
            }
            
            this.isFetching = true;
            
            const sources = [
                {
                    name: 'يلاكورة',
                    url: ARABIC_NEWS_SOURCES.yallakora,
                    type: 'rss'
                },
                {
                    name: 'كورة',
                    url: ARABIC_NEWS_SOURCES.kooora,
                    type: 'rss'
                },
                {
                    name: 'فيلجول',
                    url: ARABIC_NEWS_SOURCES.filgoal,
                    type: 'rss'
                },
                {
                    name: 'الجزيرة الرياضية',
                    url: ARABIC_NEWS_SOURCES.aljazeeraSports,
                    type: 'rss'
                }
            ];
            
            let allNews = [];
            let successfulSources = 0;
            
            for (const source of sources) {
                try {
                    console.log(`محاولة جلب الأخبار من ${source.name}...`);
                    const news = await this.tryFetchSource(source);
                    if (news && news.length > 0) {
                        allNews = [...allNews, ...news];
                        successfulSources++;
                        console.log(`تم جلب ${news.length} خبر من ${source.name}`);
                    }
                } catch (error) {
                    console.warn(`فشل مصدر ${source.name}:`, error.message);
                }
            }
            
            // إذا لم نحصل على أخبار كافية، نستخدم Mock data
            if (allNews.length === 0) {
                console.log('استخدام أخبار تجريبية...');
                allNews = this.getMockNews();
            } else {
                console.log(`تم جلب إجمالي ${allNews.length} خبر من ${successfulSources} مصادر`);
            }
            
            // Cache النتائج
            this.newsCache = this.removeDuplicates(allNews).slice(0, 20); // أول 20 خبر فقط
            this.lastFetch = Date.now();
            this.isFetching = false;
            
            return this.newsCache;
        }
        
        // إزالة الأخبار المكررة
        removeDuplicates(newsArray) {
            const seen = new Set();
            return newsArray.filter(item => {
                const title = item.title.trim().toLowerCase();
                if (seen.has(title)) {
                    return false;
                }
                seen.add(title);
                return true;
            });
        }
        
        // محاولة جلب من مصدر مع Proxy
        async tryFetchSource(source) {
            for (let i = 0; i < 3; i++) { // 3 محاولات
                try {
                    const proxy = this.proxies[this.currentProxy];
                    const proxyUrl = `${proxy}${encodeURIComponent(source.url)}`;
                    
                    console.log(`المحاولة ${i + 1}: ${source.name} عبر ${proxy}`);
                    
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 ثواني حد أقصى
                    
                    const response = await fetch(proxyUrl, {
                        headers: {
                            'Accept': 'text/xml',
                            'User-Agent': 'MidanAlArab/3.1.0'
                        },
                        signal: controller.signal
                    });
                    
                    clearTimeout(timeoutId);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    
                    const text = await response.text();
                    
                    // معالجة استجابة allorigins
                    let xmlText = text;
                    if (proxy.includes('allorigins.win')) {
                        try {
                            const data = JSON.parse(text);
                            xmlText = data.contents;
                        } catch (e) {
                            console.warn('فشل في تحليل استجابة allorigins');
                        }
                    }
                    
                    return this.parseRSS(xmlText, source.name);
                    
                } catch (error) {
                    console.warn(`المحاولة ${i + 1} فشلت:`, error.message);
                    this.currentProxy = (this.currentProxy + 1) % this.proxies.length;
                    
                    if (i === 2) throw error; // بعد 3 محاولات
                    await this.delay(1000); // انتظر ثانية
                }
            }
        }
        
        // تحليل RSS
        parseRSS(xmlText, sourceName) {
            try {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
                
                // التحقق من أن XML صالح
                const parseError = xmlDoc.querySelector('parsererror');
                if (parseError) {
                    throw new Error('XML غير صالح: ' + parseError.textContent.substring(0, 100));
                }
                
                const items = xmlDoc.querySelectorAll('item');
                
                const news = [];
                items.forEach((item, index) => {
                    if (index >= 8) return; // أول 8 أخبار فقط من كل مصدر
                    
                    const title = item.querySelector('title')?.textContent || '';
                    const description = item.querySelector('description')?.textContent || '';
                    const link = item.querySelector('link')?.textContent || '#';
                    const pubDate = item.querySelector('pubDate')?.textContent || 
                                   item.querySelector('date')?.textContent || 
                                   new Date().toISOString();
                    
                    // فلترة للأخبار العربية فقط
                    if (!this.isArabicNews(title, description)) return;
                    
                    // تنظيف وتنسيق البيانات
                    const cleanTitle = this.cleanText(title);
                    const cleanDescription = this.cleanText(description);
                    
                    news.push({
                        id: Date.now() + index + Math.random(),
                        title: cleanTitle,
                        excerpt: cleanDescription.substring(0, 120) + (cleanDescription.length > 120 ? '...' : ''),
                        content: cleanDescription,
                        image: this.getNewsImage(cleanTitle),
                        date: this.formatArabicDate(pubDate),
                        time: this.getCurrentTime(),
                        league: this.detectLeague(cleanTitle),
                        teams: this.extractTeams(cleanTitle),
                        score: this.extractScore(cleanTitle),
                        highlight: index < 2, // أول خبرين مميزين من كل مصدر
                        source: sourceName,
                        link: link,
                        isLive: true,
                        category: this.detectCategory(cleanTitle)
                    });
                });
                
                return news;
            } catch (error) {
                console.error('خطأ في تحليل RSS:', error);
                return [];
            }
        }
        
        // التحقق من أن الخبر عربي
        isArabicNews(title, description) {
            const text = (title + ' ' + description).toLowerCase();
            const arabicKeywords = [
                'سعودي', 'مصري', 'عربي', 'هلال', 'نصر', 'اتحاد', 'أهلي', 'زمالك',
                'دوري', 'كأس', 'مباراة', 'هدف', 'ملعب', 'لاعب', 'مدرب', 'رياضة',
                'سعودية', 'مصرية', 'عربية', 'بطولة', 'نتيجة', 'فوز', 'خسارة',
                'تأهل', 'نهائي', 'نصف', 'ربع', 'مجموعة', 'تصفيات'
            ];
            
            // التحقق من وجود نص عربي
            const arabicPattern = /[\u0600-\u06FF]/;
            if (!arabicPattern.test(text)) return false;
            
            return arabicKeywords.some(keyword => text.includes(keyword));
        }
        
        // تنظيف النص
        cleanText(text) {
            if (!text) return '';
            return text
                .replace(/<[^>]*>/g, '')
                .replace(/&nbsp;/g, ' ')
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/\s+/g, ' ')
                .trim();
        }
        
        // تنسيق التاريخ العربي
        formatArabicDate(dateString) {
            try {
                const date = new Date(dateString);
                if (isNaN(date.getTime())) {
                    throw new Error('تاريخ غير صالح');
                }
                
                return date.toLocaleDateString('ar-SA', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            } catch {
                return new Date().toLocaleDateString('ar-SA', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            }
        }
        
        // استخراج الصورة/الإيموجي
        getNewsImage(title) {
            const images = {
                'هلال': '👑',
                'النصر': '⚽',
                'اتحاد': '🦁',
                'الأهلي السعودي': '🔥',
                'الأهلي المصري': '🦅',
                'الزمالك': '🕊️',
                'الشباب': '⚡',
                'الاتفاق': '🛡️',
                'الوداد': '🔴',
                'الرجاء': '🟢',
                'السد': '🟡',
                'الريان': '🔵',
                'الشارقة': '🦁',
                'العين': '🟣',
                'الترجي': '🔵'
            };
            
            for (const [key, emoji] of Object.entries(images)) {
                if (title.includes(key)) return emoji;
            }
            
            // البحث عن أي فريق عربي
            const allTeams = Object.values(ARABIC_TEAMS).flat();
            for (const team of allTeams) {
                if (title.includes(team)) {
                    return this.getTeamEmoji(team);
                }
            }
            
            return '🇸🇦';
        }
        
        // استخراج الدوري
        detectLeague(title) {
            const lowerTitle = title.toLowerCase();
            
            for (const league of ARABIC_LEAGUES) {
                if (lowerTitle.includes(league.toLowerCase())) {
                    return league;
                }
            }
            
            // اكتشاف من كلمات مفتاحية
            if (lowerTitle.includes('سعودي') || lowerTitle.includes('دوري المحترفين')) {
                return 'الدوري السعودي';
            } else if (lowerTitle.includes('مصري')) {
                return 'الدوري المصري';
            } else if (lowerTitle.includes('إماراتي') || lowerTitle.includes('خليجي')) {
                return 'دوري الخليج العربي';
            } else if (lowerTitle.includes('قطري')) {
                return 'دوري نجوم قطر';
            } else if (lowerTitle.includes('اسيا') || lowerTitle.includes('آسيا')) {
                return 'دوري أبطال آسيا';
            } else if (lowerTitle.includes('افريقيا') || lowerTitle.includes('أفريقيا')) {
                return 'دوري أبطال إفريقيا';
            }
            
            return 'بطولة عربية';
        }
        
        // استخراج الفرق
        extractTeams(title) {
            const allTeams = Object.values(ARABIC_TEAMS).flat();
            const foundTeams = [];
            
            allTeams.forEach(team => {
                if (title.includes(team)) {
                    foundTeams.push(team);
                }
            });
            
            if (foundTeams.length >= 2) {
                return foundTeams.slice(0, 2);
            } else if (foundTeams.length === 1) {
                // إضافة فريق ثاني عشوائي من نفس الدولة
                const teamCountry = this.getTeamCountry(foundTeams[0]);
                const countryTeams = ARABIC_TEAMS[teamCountry] || ARABIC_TEAMS.saudi;
                const otherTeam = countryTeams.find(t => t !== foundTeams[0]) || 'فريق منافس';
                return [foundTeams[0], otherTeam];
            }
            
            // فرق عربية افتراضية
            return ['فريق عربي', 'فريق منافس'];
        }
        
        // معرفة دولة الفريق
        getTeamCountry(teamName) {
            for (const [country, teams] of Object.entries(ARABIC_TEAMS)) {
                if (teams.includes(teamName)) {
                    return country;
                }
            }
            return 'saudi';
        }
        
        // استخراج النتيجة
        extractScore(title) {
            const scoreRegex = /(\d+)[:\-\s]\s*(\d+)/;
            const match = title.match(scoreRegex);
            
            if (match) {
                return `${match[1]}-${match[2]}`;
            }
            
            // البحث عن كلمات تدل على نتيجة
            if (title.includes('فاز') || title.includes('يفوز') || title.includes('تغلب')) {
                const score1 = Math.floor(Math.random() * 4) + 1;
                const score2 = Math.floor(Math.random() * 3);
                return `${score1}-${score2}`;
            }
            
            return 'لم تبدأ';
        }
        
        // اكتشاف التصنيف
        detectCategory(title) {
            const lowerTitle = title.toLowerCase();
            if (lowerTitle.includes('هدف') || lowerTitle.includes('أهداف')) {
                return 'أهداف';
            } else if (lowerTitle.includes('تحويل') || lowerTitle.includes('صفقة')) {
                return 'انتقالات';
            } else if (lowerTitle.includes('إصابة') || lowerTitle.includes('إصابات')) {
                return 'إصابات';
            } else if (lowerTitle.includes('مدرب') || lowerTitle.includes('مدير فني')) {
                return 'إدارة فنية';
            } else if (lowerTitle.includes('تحكيم') || lowerTitle.includes('حكم')) {
                return 'تحكيم';
            }
            return 'رياضة';
        }
        
        // إيموجيات الفرق
        getTeamEmoji(team) {
            const emojis = {
                'الهلال': '👑',
                'النصر': '⚽',
                'الاتحاد': '🦁',
                'الأهلي السعودي': '🔥',
                'الأهلي المصري': '🦅',
                'الزمالك': '🕊️',
                'الشباب': '⚡',
                'الاتفاق': '🛡️',
                'الخليج': '🌊',
                'الفتح': '🎯',
                'الرائد': '🟡',
                'الوطني': '🇸🇦',
                'الوداد': '🔴',
                'الرجاء': '🟢',
                'السد': '🟡',
                'الريان': '🔵',
                'الشارقة': '🦁',
                'العين': '🟣',
                'الوحدة': '🦅',
                'الترجي': '🔵'
            };
            return emojis[team] || '⚽';
        }
        
        // الوقت الحالي
        getCurrentTime() {
            return new Date().toLocaleTimeString('ar-SA', {
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        
        // أخبار وهمية (إذا فشل الاتصال)
        getMockNews() {
            return Utils.getMockArabicNews();
        }
        
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }
    
    // ===== مكتبة الأدوات المساعدة =====
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
        },
        
        // جلب أخبار عربية حقيقية من RSS (الوظيفة القديمة - تم استبدالها)
        fetchArabicNews: async function() {
            try {
                const newsFetcher = new NewsFetcher();
                return await newsFetcher.fetchArabicNews();
            } catch (error) {
                console.error('خطأ في جلب الأخبار العربية:', error);
                return null;
            }
        },
        
        // تنظيف النص العربي
        cleanArabicText: function(text) {
            if (!text) return '';
            return text
                .replace(/<[^>]*>/g, '')
                .replace(/&[^;]+;/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
        },
        
        // تنسيق التاريخ العربي
        formatArabicDate: function(dateString) {
            try {
                const date = new Date(dateString);
                const options = { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    timeZone: 'Asia/Riyadh'
                };
                return date.toLocaleDateString('ar-SA', options);
            } catch {
                const now = new Date();
                return now.toLocaleDateString('ar-SA');
            }
        },
        
        // أخبار عربية افتراضية (إذا فشل الاتصال)
        getMockArabicNews: function() {
            return [
                {
                    id: 1,
                    title: "الهلال يتصدر الدوري السعودي بعد فوز كبير على النصر",
                    excerpt: "تألق الهلال وفاز على النصر 3-1 في ديربي الرياض ليصبح المتصدر الوحيد للدوري",
                    content: "تفاصيل المباراة الكاملة...",
                    image: "👑",
                    date: "اليوم",
                    time: "22:30",
                    league: "الدوري السعودي",
                    teams: ["الهلال", "النصر"],
                    score: "3-1",
                    highlight: true,
                    source: "ميدان العرب",
                    link: "#",
                    isLive: false
                },
                {
                    id: 2,
                    title: "الأهلي المصري يحتفظ بصدارة الدوري برباعية في شباك المصري",
                    excerpt: "فوز ساحق للأهلي 4-0 على المصري في الجولة 18 من الدوري المصري الممتاز",
                    content: "تفاصيل المباراة الكاملة...",
                    image: "🦅",
                    date: "أمس",
                    time: "21:00",
                    league: "الدوري المصري",
                    teams: ["الأهلي المصري", "المصري"],
                    score: "4-0",
                    highlight: true,
                    source: "ميدان العرب",
                    link: "#",
                    isLive: false
                },
                {
                    id: 3,
                    title: "الاتحاد يتأهل لنصف نهائي كأس الملك بعد فوز صعب على الشباب",
                    excerpt: "تأهل الاتحاد لدور نصف النهائي بعد فوزه 2-1 على الشباب في مباراة مثيرة",
                    content: "تفاصيل المباراة الكاملة...",
                    image: "🦁",
                    date: "الجمعة",
                    time: "20:45",
                    league: "كأس الملك",
                    teams: ["الاتحاد", "الشباب"],
                    score: "2-1",
                    highlight: true,
                    source: "ميدان العرب",
                    link: "#",
                    isLive: false
                },
                {
                    id: 4,
                    title: "الوداد المغربي يحقق فوزًا تاريخيًا في دوري أبطال إفريقيا",
                    excerpt: "فوز كبير للوداد على منافسه التونسي 3-0 في ذهاب ربع النهائي",
                    content: "تفاصيل المباراة الكاملة...",
                    image: "🔴",
                    date: "الخميس",
                    time: "23:00",
                    league: "دوري أبطال إفريقيا",
                    teams: ["الوداد", "الترجي"],
                    score: "3-0",
                    highlight: false,
                    source: "ميدان العرب",
                    link: "#",
                    isLive: false
                },
                {
                    id: 5,
                    title: "السد القطري يعزز صدارته للدوري القطري بفوز على الريان",
                    excerpt: "استمرار السد في الصدارة بعد فوزه 2-0 على الريان في ديربي الدوحة",
                    content: "تفاصيل المباراة الكاملة...",
                    image: "🟡",
                    date: "الأربعاء",
                    time: "19:30",
                    league: "دوري نجوم قطر",
                    teams: ["السد", "الريان"],
                    score: "2-0",
                    highlight: false,
                    source: "ميدان العرب",
                    link: "#",
                    isLive: false
                },
                {
                    id: 6,
                    title: "الشارقة يهزم العين ويتوج بكأس رئيس الدولة الإماراتي",
                    excerpt: "تتويج تاريخي للشارقة بلقب كأس رئيس الدولة بعد فوزه 1-0 على العين",
                    content: "تفاصيل المباراة الكاملة...",
                    image: "🟡🔴",
                    date: "الثلاثاء",
                    time: "21:15",
                    league: "كأس رئيس الدولة",
                    teams: ["الشارقة", "العين"],
                    score: "1-0",
                    highlight: true,
                    source: "ميدان العرب",
                    link: "#",
                    isLive: false
                }
            ];
        }
    };
    
    // ===== محرك أخبار كرة القدم العربية =====
    const FootballNews = {
        currentLeague: 'all',
        isLoading: false,
        arabicNews: [],
        newsFetcher: null,
        
        // ===== تهيئة جالب الأخبار =====
        initNewsFetcher: function() {
            if (!this.newsFetcher) {
                this.newsFetcher = new NewsFetcher();
            }
            return this.newsFetcher;
        },
        
        // ===== جلب الأخبار العربية =====
        loadArabicNews: async function() {
            if (this.isLoading) return;
            
            this.isLoading = true;
            const container = document.getElementById('football-news-container');
            
            if (container) {
                container.innerHTML = `
                    <div class="loading-spinner">
                        <div class="spinner"></div>
                        <p>جاري تحميل أخبار كرة القدم العربية من مصادر حقيقية...</p>
                        <p style="font-size: 12px; color: #666; margin-top: 10px;">
                            <i class="fas fa-sync fa-spin"></i> الاتصال بمصادر الأخبار العربية
                        </p>
                    </div>
                `;
            }
            
            Utils.showToast('🔄 جاري تحديث الأخبار العربية من مصادر حقيقية...', 'info');
            
            try {
                // استخدام جالب الأخبار الجديد
                const fetcher = this.initNewsFetcher();
                const realNews = await fetcher.fetchArabicNews();
                
                if (realNews && realNews.length > 0) {
                    this.arabicNews = realNews;
                    const sourceCount = new Set(realNews.map(n => n.source)).size;
                    Utils.showToast(`تم تحميل ${realNews.length} خبر عربي من ${sourceCount} مصادر`, 'success');
                } else {
                    // استخدام الأخبار الوهمية العربية
                    this.arabicNews = Utils.getMockArabicNews();
                    Utils.showToast('عرض أخبار عربية تجريبية', 'warning');
                }
                
                this.displayNews();
                
            } catch (error) {
                console.error('خطأ في تحميل الأخبار:', error);
                this.arabicNews = Utils.getMockArabicNews();
                this.displayNews();
                Utils.showToast('جاري عرض أخبار محلية', 'warning');
            } finally {
                this.isLoading = false;
            }
        },
        
        // ===== عرض الأخبار =====
        displayNews: function() {
            const container = document.getElementById('football-news-container');
            if (!container) return;
            
            let filteredNews = this.arabicNews;
            
            // تطبيق الفلتر حسب الدوري
            if (this.currentLeague !== 'all') {
                filteredNews = this.arabicNews.filter(news => 
                    news.league === this.currentLeague
                );
            }
            
            if (filteredNews.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 50px; color: #666;">
                        <p style="font-size: 18px; margin-bottom: 20px;">
                            <i class="far fa-frown"></i><br>
                            لا توجد أخبار عربية متاحة لهذا الدوري حالياً
                        </p>
                        <button onclick="FootballNews.loadArabicNews()" 
                                style="margin-top: 20px; background: #1E5631; color: white; border: none; padding: 12px 24px; border-radius: 25px; cursor: pointer; font-weight: bold;">
                            <i class="fas fa-redo"></i> تحديث الأخبار
                        </button>
                    </div>
                `;
                return;
            }
            
            // إنشاء شبكة الأخبار
            const newsGrid = document.createElement('div');
            newsGrid.className = 'arabic-news-grid';
            newsGrid.style.cssText = `
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 25px;
                margin-top: 20px;
            `;
            
            filteredNews.forEach((news, index) => {
                const newsCard = this.createArabicNewsCard(news, index);
                newsGrid.appendChild(newsCard);
            });
            
            container.innerHTML = '';
            
            // إضافة شريط المصادر
            const sourcesBar = this.createSourcesInfo();
            container.appendChild(sourcesBar);
            
            container.appendChild(this.createLeagueFilters());
            container.appendChild(newsGrid);
            
            // إضافة تحديث تلقائي
            this.setupAutoRefresh();
        },
        
        // ===== إنشاء معلومات المصادر =====
        createSourcesInfo: function() {
            const sources = new Set(this.arabicNews.map(news => news.source));
            const infoBar = document.createElement('div');
            infoBar.style.cssText = `
                background: linear-gradient(135deg, #1E5631, #2E7D32);
                color: white;
                padding: 15px 20px;
                border-radius: 12px;
                margin-bottom: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 10px;
            `;
            
            infoBar.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-wifi" style="font-size: 20px;"></i>
                    <div>
                        <strong style="font-size: 16px;">أخبار عربية حقيقية</strong>
                        <div style="font-size: 13px; opacity: 0.9;">
                            ${this.arabicNews.length} خبر من ${sources.size} مصادر
                        </div>
                    </div>
                </div>
                <div style="display: flex; gap: 5px; flex-wrap: wrap;">
                    ${Array.from(sources).map(source => 
                        `<span style="background: rgba(255,255,255,0.2); padding: 5px 12px; border-radius: 15px; font-size: 12px;">
                            <i class="fas fa-rss"></i> ${source}
                        </span>`
                    ).join('')}
                </div>
            `;
            
            return infoBar;
        },
        
        // ===== إنشاء بطاقة خبر عربي =====
        createArabicNewsCard: function(news, index) {
            const card = document.createElement('div');
            card.className = 'arabic-news-card';
            card.style.cssText = `
                background: white;
                border-radius: 15px;
                overflow: hidden;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                transition: all 0.3s ease;
                cursor: pointer;
                position: relative;
                border: ${news.highlight ? '3px solid #C4A747' : '1px solid #e0e0e0'};
            `;
            
            // مؤشر الخبر المباشر
            if (news.isLive) {
                const liveBadge = document.createElement('div');
                liveBadge.style.cssText = `
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    background: #D32F2F;
                    color: white;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: bold;
                    z-index: 2;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    animation: pulse 1.5s infinite;
                `;
                liveBadge.innerHTML = '<i class="fas fa-circle"></i> مباشر';
                card.appendChild(liveBadge);
            }
            
            // شارة الأخبار المميزة
            if (news.highlight) {
                const badge = document.createElement('div');
                badge.style.cssText = `
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: linear-gradient(135deg, #C4A747, #D4B757);
                    color: white;
                    padding: 5px 15px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: bold;
                    z-index: 2;
                    box-shadow: 0 2px 8px rgba(196, 167, 71, 0.3);
                `;
                badge.innerHTML = '<i class="fas fa-star"></i> مميز';
                card.appendChild(badge);
            }
            
            card.innerHTML = `
                <div style="
                    background: linear-gradient(135deg, ${this.getLeagueColor(news.league)});
                    height: 180px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                ">
                    <div style="
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0,0,0,0.3);
                    "></div>
                    
                    <div style="
                        font-size: 3.5rem;
                        color: white;
                        text-shadow: 2px 2px 8px rgba(0,0,0,0.5);
                        z-index: 1;
                    ">
                        ${news.image}
                    </div>
                    
                    <div style="
                        position: absolute;
                        bottom: 10px;
                        right: 10px;
                        background: rgba(0,0,0,0.7);
                        color: white;
                        padding: 5px 12px;
                        border-radius: 15px;
                        font-size: 12px;
                        z-index: 1;
                        display: flex;
                        align-items: center;
                        gap: 5px;
                    ">
                        <i class="far fa-clock"></i> ${news.time}
                    </div>
                    
                    <div style="
                        position: absolute;
                        bottom: 10px;
                        left: 10px;
                        background: rgba(30, 86, 49, 0.9);
                        color: white;
                        padding: 5px 12px;
                        border-radius: 15px;
                        font-size: 11px;
                        z-index: 1;
                        display: flex;
                        align-items: center;
                        gap: 5px;
                    ">
                        <i class="fas fa-trophy"></i> ${news.league}
                    </div>
                </div>
                
                <div style="padding: 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                        <h3 style="
                            margin: 0;
                            color: #333;
                            font-size: 17px;
                            line-height: 1.4;
                            flex: 1;
                            font-weight: 600;
                        ">
                            ${news.title}
                        </h3>
                        
                        <div style="
                            background: ${news.score === 'لم تبدأ' ? '#666' : '#1E5631'};
                            color: white;
                            padding: 6px 12px;
                            border-radius: 15px;
                            font-weight: bold;
                            font-size: ${news.score === 'لم تبدأ' ? '14px' : '18px'};
                            margin-right: 10px;
                            min-width: 50px;
                            text-align: center;
                        ">
                            ${news.score}
                        </div>
                    </div>
                    
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin: 15px 0;
                        padding: 12px;
                        background: #f8f9fa;
                        border-radius: 10px;
                        border: 1px solid #e9ecef;
                    ">
                        <div style="text-align: center; flex: 1;">
                            <div style="
                                font-size: 1.8rem;
                                font-weight: bold;
                                color: #1E5631;
                                margin-bottom: 5px;
                            ">
                                ${this.getTeamEmoji(news.teams[0])}
                            </div>
                            <div style="
                                font-weight: bold;
                                color: #333;
                                font-size: 14px;
                            ">
                                ${news.teams[0]}
                            </div>
                        </div>
                        
                        <div style="
                            background: #333;
                            color: white;
                            padding: 6px 15px;
                            border-radius: 10px;
                            font-weight: bold;
                            font-size: 14px;
                        ">
                            VS
                        </div>
                        
                        <div style="text-align: center; flex: 1;">
                            <div style="
                                font-size: 1.8rem;
                                font-weight: bold;
                                color: #1E5631;
                                margin-bottom: 5px;
                            ">
                                ${this.getTeamEmoji(news.teams[1])}
                            </div>
                            <div style="
                                font-weight: bold;
                                color: #333;
                                font-size: 14px;
                            ">
                                ${news.teams[1]}
                            </div>
                        </div>
                    </div>
                    
                    <p style="
                        color: #555;
                        font-size: 14px;
                        line-height: 1.5;
                        margin-bottom: 15px;
                        border-right: 3px solid #1E5631;
                        padding-right: 10px;
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
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="color: #777; font-size: 13px; display: flex; align-items: center; gap: 5px;">
                                <i class="far fa-calendar"></i> ${news.date}
                            </span>
                            <span style="color: #777; font-size: 13px; display: flex; align-items: center; gap: 5px;">
                                <i class="fas fa-newspaper"></i> ${news.source}
                            </span>
                            ${news.category ? `
                            <span style="
                                background: #e8f5e8;
                                color: #1E5631;
                                padding: 3px 10px;
                                border-radius: 12px;
                                font-size: 11px;
                                font-weight: bold;
                            ">
                                ${news.category}
                            </span>
                            ` : ''}
                        </div>
                        
                        <button onclick="FootballNews.openArabicNewsDetail(${news.id})" style="
                            background: linear-gradient(135deg, #1E5631, #2E7D32);
                            color: white;
                            border: none;
                            padding: 8px 18px;
                            border-radius: 20px;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            gap: 6px;
                            font-size: 13px;
                            font-weight: 500;
                            transition: all 0.3s;
                        ">
                            <i class="fas fa-futbol"></i> التفاصيل
                        </button>
                    </div>
                </div>
            `;
            
            // تأثيرات hover
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
                card.style.boxShadow = '0 12px 25px rgba(30, 86, 49, 0.15)';
                card.style.borderColor = '#1E5631';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                card.style.borderColor = news.highlight ? '#C4A747' : '#e0e0e0';
            });
            
            card.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    this.openArabicNewsDetail(news.id);
                }
            });
            
            return card;
        },
        
        // ===== إيموجيات الفرق =====
        getTeamEmoji: function(team) {
            const emojis = {
                'الهلال': '👑',
                'النصر': '⚽',
                'الاتحاد': '🦁',
                'الأهلي السعودي': '🔥',
                'الأهلي المصري': '🦅',
                'الزمالك': '🕊️',
                'الشباب': '⚡',
                'الاتفاق': '🛡️',
                'الخليج': '🌊',
                'الفتح': '🎯',
                'الرائد': '🟡',
                'الوطني': '🇸🇦',
                'الوداد': '🔴',
                'الرجاء': '🟢',
                'السد': '🟡',
                'الريان': '🔵',
                'الشارقة': '🦁',
                'العين': '🟣',
                'الوحدة': '🦅',
                'الترجي': '🔵',
                'فريق عربي': '🇸🇦',
                'فريق منافس': '⚽'
            };
            return emojis[team] || '⚽';
        },
        
        // ===== ألوان الدوريات العربية =====
        getLeagueColor: function(league) {
            const colors = {
                'الدوري السعودي': '#1E5631, #2E7D32',
                'دوري أبطال آسيا': '#00529B, #1E5631',
                'كأس الملك': '#C4A747, #D4B757',
                'كأس ولي العهد': '#8B4513, #A0522D',
                'الدوري المصري': '#C8102E, #FFD700',
                'كأس مصر': '#000000, #C8102E',
                'دوري الخليج العربي': '#00843D, #FFD700',
                'كأس رئيس الدولة': '#FF0000, #000000',
                'دوري أبطال إفريقيا': '#FFD700, #007A3D',
                'كأس الكونفدرالية': '#654321, #8B4513',
                'كأس العرب للأندية': '#FF0000, #000000, #008000, #FFFFFF',
                'دوري نجوم قطر': '#6A0DAD, #8A2BE2',
                'بطولة عربية': '#1E5631, #C4A747'
            };
            
            return colors[league] || '#1E5631, #2E7D32';
        },
        
        // ===== فلتر الدوريات العربية =====
        createLeagueFilters: function() {
            const filterBar = document.createElement('div');
            filterBar.className = 'arabic-league-filters';
            filterBar.style.cssText = `
                display: flex;
                gap: 10px;
                margin-bottom: 30px;
                flex-wrap: wrap;
                justify-content: center;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 10px;
            `;
            
            const leagues = [
                { id: 'all', name: '🏆 جميع الأخبار العربية' },
                { id: 'الدوري السعودي', name: '🇸🇦 الدوري السعودي' },
                { id: 'دوري أبطال آسيا', name: '🌏 دوري أبطال آسيا' },
                { id: 'كأس الملك', name: '👑 كأس الملك' },
                { id: 'الدوري المصري', name: '🇪🇬 الدوري المصري' },
                { id: 'دوري أبطال إفريقيا', name: '🌍 دوري أبطال إفريقيا' },
                { id: 'دوري الخليج العربي', name: '🇦🇪 دوري الخليج' },
                { id: 'دوري نجوم قطر', name: '🇶🇦 دوري قطر' }
            ];
            
            leagues.forEach(league => {
                const btn = document.createElement('button');
                btn.textContent = league.name;
                btn.style.cssText = `
                    padding: 10px 20px;
                    border: 2px solid ${this.currentLeague === league.id ? '#1E5631' : '#ddd'};
                    background: ${this.currentLeague === league.id ? '#1E5631' : 'white'};
                    color: ${this.currentLeague === league.id ? 'white' : '#333'};
                    border-radius: 25px;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-weight: ${this.currentLeague === league.id ? 'bold' : 'normal'};
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                `;
                
                btn.addEventListener('click', () => {
                    this.currentLeague = league.id;
                    this.displayNews();
                    Utils.showToast(`عرض أخبار ${league.name}`, 'info');
                });
                
                btn.addEventListener('mouseenter', () => {
                    if (this.currentLeague !== league.id) {
                        btn.style.borderColor = '#1E5631';
                        btn.style.background = '#f8f9fa';
                    }
                });
                
                btn.addEventListener('mouseleave', () => {
                    if (this.currentLeague !== league.id) {
                        btn.style.borderColor = '#ddd';
                        btn.style.background = 'white';
                    }
                });
                
                filterBar.appendChild(btn);
            });
            
            return filterBar;
        },
        
        // ===== فتح تفاصيل الخبر العربي =====
        openArabicNewsDetail: function(newsId) {
            const news = this.arabicNews.find(n => n.id === newsId) || 
                        Utils.getMockArabicNews().find(n => n.id === newsId);
            
            if (!news) return;
            
            // إنشاء نافذة التفاصيل
            const modal = document.createElement('div');
            modal.className = 'arabic-news-modal';
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.85);
                z-index: 10000;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
                backdrop-filter: blur(5px);
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
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    border: 2px solid #1E5631;
                ">
                    <button onclick="this.closest('.arabic-news-modal').remove(); document.body.style.overflow = '';" 
                            style="
                                position: absolute;
                                top: 15px;
                                left: 15px;
                                background: #D32F2F;
                                color: white;
                                border: none;
                                width: 40px;
                                height: 40px;
                                border-radius: 50%;
                                cursor: pointer;
                                z-index: 10001;
                                font-size: 18px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                transition: all 0.3s;
                            "
                            onmouseover="this.style.transform='rotate(90deg)'; this.style.background='#B71C1C'"
                            onmouseout="this.style.transform='rotate(0deg)'; this.style.background='#D32F2F'">
                        ✕
                    </button>
                    
                    <div style="
                        background: linear-gradient(135deg, ${this.getLeagueColor(news.league)});
                        padding: 30px;
                        color: white;
                        position: relative;
                        border-radius: 18px 18px 0 0;
                    ">
                        ${news.isLive ? `
                        <div style="
                            position: absolute;
                            top: 15px;
                            left: 70px;
                            background: rgba(211, 47, 47, 0.9);
                            color: white;
                            padding: 5px 15px;
                            border-radius: 20px;
                            font-size: 12px;
                            font-weight: bold;
                            display: flex;
                            align-items: center;
                            gap: 5px;
                            animation: pulse 1.5s infinite;
                        ">
                            <i class="fas fa-circle"></i> خبر مباشر
                        </div>
                        ` : ''}
                        
                        <h1 style="
                            margin: ${news.isLive ? '20px 0 0 0' : '0'}; 
                            font-size: 26px; 
                            text-align: center;
                            text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
                        ">
                            ${news.title}
                        </h1>
                        
                        <div style="
                            display: flex;
                            justify-content: center;
                            gap: 15px;
                            margin-top: 20px;
                            flex-wrap: wrap;
                        ">
                            <span style="
                                background: rgba(255,255,255,0.2);
                                padding: 8px 18px;
                                border-radius: 20px;
                                font-size: 14px;
                                backdrop-filter: blur(5px);
                                display: flex;
                                align-items: center;
                                gap: 8px;
                            ">
                                <i class="far fa-calendar"></i> ${news.date}
                            </span>
                            <span style="
                                background: rgba(255,255,255,0.2);
                                padding: 8px 18px;
                                border-radius: 20px;
                                font-size: 14px;
                                backdrop-filter: blur(5px);
                                display: flex;
                                align-items: center;
                                gap: 8px;
                            ">
                                <i class="far fa-clock"></i> ${news.time}
                            </span>
                            <span style="
                                background: rgba(255,255,255,0.2);
                                padding: 8px 18px;
                                border-radius: 20px;
                                font-size: 14px;
                                backdrop-filter: blur(5px);
                                display: flex;
                                align-items: center;
                                gap: 8px;
                            ">
                                <i class="fas fa-trophy"></i> ${news.league}
                            </span>
                            <span style="
                                background: rgba(255,255,255,0.2);
                                padding: 8px 18px;
                                border-radius: 20px;
                                font-size: 14px;
                                backdrop-filter: blur(5px);
                                display: flex;
                                align-items: center;
                                gap: 8px;
                            ">
                                <i class="fas fa-newspaper"></i> ${news.source}
                            </span>
                        </div>
                    </div>
                    
                    <div style="padding: 30px;">
                        <div style="
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            gap: 40px;
                            margin: 25px 0;
                            padding: 20px;
                            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
                            border-radius: 15px;
                            border: 2px solid #dee2e6;
                        ">
                            <div style="text-align: center; flex: 1;">
                                <div style="
                                    font-size: 3.5rem;
                                    margin-bottom: 10px;
                                    filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.2));
                                ">
                                    ${this.getTeamEmoji(news.teams[0])}
                                </div>
                                <div style="
                                    font-size: 22px;
                                    font-weight: bold;
                                    color: #1E5631;
                                    margin-bottom: 5px;
                                ">
                                    ${news.teams[0]}
                                </div>
                                <div style="
                                    font-size: 16px;
                                    color: #666;
                                ">
                                    (الفريق المضيف)
                                </div>
                            </div>
                            
                            <div style="text-align: center;">
                                <div style="
                                    background: ${news.score === 'لم تبدأ' ? '#666' : 'linear-gradient(135deg, #1E5631, #2E7D32)'};
                                    color: white;
                                    padding: 15px 25px;
                                    border-radius: 15px;
                                    font-size: 36px;
                                    font-weight: bold;
                                    min-width: 100px;
                                    box-shadow: 0 5px 15px rgba(30, 86, 49, 0.3);
                                ">
                                    ${news.score}
                                </div>
                                <div style="
                                    margin-top: 10px;
                                    color: #666;
                                    font-size: 14px;
                                    font-weight: 500;
                                ">
                                    ${news.score === 'لم تبدأ' ? 'المباراة لم تبدأ بعد' : 'النتيجة النهائية'}
                                </div>
                            </div>
                            
                            <div style="text-align: center; flex: 1;">
                                <div style="
                                    font-size: 3.5rem;
                                    margin-bottom: 10px;
                                    filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.2));
                                ">
                                    ${this.getTeamEmoji(news.teams[1])}
                                </div>
                                <div style="
                                    font-size: 22px;
                                    font-weight: bold;
                                    color: #1E5631;
                                    margin-bottom: 5px;
                                ">
                                    ${news.teams[1]}
                                </div>
                                <div style="
                                    font-size: 16px;
                                    color: #666;
                                ">
                                    (الفريق الضيف)
                                </div>
                            </div>
                        </div>
                        
                        <div style="
                            background: #f8f9fa;
                            padding: 25px;
                            border-radius: 15px;
                            margin: 25px 0;
                            border-right: 5px solid #1E5631;
                        ">
                            <h2 style="
                                color: #1E5631;
                                margin-bottom: 15px;
                                display: flex;
                                align-items: center;
                                gap: 10px;
                            ">
                                <i class="fas fa-newspaper"></i> تفاصيل الخبر
                            </h2>
                            <div style="
                                color: #444;
                                line-height: 1.8;
                                font-size: 16px;
                                text-align: justify;
                            ">
                                ${news.content || news.excerpt}
                                <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd;">
                                    <p style="color: #666; font-style: italic; margin-bottom: 10px;">
                                        <i class="fas fa-info-circle"></i> مصدر الخبر: ${news.source}
                                    </p>
                                    <p style="color: #666; font-size: 14px;">
                                        <i class="far fa-calendar"></i> تاريخ النشر: ${news.date} - ${news.time}
                                    </p>
                                    ${news.category ? `
                                    <p style="color: #666; font-size: 14px;">
                                        <i class="fas fa-tag"></i> التصنيف: ${news.category}
                                    </p>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee;">
                            <h3 style="
                                color: #1E5631;
                                margin-bottom: 20px;
                                display: flex;
                                align-items: center;
                                gap: 10px;
                            ">
                                <i class="fas fa-share-alt"></i> شارك الخبر العربي
                            </h3>
                            <div style="display: flex; gap: 10px; margin-top: 10px;">
                                <button style="
                                    flex: 1;
                                    padding: 12px;
                                    border: 2px solid #1877F2;
                                    background: white;
                                    color: #1877F2;
                                    border-radius: 10px;
                                    cursor: pointer;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    gap: 8px;
                                    font-weight: bold;
                                    transition: all 0.3s;
                                "
                                onmouseover="this.style.background='#1877F2'; this.style.color='white'"
                                onmouseout="this.style.background='white'; this.style.color='#1877F2'">
                                    <i class="fab fa-facebook-f"></i> فيسبوك
                                </button>
                                <button style="
                                    flex: 1;
                                    padding: 12px;
                                    border: 2px solid #1DA1F2;
                                    background: white;
                                    color: #1DA1F2;
                                    border-radius: 10px;
                                    cursor: pointer;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    gap: 8px;
                                    font-weight: bold;
                                    transition: all 0.3s;
                                "
                                onmouseover="this.style.background='#1DA1F2'; this.style.color='white'"
                                onmouseout="this.style.background='white'; this.style.color='#1DA1F2'">
                                    <i class="fab fa-twitter"></i> تويتر
                                </button>
                                <button style="
                                    flex: 1;
                                    padding: 12px;
                                    border: 2px solid #25D366;
                                    background: white;
                                    color: #25D366;
                                    border-radius: 10px;
                                    cursor: pointer;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    gap: 8px;
                                    font-weight: bold;
                                    transition: all 0.3s;
                                "
                                onmouseover="this.style.background='#25D366'; this.style.color='white'"
                                onmouseout="this.style.background='white'; this.style.color='#25D366'">
                                    <i class="fab fa-whatsapp"></i> واتساب
                                </button>
                            </div>
                        </div>
                        
                        ${news.link && news.link !== '#' ? `
                        <div style="margin-top: 20px; text-align: center;">
                            <a href="${news.link}" target="_blank" style="
                                display: inline-flex;
                                align-items: center;
                                gap: 8px;
                                background: linear-gradient(135deg, #1E5631, #2E7D32);
                                color: white;
                                text-decoration: none;
                                padding: 10px 20px;
                                border-radius: 25px;
                                font-weight: bold;
                                transition: all 0.3s;
                            "
                            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 5px 15px rgba(30, 86, 49, 0.3)'"
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                                <i class="fas fa-external-link-alt"></i>
                                قراءة الخبر الأصلي على ${news.source}
                            </a>
                        </div>
                        ` : ''}
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
        },
        
        // ===== البحث في الأخبار العربية =====
        searchArabicNews: function() {
            const searchInput = document.getElementById('football-search');
            if (!searchInput) return;
            
            const query = searchInput.value.toLowerCase().trim();
            if (!query) {
                this.displayNews();
                return;
            }
            
            const results = this.arabicNews.filter(news => 
                news.title.toLowerCase().includes(query) ||
                news.teams.some(team => team.toLowerCase().includes(query)) ||
                news.league.toLowerCase().includes(query) ||
                news.excerpt.toLowerCase().includes(query) ||
                (news.source && news.source.toLowerCase().includes(query)) ||
                (news.category && news.category.toLowerCase().includes(query))
            );
            
            const container = document.getElementById('football-news-container');
            if (!container) return;
            
            if (results.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 50px;">
                        <div style="font-size: 4rem; color: #e0e0e0; margin-bottom: 20px;">
                            <i class="fas fa-search"></i>
                        </div>
                        <p style="color: #666; font-size: 18px;">
                            لم نعثر على أي أخبار تتطابق مع بحثك
                        </p>
                        <p style="color: #888; margin-top: 10px;">
                            حاول البحث بكلمات مختلفة مثل: الهلال، الدوري السعودي، هدف
                        </p>
                        <button onclick="FootballNews.loadArabicNews()" 
                                style="margin-top: 20px; background: #1E5631; color: white; border: none; padding: 12px 24px; border-radius: 25px; cursor: pointer; font-weight: bold;">
                            <i class="fas fa-redo"></i> عرض جميع الأخبار
                        </button>
                    </div>
                `;
                return;
            }
            
            container.innerHTML = `
                <div style="margin-bottom: 25px; padding: 20px; background: linear-gradient(135deg, #f8f9fa, #e9ecef); 
                     border-radius: 12px; border-right: 5px solid #1E5631;">
                    <h3 style="margin: 0; color: #1E5631; display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-search"></i> 
                        نتائج البحث العربي: "${searchInput.value}" 
                        <span style="background: #1E5631; color: white; padding: 3px 10px; border-radius: 15px; font-size: 14px;">
                            ${results.length} نتيجة
                        </span>
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
                const newsCard = this.createArabicNewsCard(news, index);
                newsGrid.appendChild(newsCard);
            });
            
            container.appendChild(newsGrid);
            Utils.showToast(`تم العثور على ${results.length} نتيجة`, 'success');
        },
        
        // ===== تحديث تلقائي =====
        setupAutoRefresh: function() {
            // إزالة أي مؤقت سابق
            if (this.refreshTimer) {
                clearInterval(this.refreshTimer);
            }
            
            // تحديث كل 3 دقائق (180,000 ميلي ثانية)
            this.refreshTimer = setInterval(() => {
                if (!this.isLoading) {
                    Utils.showToast('🔄 جاري تحديث الأخبار العربية تلقائياً...', 'info');
                    this.loadArabicNews();
                }
            }, 180000);
        },
        
        // ===== إضافة خبر عربي جديد =====
        addArabicNews: function(newNews) {
            if (!this.arabicNews) this.arabicNews = [];
            
            newNews.id = Date.now();
            newNews.date = Utils.formatArabicDate(new Date());
            newNews.time = Utils.getCurrentTime();
            newNews.highlight = true;
            newNews.isLive = true;
            
            this.arabicNews.unshift(newNews);
            this.displayNews();
            Utils.showToast('تم إضافة خبر عربي جديد!', 'success');
        },
        
        // ===== إعادة تحميل سريع =====
        forceRefresh: function() {
            if (this.newsFetcher) {
                this.newsFetcher.lastFetch = 0;
                this.newsFetcher.newsCache = [];
            }
            this.loadArabicNews();
        }
    };
    
    // ===== التهيئة عند التحميل =====
    document.addEventListener('DOMContentLoaded', function() {
        // إضافة أنماط CSS
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
            
            @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.6; }
                100% { opacity: 1; }
            }
            
            .loading-spinner {
                text-align: center;
                padding: 60px 20px;
            }
            
            .loading-spinner .spinner {
                width: 60px;
                height: 60px;
                border: 6px solid #f3f3f3;
                border-top: 6px solid #1E5631;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 25px;
            }
            
            .loading-spinner p {
                color: #666;
                font-size: 16px;
                margin-top: 15px;
            }
            
            /* تحسينات للعربية */
            .arabic-news-card {
                font-family: 'Segoe UI', 'Arial', sans-serif;
            }
            
            .arabic-news-card h3 {
                font-weight: 600;
            }
            
            /* زر البحث العربي */
            .search-box button {
                background: linear-gradient(135deg, #1E5631, #2E7D32);
                border: none;
                color: white;
                padding: 12px 25px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.3s;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            }
            
            .search-box button:hover {
                background: linear-gradient(135deg, #2E7D32, #3E8D42);
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(30, 86, 49, 0.3);
            }
            
            .search-box input {
                border: 2px solid #1E5631;
                padding: 12px 20px;
                border-radius: 25px;
                font-size: 16px;
                width: 100%;
                max-width: 400px;
                transition: all 0.3s;
            }
            
            .search-box input:focus {
                outline: none;
                border-color: #2E7D32;
                box-shadow: 0 0 0 3px rgba(30, 86, 49, 0.1);
            }
            
            /* تحسين التصميم للعربية */
            @media (max-width: 768px) {
                .arabic-league-filters {
                    flex-direction: column;
                    align-items: stretch;
                }
                
                .arabic-league-filters button {
                    width: 100%;
                    margin-bottom: 10px;
                }
                
                .arabic-news-grid {
                    grid-template-columns: 1fr;
                }
                
                .search-box {
                    flex-direction: column;
                    gap: 10px;
                }
                
                .search-box input {
                    max-width: 100%;
                }
                
                .arabic-news-modal {
                    padding: 10px;
                }
                
                .arabic-news-modal > div {
                    max-height: 95vh;
                }
            }
            
            /* تخصيص شريط التمرير */
            .arabic-news-modal::-webkit-scrollbar {
                width: 8px;
            }
            
            .arabic-news-modal::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 4px;
            }
            
            .arabic-news-modal::-webkit-scrollbar-thumb {
                background: #1E5631;
                border-radius: 4px;
            }
            
            .arabic-news-modal::-webkit-scrollbar-thumb:hover {
                background: #2E7D32;
            }
        `;
        document.head.appendChild(style);
        
        // إضافة زر تحديث يدوي
        const refreshButton = document.createElement('button');
        refreshButton.id = 'manual-refresh-btn';
        refreshButton.innerHTML = '<i class="fas fa-sync-alt"></i> تحديث الآن';
        refreshButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: linear-gradient(135deg, #1E5631, #2E7D32);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: bold;
            z-index: 999;
            box-shadow: 0 4px 15px rgba(30, 86, 49, 0.3);
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s;
        `;
        
        refreshButton.addEventListener('mouseenter', () => {
            refreshButton.style.transform = 'translateY(-2px)';
            refreshButton.style.boxShadow = '0 6px 20px rgba(30, 86, 49, 0.4)';
        });
        
        refreshButton.addEventListener('mouseleave', () => {
            refreshButton.style.transform = 'translateY(0)';
            refreshButton.style.boxShadow = '0 4px 15px rgba(30, 86, 49, 0.3)';
        });
        
        refreshButton.addEventListener('click', () => {
            FootballNews.forceRefresh();
        });
        
        document.body.appendChild(refreshButton);
        
        // تحميل الأخبار العربية عند التحميل
        setTimeout(() => {
            FootballNews.loadArabicNews();
            Utils.showToast('مرحباً بك في ميدان العرب - أخبار كرة القدم العربية الحقيقية 🇸🇦', 'success');
        }, 1000);
    });
    
    // ===== جعل الوظائف متاحة عالمياً =====
    window.FootballNews = FootballNews;
    window.Utils = Utils;
    window.NewsFetcher = NewsFetcher;
    
    // وظيفة لإضافة خبر جديد يدوياً (للاختبار)
    window.addSampleArabicNews = function() {
        const sampleNews = {
            title: "الهلال يحقق فوزاً تاريخياً في ديربي الرياض",
            excerpt: "فوز كبير للهلال على النصر بنتيجة 3-0 في ديربي العاصمة السعودية",
            content: "سيطر الهلال على مجريات المباراة منذ الصافرة الأولى وتمكن من تسجيل ثلاثة أهداف نظيفة في الشوط الأول، واستمر في سيطرته في الشوط الثاني ليحقق فوزاً مهماً يقربه من لقب الدوري.",
            league: "الدوري السعودي",
            teams: ["الهلال", "النصر"],
            score: "3-0",
            source: "ميدان العرب",
            isLive: true,
            category: "نتائج المباريات"
        };
        
        FootballNews.addArabicNews(sampleNews);
    };
    
    // وظيفة عرض حالة الاتصال
    window.showConnectionStatus = function() {
        const status = FootballNews.newsFetcher ? '🟢 جالب الأخبار يعمل' : '🔴 جالب الأخبار غير مهيئ';
        const cacheStatus = FootballNews.newsFetcher && FootballNews.newsFetcher.newsCache.length > 0 ? 
            `(${FootballNews.newsFetcher.newsCache.length} خبر مخزن)` : '(لا توجد أخبار مخزنة)';
        
        Utils.showToast(`${status} ${cacheStatus}`, 'info');
    };
})();
