const express = require("express"),
    router = express.Router(),
    controller = require("../controllers/subAdminController");
const auth = require("../middleware/auth");

console.log("vvvv");
router.post("/signup", controller.postsubAdminSignup);
router.post("/updateProfile", auth, controller.updateSubAdmninProfile);
router.post("/deleteAdmin", auth, controller.deleteSubAdmin);
router.post("/signin", controller.postSubAdminSignin);
router.post("/checkSignin", auth, controller.checkLogin);
router.post("/logout", auth, controller.logout);

module.exports = router