import React from "react";
import classNames from 'classnames';

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
}) {

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={time} 
      />
      {mode === EMPTY && 
        <Empty onAdd={() => transition(CREATE)}/>}
      {mode === CREATE  && (
        <Form interviewers={[]} onCancel={() => transition(EMPTY)} />
      )}
      {mode === SHOW && (
        <Show
          name={interview.student}
          interviewer={interview.interviewer}
        />
      )}

    </article>


  )



}