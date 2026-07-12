import { useState, useEffect } from 'react'
import { useT, useLang } from '../i18n'

export default function Header() {
  const t = useT()
  const [lang, setLang] = useLang()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <div className="header__inner">
          <a href="#" className="header__name">
            Raúl Gogna
          </a>

          <div className="header__right">
            <nav className="header__nav" aria-label="Main navigation">
              <a href="#work">{t.nav.work}</a>
              <a href="#about">{t.nav.about}</a>
              <a href="#contact">{t.nav.contact}</a>
            </nav>

            <div
              className="lang-toggle"
              role="group"
              aria-label={t.toggle.label}
            >
              <button
                className="lang-btn"
                aria-pressed={lang === 'en'}
                onClick={() => setLang('en')}
              >
                EN
              </button>
              <button
                className="lang-btn"
                aria-pressed={lang === 'es'}
                onClick={() => setLang('es')}
              >
                ES
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
