import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getStudentDetails } from '../Services/Operations/detailsAPI';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../Utils/Constants';

const AdminDetails = () => {

    const { token, user } = useSelector((state) => state.auth) ;

    const [loading, setLoading] = useState(false) ;

    useEffect(() => {
        const fetchStudentDetails = async() => {
            setLoading(true) ;

            const response = await getStudentDetails(token, user.email) ;
            console.log("Response in student details : ", response) ;

            setLoading(false) ;
        }

        if(token){
            fetchStudentDetails() ;
        }
        else{
            toast("Please login first.") ;
            return ;
        }
    }, []) ;


    // const { accountType, email, firstName, lastName } = user ;

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
                user?.accountType === ACCOUNT_TYPE.STUDENT ? (
                    <div className='text-white'>
                        <p>
                            Student Details : 
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
                        {user?.accountType} cannot access this route. Only Students can access this route
                    </div>
                )
            }
        </div>
    )
}

export default AdminDetails