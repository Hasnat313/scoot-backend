const mongoose = require("mongoose");
const subAdminSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    emailAddress: String,
    password: String,
    userName: String


})

const subAdminModel = mongoose.model("subAdmin", subAdminSchema, "subAdmin");
module.exports = subAdminModel;