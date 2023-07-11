import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import AppointmenTable from "./AppointmenTable";

const TodayAppointmentComponents = () => {
  return (
    <>
     
          <AppointmenTable />
       
    </>
  );
};

export default TodayAppointmentComponents;
