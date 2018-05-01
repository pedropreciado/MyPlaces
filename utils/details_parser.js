const openStatus = require('./open_status');
const Flag = require('./node_colors');

function getDetails({ data: { result }}) {
  console.log(Flag.red, 'extracting details...');

  return {
    placeid: result.place_id,
    name: result.name,
    address: result.vicinity,
    isOpen: openStatus(result.opening_hours.periods),
    periods: result.opening_hours.periods
  }
}

module.exports = getDetails;
