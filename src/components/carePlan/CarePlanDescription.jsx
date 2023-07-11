import React, { useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../commonComponent/Button";
import ToastBox from "../../commonComponent/ToastBox";
import { createCarePlanService } from "../../services/CreateCarePlanService";
import { getUploadFileCategory, uploadFile } from "../../services/FileUploadService";
import { toastMsg } from "../../Utils/AllConstant";
import { getFileName, isEmpty, showToastSuccess } from "../../Utils/Helper";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";

let defaultCarePlanDetail = {
  name: '',
  description: '',
  image: '',
}

const CarePlanDescription = () => {
  const navigate = useNavigate();
  const [carePlanDetail, setCarePlanDetail] = useState(defaultCarePlanDetail);
  const [toast, setToast] = useState({});
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    if (!carePlanDetail.name || isEmpty(carePlanDetail.name)) {
      isValid = false;
      setNameError(true)
    }

    if (!carePlanDetail.image) {
      isValid = false;
      setImageError(true)
    }

    if (!carePlanDetail.description || isEmpty(carePlanDetail.description)) {
      isValid = false;
      setDescriptionError(true)
    }

    if (isValid && !isLoading) {
      setLoader(true)
      createCarePlan();
    }
  }

  const onChangeCarePlanDetail = (key, value) => {
    setCarePlanDetail({ ...carePlanDetail, [key]: value });
  }

  const validate = () => {
    return (carePlanDetail.name && carePlanDetail.description && carePlanDetail.image) || false;
  }
  const createCarePlan = async () => {
    try {
      const fileName = getFileName(carePlanDetail.image);
      const result = await uploadFile(carePlanDetail.image, getUploadFileCategory.carePlan, fileName);
      const response = await createCarePlanService({ ...carePlanDetail, image: fileName });
      setLoader(false)
      if (response) {
        setCarePlanDetail(defaultCarePlanDetail);
        showToastSuccess(toastMsg.createCarePlans)
        navigate(-1);
        // showToast(toastMsg.createCarePlans)
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
      navigate(-1);
    }, 1000);
  }


  return (

    <>
      <form onSubmit={handleSubmit}>
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <Sidebar />
            </div>
            <div className="col-md-10">
              <p className="dashboard_title">
                <Link to="" className="link_text">
                  <HiOutlineArrowSmLeft onClick={() => navigate(-1)} className="icon" />
                </Link>
                Care Plans
                <span className="patient_lifestyle2">
                  <GoPrimitiveDot />
                  Description
                </span>
              </p>
              <div class="container">
                <div class="row justify-content-start">
                  <div className="row mt-4">
                    <div className="col-md-4">
                      <img
                        src={carePlanDetail.image && URL.createObjectURL(carePlanDetail.image) || "images/dummy_image.jpg"}
                        alt=""
                        className="active_dummyimage"
                      />
                      <input type="file" accept="image/*" onChange={(e) => { onChangeCarePlanDetail('image', e.target.files[0]); setImageError(false) }} className="form-control uploader-input" />
                      
                      <div className="uploader-mask d-flex justify-content-center align-items-center">
                        <BsFillPlusCircleFill className="upload-icon" />
                      </div>
                      {imageError ? (
                        <h6 className="blog_error_text4" style={{marginTop: -5}}>Please select image</h6>
                      ) : null}
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* <ToastBox toastShow={toast.visible} content={`${toast.msg}`} /> */}
    </>
  );
};

export default CarePlanDescription;
