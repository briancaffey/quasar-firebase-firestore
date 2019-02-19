# Quasar Application v1-beta Firebase & Firestore Template

> A template for firebase & cloud firestore integration: **WIP as of 19 FEB 2019**

> Please note, that in order for this repo to work you must register a new project in the firebase console, and then follow the instructions in the repo to add Quasar's DotEnv app extension, and create your .env files accordingly.

> If you do not register a project and implement your key you will see the index page render, but all subsequent functionality will not work and you will see an error in the console:

 Features for this repo include:

- Connection to Firebase SDK (completed)
- Use of route guards to prevent unauthorized users to protected routes (completed)
- App initialization from firebase onAuthStatChanged method to allow for the authorized user object to complete before rendering protected routes (completed)
- Component renderings based on authorized users (completed)
- Connection for Cloud Firestore (completed)
- Implementation of Vuefire bindings (completed)
- Use of Quasar App Extension for firebase config -- DotEnv (completed)
- Data Table with expansion item fields, and CRUD operations on our data (WIP)
- e2e testing via cypress (WIP)
- Unit testing via jest (WIP)
