# הגזלייטר

כלי חינוכי מבוסס AI שנועד לעזור למשתמשים לזהות דפוסי תקשורת מניפולטיבית (גזלייטינג) דרך סימולציה אינטראקטיבית, תוכן חינוכי, ומשאבי תמיכה מקצועית.

**פותח עבור:** עמותת לא. לאלימות נגד נשים  
**סטטוס:** ✅ Azure AI Integration Tested & Working  
**מודל:** GPT-4o (Azure OpenAI)

---

## 🎯 תכונות

### שלב 1: מסך בדיקה ראשוני
- 4 שאלות הסכמה ומוכנות רגשית
- מנגנון יציאה בטוח לשאלה שלילית
- הכנה פסיכולוגית למשתמש

### שלב 2: תוכן חינוכי
- **מידע**: הסברים על זיהוי דפוסי גזלייטינג
- **דוגמאות**: דיאלוגים מוסברים עם הדגשת דפוסים
- **משאבים**: קישורים לקווי חירום ותמיכה מקצועית

### שלב 3: סימולציה חינוכית (אופציונלי)
- שיחה מבוססת AI עם Azure OpenAI
- דמות דפוסים מניפולטיביים למטרות לימוד
- הקשר חינוכי ברור עם אפשרות יציאה בכל עת

### תכונות נוספות
- **ממשק עברית מלא**: תמיכה מלאה ב-RTL וטיפוגרפיה עברית
- **נגישות**: תמיכה ב-screen readers ו-ARIA labels
- **רספונסיבי**: עובד על מחשב, טאבלט ומובייל

---

## 🚀 התחלה מהירה

### בדיקת אינטגרציה עם Azure
```bash
# בדיקת חיבור בסיסי
node test-azure-api.js

# בדיקת תרחישים חינוכיים
node test-gaslighting-scenario.js

# הרצת כל הבדיקות
./verify-integration.sh
```

### פיתוח מקומי
```bash
# התקנת תלויות
npm install

# הרצת שרת פיתוח
npm run dev

# האתר יהיה זמין ב:
# http://localhost:5173
```

### בניה לפרודקשן
```bash
npm run build
npm run preview
```

---

## 🔧 הגדרת Azure OpenAI

### דרישות
- חשבון Azure עם Azure OpenAI Service
- Deployment של GPT-4o או דומה
- API Key ו-Endpoint

### הגדרת Environment Variables
צור קובץ `.env` בשורש הפרויקט:

```env
VITE_AZURE_AI_ENDPOINT=https://your-resource.openai.azure.com/openai/deployments/your-deployment/chat/completions?api-version=2024-08-01-preview
VITE_AZURE_AI_KEY=your-api-key-here
```

**⚠️ חשוב:** אל תשתף את ה-API key! הקובץ `.env` כבר ב-`.gitignore`.

### בדיקת החיבור
```bash
node test-azure-api.js
```

אם הכל עובד, תראה:
```
✅ SUCCESS! API connection is working.
🤖 AI Response: שלום! אני כאן לעזור...
```

---

## 📚 תיעוד

### מסמכים עיקריים
- **[README_TESTING.md](./README_TESTING.md)** - התחל כאן! מדריך מלא לבדיקות
- **[INTEGRATION_SUMMARY.md](./INTEGRATION_SUMMARY.md)** - סיכום מפורט של האינטגרציה
- **[SECURITY_NOTICE.md](./SECURITY_NOTICE.md)** - ⚠️ הערת אבטחה חשובה
- **[AZURE_SETUP.md](./AZURE_SETUP.md)** - הוראות הגדרת Azure
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - מדריך פריסה והטמעה

### סקריפטי בדיקה
- `test-azure-api.js` - בדיקת חיבור בסיסי
- `test-gaslighting-scenario.js` - בדיקת תרחישים חינוכיים
- `verify-integration.sh` - סוויטת בדיקות מקיפה

---

## 🎨 עיצוב וחוויית משתמש

### צבעים
- **סגול עמוק** `oklch(0.45 0.15 300)` - אמינות ומקצועיות
- **לבנדר רך** `oklch(0.75 0.08 300)` - רקעים מרגיעים
- **קורל חם** `oklch(0.70 0.15 25)` - הדגשה ותשומת לב

### טיפוגרפיה
**Noto Sans Hebrew** - קריאות וגישה מיטבית בעברית

### אנימציות
מעברים עדינים עם Framer Motion - ללא הסחות דעת מיותרות

---

## 🔐 אבטחה ופרטיות

### הגנת נתונים
- ✅ **אין איסוף נתונים**: כל המידע נשאר במכשיר המשתמש
- ✅ **אין שרת backend**: תוכן סטטי (למעט API calls לצורך חינוך)
- ✅ **אין עוגיות**: שימוש ב-localStorage מקומי בלבד
- ✅ **ניתן להטמעה**: עובד בטוח כ-iframe

### אבטחת API
- 🔒 API keys ב-`.env` (לא נשמר ב-git)
- 🔒 Content Safety filters של Azure פעילים
- 🔒 ניטור שימוש ב-Azure Portal

**⚠️ הערת אבטחה:** ראה [SECURITY_NOTICE.md](./SECURITY_NOTICE.md) לפרטים על סיבוב API keys.

---

