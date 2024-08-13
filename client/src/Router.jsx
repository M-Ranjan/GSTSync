import React from 'react'
import { Route, Routes } from "react-router-dom";
import SignIn from './pages/Authentication/SignIn';

function Router() {
  return (
    <Routes>
        <Route path="/signin" element={<SignIn/>} />
    </Routes> 
  )
}

export default Router;