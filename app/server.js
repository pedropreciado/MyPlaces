'use strict'
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");

// ******************************************* routes

const users = require("./api/users");

// ******************************************* models
const User = require("./models/user");

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
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});

app.use(session({
  secret: 'blobState',
  resave: true,
  saveUninitialized: false
}));

app.use("/api", users);

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
  console.log('api running on port: ', port);
});
