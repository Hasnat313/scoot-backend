const express = require("express"),
    router = express.Router(),
    controller = require("../controllers/adminSignupController");

router.post("/", controller.postAdminSignup);
router.post("/updateProfile", controller.updateAdmninProfile);

// router.post("/checkSignin", controller.checkLogin);
// router.post("/logout", controller.logout);
// router.put("/", controller.verifyDoc);
// router.put("/", controller.verifyDoc);
// router.put("/", controller.completeProfile);




module.exports = router