import React from "react";

const OnProcess = ({user , score}) => {
  console.log(score);
  return (
    <>
      <div className="onprocess99 mt-4">
        <div className="onprocess99_cardouter text-center">
          <p>Membership</p>
          <div className="onprocess99_cardinner">
            {user.status == "active" && user.onBoarding ? 
            (<>
              <img src="images/member.png" alt="" />
              <p>Active</p>
            </>):(<>
              <img src="images/user-inactive.png" alt="" />
              <p>Inactive</p>
            </>)}
          </div>
        </div>

        <img src="images/arr12.png" className="patient_arrow_one" alt="" />

        <div className="onprocess99_cardouter text-center">
          <p>Forms</p>
          <div className="onprocess99_cardinner">
            {score.length > 0 && score[0].totalScore >0 ? (<>
              <img src="images/form-complete.png" alt="" />
              <p>Complete</p>
            </>): 
            (<>
              <img src="images/forms.png" alt="" />
              <p>Incomplete</p>
            </>)
            }
          </div>
        </div>

        <img src="images/arr12.png" className="patient_arrow_one" alt="" />

        <div className="onprocess99_cardouter text-center">
          <p>Billing</p>
          <div className="onprocess99_cardinner">
            <img src="images/billing.png" alt="" />
            <p>Paid</p>
          </div>
        </div>

        <img src="images/arr12.png" className="patient_arrow_one" alt="" />

        <div className="onprocess99_cardouter text-center">
          <p>Care Plan</p>
          <div className="onprocess99_cardinner">
            <img src="images/care.png" alt="" />
            <p>Active</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnProcess;
