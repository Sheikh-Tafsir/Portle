import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

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

const UpdateHeromain = () => {
    const navigate = useNavigate();
    const {userInfo, setUserInfo} = useUserContext();

    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [image, setImage] = useState('');
    
    const [updateProjectStatus, setUpdateProjectStatus] = useState('');
    const [buttonLoading, setButtonLoading] = useState(false);

    const updateHeromain = async () => {  
        try{
            setButtonLoading(true);

            const apipath = `${apiPath}/users/${userInfo.id}`;
            const response = await axios.put(apipath,
            {
                image: image
            })
            //console.log(response.data);
            setUpdateProjectStatus(response.data.message)
            setButtonLoading(false);
            if(response.status == 200 && response.data.message == "User Profile updated"){
                navigate('/profile', { replace: true });
            }
            //window.top.location.href = '/profile';
        }
        catch(error){
            console.log(error.response.data.message);
        };
    }   

  return (
    <div className="w-[100%] h-[100vh] flex bg-[url('https://t3.ftcdn.net/jpg/00/94/25/52/360_F_94255289_bLOLo8dVkESH4wP4QNVUg4hWBlcBEEOg.jpg')] bg-cover bg-center">
        <Card className="w-[90vw] sm:w-[400px] mx-auto my-auto">
            <CardHeader>
            <CardTitle>Add Experience</CardTitle>
            
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Label htmlFor="name">Profile Image Link</Label>
                    <Input type="text" placeholder="ex: https://www.facebook.com/photo/<something>" value={image} onChange={(event) => {setImage(event.target.value);}}/>

                </div>

                <p>{updateProjectStatus}</p>
            </CardContent>
            <CardFooter>
                <Button onClick={()=>updateHeromain()} className="lg:w-[40%]">
                    { buttonLoading? 
                        <ButtonLoading/>:
                        'Save'
                    }
                </Button>
            </CardFooter>
        </Card>
    </div>
  )
}

export default UpdateHeromain