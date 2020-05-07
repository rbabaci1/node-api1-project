const express = require('express');
const shortid = require('shortid');

const server = express();
const { find, findById, insert, update, remove } = require('./data/db.js');
const PORT = 5000;

server.use(express.json());

server.post('/api/users', async (req, res) => {
  const user = req.body;

  if ('name' in user && 'bio' in user) {
    try {
      const { id } = await insert(user);
      const addedUser = await findById(id);

      res.status(201).json(addedUser);
    } catch (err) {
      res.status(500).json({
        errorMessage:
          'There was an error while saving the user to the database',
      });
    }
  } else {
    res
      .status(400)
      .send({ errorMessage: 'Please provide name and bio for the user.' });
  }
});

server.get('/api/users', async (req, res) => {
  const users = await find();

  res.status(200).json(users);
});

server.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  const found = await findById(Number(id));

  if (found) {
    res.status(200).json(found);
  } else {
    res
      .status(404)
      .json({ message: 'The user with the specified ID does not exist.' });
  }
});

server.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
});

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
