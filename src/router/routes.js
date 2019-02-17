
const routes = [
  {
    path: '/',
    component: () => import('layouts/Basic.vue'),
    children: [
      {
        name: 'Home',
        path: '',
        component: () => import('pages/Index.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/Basic.vue'),
    children: [
      {
        name: 'Login',
        path: '/login',
        component: () => import('components/Auth.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/Basic.vue'),
    children: [
      {
        name: 'Register',
        path: '/register',
        component: () => import('components/Auth.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      {
        name: 'User',
        path: '/user',
        component: () => import('components/Dashboard.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
