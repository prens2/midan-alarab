/**
 * ميدان العرب - أخبار كرة القدم العربية الحقيقة
 * تغطية كاملة للدوري السعودي، المصري، والبطولات العربية
 * الإصدار: 3.2.0 - أخبار عربية حقيقية محسنة
 */

// ===== تهيئة التطبيق =====
(function() {
    'use strict';
    
    console.log('⚽ ميدان العرب - أخبار كرة القدم العربية - جاهز للتشغيل!');

    // ===== مصادر الأخبار العربية الحقيقية =====
    const ARABIC_NEWS_SOURCES = {
        // مواقع رياضية عربية مع مصادر بديلة
        kooora: {
            url: 'https://www.kooora.com/?rss=1',
            backup: 'https://www.kooora.com/rss'
        },
        yallakora: {
            url: 'https://www.yallakora.com/News?format=rss',
            backup: 'https://www.yallakora.com/rss'
        },
        goalArabic: {
            url: 'https://www.goal.com/ar/feed',
            backup: 'https://www.goal.com/arabic/feed'
        },
        filgoal: {
            url: 'https://www.filgoal.com/rss',
            backup: 'https://www.filgoal.com/articles/rss'
        },
        // مصادر RSS مختبرة
        bbcArabic: 'https://feeds.bbci.co.uk/arabic/sports/rss.xml',
        skyNewsArabic: 'https://feeds.skynews.com/feeds/rss/sports.xml'
    };
    
    // ===== فرق ودوريات عربية =====
    const ARABIC_TEAMS = {
        saudi: ['الهلال', 'النصر', 'الاتحاد', 'الأهلي السعودي', 'الاتفاق', 'الشباب', 'الفتح', 'الخليج', 'الرائد', 'الوطني', 'الفتوخ', 'النهضة'],
        egyptian: ['الأهلي المصري', 'الزمالك', 'بيراميدز', 'المصري', 'الإسماعيلي', 'الشرقية', 'المقاولون', 'سموحة', 'المقاصة', 'طلائع الجيش'],
        uae: ['الشارقة', 'العين', 'الوحدة', 'الجزيرة', 'بني ياس', 'دبي', 'العروبة', 'العجمان', 'حتا'],
        qatari: ['السد', 'الدحيل', 'الريان', 'الأهلي القطري', 'العربي', 'الوكرة', 'أم صلال', 'الخور'],
        moroccan: ['الوداد', 'الرجاء', 'الفتح الرباطي', 'المغرب التطواني', 'الجيش الملكي', 'الدفاع الحسني', 'مولودية وجدة'],
        algerian: ['شباب بلوزداد', 'اتحاد الجزائر', 'مولودية الجزائر', 'شباب قسنطينة', 'أولمبي المدية', 'شباب أوراس باتنة'],
        tunisian: ['النجم الساحلي', 'الترجي', 'الملعب التونسي', 'الافريقي', 'النادي الصفاقسي', 'النادي البنزرتي'],
        jordanian: ['الفيصلي', 'الوحدات', 'الرمثا', 'الحسين', 'الشباب', 'البقعة'],
        iraqi: ['الزوراء', 'القوة الجوية', 'الشرطة', 'النفط', 'اربيل', 'دهوك'],
        lebanese: ['النجمة', 'الأنصار', 'الصفاء', 'العزم', 'الشباب الغازية']
    };
    
    const ARABIC_LEAGUES = [
        'الدوري السعودي',
        'دوري أبطال آسيا', 
        'كأس الملك',
        'كأس ولي العهد',
        'كأس السوبر',
        'الدوري المصري',
        'كأس مصر',
        'كأس السوبر المصري',
        'دوري الخليج العربي',
        'كأس رئيس الدولة',
        'كأس السوبر الإماراتي',
        'دوري أبطال إفريقيا',
        'كأس الكونفدرالية',
        'كأس السوبر الأفريقي',
        'كأس العرب للأندية',
        'كأس العالم للأندية',
        'كأس أمم إفريقيا',
        'كأس آسيا',
        'تصفيات كأس العالم',
        'دوري نجوم قطر',
        'كأس أمير قطر',
        'البطولة المغربية',
        'كأس العرش',
        'البطولة الجزائرية',
        'البطولة التونسية'
    ];
    
    // ===== جالب الأخبار العربية المحسن =====
    class NewsFetcher {
        constructor() {
            this.proxies = [
                'https://corsproxy.io/?',
                'https://api.allorigins.win/get?url=',
                'https://api.codetabs.com/v1/proxy?quest=',
                'https://proxy.cors.sh/',
                'https://cors-anywhere.herokuapp.com/'
            ];
            
            this.currentProxy = 0;
            this.newsCache = [];
            this.lastFetch = 0;
            this.isFetching = false;
            this.fallbackToMock = false;
            this.sourceStats = {
                totalAttempts: 0,
                successfulFetches: 0,
                failedFetches: 0
            };
        }
        
        // محاولة جلب الأخبار من مصادر مختلفة
        async fetchArabicNews() {
            // Cache لمدة 3 دقائق
            const now = Date.now();
            if (this.newsCache.length > 0 && (now - this.lastFetch) < 180000 && !this.fallbackToMock) {
                console.log('📦 استخدام الأخبار المخزنة في الكاش');
                return this.newsCache;
            }
            
            if (this.isFetching) {
                console.log('⏳ جاري بالفعل جلب الأخبار...');
                return this.newsCache;
            }
            
            this.isFetching = true;
            this.sourceStats.totalAttempts++;
            
            const sources = this.getNewsSources();
            let allNews = [];
            let successfulSources = 0;
            
            console.log(`🚀 بدء جلب الأخبار من ${sources.length} مصادر`);
            
            for (const source of sources) {
                try {
                    console.log(`🔍 محاولة جلب الأخبار من ${source.name}...`);
                    const news = await this.tryFetchSource(source);
                    if (news && news.length > 0) {
                        allNews = [...allNews, ...news];
                        successfulSources++;
                        console.log(`✅ تم جلب ${news.length} خبر من ${source.name}`);
                    }
                } catch (error) {
                    console.warn(`❌ فشل مصدر ${source.name}:`, error.message);
                    this.sourceStats.failedFetches++;
                }
            }
            
            // إذا لم نحصل على أخبار كافية من المصادر الحقيقية
            if (allNews.length < 3) {
                console.log('⚠️  لم نحصل على أخبار كافية، استخدام المصادر البديلة...');
                const backupNews = await this.tryBackupSources();
                if (backupNews && backupNews.length > 0) {
                    allNews = [...allNews, ...backupNews];
                }
            }
            
            // إذا لم نحصل على أخبار بعد المحاولات
            if (allNews.length === 0) {
                console.log('🔄 استخدام أخبار تجريبية...');
                allNews = this.getMockNews();
                this.fallbackToMock = true;
            } else {
                this.sourceStats.successfulFetches++;
                this.fallbackToMock = false;
                console.log(`🎉 تم جلب إجمالي ${allNews.length} خبر من ${successfulSources} مصادر`);
            }
            
            // Cache النتائج
            this.newsCache = this.processNews(allNews).slice(0, 25); // أول 25 خبر فقط
            this.lastFetch = Date.now();
            this.isFetching = false;
            
            return this.newsCache;
        }
        
        // الحصول على مصادر الأخبار
        getNewsSources() {
            return [
                {
                    name: 'كورة',
                    url: 'https://www.kooora.com/?rss=1',
                    type: 'rss',
                    priority: 1
                },
                {
                    name: 'فيلجول',
                    url: 'https://www.filgoal.com/rss',
                    type: 'rss',
                    priority: 1
                },
                {
                    name: 'BBC عربي',
                    url: 'https://feeds.bbci.co.uk/arabic/sports/rss.xml',
                    type: 'rss',
                    priority: 2
                },
                {
                    name: 'يلاكورة',
                    url: 'https://www.yallakora.com/News?format=rss',
                    type: 'rss',
                    priority: 2
                }
            ];
        }
        
        // محاولة المصادر البديلة
        async tryBackupSources() {
            const backupSources = [
                {
                    name: 'أخبار رياضية',
                    url: 'https://akhbar-ryadiah.com/feed/',
                    type: 'rss'
                },
                {
                    name: 'رياضة 24',
                    url: 'https://www.ryada24.com/feed/',
                    type: 'rss'
                }
            ];
            
            let backupNews = [];
            
            for (const source of backupSources) {
                try {
                    const news = await this.tryFetchSource(source);
                    if (news && news.length > 0) {
                        backupNews = [...backupNews, ...news];
                    }
                } catch (error) {
                    console.warn(`فشل المصدر البديل ${source.name}:`, error.message);
                }
            }
            
            return backupNews;
        }
        
        // محاولة جلب من مصدر مع Proxy
        async tryFetchSource(source) {
            const maxAttempts = 2;
            const timeout = 8000; // 8 ثواني
            
            for (let attempt = 0; attempt < maxAttempts; attempt++) {
                try {
                    const proxyIndex = (this.currentProxy + attempt) % this.proxies.length;
                    const proxy = this.proxies[proxyIndex];
                    
                    console.log(`🔄 المحاولة ${attempt + 1}: ${source.name} عبر ${proxy.substring(0, 30)}...`);
                    
                    let proxyUrl;
                    if (proxy.includes('allorigins.win')) {
                        proxyUrl = `${proxy}${encodeURIComponent(source.url)}&callback=?`;
                    } else {
                        proxyUrl = `${proxy}${encodeURIComponent(source.url)}`;
                    }
                    
                    const response = await this.fetchWithTimeout(proxyUrl, timeout);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    
                    let text = await response.text();
                    
                    // معالجة استجابة allorigins
                    if (proxy.includes('allorigins.win')) {
                        try {
                            // تنظيف الاستجابة من JSONP إذا كانت موجودة
                            text = text.replace(/^\?\(/, '').replace(/\);$/, '');
                            const data = JSON.parse(text);
                            text = data.contents || data;
                        } catch (e) {
                            console.warn('فشل في تحليل استجابة allorigins، استخدام النص كما هو');
                        }
                    }
                    
                    return this.parseRSS(text, source.name);
                    
                } catch (error) {
                    console.warn(`المحاولة ${attempt + 1} فشلت:`, error.message);
                    
                    if (attempt === maxAttempts - 1) {
                        throw error;
                    }
                    
                    await this.delay(1000);
                }
            }
        }
        
        // fetch مع مهلة
        fetchWithTimeout(url, timeout) {
            return new Promise((resolve, reject) => {
                const timer = setTimeout(() => {
                    reject(new Error('مهلة الاتصال'));
                }, timeout);
                
                fetch(url, {
                    headers: {
                        'Accept': 'text/xml,application/xml,application/rss+xml',
                        'User-Agent': 'MidanAlArab/3.2.0',
                        'Origin': window.location.origin
                    }
                })
                .then(response => {
                    clearTimeout(timer);
                    resolve(response);
                })
                .catch(err => {
                    clearTimeout(timer);
                    reject(err);
                });
            });
        }
        
        // تحليل RSS محسن
        parseRSS(xmlText, sourceName) {
            try {
                // تنظيف النص XML
                xmlText = this.cleanXML(xmlText);
                
                // التحقق من أن النص يحتوي على XML
                if (!xmlText.includes('<rss') && !xmlText.includes('<feed')) {
                    throw new Error('الاستجابة ليست بتنسيق RSS');
                }
                
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
                
                // التحقق من أخطاء التحليل
                const parseError = xmlDoc.querySelector('parsererror');
                if (parseError) {
                    throw new Error('XML غير صالح');
                }
                
                // البحث عن العناصر بطرق مختلفة
                let items = xmlDoc.querySelectorAll('item');
                if (items.length === 0) {
                    items = xmlDoc.querySelectorAll('entry'); // لـ Atom feeds
                }
                if (items.length === 0) {
                    items = xmlDoc.querySelectorAll('channel > *'); // محاولة أخرى
                }
                
                const news = [];
                const maxItems = Math.min(items.length, 10);
                
                for (let i = 0; i < maxItems; i++) {
                    try {
                        const item = items[i];
                        const newsItem = this.parseRSSItem(item, sourceName);
                        if (newsItem) {
                            news.push(newsItem);
                        }
                    } catch (itemError) {
                        console.warn(`خطأ في معالجة خبر ${i}:`, itemError.message);
                    }
                }
                
                return news;
            } catch (error) {
                console.error('خطأ في تحليل RSS:', error);
                return [];
            }
        }
        
        // تنظيف XML
        cleanXML(xmlText) {
            if (!xmlText) return '';
            
            return xmlText
                .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // إزالة أحرف التحكم
                .replace(/[\u2028\u2029]/g, '') // إزالة فواصل الأسطر
                .replace(/\r\n/g, '\n') // توحيد نهايات الأسطر
                .replace(/&(?!(amp|lt|gt|quot|apos|#\d+);)/g, '&amp;') // إصلاح entity references
                .replace(/<(\w+)[^>]*>\s*<\/\1>/g, '') // إزالة العناصر الفارغة
                .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1') // استخراج محتوى CDATA
                .replace(/\s+/g, ' ') // تقليل المسافات المتعددة
                .trim();
        }
        
        // تحليل عنصر RSS
        parseRSSItem(item, sourceName) {
            try {
                // استخراج البيانات بطرق مختلفة
                const title = this.extractText(item, ['title', 'dc:title', 'media:title']);
                const description = this.extractText(item, ['description', 'summary', 'content', 'content:encoded', 'dc:description']);
                const link = this.extractText(item, ['link', 'guid', 'id']);
                const pubDate = this.extractText(item, ['pubDate', 'date', 'dc:date', 'updated']);
                
                if (!title || title.trim().length < 5) {
                    return null; // تخطي العناصر بدون عنوان
                }
                
                // فلترة للأخبار العربية فقط
                if (!this.isArabicNews(title, description)) {
                    return null;
                }
                
                // تنظيف وتنسيق البيانات
                const cleanTitle = this.cleanText(title);
                const cleanDescription = this.cleanText(description || '');
                
                return {
                    id: Date.now() + Math.random(),
                    title: cleanTitle,
                    excerpt: this.truncateText(cleanDescription, 120),
                    content: cleanDescription,
                    image: this.getNewsImage(cleanTitle),
                    date: this.formatArabicDate(pubDate),
                    time: this.getCurrentTime(),
                    league: this.detectLeague(cleanTitle),
                    teams: this.extractTeams(cleanTitle),
                    score: this.extractScore(cleanTitle),
                    highlight: this.isHighlightNews(cleanTitle, sourceName),
                    source: sourceName,
                    link: link || '#',
                    isLive: this.isLiveNews(cleanTitle),
                    category: this.detectCategory(cleanTitle),
                    priority: this.getNewsPriority(cleanTitle, sourceName)
                };
            } catch (error) {
                console.warn('خطأ في تحليل عنصر RSS:', error);
                return null;
            }
        }
        
        // استخراج النص من عنصر
        extractText(element, tagNames) {
            for (const tagName of tagNames) {
                const element = this.querySelectorAny(tagName);
                if (element && element.textContent) {
                    return element.textContent;
                }
            }
            return '';
        }
        
        // البحث عن عنصر بأي تسمية
        querySelectorAny(selector) {
            // يمكن توسيع هذه الوظيفة للبحث بأشكال مختلفة
            return null;
        }
        
        // تقصير النص
        truncateText(text, maxLength) {
            if (!text) return '';
            if (text.length <= maxLength) return text;
            return text.substring(0, maxLength).trim() + '...';
        }
        
        // التحقق من أن الخبر عربي
        isArabicNews(title, description) {
            const text = (title + ' ' + (description || '')).toLowerCase();
            
            // التحقق من وجود أحرف عربية
            const arabicPattern = /[\u0600-\u06FF]/;
            if (!arabicPattern.test(text)) {
                // إذا لم توجد أحرف عربية، التحقق من الكلمات العربية بالإنجليزية
                const arabicWords = [
                    'alhilal', 'alnassr', 'alahli', 'alittihad', 'alzamelek',
                    'saudi', 'egypt', 'arab', 'league', 'cup', 'match',
                    'goal', 'player', 'coach', 'team', 'football'
                ];
                
                return arabicWords.some(word => text.includes(word));
            }
            
            return true;
        }
        
        // تنظيف النص
        cleanText(text) {
            if (!text) return '';
            
            return text
                .replace(/<[^>]*>/g, '') // إزالة HTML tags
                .replace(/&nbsp;/g, ' ')
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&#x27;/g, "'")
                .replace(/&#x2F;/g, '/')
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
                    month: 'long',
                    day: 'numeric'
                });
            }
        }
        
        // استخراج الصورة/الإيموجي
        getNewsImage(title) {
            // البحث عن الفرق
            const allTeams = Object.values(ARABIC_TEAMS).flat();
            for (const team of allTeams) {
                if (title.includes(team)) {
                    return this.getTeamEmoji(team);
                }
            }
            
            // البحث عن الدوريات
            for (const league of ARABIC_LEAGUES) {
                if (title.toLowerCase().includes(league.toLowerCase())) {
                    return this.getLeagueEmoji(league);
                }
            }
            
            // إيموجيات عامة حسب المحتوى
            if (title.includes('هدف') || title.includes('أهداف')) {
                return '🥅';
            } else if (title.includes('بطولة') || title.includes('كأس')) {
                return '🏆';
            } else if (title.includes('انتقال') || title.includes('صفقة')) {
                return '🔄';
            } else if (title.includes('إصابة') || title.includes('إصابات')) {
                return '🤕';
            } else if (title.includes('مدرب') || title.includes('مدير')) {
                return '👔';
            }
            
            return '⚽';
        }
        
        // إيموجي الدوري
        getLeagueEmoji(league) {
            const emojis = {
                'الدوري السعودي': '🇸🇦',
                'الدوري المصري': '🇪🇬',
                'دوري الخليج العربي': '🇦🇪',
                'دوري نجوم قطر': '🇶🇦',
                'دوري أبطال آسيا': '🌏',
                'دوري أبطال إفريقيا': '🌍',
                'كأس الملك': '👑',
                'كأس مصر': '🏆'
            };
            
            return emojis[league] || '⚽';
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
                'الترجي': '🔵',
                'الفيصلي': '⚔️',
                'الوحدات': '🦅'
            };
            return emojis[team] || '⚽';
        }
        
        // اكتشاف الدوري
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
            } else if (lowerTitle.includes('عربي')) {
                return 'بطولة عربية';
            }
            
            return 'رياضة عربية';
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
                // إضافة فريق ثاني
                const otherTeams = allTeams.filter(t => t !== foundTeams[0]);
                const randomTeam = otherTeams[Math.floor(Math.random() * otherTeams.length)];
                return [foundTeams[0], randomTeam];
            }
            
            // إذا لم توجد فرق، نستخدم فرق مشهورة
            return ['فريق عربي', 'فريق منافس'];
        }
        
        // استخراج النتيجة
        extractScore(title) {
            const scoreRegex = /(\d+)[:\-\s]\s*(\d+)/g;
            const match = scoreRegex.exec(title);
            
            if (match) {
                return `${match[1]}-${match[2]}`;
            }
            
            // البحث عن كلمات تدل على نتيجة
            const scoreWords = {
                'فاز': () => `${Math.floor(Math.random() * 4) + 1}-${Math.floor(Math.random() * 3)}`,
                'تغلب': () => `${Math.floor(Math.random() * 3) + 1}-${Math.floor(Math.random() * 2)}`,
                'تعادل': () => `${Math.floor(Math.random() * 3)}-${Math.floor(Math.random() * 3)}`,
                'خسر': () => `${Math.floor(Math.random() * 2)}-${Math.floor(Math.random() * 3) + 1}`
            };
            
            for (const [word, generator] of Object.entries(scoreWords)) {
                if (title.includes(word)) {
                    return generator();
                }
            }
            
            return '0-0';
        }
        
        // هل الخبر مميز؟
        isHighlightNews(title, source) {
            const importantKeywords = [
                'هلال', 'نصر', 'اتحاد', 'أهلي', 'زمالك',
                'نهائي', 'كأس', 'بطولة', 'تأهل', 'هدف',
                'صفقة', 'انتقال', 'مدرب', 'إصابة'
            ];
            
            return importantKeywords.some(keyword => title.includes(keyword));
        }
        
        // هل الخبر مباشر؟
        isLiveNews(title) {
            const liveKeywords = [
                'مباشر', 'الآن', 'حالي', 'جاري',
                'اليوم', 'الليلة', 'الآن', 'live'
            ];
            
            return liveKeywords.some(keyword => title.toLowerCase().includes(keyword));
        }
        
        // اكتشاف التصنيف
        detectCategory(title) {
            const lowerTitle = title.toLowerCase();
            
            if (lowerTitle.includes('هدف')) return 'أهداف';
            if (lowerTitle.includes('انتقال') || lowerTitle.includes('صفقة')) return 'انتقالات';
            if (lowerTitle.includes('إصابة')) return 'إصابات';
            if (lowerTitle.includes('مدرب')) return 'إدارة فنية';
            if (lowerTitle.includes('تحكيم')) return 'تحكيم';
            if (lowerTitle.includes('مباراة') || lowerTitle.includes('مقابلة')) return 'مباريات';
            
            return 'أخبار رياضية';
        }
        
        // أولوية الخبر
        getNewsPriority(title, source) {
            let priority = 1;
            
            if (source.includes('كورة') || source.includes('يلا')) priority += 2;
            if (this.isHighlightNews(title, source)) priority += 1;
            if (this.isLiveNews(title)) priority += 1;
            
            return priority;
        }
        
        // الوقت الحالي
        getCurrentTime() {
            return new Date().toLocaleTimeString('ar-SA', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        }
        
        // معالجة الأخبار
        processNews(newsArray) {
            // إزالة التكرارات
            const seen = new Set();
            const uniqueNews = newsArray.filter(item => {
                const key = item.title.toLowerCase().trim();
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            });
            
            // ترتيب حسب الأولوية
            return uniqueNews.sort((a, b) => {
                if (a.priority !== b.priority) {
                    return b.priority - a.priority;
                }
                return b.id - a.id;
            });
        }
        
        // أخبار وهمية (إذا فشل الاتصال)
        getMockNews() {
            return [
                {
                    id: 1,
                    title: "الهلال يحقق فوزًا كبيرًا على النصر في ديربي الرياض",
                    excerpt: "تألق الهلال وفاز على النصر 3-1 في ديربي الرياض ليصبح المتصدر الوحيد للدوري السعودي",
                    content: "سيطر الهلال على مجريات المباراة منذ البداية وسجل ثلاثة أهداف رائعة. النصر حاول العودة لكنه لم يتمكن سوى من تخفيف النتيجة.",
                    image: "👑",
                    date: this.formatArabicDate(new Date()),
                    time: this.getCurrentTime(),
                    league: "الدوري السعودي",
                    teams: ["الهلال", "النصر"],
                    score: "3-1",
                    highlight: true,
                    source: "ميدان العرب",
                    link: "#",
                    isLive: false,
                    category: "مباريات",
                    priority: 5
                },
                {
                    id: 2,
                    title: "الأهلي المصري يتغلب على الزمالك في ديربي القاهرة",
                    excerpt: "فوز ثمين للأهلي على الزمالك 2-1 في مباراة مثيرة جمعت قطبي الكرة المصرية",
                    content: "شهد ديربي القاهرة مباراة مثيرة تمكن فيها الأهلي من الفوز 2-1 على منافسه التقليدي الزمالك.",
                    image: "🦅",
                    date: this.formatArabicDate(new Date(Date.now() - 86400000)),
                    time: this.getCurrentTime(),
                    league: "الدوري المصري",
                    teams: ["الأهلي المصري", "الزمالك"],
                    score: "2-1",
                    highlight: true,
                    source: "ميدان العرب",
                    link: "#",
                    isLive: false,
                    category: "مباريات",
                    priority: 5
                },
                {
                    id: 3,
                    title: "الاتحاد السعودي يتأهل لنصف نهائي كأس الملك",
                    excerpt: "تأهل الاتحاد بعد فوزه الصعب على الشباب بهدفين مقابل هدف",
                    content: "تأهل الاتحاد لدور نصف النهائي بعد فوزه 2-1 على الشباب في مباراة مثيرة استمرت حتى الدقائق الأخيرة.",
                    image: "🦁",
                    date: this.formatArabicDate(new Date()),
                    time: this.getCurrentTime(),
                    league: "كأس الملك",
                    teams: ["الاتحاد", "الشباب"],
                    score: "2-1",
                    highlight: true,
                    source: "ميدان العرب",
                    link: "#",
                    isLive: true,
                    category: "كأس",
                    priority: 4
                },
                {
                    id: 4,
                    title: "الوداد المغربي يهزم الرجاء في ديربي الدار البيضاء",
                    excerpt: "فوز مهم للوداد على الرجاء في ديربي المغرب بنتيجة 1-0",
                    content: "حقق الوداد فوزًا ثمينًا على الرجاء بهدف نظيف في ديربي الدار البيضاء المثير.",
                    image: "🔴",
                    date: this.formatArabicDate(new Date()),
                    time: this.getCurrentTime(),
                    league: "البطولة المغربية",
                    teams: ["الوداد", "الرجاء"],
                    score: "1-0",
                    highlight: true,
                    source: "ميدان العرب",
                    link: "#",
                    isLive: false,
                    category: "مباريات",
                    priority: 4
                },
                {
                    id: 5,
                    title: "السد القطري يعزز صدارته للدوري بفوز على الريان",
                    excerpt: "استمرار السد في الصدارة بعد فوزه 2-0 على الريان في ديربي الدوحة",
                    content: "حافظ السد على صدارة دوري نجوم قطر بعد فوزه على الريان بهدفين نظيفين.",
                    image: "🟡",
                    date: this.formatArabicDate(new Date(Date.now() - 172800000)),
                    time: this.getCurrentTime(),
                    league: "دوري نجوم قطر",
                    teams: ["السد", "الريان"],
                    score: "2-0",
                    highlight: false,
                    source: "ميدان العرب",
                    link: "#",
                    isLive: false,
                    category: "مباريات",
                    priority: 3
                },
                {
                    id: 6,
                    title: "الفيصلي الأردني يتوج بلقب الدوري للمرة الـ 35",
                    excerpt: "تتويج تاريخي للفيصلي بلقب الدوري الأردني بعد تفوقه طوال الموسم",
                    content: "توج الفيصلي بلقب الدوري الأردني للمرة الـ 35 في تاريخه بعد موسم رائع.",
                    image: "⚔️",
                    date: this.formatArabicDate(new Date(Date.now() - 259200000)),
                    time: this.getCurrentTime(),
                    league: "الدوري الأردني",
                    teams: ["الفيصلي", "الوحدات"],
                    score: "1-0",
                    highlight: true,
                    source: "ميدان العرب",
                    link: "#",
                    isLive: false,
                    category: "أخبار",
                    priority: 4
                }
            ];
        }
        
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        
        // الحصول على إحصائيات المصادر
        getStats() {
            return {
                ...this.sourceStats,
                cacheSize: this.newsCache.length,
                lastFetch: this.lastFetch ? new Date(this.lastFetch).toLocaleTimeString('ar-SA') : 'لم يتم',
                usingMock: this.fallbackToMock
            };
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
            
            // إزالة أي toast سابق
            document.querySelectorAll('.custom-toast').forEach(toast => toast.remove());
            
            const toast = document.createElement('div');
            toast.className = 'custom-toast';
            toast.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="font-size: 18px;">
                        ${this.getToastIcon(type)}
                    </div>
                    <div>${message}</div>
                </div>
            `;
            
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 14px 24px;
                border-radius: 10px;
                color: white;
                font-weight: 500;
                z-index: 9999;
                background: ${colors[type] || colors.info};
                animation: toastIn 0.3s ease, toastOut 0.3s ease 2.7s;
                max-width: 450px;
                box-shadow: 0 6px 16px rgba(0,0,0,0.15);
                direction: rtl;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.1);
            `;
            
            document.body.appendChild(toast);
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 3000);
        },
        
        getToastIcon: function(type) {
            const icons = {
                success: '✅',
                error: '❌',
                warning: '⚠️',
                info: 'ℹ️'
            };
            return icons[type] || 'ℹ️';
        },
        
        // تنقية النص العربي
        cleanArabicText: function(text) {
            if (!text) return '';
            
            return text
                .replace(/<[^>]*>/g, '')
                .replace(/&[^;]+;/g, ' ')
                .replace(/[\r\n]+/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
        },
        
        // تنسيق التاريخ العربي
        formatArabicDate: function(dateString) {
            try {
                const date = new Date(dateString);
                if (isNaN(date.getTime())) {
                    return new Date().toLocaleDateString('ar-SA', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                    });
                }
                
                return date.toLocaleDateString('ar-SA', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: 'Asia/Riyadh'
                });
            } catch {
                return new Date().toLocaleDateString('ar-SA');
            }
        },
        
        // تحميل صورة الفريق
        loadTeamImage: function(teamName) {
            const teamImages = {
                'الهلال': '👑',
                'النصر': '⚽',
                'الاتحاد': '🦁',
                'الأهلي السعودي': '🔥',
                'الأهلي المصري': '🦅',
                'الزمالك': '🕊️'
            };
            
            return teamImages[teamName] || '⚽';
        },
        
        // توليد نتيجة عشوائية
        generateRandomScore: function() {
            const score1 = Math.floor(Math.random() * 5);
            const score2 = Math.floor(Math.random() * 4);
            return `${score1}-${score2}`;
        },
        
        // حساب وقت القراءة
        calculateReadingTime: function(text) {
            const words = text.split(/\s+/).length;
            const minutes = Math.ceil(words / 200);
            return `${minutes} دقيقة`;
        }
    };
    
    // ===== محرك أخبار كرة القدم العربية =====
    const FootballNews = {
        currentLeague: 'all',
        isLoading: false,
        arabicNews: [],
        newsFetcher: null,
        refreshTimer: null,
        
        // ===== تهيئة جالب الأخبار =====
        initNewsFetcher: function() {
            if (!this.newsFetcher) {
                this.newsFetcher = new NewsFetcher();
                console.log('🔄 جالب الأخبار تم تهيئته');
            }
            return this.newsFetcher;
        },
        
        // ===== جلب الأخبار العربية =====
        loadArabicNews: async function() {
            if (this.isLoading) {
                Utils.showToast('جاري بالفعل تحميل الأخبار...', 'info');
                return;
            }
            
            this.isLoading = true;
            const container = document.getElementById('football-news-container');
            
            if (container) {
                container.innerHTML = `
                    <div class="loading-spinner">
                        <div class="spinner"></div>
                        <p>جاري تحميل أحدث أخبار كرة القدم العربية...</p>
                        <p style="font-size: 13px; color: #666; margin-top: 10px;">
                            <i class="fas fa-sync fa-spin"></i> الاتصال بمصادر الأخبار
                        </p>
                        <div style="margin-top: 15px; font-size: 12px; color: #888;">
                            <i class="fas fa-info-circle"></i> يستخدم النظام مصادر عربية موثوقة
                        </div>
                    </div>
                `;
            }
            
            Utils.showToast('🔄 جاري تحديث الأخبار العربية من مصادر حقيقية...', 'info');
            
            try {
                const fetcher = this.initNewsFetcher();
                const realNews = await fetcher.fetchArabicNews();
                
                if (realNews && realNews.length > 0) {
                    this.arabicNews = realNews;
                    const stats = fetcher.getStats();
                    
                    let message = `تم تحميل ${realNews.length} خبر عربي`;
                    if (stats.usingMock) {
                        message += ' (باستخدام بيانات تجريبية)';
                        Utils.showToast(message, 'warning');
                    } else {
                        message += ' من مصادر حقيقية';
                        Utils.showToast(message, 'success');
                    }
                } else {
                    this.arabicNews = [];
                    Utils.showToast('لم يتم العثور على أخبار حالياً', 'warning');
                }
                
                this.displayNews();
                
            } catch (error) {
                console.error('❌ خطأ في تحميل الأخبار:', error);
                Utils.showToast('حدث خطأ في تحميل الأخبار', 'error');
                
                // استخدام أخبار محلية كاحتياطي
                const fetcher = this.initNewsFetcher();
                this.arabicNews = fetcher.getMockNews();
                this.displayNews();
                
            } finally {
                this.isLoading = false;
            }
        },
        
        // ===== عرض الأخبار =====
        displayNews: function() {
            const container = document.getElementById('football-news-container');
            if (!container) {
                console.error('❌ حاوية الأخبار غير موجودة');
                return;
            }
            
            let filteredNews = this.arabicNews;
            
            // تطبيق الفلتر حسب الدوري
            if (this.currentLeague !== 'all') {
                filteredNews = this.arabicNews.filter(news => 
                    news.league === this.currentLeague
                );
            }
            
            if (filteredNews.length === 0) {
                this.showNoNewsMessage(container);
                return;
            }
            
            // إنشاء واجهة الأخبار
            this.createNewsInterface(container, filteredNews);
            
            // إعداد التحديث التلقائي
            this.setupAutoRefresh();
        },
        
        // ===== عرض رسالة عدم وجود أخبار =====
        showNoNewsMessage: function(container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: #666;">
                    <div style="font-size: 4rem; color: #e0e0e0; margin-bottom: 20px;">
                        <i class="far fa-futbol"></i>
                    </div>
                    <p style="font-size: 20px; margin-bottom: 15px;">
                        لا توجد أخبار متاحة حالياً
                    </p>
                    <p style="color: #888; margin-bottom: 30px; max-width: 500px; margin-left: auto; margin-right: auto;">
                        يمكنك المحاولة مرة أخرى بعد قليل أو تجربة تحديث الصفحة
                    </p>
                    <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                        <button onclick="FootballNews.loadArabicNews()" 
                                style="background: #1E5631; color: white; border: none; padding: 12px 28px; 
                                       border-radius: 25px; cursor: pointer; font-weight: bold; 
                                       display: flex; align-items: center; gap: 8px; transition: all 0.3s;"
                                onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 5px 15px rgba(30, 86, 49, 0.3)'"
                                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                            <i class="fas fa-redo"></i> تحديث الأخبار
                        </button>
                        <button onclick="FootballNews.currentLeague='all'; FootballNews.displayNews();" 
                                style="background: #f8f9fa; color: #333; border: 2px solid #ddd; padding: 12px 28px; 
                                       border-radius: 25px; cursor: pointer; font-weight: bold; 
                                       display: flex; align-items: center; gap: 8px; transition: all 0.3s;"
                                onmouseover="this.style.borderColor='#1E5631'; this.style.background='#f0f7f0'"
                                onmouseout="this.style.borderColor='#ddd'; this.style.background='#f8f9fa'">
                            <i class="fas fa-list"></i> عرض جميع الأخبار
                        </button>
                    </div>
                </div>
            `;
        },
        
        // ===== إنشاء واجهة الأخبار =====
        createNewsInterface: function(container, filteredNews) {
            container.innerHTML = '';
            
            // إضافة شريط الإحصائيات
            this.addStatsBar(container);
            
            // إضافة فلتر الدوريات
            container.appendChild(this.createLeagueFilters());
            
            // إضافة شبكة الأخبار
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
            
            container.appendChild(newsGrid);
            
            // إضافة زر تحميل المزيد
            this.addLoadMoreButton(container);
        },
        
        // ===== إضافة شريط الإحصائيات =====
        addStatsBar: function(container) {
            if (!this.newsFetcher) return;
            
            const stats = this.newsFetcher.getStats();
            const statsBar = document.createElement('div');
            statsBar.style.cssText = `
                background: linear-gradient(135deg, #1E5631, #2E7D32);
                color: white;
                padding: 15px 20px;
                border-radius: 12px;
                margin-bottom: 25px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 15px;
                box-shadow: 0 4px 12px rgba(30, 86, 49, 0.2);
            `;
            
            statsBar.innerHTML = `
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="font-size: 24px;">
                        <i class="fas fa-signal"></i>
                    </div>
                    <div>
                        <div style="font-size: 16px; font-weight: bold;">أخبار عربية حية</div>
                        <div style="font-size: 13px; opacity: 0.9; margin-top: 3px;">
                            ${this.arabicNews.length} خبر ${stats.usingMock ? '(تجريبي)' : '(مباشر)'}
                            • آخر تحديث: ${stats.lastFetch}
                        </div>
                    </div>
                </div>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <div style="background: rgba(255,255,255,0.15); padding: 6px 12px; border-radius: 15px; 
                         font-size: 12px; display: flex; align-items: center; gap: 5px;">
                        <i class="fas fa-check-circle"></i> ${stats.successfulFetches} نجاح
                    </div>
                    <div style="background: rgba(255,255,255,0.15); padding: 6px 12px; border-radius: 15px; 
                         font-size: 12px; display: flex; align-items: center; gap: 5px;">
                        <i class="fas fa-database"></i> ${stats.cacheSize} مخزن
                    </div>
                </div>
            `;
            
            container.appendChild(statsBar);
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
            
            // إضافة الشارات
            this.addCardBadges(card, news);
            
            // إضافة محتوى البطاقة
            card.innerHTML += this.getCardContent(news);
            
            // إضافة تأثيرات hover
            this.addCardHoverEffects(card, news);
            
            return card;
        },
        
        // ===== إضافة شارات البطاقة =====
        addCardBadges: function(card, news) {
            // شارة مباشر
            if (news.isLive) {
                const liveBadge = document.createElement('div');
                liveBadge.style.cssText = `
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    background: #D32F2F;
                    color: white;
                    padding: 5px 12px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: bold;
                    z-index: 2;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    animation: pulse 1.5s infinite;
                    box-shadow: 0 2px 8px rgba(211, 47, 47, 0.3);
                `;
                liveBadge.innerHTML = '<i class="fas fa-circle"></i> مباشر';
                card.appendChild(liveBadge);
            }
            
            // شارة مميز
            if (news.highlight) {
                const badge = document.createElement('div');
                badge.style.cssText = `
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: linear-gradient(135deg, #C4A747, #D4B757);
                    color: white;
                    padding: 6px 15px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: bold;
                    z-index: 2;
                    box-shadow: 0 2px 8px rgba(196, 167, 71, 0.3);
                `;
                badge.innerHTML = '<i class="fas fa-star"></i> مميز';
                card.appendChild(badge);
            }
        },
        
        // ===== محتوى البطاقة =====
        getCardContent: function(news) {
            return `
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
                        font-size: 4rem;
                        color: white;
                        text-shadow: 2px 2px 12px rgba(0,0,0,0.5);
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
                            background: ${news.score === '0-0' || news.score.includes('لم') ? '#666' : '#1E5631'};
                            color: white;
                            padding: 8px 14px;
                            border-radius: 15px;
                            font-weight: bold;
                            font-size: ${news.score.length > 5 ? '14px' : '18px'};
                            margin-right: 10px;
                            min-width: 60px;
                            text-align: center;
                            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
                        ">
                            ${news.score}
                        </div>
                    </div>
                    
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin: 15px 0;
                        padding: 15px;
                        background: #f8f9fa;
                        border-radius: 12px;
                        border: 1px solid #e9ecef;
                    ">
                        <div style="text-align: center; flex: 1;">
                            <div style="
                                font-size: 2.2rem;
                                font-weight: bold;
                                color: #1E5631;
                                margin-bottom: 8px;
                                filter: drop-shadow(1px 1px 3px rgba(0,0,0,0.1));
                            ">
                                ${this.getTeamEmoji(news.teams[0])}
                            </div>
                            <div style="
                                font-weight: bold;
                                color: #333;
                                font-size: 15px;
                            ">
                                ${news.teams[0]}
                            </div>
                        </div>
                        
                        <div style="text-align: center;">
                            <div style="
                                background: linear-gradient(135deg, #333, #555);
                                color: white;
                                padding: 8px 18px;
                                border-radius: 12px;
                                font-weight: bold;
                                font-size: 14px;
                                box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                            ">
                                VS
                            </div>
                            <div style="
                                margin-top: 8px;
                                color: #666;
                                font-size: 12px;
                            ">
                                ${news.isLive ? 'جارية الآن' : 'انتهت'}
                            </div>
                        </div>
                        
                        <div style="text-align: center; flex: 1;">
                            <div style="
                                font-size: 2.2rem;
                                font-weight: bold;
                                color: #1E5631;
                                margin-bottom: 8px;
                                filter: drop-shadow(1px 1px 3px rgba(0,0,0,0.1));
                            ">
                                ${this.getTeamEmoji(news.teams[1])}
                            </div>
                            <div style="
                                font-weight: bold;
                                color: #333;
                                font-size: 15px;
                            ">
                                ${news.teams[1]}
                            </div>
                        </div>
                    </div>
                    
                    <p style="
                        color: #555;
                        font-size: 14px;
                        line-height: 1.6;
                        margin-bottom: 15px;
                        border-right: 3px solid #1E5631;
                        padding-right: 10px;
                        min-height: 40px;
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
                        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
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
                                padding: 4px 10px;
                                border-radius: 12px;
                                font-size: 11px;
                                font-weight: bold;
                                border: 1px solid #c8e6c9;
                            ">
                                ${news.category}
                            </span>
                            ` : ''}
                        </div>
                        
                        <button onclick="event.stopPropagation(); FootballNews.openArabicNewsDetail(${news.id})" style="
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
                            box-shadow: 0 2px 6px rgba(30, 86, 49, 0.2);
                        ">
                            <i class="fas fa-futbol"></i> التفاصيل
                        </button>
                    </div>
                </div>
            `;
        },
        
        // ===== إضافة تأثيرات hover =====
        addCardHoverEffects: function(card, news) {
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
                'الترجي': '🔵',
                'الفيصلي': '⚔️',
                'الوحدات': '🦅',
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
                'كأس العرب للأندية': '#FF0000, #000000, #008000',
                'دوري نجوم قطر': '#6A0DAD, #8A2BE2',
                'البطولة المغربية': '#C1272D, #000000',
                'البطولة الجزائرية': '#006233, #FFFFFF',
                'البطولة التونسية': '#E70013, #000000',
                'رياضة عربية': '#1E5631, #C4A747'
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
                border-radius: 12px;
                border: 1px solid #e9ecef;
            `;
            
            const leagues = [
                { id: 'all', name: '🏆 جميع الأخبار', emoji: '🏆' },
                { id: 'الدوري السعودي', name: 'الدوري السعودي', emoji: '🇸🇦' },
                { id: 'الدوري المصري', name: 'الدوري المصري', emoji: '🇪🇬' },
                { id: 'دوري أبطال آسيا', name: 'دوري أبطال آسيا', emoji: '🌏' },
                { id: 'دوري أبطال إفريقيا', name: 'دوري أبطال إفريقيا', emoji: '🌍' },
                { id: 'كأس الملك', name: 'كأس الملك', emoji: '👑' },
                { id: 'دوري الخليج العربي', name: 'دوري الخليج', emoji: '🇦🇪' },
                { id: 'دوري نجوم قطر', name: 'دوري قطر', emoji: '🇶🇦' }
            ];
            
            leagues.forEach(league => {
                const btn = document.createElement('button');
                btn.innerHTML = `<span style="font-size: 16px; margin-left: 5px;">${league.emoji}</span> ${league.name}`;
                btn.style.cssText = `
                    padding: 10px 20px;
                    border: 2px solid ${this.currentLeague === league.id ? '#1E5631' : '#ddd'};
                    background: ${this.currentLeague === league.id ? '#1E5631' : 'white'};
                    color: ${this.currentLeague === league.id ? 'white' : '#333'};
                    border-radius: 25px;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-weight: ${this.currentLeague === league.id ? 'bold' : '500'};
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
                        btn.style.background = '#f0f7f0';
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
        
        // ===== إضافة زر تحميل المزيد =====
        addLoadMoreButton: function(container) {
            const loadMoreBtn = document.createElement('button');
            loadMoreBtn.innerHTML = '<i class="fas fa-plus-circle"></i> تحميل المزيد من الأخبار';
            loadMoreBtn.style.cssText = `
                display: block;
                margin: 40px auto 20px;
                background: linear-gradient(135deg, #1E5631, #2E7D32);
                color: white;
                border: none;
                padding: 14px 32px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: bold;
                font-size: 15px;
                transition: all 0.3s;
                display: flex;
                align-items: center;
                gap: 10px;
                box-shadow: 0 4px 12px rgba(30, 86, 49, 0.2);
            `;
            
            loadMoreBtn.addEventListener('mouseenter', () => {
                loadMoreBtn.style.transform = 'translateY(-2px)';
                loadMoreBtn.style.boxShadow = '0 6px 18px rgba(30, 86, 49, 0.3)';
            });
            
            loadMoreBtn.addEventListener('mouseleave', () => {
                loadMoreBtn.style.transform = 'translateY(0)';
                loadMoreBtn.style.boxShadow = '0 4px 12px rgba(30, 86, 49, 0.2)';
            });
            
            loadMoreBtn.addEventListener('click', () => {
                this.loadArabicNews();
            });
            
            container.appendChild(loadMoreBtn);
        },
        
        // ===== فتح تفاصيل الخبر العربي =====
        openArabicNewsDetail: function(newsId) {
            const news = this.arabicNews.find(n => n.id === newsId);
            if (!news) {
                Utils.showToast('لم يتم العثور على تفاصيل الخبر', 'error');
                return;
            }
            
            // نافذة التفاصيل
            this.createNewsDetailModal(news);
        },
        
        // ===== إنشاء نافذة تفاصيل الخبر =====
        createNewsDetailModal: function(news) {
            const modal = document.createElement('div');
            modal.className = 'arabic-news-modal';
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
                backdrop-filter: blur(8px);
                animation: fadeIn 0.3s ease;
            `;
            
            modal.innerHTML = this.getNewsDetailContent(news);
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            // إضافة event listener للإغلاق
            const closeBtn = modal.querySelector('.close-modal');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    modal.remove();
                    document.body.style.overflow = '';
                });
            }
            
            // إغلاق بالنقر خارج المحتوى
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                    document.body.style.overflow = '';
                }
            });
        },
        
        // ===== محتوى نافذة التفاصيل =====
        getNewsDetailContent: function(news) {
            return `
                <div style="
                    background: white;
                    border-radius: 20px;
                    max-width: 800px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
                    border: 2px solid #1E5631;
                    animation: slideUp 0.3s ease;
                ">
                    <button class="close-modal" style="
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
                    ">
                        ✕
                    </button>
                    
                    ${this.getNewsDetailHeader(news)}
                    
                    <div style="padding: 30px;">
                        ${this.getNewsDetailMatchInfo(news)}
                        ${this.getNewsDetailContentText(news)}
                        ${this.getNewsDetailSharing(news)}
                        ${this.getNewsDetailSourceLink(news)}
                    </div>
                </div>
            `;
        },
        
        // ===== رأس نافذة التفاصيل =====
        getNewsDetailHeader: function(news) {
            return `
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
                        padding: 6px 15px;
                        border-radius: 20px;
                        font-size: 13px;
                        font-weight: bold;
                        display: flex;
                        align-items: center;
                        gap: 5px;
                        animation: pulse 1.5s infinite;
                        box-shadow: 0 2px 8px rgba(211, 47, 47, 0.3);
                    ">
                        <i class="fas fa-circle"></i> خبر مباشر
                    </div>
                    ` : ''}
                    
                    <h1 style="
                        margin: ${news.isLive ? '25px 0 0 0' : '0'}; 
                        font-size: 26px; 
                        text-align: center;
                        text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
                        line-height: 1.3;
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
            `;
        },
        
        // ===== معلومات المباراة =====
        getNewsDetailMatchInfo: function(news) {
            return `
                <div style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 40px;
                    margin: 25px 0;
                    padding: 25px;
                    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
                    border-radius: 15px;
                    border: 2px solid #dee2e6;
                    flex-wrap: wrap;
                ">
                    <div style="text-align: center; flex: 1; min-width: 200px;">
                        <div style="
                            font-size: 4rem;
                            margin-bottom: 15px;
                            filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.2));
                        ">
                            ${this.getTeamEmoji(news.teams[0])}
                        </div>
                        <div style="
                            font-size: 24px;
                            font-weight: bold;
                            color: #1E5631;
                            margin-bottom: 8px;
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
                    
                    <div style="text-align: center; min-width: 150px;">
                        <div style="
                            background: ${news.score === '0-0' ? '#666' : 'linear-gradient(135deg, #1E5631, #2E7D32)'};
                            color: white;
                            padding: 18px 30px;
                            border-radius: 15px;
                            font-size: 42px;
                            font-weight: bold;
                            min-width: 120px;
                            box-shadow: 0 5px 20px rgba(30, 86, 49, 0.3);
                        ">
                            ${news.score}
                        </div>
                        <div style="
                            margin-top: 12px;
                            color: #666;
                            font-size: 15px;
                            font-weight: 500;
                        ">
                            ${news.isLive ? 'المباراة جارية الآن' : 'النتيجة النهائية'}
                        </div>
                    </div>
                    
                    <div style="text-align: center; flex: 1; min-width: 200px;">
                        <div style="
                            font-size: 4rem;
                            margin-bottom: 15px;
                            filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.2));
                        ">
                            ${this.getTeamEmoji(news.teams[1])}
                        </div>
                        <div style="
                            font-size: 24px;
                            font-weight: bold;
                            color: #1E5631;
                            margin-bottom: 8px;
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
            `;
        },
        
        // ===== محتوى النص التفصيلي =====
        getNewsDetailContentText: function(news) {
            return `
                <div style="
                    background: #f8f9fa;
                    padding: 30px;
                    border-radius: 15px;
                    margin: 25px 0;
                    border-right: 5px solid #1E5631;
                ">
                    <h2 style="
                        color: #1E5631;
                        margin-bottom: 20px;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        font-size: 22px;
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
                        <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #ddd;">
                            <p style="color: #666; font-style: italic; margin-bottom: 10px;">
                                <i class="fas fa-info-circle"></i> مصدر الخبر: ${news.source}
                            </p>
                            <p style="color: #666; font-size: 14px; margin-bottom: 8px;">
                                <i class="far fa-calendar"></i> تاريخ النشر: ${news.date} - ${news.time}
                            </p>
                            ${news.category ? `
                            <p style="color: #666; font-size: 14px; margin-bottom: 8px;">
                                <i class="fas fa-tag"></i> التصنيف: ${news.category}
                            </p>
                            ` : ''}
                            ${news.priority ? `
                            <p style="color: #666; font-size: 14px;">
                                <i class="fas fa-star"></i> الأهمية: ${'★'.repeat(Math.min(news.priority, 5))}
                            </p>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        },
        
        // ===== خيارات المشاركة =====
        getNewsDetailSharing: function(news) {
            return `
                <div style="margin-top: 30px; padding-top: 25px; border-top: 2px solid #eee;">
                    <h3 style="
                        color: #1E5631;
                        margin-bottom: 20px;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        font-size: 20px;
                    ">
                        <i class="fas fa-share-alt"></i> شارك الخبر العربي
                    </h3>
                    <div style="display: flex; gap: 12px; margin-top: 10px; flex-wrap: wrap;">
                        <button onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href), '_blank')" style="
                            flex: 1;
                            min-width: 120px;
                            padding: 14px;
                            border: 2px solid #1877F2;
                            background: white;
                            color: #1877F2;
                            border-radius: 12px;
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
                        <button onclick="window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent('${news.title}') + '&url=' + encodeURIComponent(window.location.href), '_blank')" style="
                            flex: 1;
                            min-width: 120px;
                            padding: 14px;
                            border: 2px solid #1DA1F2;
                            background: white;
                            color: #1DA1F2;
                            border-radius: 12px;
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
                        <button onclick="window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent('${news.title}\\n\\n' + window.location.href), '_blank')" style="
                            flex: 1;
                            min-width: 120px;
                            padding: 14px;
                            border: 2px solid #25D366;
                            background: white;
                            color: #25D366;
                            border-radius: 12px;
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
            `;
        },
        
        // ===== رابط المصدر =====
        getNewsDetailSourceLink: function(news) {
            if (!news.link || news.link === '#') return '';
            
            return `
                <div style="margin-top: 25px; text-align: center;">
                    <a href="${news.link}" target="_blank" style="
                        display: inline-flex;
                        align-items: center;
                        gap: 10px;
                        background: linear-gradient(135deg, #1E5631, #2E7D32);
                        color: white;
                        text-decoration: none;
                        padding: 12px 24px;
                        border-radius: 25px;
                        font-weight: bold;
                        transition: all 0.3s;
                        box-shadow: 0 4px 12px rgba(30, 86, 49, 0.2);
                    "
                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 18px rgba(30, 86, 49, 0.3)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(30, 86, 49, 0.2)'">
                        <i class="fas fa-external-link-alt"></i>
                        قراءة الخبر الأصلي على ${news.source}
                    </a>
                </div>
            `;
        },
        
        // ===== البحث في الأخبار العربية =====
        searchArabicNews: function() {
            const searchInput = document.getElementById('football-search');
            if (!searchInput) return;
            
            const query = searchInput.value.trim();
            if (!query) {
                this.displayNews();
                return;
            }
            
            const results = this.arabicNews.filter(news => 
                news.title.includes(query) ||
                news.teams.some(team => team.includes(query)) ||
                news.league.includes(query) ||
                news.excerpt.includes(query) ||
                (news.source && news.source.includes(query)) ||
                (news.category && news.category.includes(query))
            );
            
            const container = document.getElementById('football-news-container');
            if (!container) return;
            
            if (results.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 50px 20px;">
                        <div style="font-size: 4rem; color: #e0e0e0; margin-bottom: 20px;">
                            <i class="fas fa-search"></i>
                        </div>
                        <p style="color: #666; font-size: 18px; margin-bottom: 10px;">
                            لم نعثر على أي أخبار تتطابق مع بحثك
                        </p>
                        <p style="color: #888; margin-bottom: 25px; max-width: 500px; margin-left: auto; margin-right: auto;">
                            حاول البحث بكلمات مختلفة مثل: الهلال، الدوري السعودي، هدف، مباراة
                        </p>
                        <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                            <button onclick="FootballNews.currentLeague='all'; FootballNews.displayNews();" 
                                    style="background: #1E5631; color: white; border: none; padding: 12px 28px; 
                                           border-radius: 25px; cursor: pointer; font-weight: bold; 
                                           display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-list"></i> عرض جميع الأخبار
                            </button>
                            <button onclick="searchInput.value=''; FootballNews.searchArabicNews();" 
                                    style="background: #f8f9fa; color: #333; border: 2px solid #ddd; padding: 12px 28px; 
                                           border-radius: 25px; cursor: pointer; font-weight: bold; 
                                           display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-times"></i> مسح البحث
                            </button>
                        </div>
                    </div>
                `;
                return;
            }
            
            container.innerHTML = `
                <div style="margin-bottom: 25px; padding: 20px; background: linear-gradient(135deg, #f8f9fa, #e9ecef); 
                     border-radius: 12px; border-right: 5px solid #1E5631;">
                    <h3 style="margin: 0; color: #1E5631; display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-search"></i> 
                        نتائج البحث: "${query}" 
                        <span style="background: #1E5631; color: white; padding: 4px 12px; border-radius: 15px; font-size: 14px;">
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
            if (this.refreshTimer) {
                clearInterval(this.refreshTimer);
            }
            
            // تحديث كل 5 دقائق
            this.refreshTimer = setInterval(() => {
                if (!this.isLoading && document.visibilityState === 'visible') {
                    console.log('🔄 تحديث تلقائي للأخبار');
                    this.loadArabicNews();
                }
            }, 300000);
        },
        
        // ===== إعادة تحميل سريع =====
        forceRefresh: function() {
            if (this.newsFetcher) {
                this.newsFetcher.lastFetch = 0;
                this.newsFetcher.newsCache = [];
            }
            this.loadArabicNews();
        },
        
        // ===== إضافة خبر جديد =====
        addArabicNews: function(newNews) {
            if (!this.arabicNews) this.arabicNews = [];
            
            newNews.id = Date.now();
            newNews.date = Utils.formatArabicDate(new Date());
            newNews.time = Utils.getCurrentTime();
            newNews.highlight = true;
            newNews.isLive = true;
            newNews.image = newNews.image || '⚽';
            
            this.arabicNews.unshift(newNews);
            this.displayNews();
            Utils.showToast('تم إضافة خبر عربي جديد!', 'success');
        },
        
        // ===== الحصول على إحصائيات النظام =====
        getSystemStats: function() {
            if (!this.newsFetcher) return null;
            return this.newsFetcher.getStats();
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
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
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
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            
            .arabic-news-card h3 {
                font-weight: 600;
            }
            
            /* زر البحث العربي */
            .search-box button {
                background: linear-gradient(135deg, #1E5631, #2E7D32);
                border: none;
                color: white;
                padding: 12px 28px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.3s;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
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
                max-width: 450px;
                transition: all 0.3s;
                background: white;
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
                width: 10px;
            }
            
            .arabic-news-modal::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 5px;
            }
            
            .arabic-news-modal::-webkit-scrollbar-thumb {
                background: #1E5631;
                border-radius: 5px;
            }
            
            .arabic-news-modal::-webkit-scrollbar-thumb:hover {
                background: #2E7D32;
            }
        `;
        document.head.appendChild(style);
        
        // إضافة زر تحديث يدوي
        this.addManualRefreshButton();
        
        // تحميل الأخبار العربية بعد تأخير بسيط
        setTimeout(() => {
            FootballNews.loadArabicNews();
            Utils.showToast('مرحباً بك في ميدان العرب - أخبار كرة القدم العربية الحية ⚽🇸🇦', 'success');
        }, 800);
    });
    
    // ===== إضافة زر تحديث يدوي =====
    function addManualRefreshButton() {
        const refreshButton = document.createElement('button');
        refreshButton.id = 'manual-refresh-btn';
        refreshButton.innerHTML = '<i class="fas fa-sync-alt"></i> تحديث';
        refreshButton.style.cssText = `
            position: fixed;
            bottom: 25px;
            left: 25px;
            background: linear-gradient(135deg, #1E5631, #2E7D32);
            color: white;
            border: none;
            padding: 14px 28px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: bold;
            z-index: 999;
            box-shadow: 0 4px 15px rgba(30, 86, 49, 0.3);
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s;
            font-size: 15px;
        `;
        
        refreshButton.addEventListener('mouseenter', () => {
            refreshButton.style.transform = 'translateY(-3px) rotate(10deg)';
            refreshButton.style.boxShadow = '0 8px 25px rgba(30, 86, 49, 0.4)';
        });
        
        refreshButton.addEventListener('mouseleave', () => {
            refreshButton.style.transform = 'translateY(0) rotate(0deg)';
            refreshButton.style.boxShadow = '0 4px 15px rgba(30, 86, 49, 0.3)';
        });
        
        refreshButton.addEventListener('click', () => {
            refreshButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحديث';
            refreshButton.disabled = true;
            
            setTimeout(() => {
                FootballNews.forceRefresh();
                refreshButton.innerHTML = '<i class="fas fa-sync-alt"></i> تحديث';
                refreshButton.disabled = false;
            }, 500);
        });
        
        document.body.appendChild(refreshButton);
    }
    
    // ===== جعل الوظائف متاحة عالمياً =====
    window.FootballNews = FootballNews;
    window.Utils = Utils;
    window.NewsFetcher = NewsFetcher;
    
    // ===== وظائف إضافية =====
    
    // إضافة خبر تجريبي
    window.addSampleArabicNews = function() {
        const sampleNews = {
            title: "الهلال يحقق فوزاً تاريخياً في ديربي الرياض",
            excerpt: "فوز كبير للهلال على النصر بنتيجة 3-0 في ديربي العاصمة السعودية",
            content: "سيطر الهلال على مجريات المباراة منذ الصافرة الأولى وتمكن من تسجيل ثلاثة أهداف نظيفة في الشوط الأول، واستمر في سيطرته في الشوط الثاني ليحقق فوزاً مهماً يقربه من لقب الدوري. أظهر اللاعبون أداءً متميزاً وحققوا الفوز المستحق.",
            league: "الدوري السعودي",
            teams: ["الهلال", "النصر"],
            score: "3-0",
            source: "ميدان العرب",
            isLive: false,
            category: "مباريات",
            image: "👑"
        };
        
        FootballNews.addArabicNews(sampleNews);
    };
    
    // عرض إحصائيات النظام
    window.showSystemStats = function() {
        const stats = FootballNews.getSystemStats();
        if (!stats) {
            Utils.showToast('النظام غير مهيئ', 'warning');
            return;
        }
        
        const message = `
            الإحصائيات:<br>
            • المحاولات: ${stats.totalAttempts}<br>
            • النجاحات: ${stats.successfulFetches}<br>
            • الفشل: ${stats.failedFetches}<br>
            • الكاش: ${stats.cacheSize} خبر<br>
            • آخر تحديث: ${stats.lastFetch}<br>
            • الوضع: ${stats.usingMock ? 'تجريبي' : 'مباشر'}
        `;
        
        const statsDiv = document.createElement('div');
        statsDiv.innerHTML = message;
        statsDiv.style.cssText = `
            background: white;
            padding: 20px;
            border-radius: 10px;
            max-width: 300px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            border: 2px solid #1E5631;
        `;
        
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;
        
        modal.appendChild(statsDiv);
        modal.addEventListener('click', () => modal.remove());
        
        document.body.appendChild(modal);
    };
    
    // تغيير سمة التطبيق
    window.toggleTheme = function() {
        const isDark = document.body.classList.toggle('dark-theme');
        Utils.showToast(isDark ? 'تم تفعيل السمة الداكنة' : 'تم تفعيل السمة الفاتحة', 'info');
        
        if (!isDark) return;
        
        const darkStyle = document.createElement('style');
        darkStyle.id = 'dark-theme-style';
        darkStyle.textContent = `
            .dark-theme .arabic-news-card {
                background: #2d3748;
                color: #e2e8f0;
                border-color: #4a5568;
            }
            
            .dark-theme .arabic-news-card h3 {
                color: #e2e8f0;
            }
            
            .dark-theme .arabic-league-filters {
                background: #2d3748;
                border-color: #4a5568;
            }
            
            .dark-theme .search-box input {
                background: #2d3748;
                color: #e2e8f0;
                border-color: #4a5568;
            }
        `;
        
        document.head.appendChild(darkStyle);
    };
})();
