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
  user_id: {
    type: ObjectId,
    required: true
  }
});

const Place = mongoose.model('Place', PlaceSchema);


module.exports = Place;
