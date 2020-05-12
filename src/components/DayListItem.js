import React from "react";
import classNames from 'classnames';
import 'components/DayListItem.scss';

export default function DayListItem({ 
  name,
  spots,
  selected,
  setDay
}) {
   const dayClass = classNames("day-list__item",{
      'day-list__item--selected': selected,
      'day-list__item--full': spots === 0,
   })
   const formatSpots = (spot) => {
    const pluralResult = "spots remaining"
    const result = "spot remaining"
    if (spot === 0) {
      return `no ${pluralResult}`
    } 
    return spot === 1 ?  `${spot} ${result}` : `${spot} ${pluralResult}`
  }
  return (
    <li 
      onClick={() => {setDay(name)}} 
      className={dayClass}>
      <h2 className="text--regular">{ name }</h2> 
      <h3 className="text--light">{ formatSpots(spots) }</h3>
    </li>
  );
}