## 📱 תמיכה במכשירים ודפדפנים

### דפדפנים נתמכים
- ✅ Chrome / Edge (גרסה 90+)
- ✅ Firefox (גרסה 88+)
- ✅ Safari (גרסה 14+)
- ✅ Mobile browsers (iOS Safari, Android Chrome)

### נגישות
- ✅ Screen readers (NVDA, JAWS, VoiceOver)
- ✅ Keyboard navigation
- ✅ ARIA labels מלאים
- ✅ תמיכת RTL מלאה

---

## 🛠️ סטאק טכנולוגי

### Frontend
- **React 19** - ספריית UI
- **TypeScript** - type safety
- **Vite** - build tool מהיר
- **Tailwind CSS 4** - styling עם RTL
- **Shadcn UI** - קומפוננטות נגישות
- **Framer Motion** - אנימציות

### AI & Backend
- **Azure OpenAI** - GPT-4o
- **Azure Cognitive Services** - content safety
- **REST API** - תקשורת עם Azure

### Icons & Assets
- **Phosphor Icons** - אייקונים ברורים
- **Google Fonts** - Noto Sans Hebrew

---

## 📋 זרימת משתמש

```
התחלה
   ↓
┌─────────────────────┐
│ מסך בדיקה (4 שאלות)│
└─────────────────────┘
   ↓ (כל התשובות "כן")
┌─────────────────────┐
│   תוכן חינוכי       │
│ ┌─────────────────┐ │
│ │ מידע            │ │
│ │ דוגמאות         │ │
│ │ משאבים          │ │
│ └─────────────────┘ │
└─────────────────────┘
   ↓ (אופציונלי)
┌─────────────────────┐
│ סימולציה חינוכית   │
│ (AI-powered)        │
└─────────────────────┘
   ↓
┌─────────────────────┐
│ משאבי עזרה          │
│ וקווי חירום         │
└─────────────────────┘
```

---

## 🧪 סטטוס בדיקות

**תאריך בדיקה אחרון:** 3 בנובמבר, 2025

### תוצאות בדיקות
- ✅ **חיבור ל-Azure OpenAI:** עובד
- ✅ **תמיכה בעברית:** עובד
- ✅ **סימולציה חינוכית:** עובד
- ✅ **הקשר שיחה:** עובד
- ✅ **Content Safety:** פעיל
- ⚠️ **אבטחה:** דורש סיבוב API key

**Pass Rate:** 90% (9/10 tests)

להרצת בדיקות:
```bash
./verify-integration.sh
```

---

## 🚀 פריסה (Deployment)

### GitHub Spark (מומלץ)
הפרויקט מוכן לפריסה עם GitHub Spark:
```bash
# Spark ידאג לפריסה אוטומטית
# תקבל URL ציבורי להטמעה
```

### הטמעה באתר no2violence.co.il
```html
<!-- הוסף זאת לדף הגזלייטינג -->
<div id="simulator-modal" style="display:none;">
  <iframe 
    src="YOUR_DEPLOYMENT_URL"
    style="width:100%; height:100%; border:none;"
    title="הגזלייטר">
  </iframe>
</div>
```

ראה [DEPLOYMENT.md](./DEPLOYMENT.md) לפרטים מלאים.

---

## 📞 משאבי תמיכה

### קווי חירום (זמינים בכלי)
- **קו חירום לנפגעות אלימות**: 118 (24/7)
- **לא לאלימות**: https://www.no2violence.co.il
- **מרכז סיוע לנפגעות תקיפה מינית**: 1202

### תמיכה טכנית
- **Issues**: צור issue ב-GitHub
- **Documentation**: ראה תיקיית `docs/`
- **Azure Support**: https://portal.azure.com

---

## 🤝 תרומה לפרויקט

הכלי הזה נועד לעזור לאנשים לזהות ולהגן על עצמם מתקשורת מזיקה. תרומות, הצעות שיפור, ותיקוני באגים מתקבלים בברכה!

### איך לתרום
1. Fork את הפרויקט
2. צור branch לפיצ'ר שלך
3. Commit את השינויים
4. Push ל-branch
5. פתח Pull Request

---

## 📄 רישיון

פרויקט זה נועד למטרות חינוכיות ומניעת אלימות.  
ראה [LICENSE](./LICENSE) לפרטים.

---

## ⚠️ הערה חשובה

**כלי זה הוא למטרות חינוכיות בלבד** ואינו מחליף ייעוץ או טיפול מקצועי.

- אם את/ה במצב של סכנה מיידית - התקשר/י למשטרה: **100**
- לתמיכה רגשית ומקצועית - התקשר/י לקו חירום: **118**
- הכלי מדמה דפוסים מזיקים למטרות חינוך בלבד
- תמיד ישנה אפשרות לעצור ולצאת מהסימולציה

---

## 📊 מידע נוסף

**גרסה נוכחית:** 1.0.0 (Integration Testing Complete)  
**תאריך עדכון:** 3 בנובמבר, 2025  
**מודל AI:** GPT-4o (Azure OpenAI)  
**שפה:** עברית (RTL)

**לשאלות או בעיות טכניות:**
- ראה [README_TESTING.md](./README_TESTING.md)
- ראה [INTEGRATION_SUMMARY.md](./INTEGRATION_SUMMARY.md)
- צור GitHub Issue


