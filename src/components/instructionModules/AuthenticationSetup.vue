<template>
  <q-expansion-item
    expand-separator
    group="instructions"
    header-class="bg-primary"
    label="BOOT FILES & AUTHENTICATION METHODS"
  >
    <q-card>
      <q-card-section>
        <p class="text-body1">
          Ok, so we have firebase setup in the console, and our api keys sitting in our .env.dev file, but now we need to make two methods that will allow us to create new users and log them in as well as setup our configuration to initialize the firebase app. First lets create a new boot file called "firebase".
          <pre class="bash">$ quasar new boot firebase</pre>
        </p>

        <p class="text-body1">In our firebase boot file we're going to import firebase from the firebase/app folder in the firebase package, and in order for authentication to work we'll need to also require firebase/auth.
        <pre class="bash q-pa-sm">
        <strong>/src/boot/firebase.js:2-5</strong>
          import firebase from 'firebase/app'
          import 'firebase/firestore'
          import VueFire from 'vuefire'
          require('firebase/auth')
        </pre>
        </p>

        <p class="text-body1">Now that we have firebase available to us in the file we can initialize our appication with the firebaseConfig object we created when we installed our DotEnv Quasar app extension.
          <pre class="bash q-pa-sm">
            <strong>/src/boot/firebase.js:11,12</strong>
            const currentConfig = process.env.firebaseConfig
            firebase.initializeApp(currentConfig)
          </pre>
        </p>

        <p class="text-body1">Now that the config is set up lets look at the two methods we need to get the users created and logged in.(boot/)</p>

        <p class="text-body1">Both of these methods use the Firebase API methods: <em>signInWithEmailAndPassword</em> & <em>createUserWithEmailAndPassword</em>. These methods are asynchronous in nature, and they are wrapped in promises to handle the respective resolve and reject outcomes.
          <pre class="bash--block q-pa-sm"><strong>/src/boot/firebase.js:15-37</strong>
  Vue.prototype.$login = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          resolve(user)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  Vue.prototype.$registerUser = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          resolve(user)
        })
        .catch(error => {
          reject(error)
        })
    })
  }</pre>
        </p>

        <p class="text-body1">By assigning these method signatures to the Vue instance via the prototype property we can now use these anywhere in our app and pass up the outcomes of these methods to whatever components you may choose to use them in.</p>

        <p class="text-body1">Finally assigning the firebase instance to the Vue instance again for convienence to access the Firebase API elsewhere in our app by simply accessing it like this: <em>this.$fb</em>
          <br><strong>/src/boot/firebase.js:44</strong>
          <pre class="bash q-pa-sm">
            Vue.prototype.$fb = firebase
          </pre>
        </p>

        <p class="text-body1"></p>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
export default {
  name: 'InstructionalAuthenticationSetup',
  data () {
    return {}
  }
}
</script>

<style>
</style>
