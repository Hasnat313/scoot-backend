const express = require("express"),
    router = express.Router(),
    controller = require("../controllers/adminSignupController");
const auth = require("../middleware/auth");
router.post("/", controller.postAdminSignup);
router.post("/updateProfile", auth, controller.updateAdmninProfile);
router.post("/deleteAdmin", auth, controller.deleteAdmin);
// router.post("/checkSignin", controller.checkLogin);
// router.post("/logout", controller.logout);
// router.put("/", controller.verifyDoc);
// router.put("/", controller.verifyDoc);
// router.put("/", controller.completeProfile);




module.exports = router