import Home from './pages/Home'
import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Income from './pages/Income'
import Expense from './pages/Expense'
import ProtectedRoute1 from './utils/ProtectedRoute1'
import ProtectedRoute2 from './utils/ProtectedRoute2'
import Error_500 from './Error_Pages/Error_500'
import Error_404 from './Error_Pages/Error_404'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'

const App = () => {

  const { user, isCheckingAuth, verifyToken } = useAuthStore()

  const navigate = useNavigate()

  useEffect(() =>{
    verifyToken(navigate)
  }, [])

  if(isCheckingAuth && !user){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    )
  }

  return (
    <main>
      <Routes>

        <Route element={<ProtectedRoute2 />}>
          <Route path='/sign-up' element={<Signup />} />
          <Route path='/' element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute1 />}>
          <Route path='/dashboard' element={<Home />} />
          <Route path='/income' element={<Income />} />
          <Route path='/expense' element={<Expense />} />
        </Route>

        <Route path='/500' element={<Error_500 />} />
        <Route path='*' element={<Error_404 />} />
        
      </Routes>
    </main>
  )
}

export default App