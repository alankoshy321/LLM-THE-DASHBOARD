import { generateDashboard } from '../services/llmService.js';


export async function generateDashboardController(req, res) {
  try {
    const { prompt, jsonData } = req.body;

    // Validate request body
    if (!prompt || !jsonData) {
      return res.status(400).json({
        error: 'Missing required fields: prompt and jsonData are required'
      });
    }

    // Validate prompt is a string
    if (typeof prompt !== 'string' || prompt.trim() === '') {
      return res.status(400).json({
        error: 'Prompt must be a non-empty string'
      });
    }

    // Validate jsonData is an object
    if (typeof jsonData !== 'object' || jsonData === null) {
      return res.status(400).json({
        error: 'jsonData must be a valid JSON object'
      });
    }

    // Generate dashboard using LLM service
    const htmlContent = await generateDashboard(prompt, jsonData);

    // Return generated HTML
    res.json({
      success: true,
      html: htmlContent
    });

  } catch (error) {
    console.error('Controller Error:', error);
    
    // Handle OpenAI API errors
    if (error.message.includes('API key')) {
      return res.status(500).json({
        error: 'OpenAI API key not configured properly'
      });
    }

    // Generic error response
    res.status(500).json({
      error: error.message || 'Failed to generate dashboard'
    });
  }
}
