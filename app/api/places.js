let express = require('express');
const router = express.Router();
const Place = require('../models/place');
const { merge } = require('lodash');
const axios = require('axios');

const key = 'AIzaSyCQbp4QicSsS_PtZWRJpBPaOd5jJBY1Dy0';
const Flag = require('../utils/node_colors');
const extractDetails = require('../utils/details_parser');

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
    console.log('GET ALL PLACES REQUESTED!');

    Place.find((err, places) => {
      if (err)
      console.log(Flag.red, err);
      console.log(places);

      res.json(places);
    });
  })
  .post((req, res) => {

    console.log(Flag.green, 'POST Place requested!');

    axios.get(
      'https://maps.googleapis.com/maps/api/place/details/json?' +
      `placeid=${req.query.placeid}` +
      `&key=${key}`
    )
    .then((response) => {
      console.log(Flag.green, 'Response from Google success!');

      let place = new Place(extractDetails(response));

      console.log(Flag.green, 'Details extracted!');

      place.save((err) => {
        if (err)
        res.send(err);
        res.json({
          message: 'Place successfully added!',
          place
        })
      })
    })
    .catch((err) => {
      console.log(Flag.red, err);

      res.send(err)
    })
  })

module.exports = router;
