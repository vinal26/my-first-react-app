import React from "react";
import { emptyListText } from "../../Utils/AllConstant";

const LifeStyleComponent = ({ lifeStyleDetail }) => {
  const emptyAffirmation = () => {
    return (
      <div
        className="nutrishift_overview"
        style={{ textTransform: "none", color: "#8f8f8f", fontSize: 16 }}
      >
        {emptyListText.lifestyleAffirmationEmpty}
      </div>
    );
  };

  const emptyCheckList = () => {
    return (
      <div
        className="nutrishift_overview"
        style={{ textTransform: "none", color: "#8f8f8f", fontSize: 16 }}
      >
        {emptyListText.lifestyleCheckListEmpty}
      </div>
    );
  };

  const renderAffirmationItem = (value) => {
    return (<li style={{ fontSize: 16, fontWeight: 500 }}>{value}</li>)
  }

  const renderCheckListItem = (item) => {
    return (<>
      <div className="btn-group">
        <p className="affir_checkbox">
          <input
            type="checkbox"
            disabled
            checked={item.answer === "yes" || false}
          />
        </p>
        <p className="affir_checkbox" style={{ fontSize: 16 }}>{item.question}</p>
      </div>
      <br />
    </>)
  }

  return (
    <>
      <div className="rowlifestyle mt-4">
        <div className="column ">
          <div className="lifestylesecond flex-1">
            <p>Sleep</p>
            <hr />
            <p>Affirmations</p>
            <ol>
              {lifeStyleDetail?.sleep?.affirmations?.map((item) => {
                return renderAffirmationItem(item.affirmation);
              })}
              {!lifeStyleDetail?.sleep?.affirmations?.length &&
                emptyAffirmation()}
            </ol>
            <p>Checklist</p>
            <ul>
              {lifeStyleDetail?.sleep?.questions?.map((item) => {
                return (renderCheckListItem(item))
              })}
              {!lifeStyleDetail?.sleep?.questions?.length && emptyCheckList()}
            </ul>
            <div className="btn-group margin_top_20">
              <p className="affir_checkbox">
                <input
                  type="checkbox"
                  disabled
                  checked={lifeStyleDetail?.sleep?.dailyInput || false}
                />
              </p>
              <p className="affir_checkbox" style={{ fontSize: 16 }}>{"Make as Mandatory"}</p>
            </div>
            <br />
          </div>
        </div>

        <div className="column">
          <div className="lifestylesecond flex-1">
            <p>Connect</p>
            <hr />
            <p>Affirmations</p>
            <ol>
              {lifeStyleDetail?.connect?.affirmations?.map((item) => {
                return renderAffirmationItem(item.affirmation);
              })}
              {!lifeStyleDetail?.connect?.affirmations?.length &&
                emptyAffirmation()}
            </ol>

            <p>Checklist</p>

            <ul>
              {lifeStyleDetail?.connect?.questions?.map((item) => {
                return (
                  <>
                    <div className="btn-group">
                      <p className="affir_checkbox">
                        <input
                          type="checkbox"
                          disabled
                          checked={item.answer === "yes" || false}
                        />
                      </p>
                      <p className="affir_checkbox" style={{ fontSize: 16 }}>{item.question}</p>
                    </div>
                    <br />
                  </>
                );
              })}
              {!lifeStyleDetail?.connect?.questions?.length && emptyCheckList()}
            </ul>
            <div className="btn-group margin_top_20">
              <p className="affir_checkbox">
                <input
                  type="checkbox"
                  disabled
                  checked={lifeStyleDetail?.connect?.dailyInput || false}
                />
              </p>
              <p className="affir_checkbox" style={{ fontSize: 16 }}>{"Make as Mandatory"}</p>
            </div>
            <br />
          </div>
        </div>

        <div className="column">
          <div className="lifestylesecond flex-1">
            <p>Reflect</p>
            <hr />

            <table class="table table-borderless">
              <tbody>
                {lifeStyleDetail?.reflect?.questions?.map((item) => {
                  return (
                    <>
                      {" "}
                      <tr>
                        <td className="table_title5" style={{ fontSize: 16 }}>{item.question}</td>
                      </tr>
                      <tr className="table_para543">
                        <td>{item.answer}</td>
                      </tr>
                    </>
                  );
                })}
                {!lifeStyleDetail?.reflect?.questions?.length &&
                  emptyCheckList()}
              </tbody>
            </table>
          </div>
        </div>

        <div className="column">
          <div className="lifestylesecond flex-1">
            <p>Relax</p>
            <hr />

            <p>Affirmations</p>
            <ol>
              {lifeStyleDetail?.relax?.affirmations?.map((item) => {
                return renderAffirmationItem(item.affirmation);
              })}
              {!lifeStyleDetail?.relax?.affirmations?.length &&
                emptyAffirmation()}
            </ol>

            <p>Checklist</p>

            <ul>
              {lifeStyleDetail?.relax?.questions?.map((item) => {
                return (
                  <>
                    <div className="btn-group">
                      <p className="affir_checkbox">
                        <input
                          type="checkbox"
                          disabled
                          checked={item.answer === "yes" || false}
                        />
                      </p>
                      <p className="affir_checkbox" style={{ fontSize: 16 }}>{item.question}</p>
                    </div>
                    <br />
                  </>
                );
              })}
              {!lifeStyleDetail?.relax?.questions?.length && emptyCheckList()}
            </ul>
            <div className="btn-group margin_top_20">
              <p className="affir_checkbox">
                <input
                  type="checkbox"
                  disabled
                  checked={lifeStyleDetail?.relax?.dailyInput || false}
                />
              </p>
              <p className="affir_checkbox" style={{ fontSize: 16 }}>{"Make as Mandatory"}</p>
            </div>
            <br />
          </div>
        </div>

        <div className="column">
          <div className="lifestylesecond flex-1">
            <p>Take care</p>
            <hr />

            <p>Affirmations</p>
            <ol>
              {lifeStyleDetail?.takeCare?.affirmations?.map((item) => {
                return renderAffirmationItem(item.affirmation);
              })}
              {!lifeStyleDetail?.takeCare?.affirmations?.length &&
                emptyAffirmation()}
            </ol>

            <p>Checklist</p>
            <ul>
              {lifeStyleDetail?.takeCare?.questions?.map((item) => {
                return (
                  <>
                    <div className="btn-group">
                      <p className="affir_checkbox">
                        <input
                          type="checkbox"
                          disabled
                          checked={item.answer === "yes" || false}
                        />
                      </p>
                      <p className="affir_checkbox" style={{ fontSize: 16 }}>{item.question}</p>
                    </div>
                    <br />
                  </>
                );
              })}
              {!lifeStyleDetail?.takeCare?.questions?.length &&
                emptyCheckList()}
            </ul>
            <div className="btn-group margin_top_20">
              <p className="affir_checkbox">
                <input
                  type="checkbox"
                  disabled
                  checked={lifeStyleDetail?.takeCare?.dailyInput || false}
                />
              </p>
              <p className="affir_checkbox" style={{ fontSize: 16 }}>{"Make as Mandatory"}</p>
            </div>
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default LifeStyleComponent;
