# ng-v15-1-0-demo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.0.

## ABOUT PROJECT

- Managed folder structures
- Firebase services

## FIREBASE SERVICES

- Firebase authentication
- Realtime database
- Cloud messaging service - push notification and click redirection
- Firebase storage - file storage services
- Firebase deployment

## FIREBASE CONFIGURATION STEPS

Add firebase SDK `npm install firebase` init firebase into project.
Install firebase CLI `npm install -g firebase-tools`

Before hosting make sure you have selected your current project

- `firebase projects:list` - get list of projects and current selected project
- `firebase use project_id` - change current project

Deploy to firebase hosting

1. Sign in to Google

- `firebase login`

2. Initiate your project

- `firebase init`

3. When you’re ready, deploy your web app

- `firebase deploy`

After deploying, view your app at `ng-v15-1-0-demo.web.app`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
