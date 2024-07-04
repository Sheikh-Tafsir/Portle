import { Outlet, Navigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

import { checkLogin } from './checkLogin'
import NavigationBar from '../mycomponents/navbar/NavigationBar';
import CopyRight from '@/mycomponents/copyright/CopyRight';

const PrivateRoute = () => {
    let loggedIn = checkLogin();

    return(
        loggedIn ? 
        <main>
          <NavigationBar />
          <Outlet/> 
          {/* <CopyRight/> */}
        </main>
        : 
        <Navigate to="/signup" />
    )
}

export default PrivateRoute