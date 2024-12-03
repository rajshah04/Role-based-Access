import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ACCOUNT_TYPE } from '../../Utils/Constants';
import { login } from '../../Services/Operations/authAPI';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false) ;
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    }) ;

    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT) ;

    const {email, password} = formData ;

    const changeHandler = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        })) ;
    }

    const dispatch = useDispatch() ;
    const navigate = useNavigate() ;

    const submitHandler = (e) => {
        e.preventDefault() ;
        dispatch(login(email, password, navigate)) ;
    }

    // console.log(accountType) ;
    // console.log(formData) ;

    return (
        <form className='mt-6 flex w-full flex-col gap-y-4' onSubmit={submitHandler}>

            <div className='my-2 p-1 hidden lg:flex justify-center items-center bg-slate-800 border-slate-600 border-b-2 rounded-full text-white font-medium w-fit'>
                <h1 className={`${accountType === ACCOUNT_TYPE.STUDENT ? "bg-slate-950 text-white border-white rounded-full" : ""} cursor-pointer transition-all duration-200 gap-9 hover:text-white hover:bg-slate-950 hover:rounded-full px-8 py-2`} onClick={() => setAccountType(ACCOUNT_TYPE.STUDENT)}>
                    Student
                </h1>

                <h1 className={`${accountType === ACCOUNT_TYPE.INSTRUCTOR ? "bg-slate-950 text-white border-white rounded-full" : ""} cursor-pointer transition-all duration-200 gap-9 hover:text-white hover:bg-slate-950 hover:rounded-full px-8 py-2`} onClick={() => setAccountType(ACCOUNT_TYPE.INSTRUCTOR)}>
                    Instructor
                </h1>

                <h1 className={`${accountType === ACCOUNT_TYPE.ADMIN ? "bg-slate-950 text-white border-white rounded-full" : ""} cursor-pointer transition-all duration-200 gap-9 hover:text-white hover:bg-slate-950 hover:rounded-full px-8 py-2`} onClick={() => setAccountType(ACCOUNT_TYPE.ADMIN)}>
                    Admin
                </h1>
            </div>

            <label className='w-full'>
                <p className='text-sm leading-[22px] font-normal text-white mb-1'>
                    Email Address <sub className='text-red-600 text-lg '>*</sub>
                </p>
                
                <input required type='text' name='email' value={email} 
                placeholder='Enter email address' 
                className='w-full rounded-lg bg-slate-800 p-3 text-white border-b-2  border-slate-700' 
                onChange={changeHandler}/>
            </label>

            <label className='w-full relative'>
                <p className='text-sm leading-[22px] font-normal text-white mb-1'>
                    Password <sub className='text-red-600 text-lg'>*</sub>
                </p>
                
                <input required type={`${showPassword ? "text" : "password"}`} name='password' value={password} 
                placeholder='Enter password' 
                className='w-full rounded-lg bg-slate-800 p-3 text-white tracking-wide border-b-2 border-slate-700' 
                onChange={changeHandler}/>
                <span className='absolute' onClick={() => setShowPassword((prev) => (!prev))}>
                    {
                        showPassword ? 
                        (<AiOutlineEyeInvisible className='cursor-pointer text-2xl -translate-x-10 translate-y-3' fill='#AFB2BF' />) 
                        : (<AiOutlineEye className='cursor-pointer text-2xl -translate-x-10 translate-y-3' fill='#AFB2BF' />)
                    }
                </span>
                
            </label>

            <button type='submit' className='bg-yellow-400 border-b-2 border-yellow-300 text-center text-base font-medium text-slate-950 rounded-lg py-2 px-3 mt-6 hover:scale-95 transition-all duration-200'>
                Log In
            </button>

        </form>
    ) 
}

export default LoginForm