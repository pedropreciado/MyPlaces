"use strict";

var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Flag = require('../utils/node_colors');

router.route("/users").get(function (req, res) {

  console.log("GET users requested");

  User.find(function (err, users) {
    if (err) res.send(err);
    res.json(users);
  });
}).post(function (req, res) {
  var user = new User();

  console.log("POST USER REQUESTED");
  if (req.body.username && req.body.password && req.body.passwordConf && req.body.email) {

    var userData = {
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
      email: req.body.email
    };

    User.create(userData, function (err, user) {
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

    User.authenticate(req.body.loginemail, req.body.loginpassword, function (error, user) {

      if (error || !user) {
        var err = new Error("Wrong email or password");
        err.status = 401;
        console.log(Flag.red, 'error logging user in');
        res.send(err);
      } else {
        req.session.userId = user._id;
        console.log("Logged in!");
        res.json({
          id: user._id,
          username: user.username,
          email: user.email
        });
        return;
      }
    });
  } else {

    var err = new Error('All fields required');
    console.log(err);
    // err.status = 400;
    res.send(err);
  }
});

router.get("/profile", function (req, res, next) {
  User.findById(req.session.userId).exec(function (err, user) {
    if (err) {
      return next(err);
    } else {

      if (user === null) {
        var _err = new Error("Not authorized! Go Back!");
        _err.status = 400;

        return next(_err);
      } else {
        return res.send('');
      }
    }
  });
});

module.exports = router;