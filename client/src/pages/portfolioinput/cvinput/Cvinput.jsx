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


const API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY; // Replace with your actual API key

const Cvinput = () => {
    const [inputValue, setInputValue] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [portfolioObj, setPortfolioObj] = useState([]);
    const [buttonLoading, setButtonLoading] = useState(false);

    const navigate = useNavigate();
    const {userInfo, setUserInfo} = useUserContext();

    const extractText = (event) => {
        const file = event.target.files[0];
        pdfToText(file)
            .then((text) => {
                // console.log(text)
                setInputValue(text);
            })
            .catch((error) => console.error("Failed to extract text from pdf"));
    }

      //send message
    const handleSendMessage = async () => {
        setButtonLoading(true);
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const chat = model.startChat({
            history: chatHistory.map(message => ({
                role: message.role,
                parts: [{ text: message.text }] // Ensure each message has 'parts' property with an array of parts
            })),
            generationConfig: {
                maxOutputTokens: 100000,
            },
        });

        // Define the command
        const command = `
        This is the cv. 
        From this, make parts and create a JSON file like below with the needed information:
        {
            "information": {
            "name": "",
            "designation": ""
            },
            "experience": [
            {
                "company": "",
                "position": "",
                "dates": ""
            }
            ],
            "projects": [
            {
                "name": "",
                "technologies": [""],
                "description": [""]
            }
            ],
            "education": [
            {
                "institution": "",
                "degree": ""
            }
            ]
        }
        only return the json file, don't write anything else please, not even extra symbols`;
              
        const msg = command + "\n" + inputValue;
        setInputValue('');

        const result = await chat.sendMessage(msg);
        const response = await result.response;
        const responseText = await response.text();
        console.log(responseText);
        setPortfolioObj(responseText);
        extarctInformationFromCv(responseText)
        setButtonLoading(false);
        navigate('/profile', { replace: true });
    };

    const extarctInformationFromCv = async (responseText) => {  
        try{
            const apipath = `${apiPath}/users/extractcv/${userInfo.id}`;
            const response = await axios.post(apipath, 
            {
                cv:responseText,
            })
            console.log(response.data.message);
        }
        catch(error){
            console.log(error.response.data.message);
        };

    }   

  return (
    <div className="w-[100%] h-[100vh] flex bg-[url('https://t3.ftcdn.net/jpg/00/94/25/52/360_F_94255289_bLOLo8dVkESH4wP4QNVUg4hWBlcBEEOg.jpg')] bg-cover bg-center">
        <Card className="w-[350px] mx-auto my-auto">
            <CardHeader>
            <CardTitle>Upload your CV</CardTitle>
            <CardDescription>Information will be extracted from your cv</CardDescription>
            </CardHeader>
            <CardContent>
            <div>
                <div className="grid w-full items-center">
                    <div className="flex flex-col space-y-2.5">
                        <Input type="file" accept="application/pdf" onChange={extractText} />
                        <Button onClick={()=>handleSendMessage()}>
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

export default Cvinput