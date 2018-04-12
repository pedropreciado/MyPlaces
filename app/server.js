'use strict'
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const NodeColors = require('./utils/node_colors');

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
//
// setInterval(() => {
//   console.log(Flag.red, 'Getting all busy hours!');
//   getBusyHours();
// }, 1000 * 60 * 60);




var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;

mongoose.connect('mongodb://username:password@ds125489.mlab.com:25489/myplaces')

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
  saveUninitialized: false
}));

app.use("/api", usersRouter);
app.use('/api', placesRouter);


router.get("/", (req, res) => {
  res.json({ message: 'API Initialized' });
});


router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
})

app.use('/api', router);

app.listen(port, () => {
  console.log(NodeColors.green, 'myPlaces api running on port: ', port);
});
