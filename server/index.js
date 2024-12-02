const express = require("express") ;
const app = express() ;

const userRoutes = require("./routes/User") ;
const detailRoutes = require("./routes/Details") ;

const cors = require("cors") ;
const cookieParser = require("cookie-parser") ;

require("dotenv").config() ;
const PORT = process.env.PORT || 4000 ;

// database connection
require("./config/database").connectDB() ;

app.use(express.json()) ;
app.use(cookieParser()) ;
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
})) ;

// route import and mount
app.use("/api/v1/auth", userRoutes) ;
app.use("/api/v1/details", detailRoutes) ;

// default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running..."
    }) ;
})

// activate
app.listen(PORT, () => {
    console.log(`App is currently listening at ${PORT}`) ;
})