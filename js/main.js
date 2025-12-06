/**
 * ميدان العرب - أخبار كرة القدم العربية
 * @version 1.0 - مختصر وسريع
 */

(function() {
    'use strict';
    
    console.log('⚽ ميدان العرب - بدء التشغيل');
    
    // 📰 أخبار عربية مختصرة
    const ARABIC_NEWS = [
        {
            id: 1,
            title: "الهلال يتصدر الدوري السعودي",
            excerpt: "فوز كبير على النصر 3-1 في ديربي الرياض",
            image: "👑",
            date: "اليوم",
            league: "الدوري السعودي",
            teams: ["الهلال", "النصر"],
            score: "3-1",
            source: "ميدان العرب"
        },
        {
            id: 2,
            title: "الأهلي المصري يحتفظ بالصدارة",
            excerpt: "فوز ساحق 4-0 على المصري",
            image: "🦅",
            date: "أمس",
            league: "الدوري المصري",
            teams: ["الأهلي المصري", "المصري"],
            score: "4-0",
            source: "ميدان العرب"
        },
        {
            id: 3,
            title: "الاتحاد يتأهل لنصف نهائي كأس الملك",
            excerpt: "فوز صعب على الشباب 2-1",
            image: "🦁",
            date: "الجمعة",
            league: "كأس الملك",
            teams: ["الاتحاد", "الشباب"],
            score: "2-1",
            source: "ميدان العرب"
        }
    ];

    // 🏗️ بناء الواجهة
    function buildUI() {
        const container = document.getElementById('football-news-container');
        if (!container) return;
        
        container.innerHTML = `
            <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 10px; margin-bottom: 20px;">
                <h2 style="color: #1E5631;">🏆 أخبار كرة القدم العربية</h2>
                <p>آخر تحديث: ${new Date().toLocaleDateString('ar-SA')}</p>
            </div>
            <div class="news-grid" style="display: grid; gap: 20px;">
                ${ARABIC_NEWS.map(news => `
                    <div class="news-card" style="
                        background: white;
                        border-radius: 10px;
                        padding: 15px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                        border-left: 4px solid #1E5631;
                    ">
                        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                            <span style="font-size: 2rem;">${news.image}</span>
                            <div>
                                <h3 style="margin: 0; color: #333; font-size: 16px;">${news.title}</h3>
                                <p style="margin: 5px 0; color: #666; font-size: 14px;">${news.excerpt}</p>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                            <span style="background: #1E5631; color: white; padding: 5px 10px; border-radius: 15px; font-size: 14px;">
                                ${news.score}
                            </span>
                            <span style="color: #777; font-size: 13px;">
                                ${news.date} | ${news.league}
                            </span>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div style="text-align: center; margin-top: 30px;">
                <button onclick="loadMoreNews()" style="
                    background: #1E5631;
                    color: white;
                    border: none;
                    padding: 12px 25px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: bold;
                ">
                    ⚽ تحميل المزيد
                </button>
            </div>
        `;
    }

    // 🔄 تحميل المزيد
    window.loadMoreNews = function() {
        alert('🚀 قريباً: جلب أخبار عربية حقيقية من مصادر RSS!');
        console.log('جاري تطوير ميزة جلب الأخبار الحقيقية...');
    };

    // 🚀 بدء التطبيق
    document.addEventListener('DOMContentLoaded', function() {
        console.log('✅ التطبيق جاهز');
        setTimeout(buildUI, 500);
    });

})();
