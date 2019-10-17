const router = require('express').Router();
const {checkToken} = require('../middlewares/auth');
const {showUser, findUser} = require('../controllers/user');
const WebtoonControllers = require('../controllers/webtoon');
const bodyParser = require('body-parser');

const {
  storage,
  Multer,
  addImageBannerWebtoon,
  addEpisodeCover,
  addEpisode,
} = require('../middlewares/multer');
const {
  mkdirCreator,
  mkdirWebtoon,
  mkdirEpisode,
} = require('../middlewares/mkdir');

const upload = Multer({storage});

router.get('/', showUser);
router.get('/finduser/:id', findUser);
router.post(
  '/image/:iduser',
  mkdirCreator,
  upload.array('profile'),
  (req, res, next) => {
    try {
      res.send(req.files);
    } catch (error) {
      console.log(error);
    }
  },
);

//? Create My Webtoon (21)
const uploadBanner = Multer({storage: addImageBannerWebtoon});
//? use query.webtoontitle for naming folder
//! http://localhost:3001/api/v1/user/5da6e9016c4e765927d33f62/webtoon?webtoontitle=webtoon
router.post(
  '/:iduser/webtoon',
  checkToken,
  mkdirWebtoon,
  uploadBanner.single('banner'),
  WebtoonControllers.addWebtoon,
);

//! http://localhost:3001/api/v1/user/5da6e9016c4e765927d33f62/webtoon/
router.get('/:iduser/webtoon', checkToken, WebtoonControllers.getMyWebtoon);

//! http://localhost:3001/api/v1/user/5da6e9016c4e765927d33f62/webtoon/{webtoonid}/episodes
router.get('/:iduser/webtoon/:webtoonid/episodes');

//! http://localhost:3001/api/v1/user/5da6e9016c4e765927d33f62/webtoon/{webtoonid}/episode?webtoontitle=""&episodetitle=""
const uploadCoverEpisode = Multer({storage: addEpisodeCover});
router.post(
  '/:iduser/webtoon/:webtoonid/episode',
  checkToken,
  mkdirEpisode,
  uploadCoverEpisode.single('cover'),
  WebtoonControllers.addEpisode,
);

router.get(
  '/:iduser/webtoon/:webtoonid/episode',
  checkToken,
  WebtoonControllers.getEpisode,
);

//! http://localhost:3001/api/v1/user/{iduser}/webtoon/{webtoonid}/episode/{episodeid}/image
const uploadImage = Multer({storage: addEpisode});
router.post(
  '/:iduser/webtoon/:webtoonid/episode/:episodeid/image',
  checkToken,
  uploadImage.array('episode'),
  WebtoonControllers.addImageToEpisode,
);

router.get(
  '/:iduser/webtoon/:webtoonid/episode/:episodeid/image',
  checkToken,
  WebtoonControllers.getDetailEpisode,
);

module.exports = router;
