import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {useLocation, useNavigate, Link } from "react-router-dom";

import { apiPath } from '@/utils/apiPath';
import { Button } from '@/components/ui/button'
import {useUserContext} from '../../../context/UserContext';
import './PortProjects.css'
import PageLoading from '@/mycomponents/loading/PageLoading';
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaEdit } from "react-icons/fa";


const PortProjects = ({ userId }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {userInfo} = useUserContext();
    const [projects, setProjects] = useState([]);
    const [pageLoading, setPageLoading] = useState(false);
    

    const getProjects = async () => {  
        try{
            setPageLoading(true);
            const apipath = `${apiPath}/projects/${userId}`;
            const response = await axios.get(apipath)
            console.log(response.data);
            setProjects(response.data.projects);
            setPageLoading(false);
        }
        catch(error){
            console.log(error.response.data.message);
            setPageLoading(false);
        };
    }   
    
    useEffect(()=>{
        if (userId) {
            getProjects();
        }
    },[userId])
    
    // useEffect(()=>{
    //     if(userInfo?.id){
    //         getProjects();
    //     }
    // },[])
  
    return (
    <div className='portfolio-projects'>
        {location.pathname === '/profile' && projects.length < 6  &&
            <span className='edit-button-box'>
                <Link to="/profile/projects/create"><IoIosAddCircleOutline className='add-button'/></Link>
            </span>

        }
        <h1>Projects</h1>
        {pageLoading ?
        (
            <PageLoading />
        ):
        (
            <>
                <div className='mainbox'>
                    {projects && projects.map((project) => (
                    <div className='card' key={project.id}>
                        {/* <img src="https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png" alt={project.title} /> */}
                        <span onClick={() => navigate("/profile/projects/update", { state: { project } })} className='flex justify-end cursor-pointer'><FaEdit/></span>
                        <div className='textbox'>
                        <h2>{project.name}</h2>
                        <h3>Technology: {project.technology}</h3>
                        <p>{project.description}</p>
                        <div className='buttonbox'>
                            {project.livelink && <Button><a href={project.livelink} target="_blank" rel="noopener noreferrer">View</a></Button>}
                            {project.githublink && <Button><a href={project.githublink} target="_blank" rel="noopener noreferrer">Code</a></Button>}
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
            </>
        )

        }
    </div>
  )
}

export default PortProjects