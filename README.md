Instant Dashboard
A full-stack web application that converts JSON data and natural language instructions into a live dashboard preview using AI.

Project Description
This application allows users to input JSON data along with natural language prompts, which are then sent to an AI model (OpenAI) to generate a custom HTML/CSS dashboard. The generated dashboard is rendered live in the browser inside a secure iframe preview window.

Tech Stack
Frontend:

React (JavaScript)
Vite (build tool)
Plain CSS (no framework)
Backend:

Node.js
Express
OpenAI API
Key Features:

No database required
No authentication
Client-side JSON validation
Server-side AI integration
Iframe-based secure rendering
Environment Variables
Create a .env file in the server/ directory with the following:

OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
How to get OpenAI API Key:

Visit https://platform.openai.com/
Sign up or log in
Navigate to API Keys section
Create a new API key
Copy and paste it into your .env file
Installation & Setup
Prerequisites
Node.js (v18 or higher)
npm or yarn
Backend Setup
Navigate to the server directory:
cd server
Install dependencies:
npm install
Create .env file with your OpenAI API key (see Environment Variables section above)

Start the backend server:

npm run dev
The server will run on http://localhost:3000

Frontend Setup
Navigate to the client directory (open a new terminal):
cd client
Install dependencies:
npm install
Start the development server:
npm run dev
The frontend will run on http://localhost:5173

Usage
Enter JSON Data: Paste your JSON data in the large textarea (e.g., expense data, sales data, etc.)

Add Prompt: Describe what kind of dashboard you want in the text input (e.g., "Create a dashboard with a summary card and expense table")

Generate: Click the "Generate Dashboard" button

Preview: View your AI-generated dashboard in the preview area below

Example JSON:

{
  "expenses": [
    {"category": "Food", "amount": 250},
    {"category": "Transport", "amount": 100},
    {"category": "Entertainment", "amount": 150}
  ],
  "total": 500
}
AI API Used
This project uses OpenAI's GPT API (specifically gpt-3.5-turbo or gpt-4) to generate dashboard HTML and CSS based on user prompts and JSON data. The AI is instructed via a system prompt to output only valid HTML/CSS without any JavaScript or explanations.

Project Structure
instant-dashboard/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx        # Main app component
│   │   ├── App.css        # Application styles
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                # Backend Express server
│   ├── controllers/       # Request handlers
│   ├── routes/           # API routes
│   ├── services/         # Business logic (LLM integration)
│   ├── prompts/          # System prompts for AI
│   ├── app.js            # Express app configuration
│   ├── server.js         # Server entry point
│   └── package.json
├── README.md
└── .gitignore
Deployment
Deploy to Vercel
Frontend (Vite React App):

Install Vercel CLI:
npm install -g vercel
Navigate to client directory and deploy:
cd client
vercel
Follow the prompts and configure:
Build Command: npm run build
Output Directory: dist
Backend (Express Server):

Create a vercel.json in the server directory:
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
Deploy from server directory:
cd server
vercel
Add environment variables in Vercel dashboard (OPENAI_API_KEY)

Update frontend API endpoint to your deployed backend URL

Deploy to Netlify
Frontend:

Install Netlify CLI:
npm install -g netlify-cli
Build and deploy from client directory:
cd client
npm run build
netlify deploy --prod --dir=dist
Backend:

For the backend, consider using:

Heroku (traditional hosting)
Railway (modern platform)
Render (free tier available)
Or deploy backend to Vercel as described above.

Security
JSON input is validated before sending to backend
AI-generated HTML is rendered in an isolated iframe
No JavaScript execution from generated code
CORS enabled for frontend-backend communication
Basic sanitization to prevent script injection
Development Notes
The app uses a strict system prompt to ensure AI returns only HTML/CSS
Invalid JSON triggers an error alert without making API calls
Loading spinner provides user feedback during generation
Error handling implemented on both frontend and backend
License
MIT

Support
For issues or questions, please open an issue in the repository.

