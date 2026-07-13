import { chromium } from 'playwright'
const browser = await chromium.launch({ channel: 'msedge' })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(700)
const links = await page.evaluate(() =>
  [...document.querySelectorAll('.contact__links a')].map((a) => ({
    text: a.textContent.trim(),
    href: a.getAttribute('href'),
    target: a.getAttribute('target'),
  }))
)
console.log(JSON.stringify(links, null, 0))
// toggle ES para comprobar traducciones
await page.getByRole('button', { name: /^es$/i }).first().click()
await page.waitForTimeout(400)
const esCta = await page.evaluate(() =>
  [...document.querySelectorAll('.contact__links a')].map((a) => a.textContent.trim())
)
console.log('ES:', JSON.stringify(esCta))
await browser.close()
console.log('OK')
