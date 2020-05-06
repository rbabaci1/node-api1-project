const express = require('express');
const shortid = require('shortid');

const server = express();
const PORT = 5000;

const users = [];

server.get('/users', (req, res) => {
  res.send('test');
});

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
