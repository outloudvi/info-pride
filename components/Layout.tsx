import type { ReactNode } from 'react'
import AppBar from '../components/AppBar'
import Container from '@mui/material/Container'
import Footer from '../components/Footer'

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <AppBar />
    <Container className="mt-3">{children}</Container>
    <Footer />
  </>
)

export default Layout
