const BusyHours = require('busy-hours');
const key = 'AIzaSyCQbp4QicSsS_PtZWRJpBPaOd5jJBY1Dy0';
const Flag = require('./node_colors');
const Place = require('../models/place');

async function getBusyHours() {
  let placesLeft = places.length;
  let completed = 0;

  let places = await Place.find((err, places) => {
    if (err)
    console.log(Flag.red, err);
    console.log(places);

    res.json(places);
  })
  
  for (var place of places) {
    console.log(Flag.red, `Getting busy hours for: ${place.name}`);

    let data = await BusyHours(place.placeid, key);
    console.log(Flag.green, `busyHours recieved for: ${place.name}`);

    let query = await Place.findById(place._id);

    query['busyHours'] = data;

    query.save((err) => {
      if (err)
      console.log(Flag.red, err);;
    })

    console.log(Flag.green, `busyHours added to: ${query.name}`);
    completed++
  }

  console.log(Flag.green, `Set busy hours for ${completed}/${places.length} places!!`);
}

module.exports = getBusyHours;
