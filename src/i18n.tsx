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
    availability: 'Open to part-time engagements (~20h/week) · Remote · CET',
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
          'Customer-facing AI assistant for an aesthetics clinic — Shadow DOM widget with monthly cost cap, rate limiting, and analytics events.',
        tech: ['Cloudflare Workers', 'Anthropic Claude API', 'Shadow DOM'],
        link: 'https://anylopez.com',
        linkLabel: 'anylopez.com',
      },
      {
        title: 'gastos-app',
        year: '2026',
        status: 'active',
        description:
          'Personal finance PWA with clean 3-layer architecture (domain → application → infrastructure), Postgres row-level security, OTP auth, and 160 unit tests.',
        tech: ['SvelteKit', 'Supabase', 'Cloudflare Workers', 'PostgreSQL'],
        link: 'https://github.com/RaulGogna/gastos-app',
        linkLabel: 'github.com/RaulGogna/gastos-app',
      },
      {
        title: 'Booking Engine',
        year: '2026',
        status: 'production',
        description:
          'Serverless booking flow that replaced a third-party scheduler — instrumented for A/B measurement with zero cold-start overhead.',
        tech: ['Cloudflare Workers', 'Serverless', 'A/B Testing'],
        link: null,
        linkLabel: null,
      },
      {
        title: 'anylopez.com Rebuild',
        year: '2025–2026',
        status: 'production',
        description:
          'Full rebuild of a bilingual clinic site. Eliminated 1,198 ms of layout blocking, added structured data, ES/EN i18n, and completed a full domain migration.',
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
    lead: 'Open to part-time backend & LLM integration work (~20h/week, remote, CET).',
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
    availability: 'Disponible para proyectos part-time (~20h/semana) · Remoto · CET',
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
          'Asistente IA para clientes de una clínica estética — widget Shadow DOM con límite de gasto mensual, rate limiting y eventos de analítica.',
        tech: ['Cloudflare Workers', 'Anthropic Claude API', 'Shadow DOM'],
        link: 'https://anylopez.com',
        linkLabel: 'anylopez.com',
      },
      {
        title: 'gastos-app',
        year: '2026',
        status: 'active',
        description:
          'PWA de finanzas personales con arquitectura limpia en 3 capas (dominio → aplicación → infraestructura), RLS en Postgres, auth OTP y 160 tests unitarios.',
        tech: ['SvelteKit', 'Supabase', 'Cloudflare Workers', 'PostgreSQL'],
        link: 'https://github.com/RaulGogna/gastos-app',
        linkLabel: 'github.com/RaulGogna/gastos-app',
      },
      {
        title: 'Motor de Reservas',
        year: '2026',
        status: 'production',
        description:
          'Flujo de reservas serverless que reemplazó un scheduler de terceros — instrumentado para medición A/B sin overhead de cold start.',
        tech: ['Cloudflare Workers', 'Serverless', 'A/B Testing'],
        link: null,
        linkLabel: null,
      },
      {
        title: 'Rebuild anylopez.com',
        year: '2025–2026',
        status: 'production',
        description:
          'Reconstrucción completa de una web bilingüe para clínica. Eliminados 1.198 ms de bloqueo de layout, datos estructurados, i18n ES/EN y migración de dominio.',
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
    lead: 'Disponible para proyectos backend e integraciones LLM part-time (~20h/semana, remoto, CET).',
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
