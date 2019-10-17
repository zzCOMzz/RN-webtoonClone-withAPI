const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret} = require('../config');
const User = require('../models/user');

exports.register = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  try {
    await User.findOne({email}, (err, user) => {
      if (err)
        return res.json({message: 'Registration Failed', success: false});
      if (user)
        return res.json({
          success: false,
          message: 'Email are Already in Use',
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
            message: 'Registration Successful',
          });
        });
    }).catch(err => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  try {
    await User.findOne({email}).then(user => {
      if (!user)
        return res.json({
          success: false,
          message: 'The Email You Entered is Not Registered',
        });

      let token = jwt.sign(email, secret);
      bcrypt.compare(password, user.password).then(match => {
        if (match)
          return res.status(200).json({
            success: true,
            message: 'Login Successfully',
            token,
            username: user.username,
            idUser: user._id,
            isCreator: user.my_creation,
          });

        return res.json({
          success: false,
          message: 'The Password You Entered is Incorrect',
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};
