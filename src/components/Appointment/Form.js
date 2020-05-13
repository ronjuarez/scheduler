import React, { useState } from "react";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";



export default function Form({
  name,
  interviewers,
  interviewer,
  onSave,
  onCancel,

}) {

  const [nameState, setName] = useState(name || "");
  const [intState, setInterviewer] = useState(interviewer || null);       

  const reset = () => {
    setName(""); 
    setInterviewer(null);
  }
  
  const cancel = () => {
    reset();
    onCancel();
  }


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={nameState}
            onChange={event => setName(event.target.value)}
            type="text"
            placeholder="Enter Student Name"
            />
        </form>
        <InterviewerList 
        interviewers={interviewers} 
        interviewer={intState} 
        onChange={setInterviewer} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() => onSave()}>Save</Button>
        </section>
      </section>
    </main>
  );
}