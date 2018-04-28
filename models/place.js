const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.ObjectId;

const PlaceSchema = new mongoose.Schema({
  placeid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String
  },
  busyPercentage: {
    type: Number
  },
  userId: {
    type: ObjectId,
    required: true
  },
  lastUpdated: {
    type: String
  },
  isOpen: {
    type: Boolean
  }
});

const Place = mongoose.model('Place', PlaceSchema);


module.exports = Place;
