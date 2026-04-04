import './Features.css'

const features = [
  { icon: '📚', title: 'Interactive Lessons', desc: 'Learn from beginner to advanced with our comprehensive, structured curriculum designed by grandmasters.' },
  { icon: '🧩', title: 'Daily Puzzles',       desc: 'Sharpen your tactical skills with thousands of puzzles tailored to your skill level.' },
  { icon: '🏆', title: 'Live Tournaments',    desc: 'Compete against players worldwide in daily tournaments with real prizes and rankings.' },
  { icon: '📊', title: 'Game Analysis',       desc: 'AI-powered analysis reviews your games and identifies areas for improvement.' },
  { icon: '👥', title: 'Play Friends',        desc: 'Challenge your friends or make new ones in our vibrant global chess community.' },
  { icon: '📱', title: 'Play Anywhere',       desc: 'Seamless experience across all devices. Start a game on desktop, continue on mobile.' },
]

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-header fade-in">
          <span className="section-tag">Features</span>
          <h2 className="section-title">Why Choose Chess Master?</h2>
          <p className="section-description">
            Everything you need to become a chess grandmaster, all in one platform.
          </p>
        </div>
        <div className="features-grid">
          {features.map(f => (
            <div key={f.title} className="feature-card fade-in">
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-description">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}