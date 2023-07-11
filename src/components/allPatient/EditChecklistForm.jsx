import React from "react";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import ToastBox from "../../commonComponent/ToastBox";
import { addCheckListService, deleteCheckListService } from "../../services/LifestyleService";
import { toastMsg } from "../../Utils/AllConstant";
import { showToastSuccess } from "../../Utils/Helper";

const EditChecklistForm = ({ list, categoryName }) => {
  const [data, setData] = useState(list)
  const [showTextBox, setShowTextBox] = useState(false);
  const [checkList, setCheckList] = useState('');
  const [error, showError] = useState(false);
  const [toast, setToast] = useState({});

  const categoryShowName = categoryName === 'takeCare' ? 'Take Care' : categoryName;
  const onSave = async () => {
    try {
      let params = {
        "question": checkList,
        "category": categoryName,
        "questionType": checkList,
      };
      const response = await addCheckListService(params);
      setCheckList('');
      if (response) {
        showToastSuccess(toastMsg.addCheckList)
        // showToast(toastMsg.addCheckList)
        setData([
          ...data,
          ...[{
            question: checkList,
            category: categoryName,
            _id: response.insertedId,
            questionType: params.questionType
          }]]);
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  const showToast = (msg) => {
    setToast({ visible: true, msg });
    setTimeout(() => {
      setToast({ visible: false, msg: '' });
    }, 1000);
  }


  const validate = () => {
    if (checkList && checkList?.trim()) {
      onSave()
      setShowTextBox(false);
    } else {
      showError(true)
    }
  }


  const deleteAffirmation = async (id) => {
    try {
      const response = await deleteCheckListService(id);
      if (response) {
        showToastSuccess(toastMsg.deleteCheckList)
        // showToast(toastMsg.deleteCheckList);
        setData(data.filter(item => item._id !== id));
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <p className="edit_takecare1">{categoryShowName}</p>
          </div>
          <div className="col-md-12">
            <div className="editaffirmationdiv mt-2">
              <p>checklist</p>
              {data.map((item, index) => (
                <div className="btn-group editcheckgroup">
                  <input editable={false} type="text" name="" value={item.question} />
                  <RiDeleteBin6Line className="icon" onClick={() => deleteAffirmation(item._id)} />
                </div>))}
              {showTextBox ? <textarea value={checkList} onChange={e => { setCheckList(e.target.value); showError(false) }} name="" rows="4" placeholder="Enter your text..."></textarea> : null}
              {error && <h6 className="error_alert_text4 LifeStyleSearchInput" >Please add checklist.</h6>}
              <div className="col-md-12 text-center">
                {!showTextBox ? (
                  <button
                    className="edit_affirbtn mt-3"
                    onClick={() => setShowTextBox(true)}>
                    Add
                  </button>
                ) : (
                  <button
                    className="edit_affirbtn mt-3"
                    onClick={() => { validate() }}>
                    save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ToastBox toastShow={toast.visible} content={`${toast.msg}`} /> */}
    </>
  );
};

export default EditChecklistForm;