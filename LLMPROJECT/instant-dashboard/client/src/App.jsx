import React, { useState } from 'react';
import './App.css';
import JsonInput from './components/JsonInput';
import PromptInput from './components/PromptInput';
import GenerateButton from './components/GenerateButton';
import PreviewFrame from './components/PreviewFrame';
import ErrorAlert from './components/ErrorAlert';

// Base URL for the backend API:
// - In development, defaults to http://localhost:3000
// - In production (Netlify), set VITE_API_URL in environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_URL = `${API_BASE_URL.replace(/\/$/, '')}/api/generate-dashboard`;

// Helpful for debugging Netlify/Render configuration
console.log('[InstantDashboard] API_BASE_URL =', API_BASE_URL);
console.log('[InstantDashboard] API_URL =', API_URL);

function App() {
  
  const [jsonInput, setJsonInput] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 
  const validateJson = (input) => {
    try {
      const parsed = JSON.parse(input);
      return parsed;
    } catch (err) {
      return null;
    }
  };

  
  const handleGenerate = async () => {
    // Clear previous error
    setError('');

    // Validate inputs
    if (!jsonInput.trim()) {
      setError('Please enter JSON data');
      return;
    }

    if (!prompt.trim()) {
      setError('Please enter dashboard instructions');
      return;
    }

    // Validate JSON format
    const parsedJson = validateJson(jsonInput);
    if (!parsedJson) {
      setError('Invalid JSON format. Please check your JSON syntax.');
      return;
    }

    // Set loading state
    setLoading(true);

    try {
      // Call backend API
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          jsonData: parsedJson
        })
      });

      const data = await response.json();

      // Handle error response
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate dashboard');
      }

      // Update state with generated HTML
      setGeneratedHtml(data.html);
      
    } catch (err) {
      console.error('Generation error:', err);
      setError(err.message || 'An error occurred while generating the dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Instant Dashboard Generator</h1>
        <p className="app-subtitle">Transform JSON data into beautiful dashboards with AI</p>
      </header>

      <main className="app-main">
        {/* Error Alert */}
        <ErrorAlert message={error} onClose={() => setError('')} />

        {/* Input Section */}
        <div className="input-container">
          <JsonInput 
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
          
          <PromptInput 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <GenerateButton 
            onClick={handleGenerate}
            loading={loading}
          />
        </div>

        {/* Preview Section */}
        <PreviewFrame html={generatedHtml} />
      </main>

      <footer className="app-footer">
        <p>Powered by OpenAI • Built with React & Express</p>
        <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>
          Backend: <code>{API_BASE_URL}</code>
        </p>
      </footer>
    </div>
  );
}

export default App;
