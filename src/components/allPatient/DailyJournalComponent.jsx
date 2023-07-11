import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dailyJournalReflectQuestions } from "../../Utils/AllConstant";
import DailyJournalEmptyEatTable from "./DailyJournalEmptyEatTable";

const DailyJournalComponent = ({
  sleepData,
  eatData,
  moveData,
  reflectData,
  waterIntakeData,
  feelingData,
  symptomData,
  onChangeMealPlan,
  mealPlanData
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="daily_cardsleep">
            <p>Breakfast</p>

            <table className="table table-borderless">
              <tbody>
                {eatData.length > 0 ?
                  (
                    <>
                      {eatData.map((data) => {
                        return data.eat.breakfast ?
                          (<>
                            <tr>
                              <td className="table_title5">Ate:</td>
                              {
                                (data.eat.breakfast.length != 0 && data.eat.breakfast.food.length != 0) ?
                                  <td>
                                    {data.eat.breakfast.food.map((item, idx) => {
                                      return (<>{item} {idx + 1 < data.eat.breakfast.food.length && ', '} </>);
                                    })}
                                  </td> : <td>--</td>
                              }
                            </tr>
                            <tr>
                              <td className="table_title5">Time:</td>
                              <td>
                                {(data.eat.breakfast.length != 0) ?
                                  (<>{data.eat.breakfast.intakeTime}</>) : (<>--</>)
                                }</td>
                            </tr>
                            <tr>
                              <td className="table_title5">Place:</td>
                              <td>
                                {(data.eat.breakfast.length != 0) ?
                                  (<>{data.eat.breakfast.place}</>) : (<>--</>)
                                }</td>
                            </tr>
                            <tr>
                              <td className="table_title5">Hunger:</td>
                              <td>{(data.eat.breakfast.length != 0) ?
                                (<>{data.eat.breakfast.hungerLevel}</>) : (<>--</>)
                              }</td>
                            </tr>
                            <tr>
                              <td className="table_title5">Any Reactions:</td>
                              <td>{(data.eat.breakfast.length != 0 && data.eat.breakfast.reaction != "") ?
                                (<>{data.eat.breakfast.reaction}</>) : (<>No Reaction</>)
                              }</td>
                            </tr>
                          </>) :
                          <DailyJournalEmptyEatTable />
                      })}
                    </>
                  ) :
                  <DailyJournalEmptyEatTable />
                }
              </tbody>
            </table>
          </div>
        </div>


        <div className="col-md-6">
          <div className="daily_cardsleep">
            <p>Lunch</p>

            <table className="table table-borderless">
              <tbody>
                {eatData.length > 0 ?
                  (
                    <>
                      {eatData.map((data) => {
                        return data.eat.lunch ?
                          (<>
                            <tr>
                              <td className="table_title5">Ate:</td>
                              {
                                (data.eat.lunch.length != 0 && data.eat.lunch.food.length != 0) ?
                                  <td>
                                    {data.eat.lunch.food.map((item, idx) => {
                                      return (<>{item} {idx + 1 < data.eat.lunch.food.length && ', '} </>);
                                    })}
                                  </td> : <td>--</td>
                              }
                            </tr>
                            <tr>
                              <td className="table_title5">Time:</td>
                              <td>
                                {(data.eat.lunch.length != 0) ?
                                  (<>{data.eat.lunch.intakeTime}</>) : (<>--</>)
                                }</td>
                            </tr>
                            <tr>
                              <td className="table_title5">Place:</td>
                              <td>
                                {(data.eat.breakfast.length != 0) ?
                                  (<>{data.eat.breakfast.place}</>) : (<>--</>)
                                }</td>
                            </tr>
                            <tr>
                              <td className="table_title5">Hunger:</td>
                              <td>{(data.eat.lunch.length != 0) ?
                                (<>{data.eat.lunch.hungerLevel}</>) : (<>--</>)
                              }</td>
                            </tr>
                            <tr>
                              <td className="table_title5">Any Reactions:</td>
                              <td>{(data.eat.lunch.length != 0 && data.eat.lunch.reaction != "") ?
                                (<>{data.eat.lunch.reaction}</>) : (<>No Reaction</>)
                              }</td>
                            </tr>
                          </>) :
                          <DailyJournalEmptyEatTable />
                      })}
                    </>
                  ) :
                  <DailyJournalEmptyEatTable />
                }
              </tbody>
            </table>
          </div>
        </div>


        <div className="col-md-6">
          <div className="daily_cardsleep">
            <p>Snack</p>

            <table className="table table-borderless">
              <tbody>
                {eatData.length > 0 ?
                  (
                    <>
                      {eatData.map((data) => {
                        return data.eat.snacks ?
                          (<>
                            <tr>
                              <td className="table_title5">Ate:</td>
                              {
                                (data.eat.snacks.length != 0 && data.eat.snacks.food.length != 0) ?
                                  <td>
                                    {data.eat.snacks.food.map((item, idx) => {
                                      return (<>{item} {idx + 1 < data.eat.snacks.food.length && ', '} </>);
                                    })}
                                  </td> : <td>--</td>
                              }
                            </tr>
                            <tr>
                              <td className="table_title5">Time:</td>
                              <td>
                                {(data.eat.snacks.length != 0) ?
                                  (<>{data.eat.snacks.intakeTime}</>) : (<>--</>)
                                }</td>
                            </tr>
                            <tr>
                              <td className="table_title5">Place:</td>
                              <td>
                                {(data.eat.breakfast.length != 0) ?
                                  (<>{data.eat.breakfast.place}</>) : (<>--</>)
                                }</td>
                            </tr>
                            <tr>
                              <td className="table_title5">Hunger:</td>
                              <td>{(data.eat.snacks.length != 0) ?
                                (<>{data.eat.snacks.hungerLevel}</>) : (<>--</>)
                              }</td>
                            </tr>
                            <tr>
                              <td className="table_title5">Any Reactions:</td>
                              <td>{(data.eat.snacks.length != 0 && data.eat.snacks.reaction != "") ?
                                (<>{data.eat.snacks.reaction}</>) : (<>No Reaction</>)
                              }</td>
                            </tr>
                          </>) :
                          <DailyJournalEmptyEatTable />
                      })}
                    </>
                  ) :
                  <DailyJournalEmptyEatTable />
                }
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-6">
          <div className="daily_cardsleep">
            <p>Dinner</p>

            <table className="table table-borderless">
              <tbody>
                {eatData.length > 0 ?
                  (
                    <>
                      {eatData.map((data) => {
                        return data.eat.dinner ?
                          (<>
                            <tr>
                              <td className="table_title5">Ate:</td>
                              {
                                (data.eat.dinner.length != 0 && data.eat.dinner.food.length != 0) ?
                                  <td>
                                    {data.eat.dinner.food.map((item, idx) => {
                                      return (<>{item} {idx + 1 < data.eat.dinner.food.length && ', '} </>);
                                    })}
                                  </td> : <td>--</td>
                              }
                            </tr>
                            <tr>
                              <td className="table_title5">Time:</td>
                              <td>
                                {(data.eat.dinner.length != 0) ?
                                  (<>{data.eat.dinner.intakeTime}</>) : (<>--</>)
                                }</td>
                            </tr>
                            <tr>
                              <td className="table_title5">Place:</td>
                              <td>
                                {(data.eat.breakfast.length != 0) ?
                                  (<>{data.eat.breakfast.place}</>) : (<>--</>)
                                }</td>
                            </tr>
                            <tr>
                              <td className="table_title5">Hunger:</td>
                              <td>{(data.eat.dinner.length != 0) ?
                                (<>{data.eat.dinner.hungerLevel}</>) : (<>--</>)
                              }</td>
                            </tr>
                            <tr>
                              <td className="table_title5">Any Reactions:</td>
                              <td>{(data.eat.dinner.length != 0 && data.eat.dinner.reaction != "") ?
                                (<>{data.eat.dinner.reaction}</>) : (<>No Reaction</>)
                              }</td>
                            </tr>
                          </>) :
                          <DailyJournalEmptyEatTable />
                      })}
                    </>
                  ) :
                  <DailyJournalEmptyEatTable />
                }
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-6">
          <div className="daily_cardsleep">
            <p>Sleep</p>

            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td className="table_title5">Set Bed Time:</td>
                  {sleepData.length != 0 ?
                    sleepData.map((item) => {
                      return (<td key={item._id}>{item.bedTime}</td>);
                    }) : <td> -- </td>
                  }
                </tr>
                <tr>
                  <td className="table_title5">Actual Bed Duration</td>
                  {sleepData.length != 0 ?
                    sleepData.map((item) => {
                      return (<td key={item._id}>{item.duration}</td>);
                    }) : <td> -- </td>
                  }
                </tr>
                <tr>
                  <td className="table_title5">Fall Asleep:</td>
                  {sleepData.length != 0 ?
                    sleepData.map((item) => {
                      return (<td key={item._id}>{item.quality}</td>);
                    }) : <td> -- </td>
                  }
                </tr>
                <tr>
                  <td className="table_title5">Fall sleep on:</td>
                  {sleepData.length != 0 ?
                    sleepData.map((item) => {
                      return (<td key={item._id}>{item.asleepOn}</td>);
                    }) : <td> -- </td>
                  }
                </tr>
                <tr>
                  <td className="table_title5">Overall Sleep was:</td>
                  {sleepData.length != 0 ?
                    sleepData.map((item) => {
                      return (<td key={item._id}>{item.pattern}</td>);
                    }) : <td> -- </td>
                  }
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-6">
          <div className="daily_cardsleep">
            <p>Reflect</p>

            <table className="table table-borderless">
              <tbody>
                {reflectData.length > 0 ?
                  reflectData.map((data) => {
                    return data.userReflectQuestionIds.map((item) => {
                      return (
                        <>
                          <tr>
                            <td className="table_title5">{item.question}</td>
                          </tr>
                          <tr className="table_para543">
                            <td>{item.answer}</td>
                          </tr>
                        </>
                      );
                    })
                  }) :
                  (<>
                    {dailyJournalReflectQuestions.map((item) => {
                      return (
                        <>
                          <tr>
                            <td className="table_title5">{item}</td>
                          </tr>
                          <tr className="table_para543">
                            <td>{''}</td>
                          </tr>
                        </>
                      );
                    })}
                  </>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-6">
          <div className="daily_cardsleep">
            <p>Move</p>

            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td className="table_title5">Fitness goal:</td>
                  {moveData.length != 0 ?
                    moveData.map((item) => {
                      return (<td key={item._id}>{item.description}</td>);
                    }) : <td> -- </td>
                  }
                </tr>
                {/* <tr>
                  <td className="table_title5">Time:</td>
                  {moveData.length != 0 ?
                    moveData.map((item) => {
                      return (<td key={item._id}>{item.move_time}</td>);
                    }) : <td> -- </td>
                  }
                </tr> */}
                <tr>
                  <td className="table_title5">Duration:</td>
                  {moveData.length != 0 ?
                    moveData.map((item) => {
                      return (<td key={item._id}>{item.workoutDuration}</td>);
                    }) : <td> -- </td>
                  }
                </tr>
                <tr>
                  <td className="table_title5">Calorie(kg):</td>
                  {moveData.length != 0 ?
                    moveData.map((item) => {
                      return (<td key={item._id}>{item.calories}</td>);
                    }) : <td> -- </td>
                  }
                </tr>
                <tr>
                  <td className="table_title5">Exercise type:</td>
                  {moveData.length != 0 ?
                    moveData.map((item) => {
                      return (<td key={item._id}>{item.category}</td>);
                    }) : <td> -- </td>
                  }
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-6">
          <div className="daily_cardsleep">
            <p>Journals</p>

            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td className="table_title5">Water:</td>
                  {waterIntakeData.length != 0 ?
                    waterIntakeData.map((item) => {
                      return (<td key={item._id}>{item.glassCount} Glass</td>);
                    }) : <td> 0 Glass </td>
                  }
                </tr>
                <tr>
                  <td className="table_title5">Feeling:</td>
                  {feelingData.length != 0 ?
                    feelingData.map((item) => {
                      return (<td key={item._id}>{item.feeling}</td>);
                    }) : <td> -- </td>
                  }
                </tr>
                <tr>
                  <td className="table_title5">Symptoms:</td>
                  {(symptomData != null && symptomData.length != 0) ?
                    (<td>
                      {symptomData.symptoms.map((item, idx) => {
                        return (<>{item.name} {idx + 1 < symptomData.symptoms.length && ', '}</>);
                      })}</td>) : <td> -- </td>
                  }
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-6">
          <div className="daily_cardsleep">
            <p>Meal Plan</p>

            <table className="table table-borderless">
              <tbody>
                <tr>
                  {mealPlanData.length != 0 ?
                    mealPlanData.map((item) => {
                      return (
                        <td className="diet_meal_plan_text" key={item.mealPlanId._id}>{item.mealPlanId.mealPlanName}</td>
                      );

                    }) : <td className="diet_meal_plan_text"> -- </td>
                  }
                </tr>
                <tr>
                  {/* <td className="table_title5"></td> */}
                  <td>
                    <button
                      className="btn btn-primary btn-custom"
                      onClick={onChangeMealPlan}
                      data-bs-toggle="modal"
                      data-bs-target="#chooseMealPlan">
                      change meal plan
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-custom-light"
                      onClick={() => navigate(`/viewmealplan?mealplanId=${mealPlanData[0]?.mealPlanId._id}`)}>
                      {`View meal plan`}
                    </button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyJournalComponent;
