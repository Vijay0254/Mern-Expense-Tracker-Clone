import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const ProtectedRoute2 = () => {

    const { user } = useAuthStore()

  return !user ? <Outlet /> : <Navigate to={'/dashboard'} />
}

export default ProtectedRoute2