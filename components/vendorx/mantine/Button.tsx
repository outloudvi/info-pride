import { Button, ButtonProps } from '@mantine/core'

// This is to replace the behavior of :hover and :active of <Button />
const CustomXButton = (props: ButtonProps<'button'>) => {
  const children = props.children
  const color = props.color ?? 'blue'
  const variant = props.variant ?? 'default'
  return (
    <Button
      {...props}
      sx={(theme) => {
        return {
          '&:not(:disabled):hover': {
            ...(variant === 'default' && {
              backgroundColor: theme.colors[color][4],
            }),
          },
          '&:not(:disabled):active': {
            transform: 'none',
            ...(variant === 'default'
              ? {
                  backgroundColor: theme.colors[color][8],
                }
              : {
                  backgroundColor: theme.colors[color][2],
                }),
          },
        }
      }}
    >
      {children}
    </Button>
  )
}

export default CustomXButton
