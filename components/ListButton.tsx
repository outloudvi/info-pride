import type { ButtonProps } from '@mantine/core';
import { Button } from '@mantine/core'
import type { HTMLAttributes } from 'react'

const ListButton = (
    props: HTMLAttributes<HTMLButtonElement> &
        ButtonProps & { selected?: boolean }
) => (
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
