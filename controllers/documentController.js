const mongoose = require("mongoose");


const docModel = require("../models/documentModel");
const profileModel = require("../models/profileModel");
// const UserOTPVerificationModel = require("../models/userOTPVerificationModel")
// const profileModel = require("../models/ProfileModel");



exports.postDocuments = (req, res) => {
    drivingLicense = req.body.drivingLicense;
    licenseOwnerShip = req.body.licenseOwnerShip;
    NICFront = req.body.NICFront;
    NICBack = req.body.NICBack;
    userID = req.body.userID,
        profileID = req.body.profileID;
    documents = new docModel({
        _id: mongoose.Types.ObjectId(),
        drivingLicense: drivingLicense,
        licenseOwnerShip: licenseOwnerShip,
        NICFront: NICFront,
        NICBack: NICBack,
        profileID: profileID,
        userID: userID
    })
    documents.save((err, data) => {
        if (!err) {
            profileModel.updateOne({ _id: profileID, userID: userID }, { doc: data._id, status: false }, (err, data) => {
                if (!err)
                    res.json(data);
            })
        }
    });



}

exports.deleteDoc = (req, res) => {
    docID = req.body.docID;
    docModel.deleteOne({ _id: docID }, (err, data) => {
        if (!err) {
            res.json(data);
        }
    })


}

exports.verifyDoc = (req, res) => {
    userID = req.body.userID,
        profileID = req.body.profileID;
    profileModel.updateOne({ _id: profileID, userID: userID }, { status: true }, (err, data) => {
        if (!err)
            res.json(data);
    })
}

exports.updateDoc = (req, res) => {
    docID = req.body.docID;
    drivingLicense = req.body.drivingLicense;
    licenseOwnerShip = req.body.licenseOwnerShip;
    NICFront = req.body.NICFront;
    NICBack = req.body.NICBack;


    docModel.updateOne({ _id: docID }, {
        drivingLicense: drivingLicense,
        licenseOwnerShip: licenseOwnerShip,
        NICFront: NICFront,
        NICBack: NICBack,


    }, (err, data) => {
        if (!err) {
            res.json(data);
        }
    })
}