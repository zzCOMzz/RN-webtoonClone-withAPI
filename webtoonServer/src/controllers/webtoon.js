const Webtoon = require('../models/webtoon');

exports.showAllWebtoon = (req, res, next) => {
  try {
    console.log(req.headers);
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
