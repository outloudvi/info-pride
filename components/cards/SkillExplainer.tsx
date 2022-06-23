import { Button } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import type { SkillLevel } from 'hoshimi-types/ProtoMaster'
import { useCallback, useEffect, useState } from 'react'

import Paths from '#utils/paths'
import type { APIResponseOf } from '#utils/api'

const BTN_STRING = ['分析', '分析中', '分析完成'] as const

const SkillExplainer = ({ level }: { level: SkillLevel }) => {
  const [translation, setTranslation] = useState('')
  const [stage, setStage] = useState(0)

  useEffect(() => {
    setStage(0)
  }, [level])

  const analyze = useCallback(async () => {
    setStage(1)
    const effIds = level.skillDetails.map((x) => x.efficacyId)
    const effects: APIResponseOf<'Skill/X'> = await fetch(
      Paths.api('Skill/X') + `?ids=${effIds.join(',')}`
    ).then((x) => x.json())
    const trn = await fetch('/api/effToStr', {
      method: 'POST',
      body: JSON.stringify(
        Object.values(effects).map((x, index) => ({
          ...x,
          trigger: level.skillDetails[index].triggerId ?? level.triggerId,
        }))
      ),
    })
      .then((x) => x.json())
      .catch((e) => {
        setTranslation('[分析错误]')

        showNotification({
          title: '分析过程中出错',
          message: String(e),
          color: 'red',
        })
      })
      .finally(() => {
        setStage(2)
      })
    if (trn) {
      setTranslation(trn.join('\n'))
    }
  }, [level])

  return (
    <div>
      <Button
        className="my-1"
        onClick={analyze}
        color={stage === 2 ? 'green' : 'blue'}
      >
        {BTN_STRING[stage]}
      </Button>
      {translation && (
        <>
          <div
            className="text-gray-800 dark:text-gray-200 p-2 border border-solid rounded-md"
            dangerouslySetInnerHTML={{
              __html: translation.replace(/\n/g, '<br/>'),
            }}
          ></div>
        </>
      )}
    </div>
  )
}

export default SkillExplainer
