export function initMagnetic(selector: string) {
  const els = document.querySelectorAll<HTMLElement>(selector)

  els.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`
    })

    el.addEventListener('mouseleave', () => {
      el.style.transform = ''
    })
  })
}
