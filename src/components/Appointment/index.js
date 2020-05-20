import React from "react";


import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import Form from "./Form.js";
import Status from "./Status.js";
import Confirm from "./Confirm.js";
import Error from "./Error.js";
import './styles.scss';

import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";



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
    if (interviewer !== null && name !== "") {

      const interview = {
        student: name,
        interviewer
      }
      transition(SAVING);

      bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() =>{
        transition(ERROR_SAVE, true)
      })
    };
  };


  function del() {
    transition(DELETING, true);
    
    cancelInterview(id)
    .then(() => {
      transition(EMPTY);
    })
    .catch(() =>{
      transition(ERROR_DELETE, true)
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
          onDelete={() => transition(CONFIRM)} 
          onEdit={() => transition(EDIT)} />}
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
      {mode === EDIT && 
        <Form
          name={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()} 
        /> }
        {mode === ERROR_SAVE &&
          <Error 
            message={"Whoops! There was an error saving your appointment!"}
            onClose={() => back()}
          />}
        {mode === ERROR_DELETE &&
          <Error
            message={"Whoops! There was an error deleting your appointment!"}
            onClose={() => back()}
          />}
    </article>
  )
}