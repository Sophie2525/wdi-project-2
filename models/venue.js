const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  title: {type: String, trim: true, required: true},
  description: {type: String, trim: true},
  image: {type: String, trim: true, unique: true},
  location: {type: String, trim: true, unique: true},
  lat: {type: String, trim: true, unique: true},
  lang: {type: String, trim: true, unique: true}
}, {
  timestamps: true
});

module.exports = mongoose.model('Venue', venueSchema);
