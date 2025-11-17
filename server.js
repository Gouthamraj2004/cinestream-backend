const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const watchlistRoutes = require('./routes/watchlist');
const authRoutes = require('./routes/auth'); 


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/watchlist', watchlistRoutes);

// Connect to MongoDB (replace <DB_CONN_STRING>)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cinestream', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB error:', err));

// Routes
const movieRoutes = require('./routes/movie');
app.use('/api/movies', movieRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
