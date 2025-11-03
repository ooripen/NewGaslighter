# ⚡ Quick Reference - Azure Integration

## ✅ Current Status
- **API Connection:** WORKING ✓
- **Hebrew Support:** WORKING ✓  
- **Educational Scenarios:** WORKING ✓
- **Security:** ⚠️ Needs API key rotation

---

## 🚀 Quick Test Commands

```bash
# Test basic connectivity
node test-azure-api.js

# Test educational scenarios
node test-gaslighting-scenario.js

# Run full verification
./verify-integration.sh
```

---

## 🔧 Environment Variables

Located in `.env` (NOT committed to git):

```properties
VITE_AZURE_AI_ENDPOINT=https://gaslighter.cognitiveservices.azure.com/...
VITE_AZURE_AI_KEY=c5148448403f4ed7abc374e856a308cd
```

**Access in code:**
```typescript
const endpoint = import.meta.env.VITE_AZURE_AI_ENDPOINT;
const apiKey = import.meta.env.VITE_AZURE_AI_KEY;
```

---

## 📝 Sample API Call

```typescript
const response = await fetch(import.meta.env.VITE_AZURE_AI_ENDPOINT, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'api-key': import.meta.env.VITE_AZURE_AI_KEY
  },
  body: JSON.stringify({
    messages: [
      { role: 'system', content: 'System prompt...' },
      { role: 'user', content: 'User message in Hebrew' }
    ],
    max_tokens: 300,
    temperature: 0.8
  })
});

const data = await response.json();
const aiMessage = data.choices[0].message.content;
```

---

## ⚠️ BEFORE PRODUCTION

**Critical:** Rotate API key (see `SECURITY_NOTICE.md`)

1. Go to [Azure Portal](https://portal.azure.com)
2. Find your Azure OpenAI resource
3. Keys and Endpoint → Regenerate Key
4. Update `.env` with new key
5. Test: `node test-azure-api.js`

---

## 📚 Documentation Files

- **INTEGRATION_SUMMARY.md** - Complete overview
- **AZURE_TEST_RESULTS.md** - Detailed test results
- **SECURITY_NOTICE.md** - Security issue & fix
- **AZURE_SETUP.md** - Original setup guide

---

## 🆘 Emergency Contacts

**For Users of the Tool:**
- Emergency Hotline: 118 (24/7)
- No2Violence: https://www.no2violence.co.il
- Sexual Assault Center: 1202

**For Developers:**
- Azure Support: https://portal.azure.com
- GitHub Issues: Repository issues page

---

## ✨ What's Working

✅ API connectivity to Azure OpenAI  
✅ GPT-4o model (2024-11-20)  
✅ Hebrew language input/output  
✅ Gaslighting pattern simulation  
✅ Multi-turn conversations  
✅ Content safety filters  
✅ Context preservation  
✅ Educational value  

---

## 🎯 Next Actions

1. ⚠️ **Rotate API key** (HIGH PRIORITY)
2. 🏗️ Build React application (`npm run dev`)
3. 🧪 Test full user flow
4. 🔒 Configure Azure security
5. 🚀 Deploy to production

---

**Last Updated:** November 3, 2025  
**Status:** Ready for development (pending security fix)
