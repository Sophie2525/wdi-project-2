const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  title: {type: String, trim: true, required: true},
  description: {type: String, trim: true},
  // video: {type: String, trim: true, unique: true},
  image: {type: String, trim: true, unique: true},
  location: {type: String, trim: true, unique: true},
  lat: {type: String, trim: true, unique: true},
  lng: {type: String, trim: true, unique: true},
  comments: [{
    body: { type: String, trim: true, required: true },
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
  }, {
    timestamps: true
  }]
});

module.exports = mongoose.model('Venue', venueSchema);
