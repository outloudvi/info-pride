import { getTranslations } from 'next-intl/server'

import styles from '../../../styles/colors.module.css'

import { toHashColor } from '#utils/toHashColor'
import type { CharacterId } from '#data/vendor/characterId'
import { fetchApi } from '#utils/fetchApi'

const ColorOrder: CharacterId[][] = [
    ['char-mna'],
    ['char-ktn', 'char-skr', 'char-rei', 'char-ngs', 'char-hrk'],
    ['char-ski', 'char-chs', 'char-suz', 'char-mei', 'char-szk'],
    ['char-rui', 'char-yu', 'char-smr'],
    ['char-rio', 'char-aoi', 'char-ai', 'char-kkr'],
    ['char-kor', 'char-kan', 'char-mhk'],
    ['char-mku'],
]

const ColorBlock = ({ name, color }: { name: string; color: string }) => (
    <div className="mr-3">
        <div
            className={styles.block}
            style={{
                backgroundColor: color,
                height: 'min(16vw,140px)',
                width: 'min(16vw,140px)',
                border: 'min(1.5vw,11px) solid #eaece7',
                borderRadius: 'min(1vw,9px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <span>{color}</span>
        </div>
        <div className="text-sm text-gray-500 mt-1">{name}</div>
    </div>
)

const ColorsPage = async () => {
    const CharacterList = await fetchApi('Character/List')
    const $t = await getTranslations('colors')
    const $vc = await getTranslations('v-chr')

    return (
        <>
            <h2>{$t('Colors')}</h2>
            <p>
                {$t.rich('colors_header', {
                    a: (c) => (
                        <a href="https://twitter.com/idolypride/status/1332167024433192961">
                            {c}
                        </a>
                    ),
                })}
            </p>
            <div className="flex flex-col">
                {ColorOrder.map((row, _i) => (
                    <div key={_i} className="flex flex-row my-2">
                        {row.map((one, _j) => (
                            <ColorBlock
                                key={_j}
                                name={$vc(one)}
                                color={toHashColor(
                                    CharacterList.find((x) => x.id === one)
                                        ?.color ?? 'transparent',
                                )}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string }
}) {
    const $t = await getTranslations({ locale, namespace: 'colors' })
    return {
        title: $t('Colors'),
    }
}

export default ColorsPage
