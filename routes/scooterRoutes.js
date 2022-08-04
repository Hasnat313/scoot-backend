const express = require("express"),
    router = express.Router(),
    controller = require("../controllers/scooterController");
const auth = require("../middleware/auth");

router.get("/getScooter", controller.getScooter);
router.post("/addScooter", controller.postScooter);
router.put("/updateScooter", controller.updateScooter);
router.delete("/deleteScooter", controller.deleteScooter);
router.put("/changeBlockStatusTrue", controller.blockStatus);
router.put("/subAdminUpdateScooter", controller.subAdminUpdateScooter);


// router.post("/updateProfile", auth, controller.updateAdmninProfile);
// router.post("/deleteAdmin", auth, controller.deleteAdmin);

module.exports = router