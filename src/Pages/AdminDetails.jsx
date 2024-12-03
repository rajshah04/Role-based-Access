import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAdminDetails } from '../Services/Operations/detailsAPI';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../Utils/Constants';
// import { setLoading } from '../Redux/Slices/authSlice';

const AdminDetails = () => {

    // const { loading } = useSelector((state) => state.auth) ;
    const { token, user } = useSelector((state) => state.auth) ;

    const [loading, setLoading] = useState(false) ;

    useEffect(() => {
        const fetchAdminDetails = async() => {
            setLoading(true) ;

            const response = await getAdminDetails(token, user.email) ;
            console.log("Response in admin details : ", response) ;

            setLoading(false) ;
        }

        if(token){
            fetchAdminDetails() ;
        }
        else{
            toast("Please login first.") ;
            return ;
        }
    }, []) ;

    return (
        <div>

            {
                loading && (
                    <div className='w-full'>
                        <div className='spinner'>

                        </div>
                    </div>
                )
            }

            {
                !token && (
                    <div className='text-white'>
                        Please Login/Signup first.
                    </div>
                )
            }       

            {
                user?.accountType === ACCOUNT_TYPE.ADMIN ? (
                    <div className='text-white'>
                        <p>
                            Admin Details : 
                        </p>

                        <p>
                            First Name : {user?.firstName}
                        </p>

                        <p>
                            Last Name : {user?.lastName}
                        </p>

                        <p>
                            Email Id : {user?.email}
                        </p>
                    </div>
                ) 
                : (
                    token &&
                    <div className='text-white'>
                        {user?.accountType} cannot access this route. Only Admins can access this route
                    </div>
                )
            }
        </div>
    )
}

export default AdminDetails