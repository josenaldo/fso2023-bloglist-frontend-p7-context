import { ErrorBox, PageTitle } from '@/features/ui'
import { Box } from '@mui/material'
import { UserList } from '@/features/user'
import { useGetUsersQuery } from '@/features/user'
import { Loading } from '@/features/ui'

const UsersPage = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery()

  if (isError) {
    return <ErrorBox message="Erro ao recuperar usuários" />
  }

  return (
    <Box>
      <PageTitle>Users</PageTitle>

      {isLoading ? <Loading /> : <UserList users={users} />}
    </Box>
  )
}

export default UsersPage
