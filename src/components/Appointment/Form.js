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
// We set the default state values as empty and null for the two fields that we use to create
// our appointments. Using the || operator allows uus to reuses this view for Edit mode. 
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


// We use onChange event listeners to change nameState and intState using thier partner functions.

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
          setInterviewer={setInterviewer}
          onChange={(event) => setInterviewer(event.target.value)} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() => onSave(nameState, intState)}>Save</Button>
        </section>
      </section>
    </main>
  );
}