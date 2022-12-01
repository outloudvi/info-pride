import renderStaticMessage from './renderStaticMessage'
import StaticMessageItem from './StaticMessageItem'

import type { CommuLine } from '#components/mtalk/types'

const MTalkExport = ({ lines }: { lines: CommuLine[] }) => (
    <div
        style={{
            backgroundColor: '#4c4c4c',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'NotoSansSc, NotoSansJp, NotoSansTc',
            width: '100%',
            paddingTop: '25px',
            paddingBottom: '25px',
        }}
    >
        {lines.map((line, key) => (
            <StaticMessageItem
                key={key}
                characterId={line.characterId}
                user={line.characterId ? 'others' : 'self'}
                isTransparent={Boolean(line.stampAssetId)}
            >
                {renderStaticMessage(line)}
            </StaticMessageItem>
        ))}
    </div>
)

export default MTalkExport
