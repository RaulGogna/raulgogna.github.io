import { useT, type ProjectStatus } from '../i18n'

function StatusBadge({
  status,
  labels,
}: {
  status: ProjectStatus
  labels: { production: string; active: string }
}) {
  return (
    <span className={`badge badge--${status}`}>{labels[status]}</span>
  )
}

export default function Work() {
  const t = useT()

  return (
    <section id="work" className="section">
      <div className="container">
        <div className="section__header" data-reveal>
          <span className="section__label">{t.work.sectionLabel}</span>
          <h2 className="section__title">{t.work.title}</h2>
        </div>

        <div className="work__list">
          {t.work.projects.map((project, i) => (
            <article
              key={project.title}
              className="work__card"
              data-reveal
              data-delay={String(i % 3 + 1)}
            >
              <div className="work__card-meta">
                <span className="work__card-num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="work__card-year">{project.year}</span>
                <StatusBadge
                  status={project.status}
                  labels={t.work.status}
                />
              </div>

              <h3 className="work__card-title">{project.title}</h3>
              <p className="work__card-desc">{project.description}</p>

              <div className="work__card-tech">
                {project.tech.map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>

              {project.link != null && project.linkLabel != null && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work__card-link"
                >
                  {project.linkLabel}
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
