import { useState, useContext } from 'react'
import { useSnackbar } from 'react-simple-snackbar'
import styled from 'styled-components'

import { Store } from '../context'
import api from '../utils/api'
import Padding from '../components/Padding'
import Input from '../components/Input'
import Button from '../components/Button'
import Title from '../components/Title'

const Container = styled.div`
    .content {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;

        .title {
            width: 350px;

            @media (max-width: 500px) {
                width: 100%;
            }
        }
    }
`

const View = styled.div`
    padding: 15px;
    margin-bottom: 15px;
    box-sizing: border-box;
    width: 350px;

    @media (max-width: 500px) {
        width: 100%;
    }
`

const Login = ({ history }) => {
    const { userState } = useContext(Store)

    const [openSnackbar] = useSnackbar()

    const setUser = userState[1]

    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        const login = e.target.login.value
        const password = e.target.password.value
        try {
            setLoading(true)
            const { data } = await api().post('/user/login', {
                login,
                password
            })
            localStorage.setItem('token', data.token)
            setUser(data.user)
            setLoading(false)
            openSnackbar('Вы успешно авторизовались')
            history.push(`/`)
        } catch (err) {
            setLoading(false)
            openSnackbar('Неправильный логин или пароль')
            console.error(err)
        }
    }

    return (
        <Container>
            <Padding className="content">
                <Title className="title">Вход в аккаунт</Title>
                <View className="card">
                    <form onSubmit={handleLogin}>
                        <Input name="login" label="Логин" type="text" required />
                        <Input name="password" label="Пароль" type="password" required />
                        <Button loading={loading} type="submit">
                            Войти
                        </Button>
                    </form>
                </View>
            </Padding>
        </Container>
    )
}

export default Login
