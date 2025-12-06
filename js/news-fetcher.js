/**
 * news-fetcher.js
 * جلب الأخبار الحية من RSS عربي بدون الحاجة لمفتاح API
 */

const NewsFetcher = {
    rssUrl: 'https://www.yallakora.com/rss/all-news.xml', // رابط RSS عربي حي
    updateIntervalMinutes: 5, // التحديث كل 5 دقائق

    // أخبار fallback في حال فشل جلب RSS
    fallbackNews: [
        {
            id: 1,
            title: 'فوز كبير للنادي الأهلي في دوري الأبطال',
            description: 'تغلب النادي الأهلي على منافسه بنتيجة 3-0 في إطار منافسات دوري أبطال آسيا.',
            category: 'دوري الأبطال',
            date: 'ديسمبر 5, 2024',
            icon: '🏆',
            link: '#'
        },
        {
            id: 2,
            title: 'مفاجأة في الدوري السعودي',
            description: 'فوز غير متوقع لفريق الخليج على أحد الكبار في مباراة مثيرة.',
            category: 'الدوري السعودي',
            date: 'ديسمبر 4, 2024',
            icon: '🌟',
            link: '#'
        }
    ],

    /**
     * جلب RSS وتحويله إلى JSON باستخدام rss2json.com
     */
    fetchRSS: async function(url) {
        try {
            const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
            const data = await res.json();

            if (!data.items) throw new Error('لا توجد عناصر في RSS');

            return data.items.map((item, index) => ({
                id: index + 1,
                title: item.title,
                description: item.description || '',
                category: item.categories.join(', ') || 'عام',
                date: new Date(item.pubDate).toLocaleDateString('ar-EG', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                icon: '📰',
                link: item.link || '#'
            }));
        } catch (err) {
            console.error('فشل جلب الأخبار من RSS:', err);
            return [];
        }
    },

    /**
     * تحديث الأخبار في الموقع
     */
    updateNews: async function() {
        const liveNews = await this.fetchRSS(this.rssUrl);

        if (liveNews.length > 0) {
            NewsManager.news = liveNews;
        } else {
            console.warn('تم استخدام الأخبار fallback الثابتة');
            NewsManager.news = this.fallbackNews;
        }

        NewsManager.displayNews();
    },

    /**
     * بدء التحديث الدوري
     */
    startAutoUpdate: function() {
        this.updateNews(); // تحديث فوري عند التحميل
        setInterval(() => {
            console.log('🔄 تحديث الأخبار تلقائيًا...');
            this.updateNews();
        }, this.updateIntervalMinutes * 60 * 1000);
    }
};

// ===== استدعاء التحديث عند تحميل الصفحة =====
document.addEventListener('DOMContentLoaded', () => {
    NewsFetcher.startAutoUpdate();
});
