/**  
 * ميدان العرب - ملف كرة القدم النهائي  
 * أخبار + مباريات + جدول + إحصائيات  
 * بدون مفتاح API  
 * الإصدار: 2.0  
 */

(function () {
    'use strict';

    console.log("⚽ ميدان العرب – النظام الجديد بدون مفتاح جاهز!");

    // ================================
    //        0) أدوات مساعدة
    // ================================

    const Utils = {
        toast(msg) {
            document.querySelectorAll('.toast').forEach(t => t.remove());
            const div = document.createElement("div");
            div.className = "toast";
            div.textContent = msg;
            div.style.cssText = `
                position:fixed;top:20px;right:20px;
                background:#1E5631;color:white;padding:12px 20px;
                border-radius:8px;z-index:9999;
            `;
            document.body.appendChild(div);
            setTimeout(() => div.remove(), 3000);
        }
    };

    // ==========================================================
    //     1) 🔥 جلب أخبار حقيقية بدون مفتاح – عبر RSS
    // ==========================================================

    async function fetchRealNews() {
        const rssURL = "https://api.rss2json.com/v1/api.json?rss_url=https://www.aljazeera.net/sports/rss";

        try {
            const res = await fetch(rssURL);
            const data = await res.json();

            return data.items.map((item, i) => ({
                id: Date.now() + i,
                title: item.title,
                excerpt: item.description,
                content: item.content,
                image: item.thumbnail
                    ? `<img src="${item.thumbnail}" style="width:100%;border-radius:12px;">`
                    : "كرة القدم",
                date: item.pubDate.split(" ")[0],
                time: "",
                league: "أخبار رياضية",
                score: "",
                teams: [],
            }));
        } catch {
            return [];
        }
    }

    // ==========================================================
    //  2) 🔥 جلب مباريات اليوم بدون مفتاح – LiveScore JSON
    // ==========================================================

    async function getTodayMatches() {
        const d = new Date();
        const date = d.toISOString().split("T")[0].replace(/-/g, "");

        const url = `https://prod-public-api.livescore.com/v1/api/app/date/soccer/${date}`;

        try {
            const res = await fetch(url);
            const data = await res.json();

            return data.Stages?.flatMap(stage =>
                stage.Events?.map(match => ({
                    league: stage.CompName,
                    home: match.T1[0].Nm,
                    away: match.T2[0].Nm,
                    score: `${match.Tr1 ?? 0} - ${match.Tr2 ?? 0}`,
                    time: match.Eps,
                }))
            ) || [];

        } catch {
            return [];
        }
    }

    // ==========================================================
    //   3) 🔥 جلب جدول الدوري بدون مفتاح – LiveScore
    // ==========================================================

    async function getLeagueTable() {
        const url =
            "https://prod-public-api.livescore.com/v1/api/app/stage/soccer/england/premier-league/season/2024";

        try {
            const res = await fetch(url);
            const data = await res.json();

            return data.LeagueTable?.L?.[0]?.Tables?.[0]?.team || [];

        } catch {
            return [];
        }
    }

    // ==========================================================
    //   4) ⚽ نظام الأخبار + المباريات + الجدول – الواجهة
    // ==========================================================

    const FootballNews = {
        newsCache: [],
        matchCache: [],
        tableCache: [],

        async init() {
            this.displayNews();
            this.displayMatches();
            this.displayTable();
        },

        // ==================== الأخبار ======================
        async displayNews() {
            const box = document.getElementById("football-news-container");
            if (!box) return;

            box.innerHTML = `<div class="loader"></div>`;

            if (this.newsCache.length === 0) {
                this.newsCache = await fetchRealNews();
            }

            box.innerHTML = "";

            this.newsCache.forEach(n => {
                const card = document.createElement("div");
                card.className = "news-card";
                card.style.cssText = `
                    background:#fff;border-radius:16px;overflow:hidden;
                    box-shadow:0 4px 10px rgba(0,0,0,0.1);cursor:pointer;
                `;
                card.innerHTML = `
                    <div>${n.image}</div>
                    <div style="padding:18px;">
                        <h3>${n.title}</h3>
                        <p>${n.excerpt}</p>
                        <small>${n.date}</small>
                    </div>
                `;
                card.onclick = () => this.openNewsDetail(n);
                box.appendChild(card);
            });
        },

        openNewsDetail(n) {
            const modal = document.createElement("div");
            modal.style.cssText = `
                position:fixed;top:0;left:0;width:100%;height:100%;
                background:rgba(0,0,0,0.7);display:flex;
                justify-content:center;align-items:center;
                padding:20px;z-index:9999;
            `;

            modal.innerHTML = `
                <div style="
                    background:white;border-radius:16px;
                    max-width:800px;width:100%;overflow:auto;
                    max-height:90vh;position:relative;padding:25px;
                ">
                    <button onclick="this.parentElement.parentElement.remove()"
                        style="position:absolute;top:10px;right:10px;
                        background:#D32F2F;color:#fff;border:none;
                        width:40px;height:40px;border-radius:50%;
                        cursor:pointer;">X</button>

                    <h1>${n.title}</h1>
                    <div style="margin:10px 0;color:#777">${n.date}</div>
                    ${n.image}
                    <p style="margin-top:15px">${n.content}</p>
                </div>
            `;
            document.body.appendChild(modal);
        },

        // ==================== مباريات اليوم ======================
        async displayMatches() {
            const box = document.getElementById("today-matches");
            if (!box) return;

            box.innerHTML = `<div class="loader"></div>`;

            if (this.matchCache.length === 0) {
                this.matchCache = await getTodayMatches();
            }

            box.innerHTML = "";

            this.matchCache.forEach(m => {
                box.innerHTML += `
                    <div class="match-card" style="
                        background:white;padding:15px;margin-bottom:10px;
                        border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.1);
                    ">
                        <h4>${m.league}</h4>
                        <div>${m.home} vs ${m.away}</div>
                        <div>النتيجة: ${m.score}</div>
                        <small>الوقت: ${m.time}</small>
                    </div>`;
            });
        },

        // ==================== جدول الدوري ======================
        async displayTable() {
            const box = document.getElementById("league-table");
            if (!box) return;

            box.innerHTML = `<div class="loader"></div>`;

            if (this.tableCache.length === 0) {
                this.tableCache = await getLeagueTable();
            }

            box.innerHTML = "";

            this.tableCache.forEach(team => {
                box.innerHTML += `
                    <div class="team-row" style="
                        display:flex;justify-content:space-between;
                        padding:10px;background:white;margin-bottom:6px;
                        border-radius:8px;
                    ">
                        <span>${team.rnk}</span>
                        <span>${team.tname}</span>
                        <span>${team.pts}</span>
                    </div>
                `;
            });
        }
    };

    // ===========================================
    //   تشغيل النظام
    // ===========================================
    document.addEventListener("DOMContentLoaded", () => {
        FootballNews.init();
    });

    window.FootballNews = FootballNews;
})();

