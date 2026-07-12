import { useT } from '../i18n'

export default function Contact() {
  const t = useT()

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact__inner" data-reveal>
          <span className="section__label">{t.contact.sectionLabel}</span>
          <h2 className="contact__title">{t.contact.title}</h2>
          <p className="contact__lead">{t.contact.lead}</p>

          <div className="contact__links">
            <a
              href="mailto:rkgogna27@gmail.com"
              className="contact__link contact__link--email"
            >
              {t.contact.emailCta}
            </a>
            <a
              href="https://github.com/RaulGogna"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__link"
            >
              {t.contact.githubLabel}
            </a>
            <a
              href="https://linkedin.com/in/raul-gogna"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__link"
            >
              {t.contact.linkedinLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
