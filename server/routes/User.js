const express = require("express") ;
const router = express.Router() ;

const { logIn, signUp } = require("../controllers/Auth") ;

// route for user signup
router.post("/signup", signUp) ;

// route for user login
router.post("/login", logIn) ;


module.exports = router ;