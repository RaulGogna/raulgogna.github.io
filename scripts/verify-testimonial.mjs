import { chromium } from 'playwright'
const browser = await chromium.launch({ channel: 'msedge' })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(800)
await page.evaluate(() => document.querySelector('.testimonial')?.scrollIntoView({ block: 'center' }))
await page.waitForTimeout(800)
const data = await page.evaluate(() => {
  const q = document.querySelector('.testimonial__quote')
  return {
    author: document.querySelector('.testimonial__author')?.textContent,
    role: document.querySelector('.testimonial__role')?.textContent,
    quoteColor: getComputedStyle(q).color,
    cardBg: getComputedStyle(document.querySelector('.testimonial')).backgroundColor,
    quoteStart: q?.textContent.slice(0, 30),
  }
})
console.log('EN:', JSON.stringify(data))
await page.screenshot({ path: 'scripts/testimonial-en.png' })
await page.getByRole('button', { name: /^es$/i }).first().click()
await page.waitForTimeout(500)
const es = await page.evaluate(() => document.querySelector('.testimonial__role')?.textContent)
console.log('ES role:', es)
await browser.close()
console.log('OK')
