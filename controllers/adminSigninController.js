const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const adminModel = require("../models/adminModel")
    // const UserOTPVerificationModel = require("../models/userOTPVerificationModel")
    // const profileModel = require("../models/ProfileModel");






exports.postAdminSignin = (req, res) => {
    emailOruserName = req.body.emailOrUserName;
    password = req.body.password;

    adminModel.findOne({ $or: [{ emailAddress: emailOrUserName }, { userName: emailOrUserName }], password: password },
        (err, data) => {
            if (!err && data != null) {
                var obj = {};
                obj.data = data;
                const token = jwt.sign({ _id: process.env.id }, process.env.key);
                obj.token = token;
                res.json(obj);
            } else {
                res.json("Invalid Credentials")
            }
        })


}

exports.checkLogin = (req, res) => {

    res.json("Already Logged in")



}

exports.logout = (req, res) => {
    res.json("Good Bye")

}