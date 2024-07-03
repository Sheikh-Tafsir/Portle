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

const UpdateProjects = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { project } = location.state;
    const {userInfo, setUserInfo} = useUserContext();

    const [name, setName] = useState('');
    const [technology, setTechnology] = useState('');
    const [description, setDescription] = useState('');
    const [githublink, setGithublink] = useState('');
    const [livelink, setLivelink] = useState('');
    
    const [updateProjectStatus, setUpdateProjectStatus] = useState('');
    const [buttonLoading, setButtonLoading] = useState(false);

    const doUpdateProject = async () => {  
        try{
            setButtonLoading(true);

            const apipath = `${apiPath}/projects/update/${project.id}`;
            const response = await axios.put(apipath,
            {
                name: name,
                description: description,
                technology: technology,
                githublink: githublink,
                livelink: livelink,
            })
            //console.log(response.data);
            setUpdateProjectStatus(response.data.message)
            setButtonLoading(false);
            if(response.status == 200 && response.data.message=="Project updated"){
                navigate('/profile', { replace: true });
            }
            //window.top.location.href = '/profile';
        }
        catch(error){
            console.log(error.response.data.message);
        };
    }   

    useEffect(()=>{
        setName(project.name || '');
        setTechnology(project.technology || '');
        setDescription(project.description || '');
        setGithublink(project.githublink || '');
        setLivelink(project.livelink || '');
    },[project])

  return (
    <div className="w-[100%] h-[100vh] flex bg-[url('https://t3.ftcdn.net/jpg/00/94/25/52/360_F_94255289_bLOLo8dVkESH4wP4QNVUg4hWBlcBEEOg.jpg')] bg-cover bg-center">
        <Card className="w-[90vw] sm:w-[400px] mx-auto my-auto">
            <CardHeader>
            <CardTitle>Update  Project</CardTitle>
            
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" placeholder="Insert Password" value={name} onChange={(event) => {setName(event.target.value);}}/>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="technology">Technologies</Label>
                    <Input type="text" placeholder="Insert email" value={technology} onChange={(event) => {setTechnology(event.target.value);}}/>
                </div>
                <div className="space-y-1">
                        <Label htmlFor="description">Description</Label>
                        <Input type="text" placeholder="Insert Password" value={description} onChange={(event) => {setDescription(event.target.value);}}/>
                </div>
                <div className="space-y-1">
                        <Label htmlFor="livelink">Live Link</Label>
                        <Input type="text" placeholder="Insert Live Link" value={livelink} onChange={(event) => {setLivelink(event.target.value);}}/>
                </div>
                <div className="space-y-1">
                        <Label htmlFor="githublink">Github Link</Label>
                        <Input type="text" placeholder="Insert Github Link" value={githublink} onChange={(event) => {setGithublink(event.target.value);}}/>
                </div>
                <p>{updateProjectStatus}</p>
            </CardContent>
            <CardFooter>
                <Button onClick={()=>doUpdateProject()} className="lg:w-[40%]">
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

export default UpdateProjects