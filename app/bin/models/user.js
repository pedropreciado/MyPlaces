"use strict";

var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  passwordConf: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function (next) {
  var user = this;

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      console.log("Error saving password. See below");
      console.log(err);
      return;
    }
    user.password = hash;
    user.passwordConf = hash;
    next();
  });
});

UserSchema.statics.authenticate = function (email, password, cb) {
  User.findOne({ email: email }).exec(function (err, user) {
    if (err) {
      return cb(err);
    } else if (!user) {
      var _err = new Error("User not found.");
      _err.status = 401;

      return cb(_err);
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (result === true) {
        return cb(null, user);
      } else {
        return cb();
      }
    });
  });
};

var User = mongoose.model('User', UserSchema);

module.exports = User;