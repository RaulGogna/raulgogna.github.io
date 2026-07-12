import { chromium } from 'playwright'
const browser = await chromium.launch({ channel: 'msedge' })
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(900)
await page.evaluate(() => document.querySelector('#about')?.scrollIntoView({ block: 'start' }))
await page.waitForTimeout(800)
await page.screenshot({ path: 'scripts/mobile-about.png' })
const ph = await page.evaluate(() => {
  const img = document.querySelector('.about__photo')
  return img ? { w: img.clientWidth, complete: img.complete, natural: img.naturalWidth } : null
})
console.log('photo:', JSON.stringify(ph))
await browser.close()
console.log('OK')
