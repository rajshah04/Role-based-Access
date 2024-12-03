const BASE_URL = process.env.REACT_APP_BASE_URL ;

// Auth Endpoints
export const authEndpoints = {
    LOGIN_API: BASE_URL + "/auth/login",
    SIGNUP_API: BASE_URL + "/auth/signup",
}

// Admin detail Endpoints
export const adminEndpoints = {
    GET_ADMIN_DETAILS: BASE_URL + "/details/getAdminDetails"
}

// Instructor detail Endpoints
export const instructorEndpoints = {
    GET_INSTRUCTOR_DETAILS: BASE_URL + "/details/getInstructorDetails"
}

// Student detail Endpoints
export const studentEndpoints = {
    GET_STUDENT_DETAILS: BASE_URL + "/details/getStudentDetails"
}