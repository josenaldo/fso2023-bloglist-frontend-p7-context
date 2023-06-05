import { useAuth } from '@/features/auth'
import { useNotification } from '@/features/notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useQueryApi = ({ queryKey, queryFn, options }) => {
  const { getToken } = useAuth()

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey,
    queryFn: async () => {
      const token = getToken()

      if (queryKey.length === 1) {
        return await queryFn(token)
      }

      return await queryFn(queryKey[1], token)
    },
    ...options,
  })
}

const useMutationApi = ({
  queryKey,
  queryFn,
  buildSuccessMessage,
  buildErrorMessage,
  options,
}) => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()
  const { dispatch, setNotification, setErrorNotification, LEVELS } =
    useNotification()

  return useMutation({
    mutationFn: async (args) => {
      const token = getToken()

      return await queryFn({ ...args, token })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKey[0]])
      if (queryKey.length > 1) {
        queryClient.invalidateQueries([queryKey[0], queryKey[1]])
      }

      dispatch(
        setNotification({
          type: LEVELS.SUCCESS,
          message: 'Success',
          details: buildSuccessMessage(data),
        })
      )
    },
    onError: (error) => {
      dispatch(
        setErrorNotification({
          message: 'Error',
          details: buildErrorMessage(error),
          error,
        })
      )
    },
    ...options,
  })
}

export { useQueryApi, useMutationApi }
