'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var PlaceSchema = new mongoose.Schema({
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
  }
});

var Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;