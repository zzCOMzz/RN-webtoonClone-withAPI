const Multer = require('multer');
const path = require('path');

exports.Multer = Multer;
exports.storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Req file multer ', req.files);
    console.log('Req body multer ', req.body);
    console.log('Req params multer ', req.params);
    if (
      file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/jpg' &&
      file.mimetype !== 'image/jpeg'
    ) {
      cb(true, '');
    } else {
      cb(null, 'storage/uploads/' + req.params.iduser);
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${req.params.iduser}-${
        req.body.nama
      }-${new Date().toString().trim()}-${Math.floor(
        Math.random() * 10,
      )}${path.extname(file.originalname)}`,
    );
  },
});

exports.addImageBannerWebtoon = Multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/jpg' &&
      file.mimetype !== 'image/jpeg'
    ) {
      cb(true, '');
    } else {
      cb(
        null,
        `storage/uploads/${req.params.iduser}/${req.query.webtoontitle}`,
      );
    }
  },
  filename: (req, file, cb) => {
    req.bannerurl = `/images/${req.params.iduser}/${req.query.webtoontitle}/${
      req.query.webtoontitle
    }-${new Date().getSeconds()}-webtoon-${path.extname(file.originalname)}`;
    cb(
      null,
      `${
        req.query.webtoontitle
      }-${new Date().getSeconds()}-webtoon-${path.extname(file.originalname)}`,
    );
  },
});

exports.addEpisodeCover = Multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/jpg' &&
      file.mimetype !== 'image/jpeg'
    ) {
      cb(true, '');
    } else {
      cb(
        null,
        `storage/uploads/${req.params.iduser}/${req.query.webtoontitle}/${req.query.episodetitle}`,
      );
    }
  },
  filename: (req, file, cb) => {
    req.coverUri = `/images/${req.params.iduser}/${req.query.webtoontitle}/${
      req.query.episodetitle
    }/${req.query.webtoontitle}-${
      req.query.episodetitle
    }-${new Date().getSeconds()}-coverEpisode-${path.extname(
      file.originalname,
    )}`;
    cb(
      null,
      `${req.query.webtoontitle}-${
        req.query.episodetitle
      }-${new Date().getSeconds()}-coverEpisode-${path.extname(
        file.originalname,
      )}`,
    );
  },
});

exports.addEpisode = Multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/jpg' &&
      file.mimetype !== 'image/jpeg'
    ) {
      cb(true, '');
    } else {
      cb(
        null,
        `storage/uploads/${req.params.iduser}/${req.query.webtoontitle}/${req.query.episodetitle}`,
      );
    }
  },
  filename: (req, file, cb) => {
    req.imageUri = `/images/${req.params.iduser}/${req.query.webtoontitle}/${
      req.query.episodetitle
    }/${req.query.webtoontitle}-${
      req.query.episodetitle
    }-${new Date().getSeconds()}-${file.originalname}`;

    cb(
      null,
      `${req.query.webtoontitle}-${
        req.query.episodetitle
      }-${new Date().getSeconds()}-${file.originalname}`,
    );
  },
});
