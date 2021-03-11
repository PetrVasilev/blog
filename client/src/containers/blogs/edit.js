import { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSnackbar } from 'react-simple-snackbar'

import { ReactComponent as BookIcon } from '../../assets/book.svg'
import { Store } from '../../context'
import Input from '../../components/Input'
import Title from '../../components/Title'
import Padding from '../../components/Padding'
import Textarea from '../../components/Textarea'
import Button from '../../components/Button'
import Loading from '../../components/Loading'
import api from '../../utils/api'

const View = styled.div`
    padding: 15px;
    box-sizing: border-box;
`

const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
`

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

const EditBlog = ({ history, match }) => {
    const { userState, blogsState } = useContext(Store)

    const { id } = match.params

    const [loading, setLoading] = useState(false)
    const [blog, setBlog] = useState(null)
    const [getting, setGetting] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const [openSnackbar] = useSnackbar()

    const setBlogs = blogsState[1]

    const [user] = userState

    const handleEdit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const { data } = await api().put(`/blog`, {
                title,
                content,
                id
            })
            setBlogs((prev) =>
                prev.map((item) => {
                    if (item.id === id) {
                        return data.blog
                    }
                    return item
                })
            )
            setLoading(false)
            history.push(`/blogs`)
            openSnackbar('Блог изменен')
        } catch (err) {
            setLoading(false)
            openSnackbar('Не удалось выполнить запрос')
            console.error(err)
        }
    }

    const getBlog = async () => {
        try {
            setGetting(true)
            const { data } = await api().get(`/blog/${id}`)
            setBlog(data.blog)
            setTitle(data.blog.title)
            setContent(data.blog.content)
            setGetting(false)
        } catch (err) {
            console.error(err)
            setGetting(false)
        }
    }

    useEffect(() => {
        getBlog()
        // eslint-disable-next-line
    }, [])

    if (getting) {
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

    if (!user) return null

    return (
        <Padding>
            <Title>Изменить блог</Title>

            <View className="card">
                <form onSubmit={handleEdit}>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        label="Заголовок"
                        required
                    />
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        label="Контент"
                        required
                        rows={10}
                    />
                    <Button loading={loading} type="submit">
                        Изменить
                    </Button>
                </form>
            </View>
        </Padding>
    )
}

export default EditBlog
