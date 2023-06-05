import axios from 'axios'

import { appConfig } from '@/data'
import { getHeaders } from '@/features/api'

const baseURL = `${appConfig.application.BACKEND}/api/users`

const getUsers = async (token) => {
  const { data } = await axios.get(baseURL, getHeaders(token))
  return data
}

const getUserProfile = async (username, token) => {
  const { data } = await axios.get(
    `${baseURL}/profile/${username}`,
    getHeaders(token)
  )

  return data
}

export { getUsers, getUserProfile }
