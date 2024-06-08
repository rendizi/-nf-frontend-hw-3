'use client'

import { useBlogId } from "@/app/config/context/blogIdContext";
import { useEffect, useState } from "react";
import { getBlogById } from "@/app/actions/getBlogById";
import {Blog as BlogType} from "@/app/actions/blogs";
import {FaEye, FaThumbsDown, FaThumbsUp} from "react-icons/fa";
import {useTheme} from "@/app/config/context/themeContext";

interface BlogProps{
    id: number
}

const Blog: React.FC<BlogProps> = ({id}) => {
    const [blogInfo, setBlog] = useState<BlogType | null>(null);
    const {darkMode, toggleDarkMode} = useTheme()

    useEffect(() => {
        getBlogById(id).then((resp) => {
            setBlog(resp);
        });
    }, []);

    return (
        <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} py-8 h-screen`}>
            <div className="max-w-3xl mx-auto px-4">
                {blogInfo &&
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{blogInfo.title}</h1>
                        <div className="mb-2">
                            {blogInfo.tags.map((tag, index) => (
                                <div key={index} className="badge badge-primary ml-1">{tag}</div>
                            ))}
                        </div>
                        <p className=" mb-4">{blogInfo.body}</p>

                        <div className="flex">
                            <p className="flex items-center mr-4">
                                <FaThumbsUp className="mr-1"/> {blogInfo.reactions.likes}
                            </p>
                            <p className="flex items-center mr-4">
                                <FaThumbsDown className="mr-1"/> {blogInfo.reactions.dislikes}
                            </p>
                            <p className="flex items-center">
                                <FaEye className="mr-1"/> {blogInfo.views}
                            </p>
                        </div>
                        <p className="">Author ID: {blogInfo.userId}</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default Blog;
