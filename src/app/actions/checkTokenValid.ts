import axios from 'axios'

const checkToken = async ():Promise<boolean> => {
    try{
        const resp = await axios.get('https://dummyjson.com/auth/me')
        return true
    }
    catch(err){
        return false
    }
}

export default checkToken