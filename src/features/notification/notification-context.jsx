import { createContext, useContext } from 'react'

import {
  NOTIFICATION_TYPES,
  NO_NOTIFICATION_STATE,
  handleError,
  NOTIFICATION_TIMEOUT,
  ERROR_NOTIFICATION_TIMEOUT,
} from '@/features/notification'

const NotificationContext = createContext(NO_NOTIFICATION_STATE)
export default NotificationContext

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'notification/setNotification':
      return {
        type: action.payload.type,
        message: action.payload.message,
        details: action.payload.details,
        error: action.payload.error,
        timeoutId: action.payload.timeoutId,
      }
    case 'notification/setErrorNotification':
      return {
        type: action.payload.type,
        message: action.payload.message,
        details: action.payload.details,
        error: action.payload.error,
        timeoutId: action.payload.timeoutId,
      }
    case 'notification/removeNotification':
      return NO_NOTIFICATION_STATE
    default:
      return state
  }
}

export const useNotificationValue = () => {
  const context = useContext(NotificationContext)

  return context.notification
}

export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext)

  return context.dispatch
}

export const useSetNotification = () => {
  const dispatch = useNotificationDispatch()
  const notificationValue = useNotificationValue()

  const setNotification = ({
    type,
    message,
    details,
    timeoutInSeconds = NOTIFICATION_TIMEOUT,
  }) => {
    if (notificationValue.timeoutId) {
      clearTimeout(notificationValue.timeoutId)
    }

    const timeoutId = setTimeout(() => {
      dispatch({ type: 'notification/removeNotification' })
    }, timeoutInSeconds * 1000)

    return {
      type: 'notification/setNotification',
      payload: {
        type,
        message,
        details,
        error: null,
        timeoutId,
      },
    }
  }

  return setNotification
}

export const useSetErrorNotification = () => {
  const dispatch = useNotificationDispatch()
  const notificationValue = useNotificationValue()

  const setErrorNotification = ({
    error,
    message,
    details,
    timeoutInSeconds = ERROR_NOTIFICATION_TIMEOUT,
  }) => {
    if (notificationValue.timeoutId) {
      clearTimeout(notificationValue.timeoutId)
    }

    const timeoutId = setTimeout(() => {
      dispatch({ type: 'notification/removeNotification' })
    }, timeoutInSeconds * 1000)

    const payload = handleError(error, message, details)

    payload.type = NOTIFICATION_TYPES.ERROR
    payload.timeoutId = timeoutId

    return {
      type: 'notification/setNotification',
      payload: payload,
    }
  }

  return setErrorNotification
}

export const removeNotification = () => {
  return {
    type: 'notification/removeNotification',
  }
}

export const useRemoveNotification = () => {
  return removeNotification
}

export const useNotification = () => {
  return {
    notification: useNotificationValue(),
    dispatch: useNotificationDispatch(),
    setNotification: useSetNotification(),
    setErrorNotification: useSetErrorNotification(),
    LEVELS: NOTIFICATION_TYPES,
  }
}
