const User = require('../models/user');

exports.showUser = (req, res) => {
  console.log(req.headers);
  User.find({}, (err, users) => {
    let userMap = {};
    users.forEach(user => {
      userMap[user._id] = user;
    });

    res.json({data: userMap});
  });
};

exports.addUser = (req, res) => {};
