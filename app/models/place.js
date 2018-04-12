const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
  placeid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  isOpen: {
    type: Boolean
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  busyPercentage: {
    type: Number
  }
});

const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;
