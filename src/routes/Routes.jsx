import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Layout from '../components/Layout'
import FaceDetection from '../components/FaceDetection'
import Login from '../components/Login'
import AuthLayout from '../components/AuthLayout'
import Register from '../components/Register'
import Settings from '../components/Settings'
import ChildProfile from '../components/ChildDetails'
import Create from '../pages/Create'
import Story from '../pages/Story'

const Router = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/set-child-profile" element={<ChildProfile />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/favorites" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/library" element={<Home />} />
        <Route path="/face-recognition" element={<FaceDetection />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/voice-settings" element={<Settings />} />
        <Route path="/profile" element={<Settings />} />
        <Route path="/recite" element={<Story />} />
      </Route>
    </Routes>
  )
}

export default Router