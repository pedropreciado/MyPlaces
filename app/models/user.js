const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
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

const User = mongoose.model('User', UserSchema);

module.exports = User;
