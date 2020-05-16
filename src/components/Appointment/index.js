import React from "react";


import Header from "./Header.js"
import Show from "./Show.js"
import Empty from "./Empty.js"
import Form from "./Form.js"
import './styles.scss';

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";



export default function Appointment ({
  time,
  interview,
  bookInterview,
  id,
  interviewers
}) {

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    console.log('int', interviewer)
    const interview = {
      student: name,
      interviewer
    }
    bookInterview(id, interview);
    transition('SHOW')
  };



  return (
    <article className="appointment">
      <Header time={time} 
      />
      {mode === EMPTY && 
        <Empty onAdd={() => transition(CREATE)}/>}
      {mode === CREATE  && 
        <Form 
          interviewers={interviewers} 
          onCancel={() => transition(EMPTY)} 
          onSave={save} />}    
      {mode === SHOW &&
        <Show
          name={interview.student}
          interviewer={interview.interviewer} />}
    </article>
  )
}