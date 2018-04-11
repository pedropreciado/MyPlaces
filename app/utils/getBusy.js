const BusyHours = require('busy-hours');
const key = 'AIzaSyCQbp4QicSsS_PtZWRJpBPaOd5jJBY1Dy0';
const Flag = require('./node_colors');
const Place = require('../models/place');

async function getBusyHours() {
  let completed = 0;

  let places = await Place.find((err, places) => {
    if (err)
    console.log(Flag.red, err);
  })

  for (var place of places) {
    console.log(Flag.red, `Getting busy hours for: ${place.name}`);

    let busyHourData = await BusyHours(place.placeid, key);
    console.log(Flag.green, `busyHours recieved for: ${place.name}`);

    let placeDocument = await Place.findById(place._id);
    placeDocument['busyHours'] = busyHourData;
    placeDocument.save((err) => {
      if (err)
      console.log(Flag.red, err);;
    })

    console.log(Flag.green, `busyHours added to: ${query.name}`);
    completed++
  }

  console.log(Flag.blue, `Saved ${completed}/${places.length}`);
}

module.exports = getBusyHours;
