'use client'

import { Button, Flex } from '@mantine/core'
import { useTranslations } from 'next-intl'

import type { BranchPoint } from './buildMessagePath'

const BranchSelector = ({
    branch,
    onSelect,
}: {
    branch: BranchPoint
    onSelect: (index: number) => void
}) => {
    const $t = useTranslations('messages')

    return (
        <Flex
            direction={{ base: 'column', sm: 'row' }}
            wrap="wrap"
            align={{ base: 'flex-end', sm: 'center' }}
            justify="flex-end"
            gap={8}
            my={8}
            pr={64}
            role="group"
            aria-label={$t('select_branch')}
        >
            {branch.options.map((option, index) => {
                const isSelected = index === branch.selected
                return (
                    <Button
                        key={option.messageDetailId}
                        size="sm"
                        radius="sm"
                        variant={isSelected ? 'filled' : 'outline'}
                        color={isSelected ? 'green' : 'grey'}
                        className={
                            isSelected
                                ? '!text-black'
                                : '!text-white'
                        }
                        aria-pressed={isSelected}
                        onClick={() => {
                            onSelect(index)
                        }}
                    >
                        {option.choiceText || option.text || index + 1}
                    </Button>
                )
            })}
        </Flex>
    )
}

export default BranchSelector
