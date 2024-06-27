import React, { useState, useEffect} from 'react';
import axios from 'axios';

import { apiPath } from '@/utils/apiPath';
import { Button } from '@/components/ui/button'
import {useUserContext} from '../../../context/UserContext';
import './PortProjects.css'
import PageLoading from '@/mycomponents/loading/PageLoading';

const PortProjects = () => {
    const {userInfo, setUserInfo} = useUserContext();
    const [projects, setProjects] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);

    const getProjects = async () => {  
        try{
            const apipath = `${apiPath}/projects/${userInfo.id}`;
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
        if(userInfo.id)getProjects();
    },[userInfo])
  
    if(pageLoading){
        return(
            <div className='portfolio-projects'>
                <PageLoading />
            </div>
        )
    }
    return (
    <div className='portfolio-projects'>
        <h1>Projects</h1>
        <div className='mainbox'>
            {projects.map((project) => (
            <div className='card' key={project.id}>
                <img src="https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png" alt={project.title} />
                <div className='textbox'>
                <h2>{project.name}</h2>
                <h3>Tech: {project.technology}</h3>
                <p>{project.description}</p>
                <div className='buttonbox'>
                    <Button>View</Button>
                    <Button>Code</Button>
                </div>
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default PortProjects