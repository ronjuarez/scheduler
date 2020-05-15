import { useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

 
  const transition = (mode, replace) =>  {
    !replace ? setHistory([...history, mode]) : setHistory([...history]);
    return setMode(mode);
    } 

  const back = () => {
    const currentHistory = [...history].slice(0, history.length -1)

    if (currentHistory.length >= 1) {
      setHistory(currentHistory);
      setMode(currentHistory[currentHistory.length - 1]);
    }
  };

  return { mode, transition, back }
};