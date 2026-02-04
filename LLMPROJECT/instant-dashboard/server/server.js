import dotenv from 'dotenv';
import app from './app.js';

// Load environment variables
dotenv.config();

// Get port from environment or use default
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Dashboard API available at http://localhost:${PORT}/api/generate-dashboard`);
});
