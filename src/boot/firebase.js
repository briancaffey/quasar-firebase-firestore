import * as configs from '../utils/firebase/configs.js'
import firebase from 'firebase/app'
require('firebase/auth')

export default ({ app, router, Vue }) => {
  // Set Node Env variable to determine what type
  // firebase config we need to set
  let isDev = process.env.DEV

  // Set the correct type of config based on our isDev bool
  let currentConfig = isDev ? configs.dev : configs.prod

  // Initialize app
  firebase.initializeApp(currentConfig)

  router.beforeEach((to, from, next) => {
    if (currentConfig.apiKey === '') next()
    firebase.auth().onAuthStateChanged(() => {
      const currentUser = firebase.auth().currentUser
      const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

      if (requiresAuth && !currentUser) next('login')
      else if (to.path === '/login' && (!requiresAuth && currentUser)) next('user')
      else if (to.path === '/register' && (!requiresAuth && currentUser)) next('user')
      else next()
    })
  })
  Vue.prototype.$fb = firebase
}
