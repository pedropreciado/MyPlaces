const BusyHours = require('busy-hours');
const key = 'AIzaSyCQbp4QicSsS_PtZWRJpBPaOd5jJBY1Dy0';
const Flag = require('./node_colors');
const Place = require('../models/place');

function getPercentage(data) {
  let date = new Date();
  let day = Number(date.getUTCDay())
  let currentHour = Number(date.getHours());

  return data.busyHours
             .week[day]
             .hours[currentHour - 5];
}


console.log(getPercentage({
  "_id":"5acd46ca99d6eb498c0a9507",
  "placeid":"ChIJNZoFtUd-j4ARJedNpFz-mow",
  "name":"Philz Coffee",
  "isOpen":true,
  "address":"3101 24th St SF, CA 94110",
  "phoneNumber":"415-875-9370",
  "__v":0,
  "busyHours":{
    "status":"ok",
    "week":[
      {"day":"sun",
      "hours":[
        {"hour":"05",
        "percentage":0},
        {"hour":"06","percentage":9},
        {"hour":"07","percentage":28},
        {"hour":"08","percentage":56},
        {"hour":"09","percentage":84},
        {"hour":"10","percentage":97},
        {"hour":"11","percentage":92},
        {"hour":"12","percentage":81},{"hour":"13","percentage":76},{"hour":"14","percentage":78},{"hour":"15","percentage":78},{"hour":"16","percentage":70},{"hour":"17","percentage":53},{"hour":"18","percentage":34},{"hour":"19","percentage":17},{"hour":"20","percentage":0},{"hour":"21","percentage":0},{"hour":"22","percentage":0}]},{"day":"mon","hours":[{"hour":"05","percentage":0},{"hour":"06","percentage":38},{"hour":"07","percentage":64},{"hour":"08","percentage":76},{"hour":"09","percentage":65},{"hour":"10","percentage":45},{"hour":"11","percentage":34},{"hour":"12","percentage":35},{"hour":"13","percentage":41},{"hour":"14","percentage":44},{"hour":"15","percentage":43},{"hour":"16","percentage":37},{"hour":"17","percentage":29},{"hour":"18","percentage":21},{"hour":"19","percentage":12},{"hour":"20","percentage":0},{"hour":"21","percentage":0},{"hour":"22","percentage":0}]},{"day":"tue","hours":[{"hour":"05","percentage":0},{"hour":"06","percentage":40},{"hour":"07","percentage":71},{"hour":"08","percentage":84},{"hour":"09","percentage":69},{"hour":"10","percentage":44},{"hour":"11","percentage":31},{"hour":"12","percentage":31},{"hour":"13","percentage":32},{"hour":"14","percentage":31},{"hour":"15","percentage":32},{"hour":"16","percentage":33},{"hour":"17","percentage":30},{"hour":"18","percentage":23},{"hour":"19","percentage":13},{"hour":"20","percentage":0},{"hour":"21","percentage":0},{"hour":"22","percentage":0}]},{"day":"wed","hours":[{"hour":"05","percentage":0},{"hour":"06","percentage":34},{"hour":"07","percentage":61},{"hour":"08","percentage":76},{"hour":"09","percentage":70},{"hour":"10","percentage":53},{"hour":"11","percentage":39},{"hour":"12","percentage":35},{"hour":"13","percentage":36},{"hour":"14","percentage":37},{"hour":"15","percentage":35},{"hour":"16","percentage":30},{"hour":"17","percentage":24},{"hour":"18","percentage":17},{"hour":"19","percentage":10},{"hour":"20","percentage":0},{"hour":"21","percentage":0},{"hour":"22","percentage":0}]},{"day":"thu","hours":[{"hour":"05","percentage":0},{"hour":"06","percentage":21},{"hour":"07","percentage":48},{"hour":"08","percentage":73},{"hour":"09","percentage":76},{"hour":"10","percentage":59},{"hour":"11","percentage":39},{"hour":"12","percentage":33},{"hour":"13","percentage":36},{"hour":"14","percentage":41},{"hour":"15","percentage":42},{"hour":"16","percentage":37},{"hour":"17","percentage":28},{"hour":"18","percentage":18},{"hour":"19","percentage":9},{"hour":"20","percentage":0},{"hour":"21","percentage":0},{"hour":"22","percentage":0}]},{"day":"fri","hours":[{"hour":"05","percentage":0},{"hour":"06","percentage":34},{"hour":"07","percentage":64},{"hour":"08","percentage":83},{"hour":"09","percentage":77},{"hour":"10","percentage":56},{"hour":"11","percentage":40},{"hour":"12","percentage":34},{"hour":"13","percentage":37},{"hour":"14","percentage":40},{"hour":"15","percentage":43},{"hour":"16","percentage":42},{"hour":"17","percentage":37},{"hour":"18","percentage":28},{"hour":"19","percentage":17},{"hour":"20","percentage":0},{"hour":"21","percentage":0},{"hour":"22","percentage":0}]},{"day":"sat","hours":[{"hour":"05","percentage":0},{"hour":"06","percentage":16},{"hour":"07","percentage":42},{"hour":"08","percentage":75},{"hour":"09","percentage":97},{"hour":"10","percentage":100},{"hour":"11","percentage":91},{"hour":"12","percentage":85},{"hour":"13","percentage":84},{"hour":"14","percentage":82},{"hour":"15","percentage":74},{"hour":"16","percentage":61},{"hour":"17","percentage":45},{"hour":"18","percentage":30},{"hour":"19","percentage":17},{"hour":"20","percentage":0},{"hour":"21","percentage":0},{"hour":"22","percentage":0}]}]}})
)
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


    placeDocument['busyPercentage'] = busyHourData;
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
