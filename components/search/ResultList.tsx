import { useState } from 'react'
import { Pagination } from '@mantine/core'

import CardWithSkills from './CardWithSkills'

import { APIResponseOf } from '#utils/api'

const PER_PAGE = 10

const ResultList = ({
    list,
    highlightedSkills,
    SkillAllData,
    SkillxData,
}: {
    list: APIResponseOf<'Card'>
    highlightedSkills: string[]
    SkillAllData: APIResponseOf<'Skill/All'>
    SkillxData: APIResponseOf<'Skill/X'>
}) => {
    const [activePage, setPage] = useState(1)

    return (
        <>
            <Pagination
                className="justify-center mb-2"
                page={activePage}
                onChange={setPage}
                total={Math.ceil(list.length / PER_PAGE)}
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
                        skillxData={SkillxData}
                    />
                ))}
            <Pagination
                className="justify-center mt-2"
                page={activePage}
                onChange={setPage}
                total={Math.ceil(list.length / PER_PAGE)}
            />
        </>
    )
}

export default ResultList
