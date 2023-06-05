import axios from 'axios'

import { appConfig } from '@/data'
import { getHeaders } from '@/features/api'

const baseURL = `${appConfig.application.BACKEND}/api/blogs`

const getBlogs = async (token) => {
  const { data } = await axios.get(baseURL, getHeaders(token))
  return data
}

const getBlog = async (id, token) => {
  const { data } = await axios.get(`${baseURL}/${id}`, getHeaders(token))
  return data
}

const createBlog = async ({ blog, token }) => {
  const { data } = await axios.post(baseURL, blog, getHeaders(token))
  return data
}

const updateBlog = async ({ id, blog, token }) => {
  const { data } = await axios.put(`${baseURL}/${id}`, blog, getHeaders(token))
  return data
}

const removeBlog = async ({ id, token }) => {
  const { data } = await axios.delete(
    `${baseURL}/${id}`,

    getHeaders(token)
  )
  return data
}

const likeBlog = async ({ id, token }) => {
  const { data } = await axios.post(
    `${baseURL}/${id}/like`,
    null,
    getHeaders(token)
  )
  return data
}

const commentBlog = async ({ id, content }) => {
  const { data } = await axios.post(`${baseURL}/${id}/comments`, { content })
  return data
}

export {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  removeBlog,
  likeBlog,
  commentBlog,
}
