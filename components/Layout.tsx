import { ReactNode, useState } from 'react'
import { AppShell } from '@mantine/core'
import AppHeader from './AppHeader'
import AppNavBar from './AppNavBar'
import Footer from '../components/Footer'

const Layout = ({ children }: { children: ReactNode }) => {
  const [expandedNavbar, setExpandedNavbar] = useState(false)

  return (
    <>
      <AppShell
        navbar={<AppNavBar expanded={expandedNavbar} />}
        header={
          <AppHeader
            navBarOpened={expandedNavbar}
            toggleNavBar={() => {
              setExpandedNavbar(!expandedNavbar)
            }}
          />
        }
        classNames={{
          main: expandedNavbar ? 'hidden' : '',
        }}
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        {children}
        <Footer />
      </AppShell>
    </>
  )
}
export default Layout
