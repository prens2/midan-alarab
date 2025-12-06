/* ===============================
      الدوريات العربية بدون API
      ميدان العرب
================================*/

async function getArabLeague(leagueId) {
    const url = `https://www.fotmob.com/api/leagues?id=${leagueId}`;

    try {
        const res = await fetch(url);
        return await res.json();
    } catch (err) {
        console.log("Error:", err);
        return null;
    }
}

/* IDs الدوريات العربية (جاهزة) */
const arabLeagues = {
    "saudi": 307,        // الدوري السعودي روشن
    "egypt": 12,         // الدوري المصري الممتاز
    "qatar": 25,         // دوري نجوم قطر
    "uae": 309,          // دوري أدنوك الإماراتي
    "morocco": 308,      // الدوري المغربي
    "algeria": 105,      // الدوري الجزائري
    "jordan": 223,       // الدوري الأردني
    "tunis": 106,        // الدوري التونسي
    "iraq": 278,         // الدوري العراقي
    "kuwait": 281,       // الدوري الكويتي
    "bahrain": 280,      // الدوري البحريني
    "oman": 282          // الدوري العُماني
};

/* ===============================
        عرض جدول الدوري
================================*/

async function displayArabLeague(id) {
    const box = document.getElementById("league-table");

    if (!box) return;

    box.innerHTML = `<div class="loader"></div>`;

    const data = await getArabLeague(id);

    if (!data || !data.table) {
        box.innerHTML = "<p>لا يوجد بيانات متاحة حالياً.</p>";
        return;
    }

    box.innerHTML = `<h2>${data.details.name}</h2>`;

    data.table.all.forEach(team => {
        box.innerHTML += `
            <div class="team-row" style="
                display:flex;justify-content:space-between;
                background:white;padding:10px;border-radius:6px;
                margin-bottom:6px;box-shadow:0 2px 6px rgba(0,0,0,0.1);
            ">
                <span>${team.idx}</span>
                <span>${team.team.name}</span>
                <span>${team.pts}</span>
            </div>
        `;
    });
}

/* ===============================
        عرض مباريات اليوم
================================*/

async function displayArabMatches(id) {
    const box = document.getElementById("today-matches");

    if (!box) return;

    box.innerHTML = `<div class="loader"></div>`;

    const data = await getArabLeague(id);

    if (!data || !data.matches) {
        box.innerHTML = "<p>لا يوجد مباريات اليوم.</p>";
        return;
    }

    box.innerHTML = `<h2>مباريات اليوم</h2>`;

    data.matches.allMatches.forEach(m => {
        box.innerHTML += `
            <div class="match-card" style="
                padding:12px;margin-bottom:10px;background:white;
                border-radius:10px;box-shadow:0 2px 6px rgba(0,0,0,0.1);
            ">
                <strong>${m.home.name}</strong> vs 
                <strong>${m.away.name}</strong>
                <br>
                <small>${m.time}</small>
            </div>
        `;
    });
}

/* ===============================
      تحديث تلقائي كل 30 ثانية
================================*/

function autoUpdate(id) {
    // تحديث مباشر
    displayArabLeague(id);
    displayArabMatches(id);

    // تحديث كل 30 ثانية
    setInterval(() => {
        displayArabLeague(id);
        displayArabMatches(id);
    }, 30000);
}

/* ===============================
        تشغيل عند تحميل الصفحة
================================*/

document.addEventListener("DOMContentLoaded", () => {
    // اختر الدوري العربي الأفضل
    const chosenLeague = arabLeagues.saudi; // يمكنك تغييره لأي دوري

    autoUpdate(chosenLeague);  // تشغيل التحديث التلقائي
});


