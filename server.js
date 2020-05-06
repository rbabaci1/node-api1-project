const express = require('express');
const shortid = require('shortid');

const server = express();
const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
