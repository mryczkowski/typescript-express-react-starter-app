# Typescript Express React Starter App

A starter app using Typescript, Express, and React, running in docker containers.

## Description

An opinionated starter app set up as a single page web app, with a REST API backend. It comes with a fully functional user registration and login demo, which also outlines the structure of the app. Authentication is handled with
JSON Web Tokens. Some key technologies in use are:

- MySQL
- Redis
- Express
- Typescript
- React
- React-Router
- Redux

## Usage

1. Copy `.env.example` as `.env` and set variables accordingly
2. Ensure you have Docker running on your machine
3. From the project root directory, run `docker-compose build`, then `docker-compose up`

The app should now be available on your machine at `http://localhost:3000`!

Files from the express app and react app are watched and mapped to the containers, so there's no need to restart containers after changing the code. To run the app again after stopping, all you need to do is `docker-compose up`.

#### Managing dependencies ####

Note there are 2 separate `package.json` files for managing dependencies for the express app and react app separately.

## User registration demo

Once you've got the app running, you should see a crude example of a home page with options for user
registration and login. The registration and login flow is fully functional, and you should be able to see
the user data in the database after registering. 

#### Styling ####

An example usage of CSS Modules is present in the example code, but you are free to use whatever styling solution
and/or component libraries you wish, but none were included in this project

**License:** [MIT License](https://opensource.org/licenses/mit-license.php)

**Author:** [Mike Ryczkowski](https://github.com/mryczkowski)