import { useQueryApi } from '@/features/api'

import { getUsers, getUserProfile } from '@/features/user'

const useGetUsersQuery = () => {
  return useQueryApi({
    queryKey: ['users'],
    queryFn: getUsers,
  })
}

const useGetUserProfileQuery = ({ username }) => {
  return useQueryApi({
    queryKey: ['user', username],
    queryFn: getUserProfile,
  })
}
export { useGetUsersQuery, useGetUserProfileQuery }
