const jwt = require("jsonwebtoken") ;
require("dotenv").config() ;
const bcrypt = require("bcrypt") ;
const User = require("../models/User");


// sign up
exports.signUp = async(req, res) => {
    try{
        // data fetch from request ki body
        const {firstName, lastName, email, password, confirmPassword, accountType} = req.body ;

        // validate kar lo
        if(!firstName || !lastName || !email || !password || !confirmPassword || !accountType){
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })
        }
        
    // Check if password and confirm password match
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match. Please try again."
            })
        }

        // check user already exist or not
        const userExists = await User.findOne({email}) ;
        if(userExists){
            return res.status(400).json({
                success: false,
                message: "User already exists. Please sign in to continue."
            })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10) ;

        console.log("Hashed password: ", hashedPassword) ;

        // entry create in DB
        const userData =  await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
        }) ;

        // return res
        return res.status(200).json({
            success: true,
            message: "User Registered Successfully",
            userData
        }) ;

    }catch(err){
        console.log("Error occured while  registering user", err.message) ;
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again"
        })
    }
}

// login
exports.logIn = async(req, res) => {
    try{
        // get data from req body
        const {email, password} = req.body ;

        // validation data
        if(!email || !password){
            // Return 400 Bad Request status code with error message
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            }) ;
        }

        //  user check exists or not
        const user = await User.findOne({email}) ;

        if(!user){
            // Return 401 Unauthorized status code with error message
            return res.status(401).json({
                success: false,
                message: "User is not registered, Please sign up first"
            }) ;
        }

        // generate JWT, after password matching
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            } ;

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h"
            }) ;

            // user = user.toObject() ;
            user.token = token ;
            user.password = undefined ;
            
            // create cookie and send response
            
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged In Successfully"
            }) ;

        }
        else{
            return res.status(401).json({
                success: false,
                message: "Password is Incorrect"
            }) ;
        }

    }catch(err){
        console.log(err) ;
        return res.status(500).json({
            success: false,
            message: "Login failure, Please try again later"
        }) ;

    }
}