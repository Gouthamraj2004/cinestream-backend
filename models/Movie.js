const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true }, // 'movie', 'series', 'show'
  genre: { type: String, required: true },
  year: { type: Number, required: true },
  poster: { type: String },    
  description: { type: String },
  rating: { type: Number, default: 0 }, 
});

module.exports = mongoose.model('Movie', movieSchema);
