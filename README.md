# Quasar Application v1-beta template

> A template for firebase & cloud firestore integration: **WIP as of 16 FEB 2019**

Please note, that in order for this repo to work you must register a new project in the firebase console, and then add the api key in the dev section of: ``/utils/firebase/configs.js``

If you do not register a project and implement your key you will see the index page render, but all subsequent functionality will not work and you will see an error in the console:

> `Your API key is invalid, please check you have copied it correctly.`

 Features for this repo include:

- Connection to firebase sdk (completed)
- Use of route guards to prevent unauthorized users to protected routes (completed)
- App initialization from firebase onAuthStatChanged method to allow for the authorized user object to complete before rendering protected routes (completed)
- Component renderings based on authorized users (completed)
- Connection for cloud firestore (WIP)
- Implementation of vue fire bindings (WIP)
- e2e testing via cypress (WIP)
- Unit testing via jest (WIP)
