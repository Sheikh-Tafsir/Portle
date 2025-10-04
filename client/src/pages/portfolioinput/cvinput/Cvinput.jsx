import React, { useState } from 'react';
import pdfToText from "react-pdftotext";
import { GoogleGenAI } from "@google/genai";

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
import { useUserContext } from '../../../context/UserContext';


const API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY; // Replace with your actual API key
const MODEL_NAME = 'gemini-2.0-flash-001'
const PRE_PROMPT = `
            This is the cv. 
            From this, make parts and create a JSON file like below with the needed information:
            {
                "information": {
                "name": "",
                "designation": ""
                "github": ""
                },
                "experience": [
                {
                    "company": "",
                    "position": "",
                    "dates": "",
                    "description": [""]
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

const Cvinput = () => {
    const [inputValue, setInputValue] = useState('');
    const [buttonLoading, setButtonLoading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState("");

    const navigate = useNavigate();
    const { userInfo } = useUserContext();

    const extractText = (event) => {
        const file = event.target.files[0];
        if (!file) {
            setUploadStatus("File not uploaded");
            return;
        }
        pdfToText(file)
            .then((text) => {
                //console.log(text)
                setInputValue(text);
                setUploadStatus("File uploaded successfully");
            })
            .catch((error) => {
                console.error("Failed to extract text from pdf", error);
                setUploadStatus("Failed to extract text from file");
            });
    }

    //send message
    const handleSendMessage = async () => {
        if (inputValue == '' || inputValue.length == 0) setUploadStatus("File not uploaded");
        else {
            setButtonLoading(true);
            setUploadStatus("please wait");

            const genAI = new GoogleGenAI({ apiKey: API_KEY });
            const contents = PRE_PROMPT + "\n" + inputValue;
            setInputValue('');

            const response = await genAI.models.generateContent({
                model: MODEL_NAME,
                contents
            });

            //console.log(response?.text);
            extarctInformationFromCv(response?.text)
        }
    };

    const extarctInformationFromCv = async (responseText) => {
        try {
            const apipath = `${apiPath}/users/extractcv/${userInfo.id}`;
            await axios.post(apipath,
                {
                    cv: responseText,
                })
            //console.log(response.data.message);
            setUploadStatus("Complete");
            navigate('/profile', { replace: true });
        }
        catch (error) {
            console.log(error.response.data);
        } finally {
            setButtonLoading(false);
        }

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
                                <Button onClick={() => handleSendMessage()}>
                                    {buttonLoading ?
                                        <ButtonLoading /> :
                                        'Save'
                                    }
                                </Button>
                            </div>
                        </div>
                    </div>
                    <p className='mt-[2vw] lg:mt-[1vw]'>{uploadStatus}</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default Cvinput