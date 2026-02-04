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

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

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
    // Load system prompt
    const systemPrompt = loadSystemPrompt();

    // Construct user message with prompt and JSON data
    const userMessage = `${userPrompt}\n\nJSON Data:\n${JSON.stringify(jsonData, null, 2)}`;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    // Extract generated HTML from response
    const generatedHTML = response.choices[0].message.content;

    // Basic sanitization - remove script tags if AI includes them
    const sanitizedHTML = generatedHTML
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/gi, ''); // Remove inline event handlers

    return sanitizedHTML;
  } catch (error) {
    console.error('LLM Service Error:', error);
    throw new Error('Failed to generate dashboard: ' + error.message);
  }
}
