import { MultiSelect, Select } from '@mantine/core'
import type { MultiSelectProps, SelectProps } from '@mantine/core'
import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'

const FilterSelect = <T extends string>({
    label,
    list,
    width,
    multiple,
    className,
    displayAs,
    listNamemap,
    formProps,
}: {
    label: string | ReactNode
    list: readonly T[]
    width: number
    multiple?: boolean
    className?: string
    displayAs?: (s: string) => string
    listNamemap?: Record<string, string>
    formProps: Omit<SelectProps, 'data'> & Omit<MultiSelectProps, 'data'>
}) => {
    const $c = useTranslations('common')

    const data =
        displayAs || listNamemap
            ? list.map((x) => ({
                  label: (displayAs ? displayAs(x) : listNamemap?.[x]) ?? x,
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
                clearButtonProps={{
                    'aria-label': $c('Clear'),
                }}
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
                clearButtonProps={{
                    'aria-label': $c('Clear'),
                }}
                {...formProps}
            />
        )
    }
}

export default FilterSelect
