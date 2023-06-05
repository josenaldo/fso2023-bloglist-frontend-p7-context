import { Box } from '@mui/material'

const NotFound = ({ name }) => {
  return (
    <Box>
      <h3>Error</h3>
      <p>Message: {name}</p>
    </Box>
  )
}

export default NotFound
