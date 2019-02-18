<template>
  <q-page class="q-pa-md">
    <h6 class="q-my-sm">Welcome Fellow Quasarian!</h6>

    <p class="text-body1">This is a Quasar template designed to show you how to implement Goggle's Firebase, and Cloud Firestore within the Quasar v1-beta framework. Below you will find common instructions on setting up to Google's Firebase SDK, authentication for creating new users and logging them in, connecting to a Cloud Firestore Database, and some explination around common issue when dealing with routing and authenticated users in Quasar using the Firebase SDK.</p>

    <p class="text-body1 text-bold">Other features to note:</p>
    <q-list dense>
      <q-item>- Vuelidate for form validation</q-item>
      <q-item>- Quasar's New App Extension Featuring -- DotEnv</q-item>
      <q-item>- Data Table with expansion fields, and crud operations on our data (coming soon!)</q-item>
    </q-list>

    <q-list bordered class="rounded-borders">
        <firebaseSetup></firebaseSetup>
        <q-separator />
        <authenticationSetup></authenticationSetup>
        <q-separator />
        <firestoreConnection></firestoreConnection>
        <q-separator />
        <commonIssues></commonIssues>
    </q-list>
  </q-page>
</template>

<script>
import authenticationSetup from '../components/instructionModules/AuthenticationSetup.vue'
import firebaseSetup from '../components/instructionModules/FirebaseSetup.vue'
import firestoreConnection from '../components//instructionModules/FirestoreConnection.vue'
import commonIssues from '../components//instructionModules/CommonIssues.vue'

export default {
  name: 'Home',
  components: {
    authenticationSetup,
    commonIssues,
    firebaseSetup,
    firestoreConnection
  }
}
</script>

<style>
</style>
