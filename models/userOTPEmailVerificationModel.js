const mongoose = require("mongoose")


const UserOTPEmailVerificationSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    emailAddress: String,
    otp: String
})
const UserOTPEmailVerificationModel = mongoose.model("userOTPEmailVerification", UserOTPEmailVerificationSchema)
module.exports = UserOTPEmailVerificationModel;