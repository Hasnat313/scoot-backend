const { sign } = require("jsonwebtoken");
const mongoose = require("mongoose");
// const jwt = require('jsonwebtoken');
require('dotenv').config();
const signupModel = require("../models/signupModel")
    // const UserOTPVerificationModel = require("../models/userOTPVerificationModel")
    // const profileModel = require("../models/ProfileModel");






exports.postUserSigninEmail = (req, res) => {
    emailAddress = req.body.emailAdress;


    signupModel.findOne({ emailAddress: emailAddress },
        (err, data) => {
            if (!err && data != null) {
                res.json(data);
            } else {
                res.json("Record Doesnot exits")
            }
        })


}

exports.postUserSigninPhone = (req, res) => {
    phoneNumber = req.body.phoneNumber;


    signupModel.findOne({ phoneNumber: phoneNumber },
        (err, data) => {
            if (!err && data != null) {
                res.json(data);
            } else {
                res.json("Record Doesnot exits")
            }
        })


}