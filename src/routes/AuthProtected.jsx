import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoutes = () => {
   const data = useSelector((state) => state?.data)
   return data?.isAuthenticated ? <Navigate to={'/'} replace /> :<Outlet /> 
}

export default AuthRoutes