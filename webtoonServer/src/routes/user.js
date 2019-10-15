const router = require('express').Router();
const {showUser, addUser} = require('../controllers/user');

router.get('/', showUser);

module.exports = router;
