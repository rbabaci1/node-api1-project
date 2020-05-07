// implement your API here
const express = require('express');
const shortid = require('shortid');

const server = express();
const PORT = 5000;

let users = [];

server.use(express.json());

server.post('/api/users', (req, res) => {
  const user = req.body;

  if ('name' in user && 'bio' in user) {
    user.id = shortid.generate();
    const prevLength = users.length;

    users.push(user);
    if (prevLength === users.length) {
      res.status(500).json({
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

server.get('/api/users', (req, res) => {
  res.status(200).json(users);
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;

  const found = users.find((user) => user.id === id);

  if (found) {
    res.status(200).json(found);
  } else {
    res
      .status(404)
      .json({ message: 'The user with the specified ID does not exist.' });
  }
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  const found = users.find((user) => user.id === id);

  if (found) {
    users = users.filter((user) => user.id !== found.id);

    res.status(200).json(found);
  } else {
    res
      .status(404)
      .json({ message: 'The user with the specified ID does not exist.' });
  }
});

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
