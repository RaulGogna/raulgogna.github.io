import { useRef, useEffect } from 'react'
import { useT } from './i18n'
import { useReducedMotion } from './hooks'
import Header from './components/Header'
import Hero from './components/Hero'
import Work from './components/Work'
import About from './components/About'
import Contact from './components/Contact'
import Scene3D from './components/Scene3D'

export default function App() {
  const t = useT()
  const reducedMotion = useReducedMotion()
  const scrollRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current = max > 0 ? window.scrollY / max : 0
    }
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  // IntersectionObserver for section reveals
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (els.length === 0) return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            obs.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.08 }
    )
    for (const el of els) obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div>
      <div className="scene3d-wrapper" aria-hidden="true">
        <Scene3D
          scrollRef={scrollRef}
          mouseRef={mouseRef}
          reducedMotion={reducedMotion}
        />
      </div>

      <div className="content-wrapper">
        <Header />
        <main>
          <Hero />
          <Work />
          <About />
          <Contact />
        </main>
        <footer className="footer">
          <div className="container">
            <div className="footer__inner">
              <span className="footer__credit">{t.footer.credit}</span>
              <span className="footer__credit">
                <a
                  href="https://github.com/RaulGogna"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/RaulGogna
                </a>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
