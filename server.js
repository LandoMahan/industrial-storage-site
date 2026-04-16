require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Basic routes
app.get('/', (req, res) => {
  console.log('Serving index.html from:', path.join(__dirname, 'index.html'));
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
  res.json({ status: 'ok', timestamp: new Date().toISOString(), version: 'v2-apr16-1637' });
});

// Form submission - just accept and log for now
app.post('/api/inquiry', (req, res) => {
  const { name, company, email, phone, sqft, details } = req.body;

  if (!name || !company || !email || !phone || !sqft) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const estimatedMonthly = (parseFloat(sqft) * 1.20).toFixed(2);
  
  console.log('Form submission:', { name, company, email, phone, sqft, details });

  // For now, just return success
  // We can add email sending once we get it running
  res.json({ 
    success: true, 
    id: Date.now().toString(),
    estimatedMonthly,
    message: 'Thank you! We will contact you soon.'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});
