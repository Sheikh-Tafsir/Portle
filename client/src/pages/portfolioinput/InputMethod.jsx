import React, { useState, useEffect} from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Link } from 'react-router-dom';

const InputMethod = () => {
    const [inputType, setInputType] = useState("");
  return (
    <div className="w-[100%] h-[100vh] flex bg-[url('https://t3.ftcdn.net/jpg/00/94/25/52/360_F_94255289_bLOLo8dVkESH4wP4QNVUg4hWBlcBEEOg.jpg')] bg-cover bg-center">
        <Card className="w-[350px] mx-auto my-auto">
            <CardHeader>
            <CardTitle>Create portfolio</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
            <form>
                <div className="grid w-full items-center">
                    <div className="flex flex-col space-y-2.5">
                        <Label htmlFor="name">Choose Method</Label>
                        <Button className="w-[100%] bg-blue-600"><Link to="/profile/cvinput">From CV</Link></Button>
                        <Button className="w-[100%] bg-red-600"><Link to="">From Github</Link></Button>
                        <Button className="w-[100%]" variant="outline"><Link to="">Type manually</Link></Button>
                    </div>
                </div>
            </form>
            </CardContent>
        </Card>
    </div>
  )
}

export default InputMethod