// Test script for Azure OpenAI API connection
// Run with: node test-azure-api.js

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

console.log('🔍 Testing Azure OpenAI API Connection...\n');
console.log('Endpoint:', AZURE_ENDPOINT);
console.log('API Key:', AZURE_KEY ? `${AZURE_KEY.substring(0, 8)}...` : 'NOT FOUND');
console.log('---\n');

// Test API call
async function testAzureAPI() {
  try {
    const testMessages = [
      {
        role: 'system',
        content: 'You are a helpful assistant. Respond in Hebrew.'
      },
      {
        role: 'user',
        content: 'שלום, זה בדיקה. אנא ענה בעברית במשפט אחד קצר.'
      }
    ];

    console.log('📤 Sending test request...');
    
    const response = await fetch(AZURE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': AZURE_KEY
      },
      body: JSON.stringify({
        messages: testMessages,
        max_tokens: 100,
        temperature: 0.7
      })
    });

    console.log('📥 Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error response:', errorText);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    console.log('\n✅ SUCCESS! API connection is working.\n');
    console.log('Response:');
    console.log('---');
    console.log(JSON.stringify(data, null, 2));
    console.log('---\n');
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      console.log('🤖 AI Response:', data.choices[0].message.content);
    }

    return true;
  } catch (error) {
    console.error('\n❌ FAILED! Error testing Azure API:');
    console.error(error.message);
    
    if (error.cause) {
      console.error('Cause:', error.cause);
    }

    return false;
  }
}

// Run the test
testAzureAPI()
  .then(success => {
    if (success) {
      console.log('\n✅ Azure API integration is ready to use!');
      process.exit(0);
    } else {
      console.log('\n❌ Please check your Azure credentials and try again.');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('\n❌ Unexpected error:', error);
    process.exit(1);
  });
