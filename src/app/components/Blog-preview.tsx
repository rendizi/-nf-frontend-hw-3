import { useTheme } from "@/app/config/context/themeContext";
import { FaThumbsUp, FaThumbsDown, FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Import new icons
import {ChangeEvent, useState} from "react";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

type BlogPreviewProps = {
    id: number;
    title: string;
    tags: string[];
    likes: number;
    dislikes: number;
    views: number;
    router: AppRouterInstance;
    deleteBlog: (id: number) => void;
    changeTitle: (id: number, newTitle: string) => void;
};

const BlogPreview = ({ id, title, tags, likes, dislikes, views, router, deleteBlog, changeTitle }: BlogPreviewProps) => {    const { darkMode } = useTheme();
    const [newTitle, setNewTitle] = useState('');

    const handleClick = () => {
        router.push(`/blogs/${id}`, undefined);
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.target.value);
    };

    const handleEdit = () => {
        (document.getElementById(id.toString()) as HTMLDialogElement).showModal()
    };

    const submitChange = () =>{
        changeTitle(id, newTitle)
    }

    const handleDelete = () => {
        deleteBlog(id)
    };

    return (
        <div
            className={`sm:w-1/3 w-2/3 rounded-lg border border-gray-300 shadow-xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <div className='ml-5 mr-5'>
                <div className="flex justify-between items-center">
                    <h2 onClick={handleClick} className="cursor-pointer">{id}. {title}</h2>
                    <div className="flex space-x-2">
                        <FaEdit className="cursor-pointer hover:text-blue-500" onClick={handleEdit}/>
                        <FaTrash className="cursor-pointer hover:text-red-500" onClick={handleDelete}/>
                    </div>
                </div>
                <div className="flex flex-wrap mt-2">
                    {tags.map((tag, index) => (
                        <div key={index} className="badge badge-primary ml-1">{tag}</div>
                    ))}
                </div>
                <div className="flex mt-2">
                    <p className="flex items-center mr-4">
                        <FaThumbsUp className="mr-1"/> {likes}
                    </p>
                    <p className="flex items-center mr-4">
                        <FaThumbsDown className="mr-1"/> {dislikes}
                    </p>
                    <p className="flex items-center">
                        <FaEye className="mr-1"/> {views}
                    </p>
                </div>
            </div>
            <dialog id={id.toString()} className="modal">
                <div className={`modal-box ${darkMode ? 'bg-zinc-900 text-white' : 'bg-slate-300 text-black'}`}>
                    <h3 className="font-bold text-lg">New title</h3>
                    <input type="text" placeholder="Type here" className={`bg-white mt-2 w-full max-w-xs text-black `} onChange={handleInputChange}/>
                    <button className="btn btn-primary ml-2" onClick={submitChange}>Change</button>
                </div>
                <form method="dialog" className="modal-backdrop">
                <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default BlogPreview;
