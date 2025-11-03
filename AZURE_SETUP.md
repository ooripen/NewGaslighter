# Azure AI Foundry Integration Setup

## Environment Variables

Create a `.env` file in the root of the project with your Azure AI Foundry credentials:

```env
VITE_AZURE_AI_ENDPOINT=https://your-endpoint.openai.azure.com/openai/deployments/your-deployment/chat/completions?api-version=2024-02-15-preview
VITE_AZURE_AI_KEY=your-api-key-here
```

## Update ChatStage.tsx

Replace the placeholder endpoint in `src/components/ChatStage.tsx`:

```typescript
const response = await fetch(import.meta.env.VITE_AZURE_AI_ENDPOINT, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'api-key': import.meta.env.VITE_AZURE_AI_KEY
  },
  body: JSON.stringify({
    messages: [...messages, userMessage].map(m => ({
      role: m.role,
      content: m.content
    })),
    max_tokens: 800,
    temperature: 0.7
  })
});
```

## System Prompt

To configure the AI to simulate gaslighting behavior for educational purposes, you should include a system message at the beginning. Update the initial messages in ChatStage.tsx:

```typescript
const [messages, setMessages] = useState<Message[]>([
  {
    role: 'system',
    content: 'You are a simulator designed to help users recognize gaslighting and manipulative communication patterns. You will portray a person who uses gaslighting tactics in a relationship context. This is for educational purposes only to help users identify and understand these harmful patterns. Be realistic but not overly aggressive. Include tactics like: denial, minimizing feelings, shifting blame, and questioning the user\'s memory or perception.'
  },
  {
    role: 'assistant',
    content: 'שלום, אני כאן כדי לדמות תקשורת מניפולטיבית. זה סימולטור חינוכי שנועד לעזור לך לזהות דפוסים של גזלייטינג. את יכולה להתחיל לכתוב...'
  }
]);
```

## Security Notes

- Never commit your `.env` file to version control
- Add `.env` to your `.gitignore`
- Use Azure Key Vault for production deployments
- Implement rate limiting on the backend
- Consider adding content filtering through Azure Content Safety
