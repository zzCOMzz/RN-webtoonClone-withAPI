const router = require('express').Router();
const {checkToken} = require('../middlewares/auth');
const WebtoonControllers = require('../controllers/webtoon');
const {mkdirWebtoon} = require('../middlewares/mkdir');

router.get('/', WebtoonControllers.showAllWebtoon);
router.get('/:title', WebtoonControllers.seacrhWithTitle);

module.exports = router;
