import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { FaGithub, FaLinkedin, FaEdit } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { apiPath } from '@/utils/apiPath';
import { Button } from '@/components/ui/button'

import {useUserContext} from '../../../context/UserContext';

import './PortHeromain.css'
import PageLoading from '@/mycomponents/loading/PageLoading';
import { Link } from 'react-router-dom';
const PortHeromain = () => {
    const {userInfo, setUserInfo} = useUserContext();
    const [user, setUser] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);


    const getUser = async () => {  
        try{
            const apipath = `${apiPath}/users/${userInfo.id}`;
            const response = await axios.get(apipath)
            if(response.data.message == "found user by id"){
                setUser(response.data.user)
            }
            setPageLoading(false);
            //console.log(response.data);
        }
        catch(error){
            console.log(error.response.data.message);
            setPageLoading(false);
        };
    }   
    
    useEffect(()=>{
        getUser();
    },[userInfo])

    if(pageLoading){
        return(
            <div className='portoflio-heromain'>
                <PageLoading />
            </div>
        )
    }

  return (
    <div className='portoflio-heromain'>
        <div className='mainbox'>
            <div className='textbox my-auto'>
                <h1>Hello there!</h1>
                <div className='flex'>
                    <h1>I'm </h1><h2 className='text-orange-600'>{user.name}</h2>
                </div>
                <p>I am a {user.designation}</p>
                <Button>About Me</Button>
                <div className='iconbox'>
                    <span><FaGithub /></span>
                    <span><FaLinkedin /></span>
                    <span><SiGmail /></span>
                </div>
                <div className='buttonbox'>
                    <Button className="bg-blue-600"><Link to="/profile/cvinput">Edit Portfolio From CV</Link><FaEdit className='ml-[0.3vw] mb-[0.1vw]'/></Button>
                    <Button className="bg-blue-600"><Link to="/profile/cvinput">Edit Portfolio From GitHub</Link><FaEdit className='ml-[0.3vw] mb-[0.1vw]'/></Button>
                </div>
            </div>
            <div className='imagebox'>
                {user.image == "" || user.image == null ?
                    (<img src="https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png" />):
                    (<img src={user.image} />)
                }
            </div>
        </div>
    </div>
  )
}

export default PortHeromain