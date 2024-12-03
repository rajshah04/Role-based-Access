import React from 'react'
import SignupForm from '../Components/Auth/SignupForm'

const Signup = () => {
    return (
        <div className='mx-auto flex flex-col-reverse md:flex-row md:gap-y-0 md:gap-x-12 w-11/12 justify-between gap-y-12 py-12'>

            <div className='mx-auto w-11/12 max-w-[450px] bg-slate-950 rounded-2xl p-8'>
                <SignupForm />
            </div>
        </div>
    )
}

export default Signup