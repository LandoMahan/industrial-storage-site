require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

console.log('🚀 Server starting...');
console.log('PORT:', PORT);
console.log('Static files from:', path.join(__dirname));

// Basic routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/facility', (req, res) => {
  res.sendFile(path.join(__dirname, 'facility.html'));
});

app.get('/pricing', (req, res) => {
  res.sendFile(path.join(__dirname, 'pricing.html'));
});

app.get('/faq', (req, res) => {
  res.sendFile(path.join(__dirname, 'faq.html'));
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: 'APRIL_16_2026_FIXED',
    updated: true
  });
});

// Form submission - just accept and log
app.post('/api/inquiry', (req, res) => {
  const { name, company, email, phone, sqft, details } = req.body;

  if (!name || !company || !email || !phone || !sqft) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const estimatedMonthly = (parseFloat(sqft) * 1.20).toFixed(2);
  
  console.log('✓ Form submission:', { name, company, email, phone, sqft });

  res.json({ 
    success: true, 
    id: Date.now().toString(),
    estimatedMonthly,
    message: 'Thank you! We will contact you soon.'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('═══════════════════════════════════');
  console.log('✅ 2882 Storage Website RUNNING');
  console.log('═══════════════════════════════════');
  console.log('URL: http://0.0.0.0:' + PORT);
  console.log('Health: GET /api/health');
  console.log('');
});

process.on('SIGTERM', () => {
  console.log('Shutting down...');
  server.close(() => process.exit(0));
});
