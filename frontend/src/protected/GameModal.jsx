import './GameModal.css'

export default function GameModal({ onClose, onSelect }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-header">
          <div className="modal-icon">♔</div>
          <h2>Choose Game Mode</h2>
          <p>Select how you want to play</p>
        </div>

        <div className="modal-options">
          <button className="mode-card" onClick={() => onSelect('computer')}>
            <div className="mode-icon">🤖</div>
            <h3>Play with Computer</h3>
            <p>Challenge our AI — test your skills solo</p>
            <span className="mode-badge">vs AI</span>
          </button>

          <button className="mode-card" onClick={() => onSelect('friend')}>
            <div className="mode-icon">👥</div>
            <h3>Play with Friend</h3>
            <p>Same device — take turns with a friend</p>
            <span className="mode-badge">Local</span>
          </button>

          <button className="mode-card coming-soon" disabled>
            <div className="coming-soon-tag">🚀 Coming Soon</div>
            <div className="mode-icon">🌐</div>
            <h3>Play Online</h3>
            <p>Challenge friends online with a 6-digit room code</p>
            <span className="mode-badge online-badge">Online</span>
          </button>
        </div>
      </div>
    </div>
  )
}