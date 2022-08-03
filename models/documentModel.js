
const mongoose = require("mongoose");
const documentSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    drivingLicense:String,
    licenseOwnerShip:String,
    NICFront:String,
    NICBack:String,
    userID:mongoose.Schema.Types.ObjectId,
    profileID:mongoose.Schema.Types.ObjectId
    
    
 
})

const docModel=mongoose.model("document",documentSchema,"document");
module.exports=docModel;