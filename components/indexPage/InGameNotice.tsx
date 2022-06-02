import { Anchor, Modal } from '@mantine/core'
import { useState } from 'react'
import dayjs from 'dayjs'
import { APIMapping } from 'hoshimi-types'

import useApi from '#utils/useApi'
import { APIResponseOf } from '#utils/api'

type NoticeType = Parameters<APIMapping['Notice']>[number]['type']

const InGameNotice = ({ type }: { type: NoticeType }) => {
  const [limit, setLimit] = useState(5)
  const { data: news } = useApi('Notice', {
    limit: String(limit),
    type,
  })
  const [modalOpened, setModalOpened] = useState(false)
  const [modalNews, setModalNews] = useState<
    APIResponseOf<'Notice'>[number] | null
  >(null)

  return news && news.length > 0 ? (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={modalNews?.listTitle}
        size="xl"
      >
        <iframe
          className="text-center h-[75vh] w-full"
          src={modalNews?.linkDetail}
        ></iframe>
        <div className="text-center">
          发布时间：{' '}
          {modalNews &&
            dayjs(new Date(Number(modalNews.startTime))).format('YYYY-MM-DD')}
        </div>
      </Modal>
      <ul>
        {news.map((item, key) => {
          const { listTitle } = item
          return (
            <li key={key}>
              <Anchor
                onClick={() => {
                  setModalNews(item)
                  setModalOpened(true)
                }}
              >
                {listTitle}
              </Anchor>
            </li>
          )
        })}
      </ul>
      {news.length === limit && (
        <Anchor
          onClick={() => {
            setLimit((x) => x + 5)
          }}
        >
          更多...
        </Anchor>
      )}
    </>
  ) : (
    <p className="text-gray-500">新闻加载中。</p>
  )
}

export default InGameNotice
