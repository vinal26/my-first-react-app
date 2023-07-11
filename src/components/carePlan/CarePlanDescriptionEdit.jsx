import React, { useEffect, useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../commonComponent/Button";
import ToastBox from "../../commonComponent/ToastBox";
import { setSelectedCarePlanID } from "../../Reducer/actions/carePlanAction";
import { updateCarePlanService } from "../../services/CreateCarePlanService";
import { getUploadFileCategory, uploadFile } from "../../services/FileUploadService";
import { toastMsg } from "../../Utils/AllConstant";
import { getFileName, isEmpty, showToastSuccess } from "../../Utils/Helper";

const CarePlanDescriptionEdit = ({ updateCarePlan }) => {
  const dispatch = useDispatch();
  const care_plan = useSelector(state => state.carePlan?.selectedCarePlan);
  const [carePlanDetail, setCarePlanDetail] = useState(care_plan);

  const [toast, setToast] = useState({});
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [isLoading, setLoader] = useState(false);

  useEffect(() => {
    setCarePlanDetail(care_plan);
  }, [care_plan])

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!carePlanDetail.name || isEmpty(carePlanDetail.name)) {
      isValid = false;
      setNameError(true)
    }
    if (!carePlanDetail.description || isEmpty(carePlanDetail.description)) {
      isValid = false;
      setDescriptionError(true)
    }

    if (isValid && !isLoading) {
      setLoader(true)
      submitData();
    }
  }

  const validate = () => {
    return (carePlanDetail.name && carePlanDetail.description) || false;
  }

  const submitData = async () => {
    try {
      let fileName = '';
      if (care_plan.image !== carePlanDetail.image) {
        fileName = getFileName(carePlanDetail.image);
        const result = await uploadFile(carePlanDetail.image, getUploadFileCategory.carePlan, fileName);
      } else {
        const splitData = carePlanDetail.image.split('/');
        fileName = splitData[splitData.length - 1];
      }
      const response = await updateCarePlanService(care_plan._id, { ...carePlanDetail, image: fileName });
      setLoader(false)
      if (response) {
        updateCarePlan()
        // showToast(toastMsg.updateCarePlan)
        showToastSuccess(toastMsg.updateCarePlan)
        // dispatch(setSelectedCarePlanID(response.data))
      }
    } catch (error) {
      setLoader(false)
      console.log('error', error);
    }
  }

  const showToast = (msg) => {
    setToast({ visible: true, msg });
    setTimeout(() => {
      setToast({ visible: false, msg: '' });
    }, 1000);
  }


  const onChangeCarePlanDetail = (key, value) => {
    setCarePlanDetail({ ...carePlanDetail, [key]: value });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row mt-4">
          <div className="col-md-4">
            <img
              src={care_plan.image !== carePlanDetail.image && carePlanDetail.image?.name ? URL.createObjectURL(carePlanDetail.image) : care_plan.image}
              alt=""
              onError={(e) => {
                e.target.src = 'https://shcs.ucdavis.edu/sites/g/files/dgvnsk7846/files/inline-images/Wheel_0.png' //replacement image imported above
              }}
              className="active_dummyimage"
            />
            <input
              accept="image/*"
              onChange={(e) => onChangeCarePlanDetail('image', e.target.files[0])}
              type="file"
              className="form-control uploader-input" />
            <div className="uploader-mask d-flex justify-content-center align-items-center">
              <BsFillPlusCircleFill className="upload-icon" />
            </div>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-12">
                <input
                  type="text"
                  className="description_inputf"
                  placeholder="Care Plan Name (HyperTension)"
                  value={carePlanDetail.name}
                  onChange={(e) => { onChangeCarePlanDetail('name', e.target.value); setNameError(false) }}
                />
                {nameError ? (
                  <h6 className="blog_error_text4" style={{ marginTop: -10 }}>
                    Please add name
                  </h6>) : null}
              </div>
              <div className="col-md-12">
                <textarea
                  rows="6"
                  type="text"
                  className="description_inputf description_descpf"
                  placeholder="Description"
                  value={carePlanDetail.description}
                  onChange={(e) => { onChangeCarePlanDetail('description', e.target.value); setDescriptionError(false) }}
                />
                {descriptionError ? (
                  <h6 className="blog_error_text4" style={{ marginTop: -10 }}>
                    Please add description
                  </h6>) : null}
              </div>
              <div className="col-md-12">
                <Button isLoading={isLoading} type="submit" id="jhsv" text={'save'} style={isLoading ? { cursor: 'none' } : {}} className="description_btnsave" />
                {/* <button className="description_btnsave">save</button> */}
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* <ToastBox toastShow={toast.visible} content={`${toast.msg}`} /> */}
    </>
  );
};

export default CarePlanDescriptionEdit;
