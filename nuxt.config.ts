export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  
  css: [
    '~/assets/css/main.css',
    'notivue/notification.css',
    'notivue/animations.css',
    'notivue/notification-progress.css'
  ],
  modules: [
    'notivue/nuxt',
    '@formkit/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  formkit: {
    autoImport: true
  },
  notivue: {
    position: 'top-left',
    limit: 4,
    enqueue: true,
    avoidDuplicates: true,
    notifications: {
      global: {
        duration: 4000
      }
    }
  },
  app: {
    head: {
      htmlAttrs: {
        dir: 'rtl',
        lang: 'fa'
      }
    }
  },
  runtimeConfig:{
    public: {
      apiBase: "http://localhost:8000/api"
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})