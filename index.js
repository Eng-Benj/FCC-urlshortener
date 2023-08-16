require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// MY CODE BELOW HERE
const bodyParser = require('body-parser');
// MY CODE ABOVE HERE

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

// MY CODE BELOW HERE
app.use(bodyParser.urlencoded({ extended: false }));
// MY CODE ABOVE HERE

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

// MY CODE BELOW HERE
let urls = [];

app.post('/api/shorturl', function(req, res) {
  let url = req.body.url
  if (url.substr(0,8)!="https://") {
    res.json({ error: 'invalid url' });
    return
  }
  if (!urls.includes(url)) {
    urls.push(url)
  }
  let shortUrl = urls.indexOf(url) + 1
  res.json({original_url: url, short_url: shortUrl});
});

app.get('/api/shorturl/:short_url', function (req, res) {
  res.redirect(urls[req.params.short_url - 1])
});
// MY CODE ABOVE HERE