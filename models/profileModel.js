
const mongoose = require("mongoose");
const profileSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    signup:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"signup"
    },
    card:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"card"
    },
    doc:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"document"
    },
    status:Boolean,
    userID:mongoose.Schema.Types.ObjectId
 
})

const profileModel=mongoose.model("profile",profileSchema,"profile");
module.exports=profileModel;