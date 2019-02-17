<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="quasar-gcp">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title class='quasar-gcp--template-header-font'>
          <router-link to="/">Quasar's Firebase & Firestore Template</router-link>
        </q-toolbar-title>

        <user-menu></user-menu>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="a" target="_blank" href="http://v1.quasar-framework.org">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>v1.quasar-framework.org</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://github.com/quasarframework/">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="http://chat.quasar-framework.org">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
            <q-item-label caption>chat.quasar-framework.org</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://forum.quasar-framework.org">
          <q-item-section avatar>
            <q-icon name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>forum.quasar-framework.org</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://twitter.com/quasarframework">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
        <router-view />
    </q-page-container>
    <q-footer class="q-pa-md quasar-footer">
      ©2019 Quasar Framework in asscotiation with <a href="https://kpapro.com" target="blank">KPA Productions L.L.C.</a>
    </q-footer>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import userMenu from '../components/UserMenu.vue'

export default {
  name: 'Main',
  created () {
    console.log(this.isCurrentUser)
  },
  components: {
    userMenu
  },
  computed: {
    isCurrentUser () {
      return this.$fb.auth().currentUser
    }
  },
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    openURL,
    routeClick (routePath) {
      this.$router.push({ path: routePath })
    }
  }
}
</script>

<style lang='stylus'>
  .quasar-gcp
    &--template-header-font
      font-weight bold
      a
        color #fff!important
        text-decoration none
</style>
