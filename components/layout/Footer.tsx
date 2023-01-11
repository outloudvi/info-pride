import { useTranslations } from 'next-intl'

import buildConfig from '#data/build.json'

const Footer = () => {
    const $t = useTranslations('common.footer')

    const gitCommit = buildConfig?.rev ?? 'HEAD'
    return (
        <footer className="text-center text-gray-500">
            <a
                href="https://github.com/outloudvi/info-pride"
                target="_blank"
                rel="noopener noreferrer"
            >
                {$t('Source code')}
            </a>{' '}
            @{' '}
            <a
                href={`https://github.com/outloudvi/info-pride/tree/${gitCommit}`}
            >
                {gitCommit.slice(0, 8)}
            </a>
            <br />
            {$t('bwiki.prefix')}
            <a
                href="https://wiki.biligame.com/idolypride/%E9%A6%96%E9%A1%B5"
                target="_blank"
                rel="noopener noreferrer"
            >
                {$t('bwiki.bwikilinktitle')}
            </a>
            {$t('bwiki.middle')}
            <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/deed.zh">
                CC BY-NC-SA 3.0
            </a>
            {$t('bwiki.suffix')}
            <br />
            {$t('copy')}
        </footer>
    )
}

export default Footer
