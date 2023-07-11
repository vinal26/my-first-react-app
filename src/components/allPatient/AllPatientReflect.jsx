import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiConfig from "../../config/ApiConfig";
import { getLifestyleList, markAffirmationsService } from "../../services/LifestyleService";
import { lifeStyleCategoryList } from "../../Utils/AllConstant";

const AllPatientReflect = (props) => {
  const [checkList, setCheckList] = useState([]);

  useEffect(() => {
    getList();
  }, [props.userid, props.selectedTemplate])

  const getList = async () => {
    try {
      const response = await getLifestyleList(lifeStyleCategoryList.reflect, props.userid, props?.selectedTemplate);
      if (response) {
        setCheckList(response.questions)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onChangeCheckBox = (item, key = 'affirmationList') => {
    let list = checkList.map((check) => {
      if (item._id === check._id) {
        check.isSelected = !check.isSelected;
      }
      return check;
    });
    setCheckList(list);
  }

  const changeCheckList = async () => {
    try {
      let params = {
        "userId": props.userid || ApiConfig.userID,
        "life_style": {
          [lifeStyleCategoryList.reflect]: {
            questions: []
          }
        }
      }
      const selectedCheckList = checkList?.filter((item) => item.isSelected)?.map((item1) => ({ _id: item1._id }));
      params.life_style[lifeStyleCategoryList.reflect].questions = selectedCheckList;
      if (props?.selectedTemplate) {
        delete params.userId;
        params['templateName'] = props?.selectedTemplate?.templateName; // TODO: Replace with templateID
      }
      await markAffirmationsService(params);
    } catch (error) {
    }
  }

  const renderAffirmation = (item, index) => {
    return (
      <>
        <p>
          <input disabled={props.isDisable} type="checkbox" checked={item.isSelected || false} onClick={() => { onChangeCheckBox(item); changeCheckList(); }} name="" className="reflect_check98" />
          {item.question}
          {(index === 0 && !props.userid) && <Link state={{ list: checkList, categoryName: lifeStyleCategoryList.reflect }} to="/editchecklist" className="link_text">
            <button>edit</button>
          </Link>}
        </p>
        <textarea name="" rows="4"></textarea>
      </>
    )
  }

  return (
    <>
      <div className="apatient_reflect mt-4">
        {!props.userid && checkList?.length === 0 && <p style={{ paddingBottom: 10 }}><Link state={{ list: checkList, categoryName: lifeStyleCategoryList.reflect }} to="/editchecklist" className="link_text">
          <button>edit</button>
        </Link></p>}
        {checkList?.map((item, index) => renderAffirmation(item, index))}
      </div>
    </>
  );
};

export default AllPatientReflect;