import axios from 'axios'

const api = () => {
    const token = localStorage.getItem('token')
    const instance = axios.create({
        baseURL: '/api',
        headers: { Authorization: token }
    })
    return instance
}

export default api
