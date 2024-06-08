import {FC} from 'react';
import { useTheme } from '@/app/config/context/themeContext';
import { useRouter } from "next/navigation";
import PostForm from "@/app/components/postForm";
import {Blog as BlogType} from "@/app/actions/blogs";

export interface NavbarProps {
    addBlog: (post: BlogType) => void;
}

const Navbar: FC<NavbarProps> = ({addBlog}) => {
    const { darkMode, toggleDarkMode } = useTheme();
    const router = useRouter();


    const HandleClick = () => {
        router.replace('/')
    }

    return (
        <div className={`navbar ${darkMode ? 'bg-zinc-900' : 'bg-slate-300'}`}>
            <div className="flex-1">
                <a className={`btn btn-ghost text-xl ${darkMode ? 'text-white' : 'text-black'}`} href='/'>balium</a>
            </div>
            <div className="flex-none">
                <button className="btn mr-5"
                        onClick={() => (document.getElementById('my_modal_2') as HTMLDialogElement).showModal()}>add new
                </button>


                <input type="checkbox" className="toggle" checked={darkMode} onChange={toggleDarkMode}/>
            </div>
            <dialog id="my_modal_2" className="modal">
                <div className={`modal-box ${darkMode ? 'bg-zinc-900 text-white' : 'bg-slate-300 text-black'}`}>
                    <div>
                        <PostForm addBlog={addBlog}/>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default Navbar;
