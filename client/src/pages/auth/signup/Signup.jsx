import React, { useState, useEffect} from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import ButtonLoading from '../../../mycomponents/loading/Loading';
import {useUserContext} from '../../../context/UserContext';
import { apiPath } from '../../../utils/apiPath';
import './Signup.css'
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    const [googleButtonLoading, setGoogleButtonLoading] = useState(false);
    const [googleUser, setGoogleUser ] = useState([]);

    const navigate = useNavigate();
    const {userInfo, setUserInfo} = useUserContext();

    //login
    const loginFunc = async () => {         
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

                        localStorage.setItem('portleAccessToken', response.data.token);
                        
                        //const userObj=response.data.user;
                        const userObj = jwtDecode(response.data.token);
                        setUserInfo(userObj);
                        navigate('/profile', { replace: true });
                    }
                    else{
                        //
                    }
            }
            catch(error){
                setButtonLoading(false);
                if(error.response.status == 401){
                    setLoginStatus(error.response.data.message);
                }
                else setLoginStatus(error.message);
            };
        }
    };

    //signup
    const signupFunc = async () => {         
        if(name === "" || name == null || name === undefined){
            setLoginStatus("Name is empty");
        }
        else if(email === "" || email == null || email === undefined){
            setLoginStatus("Email is empty");
        }
        else if(password === "" || password == null || password === undefined){
            setLoginStatus("password is empty");
        }
        else if(confirmPassword === "" || confirmPassword == null || confirmPassword === undefined){
            setLoginStatus("confirm password is empty");
        }
        else if(password != confirmPassword){
            setLoginStatus("password and confirm password dont match");
        }

        else{
            setButtonLoading(true);
            try{
                    const apipath = `${apiPath}/auth/signup`;
                    const response = await axios.post(apipath, 
                    {
                        username:name,
                        email:email,
                        password:password
                    })
                    //console.log(response);
                    
                    setLoginStatus(response.data.message);
                    setButtonLoading(false);
                    // console.log(response.data);
                    if(response.status == 201){
                        setName('');
                        setEmail('');
                        setPassword('');
                        setConfirmPassword('');

                        localStorage.setItem('portleAccessToken', response.data.token);
                        
                        //const userObj=response.data.user;
                        const userObj = jwtDecode(response.data.token);
                        setUserInfo(userObj);
                        navigate('/profile', { replace: true });
                    }
                    else{
                        //
                    }
            }
            catch(error){
                setButtonLoading(false);
                if(error.response.status == 401){
                    setLoginStatus(error.response.data.message);
                }
                else setLoginStatus(error.message);
            };
        }
    };    
    
    //google login
    const loginGoogleFunc = async (googleEmail, googleName) => {  
        try{
            setGoogleButtonLoading(true);
            const apipath = `${apiPath}/auth/googlelogin`;
            const response = await axios.post(apipath, 
            {
                username: googleName,
                email: googleEmail,
            })
            //console.log(response);
            
            setLoginStatus(response.data.message);
            setGoogleButtonLoading(false);
            // console.log(response.data);
            if(response.status == 200){
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');

                localStorage.setItem('portleAccessToken', response.data.token);                
                //const userObj=response.data.user;
                const userObj = jwtDecode(response.data.token);
                setUserInfo(userObj);
                navigate('/profile', { replace: true });
            }
            else{
                //
            }
        }
        catch(error){
            setButtonLoading(false);
            if (error.code === 'ECONNABORTED') {
                // Handle timeout error
                console.error('Error: Server not responding (timeout)');
                setLoginStatus('Server not responding');
            } 
            else if(error.response.status == 401){
                setLoginStatus(error.response.data.message);
            }
            else setLoginStatus(error.message);
        }; 
    }

    //navigate after auth
    useEffect(() => {
        if (userInfo && Object.keys(userInfo).length > 0) {
            navigate('/profile', { replace: true });
        }
    }, [userInfo]);


    //go to next input
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            const passwordInput = document.querySelector('input[type="password"]');
            if (passwordInput) {
                passwordInput.focus();
            }
        }
    };

    //google login
    const googleAuthFunc = useGoogleLogin({
        onSuccess: (codeResponse) => setGoogleUser(codeResponse),
        onError: (error) => {
            console.log('Login Failed:', error);
            setLoginStatus('Login Failed');
        }
    });

    useEffect(
        () => {
            if (googleUser && JSON.stringify(googleUser) != '[]') {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${googleUser.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        //console.log(res.data);
                        const response = res.data;
                        loginGoogleFunc(response.email, response.given_name +" "+ response.family_name)
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ googleUser ]
    );

    // const handleSpaceKeyPress = (event) => {
    //     if (event.key === ' ') {
    //         event.preventDefault(); // Prevents space from being input
    //     }
    // };

    // const handleNameChange = (event) => {
    //     let value = event.target.value;
    //     value = value.toLowerCase().replace(/ /g, '-'); // Convert to lowercase and replace spaces with hyphens
    //     setName(value);
    // };

  return (
    <div className="signup">
        <Tabs defaultValue="login" className="w-[400px] form">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Signup</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
                <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                    Good to see you again
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                    <Label htmlFor="name">Email</Label>
                    <Input type="text" placeholder="Insert email" value={email} onChange={(event) => {setEmail(event.target.value);}}
                        onKeyDown={handleKeyPress}
                    />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" placeholder="Insert Password" value={password} onChange={(event) => {setPassword(event.target.value);}}/>
                    </div>
                    <p>{loginStatus}</p>
                </CardContent>
                <CardFooter>
                    <Button onClick={()=>loginFunc()} className="lg:w-[40%]">
                        { buttonLoading? 
                            <ButtonLoading/>:
                            'Login'
                        }
                    </Button>
                </CardFooter>
                <CardContent className="space-y-2">
                    <p>or</p>
                </CardContent>
                <CardFooter>
                    <Button onClick={googleAuthFunc}
                        className="bg-green-500 lg:w-[55%]"
                    >
                        { googleButtonLoading? 
                            <ButtonLoading/>:
                            'Sign in with Google 🚀 '
                        }
                    </Button>
                </CardFooter>
                </Card>
            </TabsContent>
            
            <TabsContent value="signup">
                <Card>
                <CardHeader>
                    <CardTitle>Signup</CardTitle>
                    <CardDescription>
                        Hi, Join us today!
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="current">Name</Label>
                        <Input type="text" placeholder="Insert name" value={name} 
                            onChange={(event) => {setName(event.target.value);}}
                            onKeyDown={handleKeyPress}
                            // onChange={handleNameChange}
                            // onKeyDown={handleSpaceKeyPress}

                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="current">Email</Label>
                        <Input type="text" placeholder="Insert email" value={email} onChange={(event) => {setEmail(event.target.value);}}
                            onKeyDown={handleKeyPress}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="new">New password</Label>
                        <Input type="password" placeholder="Insert Password" value={password} onChange={(event) => {setPassword(event.target.value);}}/>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Confirm Password</Label>
                        <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(event) => {setConfirmPassword(event.target.value);}} />
                    </div>
                    <p>{loginStatus}</p>
                </CardContent>
                <CardFooter>
                    <Button onClick={()=>signupFunc()} className="lg:w-[40%]">
                        { buttonLoading? 
                            <ButtonLoading/>:
                            'Signup'
                        }
                    </Button>
                </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  )
}

export default Signup