import { ErrorBox, NotFound } from '@/features/ui'
import { Box } from '@mui/material'

import { Loading } from '@/features/ui'
import { useAuth } from '@/features/auth'
import { Blog, useGetBlogQuery } from '@/features/blog'

const BlogPage = ({ blogId }) => {
  const { user: loggedUser } = useAuth()

  if (!blogId) {
    return <NotFound name="Blog" />
  }

  const { data: blog, isLoading, isError } = useGetBlogQuery(blogId)

  if (isLoading) {
    return <Loading />
  }

  if (!blog) {
    return <NotFound name="Blog" />
  }

  if (isError) {
    return <ErrorBox message="Error on blogs retrieval" />
  }

  return (
    <Box>
      <Blog blog={blog} loggedUser={loggedUser} />
    </Box>
  )
}

export default BlogPage
