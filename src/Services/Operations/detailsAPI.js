import toast from "react-hot-toast";
import { adminEndpoints, instructorEndpoints, studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";


const { GET_ADMIN_DETAILS } = adminEndpoints ;
const { GET_INSTRUCTOR_DETAILS } = instructorEndpoints ;
const { GET_STUDENT_DETAILS } = studentEndpoints ;

export const getAdminDetails = async(token, email) => {
    const toastId = toast.loading("Loading...") ;
    let result = [] ;

    try {
        const response = await apiConnector("POST", GET_ADMIN_DETAILS, {email},
            {
                Authorization: `Bearer ${token}`
            }
        ) ;

        if (!response?.data?.success) {
        throw new Error("Could Not Fetch Admin Details") ;
        }

        // console.log("Response of admin details : ", response) ;

        toast.success("Admin Details Fetched.") ;
        result = response?.data?.adminDetails ;
    } catch (err) {
        console.log("GET_ADMIN_DETAILS_API API ERROR............", err) ;
        toast.error(err.response.data.message) ;
    }
    
    toast.dismiss(toastId) ;
    return result ;
}

export const getInstructorDetails = async(token, email) => {
    const toastId = toast.loading("Loading...") ;
    let result = [] ;

    try {
        const response = await apiConnector("POST", GET_INSTRUCTOR_DETAILS, {email},
            {
                Authorization: `Bearer ${token}`
            }
        ) ;

        if (!response?.data?.success) {
        throw new Error("Could Not Fetch Instructor Details") ;
        }

        // console.log("Response of Instructor details : ", response) ;

        toast.success("Instructor Details Fetched.") ;
        result = response?.data?.instructorDetails ;
    } catch (err) {
        console.log("GET_INSTRUCTOR_DETAILS_API API ERROR............", err) ;
        toast.error(err.response.data.message) ;
    }
    
    toast.dismiss(toastId) ;
    return result ;
}

export const getStudentDetails = async(token, email) => {
    const toastId = toast.loading("Loading...") ;
    let result = [] ;

    try {
        const response = await apiConnector("POST", GET_STUDENT_DETAILS, {email},
            {
                Authorization: `Bearer ${token}`
            }
        ) ;

        if (!response?.data?.success) {
        throw new Error("Could Not Fetch Admin Details") ;
        }

        // console.log("Response of student details : ", response) ;

        toast.success("Student Details Fetched.") ;
        result = response?.data?.studentDetails ;
    } catch (err) {
        console.log("GET_STUDENT_DETAILS_API API ERROR............", err) ;
        toast.error(err.response.data.message) ;
    }
    
    toast.dismiss(toastId) ;
    return result ;
}