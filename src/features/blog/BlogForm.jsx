import React from 'react'
import { Box, Card, CardActions, CardContent, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { useCreateBlogMutation } from '@/features/blog'

import { CardTitle } from '@/features/ui'

const BlogForm = () => {
  const { mutate: createBlog, isLoading } = useCreateBlogMutation()

  const [title, setTitle] = React.useState('')
  const [author, setAuthor] = React.useState('')
  const [url, setUrl] = React.useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    const blog = { title, author, url }
    createBlog({ blog })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleCreateBlog}>
      <Card elevation={1}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <CardTitle>Create a new blog</CardTitle>
            <TextField
              id="title"
              type="text"
              value={title}
              name="title"
              label="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
            <TextField
              id="author"
              type="text"
              value={author}
              name="author"
              label="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
            <TextField
              id="url"
              type="text"
              value={url}
              name="url"
              label="URL"
              onChange={({ target }) => setUrl(target.value)}
            />
          </Box>
        </CardContent>
        <CardActions>
          <LoadingButton
            id="create-blog-button"
            type="submit"
            loading={isLoading}
          >
            Create
          </LoadingButton>
        </CardActions>
      </Card>
    </form>
  )
}

export default BlogForm
