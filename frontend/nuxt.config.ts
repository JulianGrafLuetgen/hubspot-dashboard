import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@nuxt/icon', '@nuxt/eslint', '@nuxtjs/color-mode'],

  devtools: { enabled: true },

  colorMode: { classSuffix: '', preference: 'dark', fallback: 'dark' },

  future: {
    compatibilityVersion: 4,
  },
  
  compatibilityDate: '2025-02-19',

  css: ['./app/assets/css/main.css'],

  vite: { plugins: [tailwindcss()] },
})