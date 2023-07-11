import React from "react";
import { setUserGoalQuestion } from "../../Utils/AllConstant";

const UserGoalComponent = ({goal}) => {
  return (
    <>
        <h6>
          Write Down Your new goals and days/times you will COMMIT to reaching them.
        </h6>
        <div className="f_div_textarea mt-4">
          <ol>
            {goal.length? goal?.map((item)=>{
              return <li>{item} </li>
            }):  <div style={{marginTop: 10}}>Goals are not setuped yet.</div>}
          </ol>
        </div>
    </>
  );
};

export default UserGoalComponent;



export const UserGoalAnswerComponent = ({goalQuestions}) => {
  return (
    <>
    { 
      setUserGoalQuestion?.map((item,index)=>{
      return<> <h6 className="mt-4">
          {setUserGoalQuestion[index]}
        </h6>

        {/* <textarea
          name=""
          className="mt-3"
          rows="2"
          value=  {item.answer}
          cols="1"
        ></textarea> */}
         <input
          type="text"
          className="mt-3"
          value={goalQuestions[index] || "Not Filled"}
          disabled={true}
        /> 
        </>
    })}
    </>
  );
};
