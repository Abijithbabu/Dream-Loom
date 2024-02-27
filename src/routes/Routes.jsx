import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Layout from '../components/Layout'
// import FaceDetection from '../components/FaceDetection' 
import Login from '../components/Login'
import AuthLayout from '../components/AuthLayout'
import Register from '../components/Register'
import Settings from '../components/Settings'

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/favorites" element={<Home />} />
        <Route path="/create" element={<Home />} />
        <Route path="/library" element={<Home />} />
        {/* <Route path="/face-recognition" element={<FaceDetection/>}/>  */}
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
      <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
    </Routes>
  )
}

export default Router