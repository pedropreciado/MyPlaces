const io = require('socket.io')();
const Place = require('../models/place');
const Flag = require('../utils/node_colors');

function initializeSocket(interval, cb) {
  // io.on('getPlaces', (client) => {
  //   client.on('getFavorites', () => {
  //     setInterval(() => {
  //       Place.find((err, places) => {
  //         if (err)
  //         console.log(Flag.red, err);
  //         client.emit('favorites', places);
  //       }, 1000 * 20)
  //     })
  //   })
  // })

}

module.exports = initializeSocket;
