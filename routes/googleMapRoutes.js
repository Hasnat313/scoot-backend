const express = require("express"),
    router = express.Router(),
    controller = require("../controllers/googleMapController");

// router.post("/", controller.postDocuments);
// router.put("/", controller.verifyDoc);
// router.put("/", controller.completeProfile);

router.get("/", controller.getMaps);


module.exports = router