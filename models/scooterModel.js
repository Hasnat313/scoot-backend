const mongoose = require("mongoose");
const scooterSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    scooterName: String,
    scooterStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "station"
    },
    // scooterLocation: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "location"
    // },
    location: {
        type: {
            type: String,
            default: "Point",
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    scooterModel: String,
    block: Boolean



})
scooterSchema.index({ location: "2dsphere" });
const scooterModel = mongoose.model("scooter", scooterSchema, "scooter");
module.exports = scooterModel;