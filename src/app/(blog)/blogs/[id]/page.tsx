'use client'

import React, {useEffect} from 'react';
import Blog from "@/app/components/Blog";
import setUpRequest from "@/app/config/interceptor/request";
import './globals.css'
import Navbar from "@/app/components/Navbar";
import setUpResponse from "@/app/config/interceptor/response";

interface PageProps {
    params: {
        id: number;
    };
}

const Page: React.FC<PageProps> = (props) => {
    const id = props.params.id;
    useEffect(() => {
        setUpRequest()
        setUpResponse()
    }, []);
    return (
        <div>
            <Navbar addBlog={()=>{}}/>
            <Blog id={id}  />;
        </div>)
};

export default Page;
