// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  app: {
    head: {
      title: 'MilkUp',
      meta: [
        { name: 'description', content: 'MilkUp - a free WYSIWYG desktop markdown editor' },
        { name: 'keywords', content: 'markdown, editor, desktop, free, open source, typora, WYSIWYG, obsidian' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/logo.svg' }
      ]
    }
  },
  css: [
    '@/theme/index.less',
  ]
})
