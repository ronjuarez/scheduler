import React from "react";
import classNames from 'classnames';
import 'components/InterviewerListItem.scss';

export default function InterviewerListItem({ 
  id,
  name,
  avatar,
  selected,
  setInterviewer
}) {
   const intClass = 
    selected ? classNames('interviewers__item--selected') : classNames('interviewers__item');


  return (
    <li key={id} className={intClass}
      onClick={setInterviewer}
    >
    <img
      className="interviewers__item-image"
      src={avatar}
      alt={name}
    />
    {selected && name}
  </li>
  );
}





