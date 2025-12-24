// server.js
// Minimal Node/Express server for:
// - POST /api/signup          (append newsletter emails to files/sign.txt)
// - GET  /api/archive/list    (list archive posts from /archive)
// - GET  /archive/:filename   (serve a single archived post)
//
// Local usage:
//   npm install
//   npm start
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

// Enable CORS for all routes (needed when deployed)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(bodyParser.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: true }));

const SIGNUP_PATH = path.join(__dirname, 'files', 'sign.txt');

// Ensure directories exist
const filesDir = path.join(__dirname, 'files');
const archiveDir = path.join(__dirname, 'archive');
if (!fs.existsSync(filesDir)) {
  fs.mkdirSync(filesDir, { recursive: true });
}
if (!fs.existsSync(archiveDir)) {
  fs.mkdirSync(archiveDir, { recursive: true });
}

// Newsletter signup endpoint - appends email to files/sign.txt
app.post('/api/signup', (req, res) => {
  const { email } = req.body || {};

  if (!email || typeof email !== 'string') {
    console.error('Invalid email received:', email);
    return res.status(400).json({ ok: false, error: 'invalid email' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const normalizedEmail = email.toLowerCase().trim();

  if (!emailRegex.test(normalizedEmail)) {
    console.error('Invalid email format:', normalizedEmail);
    return res.status(400).json({ ok: false, error: 'invalid email format' });
  }

  // Append email to sign.txt (one email per line)
  const emailLine = `${normalizedEmail}\n`;
  fs.appendFile(SIGNUP_PATH, emailLine, { encoding: 'utf8' }, err => {
    if (err) {
      console.error('Error writing to sign.txt:', err);
      return res.status(500).json({ ok: false, error: 'failed to save email' });
    }
    console.log(`✓ New signup saved to files/sign.txt: ${normalizedEmail}`);
    return res.json({ ok: true });
  });
});

// Archive listing endpoint - lists all text files from archive folder
app.get('/api/archive/list', (req, res) => {
  const archiveDir = path.join(__dirname, 'archive');

  // Ensure archive directory exists
  if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir, { recursive: true });
    return res.json({ files: [] });
  }

  fs.readdir(archiveDir, { withFileTypes: true }, (err, entries) => {
    if (err) {
      console.error('Archive read error', err);
      return res.status(500).json({ error: 'Failed to read archive', files: [] });
    }

    const files = [];
    entries.forEach(entry => {
      if (entry.isFile() && /\.(txt|md|html)$/i.test(entry.name)) {
        const filePath = path.join(archiveDir, entry.name);
        try {
          const stats = fs.statSync(filePath);
          files.push({
            name: entry.name,
            date: stats.mtime.toISOString(), // Convert to ISO string for JSON
            title: entry.name.replace(/\.(txt|md|html)$/i, '').replace(/_/g, ' ').replace(/-/g, ' ')
          });
        } catch (statErr) {
          console.error(`Error getting stats for ${entry.name}:`, statErr);
        }
      }
    });

    // Sort by date (newest first)
    files.sort((a, b) => new Date(b.date) - new Date(a.date));

    console.log(`Archive list: Found ${files.length} file(s)`);
    res.json({ files });
  });
});

// Serve individual archive files
app.get('/archive/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'archive', filename);

  // Security: prevent directory traversal
  if (filename.includes('..') || filename.includes('/')) {
    return res.status(400).send('Invalid filename');
  }

  // Only serve text files
  if (!/\.(txt|md|html)$/i.test(filename)) {
    return res.status(400).send('Invalid file type');
  }

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found');
  }
});

// serve static files (MUST be last, after API routes)
app.use(express.static(path.join(__dirname)));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`\n✓ Server listening on port ${port}`);
  console.log(`  Site: http://localhost:${port}`);
  console.log(`  Archive API: http://localhost:${port}/api/archive/list`);
  console.log(`  Signup API: http://localhost:${port}/api/signup`);
  console.log(`\n⚠ IMPORTANT: Use this server (port ${port}), not http-server!\n`);
});
