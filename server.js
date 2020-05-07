const express = require('express');
const shortid = require('shortid');

const server = express();
const PORT = 5000;

let users = [];

server.use(express.json());

server.post('/api/users', (req, res) => {
  const newUser = req.body;

  if ('name' in newUser && 'bio' in newUser) {
    newUser.id = shortid.generate();

    users.push(newUser);
    res.status(201).json(newUser);
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

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  const foundIndex = users.findIndex((user) => user.id === id);

  if (foundIndex !== -1) {
    if ('name' in updatedUser && 'bio' in updatedUser) {
      users[foundIndex] = { id, ...updatedUser };

      res.status(200).json(users[foundIndex]);
    } else {
      res
        .status(400)
        .json({ errorMessage: 'Please provide name and bio for the user.' });
    }
  } else {
    res
      .status(404)
      .json({ message: 'The user with the specified ID does not exist.' });
  }
});

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
