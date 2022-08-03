const express = require("express"),
    router = express.Router(),
    controller = require("../controllers/signupController");

router.post("/sendNumberOTPForNewUser", controller.postEnterNumber);
router.post("/verifyNumberOTPForNewUser", controller.verifyOtp);
router.post("/sendEmailOTPForNewUser", controller.postEnterEmail);
router.post("/verifyEmailOTPForNewUser", controller.verifyOtpEmailForNewUser);

// router.post("/enterEmailAddress", controller.postEnterEmailAddress);
router.post("/sendEmailOTPForExistingUser", controller.sendEmailOtpForExistingNumber);
router.post("/verifyEmailOtpForExistingUser", controller.verifyEmailOtpOfExistingUser);
router.post("/sendNumberOTPForExistingUser", controller.sendNumberOtpForExistingEmail);
router.post("/verifyNumberOTPForExistingUser", controller.verifyNumberOtpOfExistingUser);

router.put("/", controller.completeProfile);



module.exports = router