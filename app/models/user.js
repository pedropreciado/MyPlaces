const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
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

UserSchema.pre('save', function(next) {
  let user = this;


  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      console.log("Error saving password. See below");
      console.log(err);
      return;
    }
    user.password = hash;
    next();
  })
})

UserSchema.statics.authenticate = (email, password, cb) => {
  User.findOne({email: email})
    .exec((err, user) => {
      if (err) {
        return cb(err);
      } else if (!user) {
        let err = new Error("User not found.");
        err.status = 401;

        return cb(err)
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (result === true) {
          return cb(null, user);
        } else {
          return cb();
        }
      })
    });
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
