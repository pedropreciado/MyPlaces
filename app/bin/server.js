'use strict';

var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var session = require("express-session");
var NodeColors = require('./utils/node_colors');
var io = require('socket.io')();

// ******************************************* routes

var usersRouter = require("./api/users");
var placesRouter = require('./api/places');

// ******************************************* models

var User = require("./models/user");
var Place = require('./models/place');

// ******************************************* utils

var getBusyHours = require('./utils/getBusy');
var Flag = require('./utils/node_colors');

// ******************************************* getBusyHours interval
// ******************************************* (set for 2 min!)
// //
console.log(Flag.yellow, Date());
//
setInterval(function () {
  console.log(Flag.red, 'Getting all busy hours!');

  try {
    getBusyHours();
  } catch (err) {
    console.log(err);
  }

  console.log(Flag.yellow, 'on: ', Date());
}, 1000 * 60);
//
// // initializeSocket();
var clients = [];

io.on('connection', function (client) {
  client.on('subscribeToUpdater', function (data) {
    client.customId = data.customId;

    clients.push(client.customId);

    console.log(client.customId, ' is subscribing to updater');

    setInterval(function () {
      Place.find({
        'userId': { $in: [mongoose.Types.ObjectId("" + client.customId)] }
      }, function (err, places) {
        if (err) console.log(Flag.red, err);

        console.log('SENT ', places.length, ' to ', client.customId);
        client.emit('newPlaces', places);
      });
    }, 1000 * 60 * 10);
  });

  client.on('setCustomId', function (data) {
    client.customId = data.customId;

    clients.push(client.customId);
  });

  client.on('disconnect', function (data) {
    for (var i = 0; i < clients.length; i++) {
      var c = clients[i];
      if (clients.clientId == client.id) {
        clients.splice(i, 1);
        break;
      }
    }
  });
});

var socketPort = 8000;
io.listen(socketPort);

console.log('socket listening on port: ', socketPort);

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;

mongoose.connect('mongodb://username:password@ds125489.mlab.com:25489/myplaces');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use(session({
  secret: 'blobState',
  resave: true,
  saveUninitialized: false,
  maxAge: 24 * 60 * 60 * 1000
}));

app.use('/api', placesRouter);
app.use('/api', usersRouter);

router.get("/", function (req, res) {
  res.sendFile(__dirname + '../src/index.html');
  if (req.session.userId === undefined) {
    console.log('User not set in session');
  } else {
    console.log('User from session: ', req.session);
  }
  var sessData = req.session;
  sessData.someAttribute = "foo";
  res.send('Returning with some text');
  res.json({ message: 'API Initialized' });
});

router.get("/logout", function (req, res) {
  if (req.session) {
    console.log(req.session);
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.json({
          message: 'logged out!'
        });
      }
    });
  }
});

app.use('/api', router);

app.listen(port, '0.0.0.0');