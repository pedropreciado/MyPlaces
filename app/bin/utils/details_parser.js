'use strict';

var Flag = require('./node_colors');

function getDetails(_ref) {
  var result = _ref.data.result;

  console.log(Flag.red, 'extracting details...');

  return {
    placeid: result.place_id,
    name: result.name,
    address: result.vicinity
  };
}

module.exports = getDetails;