import { useContext, useState } from 'react'
import styled from 'styled-components'
import { useSnackbar } from 'react-simple-snackbar'

import Input from '../../components/Input'
import Title from '../../components/Title'
import Padding from '../../components/Padding'
import Textarea from '../../components/Textarea'
import Button from '../../components/Button'
import api from '../../utils/api'
import { Store } from '../../context'

const View = styled.div`
    padding: 15px;
    box-sizing: border-box;
`

const CreateBlog = ({ history }) => {
    const { userState, blogsState } = useContext(Store)

    const [loading, setLoading] = useState(false)
    const setBlogs = blogsState[1]

    const [openSnackbar] = useSnackbar()

    const [user] = userState

    const handleCreate = async (e) => {
        e.preventDefault()
        const title = e.target.title.value
        const content = e.target.content.value
        try {
            setLoading(true)
            const { data } = await api().post(`/blog`, {
                title,
                content
            })
            setBlogs((prev) => [data.blog, ...prev])
            setLoading(false)
            history.push(`/`)
            openSnackbar('Блог создан')
        } catch (err) {
            setLoading(false)
            openSnackbar('Не удалось выполнить запрос')
            console.error(err)
        }
    }

    if (!user) return null

    return (
        <Padding>
            <Title>Создать блог</Title>

            <View className="card">
                <form onSubmit={handleCreate}>
                    <Input name="title" label="Заголовок" required />
                    <Textarea name="content" label="Контент" required rows={10} />
                    <Button loading={loading} type="submit">
                        Добавить
                    </Button>
                </form>
            </View>
        </Padding>
    )
}

export default CreateBlog
