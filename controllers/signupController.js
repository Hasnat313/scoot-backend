const mongoose = require("mongoose");
require('dotenv').config();

const client = require("twilio")(
    process.env.AccountID,
    process.env.AuthTokken
);
const nodemailer = require('nodemailer');
const signupModel = require("../models/signupModel");
const UserOTPVerificationModel = require("../models/userOTPPhoneVerificationModel");
const UserOTPEmailVerificationModel = require("../models/userOTPEmailVerificationModel");
const profileModel = require("../models/profileModel");
// const profileModel = require("../models/ProfileModel");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.emailAddress,
        pass: process.env.password,
    },
});



exports.postEnterNumber = (req, res) => {

    const phoneNumber = req.body.phoneNumber;

    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    var obj = {};

    signupModel.findOne({ phoneNumber: phoneNumber }, (err, data) => {
        if (data) {

            obj.data = data;
            obj.status = "Already Exists";
            res.json(obj);

        } else {

            client.messages
                .create({

                    body: "your Scooto verification code is " + otp,
                    to: phoneNumber,
                    from: process.env.phoneNumber,

                })
                .then((message) => {

                    newOtp = new UserOTPVerificationModel({
                        _id: mongoose.Types.ObjectId(),
                        phoneNumber: phoneNumber,
                        otp: otp,

                    });
                    newOtp.save();
                    res.json(message);
                })
                // here you can implement your fallback code
                .catch((error) => {
                    res.json(error);
                });
        }
    });
};


exports.postEnterEmail = (req, res) => {

    const emailAddress = req.body.emailAddress;

    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    var obj = {};

    signupModel.find({ emailAddress: emailAddress }, (err, data) => {
        if (data.length !== 0) {
            console.log(data);
            obj.data = data;
            obj.status = "Already Exists";
            res.json(obj);

        } else {
            try {


                const otp = `${Math.floor(1000+Math.random()*9000)}`
                console.log(otp)



                const newOTPVerif = new UserOTPEmailVerificationModel({
                    // userId:_id,
                    _id: mongoose.Types.ObjectId(),
                    emailAddress: emailAddress,
                    otp: otp,
                })

                newOTPVerif.save();
                transporter.sendMail({
                    from: process.env.emailAddress,
                    to: emailAddress,
                    subject: 'Verify Account',
                    html: "<h3>OTP for Pitch YourSelf </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>"

                });
                res.json({
                    message: `Sent a verification email to ${emailAddress}`,
                    status: "pending",
                    data: {
                        otp: otp
                    }
                });

            } catch (err) {
                res.json(error);
            }

        }
    });
};



exports.verifyOtp = (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const otp = req.body.otp;

    UserOTPVerificationModel.findOne({ phoneNumber: phoneNumber, otp: otp },
        (err, data) => {
            var userID;
            if (!err && data !== null) {



                saveNumber = new signupModel({

                    _id: mongoose.Types.ObjectId(),
                    phoneNumber: phoneNumber,

                });
                saveNumber.save((err, data) => {
                    console.log(data);
                    userID = data._id;
                });
                setTimeout(() => {
                    console.log(userID);
                    newProfile = new profileModel({
                        _id: mongoose.Types.ObjectId(),
                        userID: userID,
                        signup: userID


                    })
                    newProfile.save();
                    UserOTPVerificationModel.deleteOne({ phoneNumber: phoneNumber, otp: otp },
                        (err, data) => {
                            if (!err) {
                                console.log("deleted");
                            }
                        }
                    );
                    res.json("otp Verified");
                }, 200);

            } else {
                res.json(err);
            }
        }
    );
};


exports.verifyOtpEmailForNewUser = (req, res) => {
    const emailAddress = req.body.emailAddress;
    const otp = req.body.otp;

    UserOTPEmailVerificationModel.findOne({ emailAddress: emailAddress, otp: otp },
        (err, data) => {
            console.log(data);
            var userID;
            if (!err && data !== null) {



                saveNumber = new signupModel({

                    _id: mongoose.Types.ObjectId(),
                    emailAddress: emailAddress,

                });
                saveNumber.save((err, data) => {
                    console.log(data);
                    userID = data._id;
                });
                setTimeout(() => {
                    console.log(userID);
                    newProfile = new profileModel({
                        _id: mongoose.Types.ObjectId(),
                        userID: userID,
                        signup: userID


                    })
                    newProfile.save();
                    UserOTPEmailVerificationModel.deleteOne({ emailAddress: emailAddress, otp: otp },
                        (err, data) => {
                            if (!err) {
                                console.log("deleted");
                            }
                        }
                    );
                    res.json("otp Verified");
                }, 200);

            } else {
                res.json(err);
            }
        }
    );
};



exports.completeProfile = (req, res) => {
    signupID = req.body.signupID;
    firstName = req.body.firstName;
    lastName = req.body.lastName;

    address = req.body.address;
    gender = req.body.gender;

    signupModel.updateOne({ _id: signupID }, {
            firstName: firstName,
            lastName: lastName,

            address: address,
            gender: gender,
        },
        (err, data) => {
            if (!err) {
                res.json(data);
            } else {
                res.json(err);
            }
        }
    );
};


