import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {useLocation, useNavigate, Link } from "react-router-dom";

import { apiPath } from '@/utils/apiPath';
import { Button } from '@/components/ui/button'
import {useUserContext} from '../../../context/UserContext';
import './PortExperience.css'
import PageLoading from '@/mycomponents/loading/PageLoading';

import { IoIosAddCircleOutline } from "react-icons/io";
import { FaEdit } from "react-icons/fa";

const PortExperience = ({ userId }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {userInfo} = useUserContext();
    const [experiences, setExperiences] = useState([]);
    const [pageLoading, setPageLoading] = useState(false);

    const getExperiences = async () => {  
        try{
            setPageLoading(true);
            const apipath = `${apiPath}/experiences/${userId}`;
            const response = await axios.get(apipath)
            //console.log(response.data);
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
        if (userId) {
            getExperiences();
        }
    },[userId])
    
    // useEffect(()=>{
    //     if (userInfo.id) {
    //         getExperiences();
    //     }
    // },[])
  return (
    <div className='portfolio-experience'>
        {location.pathname === '/profile' &&
            <span className='edit-button-box'>
                <Link to="/profile/experiences/create"><IoIosAddCircleOutline className='add-button'/></Link>
            </span>

        }
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
                                {location.pathname === '/profile' &&
                                    <div onClick={() => navigate("/profile/experiences/update", { state: { experience } })} className='flex justify-end cursor-pointer'><FaEdit/></div>
                                }
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