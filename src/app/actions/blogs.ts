import axios from 'axios'

export interface Blog{
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
        likes: number;
        dislikes: number;
    };
    views: number;
    userId: number
}

export interface Blogs{
    posts: Blog[];
    total: number;
    skip: number;
    limit: number;
}

export const GetBlogs = async () :Promise<Blog[]> => {
    const resp = await axios.get<Blogs>('https://dummyjson.com/auth/posts');
    return resp.data.posts;
}