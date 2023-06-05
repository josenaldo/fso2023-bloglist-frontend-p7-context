import React from 'react'
import { useNavigate } from 'react-router-dom'

import { AppBar, IconButton, Toolbar, Box } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { useAuth, useLogout } from '@/features/auth'
import Logo from './Logo'
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'
import UserMenu from './UserMenu'

const NavBar = () => {
  const navigate = useNavigate()
  const auth = useAuth()
  const { mutate: logout } = useLogout()

  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <AppBar component="nav" position="sticky">
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Logo />

          <DesktopMenu user={auth.user} logout={handleLogout} />
        </Box>

        <UserMenu user={auth.user} logout={handleLogout} />
      </Toolbar>

      <MobileMenu
        user={auth.user}
        logout={handleLogout}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </AppBar>
  )
}

export default NavBar
