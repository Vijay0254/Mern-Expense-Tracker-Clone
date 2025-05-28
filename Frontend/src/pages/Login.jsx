import React, { useState } from 'react'
import AuthLayout from '../components/layout/AuthLayout'
import Input from '../components/inputs/Input'
import { useAuthStore } from '../store/useAuthStore'
import { Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const { handleLogin, error, isLoggingIn } = useAuthStore()

    const navigate = useNavigate()

  return (
    <AuthLayout>
        <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
            <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
            <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your details to log in</p>

            <form onSubmit={(event) =>handleLogin(event, navigate, email, password)} className='space-y-6' action="">
                <Input type='email' value={email} onChange={(event) =>setemail(event.target.value)} placeholder='example@gmail.com' id='email' name='email' label='Email' error={(error == "Invalid Email" || error == "Email is Required" || error == "Email is not Registered") ? error : ""}/>
                <Input type='password' value={password} onChange={(event) =>setpassword(event.target.value)} placeholder='Min 8 Characters' id='password' name='password' label='Password' error={(error == "Password is Wrong" || error == "Password is Required") ? error : ""} />
                <button type='submit' className='btn-primary flex justify-center items-center gap-x-2'>{isLoggingIn ? <><Loader2 className='size-5 animate-spin' />Loading...</> : "Login"}</button>
                <p className='text-[13px] text-slate-800 mt-3'>Don't have an account?{" "}<Link className='font-medium text-primary underline' to={'/sign-up'}>Signup</Link></p>
            </form>
        </div>
    </AuthLayout>
  )
}

export default Login