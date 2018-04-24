function getPercentage(data) {
  let date = new Date();
  let day = Number(date.getUTCDay())
  let currentHour = Number(date.getHours());
  let todaysHours = data.week[day].hours;

  let isClosedToday = todaysHours.length === 0;
  if (isClosedToday) {
    return 0;
  }

  let index = currentHour - Number(todaysHours[0].hour);
  let isClosed = index < 0 || index >= todaysHours.length;

  if (isClosedToday || isClosed) {
    return 0;
  } else {
    return todaysHours[index].percentage;
  }
}

module.exports = getPercentage;
