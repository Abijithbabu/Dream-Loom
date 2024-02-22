import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Layout from '../components/Layout'
import FaceDetection from '../components/FaceDetection' 

const Router = () => {
  return (
    <Routes>
        <Route element={<Layout/>}>

        <Route path="/" element={<Home/>}/> {/* 👈 Renders at /app/ */}
        <Route path="/home" element={<Home/>}/>
        <Route path="/favorites" element={<Home/>}/>
        <Route path="/create" element={<Home/>}/>
        <Route path="/library" element={<Home/>}/>
        {/* <Route path="/face-recognition" element={<FaceDetection/>}/>  */}
        <Route path="/settings" element={<FaceDetection/>}/>
        </Route>
    </Routes>
  )
}

export default Router