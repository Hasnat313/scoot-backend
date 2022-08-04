const express = require("express"),
    router = express.Router(),
    controller = require("../controllers/adminSigninController");
const auth = require("../middleware/auth");

router.post("/", controller.postAdminSignin);
router.post("/checkSignin", auth, controller.checkLogin);
router.post("/logout", auth, controller.logout);

// router.put("/", controller.verifyDoc);
// router.put("/", controller.verifyDoc);
// router.put("/", controller.completeProfile);




module.exports = router