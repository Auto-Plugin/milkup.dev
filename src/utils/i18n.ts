export type Lang = 'zh' | 'en'

const translations: Record<Lang, Record<string, string>> = {
  zh: {
    'hero.subtitle': '一款桌面端即时渲染 Markdown 编辑器',
    'preview.title': '预览',
    'pv.ai.title': 'AI 智能续写',
    'pv.ai.desc': '内置 AI 续写能力，让写作行云流水。',
    'pv.render.title': '渲染模式切换',
    'pv.render.desc': '即时渲染与源码模式无缝切换。',
    'pv.mermaid.title': 'Mermaid 图表',
    'pv.mermaid.desc': '内置 Mermaid 支持，轻松绘制流程图。',
    'pv.outline.title': '大纲与文件夹',
    'pv.outline.desc': '大纲导航与文件夹管理，高效组织文档。',
    'pv.theme.title': '主题定制',
    'pv.theme.desc': '丰富的主题系统，打造专属编辑器外观。',
    'pv.keymap.title': '快捷键定制',
    'pv.keymap.desc': '自定义快捷键映射，适配你的操作习惯。',
    'pv.i18n.title': '国际化',
    'pv.i18n.desc': '多语言支持，面向全球用户。',
    'pv.aisettings.title': 'AI 设置',
    'pv.aisettings.desc': '灵活配置 AI 模型与参数。',
    'themes.title': '精美主题',
    'themes.1': 'Nord Light',
    'themes.2': 'Nord Dark',
    'themes.3': 'Dracula',
    'themes.4': 'Solarized',
    'themes.5': 'Monokai',
    'themes.6': 'GitHub',
    'footer.cta': '开始写作',
    'footer.download': '立即下载',
    'footer.github': '★ 在 GitHub 上加星',
  },
  en: {
    'hero.subtitle': 'A Desktop Instant-Rendering Markdown Editor',
    'preview.title': 'Preview',
    'pv.ai.title': 'AI Writing',
    'pv.ai.desc': 'Intelligent AI continuation to boost your writing flow.',
    'pv.render.title': 'Render Mode Switch',
    'pv.render.desc': 'Seamlessly toggle between instant-rendering and source mode.',
    'pv.mermaid.title': 'Mermaid Diagrams',
    'pv.mermaid.desc': 'Built-in Mermaid support for flowcharts and diagrams.',
    'pv.outline.title': 'Outline & Folders',
    'pv.outline.desc': 'Navigate documents with outline view and folder management.',
    'pv.theme.title': 'Theme Customization',
    'pv.theme.desc': 'Rich theming system to craft your ideal editor look.',
    'pv.keymap.title': 'Keymap Customization',
    'pv.keymap.desc': 'Custom key bindings to match your workflow.',
    'pv.i18n.title': 'Internationalization',
    'pv.i18n.desc': 'Multi-language support for users worldwide.',
    'pv.aisettings.title': 'AI Settings',
    'pv.aisettings.desc': 'Flexible AI model and parameter configuration.',
    'themes.title': 'Beautiful Themes',
    'themes.1': 'Nord Light',
    'themes.2': 'Nord Dark',
    'themes.3': 'Dracula',
    'themes.4': 'Solarized',
    'themes.5': 'Monokai',
    'themes.6': 'GitHub',
    'footer.cta': 'Ready to Write?',
    'footer.download': 'Download Now',
    'footer.github': '★ Star on GitHub',
  },
}

const stored = localStorage.getItem('lang')
let currentLang: Lang = (stored === 'zh' || stored === 'en') ? stored : 'zh'
const listeners: Array<(lang: Lang) => void> = []

export function t(key: string): string {
  return (translations[currentLang] || translations.zh)[key] || key
}

export function getLang(): Lang {
  return currentLang
}

export function setLang(lang: Lang) {
  currentLang = lang
  localStorage.setItem('lang', lang)
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  // Update all [data-i18n] elements
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n!
    el.textContent = t(key)
  })
  listeners.forEach((fn) => fn(lang))
}

export function onLangChange(fn: (lang: Lang) => void) {
  listeners.push(fn)
}

// Apply initial lang
export function initI18n() {
  setLang(currentLang)
}
