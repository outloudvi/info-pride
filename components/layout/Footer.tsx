import { useTranslations } from 'next-intl'

const Footer = () => {
    const $t = useTranslations('common.footer')
    return (
        <footer className="text-center text-gray-500">
            <a
                href="https://github.com/outloudvi/info-pride"
                target="_blank"
                rel="noopener noreferrer"
            >
                {$t('Source code')}
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
            {$t('Game data © QualiArts and associates')}
        </footer>
    )
}

export default Footer
