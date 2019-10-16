const mkdirp = require('mkdirp');

exports.mkdirCreator = (req, res, next) => {
  console.log(' Reques Body From Mkdir', req.body);
  console.log(' Reques file From Mkdir', req.file);
  console.log(' Reques params From Mkdir', req.params);
  console.log('req query mkdir', req.query);
  mkdirp(`storage/uploads/${req.params.iduser}`, err => {
    if (err) return console.log('error mkdir', err);
    console.log('##################');
    console.log('MKDIR CRATOR SUCCESS');
    console.log('##################');
    next();
  });
};

exports.mkdirWebtoon = (req, res, next) => {
  console.log('params ', req.params);
  console.log('params ', req.query);
  mkdirp(`storage/uploads/${req.params.iduser}/${req.query.folder}/`, err => {
    if (err) return console.log(`ERROR on MKDIR WEBTOON`);
    console.log('##################');
    console.log('MKDIR Webtoon SUCCESS');
    console.log('##################');
    next();
  });
};

exports.mkdirEpisode = (req, res, next) => {
  mkdirp(
    `storage/uploads/${req.params.iduser}/${req.body.webtoon}/${req.body.title}`,
    err => {
      if (err) return console.log(`ERROR on MKDIR EPISODE`);
      console.log('##################');
      console.log('MKDIR EPISODE SUCCESS');
      console.log('##################');
      next();
    },
  );
};
