import React, { memo, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import ToastBox from "../../commonComponent/ToastBox";
import { addAffirmationService, deleteAffirmationService } from "../../services/LifestyleService";
import { toastMsg } from "../../Utils/AllConstant";
import { showToastSuccess } from "../../Utils/Helper";

const EditAffirmationsForm = memo(({ list, categoryName }) => {
  const [data, setData] = useState(list)
  const [showTextBox, setShowTextBox] = useState(false);
  const [affirmation, setAffirmation] = useState('');
  const [error, showError] = useState(false);
  const [toast, setToast] = useState({});

  const categoryShowName = categoryName === 'takeCare' ? 'Take Care' : categoryName;

  const validate = () => {
    if (affirmation && affirmation?.trim()) {
      onSave()
      setShowTextBox(false);
    } else {
      showError(true)
    }
  }

  const onSave = async () => {
    try {
      let params = {
        "affirmation": affirmation,
        "category": categoryName,
      };
      const response = await addAffirmationService(params);
      setAffirmation('');
      if (response) {
        showToastSuccess(toastMsg.addAffirmation)
        // showToast(toastMsg.addAffirmation)
        setData([
          ...data,
          ...[{
            affirmation: affirmation,
            category: categoryName,
            _id: response.insertedId
          }]]);
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  const deleteAffirmation = async (id) => {
    try {
      const response = await deleteAffirmationService(id);
      if (response) {
        showToastSuccess(toastMsg.deleteAffirmation)
        // showToast(toastMsg.deleteAffirmation);
        setData(data.filter(item => item._id !== id));
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


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <p className="edit_takecare1">{categoryShowName}</p>
          </div>
          <div className="col-md-12">
            <div className="editaffirmationdiv mt-2">
              <p>Affirmations</p>
              {data.map((item, index) => (
                <div className="btn-group editcheckgroup">
                  <input editable={false} type="text" name="" value={item.affirmation} />
                  <RiDeleteBin6Line className="icon" onClick={() => deleteAffirmation(item._id)} />
                </div>))}
              {showTextBox ? <textarea value={affirmation} onChange={e => { setAffirmation(e.target.value); showError(false) }} name="" rows="4" placeholder="Enter your text..."></textarea> : null}
              {error && <h6 className="error_alert_text4 LifeStyleSearchInput" >Please add affirmation.</h6>}
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
});

export default EditAffirmationsForm;
