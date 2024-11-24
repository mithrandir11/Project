import type { RouterConfig } from '@nuxt/schema'

export default {
  routes: (_routes) => [
    {
      name: 'home',
      path: '/',
      component: () => import('~/pages/index.vue')
    },
    {
      name: 'showCategory',
      path: '/category/:id/:slug',
      component: () => import('~/pages/category/[category].vue')
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('~/pages/auth/login.vue'),
      meta:{ layout: false, middleware: 'guest'}
    },
    {
      name: 'profile',
      path: '/profile',
      component: () => import('~/pages/profile/index.vue'),
      meta:{ layout: 'profile', middleware: 'auth'}
    },
    {
      name: 'profile.addresses',
      path: '/profile/addresses',
      component: () => import('~/pages/profile/addresses.vue'),
      meta:{ layout: 'profile', middleware: 'auth'}
    },
    {
      name: 'profile.orders',
      path: '/profile/orders',
      component: () => import('~/pages/profile/orders.vue'),
      meta:{ layout: 'profile', middleware: 'auth'}
    },
    {
      name: 'showBook',
      path: '/books/:id/:slug',
      component: () => import('~/pages/books/[id][slug].vue')
    },
    {
      name: 'cart',
      path: '/cart',
      component: () => import('~/pages/purchase/cart.vue'),
      meta:{ middleware: 'auth'}
    },
  ],
} satisfies RouterConfig
