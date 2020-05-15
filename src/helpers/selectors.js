export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(days => days.name === day);

  const sortedApp = filteredDays.length !== 0 ? filteredDays[0].appointments.map((appItem) => state.appointments[appItem]) : [];
  
  return sortedApp;
}

export function getInterview(state, interview) {
  const intDetails = !interview ? null : { student: interview.student, interviewer: state.interviewers[interview.interviewer] };
  return intDetails;
};

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter(days => days.name === day);

  const sortedInt = filteredDays.length !== 0 ? filteredDays[0].interviewers.map((intItem) => state.interviewers[intItem]) : [];
  
  return sortedInt;
}