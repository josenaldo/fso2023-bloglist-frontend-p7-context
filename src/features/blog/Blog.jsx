import React from 'react'
import { useDispatch } from 'react-redux'

import { Box, Card, CardActions, CardContent } from '@mui/material'

import { useAuth } from '@/features/auth'
import {
  useLikeBlogMutation,
  useDeleteBlogMutation,
  BlogHeader,
  BlogImage,
  BlogActions,
  BlogDetails,
  BlogComments,
} from '@/features/blog'
import {
  useSetNotification,
  useSetErrorNotification,
  NOTIFICATION_TYPES,
} from '@/features/notification'
import { YesNoDialog } from '@/features/ui'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const setNotification = useSetNotification()
  const setErrorNotification = useSetErrorNotification()
  const [likeBlog, { isLoading: isLikeLoading }] = useLikeBlogMutation()
  const [deleteBlog] = useDeleteBlogMutation()
  const [openConfirmRemove, setOpenConfirmRemove] = React.useState(false)

  const { user: loggedUser } = useAuth()

  const owner = blog.user
  const isBlogOwner = owner?.username === loggedUser?.username

  const handleLike = async (blog) => {
    try {
      likeBlog(blog.id)
      dispatch(
        setNotification({
          type: NOTIFICATION_TYPES.INFO,
          message: 'Blog liked',
          details: `Blog '${blog.title}' liked.`,
        })
      )
    } catch (error) {
      dispatch(
        setErrorNotification({
          message: 'Error liking blog. Please try again.',
          details: error.errorMessage,
          error,
        })
      )
    }
  }

  const removeBlog = async (blog) => {
    try {
      deleteBlog(blog.id)

      dispatch(
        setNotification({
          type: NOTIFICATION_TYPES.SUCCESS,
          message: 'Blog removed',
          details: `Blog '${blog.title}' removed.`,
        })
      )
    } catch (error) {
      dispatch(
        setErrorNotification({
          message: 'Error removing blog. Please try again.',
          details: error.errorMessage,
          error,
        })
      )
    }
  }

  if (!blog) {
    return null
  }

  return (
    <Box>
      <YesNoDialog
        open={openConfirmRemove}
        onYes={() => removeBlog(blog)}
        onNo={() => setOpenConfirmRemove(false)}
        title="Confirmação"
        message={`Deseja remover o blog '${blog.title}'`}
      />

      <Card
        sx={{ mt: 2, height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <BlogImage
          blog={blog}
          image={`https://picsum.photos/seed/${blog.id}/1200/300`}
        />

        <CardContent
          sx={{
            flexGrow: 1,
          }}
        >
          <BlogHeader blog={blog} />
          <BlogDetails blog={blog} blogOwner={owner} />
        </CardContent>
        <CardActions>
          <BlogActions
            blog={blog}
            isBlogOwner={isBlogOwner}
            isLikeLoading={isLikeLoading}
            onLike={handleLike}
            onRemove={() => setOpenConfirmRemove(true)}
          />
        </CardActions>
      </Card>

      <BlogComments blog={blog} />
    </Box>
  )
}

export default Blog
