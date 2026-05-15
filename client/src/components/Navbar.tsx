import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Acasă', href: '#acasa' },
  { label: 'Servicii', href: '#servicii' },
  { label: 'Despre noi', href: '#despre' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Locație', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang] = useState<'ro' | 'ru'>('ro')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-logo">
        <span className="logo-icon">🔊</span>
        <span>Car Audio Service</span>
      </div>

      <div className={`nav-links${menuOpen ? ' open' : ''}`}>
        {navLinks.map(link => (
          <a key={link.href} href={link.href} onClick={e => handleNav(e, link.href)}>
            {link.label}
          </a>
        ))}
        <div className="lang-toggle">
          <button
            className={lang === 'ro' ? 'active' : ''}
            onClick={() => setLang('ro')}
          >RO</button>
          <button
            className={lang === 'ru' ? 'active' : ''}
            onClick={() => setLang('ru')}
          >RU</button>
        </div>
      </div>

      <button className="burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  )
}
