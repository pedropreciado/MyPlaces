// TODO: Fix Invalid request when pinging googleApiPlaceDetails

let express = require('express');
const router = express.Router();
const Place = require('../models/place');
const { merge } = require('lodash');
const key = 'AIzaSyCQbp4QicSsS_PtZWRJpBPaOd5jJBY1Dy0';
const axios = require('axios');
const NodeColors = require('../utils/node_colors');

router.route('/places')
  .get((req, res) => {
    console.log(req.query);

    console.log(
      'GET PLACES FROM GOOGLE API REQUESTED WITH QUERY: ' +
      req.query.name,
      NodeColors.cyan
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
      console.log(err, NodeColors.red);
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

    console.log(NodeColors.red, req.query.placeid);

    axios.get(
      'https://maps.googleapis.com/maps/api/place/details/json?' +
      `placeid=${req.query.placeid}` +
      `&key=${key}`
    )
    .then((response) => {
      console.log(NodeColors.green, 'SUCCESS!');
      // console.log(response);
      res.json(response.data);
    })
    .catch((err) => {
      console.log(NodeColors.red, err);
      res.send(err)
    })
  })

module.exports = router;
