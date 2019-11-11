const router = require("express").Router();
const { checkToken } = require("../middlewares/auth");
const { showUser, findUser, updateProfile } = require("../controllers/user");
const WebtoonControllers = require("../controllers/webtoon");

const {
  uploadProfile,
  Multer,
  addImageBannerWebtoon,
  addEpisodeCover,
  addEpisode
} = require("../middlewares/multer");

const {
  mkdirProfile,
  mkdirWebtoon,
  mkdirEpisode
} = require("../middlewares/mkdir");

router.get("/", showUser);
router.get("/finduser/:id", findUser);

// TODO Update Photo Profile
const upload = Multer({ storage: uploadProfile });
router.put(
  "/:iduser/uploadprofile",
  checkToken,
  mkdirProfile,
  upload.single("profile"),
  updateProfile
);

//? Create My Webtoon (21)
// TODO create webtoon, folder, and banner webtoon
//! http://localhost:3001/api/v1/user/5da6e9016c4e765927d33f62/webtoon?webtoontitle=webtoon
const uploadBanner = Multer({ storage: addImageBannerWebtoon });
router.post(
  "/:iduser/webtoon",
  checkToken,
  mkdirWebtoon,
  uploadBanner.single("banner"),
  WebtoonControllers.addWebtoon
);

// TODO Get My Webtoon
//! http://localhost:3001/api/v1/user/5da6e9016c4e765927d33f62/webtoon/
router.get("/:iduser/webtoon", checkToken, WebtoonControllers.getMyWebtoon);

// Todo Edit My Webtoon
router.put(
  "/:iduser/webtoon/:webtoonid",
  checkToken,
  WebtoonControllers.editMyWebtoon
);

//Todo delete My Webtoon
router.delete(
  "/:iduser/webtoon/:webtoonid",
  checkToken,
  WebtoonControllers.deleteMyWebtoon
);

// TODO Get My Webtoon Episode
//! http://localhost:3001/api/v1/user/5da6e9016c4e765927d33f62/webtoon/{webtoonid}/episode
router.get(
  "/:iduser/webtoon/:webtoonid/episode",
  checkToken,
  WebtoonControllers.getEpisode
);

//todo Edit Episode
router.put(
  "/:iduser/webtoon/:webtoonid/episode/:episodeid",
  checkToken,
  WebtoonControllers.editEpisode
);

//todo delete Episode
router.delete(
  "/:iduser/webtoon/:webtoonid/episode/:episodeid",
  checkToken,
  WebtoonControllers.deleteEpisode
);

//todo get Episode
router.get(
  "/:iduser/webtoon/:webtoonid/episode/:episodeid/detail",
  checkToken,
  WebtoonControllers.getDetailEpisode
);

// TODO Create Episode Folder, upload cover, and naming folder episode
//! http://localhost:3001/api/v1/user/5da6e9016c4e765927d33f62/webtoon/{webtoonid}/episode?webtoontitle=""&episodetitle=""
const uploadCoverEpisode = Multer({ storage: addEpisodeCover });
router.post(
  "/:iduser/webtoon/:webtoonid/episode",
  checkToken,
  mkdirEpisode,
  uploadCoverEpisode.single("cover"),
  WebtoonControllers.addEpisode
);

// TODO create Image Episode
//! http://localhost:3001/api/v1/user/{iduser}/webtoon/{webtoonid}/episode/{episodeid}/image
const uploadImage = Multer({ storage: addEpisode });
router.post(
  "/:iduser/webtoon/:webtoonid/episode/:episodeid/image",
  checkToken,
  uploadImage.array("episode"),
  WebtoonControllers.addImageToEpisode
);

//todo get image of episode
router.get(
  "/:iduser/webtoon/:webtoonid/episode/:episodeid/image",
  checkToken,
  WebtoonControllers.getDetailEpisode
);

//todo delete imageEpisode
router.delete(
  "/:iduser/webtoon/:webtoonid/episode/:episodeid/image/:imageid",
  checkToken,
  WebtoonControllers.deleteImageEpisode
);

module.exports = router;
