import { chromium } from 'playwright'

const browser = await chromium.launch({ channel: 'msedge' })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(1000)

async function shot(anchor, name) {
  await page.evaluate((a) => document.querySelector(a)?.scrollIntoView({ behavior: 'instant', block: 'start' }), anchor)
  await page.waitForTimeout(900)
  await page.screenshot({ path: `scripts/sec-${name}.png` })
}
await shot('#work', 'work')
await shot('#about', 'about')
await shot('#contact', 'contact')

// contraste piedra sobre card
const contrast = await page.evaluate(() => {
  const el = document.querySelector('.work__card-desc')
  const card = document.querySelector('.work__card')
  return {
    descColor: getComputedStyle(el).color,
    cardBg: getComputedStyle(card).backgroundColor,
    scarcity: document.querySelector('.contact__scarcity')?.textContent,
    emailCta: document.querySelector('.contact__link--email')?.textContent,
  }
})
console.log(JSON.stringify(contrast))
await browser.close()
console.log('OK')
