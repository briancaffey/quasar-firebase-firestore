<template>
  <div class="q-pa-md">
    <h4 class="q-my-none">Welcome User</h4>
    <p class="text-body1 q-my-sm">
      Your registered email is: {{$fb.auth().currentUser.email}} <br>
      This email is being pulled directly from the firebase authentication object.
    </p>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {}
  }
}
</script>

<style>
</style>
