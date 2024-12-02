const express = require("express") ;
const router = express.Router() ;

const { auth, isAdmin, isInstructor, isStudent } = require("../middlewares/auth") ;
const { getAdminDetails, getInstructorDetails, getStudentDetails } = require("../controllers/Details") ;

// route for admin
router.post("/getAdminDetails", auth, isAdmin, getAdminDetails) ;

// route for instructor
router.post("/getInstructorDetails", auth, isInstructor, getInstructorDetails) ;

// route for student
router.post("/getStudentDetails", auth, isStudent, getStudentDetails) ;

module.exports = router ;