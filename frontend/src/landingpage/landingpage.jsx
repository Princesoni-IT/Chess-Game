/**
 * ============================================
 * CHESS MASTER LANDING PAGE
 * Complete Landing Page Component Bundle
 * ============================================
 * This file contains all landing page components combined into a single file
 * with proper documentation and comments.
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import './landingpage.css'

// ============================================
// 1. ANIMATED BACKGROUND COMPONENT
// ============================================
/**
 * AnimatedBackground
 * Displays floating chess pieces and glowing orbs as a fixed background
 * Uses animations for floating effects and pulsing glow
 */
function AnimatedBackground() {
  const pieces = ['♔', '♕', '♖', '♗', '♘', '♙']

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

// ============================================
// 2. HEADER COMPONENT
// ============================================
/**
 * Header
 * Fixed navigation header with logo, nav links, and sign in button
 * Features responsive mobile menu and scroll effects
 */
function Header({ onSignInClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Navigation links configuration
  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Play', href: '#play' },
    { label: 'Learn', href: '#learn' },
    { label: 'Community', href: '#community' },
  ]

  // Update header appearance on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Handle smooth scroll to sections
  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <a href="#" className="logo">
            <div className="logo-icon">♔</div>
            <span className="logo-text">Chess Master</span>
          </a>

          {/* Navigation Links */}
          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            {navLinks.map(link => (
              <a key={link.label} href={link.href} onClick={e => handleNavClick(e, link.href)}>
                {link.label}
              </a>
            ))}
          </nav>

          {/* Sign In Button */}
          <button onClick={onSignInClick} className="btn btn-primary">
            Sign In
          </button>

          {/* Mobile Menu Toggle */}
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  )
}

// ============================================
// 3. CHESS BOARD COMPONENT
// ============================================
/**
 * ChessBoard
 * Interactive chess board display with piece selection
 * Shows initial chess position with animated pieces
 */
