const mongoose = require("mongoose");
const stationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    stationName: String,
    stationAddress: String,
    stationLocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'location'
    }


})

const stationModel = mongoose.model("station", stationSchema, "station");
module.exports = stationModel;