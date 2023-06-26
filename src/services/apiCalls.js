import axios from 'axios';

export const loginUser = async (body) => {
    let res = await axios.post('https://backend-connect-arte.vercel.app/user/login', body)
    return res.data.token
}