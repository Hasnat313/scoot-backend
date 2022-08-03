const express = require("express"),
    router = express.Router(),
    controller = require("../controllers/adminSigninController");

router.post("/", controller.postAdminSignin);
router.post("/checkSignin", controller.checkLogin);
router.post("/logout", controller.logout);
// router.put("/", controller.verifyDoc);
// router.put("/", controller.verifyDoc);
// router.put("/", controller.completeProfile);




module.exports = router