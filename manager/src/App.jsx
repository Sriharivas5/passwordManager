import React from 'react'
import Login from './Components/Auth/Login/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Manager from './Components/Manager/Manager'
import Regsiter from './Components/Auth/Register/Register'

import ProtectedRoutes from "./utils/ProtectedRoutes"
import "./App.css"
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Regsiter />} />
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/manager' element={<Manager />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App