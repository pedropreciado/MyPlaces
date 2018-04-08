let express = require('express');
const router = express.Router();
const Place = require('../models/place');
const { merge } = require('lodash');
const key = 'AIzaSyAuID19sxhCthckUbYSJLihvs9daXytRag';
const axios = require('axios');

router.route('/places')
  .get((req, res) => {
    console.log(req.query);

    console.log(
      'GET PLACES FROM GOOGLE API REQUESTED WITH QUERY: ' +
      req.query.name,
      "\x1b[36m"
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
      console.log(response.data.results);
      res.json(response.data.results);

    })
    .catch((err) => {
      console.log(err, "\x1b[31m");
      res.send(err);
    })
  })


router.route('/favorites')
  .get((req, res) => {
    console.log('GET ALL PLACES REQUESTED!');

    Place.find((err, places) => {
      if (err)
      res.send();
      res.json(places);
    });
  })
  .post((req, res) => {
    let place = new Place();

    let params = {
      placeid: req.body.placeid,
      key
    }

    axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`,
      params
    )
    .then((response) => {
      console.log(response);
    })
  })

module.exports = router;
