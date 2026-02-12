import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { t, onLangChange } from '../utils/i18n'

gsap.registerPlugin(ScrollTrigger)

function seededRandom(seed: number) {
  return () => {
    seed = (seed * 16807 + 0) % 2147483647
    return (seed - 1) / 2147483646
  }
}

interface ItemMeta {
  rotY: number; rotX: number; rotZ: number
  depth: number
}

export function initPreview() {
  const section = document.querySelector('.preview') as HTMLElement
  const track = document.querySelector('.preview-track') as HTMLElement
  if (!section || !track) return

  const items = track.querySelectorAll<HTMLElement>('.pv-item')
  const rand = seededRandom(42)
  const meta: ItemMeta[] = []

  const GAP_X = 260
  let totalWidth = 0

  // Unified tilt: consistent angle with tiny per-item variation
  const BASE_ROT_Y = -6
  const BASE_ROT_X = 3

  items.forEach((item, i) => {
    const depth = parseInt(item.dataset.depth || '2')
    const x = i * GAP_X + rand() * 80 - 40

    // Wide scatter — allow items to go partially off-screen
    const y = rand() * 90 - 10  // -10% to 80%

    // Randomized width per item within depth tier (overlapping ranges)
    let w: number
    if (depth === 1) w = 380 + rand() * 120       // 380–500
    else if (depth === 2) w = 260 + rand() * 100   // 260–360
    else w = 150 + rand() * 120                     // 150–270

    // Unified tilt with tiny variation
    const rotY = BASE_ROT_Y + (rand() - 0.5) * 2
    const rotX = BASE_ROT_X + (rand() - 0.5) * 1.5
    const rotZ = (rand() - 0.5) * 2

    meta.push({ rotY, rotX, rotZ, depth })

    item.style.left = `${x}px`
    item.style.top = `${y}%`
    item.style.width = `${w}px`
    item.style.zIndex = `${depth === 1 ? 3 : depth === 2 ? 2 : 1}`

    // Use gsap.set so GSAP tracks these transform values
    gsap.set(item, { rotateY: rotY, rotateX: rotX, rotation: rotZ })

    totalWidth = Math.max(totalWidth, x + w + 40)
  })

  track.style.width = `${totalWidth}px`

  const scrollDist = totalWidth - window.innerWidth + 200

  // Pin section
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: () => `+=${scrollDist + window.innerWidth}`,
    pin: true,
    scrub: 1,
  })

  // Per-item parallax scroll (only animates x)
  items.forEach((item, i) => {
    const speed = meta[i].depth === 1 ? 1.3 : meta[i].depth === 2 ? 1.0 : 0.6

    gsap.to(item, {
      x: -scrollDist * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollDist + window.innerWidth}`,
        scrub: 1,
      },
    })
  })

  // Hover: straighten rotation (doesn't touch x, so no conflict)
  items.forEach((item, i) => {
    const m = meta[i]

    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        rotateX: 0, rotateY: 0, rotation: 0, scale: 1.08,
        opacity: 1,
        duration: 0.35, ease: 'power2.out',
      })
    })

    item.addEventListener('mouseleave', () => {
      const depth = m.depth
      gsap.to(item, {
        rotateY: m.rotY, rotateX: m.rotX, rotation: m.rotZ,
        scale: 1,
        opacity: depth === 1 ? 1 : depth === 2 ? 0.85 : 0.6,
        duration: 0.4, ease: 'power2.out',
      })
    })
  })

  // Click modal
  const modal = document.getElementById('pv-modal')!
  const modalImg = modal.querySelector('.pv-modal-img') as HTMLImageElement
  const modalTitle = modal.querySelector('.pv-modal-title') as HTMLElement
  const modalDesc = modal.querySelector('.pv-modal-desc') as HTMLElement

  function updateModalText(key: string) {
    modalTitle.textContent = t(`pv.${key}.title`)
    modalDesc.textContent = t(`pv.${key}.desc`)
  }

  let activeKey = ''

  items.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.stopPropagation()
      activeKey = item.dataset.key || ''
      const img = item.querySelector('img') as HTMLImageElement
      modalImg.src = img.src
      updateModalText(activeKey)
      modal.classList.add('active')
    })
  })

  onLangChange(() => {
    if (activeKey && modal.classList.contains('active')) {
      updateModalText(activeKey)
    }
  })

  modal.addEventListener('click', (e) => {
    if (e.target === modal || !(e.target as HTMLElement).closest('.pv-modal-body')) {
      modal.classList.remove('active')
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.classList.remove('active')
  })
}
