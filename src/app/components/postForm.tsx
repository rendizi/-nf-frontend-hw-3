import React, {FC, useState} from "react";
import PostBlog from "@/app/actions/post";
import {NavbarProps} from "@/app/components/Navbar";
import {useTheme} from "@/app/config/context/themeContext";

const PostForm: FC<NavbarProps> = ({addBlog}) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [reactions, setReactions] = useState({ likes: 0, dislikes: 0 });
    const [views, setViews] = useState(0);
    const {darkMode} = useTheme()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const req = async () => {
        const data = {userId:0,title, body, tags, reactions, views }
        const resp = await PostBlog({data})
        if (resp !== null){
            addBlog(resp)
        }}
        req()
        setTitle('');
        setBody('');
        setTags([]);
    }

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tagsArray = e.target.value.split(',');
        setTags(tagsArray);
    }

    return (
        <form onSubmit={handleSubmit} className={`max-w-md mx-auto ${darkMode ? 'text-white' : ' text-black'}`}>
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium">Title:</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}
                       required className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-black"/>
            </div>

            <div className="mb-4">
                <label htmlFor="body" className="block text-sm font-medium ">Body (Description):</label>
                <textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} required
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-black"></textarea>
            </div>

            <div className="mb-4">
                <label htmlFor="tags" className="block text-sm font-medium ">Tags (separate w ','):</label>
                <input type="text" id="tags" value={tags} onChange={handleTagsChange}
                       className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-black"/>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium ">Reactions:</label>
                <div className="flex">
                    <div className="mr-4">
                        <label htmlFor="likes" className="block text-sm font-medium ">Likes:</label>
                        <input type="number" id="likes" value={reactions.likes}
                               onChange={(e) => setReactions({ ...reactions, likes: parseInt(e.target.value) })}
                               className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-black"/>
                    </div>
                    <div>
                        <label htmlFor="dislikes" className="block text-sm font-medium ">Dislikes:</label>
                        <input type="number" id="dislikes" value={reactions.dislikes}
                               onChange={(e) => setReactions({ ...reactions, dislikes: parseInt(e.target.value) })}
                               className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-black"/>
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="views" className="block text-sm font-medium ">Views:</label>
                <input type="number" id="views" value={views}
                       onChange={(e) => setViews(parseInt(e.target.value))}
                       className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-black"/>
            </div>

            <button type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Submit
            </button>
        </form>
    )
}

export default PostForm;
