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
const clientPath = import.meta.env.VITE_CLIENT_PATH;
import { MdEdit } from "react-icons/md";
const PortHeromain = ({changeId}) => {

    const {userInfo} = useUserContext();
    const [user, setUser] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);

    const handleChangeId = (id) => {
        changeId(id);
    };

    const getUser = async () => {  
        try{
            const apipath = `${apiPath}/users/${userInfo.username}`;
            const response = await axios.get(apipath)

            if(response.data.message == "found user by username"){
                setUser(response.data.user)
                handleChangeId(response.data.user.id);
            }
            setPageLoading(false);
        }
        catch(error){
            console.log(error.response.data.message);
            setPageLoading(false);
        };
    }   
    
    useEffect(()=>{
        if (userInfo.username) {
            getUser();
        }
    },[userInfo])

    if(pageLoading){
        return(
            <div className='portoflio-heromain'>
                <div className='w-[100%] h-[100vh]'>
                    <PageLoading />
                </div>
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
                    
                    <a href={`https://${user.github}`} target="_blank" rel="noopener noreferrer" ><FaGithub /></a>
                    <a href="" target="_blank" rel="noopener noreferrer" ><FaLinkedin /></a>
                    <a href="" target="_blank" rel="noopener noreferrer" ><SiGmail /></a>
                </div>
                <a href={`${clientPath}/portfolio/${userInfo.username}`} target="_blank" rel="noopener noreferrer" className='portfoliolink'>
                {/* <a href={`http://localhost:5173/portfolio/${userInfo.username}`} target="_blank" rel="noopener noreferrer" className='portfoliolink'> */}
                    Portfolio : {`https://portle-api.vercel.app/portfolio/${userInfo.username}`}
                </a>
                <div className='buttonbox'>
                    <Button className="bg-blue-600"><Link to="/profile/cvinput">Edit Portfolio With CV</Link><FaEdit className='ml-[0.3vw] mb-[0.1vw]'/></Button>
                    <Button className="bg-blue-600"><Link to="/profile/githubinput">Edit Portfolio With GitHub</Link><FaEdit className='ml-[0.3vw] mb-[0.1vw]'/></Button>
                </div>
            </div>
            <div className='imagebox'>
                {user.image == "" || user.image == null ?
                    (<img src="https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />):
                    (<img src={user.image} />)
                }
                <Link to="/profile/update"><MdEdit className='icon'/></Link>
            </div>
        </div>
    </div>
  )
}

export default PortHeromain