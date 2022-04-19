import { Button, ButtonProps } from '@mantine/core'

// This is to replace the behavior of :hover and :active of <Button />
const CustomizedButton = (props: ButtonProps<'button'>) => {
  const children = props.children
  const color = props.color || 'blue'
  return (
    <Button
      {...props}
      sx={(theme) => {
        return {
          '&:not(:disabled):hover': {
            backgroundColor: theme.colors[color][4],
          },
          '&:not(:disabled):active': {
            transform: 'none',
            backgroundColor: theme.colors[color][8],
          },
        }
      }}
    >
      {children}
    </Button>
  )
}

export default CustomizedButton
