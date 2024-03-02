'use client'

import { useCallback, useEffect, useState } from 'react'
import { Loader, SimpleGrid } from '@mantine/core'
import { useInViewport } from '@mantine/hooks'

import CardCard from './CardCard'
import fetchCards from './fetchCards.server'
import { PAGINATION_DEFAULT, type SearchOptions } from './sp'

import type { APIResponseOf } from '#utils/api'

const CardsList = ({
    initialCards,
    searchOptions,
}: {
    initialCards: APIResponseOf<'Card/List'>
    searchOptions: SearchOptions
}) => {
    const [cards, setCards] = useState([...initialCards])
    const { ref, inViewport } = useInViewport()
    const [isFinished, setIsFinished] = useState(
        initialCards.length < PAGINATION_DEFAULT,
    )

    const fetchMoreCards = useCallback(
        async (signal: AbortController) => {
            const newCards = await fetchCards({
                ...searchOptions,
                skip: cards.length,
                limit: PAGINATION_DEFAULT,
            })
            if (signal.signal.aborted) return
            if (newCards.length < PAGINATION_DEFAULT) {
                if (!signal.signal.aborted) {
                    setIsFinished(true)
                }
            }
            setCards((x) => [...x, ...newCards])
        },
        [searchOptions, cards.length],
    )

    useEffect(() => {
        const signal = new AbortController()
        if (inViewport) {
            fetchMoreCards(signal)
        }
        return () => {
            signal.abort()
        }
    }, [inViewport, fetchMoreCards])

    return (
        <>
            <SimpleGrid
                key={Math.random()}
                className="max-w-7xl mx-auto"
                spacing="lg"
                cols={{
                    base: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                }}
                verticalSpacing={{
                    base: 'sm',
                    md: 'md',
                    lg: 'lg',
                }}
            >
                {cards.map((item, key) => (
                    <CardCard key={key} card={item} />
                ))}
            </SimpleGrid>
            {!isFinished && (
                <div ref={ref} className="flex justify-center">
                    <Loader color="blue" type="dots" />
                </div>
            )}
        </>
    )
}

export default CardsList
