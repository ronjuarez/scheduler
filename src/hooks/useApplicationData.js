import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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
  }, [state]);

  return { state, setDay, bookInterview, cancelInterview }

}

