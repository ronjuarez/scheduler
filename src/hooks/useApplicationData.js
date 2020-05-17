import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function spotsRemaining (id) {
    let totalDays = state.days;
    for (let day of totalDays) {
      let { spots } = day;
      id === day.appointments.id ? ++spots : --spots; 
    }
  };

  function bookInterview(id, interview) {
    spotsRemaining(id)
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
          appointments
        })
      })
    }

    function cancelInterview(id) {
      spotsRemaining(id)      
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
          appointments
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
        setState({ days: dbList[0].data, appointments: dbList[1].data, interviewers: dbList[2].data })
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  return { state, setDay, bookInterview, cancelInterview }

}