import { Alert, AlertTitle } from '@mui/material'

const ErrorBox = ({ message }) => {
  return (
    <Alert severity="error" variant="outlined">
      <AlertTitle>Error</AlertTitle>
      <p>Message: {message}</p>
    </Alert>
  )
}

export default ErrorBox
