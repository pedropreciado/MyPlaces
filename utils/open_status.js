
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
      break;
    }
  }

  if (!todaysPeriod) {
    return false;
  }

  if (!periods[day]) {
    return;
  }

  let open = periods[day].open.time
  let close = periods[day].close.time

  if (close < open) {
    return currentTime > open || currentTime < close;
  } else {
    return currentTime > open && currentTime < close;
  }
}

module.exports = isOpen;
