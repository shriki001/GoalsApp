const mongo = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require("moment");
const { Schema, model } = mongo;

// Create Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter username'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  register_date: {
    type: Date,
    default: _ => moment()
  }
});

// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function (name, password) {
  const user = await this.findOne({ name });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect User');
};

module.exports = model('user', userSchema);
