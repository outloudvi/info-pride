import Link from 'next/link'
import { Navbar, UnstyledButton } from '@mantine/core'

import Pages from '#data/pages'

const AppNavBar = ({ expanded }: { expanded: boolean }) => {
  return (
    <Navbar
      className={
        (expanded ? 'w-screen sm:w-48 lg:w-64' : 'w-0') + ' overflow-hidden'
      }
      style={{
        transition: 'width 0.2s ease-out',
      }}
      width={{ base: 200 }}
      height={'calc(100vh - 60px)'}
    >
      {Object.entries(Pages).map(([k, v], key) => (
        <Navbar.Section key={key}>
          <Link href={v} passHref>
            <UnstyledButton className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded w-full px-2 py-2 whitespace-nowrap">
              {k}
            </UnstyledButton>
          </Link>
        </Navbar.Section>
      ))}
    </Navbar>
  )
}

export default AppNavBar
