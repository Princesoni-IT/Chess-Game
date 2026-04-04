import './Footer.css'

const productLinks = ['Play Online', 'Lessons', 'Puzzles', 'Tournaments']
const companyLinks = ['About Us', 'Careers', 'Blog', 'Contact']
const supportLinks = ['Help Center', 'Community', 'Privacy Policy', 'Terms of Service']
const socialIcons = ['𝕏', '📘', '📸', '▶️']

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="#" className="logo">
              <div className="logo-icon">♔</div>
              <span className="logo-text">Chess Master</span>
            </a>
            <p>The world's leading chess platform. Learn, play, and compete with millions of players worldwide.</p>
            <div className="social-links">
              {socialIcons.map((icon, i) => (
                <a key={i} href="#" className="social-link">{icon}</a>
              ))}
            </div>
          </div>

          <div className="footer-links">
            <h4>Product</h4>
            <ul>
              {productLinks.map(link => (
                <li key={link}><a href="#">{link}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              {companyLinks.map(link => (
                <li key={link}><a href="#">{link}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-links">
            <h4>Support</h4>
            <ul>
              {supportLinks.map(link => (
                <li key={link}><a href="#">{link}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Chess Master. All rights reserved.</p>
          <p>Made with ♔ for chess lovers worldwide</p>
        </div>
      </div>
    </footer>
  )
}