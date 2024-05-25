const mongoose = require('mongoose');

const MemeSchema = new mongoose.Schema({
  imageUrl: String,
  text: String,
});

module.exports = mongoose.model('Meme', MemeSchema);
