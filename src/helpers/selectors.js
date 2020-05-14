export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(days => days.name === day);

  const sortedApp = filteredDays.length !== 0 ? filteredDays[0].appointments.map((appItem) => state.appointments[appItem]) : [];
  
  return sortedApp;
}