import React, { useState } from "react";
import { addNewTemplateService } from "../../services/LifestyleService";
import { toastMsg } from "../../Utils/AllConstant";
import { showToastSuccess } from "../../Utils/Helper";

const LifeStyleSearchInput = ({ onAddNewTemplate }) => {
  const [templateName, setTemplateName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (templateName && templateName?.trim()) {
      addNewTemplate()
    } else {
      setError('Please add lifestyle name.')
    }
  }
  const addNewTemplate = async () => {
    try {
      const response = await addNewTemplateService({ templateName });
      if (response) {
        onAddNewTemplate()
        showToastSuccess(toastMsg.addLifeStyleTemplate)
        setTemplateName('');
      }
    } catch (error) {
      if (error?.data?.data) {
        setError(error?.data?.data)
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="btn-group LifeStyleSearchInput mt-3">
          <input value={templateName} onChange={(e) => { setTemplateName(e.target.value); setError('') }} type="text" placeholder="Add name here..." />
          <button>save</button>
        </div>
        {error && <h6 className="error_alert_text4 LifeStyleSearchInput" >{`${error}`}</h6>}
      </form>
    </>
  );
};

export default LifeStyleSearchInput;
