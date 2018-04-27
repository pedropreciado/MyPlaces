const BusyHours = require('busy-hours');
const key = process.env.GOOGLE_API_KEY || 'AIzaSyCQbp4QicSsS_PtZWRJpBPaOd5jJBY1Dy0';
const Flag = require('./node_colors');
const Place = require('../models/place');
const getPercentage = require('./get_percentage');
const regeneratorRuntime = require("regenerator-runtime");


async function getBusyHours() {
  let completed = 0;

  let places = await Place.find((err, places) => {
    if (err)
    console.log(Flag.red, err);
  })

  let busyPromises = [];

  for (var place of places) {
    // console.log(Flag.red, `Getting busy hours for: ${place.name}`);

    let busyHourData = await BusyHours(place.placeid, process.env.GOOGLE_API_KEY);
    console.log(Flag.green, `busyHours recieved for: ${place.name}`);

    let placeDocument = await Place.findById(place._id);

    placeDocument['busyPercentage'] = getPercentage(busyHourData);
    placeDocument['lastUpdated'] = new Date().toString();

    placeDocument.save((err) => {
      if (err);
      console.log(Flag.red, err);
    })

    // console.log(Flag.green, `busyHours added to: ${placeDocument.name}`);
    completed++;
  }


  // console.log(Flag.blue, `Saved ${completed}/${places.length} places!`);
  console.log(Flag.green, 'Received and saved busyHours!');
}

module.exports = getBusyHours;
