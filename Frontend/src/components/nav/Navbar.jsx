import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { Menu, X } from 'lucide-react'

const Navbar = ({ activeMenu }) => {

    const [toggle, settoggle] = useState(false)

  return (
    <nav className='flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] px-4 py-7 sticky top-0 z-30'>
        <button className='block cursor-pointer lg:hidden text-black' onClick={() =>settoggle(!toggle)}>{toggle ? <X className='text-2xl' /> : <Menu className='text-2xl' />}</button>
        <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
        {toggle && 
            <div className='fixed top-[61px] -ml-4 bg-white'>
                <Sidebar activeMenu={activeMenu} />
            </div>
        }
    </nav>
  )
}

export default Navbar