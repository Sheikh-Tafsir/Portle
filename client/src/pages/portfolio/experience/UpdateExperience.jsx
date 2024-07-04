import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ButtonLoading from '@/mycomponents/loading/Loading';
import { apiPath } from '@/utils/apiPath';
import {useUserContext} from '../../../context/UserContext';

const UpdateExperience = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { experience } = location.state;
    const {userInfo, setUserInfo} = useUserContext();

    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [description, setDescription] = useState('');
    const [dates, setDates] = useState('');
    
    const [updateProjectStatus, setUpdateProjectStatus] = useState('');
    const [buttonLoading, setButtonLoading] = useState(false);

    const updateExperience = async () => {  
        try{
            setButtonLoading(true);

            const apipath = `${apiPath}/experiences/update/${experience.id}`;
            const response = await axios.put(apipath,
            {
                company: company,
                description: description,
                dates: dates,
                position: position,
            })
            //console.log(response.data);
            setUpdateProjectStatus(response.data.message)
            setButtonLoading(false);
            if(response.status == 200 && response.data.message=="Experience updated"){
                navigate('/profile', { replace: true });
            }
            //window.top.location.href = '/profile';
        }
        catch(error){
            console.log(error.response.data.message);
        };
    }   

    useEffect(()=>{
        setCompany(experience.company || '');
        setDates(experience.dates || '');
        setDescription(experience.description || '');
        setPosition(experience.position || '');
    },[experience])

  return (
    <div className="w-[100%] h-[100vh] flex bg-[url('https://t3.ftcdn.net/jpg/00/94/25/52/360_F_94255289_bLOLo8dVkESH4wP4QNVUg4hWBlcBEEOg.jpg')] bg-cover bg-center">
        <Card className="w-[90vw] sm:w-[400px] mx-auto my-auto">
            <CardHeader>
            <CardTitle>Update  Experience</CardTitle>
            
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                        <Label htmlFor="name">Company Name</Label>
                        <Input type="text" placeholder="Insert Password" value={company} onChange={(event) => {setCompany(event.target.value);}}/>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="technology">entry date - exit date</Label>
                    <Input type="text" placeholder="Insert email" value={dates} onChange={(event) => {setDates(event.target.value);}}/>
                </div>
                <div className="space-y-1">
                        <Label htmlFor="livelink">Designation</Label>
                        <Input type="text" placeholder="Insert Live Link" value={position} onChange={(event) => {setPosition(event.target.value);}}/>
                </div>
                <div className="space-y-1">
                        <Label htmlFor="description">Description</Label>
                        <Input type="text" placeholder="Insert Password" value={description} onChange={(event) => {setDescription(event.target.value);}}/>
                </div>
                <p>{updateProjectStatus}</p>
            </CardContent>
            <CardFooter>
                <Button onClick={()=>updateExperience()} className="lg:w-[40%]">
                    { buttonLoading? 
                        <ButtonLoading/>:
                        'Update'
                    }
                </Button>
            </CardFooter>
        </Card>
    </div>
  )
}

export default UpdateExperience