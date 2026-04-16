require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('Starting server...');
console.log('PORT:', PORT);
console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✓ Set' : '✗ Missing');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✓ Set' : '✗ Missing');

// Create uploads directory on startup
const uploadsDir = path.join(__dirname, 'uploads');
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('✓ Uploads directory created');
  }
} catch (e) {
  console.log('⚠ Could not create uploads dir (may be read-only on hosting):', e.message);
}

// DATABASE SETUP - Handle Railway's read-only filesystem
let db;
try {
  const dbPath = process.env.DATABASE_PATH || path.join(__dirname, 'inquiries.db');
  console.log('Database path:', dbPath);
  
  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Database connection error:', err);
    } else {
      console.log('✓ Database connected');
    }
  });

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
    `, (err) => {
      if (err) {
        console.error('Table creation error:', err);
      } else {
        console.log('✓ Database table ready');
      }
    });
  });
} catch (e) {
  console.error('Database setup error:', e);
}

// EMAIL SETUP
let transporter;
try {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  console.log('✓ Email transporter configured');
} catch (e) {
  console.error('Email setup error:', e);
}

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

// Health check (first endpoint)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    email_configured: !!process.env.EMAIL_USER,
    port: PORT
  });
});

// Submit inquiry
app.post('/api/inquiry', async (req, res) => {
  try {
    const { name, company, email, phone, sqft, details } = req.body;

    if (!name || !company || !email || !phone || !sqft) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const id = uuidv4();
    const estimatedMonthly = (parseFloat(sqft) * 1.20).toFixed(2);

    if (!db) {
      console.log('Database not available, returning success anyway');
      return res.json({ success: true, id, estimatedMonthly, note: 'Database unavailable' });
    }

    db.run(
      'INSERT INTO inquiries (id, name, company, email, phone, sqft, duration, details) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, name, company, email, phone, sqft, 'flexible', details],
      async (err) => {
        if (err) {
          console.error('Database error:', err);
        }

        try {
          if (transporter && process.env.EMAIL_USER) {
            // Send confirmation email to customer
            await transporter.sendMail({
              from: process.env.EMAIL_USER,
              to: email,
              subject: 'Industrial Storage Inquiry Received',
              html: `<h2>Thank you for your inquiry, ${name}!</h2><p>We received your request for ${sqft} sqft of warehouse space. Our team will contact you within 1 hour with pricing and availability information.</p><p>Estimated monthly cost: <strong>$${estimatedMonthly}</strong> at $1.20/sqft</p><p style="font-size:0.8em;color:#666;">Questions? Call us at (614) 555-2882</p>`
            });

            // Send notification to owner
            await transporter.sendMail({
              from: process.env.EMAIL_USER,
              to: process.env.OWNER_EMAIL,
              subject: `New Storage Inquiry from ${company}`,
              html: `<h3>New Inquiry</h3><p><strong>Name:</strong> ${name}</p><p><strong>Company:</strong> ${company}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Square Footage:</strong> ${sqft}</p><p><strong>Details:</strong> ${details || 'None'}</p><p><strong>Estimated Cost:</strong> $${estimatedMonthly}/month</p>`
            });

            console.log(`✓ Inquiry saved and emails sent: ${id}`);
          } else {
            console.log(`✓ Inquiry saved (email not configured): ${id}`);
          }
        } catch (e) {
          console.error('Email error:', e.message);
        }

        res.json({ success: true, id, estimatedMonthly });
      }
    );
  } catch (e) {
    console.error('Inquiry handler error:', e);
    res.status(500).json({ error: 'Server error: ' + e.message });
  }
});

// Get inquiries (admin)
app.get('/api/inquiries', (req, res) => {
  try {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (token !== process.env.API_TOKEN) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!db) {
      return res.json({ error: 'Database unavailable' });
    }

    db.all('SELECT * FROM inquiries ORDER BY created_at DESC', (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch' });
      }
      res.json(rows || []);
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// START SERVER
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('===================================');
  console.log('🏭 Industrial Storage Website');
  console.log('===================================');
  console.log('Server running on port:', PORT);
  console.log('Visit: http://localhost:' + PORT);
  console.log('Health check: http://localhost:' + PORT + '/api/health');
  console.log('');
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    if (db) db.close();
    process.exit(0);
  });
});

module.exports = app;
