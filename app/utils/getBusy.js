const BusyHours = require('busy-hours');
const key = 'AIzaSyCQbp4QicSsS_PtZWRJpBPaOd5jJBY1Dy0';
const Flag = require('./node_colors');
const Place = require('../models/place');

function getBusyHours(places) {
  for (var place of places) {
    console.log(Flag.red, `Getting busy hours for: ${place.name}`);

    BusyHours(place.placeid, key).then((data) => {
      console.log(Flag.green, `busyHours recieved for: ${place.name}`);
      let dataString = JSON.stringify(data);

      Place.findById(place._id, (err, place) => {
        console.log(place);
        if (err) {
          console.log(Flag.red, err);
          return;
        }

        console.log(place);

        place['busyHours'] = dataString;
        place.save((err) => {
          if (err)
          console.log(Flag.red, err);;
        })
      })

      console.log(Flag.green, `busyHours added to: ${place.name}`);
    })
  }

}
//
// getBusyHours([
//     {
//         "_id": "5acb0152c7ebdd2e342d6444",
//         "placeid": "ChIJNZoFtUd-j4ARJedNpFz-mow",
//         "name": "Philz Coffee",
//         "isOpen": false,
//         "address": "3101 24th St SF, CA 94110",
//         "phoneNumber": "415-875-9370",
//         "__v": 0
//     }
// ]);
//
module.exports = getBusyHours;
