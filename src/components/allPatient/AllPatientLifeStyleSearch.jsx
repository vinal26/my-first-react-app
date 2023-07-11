import React from "react";
import Select from "react-select";
import { AiOutlinePlus } from "react-icons/ai";

const AllPatientLifeStyleSearch = ({ selectedTemplate, list, onChangeSelectedTemplate }) => {
  const getList = () => {
    let result = list.map((dt) => ({
      value: dt._id,
      label: dt.templateName,
    }));
    return result;
  }

  const onChangeSelected = (data) => {
    const selectedItem = list.find((item) => item._id === data.value)
    onChangeSelectedTemplate(selectedItem);
  }

  const getSelectedTemplate = () => {
    return selectedTemplate ? { label: selectedTemplate.templateName, value: selectedTemplate._id } : ''
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <div className="active_msearch6">
              <Select
                className=""
                placeholder={"Please select life style"}
                onChange={onChangeSelected}
                options={getList()}
                value={getSelectedTemplate()}
              />
              {/* <Select className="" placeholder={"Please select lifestyle"} onChange={selectCarePlan} /> */}
            </div>
          </div>
          <div className="col-md-5">
            {/* <button
              style={{ background: "#1F7E78", color: "white" }}
              className="create_newprogram"
            >
              <AiOutlinePlus /> create new lifestyle
            </button> */}
          </div>
        </div>
        <hr className="create_bottomhr" />
      </div>
    </>
  );
};

export default AllPatientLifeStyleSearch;
