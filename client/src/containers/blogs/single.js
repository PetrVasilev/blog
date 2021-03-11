import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { DateTime } from 'luxon'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'react-simple-snackbar'

import { ReactComponent as BookIcon } from '../../assets/book.svg'
import { Store } from '../../context'
import api from '../../utils/api'
import Loading from '../../components/Loading'
import Title from '../../components/Title'
import Padding from '../../components/Padding'
import Button from '../../components/Button'
import Comments from './comments'

const Empty = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 100px;

    svg {
        width: 40px;
        height: 40px;

        path {
            stroke: gray;
        }
    }

    .text {
        font-size: 14px;
        margin-top: 5px;
    }
`

const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
`

const View = styled.div`
    padding: 15px;
    margin-bottom: 15px;

    .title {
        margin-bottom: 10px;
    }
`

const Top = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    .createdAt {
        font-size: 14px;
        color: gray;
    }

    .user {
        font-size: 14px;
        color: gray;
    }
`

const Content = styled.div`
    white-space: pre-line;
`

const Actions = styled.div`
    display: flex;
    margin-top: 15px;

    .delete {
        border: 1px solid red;
        color: red;
        margin-left: 10px;
    }
`

const SingleBlog = ({ match, history }) => {
    const { id } = match.params

    const { userState, blogsState } = useContext(Store)

    const [user] = userState
    const setBlogs = blogsState[1]

    const [openSnackbar] = useSnackbar()

    const [loading, setLoading] = useState(true)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [blog, setBlog] = useState(null)

    const getBlog = async () => {
        try {
            setLoading(true)
            const { data } = await api().get(`/blog/${id}`)
            setBlog(data.blog)
            setLoading(false)
        } catch (err) {
            console.error(err)
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        try {
            setDeleteLoading(true)
            await api().delete(`/blog`, { params: { id } })
            setBlogs((prev) => prev.filter((item) => item.id !== id))
            setDeleteLoading(false)
            history.push(`/blogs`)
            openSnackbar('Блог удален')
        } catch (err) {
            console.error(err)
            openSnackbar('Не удалось выполнить запрос')
            setDeleteLoading(false)
        }
    }

    useEffect(() => {
        getBlog()
        // eslint-disable-next-line
    }, [])

    if (loading) {
        return (
            <Center>
                <Loading />
            </Center>
        )
    }

    if (!blog) {
        return (
            <Empty>
                <BookIcon />
                <div className="text">Пусто</div>
            </Empty>
        )
    }

    return (
        <Padding>
            <View className="card">
                <Title className="title">{blog.title}</Title>
                <Top>
                    <div className="createdAt">
                        {DateTime.fromISO(blog.createdAt)
                            .setLocale('ru')
                            .toFormat('dd.MM.yyyy HH:mm')}
                    </div>
                    <div className="user">{blog.user.login}</div>
                </Top>
                <Content>{blog.content}</Content>
                {user && blog.user.id === user.id && (
                    <Actions>
                        <Link to={`/blogs/${id}/edit`}>
                            <Button>Изменить</Button>
                        </Link>
                        <Button onClick={handleDelete} loading={deleteLoading} className="delete">
                            Удалить
                        </Button>
                    </Actions>
                )}
            </View>

            <Comments blog={blog} user={user} />
        </Padding>
    )
}

export default SingleBlog
