// import * as configs from '../utils/firebase/configs.js'
import firebase from 'firebase/app'
import 'firebase/firestore'
import VueFire from 'vuefire'
require('firebase/auth')

export default ({ app, router, Vue }) => {
  Vue.use(VueFire)

  // Initialize app
  const currentConfig = process.env.firebaseConfig
  firebase.initializeApp(currentConfig)

  // Initialize Cloud Firestore through Firebase
  const firestore = firebase.firestore()

  // Load the Vue route guard into memory and
  // wait for the onAuthStateChanged method to complete.
  // This will prevent the app from rendering before firebase has a chance
  // to finish its auth process, and allow it to check if a current authorized
  // user is set
  router.beforeEach((to, from, next) => {
    // Temporary route guard incase developer
    // has not set their firebase configs
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

  // Add prototype props to our Vue instance for easy access
  // in our app
  Vue.prototype.$fb = firebase
  Vue.prototype.$db = firestore
}
