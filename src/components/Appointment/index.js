import React from "react";


import Header from "./Header.js"
import Show from "./Show.js"
import Empty from "./Empty.js"
import Form from "./Form.js"
import Status from "./Status.js"
import confirm from "./Confirm.js"
import './styles.scss';

import useVisualMode from "hooks/useVisualMode";
import Confirm from "./Confirm.js";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING"



export default function Appointment ({
  time,
  interview,
  bookInterview,
  id,
  cancelInterview,
  interviewers
}) {

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING);

    bookInterview(id, interview)
    .then(() => {
      transition(SHOW, true);
    })
  };


  function del() {
    transition(DELETING);
    
    cancelInterview(id)
    .then(() => {
      transition(EMPTY, true);
    })
  }

  return (
    <article className="appointment">
      <Header time={time} 
      />
      {mode === EMPTY && 
        <Empty onAdd={() => transition(CREATE)}/>}
      {mode === CREATE && 
        <Form 
          interviewers={interviewers} 
          onCancel={() => transition(EMPTY)} 
          onSave={save} />}    
      {mode === SHOW &&
        <Show
          name={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM, true) } />}
      {mode === SAVING &&
        <Status 
          message="Saving..."/>}
      {mode === DELETING &&
        <Status 
          message="Deleting..."/>}
      {mode === CONFIRM &&
        <Confirm 
          message="Would you like to delete the appointment?"
          onCancel={() => back()}
          onConfirm={del}
        /> }
    </article>
  )
}