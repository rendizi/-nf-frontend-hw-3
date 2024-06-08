import axios from 'axios'

const DeleteBlog = async (id: number) => {
    await axios.delete(`https://dummyjson.com/posts/${id}`)
}

export default DeleteBlog