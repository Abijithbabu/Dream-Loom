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
import VoiceSettings from '../components/VoiceSettings'
import Mcq from '../pages/Mcq'
import AuthRoutes from './AuthProtected'
import PublicProtected from './PublicProtected'
import Library from '../pages/Library'
import Favorites from '../pages/Favorites'

const Router = () => {
  return (
    <Routes>
      <Route element={<AuthRoutes />} >
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/set-child-profile" element={<ChildProfile />} />
        </Route>
      </Route>
      <Route element={<PublicProtected />} >
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/create" element={<Create />} />
          <Route path="/library" element={<Library />} />
          <Route path="/face-recognition" element={<FaceDetection />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/voice-settings" element={<VoiceSettings />} />
          <Route path="/profile" element={<Settings />} />
          <Route path="/recite" element={<Story />} />
          <Route path="/questionare" element={<Mcq />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default Router