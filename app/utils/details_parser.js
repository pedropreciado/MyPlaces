const Flag = require('./node_colors');

function getDetails({ data: { result } }) {
  console.log(Flag.red, 'extracting details...');
  let adrObj = {}

  result.address_components.forEach((comp) => {
    adrObj[comp.types[0]] = comp.short_name
  })

  let address = adrObj['street_number'] + ' ' +
                adrObj['route'] + ' ' +
                adrObj['locality'] + ', ' +
                adrObj['administrative_area_level_1'] + ' ' +
                adrObj['postal_code']

  return {
    placeid: result.place_id,
    name: result.name,
    isOpen: result.opening_hours.open_now,
    address,
    phoneNumber: result.international_phone_number.slice(3)
  }
}

module.exports = getDetails;
