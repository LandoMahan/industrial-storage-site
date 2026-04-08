require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── DATABASE SETUP ───────────────────────────────────────────────────────────

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

// ─── EMAIL SETUP ──────────────────────────────────────────────────────────────

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ─── MIDDLEWARE ────────────────────────────────────────────────────────────────

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files (index.html, styles.css, script.js)
app.use(express.static(path.join(__dirname)));

// ─── ROUTES ───────────────────────────────────────────────────────────────────

// Homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API: Submit inquiry
app.post('/api/inquiries', async (req, res) => {
  const { name, company, email, phone, sqft, duration, details } = req.body;

  // Validate
  if (!name || !company || !email || !phone || !sqft || !duration) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const id = uuidv4();
  const estimatedMonthly = (parseFloat(sqft) * 1.20).toFixed(2);

  // Save to database
  db.run(
    'INSERT INTO inquiries (id, name, company, email, phone, sqft, duration, details) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [id, name, company, email, phone, sqft, duration, details],
    async (err) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to save inquiry' });
      }

      // Send email notifications
      try {
        const customerEmailHtml = buildCustomerEmail(name, sqft, duration, estimatedMonthly);
        const ownerEmailHtml = buildOwnerEmail(name, company, email, phone, sqft, duration, estimatedMonthly, details);

        // Email to customer
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Industrial Storage Inquiry Received',
          html: customerEmailHtml
        });

        // Email to owner
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.OWNER_EMAIL,
          subject: 'New Storage Inquiry: ' + company,
          html: ownerEmailHtml
        });

        console.log('✓ Inquiry saved:', id);
        res.status(200).json({ success: true, id, estimatedMonthly });
      } catch (emailErr) {
        console.error('Email error:', emailErr);
        res.status(200).json({ success: true, id, estimatedMonthly, note: 'Inquiry saved (email notification may have failed)' });
      }
    }
  );
});

// Email builders
function buildCustomerEmail(name, sqft, duration, estimatedMonthly) {
  const html = '<h2>Thank You for Your Inquiry</h2>' +
    '<p>Hi ' + name + ',</p>' +
    '<p>We received your inquiry for industrial storage space in Grove City, Ohio.</p>' +
    '<p><strong>Your Details:</strong></p>' +
    '<ul>' +
    '<li>Space Needed: ' + sqft + ' sq ft</li>' +
    '<li>Duration: ' + duration + '</li>' +
    '<li>Estimated Monthly Cost: $' + estimatedMonthly + '</li>' +
    '</ul>' +
    '<p>We will be in touch shortly with availability and next steps.</p>' +
    '<p>Best regards,<br/>Industrial Storage Team</p>';
  return html;
}

function buildOwnerEmail(name, company, email, phone, sqft, duration, estimatedMonthly, details) {
  const html = '<h2>New Storage Inquiry</h2>' +
    '<p><strong>Contact:</strong> ' + name + ' (' + company + ')</p>' +
    '<p><strong>Email:</strong> ' + email + '</p>' +
    '<p><strong>Phone:</strong> ' + phone + '</p>' +
    '<p><strong>Space Needed:</strong> ' + sqft + ' sq ft</p>' +
    '<p><strong>Duration:</strong> ' + duration + '</p>' +
    '<p><strong>Estimated Monthly:</strong> $' + estimatedMonthly + '</p>' +
    '<p><strong>Details:</strong><br/>' + (details || 'N/A') + '</p>';
  return html;
}

// API: Get all inquiries (for dashboard)
app.get('/api/inquiries', (req, res) => {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  if (token !== process.env.API_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  db.all('SELECT * FROM inquiries ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch inquiries' });
    }
    res.json(rows);
  });
});

// API: Update inquiry status
app.patch('/api/inquiries/:id', (req, res) => {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  if (token !== process.env.API_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.params;
  const { status } = req.body;

  db.run(
    'UPDATE inquiries SET status = ? WHERE id = ?',
    [status, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to update inquiry' });
      }
      res.json({ success: true });
    }
  );
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── START ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log('');
  console.log('🏭 ════════════════════════════════════════════════════════════════════');
  console.log('   INDUSTRIAL STORAGE WEBSITE');
  console.log('   Grove City, Ohio | 50,000 sq ft | Short-Term Leasing');
  console.log('🏭 ════════════════════════════════════════════════════════════════════');
  console.log('');
  console.log('   Website:   http://localhost:' + PORT);
  console.log('   Inquiries: POST http://localhost:' + PORT + '/api/inquiries');
  console.log('   Health:    http://localhost:' + PORT + '/api/health');
  console.log('');
  console.log('   Database:  SQLite (inquiries.db)');
  console.log('   Email:     ' + (process.env.EMAIL_USER ? 'configured' : 'NOT configured'));
  console.log('');
});

module.exports = app;