exports.sendEmailOtpForExistingNumber = (req, res) => {
    const phoneNumber = req.body.phoneNumber
    const emailAddress = req.body.emailAddress;
    signupModel.findOne({ phoneNumber: phoneNumber }, (err, data) => {
        if (!err && data !== null) {
            console.log(data.emailAddress);
            if (data.emailAddress !== undefined) {
                res.json("This account already has Email")
            } else {
                signupModel.find({ emailAddress: emailAddress }, (err, data1) => {
                    console.log(data1);
                    if (!err && data1.length !== 0) {
                        res.json("Email Already Exists");
                    } else {
                        console.log("working1");
                        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
                        const newOTPVerif = new UserOTPEmailVerificationModel({
                            // userId:_id,
                            _id: mongoose.Types.ObjectId(),
                            emailAddress: emailAddress,
                            otp: otp,
                        })
                        console.log("working2");
                        newOTPVerif.save();
                        transporter.sendMail({
                            from: process.env.emailAddress,
                            to: emailAddress,
                            subject: 'Verify Account',
                            html: "<h3>OTP for Scooto Email Verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>"

                        });
                        console.log("working3");
                        res.json({
                            message: `Sent a verification email to ${emailAddress}`,
                            status: "pending",
                            data: {
                                otp: otp
                            }
                        });




                    }
                })

            }
        } else {


        }
    })

}



exports.sendNumberOtpForExistingEmail = (req, res) => {
        const phoneNumber = req.body.phoneNumber
        const emailAddress = req.body.emailAddress;
        signupModel.findOne({ emailAddress: emailAddress }, (err, data) => {
            if (!err && data !== null) {
                console.log(data.emailAddress);
                if (data.phoneNumber !== undefined) {
                    res.json("This account already has PhoneNumber")
                } else {
                    signupModel.find({ phoneNumber: phoneNumber }, (err, data1) => {
                        console.log(data1);
                        if (!err && data1.length !== 0) {
                            res.json("phone Number Exists");
                        } else {
                            const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
                            console.log("working1");
                            client.messages
                                .create({

                                    body: "your Scooto verification code is " + otp,
                                    to: phoneNumber,
                                    from: process.env.phoneNumber,

                                })
                                .then((message) => {

                                    newOtp = new UserOTPVerificationModel({
                                        _id: mongoose.Types.ObjectId(),
                                        phoneNumber: phoneNumber,
                                        otp: otp,

                                    });
                                    newOtp.save();
                                    res.json(message);
                                })
                                // here you can implement your fallback code
                                .catch((error) => {
                                    res.json(error);
                                });


                        }
                    })

                }
            } else {


            }
        })

    }
    // exports.postEnterEmailAddress = (req, res) => {

//     try {

//         emailAddress = req.body.emailAddress;


//         const otp = `${Math.floor(1000+Math.random()*9000)}`
//         console.log(otp)
//         var obj = {};
//         signupModel.findOne({ emailAddress: emailAddress }, (err, data) => {
//             if (data) {

//                 obj.data = data;
//                 obj.status = "Already Exists";
//                 res.json(obj);

//             } else {
//                 const newOTPVerif = new UserOTPEmailVerificationModel({
//                     // userId:_id,
//                     _id: mongoose.Types.ObjectId(),
//                     emailAddress: emailAddress,
//                     otp: otp,
//                 })

//                 newOTPVerif.save();
//                 transporter.sendMail({
//                     from: process.env.emailAddress,
//                     to: emailAddress,
//                     subject: 'Verify Account',
//                     html: "<h3>OTP for Scooto Email Verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>"

//                 });
//                 res.json({
//                     message: `Sent a verification email to ${emailAddress}`,
//                     status: "pending",
//                     data: {
//                         otp: otp
//                     }
//                 });
//             }
//         })
//     } catch (err) {

//     }

// }



// exports.verifyEmailOtp = (req, res) => {
//     const emailAddress = req.body.emailAddress;
//     const otp = req.body.otp;

//     UserOTPEmailVerificationModel.findOne({ emailAddress: emailAddress, otp: otp },
//         (err, data) => {
//             var userID;
//             if (!err && data !== null) {

//                 saveEmail = new signupModel({

//                     _id: mongoose.Types.ObjectId(),
//                     emailAddress: emailAddress,

//                 });
//                 saveEmail.save((err, data) => {
//                     console.log(data);
//                     userID = data._id;
//                 });
//                 setTimeout(() => {
//                     console.log(userID);
//                     newProfile = new profileModel({
//                         _id: mongoose.Types.ObjectId(),
//                         userID: userID,
//                         signup: userID


