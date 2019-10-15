const router = require('express').Router();
const {showUser, addUser} = require('../controllers/user');
const multer = require('multer');
const mkdirp = require('mkdirp');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storage/uploads/' + req.params.nama);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({storage});

router.get('/', showUser);

const mkdir = (req, res, next) => {
  mkdirp(`storage/uploads/${req.params.nama}`, err => {
    if (err) return console.log('error mkdir', err);
    console.log('##################');
    console.log('MKDIR SUCCESS');
    console.log('##################');
    next();
  });
};
router.post(
  '/image/:nama',
  mkdir,
  upload.single('profile'),
  (req, res, next) => {
    try {
      res.send(req.file);
    } catch (error) {
      console.log(error);
    }
  },
);

module.exports = router;
