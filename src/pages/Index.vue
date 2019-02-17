<template>
  <q-page class="q-pa-md">
    <h6 class="q-my-sm">Welcome Fellow Quasarian!</h6>
    <p class="text-body1">This is a Quasar template designed to show you how to implement Goggle's Firebase, and Cloud Firestore. In order to use this template effectively you will need to have a firebase account. If you do not have one head over to the <a class='highlight-link' href="https://firebase.google.com/" target="blank">firebase setup</a>, and get yourself and account so we can proceed.</p>

    <p class="text-body1">Once you have an account with firebase you're going to need to set up a new project in the firebase console so we can link your front end project in quasar with the firebase services api.[INSERT IMAGE]</p>

    <p class="text-body1">Now that we have a new project registered in your firebase console it time to get started. First lets get some authentication going via a user's email. Click on the <em>Authentication</em> item in the left navigation pane. Once there click on the <em>Sign-in method</em> tab in the main screen section.</p>

    <p class="text-body1">For this template we are only going to focus on the email sign in method. We'll also allow the user to be registered once they provide a valid email and password. At this point there is no need to validate the user's email as this requires an additional application to do the validation through the firebase email sdk api. (Medium article coming soon!)</p>

    <p class="text-body1">Hover over the <em>Email/Password</em> row, and click on the pencil [INSERT IMAGE] icon to enable email for the sign in method for the authentication method</p>
    <p class="text-body1">Now that we have a methode to set up a user, click on the menu item in the upper right corner of this template [INSERT IMAGE], and click on <em>Register New User</em></p>

    <p class="text-body1">
      Usefull Links:
      <q-list>
        <q-item>
          <a href="https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public" target="blank">API keys security</a>
        </q-item>
      </q-list>

    </p>

  </q-page>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang='stylus'>
</style>
