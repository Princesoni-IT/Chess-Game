import './CTA.css'

export default function CTA({ onPlayNow }) {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-container fade-in">
          <h2 className="cta-title">Ready to Become a Chess Master?</h2>
          <p className="cta-description">
            Join millions of players and start your journey today. It's completely free to get started!
          </p>
          <div className="cta-buttons">
            <button
              className="btn btn-primary btn-large"
              onClick={onPlayNow}
            >
              Start Playing Free
            </button>
            <a href="#features" className="btn btn-secondary btn-large">
              Explore Features
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}