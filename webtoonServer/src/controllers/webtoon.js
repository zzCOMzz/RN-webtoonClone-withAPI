const Webtoon = require('../models/webtoon');
const User = require('../models/user');
const Episode = require('../models/episode');
const mkdirp = require('mkdirp');

exports.showAllWebtoon = (req, res, next) => {
  try {
    Webtoon.find()
      .populate('creator', 'username _id')
      .exec((err, webtoons) => {
        if (err) return res.json({success: false, message: 'Not Found!'});
        return res.json({success: true, data: webtoons});
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

exports.getMyWebtoon = (req, res, next) => {
  const userId = req.params.iduser;
  try {
    Webtoon.find({creator: userId}, (err, webtoons) => {
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

exports.addEpisode = (req, res, next) => {
  const userId = req.params.iduser;
  const webtoonId = req.params.webtoonid;
  const titleEpisode = req.query.episodetitle;
  const cover = req.coverUri;
  try {
    Webtoon.findOne({_id: webtoonId, creator: userId}, (err, webtoon) => {
      if (err) return res.json({message: 'Webtoon Not Found!', success: false});

      const addEpisode = new Episode({
        title: titleEpisode,
        image_cover: cover,
        episode_id: webtoon,
      });

      addEpisode.save({}, (err, episode) => {
        if (err)
          return res.json({
            success: false,
            message: 'Failed on Create Episode',
          });
        return res.json({success: true, data: episode});
      });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getEpisode = (req, res, next) => {
  const userId = req.params.iduser;
  const webtoonId = req.params.webtoonid;
  try {
    // Episode.find({episode_id: webtoonId}, (err, episode) => {
    //   if (err) return res.json({message: 'Episode Not Found', success: false});
    //   return res.json({data: episode});
    // });
    Episode.find({episode_id: webtoonId}).exec((err, episode) => {
      if (err) return res.json({message: 'Episode Not Found', success: false});
      return res.json({data: episode});
    });
  } catch (error) {
    console.log(error);
  }
};
