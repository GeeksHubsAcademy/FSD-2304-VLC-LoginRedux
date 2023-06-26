import axios from 'axios';

export const loginUser = async (body) => {
    let res = await axios.post('https://express-api-basic.vercel.app/auth/login', body)
    return res.data.token
}

export const getProfile = async (token) => {
    let config = {
        headers: {
            Authorization : `Bearer ${token}`
        }
    }

    let res = await axios.get('https://express-api-basic.vercel.app/user/profile', config)

    console.log(res.data)
    
    return res.data
}