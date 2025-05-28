import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'

const Input = ({ type, value, onChange, placeholder, id, name, label, error }) => {

    const [showPassword, setshowPassword] = useState(false)

  return (
    <div>
        <label htmlFor={name} className='text-[13px] text-slate-800'>{label}</label>
        <div className='w-full relative justify-between flex gap-3 text-sm text-black bg-slate-100 rounded px-4 py-3 mb-4 mt-3 border outline-none border-slate-200'>
            <input className='w-full bg-transparent outline-none' type={type == "password" ? (showPassword ? "text" : "password") : type} value={value} onChange={onChange} placeholder={placeholder} id={id} name={name} />

            {type == "password" && 
                (showPassword ? 
                    <Eye className='text-primary cursor-pointer' onClick={() =>setshowPassword(!showPassword)} /> :
                    <EyeOff className='text-primary cursor-pointer' onClick={() =>setshowPassword(!showPassword)} />
                )
            }

            {error && <p className='text-red-500 text-xs absolute -bottom-4 left-1'>{error}</p>}
        </div>
    </div>
  )
}

export default Input