const mongoose = require("mongoose");
const locationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    long: String,
    lat: String


})

const locationModel = mongoose.model("location", locationSchema, "location");
module.exports = locationModel;