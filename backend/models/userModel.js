const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signUp = async function (email, password) {
  if (!email || !password) {
    throw Error("Please fill all the fields.");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error("Already exists");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Please fill all the fields.");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  const userIn = await this.findOne({ email });
  if (!userIn) {
    throw Error("User Does not Exists");
  }

  const compare = await bcrypt.compare(password, userIn.password);
  if (!compare) {
    throw Error("Incorrect password");
  }

  return userIn;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
