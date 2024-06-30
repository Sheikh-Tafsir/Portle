import React, { useState, useEffect } from 'react'
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import './App.css'
import {useUserContext, UserProvider} from './context/UserContext';
import { checkLogin } from './utils/checkLogin';
import Login from './pages/auth/login/Login';
import Homepage from './pages/homepage/Homepage';
import Signup from './pages/auth/signup/Signup';
import PrivateRoute from './utils/PrivateRoute';
import Profile from './pages/profile/profile/Profile';
import Cvinput from './pages/portfolioinput/cvinput/Cvinput';
import InputMethod from './pages/portfolioinput/InputMethod';
import Portfolio from './pages/portfolio/Portfolio';
import Githubinput from './pages/portfolioinput/githubinput/Githubinput';

const App = () => {
  const loggedIn = checkLogin();
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={ <Homepage />} exact/>
            <Route path="/login" element={loggedIn ? <Navigate to="/" replace />: <Login />} />
            <Route path="/signup" element={loggedIn ? <Navigate to="/" replace />: <Signup />} />

            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile/>} />
              <Route path="/profile/inputmethod" element={<InputMethod/>} />
              <Route path="/profile/cvinput" element={<Cvinput/>} />
              <Route path="/profile/githubinput" element={<Githubinput/>} />
              <Route path="/portfolio/:name" element={<Portfolio />} />
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  )
}

export default App