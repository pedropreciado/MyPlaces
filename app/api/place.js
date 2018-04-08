let express = require('express');
const router = express.Router();
const Place = require('../models/place');
import 'lodash/merge' from "lodash";


router.route('/places')
  .get((req, res) => {
    let params = {
      name: req.body.name,
      location: req.body.location,
      rankby: 'prominence'
    }

    axios(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${key}&`,
      params
    )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
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
    
  })
