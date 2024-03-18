const express = require('express');
const connectDB = require('./config/connection'); 
const userRoutes = require('./routes/userRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');
const reactionRoutes = require('./routes/reactionRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
app.use('/api/reactions', reactionRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Social Network API!');
});

app.use((req, res) => {
  res.status(404).send('404: Page not found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('500: Internal Server Error');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
