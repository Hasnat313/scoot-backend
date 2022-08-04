const express = require("express"),
    router = express.Router(),
    controller = require("../controllers/stationController");
const auth = require("../middleware/auth");

router.get("/getStation", controller.getStation);
router.post("/addStation", controller.postStation);
router.put("/updateStation", controller.updateStation);
router.delete("/deleteStation", controller.deleteStation);

// router.post("/updateProfile", auth, controller.updateAdmninProfile);
// router.post("/deleteAdmin", auth, controller.deleteAdmin);

module.exports = router