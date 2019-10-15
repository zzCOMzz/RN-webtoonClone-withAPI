const router = require('express').Router();
const WebtoonControllers = require('../controllers/webtoon');

router.get('/', WebtoonControllers.showAllWebtoon);

module.exports = router;
