import './Testimonials.css'

const testimonials = [
  {
    initials: 'MK',
    name: 'Magnus K.',
    rating: 'Rating: 2100',
    text: 'Chess Master transformed my game completely. The lessons are incredibly well-structured and the puzzles keep me sharp every day!',
  },
  {
    initials: 'SA',
    name: 'Sarah A.',
    rating: 'Rating: 1500',
    text: "The best chess platform I've ever used. The community is amazing and I've improved from 800 to 1500 rating in just 6 months!",
  },
  {
    initials: 'JC',
    name: 'James C.',
    rating: 'Rating: 1850',
    text: "The AI analysis feature is incredible. It's like having a personal grandmaster coach available 24/7. Highly recommended!",
  },
]

export default function Testimonials() {
  return (
    <section className="testimonials" id="community">
      <div className="container">
        <div className="section-header fade-in">
          <span className="section-tag">Testimonials</span>
          <h2 className="section-title">Loved by Players Worldwide</h2>
          <p className="section-description">
            See what our community has to say about their experience.
          </p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map(t => (
            <div key={t.name} className="testimonial-card fade-in">
              <div className="testimonial-rating">★★★★★</div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.initials}</div>
                <div className="author-info">
                  <h4>{t.name}</h4>
                  <p>{t.rating}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}