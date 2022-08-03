const mongoose = require("mongoose");
const adminSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    emailAddress: String,
    password: String,
    userName: String


})

const adminModel = mongoose.model("admin", adminSchema, "admin");
module.exports = adminModel;