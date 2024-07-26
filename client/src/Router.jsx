import React from 'react'
import { Route, Routes } from "react-router-dom";
import Loginpage from './pages/auth/Loginpage';

function Router() {
  return (
    <Routes>
        <Route path="/login" element={<Loginpage/>} />
    </Routes> 
  )
}

export default Router;