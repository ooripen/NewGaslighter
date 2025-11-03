# מדריך פריסה והטמעה

## 🌐 פריסה ב-GitHub Spark

הפרויקט כבר מוכן לפריסה עם GitHub Spark. פשוט:

1. שמור את השינויים שלך
2. Spark ידאג לפריסה אוטומטית
3. תקבל URL ציבורי להטמעה

## 📦 הטמעה באתר no2violence.co.il

### שלב 1: העתק את ה-URL של הפריסה

לאחר הפריסה, תקבל URL כזה:
```
https://your-spark-deployment.github.dev
```

### שלב 2: הוסף את ה-iframe לדף הגזלייטינג

בדף `https://no2violence.co.il/gaslighting/`, הוסף קוד זה תחת הכפתור "לשיחה עם הגזלייטר":

```html
<!-- Modal wrapper -->
<div id="simulator-modal" style="display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.7); z-index:9999; align-items:center; justify-content:center;">
  <div style="position:relative; width:90%; max-width:1200px; height:90%; max-height:800px; background:white; border-radius:12px; overflow:hidden;">
    <button onclick="closeSimulator()" style="position:absolute; top:10px; right:10px; z-index:10000; background:white; border:none; font-size:24px; cursor:pointer; width:40px; height:40px; border-radius:50%; box-shadow:0 2px 8px rgba(0,0,0,0.2);">✕</button>
    <iframe 
      id="simulator-iframe"
      src="YOUR_SPARK_URL_HERE"
      style="width:100%; height:100%; border:none;"
      title="מרכז מודעות לתקשורת מניפולטיבית"
      allow="clipboard-read; clipboard-write">
    </iframe>
  </div>
</div>

<script>
function openSimulator() {
  document.getElementById('simulator-modal').style.display = 'flex';
}

function closeSimulator() {
  document.getElementById('simulator-modal').style.display = 'none';
}

// Listen for messages from iframe
window.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'closeSimulator') {
    closeSimulator();
  }
});

// Close on ESC key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeSimulator();
  }
});

// Update your existing button
document.getElementById('gaslighter-button').onclick = openSimulator;
</script>
```

### שלב 3: עדכן את הכפתור הקיים

אם הכפתור הקיים שלך נראה כך:
```html
<button id="gaslighter-button">לשיחה עם הגזלייטר</button>
```

זה יעבוד אוטומטית עם הסקריפט למעלה.

## 🔧 התאמות אישיות

### שינוי צבעים

ערוך את הקובץ `src/index.css` והתאם את משתני ה-CSS:

```css
:root {
  --primary: oklch(0.45 0.15 300); /* הצבע העיקרי */
  --accent: oklch(0.70 0.15 25);   /* צבע ההדגשה */
}
```

### הוספת תוכן

ערוך את `src/lib/content.ts` כדי:
- להוסיף שאלות סקר
- להוסיף דוגמאות נוספות
- לעדכן משאבים וקישורים

### שינוי גופן

ב-`index.html`, החלף:
```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@400;500;600;700&display=swap" rel="stylesheet">
```

עם גופן אחר לפי בחירתך.

## 🔐 אופציונלי: הוספת תכונות AI (למתקדמים)

אם תרצה בעתיד להוסיף שיחה מבוססת AI, תצטרך:

### 1. יצירת API Proxy

צור קובץ `/api/chat.ts` (לא כלול בגרסה זו):

```typescript
export async function POST(request: Request) {
  const body = await request.json();
  
  // Call your Azure OpenAI endpoint
  const response = await fetch(
    `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.MODEL_DEPLOYMENT_NAME}/chat/completions?api-version=2024-05-01-preview`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.AZURE_OPENAI_KEY!,
      },
      body: JSON.stringify(body),
    }
  );
  
  return new Response(response.body, { status: response.status });
}
```

### 2. הגדרת Secrets ב-GitHub

1. עבור ל-Settings → Secrets → Actions
2. הוסף:
   - `AZURE_OPENAI_KEY`
   - `AZURE_OPENAI_ENDPOINT`
   - `MODEL_DEPLOYMENT_NAME`

### 3. יצירת קומפוננט Chat

צור קומפוננט חדש שקורא ל-`/api/chat` במקום Azure ישירות.

**⚠️ שים לב**: גישה זו דורשת שרת backend ואינה מומלצת לשימוש ישירות בכלי חינוכי כזה.

## 📊 ניתוח שימוש (אופציונלי)

אם תרצה לעקוב אחר שימוש בכלי:

```typescript
// הוסף ל-App.tsx
useEffect(() => {
  // Track page view (without PII)
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: 'Education Tool',
      page_location: window.location.href,
    });
  }
}, []);
```

## 🧪 בדיקות

לפני פריסה, בדוק:

1. ✅ מסך סקר עובד עם כל השאלות
2. ✅ תשובת "לא" מציגה הודעת יציאה
3. ✅ כל הדוגמאות נפתחות ונסגרות
4. ✅ כל הקישורים למשאבים עובדים
5. ✅ עובד במובייל (iPhone, Android)
6. ✅ עובד ב-RTL (טקסט מימין לשמאל)
7. ✅ נגיש ל-screen readers

## 🆘 פתרון בעיות

### הכלי לא נטען ב-iframe

בדוק שה-URL תומך ב-iframe:
```html
<!-- הוסף headers אלה בשרת שלך -->
X-Frame-Options: ALLOW-FROM https://no2violence.co.il
Content-Security-Policy: frame-ancestors 'self' https://no2violence.co.il
```

### צבעים לא נראים נכון

נקה את ה-cache:
```bash
npm run build
```

### הגופן לא נטען

ודא שהקישור ל-Google Fonts ב-`index.html` תקין.

## 📞 תמיכה

לשאלות נוספות:
- צור issue ב-GitHub
- צור קשר עם הצוות של no2violence.co.il

---

**זכור**: כלי זה נועד לחינוך ומניעה. שמור על המשתמשים בטוחים ומספק להם משאבים מקצועיים.
