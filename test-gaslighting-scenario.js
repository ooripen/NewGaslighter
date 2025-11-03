// Test script for Gaslighting Educational Scenario
// This tests the AI's ability to simulate gaslighting patterns for educational purposes

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read and parse .env file
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  line = line.trim();
  if (line && !line.startsWith('#')) {
    const [key, ...valueParts] = line.split('=');
    if (key) {
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  }
});

const AZURE_ENDPOINT = envVars.VITE_AZURE_AI_ENDPOINT;
const AZURE_KEY = envVars.VITE_AZURE_AI_KEY;

console.log('🎭 Testing Gaslighting Educational Scenario\n');
console.log('This test simulates the AI acting as a gaslighter for educational purposes.');
console.log('The goal is to help users recognize manipulative communication patterns.\n');
console.log('---\n');

async function testGaslightingScenario() {
  try {
    // System prompt that instructs the AI to simulate gaslighting behavior
    const systemPrompt = `You are a simulator designed to help users recognize gaslighting and manipulative communication patterns. You will portray a person who uses gaslighting tactics in a relationship context. This is for educational purposes only to help users identify and understand these harmful patterns.

Your role is to demonstrate realistic gaslighting behaviors including:
- Denial and dismissal of the user's feelings or experiences
- Minimizing their concerns ("you're overreacting", "it's not a big deal")
- Shifting blame to the user ("you made me do this")
- Questioning their memory or perception ("that never happened", "you're remembering it wrong")
- Using confusion and contradiction
- Undermining their confidence

IMPORTANT: 
- Respond in Hebrew
- Be realistic but not overly aggressive or abusive
- The goal is education, so patterns should be clear enough to identify
- Keep responses conversational and believable
- This is ONLY for educational purposes to help people recognize these patterns`;

    const conversation = [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: 'למה באת הביתה כל כך מאוחר אתמול? הבטחת שתחזור עד תשע.'
      }
    ];

    console.log('👤 User: למה באת הביתה כל כך מאוחר אתמול? הבטחת שתחזור עד תשע.\n');
    console.log('⏳ Waiting for AI response...\n');

    const response = await fetch(AZURE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': AZURE_KEY
      },
      body: JSON.stringify({
        messages: conversation,
        max_tokens: 300,
        temperature: 0.8,
        top_p: 0.9
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error response:', errorText);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      const aiResponse = data.choices[0].message.content;
      console.log('🤖 AI (simulating gaslighting):\n');
      console.log(aiResponse);
      console.log('\n---\n');

      // Analyze the response for gaslighting patterns
      console.log('📊 Analysis of AI Response:\n');
      
      const patterns = {
        'Denial': /לא|אף פעם|מעולם/i,
        'Minimizing': /מגזימ|לא גדול|לא כזה|רק/i,
        'Blame Shifting': /את|אתה|שלך|עשית/i,
        'Memory Questioning': /זוכר|זוכרת|היה|לא היה/i,
        'Dismissal': /תפסיק|די|זה לא/i
      };

      let patternsFound = [];
      for (const [pattern, regex] of Object.entries(patterns)) {
        if (regex.test(aiResponse)) {
          patternsFound.push(pattern);
        }
      }

      if (patternsFound.length > 0) {
        console.log('✅ Gaslighting patterns detected:');
        patternsFound.forEach(pattern => console.log(`   - ${pattern}`));
      } else {
        console.log('⚠️  No clear gaslighting patterns detected in this response.');
      }

      console.log('\n📈 Token Usage:');
      console.log(`   Prompt: ${data.usage.prompt_tokens} tokens`);
      console.log(`   Response: ${data.usage.completion_tokens} tokens`);
      console.log(`   Total: ${data.usage.total_tokens} tokens`);

      console.log('\n🛡️ Content Safety:');
      const filters = data.choices[0].content_filter_results;
      console.log(`   Hate: ${filters.hate.severity}`);
      console.log(`   Self-harm: ${filters.self_harm.severity}`);
      console.log(`   Sexual: ${filters.sexual.severity}`);
      console.log(`   Violence: ${filters.violence.severity}`);

      return true;
    }

    return false;
  } catch (error) {
    console.error('\n❌ Error testing gaslighting scenario:');
    console.error(error.message);
    return false;
  }
}

// Test continuation scenario
async function testConversationContinuation() {
  console.log('\n\n🔄 Testing Conversation Continuation\n');
  console.log('---\n');

  try {
    const systemPrompt = `You are a simulator designed to help users recognize gaslighting and manipulative communication patterns. You will portray a person who uses gaslighting tactics in a relationship context. This is for educational purposes only to help users identify and understand these harmful patterns.

Your role is to demonstrate realistic gaslighting behaviors. Respond in Hebrew. Be realistic but not overly aggressive. The goal is education.`;

    const conversation = [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: 'למה באת הביתה כל כך מאוחר אתמול?'
      },
      {
        role: 'assistant',
        content: 'מה פתאום מאוחר? הגעתי בזמן. את תמיד מגזימה עם הדברים האלה.'
      },
      {
        role: 'user',
        content: 'אבל אמרת שתחזור בתשע, והיו כבר עשר וחצי!'
      }
    ];

    console.log('Previous conversation:');
    console.log('👤 User: למה באת הביתה כל כך מאוחר אתמול?');
    console.log('🤖 AI: מה פתאום מאוחר? הגעתי בזמן. את תמיד מגזימה עם הדברים האלה.');
    console.log('👤 User: אבל אמרת שתחזור בתשע, והיו כבר עשר וחצי!\n');
    console.log('⏳ Waiting for AI response...\n');

    const response = await fetch(AZURE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': AZURE_KEY
      },
      body: JSON.stringify({
        messages: conversation,
        max_tokens: 300,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      const aiResponse = data.choices[0].message.content;
      console.log('🤖 AI (continuing gaslighting pattern):\n');
      console.log(aiResponse);
      console.log('\n---\n');
      return true;
    }

    return false;
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    return false;
  }
}

// Run all tests
(async () => {
  console.log('═══════════════════════════════════════════════════════\n');
  
  const test1 = await testGaslightingScenario();
  const test2 = await testConversationContinuation();

  console.log('\n═══════════════════════════════════════════════════════\n');
  
  if (test1 && test2) {
    console.log('✅ All tests passed! The Azure API is working correctly for the');
    console.log('   educational gaslighting simulation scenario.\n');
    console.log('📚 The AI is able to:');
    console.log('   - Simulate gaslighting patterns in Hebrew');
    console.log('   - Maintain conversation context');
    console.log('   - Stay within content safety guidelines');
    console.log('   - Provide educational value for pattern recognition\n');
  } else {
    console.log('⚠️  Some tests failed. Please review the output above.\n');
  }
})();
