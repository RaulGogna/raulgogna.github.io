import { useT } from '../i18n'

export default function Testimonial() {
  const t = useT()

  return (
    <section className="section">
      <div className="container">
        <figure className="testimonial" data-reveal>
          <blockquote className="testimonial__quote">
            {t.testimonial.quote}
          </blockquote>
          <figcaption className="testimonial__cite">
            <span className="testimonial__author">{t.testimonial.author}</span>
            <span className="testimonial__role">{t.testimonial.role}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
