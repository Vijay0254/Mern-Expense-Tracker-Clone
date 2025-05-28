import React from 'react'
import Loginimg from '../../assets/Login.png'
import StatsInfoCard from '../card/StatsInfoCard'
import { TrendingUpDown } from 'lucide-react'

const AuthLayout = ({ children }) => {
  return (
    <section className='flex'>
        <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
            <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
            {children}
        </div>

        <div className='hidden md:block w-[40vw] h-screen bg-cover bg-auth-bg-img bg-no-repeat bg-center overflow-hidden p-8 relative bg-violet-50'>
          <div className='w-56 h-56 rounded-[40px] bg-purple-600 absolute -top-7 -left-5'></div>
          <div className='w-56 h-64 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10'></div>
          <div className='w-56 h-56 rounded-[40px] bg-purple-600 absolute -bottom-7 -left-5'></div>
          
          <div className='grid grid-cols-1 z-20'>
            <StatsInfoCard icon={<TrendingUpDown />} label="Track Your Income & Expense" value="430,000" color="bg-primary" />
          </div>
          
          <img className='w-[90%] lg:w-[75%] absolute bottom-10 shadow-lg shadow-blue-400/15' src={Loginimg} alt="loginImg" />
        </div>
    </section>
  )
}

export default AuthLayout