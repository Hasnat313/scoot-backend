const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const adminModel = require("../models/adminModel")
    // const UserOTPVerificationModel = require("../models/userOTPVerificationModel")
    // const profileModel = require("../models/ProfileModel");






exports.postAdminSignup = (req, res) => {
    const emailAddress = req.body.emailAddress;
    const password = req.body.password;
    const userName = req.body.userName;

    adminModel.findOne({ emailAddress: emailAddress }, (err, data) => {
        if (!err && data !== null) {
            res.json("Email Already Exists")
        } else {
            adminModel.findOne({ userName: userName }, (err, data) => {
                if (!err && data !== null) {
                    res.json("userName Already Exists")
                } else {
                    newadminSignup = new adminModel({
                        _id: mongoose.Types.ObjectId(),
                        emailAddress: emailAddress,
                        password: password,
                        userName: userName
                    })
                    console.log("running");
                    newadminSignup.save((err, data) => {
                        if (!err) {
                            console.log("running");
                            var obj = {};
                            const token = jwt.sign({ _id: process.env.id }, process.env.key);
                            obj.token = token;
                            obj.data = data;
                            res.json(obj);
                        } else {
                            res.json(err);
                        }
                    })
                }
            })
        }
    })




}


exports.updateAdmninProfile = (req, res) => {
        const adminID = req.body.adminID;
        const userName = req.body.userName;
        const emailAddress = req.body.emailAddress;
        const password = req.body.password;

        adminModel.updateOne({ _id: adminID }, { userName: userName, emailAddress: emailAddress, password: password }, (err, data) => {
            if (!err) {
                console.log("ddfdsf");
                res.json(data);
            }
        })
    }
    // exports.checkLogin = (req, res) => {
    //     token1 = req.headers.authorization;
    //     token3 = token1.replace("Bearer ", "");
    //     console.log(token3);
    //     const data = jwt.verify(token3, process.env.key)
    //     if (data._id === process.env.id) {
    //         res.json("Already Logged in")
    //     }

// 

// }

// exports.logout = (req, res) => {
//     res.json("Good Bye")

// }
exports.deleteAdmin = (req, res) => {
    adminID = req.body.adminID;
    profileModel.deleteOne({ _id: adminID }, (err, data) => {
        if (!err) {
            res.json(data);
        }
    })
}