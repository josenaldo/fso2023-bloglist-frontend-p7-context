import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { appConfig } from '@/data'
import {
  NOTIFICATION_TYPES,
  useSetNotification,
  useSetErrorNotification,
  useNotificationDispatch,
} from '@/features/notification'
import { useNavigate } from 'react-router-dom'

const login = async (credentials) => {
  const { data } = await axios.post(
    `${appConfig.application.BACKEND}/api/login`,
    credentials
  )
  return data
}

const useLogin = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const notificationDispatch = useNotificationDispatch()
  const setNotification = useSetNotification()
  const setErrorNotification = useSetErrorNotification()

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data)
      localStorage.setItem(
        appConfig.application.LOGGED_USER_KEY,
        JSON.stringify(data)
      )

      notificationDispatch(
        setNotification({
          type: NOTIFICATION_TYPES.SUCCESS,
          message: 'Login successful',
        })
      )

      navigate('/')
    },
    onError: (error) => {
      notificationDispatch(
        setErrorNotification({
          message: 'Error',
          details: 'Error logging in. Please try again.',
          error,
        })
      )
    },
  })
}

const logout = () => {
  localStorage.removeItem(appConfig.application.LOGGED_USER_KEY)
}

const useLogout = () => {
  const notificationDispatch = useNotificationDispatch()
  const setNotification = useSetNotification()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null)
      notificationDispatch(
        setNotification({
          type: NOTIFICATION_TYPES.SUCCESS,
          message: 'Good bye!',
        })
      )
    },
  })
}

const getLoggedUser = () => {
  const loggedUserJSON = localStorage.getItem(
    appConfig.application.LOGGED_USER_KEY
  )

  let user

  if (loggedUserJSON) {
    user = JSON.parse(loggedUserJSON)
  } else {
    user = null
  }

  return user
}

const useAuth = () => {
  const queryClient = useQueryClient()

  const user = queryClient.getQueryData(['user'])

  const getToken = () => {
    return user?.token
  }

  return { user: user, getToken }
}

export { useLogin, useLogout, useAuth, getLoggedUser }
