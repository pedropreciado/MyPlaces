'use strict';

var express = require('express');
var router = express.Router();
var Place = require('../models/place');

var _require = require('lodash'),
    merge = _require.merge;

var axios = require('axios');
var mongoose = require('mongoose');

var key = 'AIzaSyCQbp4QicSsS_PtZWRJpBPaOd5jJBY1Dy0';
var Flag = require('../utils/node_colors');
var extractDetails = require('../utils/details_parser');
var getBusyHours = require('../utils/getBusy');
var getPercentage = require('../utils/get_percentage');

router.route('/places').get(function (req, res) {

  console.log('GET PLACES FROM GOOGLE API REQUESTED WITH QUERY: ' + req.query.name, Flag.cyan);

  var params = {
    name: req.query.name,
    location: req.query.location,
    rankby: 'distance'
  };

  axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=' + key, { params: params }).then(function (response) {
    console.log('SUCCESS!', "\x1b[36m");
    console.log(response);
    res.json(response.data.results);
  }).catch(function (err) {
    console.log(err, Flag.red);
    res.send(err);
  });
});

router.route('/favorites').get(function (req, res) {
  console.log(Flag.blue, 'FETCHING FAVORITE PLACES!');

  Place.find({
    'userId': { $in: [mongoose.Types.ObjectId('' + req.query.userId)] }
  }, function (err, places) {
    if (err) console.log(err);

    console.log(Flag.green, 'FAVORITE PLACES SENT!');
    res.json(places);
  });
}).post(function (req, res) {
  console.log(Flag.blue, 'POST PLACE REQUESTED!');

  axios.get('https://maps.googleapis.com/maps/api/place/details/json?' + ('placeid=' + req.query.placeid) + ('&key=' + key)).then(function (response) {
    console.log(Flag.green, 'Response from Google success!');

    var place = new Place(extractDetails(response));

    place['userId'] = req.query.userId;

    console.log(Flag.green, 'Details extracted!');
    console.log(place);

    place.save(function (err) {
      if (err) {
        res.send(err);
      } else {
        Place.find({
          'userId': { $in: [mongoose.Types.ObjectId('' + req.query.userId)] }
        }, function (err, places) {
          if (err) console.log(err);

          console.log(Flag.green, 'FAVORITE PLACES SENT!');
          res.json(places);
        });
      }
    });

    getBusyHours();
  }).catch(function (err) {
    console.log(Flag.red, err);

    res.send(err);
  });
}).delete(function (req, res) {
  console.log(Flag.red, 'DELETE REQUESTED');

  Place.findById(req.query.id, function (err, place) {
    if (err) console.log(Flag.red, err);

    place.remove(function (err, post) {
      console.log(Flag.red, place.name, 'DELETED!');

      res.send(place);
    });
  });
});

module.exports = router;