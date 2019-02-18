<template>
  <div class="q-pa-md">
    <h4 class="q-my-none">Welcome User</h4>
    <p class="text-body1 q-my-sm">
      Your registered email is: {{$fb.auth().currentUser.email}} <br>
      This email is being pulled directly from the firebase authentication object.
    </p>

    <section class="project-in-flight q-mt-xl">
      <p class="text-h6">Current Projects In Flight</p>
      <div v-if="hasProjects" class="projects-wrapper">
        <div
          v-for="project in projects"
          :key=project.id
        >
          {{ project.projectName }}
        </div>
      </div>
      <div
        v-else
      >
        There are currently no projects in flight
      </div>
    </section>

    <section class="add-new-project q-mt-xl">
      <form class="project-creation">
        <p class="text-h6">Add A New Project</p>
        <fieldset class="flex row">
          <q-input
            label="New Project Name"
            type="text"
            v-model="projectName"
          ></q-input>
          <q-input
            label="Point Of Contact"
            type="text"
            v-model="pointOfContact"
          ></q-input>
          <q-input
            label="Scope Of Work"
            type="textarea"
            v-model="scopeOfWork"
            @keyup.enter="addNewProject()"
          ></q-input>
          <div class="flex justify-end q-mt-md">
            <q-btn
              color="primary"
              label="Add Project"
              :loading="loading"
              @click="addNewProject"
            >
              <template v-slot:loading>
                <q-spinner-gears></q-spinner-gears>
              </template>
            </q-btn>
          </div>
        </fieldset>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  computed: {
    hasProjects () {
      return this.projects && this.projects.length > 0
    }
  },
  data () {
    return {
      loading: false,
      pointOfContact: '',
      projectName: '',
      projects: [],
      scopeOfWork: ''
    }
  },
  firestore () {
    return {
      projects: this.$db.collection('projects')
    }
  },
  methods: {
    addNewProject () {
      this.loading = true
      this.addNewProjectCollection()
    },
    addNewProjectCollection () {
      const projectsRef = this.$db.collection('projects')
      projectsRef.add({
        projectName: this.projectName,
        pointOfContact: this.pointOfContact,
        scopeOfWork: this.scopeOfWork
      })
        .then((docRef) => {
          this.$q.notify({
            classes: 'text-weight-bold text-center',
            color: 'positive',
            message: `Successfully added a new project. Your new document is located here: ${docRef.path}`
          })
          this.resetForm()
        })
        .catch((error) => {
          this.$q.notify({
            classes: 'text-weight-bold text-center',
            color: 'negative',
            message: `Successfully add new project ${error}`
          })
          this.loading = false
        })
    },
    resetForm () {
      this.pointOfContact = ''
      this.projectName = ''
      this.scopeOfWork = ''
      this.loading = false
    }
  }
}
</script>

<style>
</style>
