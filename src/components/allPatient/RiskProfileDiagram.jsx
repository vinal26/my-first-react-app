import React from "react";
import { ReactComponent as PatientOverviewSvg } from "../../svg/PatientOverviewSvg.svg"

const RiskProfileDiagram = ({userScore=[], totalScore=0}) => {
  return (
    <>
      <div className="position-relative">
        <PatientOverviewSvg />
        <span className="risk-middle-text">{totalScore}/360</span>
        <span className="risk_common nutri_risk">{userScore[0]?.points || 0}</span>
        <span className="risk_common toxin_removal">{userScore[5]?.points || 0}</span>
        <span className="risk_common food_mata">{userScore[4]?.points || 0}</span>
        <span className="risk_common imune_defense">{userScore[3]?.points || 0}</span>
        <span className="risk_common harmonal_bal">{userScore[2]?.points || 0}</span>
        <span className="risk_common stress_response">{userScore[1]?.points || 0}</span>
      </div>

      {/* <div>
        <div className="risk-middle-div-wrap">
          <div className="risk-middle-div">
            <span>NutriShift</span>
            <span>Score</span>
            <span className="risk-middle-text">90/360</span>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default RiskProfileDiagram;
