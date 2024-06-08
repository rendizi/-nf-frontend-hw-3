import axios from 'axios'

const update = async (id:number, title: string)=>{
    await axios.put(`https://dummyjson.com/posts/${id}`, {title})
}

export default update