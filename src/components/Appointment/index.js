import React from "react";
import classNames from 'classnames';

import Header from "./Header.js"
import Show from "./Show.js"
import Empty from "./Empty.js"
import './styles.scss';


export default function Appointment ({
  time,
  interview,
  onAdd
}) {


  return (
    <article className="appointment">
      <Header time={time} 
      />
      {interview ?
        (<Show
          student={interview.student}
          interviewer={interview.interviewer}
        />) :
        (<Empty
          onAdd={onAdd}
        />)}
    </article>


  )



}