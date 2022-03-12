import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Link from '@mui/material/Link'
import NextLink from 'next/link'

const MyAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <NextLink href="/" passHref>
            <Link
              underline="hover"
              sx={{
                color: 'white',
              }}
            >
              INFO PRIDE
            </Link>
          </NextLink>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default MyAppBar
