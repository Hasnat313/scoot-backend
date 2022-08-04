const mongoose = require("mongoose");


const docModel = require("../models/documentModel");
const profileModel = require("../models/profileModel");
// const UserOTPVerificationModel = require("../models/userOTPVerificationModel")
// const profileModel = require("../models/ProfileModel");


exports.deleteProfile = (req, res) => {
    profileID = req.body.profileID;
    profileModel.deleteOne({ _id: profileID }, (err, data) => {
        if (!err) {
            res.json(data);
        }
    })


}