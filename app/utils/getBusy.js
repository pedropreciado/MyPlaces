const BusyHours = require('busy-hours');
const key = 'AIzaSyCQbp4QicSsS_PtZWRJpBPaOd5jJBY1Dy0';
const Flag = require('./node_colors');
const Place = require('../models/place');

function getPercentage(data) {
  let date = new Date();
  let day = Number(date.getUTCDay())
  let currentHour = Number(date.getHours());
  let todaysHours = data.week[day].hours;

  let isClosedToday = todaysHours.length === 0;
  if (isClosedToday) {
    return 0;
  }
  
  let index = currentHour - Number(todaysHours[0].hour);
  let isClosed = index < 0 || index >= todaysHours.length;

  if (isClosedToday || isClosed) {
    return 0;
  } else {
    return todaysHours[index].percentage;
  }
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
