import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initMagnetic } from '../utils/magnetic'

gsap.registerPlugin(ScrollTrigger)

export function initThemes() {
  const section = document.querySelector('.themes') as HTMLElement
  const track = document.querySelector('.themes-track') as HTMLElement
  if (!section || !track) return

  initMagnetic('.magnetic')

  const items = track.querySelectorAll<HTMLElement>('.tm-item')
  const title = section.querySelector('.section-title') as HTMLElement
  const footer = section.querySelector('.themes-footer') as HTMLElement

  // Two-row brick-wall layout: bottom row offset by half a column
  const COL_WIDTH = 520
  let totalWidth = 0
  let topCol = 0
  let botCol = 0

  // Small vertical offsets (%) to create stagger within each row
  const topOffsets = [0, 3, -2, 1, -3, 2]
  const botOffsets = [2, -1, 3, -2, 1, -3]

  items.forEach((item, i) => {
    const isTop = i % 2 === 0
    if (isTop) {
      item.style.left = `${topCol * COL_WIDTH}px`
      item.style.top = `${topOffsets[topCol % topOffsets.length]}%`
      topCol++
    } else {
      // Half-column offset for brick-wall stagger
      item.style.left = `${botCol * COL_WIDTH + COL_WIDTH * 0.5}px`
      item.style.top = `${50 + botOffsets[botCol % botOffsets.length]}%`
      botCol++
    }
    const right = parseFloat(item.style.left) + 520
    totalWidth = Math.max(totalWidth, right)
  })

  track.style.width = `${totalWidth}px`

  // Scroll stops before the very end — rightmost items stay partially hidden
  const scrollDist = totalWidth - window.innerWidth * 1.6

  // Prepare footer logo stroke animation
  const ftPaths = section.querySelectorAll<SVGPathElement>('.ft-logo-path')
  ftPaths.forEach((path) => {
    const len = path.getTotalLength()
    path.style.strokeDasharray = `${len}`
    path.style.strokeDashoffset = `${len}`
  })

  let logoAnimPlayed = false

  function playFooterLogo() {
    if (logoAnimPlayed) return
    logoAnimPlayed = true

    const logoWrap = section.querySelector('.ft-logo-wrap') as HTMLElement
    const ftTitle = section.querySelector('.ft-title') as HTMLElement

    const tl = gsap.timeline({ delay: 0.2 })

    // Show logo wrapper
    tl.set(logoWrap, { opacity: 1 })

    // Stroke draw
    tl.to('.ft-logo-path', {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: 'power2.inOut',
      stagger: 0.08,
    })

    // Fill after stroke
    tl.to('.ft-logo-path', {
      fill: (_i: number, el: SVGPathElement) => el.getAttribute('stroke') || '#81A1C1',
      duration: 0.5,
      ease: 'power1.in',
      stagger: 0.04,
    }, '-=0.2')

    // Title fade in
    tl.to(ftTitle, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.3')

    // Glow
    tl.to(ftTitle, {
      textShadow: '0 0 30px rgba(129,161,193,0.5), 0 0 60px rgba(129,161,193,0.25)',
      duration: 0.6,
      ease: 'power1.inOut',
    }, '-=0.2')
  }

  function resetFooterLogo() {
    if (!logoAnimPlayed) return
    logoAnimPlayed = false
    ftPaths.forEach((path) => {
      const len = path.getTotalLength()
      gsap.set(path, { strokeDashoffset: len, fill: 'none' })
    })
    const logoWrap = section.querySelector('.ft-logo-wrap') as HTMLElement
    const ftTitle = section.querySelector('.ft-title') as HTMLElement
    if (logoWrap) gsap.set(logoWrap, { opacity: 0 })
    if (ftTitle) gsap.set(ftTitle, { opacity: 0, textShadow: 'none' })
  }

  // Main horizontal scroll
  gsap.to(track, {
    x: -scrollDist,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${scrollDist + window.innerWidth * 0.5}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress
        // Fade out title in first 30%
        if (title) {
          title.style.opacity = `${Math.max(0, 1 - p * 3.3)}`
        }
        // Fade in footer overlay in last 20%
        if (footer) {
          const footerProgress = Math.max(0, (p - 0.8) / 0.2)
          footer.style.opacity = `${footerProgress}`
          if (footerProgress > 0) {
            footer.classList.add('active')
          } else {
            footer.classList.remove('active')
            resetFooterLogo()
          }
        }
        // Trigger logo animation when fully visible
        if (p >= 0.99) {
          playFooterLogo()
        }
      },
    },
  })
}
