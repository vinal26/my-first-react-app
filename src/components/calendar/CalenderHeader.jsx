import React from 'react';
import { BiChevronsLeft,BiChevronsRight } from "react-icons/bi";

export const CalenderHeader = ({ onNext, onBack, dateDisplay }) => {
  return(
    <div id="header_calender">
      <div id="monthDisplay">{dateDisplay}</div>
      <div>
        <button onClick={onBack} id="backButton"><BiChevronsLeft/></button>
        <button onClick={onNext} id="nextButton"><BiChevronsRight/></button>
      </div>
    </div>
  );
};