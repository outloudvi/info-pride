import { MultiSelect, Select } from '@mantine/core'
import type { MultiSelectProps, SelectProps } from '@mantine/core'
import { ReactNode } from 'react'

const FilterSelect = <T extends string>({
    label,
    list,
    width,
    multiple,
    className,
    listNamemap,
    formProps,
}: {
    label: string | ReactNode
    list: readonly T[]
    width: number
    multiple?: boolean
    className?: string
    listNamemap?: Record<string, string>
    formProps: Omit<SelectProps, 'data'> & Omit<MultiSelectProps, 'data'>
}) => {
    const data = listNamemap
        ? list.map((x) => ({
              label: listNamemap[x] ?? x,
              value: x,
          }))
        : [...list]
    if (multiple) {
        return (
            <MultiSelect
                data={data}
                label={label}
                width={width}
                className={className}
                clearable
                classNames={{
                    wrapper: 'max-w-xl',
                }}
                {...formProps}
            />
        )
    } else {
        return (
            <Select
                data={data}
                label={label}
                width={width}
                className={className}
                clearable
                {...formProps}
            />
        )
    }
}

export default FilterSelect
