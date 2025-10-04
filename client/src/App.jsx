import React from 'react'
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import './App.css'
import {UserProvider} from './context/UserContext';
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
import ProfileProjectsCreateGithub from './pages/portfolio/projects/ProfileProjectsCreateGithub';
import UpdateProjects from './pages/portfolio/projects/UpdateProjects';
import UpdateExperience from './pages/portfolio/experience/UpdateExperience';
import CreateExperience from './pages/portfolio/experience/CreateExperience';
import PublicRoute from './utils/PublicRoute';
import UpdateHeromain from './pages/portfolio/heromain/UpdateHeromain';

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

            <Route element={<PublicRoute/>}>
              <Route path="/portfolio/:name" element={<Portfolio />} />
            </Route>
            
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile/>} />
              <Route path="/profile/update" element={<UpdateHeromain/>} />
              <Route path="/profile/inputmethod" element={<InputMethod/>} />
              <Route path="/profile/cvinput" element={<Cvinput/>} />
              <Route path="/profile/githubinput" element={<Githubinput/>} />
              <Route path="/profile/projects/create" element={<ProfileProjectsCreateGithub/>} />
              <Route path="/profile/projects/update" element={<UpdateProjects/>} />
              <Route path="/profile/experiences/create" element={<CreateExperience/>} />
              <Route path="/profile/experiences/update" element={<UpdateExperience/>} />
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  )
}

export default App