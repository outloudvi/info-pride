'use client'

import { useTranslations } from 'next-intl'

import EditorView from '#components/mtalk/EditorView'
import Title from '#components/Title'

const MTalkPage = () => {
    const $t = useTranslations('mtalk')
    return (
        <>
            <Title title={$t('MacaronTalk')} />
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

export default MTalkPage
