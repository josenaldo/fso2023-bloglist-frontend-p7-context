import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  removeBlog,
  likeBlog,
  commentBlog,
} from '@/features/blog/'

import { useQueryApi, useMutationApi } from '@/features/api'

const useGetBlogsQuery = () => {
  return useQueryApi({
    queryKey: ['blogs'],
    queryFn: getBlogs,
  })
}

const useGetBlogQuery = (id) => {
  return useQueryApi({
    queryKey: ['blogs', id],
    queryFn: getBlog,
  })
}

const useCreateBlogMutation = () => {
  return useMutationApi({
    queryKey: ['blogs'],
    queryFn: createBlog,
    buildSuccessMessage: (data) => `Blog ${data.title} added successfully`,
    buildErrorMessage: () => 'Error creating blog. Please try again.',
  })
}

const useUpdateBlogMutation = (id) => {
  return useMutationApi({
    queryKey: ['blogs', id],
    queryFn: updateBlog,
    buildSuccessMessage: (data) => `Blog ${data.title} updated successfully`,
    buildErrorMessage: () => 'Error updating blog. Please try again.',
  })
}
const useDeleteBlogMutation = () => {
  return useMutationApi({
    queryKey: ['blogs'],
    queryFn: removeBlog,
    buildSuccessMessage: (data) => `Blog ${data.title} removed successfully`,
    buildErrorMessage: () => 'Error removing blog. Please try again.',
  })
}
const useLikeBlogMutation = (id) => {
  return useMutationApi({
    queryKey: ['blogs', id],
    queryFn: likeBlog,
    buildSuccessMessage: (data) => `Blog ${data.title} liked successfully`,
    buildErrorMessage: () => 'Error liking blog. Please try again.',
  })
}
const useCommentBlogMutation = (id) => {
  return useMutationApi({
    queryKey: ['blogs', id],
    queryFn: commentBlog,
    buildSuccessMessage: (data) => `Blog ${data.title} commented successfully`,
    buildErrorMessage: () => 'Error commenting blog. Please try again.',
  })
}

export {
  useGetBlogsQuery,
  useGetBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useLikeBlogMutation,
  useCommentBlogMutation,
}
