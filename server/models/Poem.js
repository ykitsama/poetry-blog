const mongoose = require('mongoose');

const PoemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, default: 'Anonymous' },
  content: { type: String, required: true },
  tags: [String],
  imageUrl: { type: String },  // 👈 NEW field for image
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Poem', PoemSchema);

