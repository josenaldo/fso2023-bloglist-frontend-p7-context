import React from 'react'

import { Alert, AlertTitle, Container } from '@mui/material'

import {
  useRemoveNotification,
  useNotificationDispatch,
  useNotificationValue,
} from '@/features/notification'

const Notification = () => {
  const dispatch = useNotificationDispatch()
  const removeNotification = useRemoveNotification()
  const notification = useNotificationValue()

  const close = () => {
    dispatch(removeNotification())
  }

  if (!notification || !notification.message) {
    return null
  }

  return (
    <Container sx={{ my: 3 }} maxWidth="md">
      <Alert severity={notification.type} onClose={close} variant="outlined">
        <AlertTitle>{notification.message}</AlertTitle>

        {notification.details && <p>{notification.details}</p>}
        {notification.error && (
          <ul>
            {notification.error.statusCode && (
              <li>Status code: {notification.error.statusCode}</li>
            )}
            {notification.error.errorMessage && (
              <li>Message Error: {notification.error.errorMessage}</li>
            )}
            {notification.error.errorDetails && (
              <li>Details: {notification.error.errorDetails}</li>
            )}
          </ul>
        )}
      </Alert>
    </Container>
  )
}

export default Notification
