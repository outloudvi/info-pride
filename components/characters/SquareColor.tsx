import { toHashColor } from '#utils/toHashColor'

const SquareColor = ({ color }: { color: string }) => (
    <div
        style={{
            height: '14px',
            width: '14px',
            border: '1px solid #7f7f7f',
            borderRadius: '3px',
            display: 'inline-block',
            backgroundColor: toHashColor(color),
        }}
    ></div>
)

export default SquareColor
