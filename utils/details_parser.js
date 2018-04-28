const Flag = require('./node_colors');

function getDetails({ data: { result }}) {
  console.log(Flag.red, 'extracting details...');

  return {
    placeid: result.place_id,
    name: result.name,
    address: result.vicinity,
    isOpen: result.opening_hours.open_now
  }
}

module.exports = getDetails;
