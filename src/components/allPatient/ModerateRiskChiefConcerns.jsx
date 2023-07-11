import React from "react";
import { useState } from "react";
import { CustomDoughnut } from "../../commonComponent/CustomChart";
import RiskProfileDiagram from "./RiskProfileDiagram";
import RiskProfileGraph from "./RiskProfileGraph";

const status = ["Resolved", "Better", "Same", "Worse"]

const ModerateRiskChiefConcerns = ({ riskProfile = 0, userScore = [], totalScore = 0, symptoms }) => {
  const [graphShow, setGraphShow] = useState(true);
  const [graphFont, setGraphFont] = useState(true);

  console.log(symptoms, "- Symptoms");
  
  return (
    <>
      {/* <p className="nutrishift_overview">Risk Profile</p> */}
      
      <h6>Risk Profile</h6>
      <CustomDoughnut
        labels={['Nutrition', 'Stress', 'Hormonal health', 'Immune health', 'Food metabolism', 'Toxic Exposures']}
        points={[userScore[0]?.points || 0, userScore[1]?.points || 0, userScore[2]?.points || 0, userScore[3]?.points || 0, userScore[4]?.points || 0, userScore[5]?.points || 0]}
      />

      <h6 className="mt-3">Chief Concerns</h6>

      {/* <div className="row text-center">
        <div className="col-md-6 mtoday_wid">
          <p
            className="alltoday_txt1"
            style={{ fontWeight: graphFont ? "700" : null }}
            onClick={() => {
              setGraphShow(true);
              setGraphFont(true);
            }}
          >
            today
          </p>
        </div>
        <div className="col-md-6 mtoday_wid">
          <p
            className="all_history_txt1"
            style={{ fontWeight: graphFont ? null : "700" }}
            onClick={() => {
              setGraphShow(false);
              setGraphFont(false);
            }}
          >
            history
          </p>
        </div>
      </div> */}

      {/* <div className="row gx-1"> */}
        {/* <div className="col-md-12 d-flex align-items-center"> */}
          <div className="row mt-2">
            <div className="col-md-2 d-flex align-items-center">
              <p className={`m-0 moderate_txt1 ${riskProfile == 1 ?
                "text-success" : riskProfile == 0 ?
                  "text-success" :
                  riskProfile == 2 ?
                    "text-warning" : riskProfile == 3 ?
                      "text-danger" : null
                }`}>{riskProfile == 1 ?
                  "Mild Risk" :
                  riskProfile == 2 ?
                    "Moderate Risk" : riskProfile == 3 ?
                      "High Risk" : riskProfile == 0 ?
                        "Assignment Not Taken" : null}</p>
            </div>
            <div className="col-md-3 mtoday_wid">
              {riskProfile == 1 ? <img
                src="images/men_green.png"
                className="moderate_img1"
                alt="green"
              /> : riskProfile == 2 ? <img
                src="images/men_orange.png"
                className="moderate_img1"
                alt="orange"
              /> : riskProfile == 3 ? <img
                src="images/men_red.png"
                className="moderate_img1"
                alt="red"
              /> : null}
            </div>
            {/* <div className="col-md-8">
              {graphShow ? <RiskProfileDiagram userScore={userScore} totalScore={totalScore} /> : <RiskProfileGraph />}
            </div> */}
            <div className="col-md-7 mtoday_wid">
              {symptoms?.slice(0, 5).map((dt,i) => <div key={i} className="d-flex align-items-center mb-2"><img  style={{width: "20px", height: "20px"}} src={status.includes(dt.status) ? `/images/${(dt.status).toLowerCase()}.png` : dt.image} /><p className="mb-0 ms-2">{dt.name}</p></div>)}
              {/* {symptoms?.length>5 && <p>Show More</p>} */}
            </div>
          </div>
        {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default ModerateRiskChiefConcerns;
