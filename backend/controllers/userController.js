const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const createTokens = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginMethod = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createTokens(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signUpMethod = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signUp(email, password);
    const token = createTokens(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginMethod, signUpMethod };
