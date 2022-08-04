const express = require("express")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
// const sessions = require('express-session');
var cors = require('cors');

const app = express();




app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())


//session middleware
// app.use(sessions({
//     secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
//     saveUninitialized:true,
//     cookie: { maxAge: oneDay },
//     resave: false
// }));
mongoose.connect("mongodb://127.0.0.1:27017/Scooto")
    // mongoose.connect("mongodb+srv://hasnat100:123hasnat@cluster0.pslss.mongodb.net/Scooto")

app.use("/signup", require("./routes/signupRoutes"))
app.use("/completeProfile", require("./routes/signupRoutes"))
app.use("/documents", require("./routes/documentRoutes"))
app.use("/verifyProfile", require("./routes/documentRoutes"))
app.use("/adminSignin", require("./routes/adminSigninRoutes"))
app.use("/adminSignup", require("./routes/adminSignupRoutes"))
app.use("/subAdmin", require("./routes/subAdminRoutes"))
app.use("/location", require("./routes/locationRoutes"))
app.use("/station", require("./routes/stationRoutes"))
app.use("/scooter", require("./routes/scooterRoutes"))




















app.listen(3000, function() {
    console.log("server started on port 3000")
})