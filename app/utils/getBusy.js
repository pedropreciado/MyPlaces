const BusyHours = require('busy-hours');
const key = 'AIzaSyCQbp4QicSsS_PtZWRJpBPaOd5jJBY1Dy0';
const Flag = require('./node_colors');
const Place = require('../models/place');

async function getBusyHours(places) {
  let placesLeft = places.length;
  let completed = 0;

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
//
getBusyHours([
    {
        "_id": "5acd46ca99d6eb498c0a9507",
        "placeid": "ChIJNZoFtUd-j4ARJedNpFz-mow",
        "name": "Philz Coffee",
        "isOpen": true,
        "address": "3101 24th St SF, CA 94110",
        "phoneNumber": "415-875-9370",
        "__v": 0
    },
    {
        "_id": "5acd4b1310c1394a24ed9f28",
        "placeid": "ChIJiwOc1iJ-j4ARmtSY2tM29G0",
        "name": "Mau",
        "isOpen": false,
        "address": "665 Valencia St SF, CA 94110",
        "phoneNumber": "415-934-8889",
        "__v": 0
    }
]);
//
module.exports = getBusyHours;
