import { Colors } from '../data/colors'

const Loading = ({ finished }: { finished: boolean }) => {
  return (
    <div
      id="ip_loading"
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: finished ? 0 : '100vw',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: 'width 0.4s ease-in',
        whiteSpace: 'nowrap',
        flexDirection: 'column',
        fontSize: '3rem',
        letterSpacing: '20px',
      }}
    >
      <div>
        <span style={{ color: Colors.Vocal }}>IN</span>
        <span style={{ color: Colors.Dance }}>FO</span>
      </div>
      <div>
        <span style={{ color: Colors.Visual }}>PRI</span>
        <span style={{ color: Colors.Stamina }}>DE</span>
      </div>
    </div>
  )
}

export default Loading
