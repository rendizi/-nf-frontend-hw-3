import {useAuth} from "@/app/config/context/authContext";
import { FC} from "react";
import {Blog} from "@/app/actions/blogs";
import BlogPreview from "@/app/components/Blog-preview";
import {useTheme} from "@/app/config/context/themeContext";
import {useRouter} from "next/navigation";

interface BlogListProps {
    blogs: Blog[];
    deleteBlog: (id: number) => void;
    changeTitle: (id:number, newTitle:string) => void;
}
const BlogList: FC<BlogListProps> = ({blogs, deleteBlog, changeTitle}) => {
    const {token} = useAuth()
    const router = useRouter();

    const { darkMode } = useTheme();

    return (
        <div
            className={'flex flex-col items-center space-y-5 pt-5 ' + (darkMode ? 'bg-sinc-900 text-white' : 'bg-white text-black')}>
            {blogs && blogs.length > 0 && blogs.map((blog, index) =>
                <BlogPreview
                    key={blog.id} // added key prop for optimization
                    id={blog.id}
                    title={blog.title}
                    tags={blog.tags}
                    likes={blog.reactions.likes}
                    dislikes={blog.reactions.dislikes}
                    views={blog.views}
                    router={router}
                    deleteBlog={deleteBlog}
                    changeTitle={changeTitle}
                />
            )}
        </div>

    )
}

export default BlogList