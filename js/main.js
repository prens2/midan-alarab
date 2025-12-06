/**
 * ميدان العرب - أخبار كرة القدم العربية
 * @version 1.2 - مع إصلاح مشكلة التفاصيل
 */

(function() {
    'use strict';
    
    console.log('⚽ ميدان العرب - بدء التشغيل');
    
    // 📰 أخبار عربية مفصلة
    const ARABIC_NEWS = [
        {
            id: 1,
            title: "الهلال يتصدر الدوري السعودي",
            excerpt: "فوز كبير على النصر 3-1 في ديربي الرياض",
            content: "🔥 تفاصيل كاملة للمباراة: سجل الهلال ثلاث أهداف في الشوط الأول من خلال محمد القنون وسيباستيان جيوفينكو، بينما سجل النصر هدفه الوحيد في الدقيقة 75 عبر كريستيانو رونالدو.",
            image: "👑",
            date: "اليوم",
            time: "22:30",
            league: "الدوري السعودي",
            teams: ["الهلال", "النصر"],
            score: "3-1",
            source: "ميدان العرب",
            highlight: true
        },
        {
            id: 2,
            title: "الأهلي المصري يحتفظ بالصدارة",
            excerpt: "فوز ساحق 4-0 على المصري",
            content: "⚽ الأهلي سجل أربعة أهداف في المباراة: هدفين من محمد الشريف وهدف من بيرسي تاو وهدف من كاهربا، بينما فشل المصري في التسجيل رغم فرص متعددة.",
            image: "🦅",
            date: "أمس",
            time: "21:00",
            league: "الدوري المصري",
            teams: ["الأهلي المصري", "المصري"],
            score: "4-0",
            source: "ميدان العرب",
            highlight: true
        },
        {
            id: 3,
            title: "الاتحاد يتأهل لنصف نهائي كأس الملك",
            excerpt: "فوز صعب على الشباب 2-1",
            content: "🎯 الاتحاد تأهل بعد فوز مثالي: سجل الفرنسي كريم بنزيما الهدف الأول في الدقيقة 35، وسجل البرازيلي رومارينو الهدف الثاني في الدقيقة 60، بينما سجل الشباب هدف التخفيض في الوقت بدل الضائع.",
            image: "🦁",
            date: "الجمعة",
            time: "20:45",
            league: "كأس الملك",
            teams: ["الاتحاد", "الشباب"],
            score: "2-1",
            source: "ميدان العرب",
            highlight: false
        }
    ];

    // 🔍 دالة فتح تفاصيل الخبر
    function openNewsDetail(newsId) {
        console.log('🔍 محاولة فتح خبر رقم:', newsId);
        
        const news = ARABIC_NEWS.find(n => n.id === newsId);
        if (!news) {
            alert('❌ لم يتم العثور على الخبر');
            return;
        }
        
        // إنشاء نافذة التفاصيل
        const modal = document.createElement('div');
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
                border-radius: 15px;
                max-width: 600px;
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
                padding: 25px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            ">
                <button onclick="closeNewsDetail()" style="
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: #dc3545;
                    color: white;
                    border: none;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 18px;
                ">✕</button>
                
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="font-size: 3rem; margin-bottom: 10px;">${news.image}</div>
                    <h2 style="color: #1E5631; margin: 0 0 10px 0;">${news.title}</h2>
                    <div style="color: #666; margin-bottom: 15px;">
                        <span>${news.date} - ${news.time}</span> | 
                        <span style="background: #1E5631; color: white; padding: 3px 10px; border-radius: 15px; margin: 0 5px;">
                            ${news.league}
                        </span>
                    </div>
                </div>
                
                <div style="
                    background: #f8f9fa;
                    padding: 20px;
                    border-radius: 10px;
                    margin: 20px 0;
                    border-left: 4px solid #1E5631;
                ">
                    <div style="
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        margin-bottom: 20px;
                        text-align: center;
                    ">
                        <div>
                            <div style="font-size: 2rem;">${getTeamEmoji(news.teams[0])}</div>
                            <div style="font-weight: bold; color: #1E5631;">${news.teams[0]}</div>
                        </div>
                        
                        <div style="
                            background: #1E5631;
                            color: white;
                            padding: 10px 20px;
                            border-radius: 10px;
                            font-size: 2rem;
                            font-weight: bold;
                        ">
                            ${news.score}
                        </div>
                        
                        <div>
                            <div style="font-size: 2rem;">${getTeamEmoji(news.teams[1])}</div>
                            <div style="font-weight: bold; color: #1E5631;">${news.teams[1]}</div>
                        </div>
                    </div>
                    
                    <p style="color: #444; line-height: 1.6; margin: 0;">
                        ${news.content}
                    </p>
                </div>
                
                <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 20px;
                    padding-top: 15px;
                    border-top: 1px solid #eee;
                ">
                    <span style="color: #666; font-size: 14px;">
                        📰 المصدر: ${news.source}
                    </span>
                    <button onclick="shareNews(${news.id})" style="
                        background: #007bff;
                        color: white;
                        border: none;
                        padding: 8px 15px;
                        border-radius: 20px;
                        cursor: pointer;
                        font-size: 14px;
                    ">
                        📤 مشاركة
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        console.log('✅ تم فتح تفاصيل الخبر بنجاح');
    }

    // ❌ دالة إغلاق التفاصيل
    window.closeNewsDetail = function() {
        const modal = document.querySelector('div[style*="position: fixed; top: 0; left: 0;"]');
        if (modal) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
    };

    // 📤 دالة مشاركة الخبر
    window.shareNews = function(newsId) {
        const news = ARABIC_NEWS.find(n => n.id === newsId);
        if (news) {
            const text = `🔗 ${news.title}\n\n${window.location.href}`;
            if (navigator.share) {
                navigator.share({
                    title: news.title,
                    text: news.excerpt,
                    url: window.location.href
                });
            } else {
                navigator.clipboard.writeText(text)
                    .then(() => alert('✅ تم نسخ الخبر للحافظة'));
            }
        }
    };

    // 🏆 دالة إيموجيات الفرق
    function getTeamEmoji(team) {
        const emojis = {
            'الهلال': '👑',
            'النصر': '⚽',
            'الاتحاد': '🦁',
            'الأهلي المصري': '🦅',
            'المصري': '🏆',
            'الشباب': '⚡'
        };
        return emojis[team] || '⚽';
    }

    // 🏗️ بناء الواجهة
    function buildUI() {
        const container = document.getElementById('football-news-container');
        if (!container) {
            console.error('❌ لم يتم العثور على العنصر football-news-container');
            return;
        }
        
        container.innerHTML = `
            <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #1E5631, #2E7D32); 
                 color: white; border-radius: 10px; margin-bottom: 20px;">
                <h2 style="margin: 0; font-size: 24px;">🏆 أخبار كرة القدم العربية</h2>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">آخر تحديث: ${new Date().toLocaleDateString('ar-SA')}</p>
            </div>
            
            <div class="news-grid" style="display: grid; gap: 20px; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));">
                ${ARABIC_NEWS.map(news => `
                    <div class="news-card" style="
                        background: white;
                        border-radius: 12px;
                        padding: 20px;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                        border: 2px solid ${news.highlight ? '#C4A747' : '#e0e0e0'};
                        cursor: pointer;
                        transition: all 0.3s;
                    " onclick="openNewsDetail(${news.id})">
                        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                            <span style="font-size: 2.5rem;">${news.image}</span>
                            <div style="flex: 1;">
                                <h3 style="margin: 0; color: #333; font-size: 16px; line-height: 1.4;">${news.title}</h3>
                                <p style="margin: 8px 0; color: #666; font-size: 14px;">${news.excerpt}</p>
                            </div>
                        </div>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <span style="
                                    background: ${news.score === '0-0' ? '#666' : '#1E5631'};
                                    color: white;
                                    padding: 6px 12px;
                                    border-radius: 20px;
                                    font-weight: bold;
                                    font-size: 16px;
                                ">
                                    ${news.score}
                                </span>
                                <span style="color: #777; font-size: 12px;">
                                    ${news.teams[0]} vs ${news.teams[1]}
                                </span>
                            </div>
                            
                            <span style="color: #777; font-size: 12px;">
                                📅 ${news.date}
                            </span>
                        </div>
                        
                        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee; display: flex; justify-content: space-between;">
                            <span style="color: #666; font-size: 12px;">
                                ${news.league}
                            </span>
                            <span style="color: #1E5631; font-size: 12px; cursor: pointer;">
                                👁️ اضغط لعرض التفاصيل
                            </span>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
                <button onclick="loadMoreNews()" style="
                    background: linear-gradient(135deg, #1E5631, #2E7D32);
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 16px;
                    transition: all 0.3s;
                " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 5px 15px rgba(30, 86, 49, 0.3)'"
                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                    ⚽ تحميل المزيد من الأخبار
                </button>
            </div>
        `;
        
        console.log('✅ تم بناء الواجهة بنجاح');
    }

    // 🔄 تحميل المزيد
    window.loadMoreNews = function() {
        alert('🚀 قريباً: سيتم إضافة جلب أخبار حقيقية من مصادر RSS');
        console.log('ميزة جلب المزيد قيد التطوير...');
    };

    // جعل دالة فتح التفاصيل متاحة عالمياً
    window.openNewsDetail = openNewsDetail;

    // 🚀 بدء التطبيق
    document.addEventListener('DOMContentLoaded', function() {
        console.log('✅ التطبيق جاهز للعمل');
        setTimeout(buildUI, 300);
    });

})();
