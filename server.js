const express = require('express');
const cors = require('cors');
const { find, findById, insert, update, remove } = require('./data/db.js');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.post('/api/users', async (req, res) => {
  const user = req.body;

  if ('name' in user && 'bio' in user) {
    try {
      const { id } = await insert(user);
      const createdUser = await findById(id);

      res.status(201).json(createdUser);
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

app.get('/api/users', async (req, res) => {
  try {
    const users = await find();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      errorMessage: 'The users information could not be retrieved.',
    });
  }
});

app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const found = await findById(id);

    if (found) {
      res.status(200).json(found);
    } else {
      res
        .status(404)
        .json({ message: 'The user with the specified ID does not exist.' });
    }
  } catch (err) {
    res.status(500).json({
      errorMessage: 'The users information could not be retrieved.',
    });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const found = await findById(id);

    if (found) {
      await remove(id);
      res.status(200).json({ deleted: found });
    } else {
      res
        .status(404)
        .json({ message: 'The user with the specified ID does not exist.' });
    }
  } catch (err) {
    res.status(500).json({ errorMessage: 'The user could not be removed' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if ('name' in changes && 'bio' in changes) {
    try {
      const found = await findById(id);

      if (found) {
        const updatedUser = Object.assign(found, changes);

        await update(id, changes);
        res.status(200).json(updatedUser);
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    } catch (err) {
      res
        .status(500)
        .json({ errorMessage: 'The user information could not be modified.' });
    }
  } else {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
