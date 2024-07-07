import React, { useState, useEffect} from 'react';
import pdfToText from "react-pdftotext";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
const GITHUB_ACCESS_TOKEN = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;
const Githubinput = () => {
    const navigate = useNavigate();
    const {userInfo, setUserInfo} = useUserContext();

    const [github, setGithub] = useState('');
    const [repos, setRepos] = useState([]);
    const [buttonLoading, setButtonLoading] = useState(false);

    const extarctInformationFromGithub = async () => {  
        setButtonLoading(true);
        try{
            const apipath = `${apiPath}/users/extractgithub/${userInfo.id}`;
            const response = await axios.post(apipath, 
            {
                github:github,
            })
            //console.log(response.data.message);
            setButtonLoading(false);
            navigate('/profile', { replace: true });
            //window.top.location.href = '/profile';
        }
        catch(error){
            console.log(error.response.data.message);
        };
    }  

    const fetchPinnedRepos = async () => {
        // const parts = github.split('/');
        // const username = parts.filter(part => part.length > 0).pop();
        // const query = `
        //   {
        //     user(login: "${username}") {
        //       pinnedItems(first: 6, types: REPOSITORY) {
        //         nodes {
        //           ... on Repository {
        //             name
        //             description
        //             url
        //             stargazerCount
        //             forkCount
        //           }
        //         }
        //       }
        //     }
        //   }
        // `;
  
        // try {
        //   const response = await axios.post(
        //     'https://api.github.com/graphql',
        //     { query },
        //     {
        //       headers: {
        //         Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
        //       },
        //     }
        //   );
        //   console.log(response.data.data.user.pinnedItems.nodes);
        //   setRepos(response.data.data.user.pinnedItems.nodes);
        // } catch (err) {
        //   console.log(err);
        // } finally {
        //     setButtonLoading(false);
        // }
    };
  return (
    <div className="w-[100%] h-[100vh] flex bg-[url('https://t3.ftcdn.net/jpg/00/94/25/52/360_F_94255289_bLOLo8dVkESH4wP4QNVUg4hWBlcBEEOg.jpg')] bg-cover bg-center">
        <Card className="w-[350px] mx-auto my-auto">
            <CardHeader>
            <CardTitle>Github Link</CardTitle>
            <CardDescription>Copy and paste your Github link below</CardDescription>
            </CardHeader>
            <CardContent>
            <div>
                <div className="grid w-full items-center">
                    <div className="flex flex-col space-y-2.5">
                        <Input type="text" onChange={(event) => {setGithub(event.target.value);}} 
                        placeholder="https://github.com/<username>"/>
                        <Button onClick={()=>extarctInformationFromGithub()}>
                        { buttonLoading? 
                            <ButtonLoading/>:
                            'Save'
                        }
                        </Button>
                    </div>
                </div>
            </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default Githubinput