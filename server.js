require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');
const fs = require('fs');

// B MODE INTEGRATION
const WarehouseRouter = require('./b-mode-integration.js');
const warehouse = new WarehouseRouter();
console.log('🔋 B MODE ACTIVE: Warehouse project routing through ensemble + learning');

const app = express();
const PORT = process.env.PORT || 3000;

// Create uploads directory on startup
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✓ Uploads directory created');
}

// DATABASE SETUP
const db = new sqlite3.Database(path.join(__dirname, 'inquiries.db'));

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      company TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      sqft INTEGER NOT NULL,
      duration TEXT NOT NULL,
      details TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'new'
    )
  `);
  console.log('✓ Database initialized');
});

// EMAIL SETUP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname)));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ROUTES

// Homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Facility Page
app.get('/facility', (req, res) => {
  res.sendFile(path.join(__dirname, 'facility.html'));
});

// Pricing Page
app.get('/pricing', (req, res) => {
  res.sendFile(path.join(__dirname, 'pricing.html'));
});

// FAQ Page
app.get('/faq', (req, res) => {
  res.sendFile(path.join(__dirname, 'faq.html'));
});

// Submit inquiry (B MODE: Ensemble routing)
app.post('/api/inquiry', async (req, res) => {
  const { name, company, email, phone, sqft, details } = req.body;

  if (!name || !company || !email || !phone || !sqft) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const id = uuidv4();
  const estimatedMonthly = (parseFloat(sqft) * 1.20).toFixed(2);

  // B MODE: Process through ensemble + learning
  const result = await warehouse.processInquiry({
    name, company, email, phone, sqft, duration: 'flexible', details
  });

  db.run(
    'INSERT INTO inquiries (id, name, company, email, phone, sqft, duration, details) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [id, name, company, email, phone, sqft, 'flexible', details],
    async (err) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to save inquiry' });
      }

      try {
        // Send ensemble-generated response
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Industrial Storage Inquiry Received',
          html: `<h2>Thank you for your inquiry!</h2><p>${result.response}</p><p style="font-size:0.8em;color:#666;">Response confidence: ${(result.confidence * 100).toFixed(0)}%</p>`
        });

        console.log(`✓ Inquiry saved: ${id} (ensemble confidence: ${(result.confidence * 100).toFixed(0)}%)`);
        res.json({ success: true, id, estimatedMonthly, ensemble_used: result.ensemble_used });
      } catch (e) {
        console.log('Email skipped (not configured)');
        res.json({ success: true, id, estimatedMonthly, ensemble_used: result.ensemble_used });
      }
    }
  );
});

// Legacy endpoint (B MODE: Ensemble routing)
app.post('/api/inquiries', async (req, res) => {
  const { name, company, email, phone, sqft, duration, details } = req.body;

  if (!name || !company || !email || !phone || !sqft || !duration) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const id = uuidv4();
  const estimatedMonthly = (parseFloat(sqft) * 1.20).toFixed(2);

  // B MODE: Process through ensemble + learning
  const result = await warehouse.processInquiry({
    name, company, email, phone, sqft, duration, details
  });

  db.run(
    'INSERT INTO inquiries (id, name, company, email, phone, sqft, duration, details) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [id, name, company, email, phone, sqft, duration, details],
    async (err) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to save inquiry' });
      }

      try {
        // Send ensemble-generated response
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Industrial Storage Inquiry Received',
          html: `<h2>Thank you for your inquiry!</h2><p>${result.response}</p><p style="font-size:0.8em;color:#666;">Response confidence: ${(result.confidence * 100).toFixed(0)}%</p>`
        });

        console.log(`✓ Inquiry saved: ${id} (ensemble confidence: ${(result.confidence * 100).toFixed(0)}%)`);
        res.json({ success: true, id, estimatedMonthly, ensemble_used: result.ensemble_used });
      } catch (e) {
        console.log('Email skipped (not configured)');
        res.json({ success: true, id, estimatedMonthly, ensemble_used: result.ensemble_used });
      }
    }
  );
});

// Gallery photos
app.get('/api/gallery', (req, res) => {
  if (!fs.existsSync(uploadsDir)) {
    return res.json([]);
  }

  try {
    const files = fs.readdirSync(uploadsDir)
      .filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
      .map(f => ({
        url: '/uploads/' + f,
        name: f
      }));
    res.json(files);
  } catch (e) {
    res.json([]);
  }
});

// Upload photo
app.post('/api/upload-photo', (req, res) => {
  const base64Data = req.body.photoData;
  if (!base64Data) {
    return res.status(400).json({ error: 'No image data' });
  }

  try {
    const matches = base64Data.match(/^data:image\/([a-zA-Z0-9]*);base64,(.+)$/);
    if (!matches) {
      return res.status(400).json({ error: 'Invalid image format' });
    }

    const ext = matches[1] || 'jpg';
    const data = Buffer.from(matches[2], 'base64');
    const filename = 'photo-' + Date.now() + '.' + ext;
    const filepath = path.join(uploadsDir, filename);

    fs.writeFileSync(filepath, data);

    res.json({
      success: true,
      url: '/uploads/' + filename
    });
  } catch (e) {
    res.status(500).json({ error: 'Upload failed: ' + e.message });
  }
});

// Get inquiries (admin)
app.get('/api/inquiries', (req, res) => {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  if (token !== process.env.API_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  db.all('SELECT * FROM inquiries ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch' });
    }
    res.json(rows || []);
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// START
app.listen(PORT, () => {
  console.log('');
  console.log('🏭 Industrial Storage Website');
  console.log('http://localhost:' + PORT);
  console.log('');
});

module.exports = app;
