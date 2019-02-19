import firebase from 'firebase/app'
require('firebase/auth')

export default ({ app, router, Vue }) => {
  const currentConfig = process.env.firebaseConfig

  // Make sure the firebase API keys have been set accordingly
  if (currentConfig) {
    router.beforeEach((to, from, next) => {
      firebase.auth().onAuthStateChanged(() => {
        const currentUser = firebase.auth().currentUser
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
        if (requiresAuth && !currentUser) next('login')
        else if (to.path === '/login' && (!requiresAuth && currentUser)) next('user')
        else if (to.path === '/register' && (!requiresAuth && currentUser)) next('user')
        else next()
      })
    })
  }
}
