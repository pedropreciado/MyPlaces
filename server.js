'use strict'
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const NodeColors = require('./utils/node_colors');
const io = require('socket.io')();
const path = require('path');

// ******************************************* routes

const usersRouter = require("./api/users");
const placesRouter = require('./api/places');

// ******************************************* models

const User = require("./models/user");
const Place = require('./models/place');

// ******************************************* utils

const getBusyHours = require('./utils/getBusy');
const Flag = require('./utils/node_colors');


// ******************************************* getBusyHours interval
// ******************************************* (set for 2 min!)
// //
console.log(Flag.yellow, Date())
//
setInterval(() => {
  console.log(Flag.red, 'Getting all busy hours!');

  try {
    getBusyHours();
  }

  catch(err) {
    console.log(err);
  }

  console.log(Flag.yellow, 'on: ', Date())
}, 1000 * 60 * 30);
// //
// // // initializeSocket();
let clients = [];
//
io.on('connection', (client) => {
  client.on('subscribeToUpdater', (data) => {
    client.customId = data.customId;

    clients.push(client.customId);

    console.log(client.customId, ' is subscribing to updater');

    setInterval(() => {
      Place.find({
        'userId': { $in: [
          mongoose.Types.ObjectId(`${client.customId}`)
        ]}
      }, (err, places) => {
        if (err)
        console.log(Flag.red, err);

        console.log('SENT ', places.length, ' to ', client.customId);
        client.emit('newPlaces', places);
      });
    }, 1000 * 60 * 35);
  });

  client.on('setCustomId', (data) => {
    client.customId = data.customId;

    clients.push(client.customId);
  });

  client.on('disconnect', (data) => {
    for (var i = 0; i < clients.length; i++) {
      let c = clients[i];
      if (clients.clientId == client.id) {
        clients.splice(i, 1);
        break;
      }
    }
  })
});


const socketPort = 8000;
io.listen(socketPort)

console.log('socket listening on port: ', socketPort);



var app = express();
var router = express.Router();


// mongoose.connect('mongodb://username:password@ds125489.mlab.com:25489/myplaces')
mongoose.connect('mongodb://heroku_rj6brblq:gl270ik87viphijtr5k10qsbvu@ds255889.mlab.com:55889/heroku_rj6brblq')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader(
   'Access-Control-Allow-Headers',
   'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
);

 res.setHeader('Cache-Control', 'no-cache');
 next();
});

app.use(session({
  secret: 'blobState',
  resave: true,
  saveUninitialized: false,
  maxAge:  24 * 60 * 60 * 1000
}));

app.use('/api', placesRouter);
app.use('/api', usersRouter);



router.get("/api", (req, res) => {
  if (req.session.userId === undefined) {
    console.log('User not set in session');
  } else {
    console.log('User from session: ', req.session);
  }
  var sessData = req.session;
  sessData.someAttribute = "foo";
  res.sendFile('/src/index.html');
});


router.get("/logout", (req, res) => {
  if (req.session) {
    console.log(req.session);
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      } else {
        return res.json({
          message: 'logged out!'
        })
      }
    });
  }
})


app.use('/api', router);

app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

var port = process.env.PORT || 3001;

app.listen(port, '0.0.0.0');

console.log('api listening on', port);
