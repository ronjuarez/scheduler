# Scheduler Project

Scheduler is a single-page app, built with REACT, that allows users to build a schedule of appointments that update dynamically. It uses [scheduler-api](https://github.com/ronjuarez/scheduler-api) as it's backend.

---

## Front-End Tech Stack

* ReactJS 
* ClassNames
* Axios

## Back-End Tech Stack
* Node.js
* Express
* PostgreSQL

---

# To run scheduler locally:
1. Clone the [scheduler-api](https://www.github.com/ronjuarez/scheduler-api) backend repo.
2. Clone the [scheduler](https://www.github.com/ronjuarez/LHL-Mar30Cohort-scheduler) frontend repo.
3. Install API dependencies by running `npm install`
4. Create a DB in `psql` with the command `CREATE DATABASE scheduler_development;`.
5. Copy the `.env.example` file to `.env.development` and fill the necessary PostgreSQL configuration.
6. Run the API server with `npm start`.
7. Navigate to `http://localhost:8001/api/debug/reset` or by making a `GET` request from the command line using `curl http://localhost:8001/api/debug/reset`.
8. Install scheduler dependencies by running `npm install`. 
9. Run the app using `npm start

---

# Here is a demonstration of scheduler's main features:

## On LOAD you will see an app containing a list of days with with 5 available appointment slots from between the hours of 12pm - 5pm. You can update each individual appointment and either changing the interviewer or the name of the appointment maker. You can also delete an appointment, whenevcr you do it updates the number of spots left for that day dynamically.

## You can also schedule an appointment, if there are no spots available it is reflected in the styling and formatting of the daylist component.
