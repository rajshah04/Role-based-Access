import React from 'react';
import LoginForm from '../Components/Auth/LoginForm';

const Login = () => {
    return (
        <div className='mx-auto flex flex-col-reverse md:flex-row md:gap-y-0 md:gap-x-12 w-11/12 justify-between gap-y-12 py-12 my-8'>

            <div className='mx-auto w-11/12 max-w-[450px] bg-slate-950 rounded-2xl p-8'>
                <LoginForm />
            </div>
        </div>
    )
}

export default Login