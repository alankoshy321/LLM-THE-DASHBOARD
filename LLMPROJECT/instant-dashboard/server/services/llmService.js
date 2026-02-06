import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import OpenAI from 'openai';

// Load environment variables from .env file
dotenv.config();

// Get current directory in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize OpenAI client if API key is present
const hasApiKey = !!process.env.OPENAI_API_KEY;
const openai = hasApiKey
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

/**
 * Load system prompt from file
 * @returns {string} System prompt content
 */
function loadSystemPrompt() {
  const promptPath = path.join(__dirname, '../prompts/systemPrompt.txt');
  return fs.readFileSync(promptPath, 'utf-8');
}

/**
 * Generate dashboard HTML using OpenAI
 * @param {string} userPrompt - User's natural language instruction
 * @param {object} jsonData - Parsed JSON data for the dashboard
 * @returns {Promise<string>} Generated HTML/CSS code
 */
export async function generateDashboard(userPrompt, jsonData) {
  try {
    // DEMO MODE: no API key → return static example HTML
    if (!hasApiKey) {
      const prettyJson = JSON.stringify(jsonData, null, 2);
      const safePrompt = String(userPrompt || '').slice(0, 300);

      const demoHtml = `
        <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 24px; background: #0f172a; color: #e5e7eb; min-height: 100vh;">
          <div style="max-width: 960px; margin: 0 auto;">
            <header style="margin-bottom: 24px;">
              <h1 style="font-size: 28px; font-weight: 700; margin-bottom: 4px;">Demo Dashboard (No API Key)</h1>
              <p style="color: #9ca3af; font-size: 14px;">
                This is a deterministic demo response rendered when no OpenAI API key is configured on the server.
              </p>
            </header>

            <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 24px;">
              <div style="background: #111827; border-radius: 12px; padding: 16px; border: 1px solid #1f2937;">
                <h2 style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">Instructions</h2>
                <p style="font-size: 14px; color: #d1d5db;">${safePrompt || 'No instructions provided.'}</p>
              </div>
              <div style="background: #111827; border-radius: 12px; padding: 16px; border: 1px solid #1f2937;">
                <h2 style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">Data Summary</h2>
                <p style="font-size: 14px; color: #d1d5db; margin-bottom: 4px;">
                  Keys in root object: <strong>${Object.keys(jsonData || {}).length}</strong>
                </p>
                <p style="font-size: 12px; color: #9ca3af;">
                  This view is generated without calling OpenAI so that the hosted demo works safely without secrets.
                </p>
              </div>
            </section>

            <section style="background: #111827; border-radius: 12px; padding: 16px; border: 1px solid #1f2937;">
              <h2 style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">Raw JSON (truncated)</h2>
              <pre style="font-size: 12px; line-height: 1.4; background: #020617; padding: 12px; border-radius: 8px; overflow-x: auto; max-height: 320px;">${prettyJson}</pre>
            </section>
          </div>
        </div>
      `;

      return demoHtml;
    }

    // Normal mode with OpenAI
    const systemPrompt = loadSystemPrompt();
    const userMessage = `${userPrompt}\n\nJSON Data:\n${JSON.stringify(jsonData, null, 2)}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const generatedHTML = response.choices[0].message.content;

    const sanitizedHTML = generatedHTML
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '');

    return sanitizedHTML;
  } catch (error) {
    console.error('LLM Service Error:', error);
    throw new Error('Failed to generate dashboard: ' + error.message);
  }
}
