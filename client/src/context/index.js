import { createContext, useState, useEffect } from 'react'

import api from '../utils/api'

export const Store = createContext()

export const Provider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [userLoading, setUserLoading] = useState(false)
    const [blogs, setBlogs] = useState([])
    const [blogsLoading, setBlogsLoading] = useState([])

    const getUser = async () => {
        try {
            setUserLoading(true)
            const { data } = await api().get(`/user`)
            setUserLoading(false)
            setUser(data.user)
        } catch (err) {
            console.error(err)
            setUserLoading(false)
        }
    }

    const getBlogs = async () => {
        try {
            setBlogsLoading(true)
            const { data } = await api().get(`/blog/list`)
            setBlogsLoading(false)
            setBlogs(data.blogs)
        } catch (err) {
            console.error(err)
            setBlogsLoading(false)
        }
    }

    useEffect(() => {
        getUser()
        getBlogs()
    }, [])

    return (
        <Store.Provider
            value={{
                userState: [user, setUser],
                blogsState: [blogs, setBlogs],
                userLoading,
                blogsLoading
            }}
        >
            {children}
        </Store.Provider>
    )
}
