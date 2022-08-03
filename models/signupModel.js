const mongoose = require("mongoose");
const signupSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    phoneNumber: String,
    firstName: String,
    lastName: String,
    emailAddress: String,
    address: String,
    gender: String,


})

const signupModel = mongoose.model("signup", signupSchema, "signup");
module.exports = signupModel;