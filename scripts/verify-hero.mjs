import { chromium } from 'playwright'

const browser = await chromium.launch({ channel: 'msedge' })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })

await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)

const diag = await page.evaluate(() => ({
  bodyBg: getComputedStyle(document.body).backgroundColor,
  htmlBg: getComputedStyle(document.documentElement).backgroundColor,
  heroColor: getComputedStyle(document.querySelector('.hero__name')).color,
  canvasCount: document.querySelectorAll('canvas').length,
  colorScheme: matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  glAttrs: (() => {
    const c = document.querySelector('canvas')
    const gl = c && (c.getContext('webgl2') || c.getContext('webgl'))
    return gl ? gl.getContextAttributes() : null
  })(),
}))
console.log('DIAG:', JSON.stringify(diag))

const tagline = await page.locator('.hero__tagline').textContent()
console.log('EN tagline:', tagline?.trim())
await page.screenshot({ path: 'scripts/hero-en.png' })
await page.evaluate(() => {
  const w = document.querySelector('.scene3d-wrapper')
  if (w) w.style.display = 'none'
})
await page.screenshot({ path: 'scripts/hero-nocanvas.png' })
await page.evaluate(() => {
  const w = document.querySelector('.scene3d-wrapper')
  if (w) w.style.display = ''
})

await page.getByRole('button', { name: /es/i }).first().click()
await page.waitForTimeout(600)
const taglineEs = await page.locator('.hero__tagline').textContent()
console.log('ES tagline:', taglineEs?.trim())

const overflow = await page.evaluate(() => {
  const bad = []
  for (const el of document.querySelectorAll('.hero *')) {
    if (el.scrollWidth > el.clientWidth + 1) bad.push(el.className)
  }
  return bad
})
console.log('Overflow en hero (ES):', overflow.length ? overflow : 'NONE')
await page.screenshot({ path: 'scripts/hero-es.png' })

await browser.close()
console.log('OK')
