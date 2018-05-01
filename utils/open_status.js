
function isOpen(periods) {
  let today = new Date()
  let day = today.getDay();
  let minutes = today.getMinutes();

  minutes = minutes < 10 ? '0' + minutes : minutes;
  let currentTime = `${today.getHours()}${minutes}`

  return currentTime > periods[day].open.time && currentTime <  periods[day].close.time;
}

module.exports = isOpen;
