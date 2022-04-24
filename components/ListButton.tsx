import { Button, ButtonProps } from '@mantine/core'

const ListButton = (props: ButtonProps<'button'> & { selected?: boolean }) => (
  <Button
    {...props}
    variant="outline"
    fullWidth
    className={
      (props.className ?? '') +
      ' h-14 mt-2 text-left ' +
      (props.selected ? 'border-none text-black dark:text-white' : '')
    }
    classNames={{
      inner: 'block',
    }}
  />
)

export default ListButton
