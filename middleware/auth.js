const jwt = require('jsonwebtoken');
require('dotenv').config();

console.log("kkk");
module.exports = (req, res, next) => {
    try {
        console.log("vmnmn");

        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        const decodedToken = jwt.verify(token, process.env.key);
        console.log(decodedToken);
        const userId = decodedToken._id;
        console.log(userId);
        if (process.env.id !== userId) {
            res.json('Invalid user ID');
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};