//                     })
//                     newProfile.save();
//                     UserOTPVerificationModel.deleteOne({ phoneNumber: phoneNumber, otp: otp },
//                         (err, data) => {
//                             if (!err) {
//                                 console.log("deleted");
//                             }
//                         }
//                     );
//                     res.json("otp Verified");
//                 }, 200);

//             } else {
//                 res.json(err);
//             }
//         }
//     );
// };

exports.verifyEmailOtpOfExistingUser = (req, res) => {

    const phoneNumber = req.body.phoneNumber
    const emailAddress = req.body.emailAddress;
    otp = req.body.otp;
    UserOTPEmailVerificationModel.findOne({ emailAddress: emailAddress, otp: otp }, (err, data) => {

        if (!err && data !== null) {
            signupModel.updateOne({ phoneNumber: phoneNumber }, { emailAddress: emailAddress }, (err, data) => {
                if (!err) {
                    res.json(data);
                    UserOTPEmailVerificationModel.deleteOne({ emailAddress: emailAddress, otp: otp }, (err, data) => {
                        console.log("otp deleted");
                    })
                }
            })


        }


    })




}
exports.verifyNumberOtpOfExistingUser = (req, res) => {

    const phoneNumber = req.body.phoneNumber
    const emailAddress = req.body.emailAddress;
    otp = req.body.otp;
    UserOTPVerificationModel.findOne({ phoneNumber: phoneNumber, otp: otp }, (err, data) => {

        if (!err && data !== null) {
            signupModel.updateOne({ emailAddress: emailAddress }, { phoneNumber: phoneNumber }, (err, data) => {
                if (!err) {
                    res.json(data);
                    UserOTPVerificationModel.deleteOne({ emailAddress: emailAddress, otp: otp }, (err, data) => {
                        console.log("otp deleted");
                    })
                }
            })


        }


    })




}

// exports.postJob = (req, res) => {
//     var id;
//     var obj={};
//     const jobTitle=req.body.jobTitle;
//     const companyName=req.body.companyName;
//     const videoUrl=req.body.videoUrl;
//     const jobDescription=req.body.jobDescription;
//     const hashTags=req.body.hashTags
//     const location=req.body.location
//     const salaryRange=req.body.salaryRange
//     const startDate=req.body.startDate
//     const Type=req.body.Type;
//     const userID=req.body.userID;
//     const profileID=req.body.profileID;

//     const newJob = new manageJobsModel({
//         _id:mongoose.Types.ObjectId(),
//          jobTitle:jobTitle,
//          companyName:companyName,
//          videoUrl:videoUrl,
//          jobDescription:jobDescription,
//          hashTags:hashTags,
//          location:location,
//          salaryRange:salaryRange,
//          startDate:startDate,
//          Type:Type,
//          userID:userID,
//          profileID:profileID

//     })
//     newJob.save(function(err,result){
//         if(!err){
//             obj.resp = result;
//             id=result._id;
//           jobID = [];
//           console.log(id);
//           profileModel.findOne({ _id: profileID, userID: userID }, (err, data) => {
//             if (!err) {
//               // console.log(data);
//               jobID = data.jobID;
//               console.log(jobID);
//               jobID.push(id);

//               profileModel.updateOne({ _id: profileID, userID: userID },{ jobID: jobID },(err, data) => {
//                   // console.log("added to profile");
//                  obj.jobAddedToProfile=data;

//                   // res.json(result)
//                 }
//               );
//             }
//           });
//           setTimeout(() => {

//               res.json(obj);
//           }, 100);
//         }
//         else{
//             res.json(err);
//         }
//     });

// }

// exports.deleteJob=(req,res)=>{
//    const  id=req.body.jobID;
//     manageJobsModel.deleteOne({_id:id},(err,resp)=>{
//         if(!err){
//             res.json(resp)
//         }
//         else{
//             res.json(err);
//         }
//     })
// }

// exports.putJob=(req,res)=>{
//     const id=req.body.jobID;
//     const jobTitle=req.body.jobTitle;
//     const companyName=req.body.companyName;
//     const videoUrl=req.body.videoUrl;
//     const jobDescription=req.body.jobDescription;
//     const hashTags=req.body.hashTags
//     const location=req.body.location
//     const salaryRange=req.body.salaryRange
//     const startDate=req.body.startDate
//     var hashTags1=[];

//         manageJobsModel.findOne({_id:id},  (err,data)=>{

//             hashTags1=data.hashTags
//             console.log("first",hashTags1);

//             hashTags1.push(...hashTags)

//             update();

//         });

//     function update(){
//         manageJobsModel.updateOne({_id:id},
//             {   jobTitle:jobTitle,
//                 companyName:companyName,
//                 videoUrl:videoUrl,
//                 jobDescription:jobDescription,
//                 hashTags:hashTags1,
//                 location:location,
//                 salaryRange:salaryRange,
//                 startDate:startDate},
//             {},(err,resp)=>{
//             if(!err){
//                 console.log("3rd",hashTags1);
//                 res.json(resp);
//             }
//             else{
//                 res.json(err);
//             }
//         })
//     }
// }