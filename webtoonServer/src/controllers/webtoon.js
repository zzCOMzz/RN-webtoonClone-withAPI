const Webtoon = require('../models/webtoon');
const User = require('../models/user');
const mkdirp = require('mkdirp');

exports.showAllWebtoon = (req, res, next) => {
  try {
    Webtoon.find({}, (err, webtoons) => {
      let webtoonMap = {};
      webtoons.forEach(webtoon => {
        webtoonMap[webtoon._id] = webtoon;
      });
      res.json({data: webtoonMap});
    });
  } catch (error) {
    console.log(error);
  }
};

exports.seacrhWithTitle = (req, res, next) => {
  const title = req.params.title;
  try {
    Webtoon.findOne({title}, (err, webtoon) => {
      if (err)
        return res.json({
          success: false,
          message: 'Not Found!, Search With Another Key',
        });
      return res.json({success: true, data: webtoon});
    });
  } catch (error) {
    console.log(error);
  }
};

exports.addWebtoon = (req, res, next) => {
  const idUser = req.params.iduser;
  const title = req.body.title;
  const genre = req.body.genre;
  const banner = req.bannerurl;

  try {
    User.findOne({_id: idUser}, (err, user) => {
      if (err) return res.json({success: false, message: 'User Not Found!'});

      const addWebtoon = new Webtoon({
        creator: user,
        title,
        genre,
        image_banner: banner,
      });
      addWebtoon.save({}, (err, webtoon) => {
        if (err)
          return res.json({
            success: false,
            message: 'Failed on Create Webtoon',
          });
        return res.json({success: true, data: webtoon});
      });
    });
  } catch (error) {
    console.log(err);
  }
};
