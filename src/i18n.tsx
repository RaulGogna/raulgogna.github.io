import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'

export type Lang = 'en' | 'es'
export type ProjectStatus = 'production' | 'active'

export type Project = {
  title: string
  year: string
  status: ProjectStatus
  description: string
  tech: string[]
  link: string | null
  linkLabel: string | null
}

type SkillGroup = { label: string; items: string }

type Dict = {
  nav: { work: string; about: string; contact: string }
  hero: {
    eyebrow: string
    name: string
    role: string
    tagline: string
    availability: string
    ctaWork: string
    ctaContact: string
  }
  work: {
    sectionLabel: string
    title: string
    status: { production: string; active: string }
    projects: Project[]
  }
  about: {
    sectionLabel: string
    title: string
    bio: string
    skillsLabel: string
    skills: { backend: SkillGroup; ai: SkillGroup; cloud: SkillGroup }
  }
  contact: {
    sectionLabel: string
    title: string
    lead: string
    emailCta: string
    githubLabel: string
    linkedinLabel: string
  }
  footer: { credit: string }
  toggle: { label: string }
}

const en: Dict = {
  nav: { work: 'Work', about: 'About', contact: 'Contact' },
  hero: {
    eyebrow: 'Backend Engineer',
    name: 'Raúl Gogna',
    role: 'Java / .NET · Production LLM Integrations',
    tagline:
      "I build production backends that don't break — and ship LLM features that stay on budget.",
    availability:
      'Open to part-time engagements (~20h/week) · Remote · CET · Full EU + US-morning overlap',
    ctaWork: 'View work',
    ctaContact: 'Contact',
  },
  work: {
    sectionLabel: '01 — Work',
    title: 'Selected Work',
    status: { production: 'In production', active: 'Active development' },
    projects: [
      {
        title: 'AI Chat Assistant',
        year: '2026',
        status: 'production',
        description:
          'A clinic needed 24/7 patient answers without an unpredictable API bill. Shipped a customer-facing assistant with a hard monthly cost cap, rate limiting and analytics — always on, costs predictable.',
        tech: ['Cloudflare Workers', 'Anthropic Claude API', 'Shadow DOM'],
        link: 'https://anylopez.com',
        linkLabel: 'anylopez.com',
      },
      {
        title: 'gastos-app',
        year: '2026',
        status: 'active',
        description:
          'Replacing spreadsheets with software you can trust: finance PWA with clean 3-layer architecture (domain → application → infrastructure), Postgres row-level security, OTP auth and 160 unit tests.',
        tech: ['SvelteKit', 'Supabase', 'Cloudflare Workers', 'PostgreSQL'],
        link: 'https://github.com/RaulGogna/gastos-app',
        linkLabel: 'github.com/RaulGogna/gastos-app',
      },
      {
        title: 'Booking Engine',
        year: '2026',
        status: 'production',
        description:
          'A third-party scheduler was costing conversions. Built a serverless booking flow to replace it, instrumented for A/B measurement — low maintenance, no vendor fees.',
        tech: ['Cloudflare Workers', 'Serverless', 'A/B Testing'],
        link: null,
        linkLabel: null,
      },
      {
        title: 'anylopez.com Rebuild',
        year: '2025–2026',
        status: 'production',
        description:
          'A slow WordPress site was hurting rankings. Full rebuild: 1,198 ms of layout blocking eliminated, structured data, ES/EN i18n and a domain migration with zero SEO loss.',
        tech: ['Eleventy', 'ES/EN i18n', 'Core Web Vitals', 'Structured Data'],
        link: 'https://anylopez.com',
        linkLabel: 'anylopez.com',
      },
    ],
  },
  about: {
    sectionLabel: '02 — About',
    title: 'About me',
    bio: 'Backend engineer with 4+ years in banking (DXC Technology). I build distributed systems in Java and .NET — and increasingly, production LLM integrations that ship on Cloudflare Workers.',
    skillsLabel: 'Skills',
    skills: {
      backend: {
        label: 'Backend',
        items: 'Java · Spring Boot · .NET / C# · PostgreSQL · Oracle · TDD',
      },
      ai: {
        label: 'AI / LLM',
        items: 'Anthropic Claude API · Prompt design · Cost controls · OCR',
      },
      cloud: {
        label: 'Cloud / DevOps',
        items: 'Cloudflare Workers · Supabase · Docker · Jenkins · CI/CD · GitHub Actions',
      },
    },
  },
  contact: {
    sectionLabel: '03 — Contact',
    title: "Let's work together",
    lead: 'Open to part-time backend & LLM integration work (~20h/week, remote). Based in Spain (CET) — I overlap the full EU workday and US mornings.',
    emailCta: 'Send a message',
    githubLabel: 'GitHub',
    linkedinLabel: 'LinkedIn',
  },
  footer: { credit: 'Built by Raúl Gogna · 2026' },
  toggle: { label: 'Switch language' },
}

