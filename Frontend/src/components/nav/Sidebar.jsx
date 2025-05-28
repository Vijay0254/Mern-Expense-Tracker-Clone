import React from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { SIDEBAR_DATA } from '../../utils/data'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const Sidebar = ({ activeMenu }) => {

    const { user, isLoggingOut, handleLogout } = useAuthStore()

    const navigate = useNavigate()

    function handleSidebarMenu(path){
        if(path == "/logout"){
            handleLogout(navigate)
        }
        else{
            navigate(path)
        }
    }

  return (
    <nav className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px]'>
        <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
            <img src={user?.profileImg} alt="profileImg" className='size-16 bg-slate-400 rounded-full' />
            <h5 className='text-gray-950 font-medium leading-6'>{user?.fullName}</h5>
        </div>

        {SIDEBAR_DATA.map((element) =>(
            <button onClick={() =>handleSidebarMenu(element.path)} key={element.id} className={`w-full cursor-pointer flex items-center gap-4 text-[15px] ${activeMenu == element.label ? "text-white bg-primary" : ""} py-3 px-6 rounded-lg mb-3`}>  
                {(element.label == "Logout" && isLoggingOut) ? <Loader2 className='animate-spin' /> : <element.icon />}
                {element.label}
            </button>
        ))}
    </nav>
  )
}

export default Sidebar