let express = require('express');
const router = express.Router();
const Place = require('../models/place');
const { merge } = require('lodash');
const axios = require('axios');
const mongoose = require('mongoose');

const key = 'AIzaSyCQbp4QicSsS_PtZWRJpBPaOd5jJBY1Dy0';
const Flag = require('../utils/node_colors');
const extractDetails = require('../utils/details_parser');
const getBusyHours = require('../utils/getBusy');
const getPercentage = require('../utils/get_percentage');

router.route('/places')
  .get((req, res) => {
    console.log(req.query);

    console.log(
      'GET PLACES FROM GOOGLE API REQUESTED WITH QUERY: ' +
      req.query.name,
      Flag.cyan
   );

    let params = {
      name: req.query.name,
      location: req.query.location,
      rankby: 'distance',
    }

    axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${key}`,
      { params }
    )
    .then((response) => {
      console.log('SUCCESS!', "\x1b[36m");

      res.json(response.data.results);
    })
    .catch((err) => {
      console.log(err, Flag.red);
      res.send(err);
    })
  })

router.route('/favorites')
  .get((req, res) => {
    console.log(Flag.blue, 'FETCHING FAVORITE PLACES!');
    console.log(req.query);

    Place.find({
    'userId ': { $in: [
        mongoose.Types.ObjectId(`${req.query.userId}`),
    ]}
  }, (err, places) => {
      if (err)
      console.log(docs);

      console.log(Flag.green, 'FAVORITE PLACES SENT!');
      res.json(places);
    });
  })
  .post((req, res) => {
    console.log(Flag.blue, 'POST PLACE REQUESTED!');

    axios.get(
      'https://maps.googleapis.com/maps/api/place/details/json?' +
      `placeid=${req.query.placeid}` +
      `&key=${key}`
    )
    .then((response) => {
      console.log(Flag.green, 'Response from Google success!');

      let place = new Place(extractDetails(response));

      place['userId'] = req.query.userId;

      console.log(Flag.green, 'Details extracted!');
      console.log(place);

      place.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.json(place);
        }
      });

      getBusyHours();
    })
    .catch((err) => {
      console.log(Flag.red, err);

      res.send(err)
    })
  })
  .delete((req, res) => {
    console.log(Flag.red, 'DELETE REQUESTED');
    Place.findById(req.query.id, (err, place) => {
      place.remove((err, post) => {
        console.log(Flag.red, place.name, 'DELETED!');

        res.send(place);
      })
    })
  })

module.exports = router;
