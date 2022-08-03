const express = require("express"),
router=express.Router(),
controller=require("../controllers/documentController");

router.post("/", controller.postDocuments);
router.put("/", controller.verifyDoc);
// router.put("/", controller.completeProfile);




module.exports=router