<template>
  <q-expansion-item
    expand-separator
    group="instructions"
    header-class="bg-primary"
    label="COMMON FIREBASE SETUP INSTRUCTIONS"
  >
    <q-card>
      <q-card-section>
        <p class="text-body1">In order to use this template effectively you will need to have a firebase account. If you do not have one head over to the <a class='highlight-link' href="https://firebase.google.com/" target="blank">firebase setup</a>, and get yourself an account so we can proceed.</p>

        <p class="text-body1">Once you have an account with firebase you're going to need to set up a new project in the firebase console so we can link your frontend project in Quasar with the Firebase SDK. <img class="q-my-md" src="statics/projectSetup.jpg" alt="Project Setup" /></p>

        <p class="text-body1">Next you'll need to get your API key by clicking on the web icon. This will launch a modal with API keys that you'll need to make the connection between your app and Firebase. Copy and paste from the "apiKey" to the end of the value in "messagingSenderId".</p><img class="q-my-md" src="statics/webAPIIcon.jpg" alt="Web Icon API"/>

        <p class="text-body1">Now that we have the api key, this is a good time to use the new Quasar app extension DotEnv, which is a new feature that is in Quasar v1. We are going to be using the Quasar extension -- <em>DotEnv</em> So run this command in your shell: <pre class="bash">$ quasar ext add @quasar/dotenv</pre> Follow the prompts, and when the last prompt entited: "Name of your Common Root Object", be sure to name it "firebaseConfig". This will be the object that is stored in <em>process.env object</em> and will be loaded into Fireabse's initializeApp method. (/src/boot/firebase.js:12) If you're curious about the Quasar App Extension feature(s) please have a read. (Medium article to soon be released)</p>

        <p class="text-body1">You will need to create the two files that you specified during the prompts. I named mine ".env.dev", and ".env.prod". Once these files are created paste the API keys from the Firebase console into those files. Be sure to remove all spaces, colons, and commas. It should look like this: <img class="q-my-md" src="statics/envFile.jpg" alt="Environment File" /> Also, be sure to add these files to your .gitignore file. By no means are your keys hidden as they are public on your frontend application, but it's just good practice not to check in your env files. I will add a few articles talking about the security of firebase in the future.</p>

        <p class="text-body1">Now click on the <em>Authentication</em> link in the left navigation pane. Once there click on the <em>Sign-in method</em> tab in the main screen section.</p>

        <p class="text-body1">For this template we are only going to focus on the email sign in method. We'll also allow the user to be registered once they provide a valid email and password. At this point there is no need to validate the user's email as this requires an additional application to do the validation through the Firebase email API. (Medium article coming soon!)</p>

        <p class="text-body1">Hover over the <em>Email/Password</em> row, and click on the pencil icon to enable email for the sign in method for the authentication method. <img class="q-my-md" src="statics/authMethodsPencil.jpg" alt="Authentication Methods Edit Pencil"> Then click on the toggle switch to enable the email setting and click save.<img class="q-my-md" src="statics/authEmailSettings.jpg" alt="Authentication Email Settings"/></p>

        <p class="text-body1">Now before we go and register a new user, lets head back over to the Firebase console and and create our Cloud Firestore database so that once we register a new user and get directed to the user dashboard, we'll be able to add data to our database. Click on the <em>Database</em> link in the left pane, and click on <em>Create database</em>.<img class="q-my-md" src="statics/cloudFirestore.jpg" alt="Cloud Firestore"/></p>

        <p class="text-body1">Once the database is created click on the menu item in the upper right corner of this template and click on <em>Register New User</em>. This will allow you to register a new user. Once a new user is registered you will be redirect to the User Dashboard where you can enter a new project and it will be stored in your firestore database.</p>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
export default {
  name: 'FirebaseSetup',
  data () {
    return {}
  }
}
</script>

<style>
  .image-container {
  position: relative;
  padding-bottom: 66.78082192%; /* ratio of image height to width */
  height: 0;
  overflow: hidden;
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
