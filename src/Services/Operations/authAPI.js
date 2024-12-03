import toast from "react-hot-toast";
import { authEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setLoading, setToken, setUser } from "../../Redux/Slices/authSlice";


const { LOGIN_API, SIGNUP_API } = authEndpoints ;

export function login(email, password, navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...") ;
        dispatch(setLoading(true)) ;

        try{
            const response = await apiConnector("POST", LOGIN_API, {email, password}) ;

            // console.log("LOGIN API RESPONSE ----> ", response) ;
            // console.log(response.data.token) ;

            if(!response.data.success){
                // toast.error(response.response.data.message) ;
                throw new Error(response.data.message) ;
            }

            toast.success("Logged In") ;
            
            dispatch(setToken(response.data.token)) ;
            
            dispatch(setUser(response.data.user)) ;

            // console.log("Printing USER info", response.data.user) ;
            
            localStorage.setItem("token", JSON.stringify(response.data.token)) ;
            localStorage.setItem("user", JSON.stringify(response.data.user)) ;
            navigate("/") ;
        }
        catch(err){
            console.log("LOGIN API ERROR............", err) ;
            toast.error(err.response.data.message) ;
        }

        dispatch(setLoading(false)) ;
        toast.dismiss(toastId) ;
    }
}

export function signup(accountType, firstName, lastName, email, password, confirmPassword, navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...") ;
        dispatch(setLoading(true)) ;

        try{
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
            }) ;

            console.log("Response of sending signup data ---> ", response) ;

            if(!response.data.success){
                throw new Error(response.data.message) ;
            }

            toast.success("Signed Up") ;
            navigate("/login") ;
        }
        catch(err){
            console.log("SIGNUP API ERROR ---> ", err) ;
            toast.error("Signup Failed") ;
        }

        dispatch(setLoading(false)) ;
        toast.dismiss(toastId) ;
    }
}

export function logout(navigate){
    return (dispatch) => {
        dispatch(setToken(null)) ;
        dispatch(setUser(null)) ;
        localStorage.removeItem("user") ;
        localStorage.removeItem("token") ;
        toast.success("Logged Out") ;
        navigate("/") ;
    }
}