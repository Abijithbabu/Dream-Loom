import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PublicProtected = () => {
    const data = useSelector((state) => state?.data)
    return data?.isAuthenticated ? <Outlet /> : <Navigate to={'/login'} replace /> 
 }

export default PublicProtected