const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {type: String, trim: true, required: true},
  description: {type: String, trim: true},
  video: {type: String, trim: true},
  location: {type: String, trim: true}
}, {
  timestamps: true
});

module.exports = mongoose.model('Video', videoSchema);
