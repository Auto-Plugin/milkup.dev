import gsap from 'gsap'
import SplitType from 'split-type'
import { initParticles } from '../utils/particles'
import { t, onLangChange } from '../utils/i18n'

export function initHero() {
  // Aurora background
  const canvas = document.getElementById('particles') as HTMLCanvasElement
  if (canvas) initParticles(canvas)

  // Logo SVG stroke animation
  const paths = document.querySelectorAll<SVGPathElement>('.logo-path')
  paths.forEach((path) => {
    const len = path.getTotalLength()
    path.style.strokeDasharray = `${len}`
    path.style.strokeDashoffset = `${len}`
  })

  const tl = gsap.timeline({ delay: 0.3 })

  tl.to('.logo-path', {
    strokeDashoffset: 0,
    duration: 1.5,
    ease: 'power2.inOut',
    stagger: 0.1,
  })

  // Fill in logo after stroke
  tl.to('.logo-path', {
    fill: (_i: number, el: SVGPathElement) => el.getAttribute('stroke') || '#81A1C1',
    duration: 0.6,
    ease: 'power1.in',
    stagger: 0.05,
  }, '-=0.3')

  // Title split animation
  const titleEl = document.querySelector('.hero-title') as HTMLElement
  if (titleEl) {
    tl.set(titleEl, { opacity: 1 }, '-=0.3')
    const split = new SplitType(titleEl, { types: 'chars' })
    tl.from(split.chars!, {
      y: 40,
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: 'back.out(1.7)',
      stagger: 0.05,
    }, '-=0.2')

    // Glow effect
    tl.to(titleEl, {
      textShadow: '0 0 40px rgba(129,161,193,0.6), 0 0 80px rgba(129,161,193,0.3)',
      duration: 0.8,
      ease: 'power1.inOut',
    }, '-=0.3')
  }

  // Typewriter subtitle
  const subtitleEl = document.querySelector('.hero-subtitle') as HTMLElement
  if (subtitleEl) {
    let currentInterval: ReturnType<typeof setInterval> | null = null

    function typewrite() {
      if (currentInterval) clearInterval(currentInterval)
      const text = t('hero.subtitle')
      let i = 0
      subtitleEl.textContent = '|'
      currentInterval = setInterval(() => {
        subtitleEl.textContent = text.slice(0, ++i) + '|'
        if (i >= text.length) {
          clearInterval(currentInterval!)
          currentInterval = null
          subtitleEl.textContent = text
        }
      }, 50)
    }

    tl.call(typewrite)

    // Re-type on language change
    onLangChange(() => typewrite())
  }
}
