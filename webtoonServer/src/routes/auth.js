const router = require("express").Router();
const Auth = require("../controllers/auth");
const AuthMiddleware = require("../middlewares/auth");
router.post("/register", Auth.register);
router.post("/login", Auth.login);

module.exports = router;
