import React from "react";
import DayListItem from 'components/DayListItem'




export default function DayList({ 
  days,
  day,
  setDay 
}) {
    const dayListItems = days.map(dayItem => (
      <DayListItem 
        id={dayItem.id}
        name={dayItem.name} 
        spots={dayItem.spots} 
        selected={dayItem.name === day}
        setDay={setDay}
      /> )) 
      return (
      <ul>
        { dayListItems }
      </ul>
    );
  }