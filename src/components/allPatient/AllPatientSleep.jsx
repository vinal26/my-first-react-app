import React, { useState, useEffect } from "react";
import { getLifestyleList } from "../../services/LifestyleService";
import { lifeStyleCategoryList } from "../../Utils/AllConstant";
import Affirmations from "./Affirmations";
import Checklist from "./Checklist";

const AllPatientSleep = (props) => {
  const [affirmationList, setAffirmationList] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [isMandatory, setMandatory] = useState(false);

  useEffect(() => {
    console.log(props.userid);
    getList();
  }, [props.userid, props.selectedTemplate])

  const getList = async () => {
    try {
      const response = await getLifestyleList(lifeStyleCategoryList.sleep, props.userid, props?.selectedTemplate);
      if (response) {
        setAffirmationList(response.affirmations);
        setCheckList(response.questions);
        setMandatory(response.dailyInput);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onChangeCheckBox = (item, key = 'affirmationList') => {
    if (key === 'affirmationList') {
      let list = affirmationList.map((affirmation) => {
        if (item._id === affirmation._id) {
          affirmation.isSelected = !affirmation.isSelected;
        }
        return affirmation;
      });
      setAffirmationList(list);
    } else if (key === 'mandatory') {
      setMandatory(!isMandatory);
    }
    else {
      let list = checkList.map((check) => {
        if (item._id === check._id) {
          check.isSelected = !check.isSelected;
        }
        return check;
      });
      setCheckList(list);
    }
  }

  return (
    <>
      <div className="row mt-4">
        <div className="col-md-6">
          <Affirmations isDisable={props.isDisable} selectedTemplate={props?.selectedTemplate} userid={props.userid} isMandatory={isMandatory} list={affirmationList} categoryName={lifeStyleCategoryList.sleep} onChangeCheckBox={onChangeCheckBox} />
        </div>
        <div className="col-md-6"><Checklist isDisable={props.isDisable} selectedTemplate={props?.selectedTemplate} userid={props.userid} isMandatory={isMandatory} categoryName={lifeStyleCategoryList.sleep} list={checkList} onChangeCheckBox={onChangeCheckBox} /></div>
      </div>
    </>
  );
};

export default AllPatientSleep;
