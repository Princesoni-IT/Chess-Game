import { useState, useEffect } from 'react'
import './Header.css'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Play',     href: '#play' },
  { label: 'Learn',    href: '#learn' },
  { label: 'Community', href: '#community' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
          <a href="#" className="logo">
            <div className="logo-icon">♔</div>
            <span className="logo-text">Chess Master</span>
          </a>

          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            {navLinks.map(link => (
              <a key={link.label} href={link.href} onClick={e => handleNavClick(e, link.href)}>
                {link.label}
              </a>
            ))}
          </nav>

          <a href="#" className="btn btn-primary">Sign In</a>

          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  )
}