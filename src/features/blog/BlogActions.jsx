import {
  useDeleteBlogMutation,
  useLikeBlogMutation,
} from '@/features/blog/blog-api'
import { YesNoDialog } from '@/features/ui'
import { LoadingButton } from '@mui/lab'
import { Box, Button } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BlogActions = ({ blog, isBlogOwner }) => {
  const navigate = useNavigate()
  const { mutate: likeBlog, isLoading: isLikeLoading } = useLikeBlogMutation(
    blog.id
  )
  const { mutate: deleteBlog } = useDeleteBlogMutation(blog.id)
  const [openConfirmRemove, setOpenConfirmRemove] = useState(false)

  const handleLike = async (blog) => {
    likeBlog({ id: blog.id })
  }

  const removeBlog = async (blog) => {
    deleteBlog({ id: blog.id })
    navigate('/blogs')
  }

  if (!blog) {
    return null
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <YesNoDialog
        open={openConfirmRemove}
        onYes={() => removeBlog(blog)}
        onNo={() => setOpenConfirmRemove(false)}
        title="Confirmação"
        message={`Deseja remover o blog '${blog.title}'`}
      />

      <LoadingButton
        variant="outlined"
        color="primary"
        loading={isLikeLoading}
        onClick={() => {
          handleLike(blog)
        }}
      >
        Like
      </LoadingButton>
      {isBlogOwner && (
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            setOpenConfirmRemove(true)
          }}
        >
          Remove
        </Button>
      )}
    </Box>
  )
}

export default BlogActions
