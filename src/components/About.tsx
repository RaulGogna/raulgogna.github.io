import { useT } from '../i18n'

export default function About() {
  const t = useT()

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section__header" data-reveal>
          <span className="section__label">{t.about.sectionLabel}</span>
          <h2 className="section__title">{t.about.title}</h2>
        </div>

        <div className="about__grid">
          <div className="about__intro" data-reveal data-delay="1">
            <img
              className="about__photo"
              src="raul-gogna.jpg"
              width={132}
              height={132}
              alt="Raúl Gogna"
              loading="lazy"
            />
            <p className="about__bio">{t.about.bio}</p>
          </div>

          <div data-reveal data-delay="2">
            <p className="skills__label">{t.about.skillsLabel}</p>
            <div className="skills__grid">
              {(
                Object.values(t.about.skills) as Array<{
                  label: string
                  items: string
                }>
              ).map((group) => (
                <div key={group.label} className="skill-group">
                  <p className="skill-group__label">{group.label}</p>
                  <p className="skill-group__items">{group.items}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
