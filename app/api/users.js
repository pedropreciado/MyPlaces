let express = require("express");
const router = express.Router();
const User = require("../models/user");

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

          User.create(userData, (err, user, next) => {
            if (err) {
              console.log("POST USER FAILED");
              console.log(err);
              res.send(err);
            } else {
              console.log("USER CREATED!");
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
