const BusyHours = require('busy-hours');
const key = 'AIzaSyCQbp4QicSsS_PtZWRJpBPaOd5jJBY1Dy0';
const Flag = require('./node_colors');
const Place = require('../models/place');

function getPercentage(data) {
  let date = new Date();
  let day = Number(date.getUTCDay())
  let currentHour = Number(date.getHours());

  return data.week[day]
             .hours[currentHour - 5].percentage;
}

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

    placeDocument['busyPercentage'] = getPercentage(busyHourData);
    placeDocument.save((err) => {
      if (err)
      console.log(Flag.red, err);;
    })

    console.log(Flag.green, `busyHours added to: ${placeDocument.name}`);
    completed++
  }

  console.log(Flag.blue, `Saved ${completed}/${places.length} places!`);
  console.log(Flag.green, 'Received and saved busyHours!');
}

module.exports = getBusyHours;
