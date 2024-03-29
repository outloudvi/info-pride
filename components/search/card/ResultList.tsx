import { useEffect, useState } from 'react'
import { Pagination } from '@mantine/core'

import CardWithSkills from './CardWithSkills'

import type { APIResponseOf } from '#utils/api'
import getItemAriaLabelProps from '#utils/getItemAriaLabelProps'

const PER_PAGE = 10

const ResultList = ({
    list,
    highlightedSkills,
    SkillAllData,
}: {
    list: APIResponseOf<'Card'>
    highlightedSkills: string[]
    SkillAllData: APIResponseOf<'Skill/All'>
}) => {
    const [activePage, setPage] = useState(1)

    useEffect(() => {
        setPage(1)
    }, [list])

    return (
        <>
            <Pagination
                className="justify-center mb-2"
                value={activePage}
                onChange={setPage}
                total={Math.ceil(list.length / PER_PAGE)}
                getItemProps={getItemAriaLabelProps}
            />
            {list
                .slice((activePage - 1) * PER_PAGE, activePage * PER_PAGE)
                .map((item, key) => (
                    <CardWithSkills
                        key={key}
                        card={item}
                        highlightedSkills={highlightedSkills}
                        skillData={[
                            item.skillId1,
                            item.skillId2,
                            item.skillId3,
                        ].map(
                            (x) => SkillAllData.filter((r) => r.id === x)?.[0]
                        )}
                    />
                ))}
            <Pagination
                className="justify-center mt-2"
                value={activePage}
                onChange={setPage}
                total={Math.ceil(list.length / PER_PAGE)}
                getItemProps={getItemAriaLabelProps}
            />
        </>
    )
}

export default ResultList
