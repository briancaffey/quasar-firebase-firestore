<template>
  <div>
    <q-btn-dropdown
      color="primary"
      unelevated
      :icon="currentIcon"
    >
      <q-list v-if="!currentUser">
        <q-item
          clickable
          @click="routeClick('login')"
        >
          <q-item-section avatar>
            <q-icon name="power_settings_new"></q-icon>
          </q-item-section>
          <q-item-section>Login</q-item-section>
        </q-item>

        <q-item
          clickable
          @click="routeClick('register')"
        >
          <q-item-section avatar>
            <q-icon name="person"></q-icon>
          </q-item-section>
          <q-item-section>Register New User</q-item-section>
        </q-item>
      </q-list>

      <q-list v-else>
        <q-item
          clickable
          @click="logOff"
        >
          <q-item-section avatar>
            <q-icon name="exit_to_app"></q-icon>
          </q-item-section>
          <q-item-section>Log Off</q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
export default {
  name: 'UserMenu',
  created () {
    this.$fb.auth().onAuthStateChanged((user) => {
      this.currentUser = user
    })
  },
  computed: {
    currentIcon () {
      return this.currentUser !== null ? 'account_circle' : 'menu'
    }
  },
  data () {
    return {
      currentUser: null
    }
  },
  methods: {
    logOff () {
      this.$fb.auth().signOut()
    },
    routeClick (routePath) {
      this.$router.push({ path: routePath })
    }
  }
}
</script>

<style>
</style>
