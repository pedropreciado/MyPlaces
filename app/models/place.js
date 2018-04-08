const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
  place_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  open: {
    type: Boolean
  }
});

const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;
