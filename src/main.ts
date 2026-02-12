import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { initHero } from './sections/hero'
import { initPreview } from './sections/preview'
import { initThemes } from './sections/themes'
import { initI18n, getLang, setLang } from './utils/i18n'

gsap.registerPlugin(ScrollTrigger)

// Smooth scrolling with Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

// i18n
initI18n()

// Language toggle
const langBtn = document.getElementById('lang-toggle')
if (langBtn) {
  langBtn.addEventListener('click', () => {
    const next = getLang() === 'zh' ? 'en' : 'zh'
    setLang(next)
  })
}

// Init all sections
initHero()
initPreview()
initThemes()
