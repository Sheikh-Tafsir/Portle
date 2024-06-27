import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Link, useNavigate } from 'react-router-dom';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import './Login.css'

import ButtonLoading from '../../../mycomponents/loading/Loading';
import {useUserContext} from '../../../context/UserContext';
import { apiPath } from '../../../utils/apiPath';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    const [googleUser, setGoogleUser ] = useState([]);

    const navigate = useNavigate();
    const {userInfo, setUserInfo} = useUserContext();

    const loginUser = async () => {         
        setLoginStatus("");
        if(email === "" || email == null || email === undefined){
            setLoginStatus("Email is empty");
        }
        else if(password === "" || password == null || password === undefined){
            setLoginStatus("password is empty");
        }
        else{
            setButtonLoading(true);
            try{
                const apipath = `${apiPath}/auth/login`;
                const response = await axios.post(apipath, 
                {
                    email:email,
                    password:password
                })
                //console.log(response);
                
                setLoginStatus(response.data.message);
                setButtonLoading(false);
                // console.log(response.data);
                if(response.status == 200){
                    setEmail('');
                    setPassword('');

                    localStorage.setItem('hackInShellAccessToken', response.data.token);
                    
                    //const userObj=response.data.user;
                    const userObj = jwtDecode(response.data.token);
                    setUserInfo(userObj);
                }
                else{
                    //
                }
            }
            catch(error){
                //console.log(error.response);
                setButtonLoading(false);
                if(error.response.status == 401){
                    setLoginStatus(error.response.data.message);
                }
                else setLoginStatus(error.message);
            };
        }
    };
    
    useEffect(() => {
        if (userInfo && Object.keys(userInfo).length > 0) {
            navigate('/profile', { replace: true });
        }
    }, [userInfo]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            const passwordInput = document.querySelector('input[type="password"]');
            if (passwordInput) {
                passwordInput.focus();
            }
        }
    };

    // const handleGoogleSuccess = async (response) => {
    //     try {
    //         const { credential } = response;
    //         console.log(jwtDecode(response));
    //         const apipath = `${apiPath}/auth/google-login`;
    //         const res = await axios.post(apipath, { token: credential });

    //         if (res.status === 200) {
    //             localStorage.setItem('hackInShellAccessToken', res.data.token);
                
    //             const userObj = jwtDecode(res.data.token);
    //             setUserInfo(userObj);
    //         } else {
    //             setLoginStatus('Google login failed 1');
    //         }
    //     } catch (error) {
    //         setLoginStatus('Google login failed 2');
    //     }
    // };

    // const handleGoogleFailure = () => {
    //     setLoginStatus('Google login failed 3');
    // };

    const googleLoginFunc = useGoogleLogin({
        onSuccess: (codeResponse) => setGoogleUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (googleUser) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${googleUser.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        console.log(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ googleUser ]
    );

  return (
    <div className='login'>
        <div className='login_mainBox'>
            <h2>Login User</h2>
            <Input type="text" placeholder="Insert email" value={email} onChange={(event) => {setEmail(event.target.value);}}
                onKeyDown={handleKeyPress}
            />
            <Input type="password" placeholder="Insert Password" value={password} onChange={(event) => {setPassword(event.target.value);}}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        loginUser();
                    }
                }}
            />
            <p>{loginStatus}</p>
            <Button variant="outline" onClick={()=>loginUser()}>
                { buttonLoading? 
                    <ButtonLoading/>:
                    'Login'
                }
            </Button>
            {/* <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onFailure={handleGoogleFailure}
            /> */}
            <Button onClick={googleLoginFunc}>Sign in with Google 🚀 </Button>
            <Link to='/auth/forgotpassword' className='login_mainBox_link'>Forgot Password?</Link>
        </div>
    </div>
  )
}

export default Login