const mongoose = require("mongoose") ;
require("dotenv").config() ;

exports.connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Database Connection Successful"))
    .catch((err) => {
        console.log("DB Connection Failed") ;
        console.error(err) ;
        process.exit(1) ;
    })
}