import DefaultTheme from 'vitepress/theme'
import './style.css'
import { defineAsyncComponent } from 'vue'
const Home = defineAsyncComponent(() => import('./components/Home.vue'))
export default {
  ...DefaultTheme,
  async enhanceApp({ app }) {
    app.component('Home', Home)
  }
}
