const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret} = require('../config');
const User = require('../models/user');

exports.register = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  try {
    await User.findOne({email}, (err, user) => {
      if (err) console.log(err);
      if (user)
        return res.json({
          success: false,
          message: 'email are already in use',
        });

      return bcrypt
        .hash(password, 12)
        .then(hassPass => {
          let newUser = new User({
            username,
            email,
            password: hassPass,
          });
          return newUser.save();
        })
        .then(_ => {
          res.status(200).json({
            success: true,
            message: 'registration successful',
          });
        });
    }).catch(err => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    await User.findOne({email}).then(user => {
      if (!user)
        return res.json({
          success: false,
          message: 'the email you entered is not registered',
        });

      let token = jwt.sign(email, secret);
      bcrypt.compare(password, user.password).then(match => {
        if (match)
          return res
            .status(200)
            .json({success: true, message: 'login successfully', token});

        return res.json({
          success: false,
          message: 'the password you entered is incorrect',
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};
