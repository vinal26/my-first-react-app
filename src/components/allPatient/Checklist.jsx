import React from "react";
import { Link } from "react-router-dom";
import ApiConfig from "../../config/ApiConfig";
import { markAffirmationsService } from "../../services/LifestyleService";
import { showToastError } from "../../Utils/Helper";

const Checklist = ({ list, onChangeCheckBox, categoryName, isMandatory, userid, selectedTemplate, isDisable }) => {
  // console.log('list', list)

  const changeCheckList = async () => {
    try {
      let params = {
        "userId": userid || ApiConfig.userID, //TODO: Remove constant user id
        "life_style": {
          [categoryName]: {
            questions: [],
            dailyInput: isMandatory,
          }
        }
      }
      const selectedCheckList = list?.filter((item) => item.isSelected)?.map((item1) => ({ _id: item1._id }));
      params.life_style[categoryName].questions = selectedCheckList;
      if (selectedTemplate) {
        delete params.userId;
        params['templateName'] = selectedTemplate.templateName; // TODO: Replace with templateID
      }
      await markAffirmationsService(params);
    } catch (error) {
      showToastError(error?.data?.data || '')
    }
  }

  return (
    <>
      <div className="affirmations h-100 checklist_mob">
        <p className="affir_tile">
          Checklist
          {!userid && <Link state={{ list, categoryName }} to="/editchecklist" className="link_text">
            <button>edit</button>
          </Link>}
        </p>
        <div className="lifestyle_scroll">
          {list.map((item, index) => <div key={index}><div className="btn-group">
            <p className="affir_checkbox">
              <input disabled={isDisable} type="checkbox" onClick={() => { onChangeCheckBox(item, 'checkList'); changeCheckList(); }} checked={item.isSelected || false} />
            </p>
            <p className="affir_checkbox">
              {item.question}
            </p>
          </div>
          </div>
          )}
        </div>
      </div>
    </>)
};

export default Checklist;
