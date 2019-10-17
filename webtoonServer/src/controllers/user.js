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

exports.updateProfile = (req, res, next) => {
  const imageProfile = req.myProfilePhoto;
  const userId = req.params.iduser;
  const username = req.body.username;
  try {
    if (req.body.username === null || req.body.username === '')
      return res.json({message: 'Username cannot be empty ', success: false});
    User.findByIdAndUpdate(
      {_id: userId},
      {
        username,
        image_profile: imageProfile,
      },
      (err, user) => {
        if (err)
          return res.json({success: false, message: 'Update Profile Failed'});
      },
    ).then(newUser => {
      return res.json({
        message: 'Update Profile Success',
        success: true,
        data: newUser,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
