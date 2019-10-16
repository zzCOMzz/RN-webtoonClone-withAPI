const router = require('express').Router();
const {checkToken} = require('../middlewares/auth');
const {showUser, findUser} = require('../controllers/user');
const WebtoonControllers = require('../controllers/webtoon');
const bodyParser = require('body-parser');

const {
  storage,
  Multer,
  addImageBannerWebtoon,
} = require('../middlewares/multer');
const {mkdirCreator, mkdirWebtoon} = require('../middlewares/mkdir');

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
//? use query.folder for naming folder
router.post(
  '/:iduser/webtoon',
  checkToken,
  mkdirWebtoon,
  uploadBanner.single('banner'),
  WebtoonControllers.addWebtoon,
);

module.exports = router;
