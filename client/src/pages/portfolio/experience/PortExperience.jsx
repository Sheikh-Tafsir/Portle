import React, { useState, useEffect} from 'react';
import axios from 'axios';

import { apiPath } from '@/utils/apiPath';
import { Button } from '@/components/ui/button'
import {useUserContext} from '../../../context/UserContext';
import './PortExperience.css'
import PageLoading from '@/mycomponents/loading/PageLoading';

const PortExperience = () => {
    const {userInfo, setUserInfo} = useUserContext();
    const [experiences, setExperiences] = useState([]);
    const [pageLoading, setPageLoading] = useState(false);

    const getExperiences = async () => {  
        try{
            setPageLoading(true);
            const apipath = `${apiPath}/experiences/${userInfo.id}`;
            const response = await axios.get(apipath)
            console.log(response.data);
            if(response.status == 200){
                setExperiences(response.data.experiences);
            }
            setPageLoading(false);
        }
        catch(error){
            console.log(error.response.data.message);
            setPageLoading(false);
        };
    }   
    
    useEffect(()=>{
        if(userInfo?.id){
            getExperiences();
        }
    },[userInfo])
    
    // useEffect(()=>{
    //     if (userInfo.id) {
    //         getExperiences();
    //     }
    // },[])
  return (
    <div className='portfolio-experience'>
        <h1>Experience</h1>
        {pageLoading ?
        (
            <PageLoading />
        ):
        (
            <>
                <div className='mainbox'>   
                    {experiences && experiences.map((experience) => ( 
                        <div className='experiences' key={experience.id}>
                            <div className='year-pointer'>
                                <h3>{experience.dates}</h3>
                            </div>
                            <span></span>
                            {/* <div className='circle-pointer'></div> */}
                            <div className='textbox'>
                                <h2>{experience.company}</h2>
                                <h3>{experience.position}</h3>
                                <p>{experience.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )}
    </div>
  )
}

export default PortExperience