import { useState } from "react";


// This is the hook that manages the views of our appoint ment component.
export default function useVisualMode(initial) {
// mode state is the mode that indicates which view to change to, history is an array that
// stores the history for each individual apppointment.
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

// This function takes a mode and a boolean, if there is no boolean crate a copy of
// our history and includes our new mode, otherwise it make a copy of the history alone.
// The mode is set to the mode passed as an argument.
  const transition = (mode, replace) =>  {
    !replace ? setHistory([...history, mode]) : setHistory([...history]);
    return setMode(mode);
    } 

// This function make a copy of our history state array between the mode in it's inital index
// and the mode of our previous page.
  const back = () => {
    const currentHistory = [...history].slice(0, history.length -1)

    // If the currenthistory array is greater or equal to at least one mode then we set our
    // history to the currentHistory array and change the mode to the previous view.
    if (currentHistory.length >= 1) {
      setHistory(currentHistory);
      setMode(currentHistory[currentHistory.length - 1]);
    }
  };

  return { mode, transition, back }
};