import React from "react";
import { Link } from "react-router-dom";
import ApiConfig from "../../config/ApiConfig";
import { markAffirmationsService } from "../../services/LifestyleService";
import { showToastError } from "../../Utils/Helper";

const Affirmations = ({ list, onChangeCheckBox, categoryName, isMandatory, userid, selectedTemplate, isDisable }) => {
  const changeAffirmation = async (key = '') => {
    try {
      let params = {
        "userId": userid || ApiConfig.userID,
        "life_style": {
          [categoryName]: {
            affirmations: [],
            dailyInput: key ? !isMandatory : isMandatory,
          }
        }
      }
      const selectedAffirmation = list?.filter((item) => item.isSelected)?.map((item1) => ({ _id: item1._id }));
      params.life_style[categoryName].affirmations = selectedAffirmation;
      if (selectedTemplate) {
        delete params.userId;
        params['templateName'] = selectedTemplate.templateName; // TODO: Replace with templateID
      }
      await markAffirmationsService(params);
    } catch (error) {
      if(error?.data?.data) {
        showToastError(error.data.data)
      }
    }
  }

  const renderAffirmation = (item, index) => {
    return (
      <div key={index}><div className="btn-group">
        <p className="affir_checkbox">
          <input disabled={isDisable} type="checkbox" onClick={() => { onChangeCheckBox(item); changeAffirmation() }} checked={item.isSelected || false} />
        </p>
        <p className="affir_checkbox">
          {item.affirmation}
        </p>
      </div>
        <br />
      </div>
    )
  }

  return (
    <>
      <div className="affirmations h-100">
        <p className="affir_tile">
          Affirmations
          {!userid && <Link state={{ list, categoryName }} to="/editaffirmations" className="link_text">
            <button>edit</button>
          </Link>}
        </p>
        <div className="lifestyle_scroll">
          {list.map((item, index) => renderAffirmation(item, index))}
        </div>
      </div>
      <div>
        <div className="btn-group mark_mandatory mt-4">
          <p className="affir_checkbox">
            <input disabled={isDisable} checked={isMandatory || false} onClick={() => { onChangeCheckBox(null, 'mandatory'); changeAffirmation('isMandatory'); }} type="checkbox" />
          </p>
          <p className="affir_checkbox">Make as Mandatory</p>
        </div>
        <br />
      </div>
    </>
  );
};

export default Affirmations;
