
function isOpen(periods) {
  let today = new Date();
  let day = today.getDay();
  let minutes = today.getMinutes();
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let currentTime = `${today.getHours()}${minutes}`


  let todaysPeriod = false;
  for (let i = 0; i < periods.length; i++) {
    let period = periods[i];

    if (period.open.day === day) {

      todaysPeriod = period;
      console.log(todaysPeriod);
      break;
    }
  }

  if (!todaysPeriod) {
    return false;
  }

  if (!periods[day]) {
    return;
  }

  let result = currentTime > periods[day].open.time && currentTime <  periods[day].close.time;
  console.log(' isopen?: ', result);
  return result;
}

module.exports = isOpen;
