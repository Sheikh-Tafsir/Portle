import React, { useState} from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY;

export const gemini = () => {
    const [chatHistory, setChatHistory] = useState([]);
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
    return chat;
};