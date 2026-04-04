import ChessBoard from './ChessBoard'
import './Hero.css'

const stats = [
  { value: '10M+', label: 'Active Players' },
  { value: '500K+', label: 'Daily Games' },
  { value: '150+', label: 'Countries' },
]

export default function Hero({ onPlayNow }) {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">World's #1 Chess Platform</div>
            <h1 className="hero-title">
              Master the Game of<br />
              <span>Kings &amp; Queens</span>
            </h1>
            <p className="hero-description">
              Join millions of players worldwide. Improve your skills with interactive lessons,
              challenging puzzles, and compete in live tournaments against players of all levels.
            </p>
            <div className="hero-buttons">
              <button
                className="btn btn-primary btn-large"
                onClick={onPlayNow}
              >
                Play Now — It's Free
              </button>
              <a href="#features" className="btn btn-secondary btn-large">
                Explore Features
              </a>
            </div>
            <div className="hero-stats">
              {stats.map(s => (
                <div key={s.label} className="hero-stat">
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <ChessBoard />
          </div>
        </div>
      </div>
    </section>
  )
}