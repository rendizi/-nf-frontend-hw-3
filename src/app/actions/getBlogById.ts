import axios from 'axios';
import { Blog } from '@/app/actions/blogs';

export const getBlogById = async (id: number): Promise<Blog | null> => {
        try {
                const response = await axios.get<Blog>(`https://dummyjson.com/auth/posts/${id}`);
                return response.data;
        } catch (error) {
                console.log(error);
                return null;
        }
};
