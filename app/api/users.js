let express = require("express");
const router = express.Router();
const User = require("../models/user");
const Flag = require('../utils/node_colors');

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

    console.log("POST USER REQUESTED");
    console.log(req);
    if (req.body.username &&
        req.body.password &&
        req.body.passwordConf &&
        req.body.email) {

          let userData = {
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordConf,
            email: req.body.email
          }

          User.create(userData, (err, user) => {
            console.log('so something');
            if (err) {
              console.log(Flag.red, "POST USER FAILED");
              console.log(err);
              res.send(err);
            } else {
              console.log("USER CREATED!");
              req.session.userId = user._id;

              res.json({
                id: user._id,
                username: user.username,
                email: user.email
              });
            }
          });

        } else if (req.body.loginemail && req.body.loginpassword) {

          User.authenticate(req.body.loginemail, req.body.loginpassword, (error, user) => {

            if (error || !user) {
              var err = new Error("Wrong email or password");
              err.status = 401;
              console.log(Flag.red, 'error logging user in');
              res.send(err);

            } else {
              req.session.userId  = user._id;
              console.log("Logged in!");
              res.json(user);
              return;
            }
          })

        } else {

          let err = new Error('All fields required');
          console.log(err);
          err.status = 400;
          res.send(err)
        }
  })

router.get("/profile", (req, res, next) => {
    User.findById(req.session.userId)
      .exec((err, user) => {
        if (err) {
          return next(err);
        } else {

          if (user === null) {
            let err = new Error("Not authorized! Go Back!");
            err.status = 400;

            return next(err);
          } else {
            return res.send('')
          }
        }
      });
  });

module.exports = router;
