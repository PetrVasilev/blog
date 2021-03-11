import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSnackbar } from 'react-simple-snackbar'
import { DateTime } from 'luxon'

import Title from '../../components/Title'
import Textarea from '../../components/Textarea'
import Button from '../../components/Button'
import api from '../../utils/api'
import Loading from '../../components/Loading'

const View = styled.div`
    padding: 15px;
    margin-bottom: 15px;

    .comment-input {
        margin-bottom: 7px;
    }

    .comment-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 6px;

        .comment {
            white-space: pre-line;
        }

        .createdAt {
            font-size: 14px;
            color: gray;
        }

        .user {
            font-size: 14px;
            color: gray;
        }
    }
`

const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
`

const Actions = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 5px;

    .btn {
        font-size: 12px;
        margin-right: 10px;
        cursor: pointer;
    }

    .edit {
        color: blue;
    }

    .delete {
        color: red;
    }
`

const Comments = ({ blog, user }) => {
    const [comment, setComment] = useState('')
    const [commentLoading, setCommentLoading] = useState('')
    const [commentsLoading, setCommentsLoading] = useState('')
    const [commentEditing, setCommentEditing] = useState('')
    const [comments, setComments] = useState([])
    const [editCommentId, setEditCommentId] = useState('')

    const [openSnackbar] = useSnackbar()

    const handleCreateComment = async (e) => {
        e.preventDefault()
        try {
            setCommentLoading(true)
            const { data } = await api().post('/comment', {
                text: comment,
                blogId: blog.id
            })
            setCommentLoading(false)
            setComments((prev) => [...prev, data.comment])
            setComment('')
        } catch (err) {
            console.error(err)
            setCommentLoading(false)
            openSnackbar('Не удалось добавить комментарий')
        }
    }

    const handleEditComment = async (e) => {
        e.preventDefault()
        try {
            setCommentEditing(true)
            const { data } = await api().put('/comment', {
                text: comment,
                id: editCommentId
            })
            setCommentEditing(false)
            setComments((prev) =>
                prev.map((item) => {
                    if (item.id === editCommentId) {
                        return data.comment
                    }
                    return item
                })
            )
            setComment('')
            setEditCommentId('')
        } catch (err) {
            console.error(err)
            setCommentEditing(false)
            openSnackbar('Не удалось изменить комментарий')
        }
    }

    const getComments = async () => {
        try {
            setCommentsLoading(true)
            const { data } = await api().get(`/comment/${blog.id}`)
            setComments(data.comments)
            setCommentsLoading(false)
        } catch (err) {
            console.error(err)
            setCommentsLoading(false)
        }
    }

    useEffect(() => {
        getComments()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Title>Комментарии</Title>

            {commentsLoading ? (
                <Center>
                    <Loading />
                </Center>
            ) : (
                comments.map((item) => (
                    <Comment
                        setEditCommentId={setEditCommentId}
                        setComments={setComments}
                        setComment={setComment}
                        key={item.id}
                        user={user}
                        comment={item}
                    />
                ))
            )}

            <View className="card">
                <form onSubmit={editCommentId ? handleEditComment : handleCreateComment}>
                    <Textarea
                        containerClass="comment-input"
                        placeholder="Введите комментарий"
                        value={comment}
                        rows={3}
                        onChange={(e) => {
                            setComment(e.target.value)
                            if (!e.target.value) {
                                setEditCommentId('')
                            }
                        }}
                        required
                    />
                    {editCommentId ? (
                        <Button loading={commentEditing} type="submit">
                            Изменить комментарий
                        </Button>
                    ) : (
                        <Button loading={commentLoading} type="submit">
                            Добавить комментарий
                        </Button>
                    )}
                </form>
            </View>
        </>
    )
}

const Comment = ({ comment, user, setEditCommentId, setComments, setComment }) => {
    const [openSnackbar] = useSnackbar()

    const handleDelete = async () => {
        try {
            await api().delete(`/comment`, {
                params: { id: comment.id }
            })
            openSnackbar('Комментарий удален')
            setComments((prev) => prev.filter((item) => item.id !== comment.id))
        } catch (err) {
            console.error(err)
            openSnackbar('Не удалось удалить комментарий')
        }
    }

    return (
        <View className="card">
            <div className="comment">{comment.text}</div>
            <div className="comment-info">
                <div className="createdAt">
                    {DateTime.fromISO(comment.createdAt)
                        .setLocale('ru')
                        .toFormat('dd.MM.yyyy HH:mm')}
                </div>
                <div className="user">{comment.user.login}</div>
            </div>
            {user && user.id === comment.user.id && (
                <Actions>
                    <div
                        onClick={() => {
                            setEditCommentId(comment.id)
                            setComment(comment.text)
                        }}
                        className="btn edit"
                    >
                        Изменить
                    </div>
                    <div onClick={handleDelete} className="btn delete">
                        Удалить
                    </div>
                </Actions>
            )}
        </View>
    )
}

export default Comments
