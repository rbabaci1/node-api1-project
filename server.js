const express = require('express');
const userRoutes = require('./users/userRoutes');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/api/users', userRoutes);
app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
