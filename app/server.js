'use strict'
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");

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
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});

app.use(session({
  secret: 'word hard',
  resave: true,
  saveUninitialized: false
}));

router.get("/", (req, res) => {
  res.json({ message: 'API Initialized' });
});

router.route("/users")
  .get((req, res) => {

    console.log("GET users requested");

    User.find((err, users) => {
      if (err)
      res.send(err);
      res.json(users)
    });
  })
  .post((req, res) => {
    let user = new User();

    console.log("POST user requested");

    if (req.body.username &&
        req.body.password &&
        req.body.passwordConf) {

          let userData = {
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordConf,
          }

          User.create(userData, (err, user, next) => {
            if (err) {
              console.log("POST user failed");
              console.log(err);
              res.send(err);
            } else {
              console.log("User created!");
              req.session.userId = user._id;
              res.json(user);
            }
            return;
          });

        } else if (req.body.logemail && req.body.logpassword) {

          User.authenticate(req.body.logemail, req.body.logpassword, (error, user) => {
            if (error || !user) {
              var err = new Error("Wrong email or password");
              err.status = 401;
              return next(err);
            } else {
              req.session.userId  = user._id;
              console.log("Logged in!");
              // return res.redirect("/profile")
              return;
            }
          })

        } else {

          let err = new Error('All fields required');
          err.status = 400;
          return next(err);

        }
  })


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
