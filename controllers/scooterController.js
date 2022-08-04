const mongoose = require("mongoose");


const scooterModel1 = require("../models/scooterModel");
// const profileModel = require("../models/profileModel");
// const UserOTPVerificationModel = require("../models/userOTPVerificationModel")
// const profileModel = require("../models/ProfileModel");

exports.getScooter = (req, res) => {
    scooterID = req.body.scooterID
    scooterModel1.findOne({ _id: scooterID }, (err, data) => {
        if (!err) {
            res.json(data);
        }
    })
}

exports.postScooter = (req, res) => {
    const scooterName = req.body.scooterName;
    const scooterLocation = req.body.scooterLocation;
    const scooterModel = req.body.scooterModel;
    const scooterStation = req.body.scooterStation;



    scooter = new scooterModel1({
        _id: mongoose.Types.ObjectId(),
        scooterName: scooterName,
        scooterLocation: scooterLocation,
        scooterModel: scooterModel,
        scooterStation: scooterStation,
        block: false

    })
    scooter.save((err, data) => {
        if (!err) {
            res.json(data);
        }
    });



}

exports.deleteScooter = (req, res) => {
    scooterID = req.body.scooterID
    scooterModel1.deleteOne({ _id: scooterID }, (err, data) => {
        if (!err) {
            res.json(data);
        }
    })
}

exports.updateScooter = (req, res) => {
    const scooterID = req.body.scooterID
    const scooterName = req.body.scooterName;
    const scooterLocation = req.body.scooterLocation;
    const scooterModel = req.body.scooterModel;
    const scooterStation = req.body.scooterStation;


    scooterModel1.updateOne({ _id: scooterID }, {
        scooterName: scooterName,
        scooterLocation: scooterLocation,
        scooterModel: scooterModel,
        scooterStation: scooterStation,
    }, (err, data) => {
        if (!err) {
            res.json(data);
        }
    })
}

exports.blockStatus = (req, res) => {
    scooterID = req.body.scooterID
    scooterModel1.updateOne({ _id: scooterID }, { block: true }, (err, data) => {
        if (!err) {
            res.json(data);
        }
    })
}

exports.subAdminUpdateScooter = (req, res) => {
    const scooterID = req.body.scooterID
    const scooterStation = req.body.scooterStation;

    scooterModel1.updateOne({ _id: scooterID }, {

        scooterStation: scooterStation,
    }, (err, data) => {
        if (!err) {
            res.json(data);
        }
    })
}