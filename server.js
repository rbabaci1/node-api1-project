const express = require('express');
const cors = require('cors');
const userRoutes = require('./users/userRoutes');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/api/users', userRoutes);
app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
