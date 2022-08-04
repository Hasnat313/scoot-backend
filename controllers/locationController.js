const mongoose = require("mongoose");


const locationModel = require("../models/locationModel");
// const profileModel = require("../models/profileModel");
// const UserOTPVerificationModel = require("../models/userOTPVerificationModel")
// const profileModel = require("../models/ProfileModel");

exports.getLocation = (req, res) => {
    const locID = req.body.locID;

    locationModel.findOne({ _id: locID }, (err, data) => {
        if (!err) {
            res.json(data);
        }
    })
}

exports.postLocation = (req, res) => {
    const long = req.body.long;
    const lat = req.body.lat;
    loc = new locationModel({
        _id: mongoose.Types.ObjectId(),
        long: long,
        lat: lat
    })
    loc.save((err, data) => {
        if (!err) {
            res.json(data);
        }
    });



}