const router = require('express').Router();
const {checkToken} = require('../middlewares/auth');
const WebtoonControllers = require('../controllers/webtoon');
const {mkdirWebtoon} = require('../middlewares/mkdir');

router.get('/', WebtoonControllers.showAllWebtoon);
router.get('/search', WebtoonControllers.seacrhWithTitle);
router.get('/:webtoonid/episode', checkToken, WebtoonControllers.getEpisode);

// todo get webtoon detail episode
router.get(
  '/:webtoonid/episode/:episodeid/detail',
  checkToken,
  WebtoonControllers.getDetailEpisode,
);

module.exports = router;
