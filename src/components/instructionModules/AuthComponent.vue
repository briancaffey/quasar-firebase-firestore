<template>
  <q-expansion-item
    expand-separator
    group="instructions"
    header-class="bg-primary"
    label="AUTHENTICATION COMPONENT"
  >
    <q-card>
      <q-card-section>
        <p class="text-body1">
          At this pont things are starting to come along. All we need to do now is get some inputs to grab some data and send it off to Firebase to register users, and also log them in once their done. Let's take a look at our next file: <em>Auth.vue</em>
        </p>

        <p class="text-body1">
          In this file I've combined both the user registration and login as the template is only different by one input field; VERIFY PASSWORD. This is also where we see the use of <a href="https://monterail.github.io/vuelidate/">Vuelidate</a>. A fellow Quasarian staffer, Scott Molinari, has a great primer article about this great little library where you can read it here: <a href="https://medium.com/quasar-framework/adding-validation-to-quasar-based-forms-5391cee48c20">Adding Validation to Quasar based Forms</a>
        </p>

        <p class="text-body1">Combining user needs is sometimes an art when building UI's. In this example I made use of computed properties that hook into vue's routing system to identify which route the user is at which dictates the visablity of the verify password field, the submit's button label, and the heading of the component. Let's take a look at this:
          <pre class="bash--block q-pa-sm"><strong>/src/components/Auth.vue:70-77</strong>
  computed: {
    isRegisterUser () {
      return this.$route.name === 'Register'
    },
    getAuthType () {
      return this.isRegisterUser ? 'Register' : 'Login'
    }
  }
          </pre>
        </p>

        <p class="text-body1">
          Now take note in how this controls three simple elments in the template:
          <pre class="bash q-pa-sm">
            <strong>/src/components/Auth.vue:3(Component Title) <sub>*Disregard backslashes as they are used only to escape vue's render engine</sub></strong>
            &lt;h4&gt;\{\{ &dollar;route.name \}\}&lt;h4&gt;
          </pre>
          <pre class="bash q-pa-sm">
            <strong>/src/components/Auth.vue:28(Verify Password)</strong>
            v-if="isRegisterUser"
          </pre>
          <pre class="bash q-pa-sm">
            <strong>/src/components/Auth.vue:48</strong>
            :label="getAuthType"
          </pre>
          Now we have two components for the price of one. Let's further this practice in our method calls as well.
        </p>

        <p class="text-body1">
          Moving along to our script portion of our SFC. Authentication is handled in this component with two main functions: checkCredentials & authenticate, along with two supporting functions: performAuthentication & resetFromFields. Starting in authenticate we'll set our boolean to true to handle the button animation of the spinner gears, and then check our credentials. The checkCredentials method is hooking into our Vuelidate library and, if any errors exist, we rely on our trusted Quasar plugin "Notify".
          <pre class="bash--block q-pa-sm"><strong>/src/components/Auth.vue:70-77</strong>
  checkCredentials () {
    if (this.$v.email.$invalid || this.$v.password.$invalid) {
      this.$v.email.$touch()
      this.$v.password.$touch()
      this.$q.notify({
        classes: 'text-weight-bold text-center',
        color: 'negative',
        message: 'Your credentials are invalid'
      })
      setTimeout(() => {
        this.loading = false
      }, 1000)
      throw new Error('Credentials are invalid')
    }
    if (this.isRegisterUser && this.$v.passwordMatch.$invalid) {
      this.$v.password.$touch()
      this.$v.passwordMatch.$touch()
      this.$q.notify({
        classes: 'text-weight-bold text-center',
        color: 'negative',
        message: 'Your passwords don\'t match'
      })
      setTimeout(() => {
        this.loading = false
      }, 1000)
      throw new Error('Password Mismatch')
    }
  }
          </pre>
        </p>

        <p class="text-body1">
          After our users credentials passed validation it's onto the quick performAuthentication method that will use our computed property again to determine which type of auth method in our Firebase boot file we'll use. Check it out:
          <pre class="bash--block q-pa-sm"><strong>/src/components/Auth.vue:70-77</strong>
  performAuthentication () {
    return this.isRegisterUser
      ? this.$registerUser(this.email, this.password)
      : this.$login(this.email, this.password)
  }
          </pre>
          Because we created those methods in the firebase.js boot file as promises, we can then chain the performAuthentication signature inside the authenticate method, and attach some handy "then" and "catch" blocks to handle the rest of our user authentication experience. Once the user is created or logged in we'll call upon the <em>resetFormFields</em> method to set our data props back to empty strings, and tell vuelidate to reset its error handling observations. Here's the full <em>authentication</em> function for viewing:
          <pre class="bash--block q-pa-sm"><strong>/src/components/Auth.vue:70-77</strong>
  authenticate (target) {
    this.loading = true
    this.checkCredentials()
    this.performAuthentication()
      .then((user) => {
        this.loading = false
        this.resetFormFields()
        this.$router.push('/user')
        console.log('SUCCESS:', user)
      })
      .catch((error) => {
        console.error('FAILURE:', error)
        this.$q.notify({
          classes: 'text-weight-bold text-center',
          color: 'negative',
          message: `Looks like there is an issue: ${error.message}`
        })
        this.loading = false
      })
  }
          </pre>
        </p>

        <p class="text-body1">
          A few small items to mention before we wrap uo with this section. You might have noticed the delayTouch method signature. This comes from vuelidate to delay the actual validation process on form fields so you can give users a bit of time before you tell them they are producing invalid inputs. This file lives in a utility function that is outside of the component stucture and lives here: <em>/src/utils/utilityFunctions.js</em>. The reason I did this is when you have forms in mulitple locations in a large app you'll need to refernce this fucntion quite a bit, so why not set it away in a place that you can refernce it when ever you need it. Notice the import at the top.
          <pre class="bash q-pa-sm"><strong>/src/components/Auth.vue:63</strong>
            import { delayTouch } from '../utils/utilFunctions.js'
          </pre>
          Also here is the actual function:
          <pre class="bash--block q-pa-sm"><strong>/src/components/Auth.vue:63</strong>
  export const delayTouch = ($v, touchMap) => {
    $v.$reset()
    if (touchMap.has($v)) {
      clearTimeout(touchMap.get($v))
    }
  touchMap.set($v, setTimeout($v.$touch, 2000))
          </pre>
          Well that's nice, but what is that touchMap. Well, that is basically an array that keeps track of the times a user is typing charecters, and then we set the timeout with a millisecond value. So if you play around with the form you can see that the delay actually waits a full 2 seconds before it pounces on you and sets the error messaging. Something else worth noting here is why not just create that in the actual utility function. Well I learned that the hard way,and if you go down that path of thinking you'll actually loose refernce to that map being created everytime a user presses a key, and you don't actually wanna loose that reference to that map so we put it here in this component. Notice where I put it too. I put it in this components instance option chain. This will prevent it from being observable. Some times having Vue watch everything isn't always ideal, hence our option chain.
        </p>

        <p class="text-body1">Last but not least our keyup events. I don't know about you, but when I submit a form I like it nice and clean, and nothing in focus so I've chained two methods to fire on keyup on our password fields.
          <pre class="bash q-pa-sm"><strong>/src/components/Auth.vue:17</strong>
            @keyup.enter="authenticate(); $event.target.blur()"
          </pre>
          <pre class="bash q-pa-sm"><strong>/src/components/Auth.vue:34</strong>
            @keyup.enter="authenticate(); $event.target.blur()"
          </pre>
        </p>

      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
export default {
  name: 'InstructionalAuthComponent',
  data () {
    return {}
  }
}
</script>

<style>
</style>
