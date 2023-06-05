import { useRef } from 'react'

import { useGetBlogsQuery, BlogList, BlogForm } from '@/features/blog'
import { PageTitle, Togglable, Loading, ErrorBox } from '@/features/ui'
import { useAuth } from '@/features/auth'

const BlogsPage = () => {
  const { user } = useAuth()
  const blogFormRef = useRef()

  const { data: blogs, isLoading, isError } = useGetBlogsQuery()

  if (isError) {
    return <ErrorBox message="Error on blogs retrieval" />
  }

  return (
    <div>
      <PageTitle>Blog List</PageTitle>

      {user && (
        <Togglable buttonLabel="New blog" refs={blogFormRef}>
          <BlogForm />
        </Togglable>
      )}

      {isLoading ? <Loading /> : <BlogList blogs={blogs} />}
    </div>
  )
}

export default BlogsPage
