import { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ReactComponent as LogoutIcon } from '../assets/logout.svg'
import { ReactComponent as AddIcon } from '../assets/add.svg'
import Padding from './Padding'
import Button from './Button'
import Loading from './Loading'
import { Store } from '../context'

const Container = styled.div`
    width: 100%;
    height: 60px;
    background-color: white;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    .content {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .create-blog-btn {
            @media (max-width: 500px) {
                display: none;
            }
        }

        .mobile-add {
            @media (min-width: 500px) {
                display: none;
            }
        }
    }
`

const View = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const UserName = styled.div`
    font-size: 14px;
    color: rgba(0, 0, 0, 0.8);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
`

const Icon = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    margin-left: 15px;
    height: 34px;
    width: 34px;
    cursor: pointer;

    svg {
        width: 18px;
        height: 18px;

        path {
            stroke: rgba(0, 0, 0, 0.8);
        }
    }
`

const Logo = styled.div`
    color: rgba(0, 0, 0, 0.8);
    font-size: 16px;
`

const Header = ({ history }) => {
    const { userState, userLoading } = useContext(Store)
    const [user, setUser] = userState

    const handleLogout = () => {
        localStorage.removeItem('token')
        setUser(null)
        history.push('/login')
    }

    return (
        <Container>
            <Padding className="content">
                <Link to={`/`}>
                    <Logo>Главная</Logo>
                </Link>
                {user ? (
                    <Link to={`/blogs/create`}>
                        <Button className="create-blog-btn">Добавить блог</Button>
                    </Link>
                ) : null}
                {userLoading ? (
                    <Loading />
                ) : user ? (
                    <View>
                        <UserName>{user.login}</UserName>
                        <Icon onClick={handleLogout}>
                            <LogoutIcon />
                        </Icon>
                        <Link to={`/blogs/create`}>
                            <Icon className="mobile-add">
                                <AddIcon />
                            </Icon>
                        </Link>
                    </View>
                ) : (
                    <Link to={`/login`}>
                        <Button>Войти</Button>
                    </Link>
                )}
            </Padding>
        </Container>
    )
}

export default Header
