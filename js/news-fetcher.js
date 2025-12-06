/**
 * news-fetcher.js
 * جلب الأخبار الحية لموقع ميدان العرب
 */

const NewsFetcher = {

    // رابط RSS عربي حي (يمكن تغييره حسب الموقع المفضل)
    rssUrl: 'https://www.yallakora.com/rss/all-news.xml',

    // أخبار fallback ثابتة في حال فشل جلب الأخبار الحية
    fallbackNews: [
        {
            id: 1,
            title: 'فوز كبير للنادي الأهلي في دوري الأبطال',
            description: 'تغلب النادي الأهلي على منافسه بنتيجة 3-0 في إطار منافسات دوري أبطال آسيا.',
            category: 'دوري الأبطال',
            date: 'ديسمبر 5, 2024',
            icon: '🏆'
        },
        {
            id: 2,
            title: 'مفاجأة في الدوري السعودي',
            description: 'فوز غير متوقع لفريق الخليج على أحد الكبار في مباراة مثيرة.',
            category: 'الدوري السعودي',
            date: 'ديسمبر 4, 2024',
            icon: '🌟'
        }
    ],

    /**
     * جلب RSS وتحويله إلى JSON
     */
    fetchRSS: async function(url) {
        try {
            const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
            const data = await response.json();
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
                icon: '📰'
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
    }
};

// ===== استدعاء التحديث عند تحميل الصفحة =====
document.addEventListener('DOMContentLoaded', () => {
    NewsFetcher.updateNews();
});
