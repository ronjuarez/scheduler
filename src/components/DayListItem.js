import React from "react";
import classNames from 'classnames';
import 'components/DayListItem.scss';

export default function DayListItem({ 
  id,
  name,
  spots,
  selected,
  setDay
}) {
   const dayClass = classNames("day-list__item",{
      'day-list__item--selected': selected,
      'day-list__item--full': spots === 0,
   })

// This function takes in the spots available and formats the string that appears beside it to 
// be gramatically correct.
   const formatSpots = (spots) => {
    const pluralResult = "spots remaining"
    const result = "spot remaining"
    if (spots === 0) {
      return `no ${pluralResult}`
    } 
    return spots === 1 ?  `${spots} ${result}` : `${spots} ${pluralResult}`
  }
  return (
    <li
    // These items need keys in order for react to render our app without warnings.
      key={id} 
      onClick={() => {setDay(name)}}
      data-testid="day"
      className={dayClass}>
      <h2 className="day-name--regular">{ name }</h2> 
      <h3 className="day-name--light">{ formatSpots(spots) }</h3>
    </li>
  );
}