'use strict';

var getBusyHours = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var completed, places, busyPromises, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, place, busyHourData, placeDocument;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            completed = 0;
            _context.next = 3;
            return Place.find(function (err, places) {
              if (err) console.log(Flag.red, err);
            });

          case 3:
            places = _context.sent;
            busyPromises = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 8;
            _iterator = places[Symbol.iterator]();

          case 10:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 25;
              break;
            }

            place = _step.value;
            _context.next = 14;
            return BusyHours(place.placeid, key);

          case 14:
            busyHourData = _context.sent;

            console.log(Flag.green, 'busyHours recieved for: ' + place.name);

            _context.next = 18;
            return Place.findById(place._id);

          case 18:
            placeDocument = _context.sent;


            placeDocument['busyPercentage'] = getPercentage(busyHourData);

            placeDocument.save(function (err) {
              if (err) ;
              console.log(Flag.red, err);
            });

            // console.log(Flag.green, `busyHours added to: ${placeDocument.name}`);
            completed++;

          case 22:
            _iteratorNormalCompletion = true;
            _context.next = 10;
            break;

          case 25:
            _context.next = 31;
            break;

          case 27:
            _context.prev = 27;
            _context.t0 = _context['catch'](8);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 31:
            _context.prev = 31;
            _context.prev = 32;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 34:
            _context.prev = 34;

            if (!_didIteratorError) {
              _context.next = 37;
              break;
            }

            throw _iteratorError;

          case 37:
            return _context.finish(34);

          case 38:
            return _context.finish(31);

          case 39:

            // console.log(Flag.blue, `Saved ${completed}/${places.length} places!`);
            console.log(Flag.green, 'Received and saved busyHours!');

          case 40:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[8, 27, 31, 39], [32,, 34, 38]]);
  }));

  return function getBusyHours() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var BusyHours = require('busy-hours');
var key = 'AIzaSyCQbp4QicSsS_PtZWRJpBPaOd5jJBY1Dy0';
var Flag = require('./node_colors');
var Place = require('../models/place');
var getPercentage = require('./get_percentage');

module.exports = getBusyHours;