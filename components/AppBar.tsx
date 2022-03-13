import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Link from 'next/link'

const MyAppBar = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            <a className="text-white no-underline hover:underline">
              INFO PRIDE
            </a>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default MyAppBar
