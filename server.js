const express = require('express');
const shortid = require('shortid');

const server = express();
const PORT = 5000;

const users = [];

server.use(express.json());

server.post('/api/users', (req, res) => {
  const reqs = req;

  console.log(reqs);
});

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
