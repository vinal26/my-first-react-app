import React from "react";
import CareTeamBox from "./CareTeamBox";
import CareTeamChart from "./CareTeamChart";
import CareTeamList from "./CareTeamList";

const CareTeamComponent = () => {
  const renderSearchHeader = () => {
    return (
      <div className="d-flex mt-5 mb-3 ">
        <div className="w-100">
          <h4>My Care Team</h4>
          <p>
            View team information, add or assign teams and team members to
            groups or individuals.
          </p>
        </div>
      </div>
    );
  };
  return (
    <>
      {renderSearchHeader()}

      <CareTeamBox />
      <CareTeamChart />
      <CareTeamList />
    </>
  );
};

export default CareTeamComponent;
