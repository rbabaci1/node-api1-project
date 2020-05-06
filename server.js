const express = require('express');
const shortid = require('shortid');

const server = express();
const PORT = 5000;

const users = [];

server.use(express.json());

server.post('/api/users', (req, res) => {
  const user = req.body;

  if ('name' in user && 'bio' in user) {
    user.id = shortid.generate();
    const prevLength = users.length;

    users.push(user);
    if (prevLength === users.length) {
      res.status(500).send({
        errorMessage:
          'There was an error while saving the user to the database',
      });
    }
    res.status(201).json(user);
  } else {
    res
      .status(400)
      .send({ errorMessage: 'Please provide name and bio for the user.' });
  }
});

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
