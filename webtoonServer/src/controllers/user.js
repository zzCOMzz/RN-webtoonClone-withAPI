const User = require('../models/user');

exports.showUser = (req, res) => {
  User.find({}, (err, users) => {
    let userMap = {};
    users.forEach(user => {
      userMap[user._id] = user;
    });

    res.json({data: userMap});
  });
};

exports.findUser = (req, res, next) => {
  const idUser = req.params.id;
  try {
    User.findOne({_id: idUser})
      .populate('my_webtoon')
      .exec((err, user) => {
        if (err) return res.json({success: false, message: 'Not Found!'});
        return res.json({success: true, data: user});
      });
  } catch (error) {
    console.log(err);
  }
};
