const mongoose = require("mongoose");
const scooterSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    scooterName: String,
    scooterStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "station"
    },
    scooterLocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "location"
    },
    scooterModel: String,
    block: Boolean



})

const scooterModel = mongoose.model("scooter", scooterSchema, "scooter");
module.exports = scooterModel;