const mongoose = require("mongoose");


const stationModel = require("../models/stationModel");
// const profileModel = require("../models/profileModel");
// const UserOTPVerificationModel = require("../models/userOTPVerificationModel")
// const profileModel = require("../models/ProfileModel");

exports.getStation = (req, res) => {
    stationID = req.body.stationID
    stationModel.findOne({ _id: stationID }, (err, data) => {
        if (!err) {
            res.json(data);
        }
    })
}

exports.postStation = (req, res) => {
    const stationName = req.body.stationName;
    const stationAddress = req.body.stationAddress;
    const stationLocation = req.body.stationLocation;
    station = new stationModel({
        _id: mongoose.Types.ObjectId(),
        stationName: stationName,
        stationAddress: stationAddress,
        stationLocation: stationLocation
    })
    station.save((err, data) => {
        if (!err) {
            res.json(data);
        }
    });



}

exports.deleteStation = (req, res) => {
    stationID = req.body.stationID
    stationModel.deleteOne({ _id: stationID }, (err, data) => {
        if (!err) {
            res.json(data);
        }
    })
}

exports.updateStation = (req, res) => {
    stationID = req.body.stationID
    const stationName = req.body.stationName;
    const stationAddress = req.body.stationAddress;
    const stationLocation = req.body.stationLocation;

    stationModel.updateOne({ _id: stationID }, {
        stationName: stationName,
        stationAddress: stationAddress,
        stationLocation: stationLocation
    }, (err, data) => {
        if (!err) {
            res.json(data);
        }
    })
}