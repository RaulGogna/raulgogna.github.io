import { useT } from '../i18n'

export default function Hero() {
  const t = useT()

  return (
    <section className="hero">
      <div className="container">
        <div className="hero__inner">
          <span className="hero__eyebrow">{t.hero.eyebrow}</span>
          <h1 className="hero__name">
            Raúl <em>Gogna</em>
          </h1>
          <p className="hero__role">{t.hero.role}</p>
          <p className="hero__tagline">{t.hero.tagline}</p>
          <p className="hero__availability">{t.hero.availability}</p>
          <div className="hero__ctas">
            <a href="#work" className="btn btn--primary">
              {t.hero.ctaWork}
            </a>
            <a href="#contact" className="btn btn--outline">
              {t.hero.ctaContact}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