const es: Dict = {
  nav: { work: 'Proyectos', about: 'Sobre mí', contact: 'Contacto' },
  hero: {
    eyebrow: 'Ingeniero Backend',
    name: 'Raúl Gogna',
    role: 'Java / .NET · Integraciones LLM en producción',
    tagline:
      'Construyo backends de producción que no se rompen — y funcionalidades LLM que no se salen del presupuesto.',
    availability:
      'Disponible para proyectos part-time (~20h/semana) · Remoto · CET',
    ctaWork: 'Ver proyectos',
    ctaContact: 'Contactar',
  },
  work: {
    sectionLabel: '01 — Proyectos',
    title: 'Proyectos seleccionados',
    status: { production: 'En producción', active: 'En desarrollo' },
    projects: [
      {
        title: 'Asistente IA de Chat',
        year: '2026',
        status: 'production',
        description:
          'Una clínica necesitaba responder a pacientes 24/7 sin una factura de API impredecible. Asistente en producción con límite de gasto mensual, rate limiting y analítica — siempre disponible, costes predecibles.',
        tech: ['Cloudflare Workers', 'Anthropic Claude API', 'Shadow DOM'],
        link: 'https://anylopez.com',
        linkLabel: 'anylopez.com',
      },
      {
        title: 'gastos-app',
        year: '2026',
        status: 'active',
        description:
          'Sustituir hojas de cálculo por software fiable: PWA de finanzas con arquitectura limpia en 3 capas (dominio → aplicación → infraestructura), RLS en Postgres, auth OTP y 160 tests unitarios.',
        tech: ['SvelteKit', 'Supabase', 'Cloudflare Workers', 'PostgreSQL'],
        link: 'https://github.com/RaulGogna/gastos-app',
        linkLabel: 'github.com/RaulGogna/gastos-app',
      },
      {
        title: 'Motor de Reservas',
        year: '2026',
        status: 'production',
        description:
          'Un scheduler de terceros costaba conversiones. Flujo de reservas serverless que lo sustituye, instrumentado para medición A/B — bajo mantenimiento, sin cuotas de proveedor.',
        tech: ['Cloudflare Workers', 'Serverless', 'A/B Testing'],
        link: null,
        linkLabel: null,
      },
      {
        title: 'Rebuild anylopez.com',
        year: '2025–2026',
        status: 'production',
        description:
          'Una web WordPress lenta penalizaba el posicionamiento. Rebuild completo: eliminados 1.198 ms de bloqueo de layout, datos estructurados, i18n ES/EN y migración de dominio sin pérdida SEO.',
        tech: ['Eleventy', 'i18n ES/EN', 'Core Web Vitals', 'Datos estructurados'],
        link: 'https://anylopez.com',
        linkLabel: 'anylopez.com',
      },
    ],
  },
  about: {
    sectionLabel: '02 — Sobre mí',
    title: 'Sobre mí',
    bio: 'Ingeniero backend con 4+ años en banca (DXC Technology). Construyo sistemas distribuidos en Java y .NET — y cada vez más, integraciones LLM en producción sobre Cloudflare Workers.',
    skillsLabel: 'Habilidades',
    skills: {
      backend: {
        label: 'Backend',
        items: 'Java · Spring Boot · .NET / C# · PostgreSQL · Oracle · TDD',
      },
      ai: {
        label: 'IA / LLM',
        items: 'Anthropic Claude API · Diseño de prompts · Control de costes · OCR',
      },
      cloud: {
        label: 'Cloud / DevOps',
        items: 'Cloudflare Workers · Supabase · Docker · Jenkins · CI/CD · GitHub Actions',
      },
    },
  },
  contact: {
    sectionLabel: '03 — Contacto',
    title: 'Trabajemos juntos',
    lead: 'Disponible para trabajo backend e integraciones LLM part-time (~20h/semana, remoto). Desde España (CET), con solape total con la jornada europea.',
    emailCta: 'Enviar mensaje',
    githubLabel: 'GitHub',
    linkedinLabel: 'LinkedIn',
  },
  footer: { credit: 'Hecho por Raúl Gogna · 2026' },
  toggle: { label: 'Cambiar idioma' },
}

export const dicts: Record<Lang, Dict> = { en, es }

type LangContextValue = [Lang, (l: Lang) => void]
const LangContext = createContext<LangContextValue>(['en', () => {}])

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem('portfolio-lang')
      return stored === 'es' ? 'es' : 'en'
    } catch {
      return 'en'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('portfolio-lang', lang)
    } catch {
      // ignore
    }
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LangContext.Provider value={[lang, setLang]}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang(): LangContextValue {
  return useContext(LangContext)
}

export function useT(): Dict {
  const [lang] = useContext(LangContext)
  return dicts[lang]
}
