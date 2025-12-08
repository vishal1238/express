import React from 'react'
import "./App.css"
import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Dashboard from "./Dashboard";
const App = () => {
  return (
      <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
  )
}

export default App