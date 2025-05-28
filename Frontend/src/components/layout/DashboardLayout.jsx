import React from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import Navbar from '../nav/Navbar'
import Sidebar from '../nav/Sidebar'


const DashboardLayout = ({ children, activeMenu }) => {

    const { user } = useAuthStore()

  return (
    <section>
        <Navbar activeMenu={activeMenu} />
        {user && 
            <div className='flex'>
                <div className='max-[1080px]:hidden'>
                    <Sidebar activeMenu={activeMenu} />
                </div>
                <div className='grow mx-5'>{children}</div>
            </div>
        }
    </section>
  )
}

export default DashboardLayout