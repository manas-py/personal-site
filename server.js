// server.js
// Minimal Node/Express app to accept POST /api/signup and append to signup.txt
// Usage:
//   npm init -y
//   npm i express body-parser
//   node server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json({ limit: '10kb' }));

const SIGNUP_PATH = path.join(__dirname, 'signup.txt');

app.post('/api/signup', (req, res) => {
  const { email } = req.body || {};
  if(!email || typeof email !== 'string') return res.status(400).json({ ok:false, error:'invalid' });
  const line = `${(new Date()).toISOString()}\t${email}\n`;
  fs.appendFile(SIGNUP_PATH, line, err => {
    if(err) {
      console.error('write error', err);
      return res.status(500).json({ ok:false });
    }
    return res.json({ ok:true });
  });
});

// serve static files (for quick local testing)
app.use(express.static(path.join(__dirname)));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening', port));
