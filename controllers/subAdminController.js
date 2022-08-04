const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const subAdminModel = require("../models/subAdminModel");
const adminModel = require("../models/adminModel");
// const UserOTPVerificationModel = require("../models/userOTPVerificationModel")
// const profileModel = require("../models/ProfileModel");






exports.postsubAdminSignup = (req, res) => {
    const emailAddress = req.body.emailAddress;
    const password = req.body.password;
    const userName = req.body.userName;
    console.log("dddds");
    adminModel.findOne({ emailAddress: emailAddress }, (err, data) => {
        if (!err && data !== null) {
            res.json("Email Already Exists")
        } else {
            adminModel.findOne({ userName: userName }, (err, data) => {
                if (!err && data !== null) {
                    res.json("userName Already Exists")
                } else {

                    subAdminModel.findOne({ emailAddress: emailAddress }, (err, data) => {
                        if (!err && data != null) {
                            res.json("Email Already Exists")
                        } else {
                            subAdminModel.findOne({ userName: userName }, (err, data) => {
                                if (!err && data != null) {
                                    res.json("userName Already Exists")
                                } else {
                                    newadminSignup = new subAdminModel({
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
            })
        }
    })

}


exports.updateSubAdmninProfile = (req, res) => {
        const adminID = req.body.adminID;
        const userName = req.body.userName;
        const emailAddress = req.body.emailAddress;
        const password = req.body.password;

        subAdminModel.updateOne({ _id: adminID }, { userName: userName, emailAddress: emailAddress, password: password }, (err, data) => {
            if (!err) {
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
exports.deleteSubAdmin = (req, res) => {
    adminID = req.body.adminID;
    subAdminModel.deleteOne({ _id: adminID }, (err, data) => {
        if (!err) {
            res.json(data);
        }
    })
}



exports.postSubAdminSignin = (req, res) => {
    emailOruserName = req.body.emailOrUserName;
    password = req.body.password;

    subAdminModel.findOne({ $or: [{ emailAddress: emailOrUserName }, { userName: emailOrUserName }], password: password },
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