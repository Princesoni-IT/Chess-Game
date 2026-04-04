import './AnimatedBackground.css'

const pieces = ['♔', '♕', '♖', '♗', '♘', '♙']

export default function AnimatedBackground() {
  return (
    <div className="animated-bg">
      {pieces.map((piece, i) => (
        <div key={i} className={`floating-piece floating-piece-${i + 1}`}>
          {piece}
        </div>
      ))}
      <div className="glow-orb amber" />
      <div className="glow-orb blue" />
    </div>
  )
}