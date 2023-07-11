import React from "react";

const CareTeamStatus = () => {
  return (
    <>
      <div className="careteamstatus mt-4 text-center pt-4 pb-3">
        <p className="setstatus_team mt-2">Set status of care team group</p>
        <p className="careteam_switchtext">
          Active
          <label class="switch ms-4 me-4">
            <input type="checkbox" />
            <span class="slider round"></span>
          </label>
          In-active
        </p>
      </div>
    </>
  );
};

export default CareTeamStatus;
