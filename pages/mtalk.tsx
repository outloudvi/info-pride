import { useTranslations } from 'next-intl'
import { Badge, Group } from '@mantine/core'

import getI18nProps from '#utils/getI18nProps'
import EditorView from '#components/mtalk/EditorView'
import Title from '#components/Title'

const MTalkPage = () => {
    const $t = useTranslations('mtalk')
    return (
        <>
            <Group>
                <Title title={$t('Macaron Talk')} />
                <Badge>beta</Badge>
            </Group>
            <p>
                {$t.rich('mtalk_description', {
                    a: (children) => (
                        <a
                            href="https://www.yuzutalk.net/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {children}
                        </a>
                    ),
                })}
            </p>
            <EditorView />
        </>
    )
}

export const getStaticProps = getI18nProps(['mtalk', 'messages', 'v-chr'])

export default MTalkPage
