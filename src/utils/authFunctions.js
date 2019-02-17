export const registerUser = (email, password, vm) => {
  return new Promise((resolve, reject) => {
    vm.$fb.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const returnValue = {
          user
        }
        vm.$q.notify({
          classes: 'text-weight-bold text-center',
          color: 'positive',
          message: 'Good Job! A new user was added to your firebase authenticaion db. Go check.'
        })
        resolve(returnValue)
      })
      .catch(error => {
        const returnValue = {
          error
        }
        vm.$q.notify({
          classes: 'text-weight-bold text-center',
          color: 'negative',
          message: `Looks like there is an issue: ${error.message}`
        })
        reject(returnValue)
      })
  })
}

export const login = (email, password, vm) => {
  return new Promise((resolve, reject) => {
    vm.$fb.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        const returnValue = {
          user
        }
        resolve(returnValue)
        console.log('SUCCESS: AUTHENTICATED', user)
      })
      .catch(error => {
        const returnValue = {
          error
        }
        vm.$q.notify({
          classes: 'text-weight-bold text-center',
          color: 'negative',
          message: `Looks like there is an issue: ${error.message}`
        })
        reject(returnValue)
      })
  })
}
