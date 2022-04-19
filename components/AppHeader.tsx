import * as React from 'react'
import Link from 'next/link'
import { Burger, Header } from '@mantine/core'

const AppHeader = ({
  navBarOpened,
  toggleNavBar,
}: {
  navBarOpened: boolean
  toggleNavBar: () => void
}) => {
  const title = navBarOpened ? 'Collapse navigation' : 'Expand navigation'
  return (
    <Header height={60} p="xs" className="flex items-center">
      <Burger
        opened={navBarOpened}
        onClick={toggleNavBar}
        title={title}
        aria-label={title}
        className="sm:hidden"
      />
      <Link href="/">
        <a className="text-black no-underline hover:underline ml-2">
          <b>INFO PRIDE</b>
        </a>
      </Link>
    </Header>
  )
}

export default AppHeader
