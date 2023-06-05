import React from 'react'

import { useLogin } from '@/features/auth'

import { LoadingButton } from '@mui/lab'
import { Card, CardActions, CardContent, Stack, TextField } from '@mui/material'

const LoginForm = () => {
  const { mutate: login, isLoading } = useLogin()

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    await login({ username, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent>
          <Stack
            sx={{
              gap: 2,
            }}
          >
            <TextField
              id="username"
              type="text"
              value={username}
              name="username"
              label="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
            <TextField
              id="password"
              type="password"
              value={password}
              name="password"
              label="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </Stack>
        </CardContent>
        <CardActions>
          <LoadingButton type="submit" loading={isLoading}>
            Login
          </LoadingButton>
        </CardActions>
      </Card>
    </form>
  )
}

export default LoginForm
