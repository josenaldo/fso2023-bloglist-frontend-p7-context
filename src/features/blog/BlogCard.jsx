import React from 'react'

import { Box, Card, CardActions, CardContent } from '@mui/material'

import { useAuth } from '@/features/auth'
import {
  useLikeBlogMutation,
  useDeleteBlogMutation,
  BlogImage,
  BlogCardHeader,
  BlogActions,
} from '@/features/blog'
import {
  useNotificationDispatch,
  useSetNotification,
  useSetErrorNotification,
  NOTIFICATION_TYPES,
} from '@/features/notification'
import { YesNoDialog } from '@/features/ui'

const BlogCard = ({ blog, blogOwner }) => {
  const dispatch = useNotificationDispatch()
  const setNotification = useSetNotification()
  const setErrorNotification = useSetErrorNotification()
  const { mutate: likeBlog, isLoading: isLikeLoading } = useLikeBlogMutation()
  const { mutate: deleteBlog } = useDeleteBlogMutation()
  const [openConfirmRemove, setOpenConfirmRemove] = React.useState(false)

  const { user: loggedUser } = useAuth()

  const owner = blogOwner || blog?.user || null
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
          image={`https://picsum.photos/seed/${blog.id}/600/150`}
        />

        <CardContent
          sx={{
            flexGrow: 1,
          }}
        >
          <BlogCardHeader blog={blog} />
        </CardContent>

        <CardActions>
          <BlogActions
            blog={blog}
            isBlogOwner={isBlogOwner}
            isLikeLoading={isLikeLoading}
            onLike={handleLike}
            onRemove={() => {
              setOpenConfirmRemove(true)
            }}
          />
        </CardActions>
      </Card>
    </Box>
  )
}

export default BlogCard
