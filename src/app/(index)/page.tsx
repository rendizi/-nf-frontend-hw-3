"use client";

import { useTheme } from "@/app/config/context/themeContext";
import Navbar from "@/app/components/Navbar";
import {useEffect, useState} from "react";
import {useRouter} from 'next/navigation';
import {useAuth} from "@/app/config/context/authContext";
import Login from "@/app/components/Login";
import BlogList from "@/app/components/Blog-list";
import setUpRequest from "@/app/config/interceptor/request";
import {useBlogId} from "@/app/config/context/blogIdContext";
import {Blog as BlogType, GetBlogs} from "@/app/actions/blogs";
import setUpResponse from "@/app/config/interceptor/response";
import checkToken from "@/app/actions/checkTokenValid";
import DeleteBlog from "@/app/actions/delete";
import update from "@/app/actions/update";

export default function Home() {
    const { darkMode } = useTheme();
    const {signedIn, signIn} = useAuth()
    const {id} = useBlogId()
    const router = useRouter()
    const [blogs, setBlogs] = useState<BlogType[]>()

    useEffect(() => {
        GetBlogs().then((returnedBlogs) => {
            setBlogs(returnedBlogs)
        }).catch(error => {
            console.log(localStorage.getItem("token"))
        })
    }, [signedIn]);

    useEffect(() => {
        setUpRequest()
        setUpResponse()
        let isExpired = checkToken()
        let token = localStorage.getItem("token")
        let refreshToken = localStorage.getItem("refreshToken")
        if (token && refreshToken){
        signIn({token: token, refreshToken: refreshToken})}
    }, []);


    const deleteBlog = async (id: number) => {
        try {
            DeleteBlog(id)
            setBlogs((prevBlogs) => prevBlogs && prevBlogs.filter(blog => blog.id !== id));
        } catch (error) {
            console.error("Failed to delete the blog:", error);
        }
    };


    const changeTitle = async (id: number, newTitle: string) => {
        try {
            setBlogs((prevBlogs) => prevBlogs && prevBlogs.map(blog =>
                blog.id === id ?
                    { ...blog, title: newTitle }
                    : blog
            ));
            update(id, newTitle)
        } catch (error) {
            console.error("Failed to change the blog title:", error);
        }
    };

    if (signedIn === false){
        return (
            <Login />
        )
    }

    const addBlog = (post: BlogType) => {
        if (blogs){
        setBlogs([...blogs, post]);}
    }

    return (
        <div>
            <Navbar addBlog={addBlog}/>
            {blogs && <BlogList blogs={blogs} deleteBlog={deleteBlog} changeTitle={changeTitle}/>}
        </div>
    );
}
