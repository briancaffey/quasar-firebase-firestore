<template>
  <q-page class="q-pa-md">
    <h4 class="q-my-sm">Welcome Fellow Quasarian!</h4>

    <p class="text-body1">This is a Quasar template designed to show you how to implement Goggle's Firebase, and Cloud Firestore within the Quasar v1-beta framework. Below you will find common instructions on setting up to Google's Firebase SDK, authentication for creating new users and logging them in, connecting to a Cloud Firestore Database, and some explination around common issue when dealing with routing and authenticated users in Quasar using the Firebase SDK.</p>

    <p class="text-body1">Some of this might be review, and if you're just looking for that one specific issue that has been bugging you about routes, or something regarding boot specific files, or something of that nature, just take a peak at the structure of the code, and that should answer most of your questions. But, if you're just beginning in Vue, and / or Quasar, or all of the above, then by all means go through each section, and when your done you should have a very solid production ready approach for using Vue, Quasar v1, Firebase Authentication, and Cloud Firestore. By no means is this exhuastive. You might want to or need to reorganize your application structure to best suite you and / or your orginizations needs. This example is an effort to address the biggest gotcha's when dealing with Firebase in the Quasar ecosystem.</p>

    <p class="text-h6">Other features to note:</p>
    <q-list dense>
      <q-item class="text-subtitle1">- Quasar's New App Extension Featuring -- DotEnv</q-item>
      <q-item class="text-subtitle1">- Vuelidate for form validation</q-item>
      <q-item class="text-subtitle1">- Data Table with expansion item fields, and CRUD operations on our data (coming soon!)</q-item>
      <q-item class="text-subtitle1">- Quasar App Extension (coming soon!)</q-item>
    </q-list>

    <q-list bordered class="q-mt-xl rounded-borders">
        <firebaseSetup></firebaseSetup>
        <q-separator />
        <authenticationSetup></authenticationSetup>
        <q-separator />
        <authenticationComponent></authenticationComponent>
        <q-separator />
        <firestoreConnection></firestoreConnection>
        <q-separator />
        <commonIssues></commonIssues>
    </q-list>
  </q-page>
</template>

<script>
import authenticationComponent from '../components/instructionModules/AuthComponent.vue'
import authenticationSetup from '../components/instructionModules/AuthenticationSetup.vue'
import firebaseSetup from '../components/instructionModules/FirebaseSetup.vue'
import firestoreConnection from '../components//instructionModules/FirestoreConnection.vue'
import commonIssues from '../components//instructionModules/CommonIssues.vue'

export default {
  name: 'Home',
  components: {
    authenticationComponent,
    authenticationSetup,
    commonIssues,
    firebaseSetup,
    firestoreConnection
  }
}
</script>

<style>
</style>
