import styled from 'styled-components'
import { useContext } from 'react'
import { DateTime } from 'luxon'
import { Link } from 'react-router-dom'

import { ReactComponent as BookIcon } from '../assets/book.svg'
import { Store } from '../context'
import Padding from '../components/Padding'
import Title from '../components/Title'
import Loading from '../components/Loading'

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

const Top = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .my-blogs-title {
        margin-bottom: 15px;
        color: gray;
    }
`

const Main = () => {
    const { blogsLoading, blogsState, userState } = useContext(Store)

    const [user] = userState

    const [blogs] = blogsState

    return (
        <Padding>
            <Top>
                <Title>Блоги</Title>
                {user && (
                    <Link to={`/blogs`}>
                        <div className="my-blogs-title">Мои блоги</div>
                    </Link>
                )}
            </Top>

            {blogsLoading ? (
                <Center>
                    <Loading />
                </Center>
            ) : blogs.length === 0 ? (
                <Empty>
                    <BookIcon />
                    <div className="text">Пусто</div>
                </Empty>
            ) : (
                <>
                    {blogs.map((item) => (
                        <Link key={item.id} to={`/blogs/${item.id}`}>
                            <Blog className="card">
                                <div className="title">{item.title}</div>
                                <div className="info">
                                    <div className="user">{item.user.login}</div>
                                    <div className="createdAt">
                                        {DateTime.fromISO(item.createdAt)
                                            .setLocale('ru')
                                            .toFormat('dd.MM.yyyy HH:mm')}
                                    </div>
                                </div>
                            </Blog>
                        </Link>
                    ))}
                </>
            )}
        </Padding>
    )
}

const Blog = styled.div`
    padding: 15px;
    margin-bottom: 15px;

    .title {
        font-size: 14px;
        margin-bottom: 8px;
        color: #000;
    }

    .info {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .user {
            font-size: 12px;
            color: gray;
        }

        .createdAt {
            font-size: 12px;
            color: gray;
        }
    }
`

export default Main
