import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "MilkUp",
  titleTemplate: false,
  description: "A desktop WYSIWYG Markdown editor",
  head: [
    [
      'link',
      { rel: 'icon', href: './logo.svg' }
    ]
  ],
  themeConfig: {
    logo: "./logo.svg",
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Auto-Plugin/milkup' }
    ]
  }
})