function ChessBoard() {
  const [selected, setSelected] = useState(null)

  // Standard chess starting position
  const initialPosition = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
  ]

  // Black pieces set for styling
  const blackPieces = ['♜', '♞', '♝', '♛', '♚', '♟']

  return (
    <div className="board-wrapper">
      <div className="board-glow" />
      <div className="board-container">
        <div className="chess-board">
          {initialPosition.map((row, r) =>
            row.map((piece, c) => {
              const isLight = (r + c) % 2 === 0
              const isSelected = selected?.r === r && selected?.c === c
              return (
                <div
                  key={`${r}-${c}`}
                  className={`square ${isLight ? 'light' : 'dark'} ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelected(isSelected ? null : { r, c })}
                >
                  {piece && (
                    <span
                      className={`piece ${blackPieces.includes(piece) ? 'black' : 'white'} chess-move`}
                      style={{ animationDelay: `${(r + c) * 0.1}s` }}
                    >
                      {piece}
                    </span>
                  )}
                </div>
              )
            })
          )}
        </div>
        {/* Floating badges on board corners */}
        <div className="floating-badge top-right">♟ Our Chess Board</div>
        <div className="floating-badge bottom-left">🏆 Play &amp; Win</div>
      </div>
    </div>
  )
}

// ============================================
// 4. HERO SECTION COMPONENT
// ============================================
/**
 * Hero
 * Main hero section with title, description, and call-to-action buttons
 * Includes interactive chess board and statistics display
 */
function Hero({ onPlayNow }) {
  // Hero statistics
  const stats = [
    { value: '10M+', label: 'Active Players' },
    { value: '500K+', label: 'Daily Games' },
    { value: '150+', label: 'Countries' },
  ]

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          {/* Hero Text Section */}
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

            {/* Call-to-Action Buttons */}
            <div className="hero-buttons">
              <button className="btn btn-primary btn-large" onClick={onPlayNow}>
                Play Now — It's Free
              </button>
              <a href="#features" className="btn btn-secondary btn-large">
                Explore Features
              </a>
            </div>

            {/* Hero Statistics */}
            <div className="hero-stats">
              {stats.map(s => (
                <div key={s.label} className="hero-stat">
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual - Chess Board */}
          <div className="hero-visual">
            <ChessBoard />
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// 5. FEATURES SECTION COMPONENT
// ============================================
/**
 * Features
 * Displays platform features in a 3-column grid with icons and descriptions
 * Features hover animations and responsive design
 */
function Features() {
  // Features data with icons and descriptions
  const features = [
    {
      icon: '📚',
      title: 'Interactive Lessons',
      desc: 'Learn from beginner to advanced with our comprehensive, structured curriculum designed by grandmasters.',
    },
    {
      icon: '🧩',
      title: 'Daily Puzzles',
      desc: 'Sharpen your tactical skills with thousands of puzzles tailored to your skill level.',
    },
    {
      icon: '🏆',
      title: 'Live Tournaments',
      desc: 'Compete against players worldwide in daily tournaments with real prizes and rankings.',
    },
    {
      icon: '📊',
      title: 'Game Analysis',
      desc: 'AI-powered analysis reviews your games and identifies areas for improvement.',
    },
    {
      icon: '👥',
      title: 'Play Friends',
      desc: 'Challenge your friends or make new ones in our vibrant global chess community.',
    },
    {
      icon: '📱',
      title: 'Play Anywhere',
      desc: 'Seamless experience across all devices. Start a game on desktop, continue on mobile.',
    },
  ]

  return (
    <section className="features" id="features">
      <div className="container">
        {/* Section Header */}
        <div className="section-header fade-in">
          <span className="section-tag">Features</span>
          <h2 className="section-title">Why Choose Chess Master?</h2>
          <p className="section-description">
            Everything you need to become a chess grandmaster, all in one platform.
          </p>
        </div>

        {/* Features Grid */}
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

// ============================================
// 6. STATS SECTION COMPONENT
// ============================================
/**
 * StatsSection
 * Displays animated counter statistics with Intersection Observer
 * Counts up to target numbers when section becomes visible
 */
function useCountUp(target, duration = 1500, started = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, started])
  return count
}

function StatItem({ number, suffix, label, started }) {
  const count = useCountUp(number, 1500, started)
  return (
    <div className="stat-item">
      <div className="stat-number">
        {count}
        {suffix}
      </div>
      <div className="stat-text">{label}</div>
    </div>
  )
}

function StatsSection() {
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  // Statistics data
  const statsData = [
    { number: 10, suffix: 'M+', label: 'Active Players' },
    { number: 50, suffix: 'M+', label: 'Games Played' },
    { number: 1000, suffix: '+', label: 'Lessons' },
    { number: 150, suffix: '+', label: 'Countries' },
  ]

  // Observe when section comes into view to start animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="stats-section" ref={ref}>
      <div className="container">
        <div className="stats-container">
          {statsData.map(s => (
            <StatItem key={s.label} {...s} started={started} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// 7. TESTIMONIALS SECTION COMPONENT
// ============================================
/**
 * Testimonials
 * Displays user testimonials in a grid with user avatars and ratings
 * Shows real player feedback and success stories
 */
function Testimonials() {
  // Testimonials data with user info and feedback
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

  return (
    <section className="testimonials" id="community">
      <div className="container">
        {/* Section Header */}
        <div className="section-header fade-in">
          <span className="section-tag">Testimonials</span>
          <h2 className="section-title">Loved by Players Worldwide</h2>
          <p className="section-description">
            See what our community has to say about their experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {testimonials.map(t => (
            <div key={t.name} className="testimonial-card fade-in">
              {/* Star Rating */}
              <div className="testimonial-rating">★★★★★</div>

              {/* Testimonial Text */}
              <p className="testimonial-text">"{t.text}"</p>

              {/* Author Information */}
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

// ============================================
// 8. CTA SECTION COMPONENT
// ============================================
/**
 * CTA (Call-To-Action)
 * Secondary call-to-action section encouraging users to start playing
 * Features attractive design with gradient background
 */
function CTA({ onPlayNow }) {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-container fade-in">
          <h2 className="cta-title">Ready to Become a Chess Master?</h2>
          <p className="cta-description">
            Join millions of players and start your journey today. It's completely free to get started!
          </p>

          {/* CTA Buttons */}
          <div className="cta-buttons">
            <button className="btn btn-primary btn-large" onClick={onPlayNow}>
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

// ============================================
// 9. FOOTER COMPONENT
// ============================================
/**
 * Footer
 * Site footer with branding, links, and social media
 * Organized in columns with responsive grid layout
 */
function Footer() {
  // Footer link categories
  const productLinks = ['Play Online', 'Lessons', 'Puzzles', 'Tournaments']
  const companyLinks = ['About Us', 'Careers', 'Blog', 'Contact']
  const supportLinks = ['Help Center', 'Community', 'Privacy Policy', 'Terms of Service']
  const socialIcons = ['𝕏', '📘', '📸', '▶️']

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Footer Main Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <a href="#" className="logo">
              <div className="logo-icon">♔</div>
              <span className="logo-text">Chess Master</span>
            </a>
            <p>
              The world's leading chess platform. Learn, play, and compete with millions of players
              worldwide.
            </p>

            {/* Social Media Links */}
            <div className="social-links">
              {socialIcons.map((icon, i) => (
                <a key={i} href="#" className="social-link">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div className="footer-links">
            <h4>Product</h4>
            <ul>
              {productLinks.map(link => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              {companyLinks.map(link => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="footer-links">
            <h4>Support</h4>
            <ul>
              {supportLinks.map(link => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Chess Master. All rights reserved.</p>
          <p>Made with ♔ for chess lovers worldwide</p>
        </div>
      </div>
    </footer>
  )
}

// ============================================
// 10. MAIN LANDING PAGE EXPORT
// ============================================
/**
 * LandingPage
 * Main landing page component that combines all sections
 * Accepts callbacks for user interactions (play, sign in)
 */
export default function LandingPage({ onPlayNow, onSignInClick }) {
  return (
    <>
      {/* Background Animation */}
      <AnimatedBackground />

      {/* Header Navigation */}
      <Header onSignInClick={onSignInClick} />

      {/* Main Content */}
      <main>
        <Hero onPlayNow={onPlayNow} />
        <Features />
        <StatsSection />
        <Testimonials />
        <CTA onPlayNow={onPlayNow} />
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}

// ============================================
// NAMED EXPORTS - Individual Components
// ============================================
// These allow importing individual components if needed
export {
  AnimatedBackground,
  Header,
  ChessBoard,
  Hero,
  Features,
  StatsSection,
  Testimonials,
  CTA,
  Footer,
}
