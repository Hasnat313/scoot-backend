const express = require("express"),
    router = express.Router(),
    controller = require("../controllers/locationController");
const auth = require("../middleware/auth");

router.post("/enterLocation", controller.postLocation);
router.get("/getLocation", controller.getLocation);






module.exports = router