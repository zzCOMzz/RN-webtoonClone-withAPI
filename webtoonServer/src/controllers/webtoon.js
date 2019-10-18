const Webtoon = require('../models/webtoon');
const User = require('../models/user');
const Episode = require('../models/episode');
const ImageEpisode = require('../models/imageEpisode');
const mkdirp = require('mkdirp');

exports.showAllWebtoon = (req, res, next) => {
  console.log('query showall :', req.query);
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

exports.addToFavourite = (req, res, next) => {
  const webtoonId = req.body.webtoonid;
  const userId = req.params.iduser;

  try {
    User.findOneAndUpdate({_id: userId}).then(user => {
      Webtoon.findOne({_id: webtoonId}).exec((err, webtoon) => {
        if (err)
          return res.json({message: 'cannot add to favorite', success: false});
        const favExist = user.favourite.findIndex(item => {
          return item == webtoonId;
        });

        console.log(favExist);
        if (favExist !== -1) {
          return res.json({
            message: 'Webtoon is Already in Favorite',
            success: false,
          });
        } else {
          webtoon.favourite += 1;
          webtoon.save({}, (err, webtoon) => {
            if (err)
              return res.json({
                message: 'Failed add to favourite',
                success: false,
              });
            user.favourite.push(webtoon._id);
            user.save();
            return res.json({
              message: 'Add To Favourite Success',
              success: true,
            });
          });
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};
exports.removeFromFavourite = (req, res, next) => {
  const webtoonId = req.body.webtoonid;
  const userId = req.params.iduser;
  try {
    User.findOneAndUpdate({_id: userId}).then(user => {
      Webtoon.findOne({_id: webtoonId}).exec((err, webtoon) => {
        if (err)
          return res.json({message: 'cannot add to favorite', success: false});
        const favExist = user.favourite.findIndex(item => {
          return item == webtoonId;
        });

        console.log(favExist);

        if (favExist !== -1) {
          webtoon.favourite -= 1;
          webtoon.save({}, (err, webtoon) => {
            if (err)
              return res.json({
                message: 'Failed remove from favourite',
                success: false,
              });
            user.favourite.pull(webtoon._id);
            user.save();
            return res.json({
              message: 'Remove From favourite Success',
              success: true,
            });
          });
        } else {
          return res.json({message: 'Webtoon Not in Favorite', success: false});
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.seacrhWithTitle = (req, res, next) => {
  const title = req.params.search;

  try {
    let querySearch = new RegExp(title, 'i');
    let q = {title: querySearch};
    Webtoon.find(q).exec((err, webtoon) => {
      if (err) return res.json({message: 'Error'});
      if (webtoon.length <= 0)
        return res.json({
          message: 'Not Found! Search With Another Key',
          success: false,
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
        user.my_creation.push(webtoon._id);
        user.save();
        return res.json({
          success: true,
          data: webtoon,
          message: 'Create Webtoon Success',
        });
      });
    });
  } catch (error) {
    console.log(err);
  }
};

exports.getMyWebtoon = (req, res, next) => {
  const userId = req.params.iduser;
  try {
    Webtoon.find({creator: userId}).exec((err, webtoon) => {
      if (err) return res.json({message: 'Not Found!', success: false});
      return res.json({data: webtoon});
    });
  } catch (error) {
    console.log(error);
  }
};

exports.editMyWebtoon = (req, res, next) => {
  const userId = req.params.iduser;
  const webtoonId = req.params.webtoonid;
  const title = req.body.title;
  const genre = req.body.genre;
  try {
    Webtoon.findOneAndUpdate(
      {_id: webtoonId},
      {
        genre: genre,
        title: title,
      },
      (err, newWebtoon) => {
        if (err) return res.json({message: 'failed', success: false});
        newWebtoon.save();
        return res.json({message: 'success', success: true});
      },
    );
  } catch (error) {
    console.log(error);
  }
};

exports.deleteMyWebtoon = (req, res, next) => {
  const webtoonId = req.params.webtoonid;
  try {
    Webtoon.findOneAndDelete({_id: webtoonId}, (err, doc) => {
      if (err)
        return res.json({message: 'delete webtoon failed', success: false});
      return res.json({message: `delete ${doc.title} success`});
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
            message:
              'Failed on Create Episode, Please Update With Cover of Episode',
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

exports.editEpisode = (req, res, next) => {
  const episodeId = req.params.episodeid;
  const titleEpisode = req.body.title;
  try {
    Episode.findByIdAndUpdate(
      {_id: episodeId},
      {
        title: titleEpisode,
      },
      (err, newEpisode) => {
        console.log(newEpisode);
        if (err)
          return res.json({message: 'Edit Episode Failed', success: false});
        newEpisode.save();

        return res.json({message: 'Edit Episode Success', success: true});
      },
    );
  } catch (error) {
    console.log(error);
  }
};

exports.deleteEpisode = (req, res, next) => {
  const episodeId = req.params.episodeid;
  try {
    Episode.findOneAndDelete({_id: episodeId}, (err, doc) => {
      if (err) return res.json({message: 'deleted failed', success: false});
      return res.json({message: 'delete success', success: true});
    });
  } catch (error) {
    console.log(error);
  }
};

exports.addImageToEpisode = (req, res, next) => {
  const userId = req.params.iduser;
  const webtoonId = req.params.webtoonid;
  const episodeId = req.params.episodeid;
  const imageUrl = req.imageUri;
  const imageName = req.imageName;

  try {
    Episode.findOne({_id: episodeId}, (err, episode) => {
      if (err) return res.json({message: 'Episode Not Found', success: false});

      const addImageEpisode = new ImageEpisode({
        image_id: episodeId,
        image_url: imageUrl,
        image_name: imageName,
      });

      addImageEpisode.save({}, (err, image) => {
        if (err) return res.json({message: 'add image failed', success: false});
        return res.json({message: 'add image success', success: true});
      });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getDetailEpisode = (req, res, next) => {
  const userId = req.params.iduser;
  const webtoonId = req.params.webtoonid;
  const episodeId = req.params.episodeid;

  try {
    ImageEpisode.find({image_id: episodeId}, (err, episode) => {
      if (err) return res.json({message: 'not valid image', success: false});
      return res.json({data: episode});
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteImageEpisode = (req, res, next) => {
  const imageId = req.params.imageid;
  try {
    ImageEpisode.findOneAndDelete({_id: imageId}, (err, doc) => {
      if (err)
        return res.json({message: 'delete image failed', success: false});
      return res.json({message: 'image deleted', success: true});
    });
  } catch (error) {
    console.log(error);
  }
};
