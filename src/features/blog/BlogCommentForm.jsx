import { useState } from 'react'

import { Box, Card, CardActions, CardContent, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { useCommentBlogMutation } from '@/features/blog'
import {
  useSetNotification,
  useSetErrorNotification,
  NOTIFICATION_TYPES,
} from '@/features/notification'

import { CardTitle } from '@/features/ui'

const BlogCommentForm = ({ blog }) => {
  const setNotification = useSetNotification()
  const setErrorNotification = useSetErrorNotification()
  const [commentBlog, { isLoading }] = useCommentBlogMutation()

  const [content, setContent] = useState('')

  const handleCommentBlog = async (event) => {
    event.preventDefault()
    try {
      await commentBlog({ id: blog.id, content }).unwrap()

      setNotification({
        type: NOTIFICATION_TYPES.SUCCESS,
        message: 'New comment added',
        details: `A new comment added: '${content}'`,
      })

      setContent('')
    } catch (error) {
      setErrorNotification({
        message: 'Error commenting blog. Please try again.',
        details: error.errorMessage,
        error,
      })
    }
  }

  return (
    <form onSubmit={handleCommentBlog}>
      <Card elevation={1}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <CardTitle>Add a comment</CardTitle>
            <TextField
              id="content"
              type="text"
              value={content}
              name="content"
              label="Comment"
              onChange={({ target }) => setContent(target.value)}
            />
          </Box>
        </CardContent>
        <CardActions>
          <LoadingButton id="add-comment" type="submit" loading={isLoading}>
            Send
          </LoadingButton>
        </CardActions>
      </Card>
    </form>
  )
}

export default BlogCommentForm
