const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const watchlistRoutes = require('./routes/watchlist');
const movieRoutes = require('./routes/movie');
const authRoutes = require('./routes/auth'); 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/movies', movieRoutes);

// Updated MongoDB Atlas URI using your credentials
const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://gouthamraj318:Gouthamraj@2904@cluster0.xsw3bk9.mongodb.net/cinestream?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
