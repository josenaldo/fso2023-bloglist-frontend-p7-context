import { Header, Footer } from '@/features/layout'
import { Notification } from '@/features/notification'
import { Box, Container } from '@mui/material'

const Template = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Header />

      <Notification />

      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          my: 2,
        }}
      >
        <main>{children}</main>
      </Container>

      <Footer />
    </Box>
  )
}

export default Template
