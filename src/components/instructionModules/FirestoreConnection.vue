<template>
  <q-expansion-item
    expand-separator
    group="instructions"
    header-class="bg-primary"
    label="CONNECTING TO CLOUD FIRESTORE"

  >
    <q-card>
      <q-card-section>
        <p class="text-body1">
           With Cloud Firestore, Quasar apps can rely on the cloud with just some minor additions to your code base, and harness data reactivity with the <a href="https://github.com/vuejs/vuefire">VueFire plugin</a>. These bindings are sick. They're literally magic under the hood. They were written by one of the core <a href="https://github.com/posva">Vue wizzards</a>, and I'm currently using them in my main development project. Let's start by adding the VueFire package to our project.
           <pre class="bash">$ yarn add vuefire@next</pre>
           Then in our firebase boot file we'll import it, have Vue use it, and then add it to the Vue instance.
           <pre class="bash q-pa-sm"><strong>/src/boot/firebase.js:4</strong>
            import VueFire from 'vuefire'
          </pre>
          <pre class="bash q-pa-sm"><strong>/src/boot/firebase.js:8</strong>
            Vue.use(VueFire)
          </pre>
          <pre class="bash q-pa-sm"><strong>/src/boot/firebase.js:8</strong>
            Vue.prototype.$db = firestore
          </pre>
        </p>
        <p class="text-body1">
          We need a form to add some data to our database. I created a form to add client projects to our firestore database.
        </p>
        <pre class="bash--block q-pa-sm"><strong>/src/components/Dashboard:27-59</strong>
    &lt;form class="project-creation"&gt;
      &lt;p class="text-h6"&gt;Add A New Project&lt;/p&gt;
      &lt;fieldset class="flex row"&gt;
        &lt;q-input
          label="New Project Name"
          type="text"
          v-model="projectName"
        &gt;&lt;/q-input&gt;
        &lt;q-input
          label="Point Of Contact"
          type="text"
          v-model="pointOfContact"
        &gt;&lt;/q-input&gt;
        &lt;q-input
          label="Scope Of Work"
          type="textarea"
          v-model="scopeOfWork"
          @keyup.enter="addNewProject()"
        &gt;&lt;/q-input&gt;
        &lt;div class="flex justify-end q-mt-md"&gt;
          &lt;q-btn
            color="primary"
            label="Add Project"
            :loading="loading"
            @click="addNewProject"
          &gt;
            &lt;template v-slot:loading&gt;
              &lt;q-spinner-gears&gt;&lt;/q-spinner-gears&gt;
            &lt;/template&gt;
          &lt;/q-btn&gt;
        &lt;/div&gt;
      &lt;/fieldset&gt;
    &lt;/form&gt;
        </pre>
        <p class="text-body1">
          Ok now that we have the magic bindings in place lets get these things working. Once you're able to successfully register a user, you will be routed to the user's dashboard. This file is where we'll start to implement the connections to firestore, and subsequently fetch data, and post to it. Firstly, we create a <em>projects</em> array in our data object and mimic that with a firestore collection binding in our firestore function. Take note, this is a coding theme that you'll see through using firestore.
           <pre class="bash--block q-pa-sm"><strong>/src/components/Dashboard.vue:72-85</strong>
  data () {
    return {
      loading: false,
      pointOfContact: '',
      projects: [],
      projectName: '',
      scopeOfWork: ''
    }
  },
  firestore () {
    return {
      projects: this.$db.collection('projects')
    }
  }
          </pre>
          This literally creates the observable / reactivity that is magic under the hood. Now with this set, anytime new data is added to this collection firestore will fire a change event and our code will be able to react accordingly.
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
