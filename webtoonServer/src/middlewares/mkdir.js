const mkdirp = require('mkdirp');

exports.mkdirProfile = (req, res, next) => {
  mkdirp(`storage/uploads/${req.params.iduser}`, err => {
    if (err) return console.log('error mkdir', err);
    console.log('##################');
    console.log('MKDIR CRATOR SUCCESS');
    console.log('##################');
    next();
  });
};

exports.mkdirWebtoon = (req, res, next) => {
  mkdirp(
    `storage/uploads/${req.params.iduser}/${req.query.webtoontitle}/`,
    err => {
      if (err) return console.log(`ERROR on MKDIR WEBTOON`);
      console.log('##################');
      console.log('MKDIR Webtoon SUCCESS');
      console.log('##################');
      next();
    },
  );
};

exports.mkdirEpisode = (req, res, next) => {
  mkdirp(
    `storage/uploads/${req.params.iduser}/${req.query.webtoontitle}/${req.query.episodetitle}`,
    err => {
      if (err) return console.log(`ERROR on MKDIR EPISODE`);
      console.log('##################');
      console.log('MKDIR EPISODE SUCCESS');
      console.log('##################');
      next();
    },
  );
};
