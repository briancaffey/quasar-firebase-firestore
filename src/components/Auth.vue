<template>
  <form class='authentication'>
    <h4>{{ $route.name }}</h4>
    <q-input
      label="EMAIL"
      v-model="email"
      type="email"
      @input="delayTouch($v.email, $options.touchMap)"
      :error="$v.email.$error"
    />
    <q-input
      label="PASSWORD"
      v-model="password"
      ref="password"
      :type="isPwd ? 'password' : 'text'"
      :error="$v.password.$error"
      @input="delayTouch($v.password, $options.touchMap)"
      @keyup.enter="authenticate(); $event.target.blur()"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        ></q-icon>
      </template>
    </q-input>
    <q-input
      v-if="isRegisterUser"
      label="VERIFY PASSWORD"
      v-model="passwordMatch"
      :type="isPwd ? 'password' : 'text'"
      :error="$v.passwordMatch.$error"
      @input="delayTouch($v.passwordMatch, $options.touchMap)"
      @keyup.enter="authenticate(); $event.target.blur()"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        ></q-icon>
      </template>
    </q-input>
    <div class="flex justify-end">
      <q-btn
        class="q-mt-lg"
        color="primary"
        :label="getAuthType"
        :loading="loading"
        @click="authenticate()"
      >
        <template v-slot:loading>
          <q-spinner-gears></q-spinner-gears>
        </template>
      </q-btn>
    </div>

  </form>
</template>

<script>
import { required, email, sameAs } from 'vuelidate/lib/validators'
import { registerUser, login } from '../utils/authFunctions.js'
import { delayTouch } from '../utils/utilFunctions.js'

export default {
  name: 'Auth',
  // Top level prop in our options object to set and hold our
  // timer for our validations
  touchMap: new WeakMap(),
  computed: {
    isRegisterUser () {
      return this.$route.name === 'Register'
    },
    getAuthType () {
      return this.isRegisterUser ? 'Register' : 'Login'
    }
  },
  data () {
    return {
      email: '',
      isPwd: true,
      loading: false,
      password: '',
      passwordMatch: ''
    }
  },
  validations: {
    email: { required, email },
    password: {},
    passwordMatch: {
      // eslint-disable-next-line func-names
      sameAsPassword: sameAs(function () {
        return this.password
      })
    }
  },
  methods: {
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
          this.loading = false
        })
    },
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
    },
    performAuthentication () {
      return this.isRegisterUser
        ? registerUser(this.email, this.password, this)
        : login(this.email, this.password, this)
    },
    resetFormFields () {
      this.email = ''
      this.password = ''
      this.passwordMatch = ''
      this.$v.$reset()
    },
    delayTouch
  }
}
</script>

<style lang='stylus'>
  .authentication
    min-height 20vh
    max-width 30em
    margin auto
    position relative
</style>
