"use strict";

function getPercentage(data) {
  var date = new Date();
  var day = Number(date.getUTCDay());
  var currentHour = Number(date.getHours());
  var todaysHours = data.week[day].hours;

  var isClosedToday = todaysHours.length === 0;
  if (isClosedToday) {
    return 0;
  }

  var index = currentHour - Number(todaysHours[0].hour);
  var isClosed = index < 0 || index >= todaysHours.length;

  if (isClosedToday || isClosed) {
    return 0;
  } else {
    return todaysHours[index].percentage;
  }
}

module.exports = getPercentage;