import { SWRConfig } from 'swr'

const SWRWrapped = (Component: () => JSX.Element) => {
  const SWRdPage = ({ fallback }: { fallback: any }) => (
    <SWRConfig value={{ fallback }}>
      <Component />
    </SWRConfig>
  )
  return SWRdPage
}

export default SWRWrapped
