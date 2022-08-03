const mongoose=require("mongoose")
const Schema= mongoose.Schema

const UserOTPVerificationSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    phoneNumber:String,
    otp : String
})
const UserOTPVerificationModel= mongoose.model("userOTPVerification" , UserOTPVerificationSchema)
module.exports=UserOTPVerificationModel;