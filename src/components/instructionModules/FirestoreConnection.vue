<template>
  <q-expansion-item
    expand-separator
    label="CONNECTING TO CLOUD FIRESTORE"
  >
    <q-card>
      <q-card-section>
        <p class="text-body1">
           With Cloud Firestore, Quasar apps can rely on the clound with just some minor additions to your code base, and harness data reactivity with the VueFire plugin
           <pre class="bash">$ yarn add vuefire@next</pre>
           Then in our firebase boot file (boot/firebase.js) we'll import it, and then add it to the Vue instance
        </p>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
export default {
  name: 'FirestoreConnection',
  data () {
    return {}
  }
}
</script>

<style>
</style>
