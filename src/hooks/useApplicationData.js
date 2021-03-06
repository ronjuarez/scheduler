import { useState, useEffect } from "react";
import axios from "axios";

// This custom hook is the beiung used to manage the overall data of our app.
export default function useApplicationData() {

// Here we are able to set multiple states by setting our default state to an object with all
// the items we are setting state for as keys and defualts as thier values.  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

// This was likely the most challenging part of the assignment, we wanted to create a function
// that updated the spots wiothout having to recall the data from our axios requests. This
// function updates the spots using vanilla js and creates a copy of the state and overwrites
// the current state. Doing this anyother way was culminating in many bugs and wouldn't leverage
// REACT properly.
  function spotsRemaining (state, appointments) {
    let dayIndex;
          
    for (let match in state.days){
      if (state.day === state.days[match].name){
        dayIndex = match
        break;
      } 
    }

    let day = {...state.days[dayIndex]}
    
    let totalInterviews = 0

    for(let app_id of day.appointments) {
      if(appointments[app_id].interview){
        totalInterviews++
      }
    }
    
    let spotsAvailable = 5 - totalInterviews;

    let updatedDays = [...state.days];

    day.spots = spotsAvailable;

    updatedDays[dayIndex] = day;

    return updatedDays
  }

// This function books an interview using .put and creates a copy of the updated state of the
// appointment to overwrite the current state we also call spots remaining to update spots.
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
     .put(`http://localhost:8001/api/appointments/${id}`, appointment)
     .then(() => { 
        setState({
          ...state,
          appointments,
          days : spotsRemaining(state, appointments)
        })
      })
    };

// This function cancels an interview using .delete and creates a copy of the updated state of the
// appointment to overwrite the current state we also call spots remaining to update spots.    
    function cancelInterview(id) {
    
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      return axios
       .delete(`http://localhost:8001/api/appointments/${id}`)
       .then(() => {
        setState({
          ...state,
          appointments,
          days : spotsRemaining(state, appointments)
        })
      })
    };
    
  const setDay = day => setState({ ...state, day });

  // This hook is called a useEffect and it is used to create side effects in our components.
  // Here we are using it to make our data requests from our scheduler API using a Promise.all().
  // Promise.all() can create multiple async requests at the ame time and stores the results 
  // in an array response which we assign the variable name dbList in our .then(). We use the 
  // respones to set the values of our states. We also assign our default state to ...prev and 
  // we use state as a dependancy in our hook.
  //
  // EDIT: Putting state through as a dependancy cuases an infinite loop. We placed it there initially
  // becuase we had an error message saying we should do so.

  useEffect(() => {
    Promise.all([
    axios({
      method: "GET",
      url: `http://localhost:8001/api/days`}),
    axios({
      method: "GET",
      url: 'http://localhost:8001/api/appointments'}),
    axios({
      method: "GET",
      url: `http://localhost:8001/api/interviewers`}),
    ])
      .then((dbList) => {
        setState(prev => ({...prev, days: dbList[0].data, appointments: dbList[1].data, interviewers: dbList[2].data}))
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  return { state, setDay, bookInterview, cancelInterview }

}

