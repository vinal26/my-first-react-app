import react, { useEffect, useState } from 'react';
import Select from "react-select";
import { changeUserLifestyleTemplate, getTemplateListService } from '../../services/LifestyleService';
import { toastMsg } from '../../Utils/AllConstant';
import { showToastSuccess } from '../../Utils/Helper';

const ChooseUserTemplate = ({ userID, onChangeTemplate }) => {
  const [list, setList] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  useEffect(() => {
    getTemplateList()
  }, [])

  const getTemplateList = async (isAddedNew) => {
    try {
      const response = await getTemplateListService()
      if (response) {
        setList(response);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getList = () => {
    let result = list?.map((dt) => ({
      value: dt._id,
      label: dt.templateName,
    }));
    return result;
  }

  const onChangeSelected = (data) => {
    const selectedItem = list?.find((item) => item._id === data.value)
    setSelectedTemplate(selectedItem);
  }

  const getSelectedTemplate = () => {
    return selectedTemplate ? { label: selectedTemplate.templateName, value: selectedTemplate._id } : ''
  }

  const onSave = async () => {
    try {
      if (selectedTemplate) {
        const params = {
          "templifestyleId": selectedTemplate._id,
          "userId": userID
        }
        const response = await changeUserLifestyleTemplate(params)
        if (response) {
          showToastSuccess(toastMsg.changeLifeStyleTemplate)
          onChangeTemplate();
          setSelectedTemplate('');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      class="modal fade"
      id="chooseTemplate"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    ><div class="modal-dialog blog_modal_center">
        <div class="modal-content blog_modal_content">
          <div class="modal-header border-0 text-center">
            <h5 class="modal-title w-100" id="staticBackdropLabel">
              Choose Template
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setSelectedTemplate('')}
            ></button>
          </div>
          <div class="modal-body">
            <Select
              className=""
              placeholder={"Please select life style"}
              onChange={onChangeSelected}
              options={getList()}
              value={getSelectedTemplate()}
            />
          </div>
          <div>
            <center>
              <button
                type="button"
                class="cancel_delete_blog"
                data-bs-dismiss="modal"
                onClick={() => setSelectedTemplate('')}
              >
                Cancel
              </button>
              <button
                data-bs-dismiss="modal"
                onClick={onSave}
                disabled={!selectedTemplate}
                type="button"
                class={selectedTemplate ? "delete_blog" : 'cancel_delete_blog'}
              >
                Save
              </button>
            </center>
          </div>
        </div>
      </div>
    </div>
  )

}
export default ChooseUserTemplate;