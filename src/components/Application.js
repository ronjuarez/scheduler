

//this assignment was written almost entirely in ES6 syntax which was a welcome change


// this is the first project we have ever done using REACT library. 
import React from "react";

import "components/Application.scss";

// REACT refers to not just a library but a framework that consists of two main concepts that we had not previously
// been introduced to. These concepts are known as components and hooks. 
// Below I am importing two components which compose the entirety of this scheduler app.

// A list of available days where an interview can be scheduled with how many spots are remaining in each day.
import DayList from "components/DayList";

// A list of dynamic UI appointment elements, each of which provides a user with an experience where they can add/delete/edit
// a post.
import Appointment from "components/Appointment";

// These are helper functions that I use to manage the state of the application each of these is a selector function so
// we created a directory to store them in called selectors.
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

// This is a REACT hook that was built using the set state hook and was one of the most challenging parts of 
// this assignment.
import  useApplicationData from "hooks/useApplicationData.js";



export default function Application(props) {

// Destructuring and call of the useApplicationData function.
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData()


// Appointments and interviews our found using the following selector functions 
// We pass the state object and its day properties as arguements
// Each of these will return a list of hwat they are looking for for a given day.
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);


// We create the schedule by mapping over each of our appointment objects and returning an 
// array of Appointment Compoinents that are built using the props that are being
// passed along from appointment object. We use another selector called getInterview and pass
// it the state object and the interview property of our appointment. We use this to get 
// the interview details for each appointment.
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

 //This is the layout of the project provided by LHL.
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"> 
        {/*This component displays available days to meet during the week and let's us select them*/}
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      {/* This is where we display our schedule*/}
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
