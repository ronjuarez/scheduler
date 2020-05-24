

// This is a function that takes two parameters the state object and the 
// day state which is set to Monday as default. Here is how it works.
//
// 1. It takes the days array that is stored in the state object and filters it to only
//    return the day with the name property that matches the day in the days array and stores this 
//    value in our daysFilteredRes variable.
//
// 2. a) If the length of the daysFilteredRes array is not 0 then select the day at index 0, which should be
//    our only day (becuase each day has a unique name). 
//    b) It then takes the array stored in the appointments property and mutates each item of
//    our appointments into individual arrays and stores them in the appointments property of 
//    our state.
//
//    b) Else return an empty array.
//
// 3  We store the value that is returned in this condition as the value of variable sortedApp and return it as
//    the final value of getAppointmentsForDay.

export function getAppointmentsForDay(state, day) {
  const daysFilteredRes = state.days.filter(days => days.name === day);

  const sortedApp = daysFilteredRes.length !== 0 ? daysFilteredRes[0].appointments.map((appItem) => state.appointments[appItem]) : [];
  
  return sortedApp;
}

// This is a function that takes two parameters the state object and the 
// day interview object which is set to Monday as default. Here is how it works:
//
// 1. a) If no interview object is passed it returns null. Otherwise if the 
//    interview item does exist we're going to create an object that contains two
//    properties.
//    b) The first property is a student key that takes the value of the student property
//    of our interview object. The second property is an interviewer key that takes 
//    the value of the state object's interviewers property and returns the value at
//    key of the value of our interviewer property of our interview object.
//
// 2. It stores the resulting object of the function in a variable called intDetails
//    and returns it as the result of the function call.    
export function getInterview(state, interview) {
  const intDetails = !interview ? null : { student: interview.student, interviewer: state.interviewers[interview.interviewer] };
  return intDetails;
};

// This function is identical to getAppointmentsByDay except it works with interview values.
export function getInterviewersForDay(state, day) {
  const daysFilteredRes = state.days.filter(days => days.name === day);

  const sortedInt = daysFilteredRes.length !== 0 ? daysFilteredRes[0].interviewers.map((intItem) => state.interviewers[intItem]) : [];
  
  return sortedInt;
}