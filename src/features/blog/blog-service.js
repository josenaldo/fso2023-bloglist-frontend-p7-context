import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useNotification } from '@/features/notification'
import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  removeBlog,
  likeBlog,
  commentBlog,
} from '@/features/blog/'

// eslint-disable-next-line no-unused-vars
import { useQueryApi, useMutationApi } from '@/features/api'

const useGetBlogsQuery = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
  })
}

const useGetBlogQuery = ({ id }) => {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: getBlog,
  })
}

const useCreateBlogMutation = () => {
  const queryClient = useQueryClient()
  const { dispatch, setNotification, setErrorNotification, LEVELS } =
    useNotification()

  return useMutation({
    mutationFn: createBlog,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['blogs'])

      dispatch(
        setNotification({
          type: LEVELS.SUCCESS,
          message: 'Blog added successfully',
          details: `Blog ${data.title} added successfully`,
        })
      )
    },
    onError: (error) => {
      dispatch(
        setErrorNotification({
          message: 'Error',
          details: 'Error creating blog. Please try again.',
          error,
        })
      )
    },
  })
}

const useUpdateBlogMutation = () => {
  const queryClient = useQueryClient()
  const { dispatch, setNotification, setErrorNotification, LEVELS } =
    useNotification()

  return useMutation({
    mutationFn: updateBlog,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['blogs'])
      queryClient.invalidateQueries(['blogs', data.id])

      dispatch(
        setNotification({
          type: LEVELS.SUCCESS,
          message: 'Blog updated successfully',
          details: `Blog ${data.title} updated successfully`,
        })
      )
    },
    onError: (error) => {
      dispatch(
        setErrorNotification({
          message: 'Error',
          details: 'Error uptdating blog. Please try again.',
          error,
        })
      )
    },
  })
}
const useDeleteBlogMutation = () => {
  const queryClient = useQueryClient()
  const { dispatch, setNotification, setErrorNotification, LEVELS } =
    useNotification()

  return useMutation({
    mutationFn: removeBlog,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['blogs'])

      dispatch(
        setNotification({
          type: LEVELS.SUCCESS,
          message: 'Blog removed successfully',
          details: `Blog ${data.title} removed successfully`,
        })
      )
    },
    onError: (error) => {
      dispatch(
        setErrorNotification({
          message: 'Error',
          details: 'Error removing blog. Please try again.',
          error,
        })
      )
    },
  })
}
const useLikeBlogMutation = () => {
  const queryClient = useQueryClient()
  const { dispatch, setNotification, setErrorNotification, LEVELS } =
    useNotification()

  return useMutation({
    mutationFn: likeBlog,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['blogs'])
      queryClient.invalidateQueries(['blogs', data.id])

      dispatch(
        setNotification({
          type: LEVELS.SUCCESS,
          message: 'Blog liked successfully',
          details: `Blog ${data.title} liked successfully`,
        })
      )
    },
    onError: (error) => {
      dispatch(
        setErrorNotification({
          message: 'Error',
          details: 'Error liking blog. Please try again.',
          error,
        })
      )
    },
  })
}
const useCommentBlogMutation = () => {
  const queryClient = useQueryClient()
  const { dispatch, setNotification, setErrorNotification, LEVELS } =
    useNotification()

  return useMutation({
    mutationFn: commentBlog,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['blogs'])
      queryClient.invalidateQueries(['blogs', data.id])

      dispatch(
        setNotification({
          type: LEVELS.SUCCESS,
          message: 'Blog commented successfully',
          details: `Blog ${data.title} commented successfully`,
        })
      )
    },
    onError: (error) => {
      dispatch(
        setErrorNotification({
          message: 'Error',
          details: 'Error commenting blog. Please try again.',
          error,
        })
      )
    },
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
