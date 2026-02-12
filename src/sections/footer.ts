import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initMagnetic } from '../utils/magnetic'

gsap.registerPlugin(ScrollTrigger)

export function initFooter() {
  initMagnetic('.magnetic')

  const footer = document.querySelector('.footer') as HTMLElement
  if (!footer) return

  gsap.from('.cta-title', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: footer,
      start: 'top 70%',
    },
  })

  gsap.from('.cta-btn', {
    y: 30,
    opacity: 0,
    scale: 0.8,
    duration: 0.8,
    delay: 0.2,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: footer,
      start: 'top 70%',
    },
  })

  gsap.from('.github-link', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    delay: 0.4,
    scrollTrigger: {
      trigger: footer,
      start: 'top 70%',
    },
  })
}
