import { ActionIcon, ActionIconProps } from '@mantine/core'

// This is to replace the behavior of :hover and :active of <ActionIcon />
const CustomXActionIcon = (props: ActionIconProps<'button'>) => {
  const children = props.children
  const color = props.color ?? 'gray'
  const variant = props.variant ?? 'default'
  return (
    <ActionIcon
      {...props}
      sx={(theme) => {
        return {
          '&:not(:disabled):hover': {
            ...(variant === 'default' && {
              backgroundColor: theme.colors[color][2],
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
    </ActionIcon>
  )
}

export default CustomXActionIcon
