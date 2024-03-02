import { MultiSelect, Select } from '@mantine/core'
import type { MultiSelectProps, SelectProps } from '@mantine/core'
import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'

export const FilterSelect = <T extends string>({
    label,
    list,
    width,
    className,
    displayAs,
    listNamemap,
    formProps,
    value,
    maxDropdownHeight = 220, // mantine preset value
}: {
    label: string | ReactNode
    list: readonly T[]
    width?: number
    className?: string
    displayAs?: (s: string) => string
    listNamemap?: Record<string, string>
    formProps?: Omit<SelectProps, 'data'> | Omit<MultiSelectProps, 'data'>
    maxDropdownHeight?: number
    value?: string
} & Partial<Omit<SelectProps, 'list'>>) => {
    const $c = useTranslations('common')

    const data =
        displayAs ?? listNamemap
            ? list.map((x) => ({
                  label: (displayAs ? displayAs(x) : listNamemap?.[x]) ?? x,
                  value: x,
              }))
            : [...list]
    return (
        <Select
            size="sm"
            data={data}
            label={label}
            width={width}
            className={className}
            clearable
            clearButtonProps={{
                'aria-label': $c('Clear'),
            }}
            {...(formProps as Omit<SelectProps, 'data'>)}
            maxDropdownHeight={maxDropdownHeight}
            value={value as string | undefined}
        />
    )
}

export const MultipleFilterSelect = <T extends string>({
    label,
    list,
    width,
    className,
    displayAs,
    listNamemap,
    formProps,
    value,
    maxDropdownHeight = 220, // mantine preset value
}: {
    label: string | ReactNode
    list: readonly T[]
    width?: number
    className?: string
    displayAs?: (s: string) => string
    listNamemap?: Record<string, string>
    formProps?: Omit<SelectProps, 'data'> | Omit<MultiSelectProps, 'data'>
    maxDropdownHeight?: number
    value?: string[]
} & Partial<Omit<MultiSelectProps, 'list'>>) => {
    const $c = useTranslations('common')

    const data =
        displayAs ?? listNamemap
            ? list.map((x) => ({
                  label: (displayAs ? displayAs(x) : listNamemap?.[x]) ?? x,
                  value: x,
              }))
            : [...list]

    return (
        <MultiSelect
            styles={{
                input: {
                    width,
                },
            }}
            size="sm"
            data={data}
            label={label}
            className={className}
            clearable
            clearButtonProps={{
                'aria-label': $c('Clear'),
            }}
            classNames={{
                wrapper: 'max-w-xl',
            }}
            {...(formProps as Omit<MultiSelectProps, 'data'>)}
            maxDropdownHeight={maxDropdownHeight}
            value={value as string[] | undefined}
            multiple
        />
    )
}
