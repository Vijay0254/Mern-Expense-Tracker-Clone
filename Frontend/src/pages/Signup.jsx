import React, { useState } from 'react'
import AuthLayout from '../components/layout/AuthLayout'
import Input from '../components/inputs/Input'
import { useAuthStore } from '../store/useAuthStore'
import { Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import PhotoSelector from '../components/inputs/PhotoSelector'

const Signup = () => {

    const [profileImg, setprofileImg] = useState(null)
    const [fullName, setfullName] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const { handleSignup, error, isSigningUp } = useAuthStore()

    const navigate = useNavigate()

  return (
    <AuthLayout>
        <div className='lg:w-[70%] mt-7 md:h-full flex flex-col justify-center'>
            <h3 className='text-xl font-semibold text-black'>Create Account</h3>
            <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering your details here</p>

            <form onSubmit={(event) =>handleSignup(event, navigate, fullName, email, password, profileImg)} className='space-y-6' action="">
                <div className='flex justify-center'>
                    <PhotoSelector profileImg={profileImg} setprofileImg={setprofileImg} />
                </div>
                <Input type='text' value={fullName} onChange={(event) =>setfullName(event.target.value)} placeholder='Johnny Dial' id='fullName' name='fullName' label='Fullname' error={error == "Name is Required" ? error : ""}/>
                <Input type='email' value={email} onChange={(event) =>setemail(event.target.value)} placeholder='example@gmail.com' id='email' name='email' label='Email' error={(error == "Invalid Email" || error == "Email is Required" || error == "Email already Registered") ? error : ""}/>
                <Input type='password' value={password} onChange={(event) =>setpassword(event.target.value)} placeholder='Min 8 Characters' id='password' name='password' label='Password' error={(error == "Password is Weak" || error == "Password is Required") ? error : ""} />
                <button type='submit' className='btn-primary flex justify-center items-center gap-x-2'>{isSigningUp ? <><Loader2 className='size-5 animate-spin' />Loading...</> : "Signup"}</button>
                <p className='text-[13px] text-slate-800 mt-3'>Already have an account?{" "}<Link className='font-medium text-primary underline' to={'/login'}>Login</Link></p>
            </form>
        </div>
    </AuthLayout>
  )
}

export default Signup