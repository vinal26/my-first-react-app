import React, { useState } from "react";
import { useEffect } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Button from "../../commonComponent/Button";
import DateInput from "../../commonComponent/CutomDatePicker";
import { updateActiveProgramById } from "../../services/ActivePrograms";
import { getUploadFileCategory, uploadFile } from "../../services/FileUploadService";
import { changeDateFormatmmddyyyy, getFileName, isEmpty, showToastError, showToastSuccess } from "../../Utils/Helper";

const ActiveDescription = (props) => {
  const programProps = props?.singleActiveProgram[0];

  const [programImage, setProgramImage] = useState(null);
  const [programName, setProgramName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [noOfPeopleJoin, setNoOfPeopleJoin] = useState("");
  const [inWaiting, setInWaiting] = useState("");
  const [description, setDescription] = useState("");
  const [CoverShowImage, setCoverShowImage] = useState({});
  const [isLoading, setLoader] = useState(false);
  const [error, setError] = useState({ name: false, image: false, start_date: false, end_date: false, description: false, noOfPeopleJoin: false, inWaiting: false });

  const checkValidation = () => {
    try {
      let errorsResult = error;
      let isValid = true;

      if (!CoverShowImage) {
        isValid = false;
        errorsResult = { ...errorsResult, image: true }
      }

      if (!programName || isEmpty(programName)) {
        isValid = false;
        errorsResult = { ...errorsResult, name: true }
      }
      if (!startDate || isEmpty(startDate)) {
        isValid = false;
        errorsResult = { ...errorsResult, start_date: true }
      }
      if (!endDate || isEmpty(endDate)) {
        isValid = false;
        errorsResult = { ...errorsResult, end_date: true }
      }
      if (!noOfPeopleJoin || isEmpty(noOfPeopleJoin)) {
        isValid = false;
        errorsResult = { ...errorsResult, noOfPeopleJoin: true }
      }
      if (!inWaiting || isEmpty(inWaiting)) {
        isValid = false;
        errorsResult = { ...errorsResult, inWaiting: true }
      }
      if (!description || isEmpty(description)) {
        isValid = false;
        errorsResult = { ...errorsResult, description: true }
      }
      setError(errorsResult)
      if (isValid) {
        updateProgram()
      }

    } catch (error) {

    }
  }

  const updateProgram = async () => {
    setLoader(true)
    let fileName = '';

    if (CoverShowImage !== programProps.image) {
      fileName = getFileName(programImage);
      const result = await uploadFile(programImage, getUploadFileCategory.createActiveProgram, fileName);
    } else {
      const splitData = CoverShowImage.split('/');
      fileName = splitData[splitData.length - 1];
    }

    var params = {};
    params["image"] = fileName;
    params["title"] = programName;
    params["start_date"] = startDate == null ? null : changeDateFormatmmddyyyy(startDate);
    params["end_date"] = endDate == null ? null : changeDateFormatmmddyyyy(endDate);
    params["joinLimit"] = Number(noOfPeopleJoin);
    params["waitingLimit"] = Number(inWaiting);
    params["description"] = description;

    try {
      const response = await updateActiveProgramById(props.programId, params);
      setLoader(false)
      if (response.status === 200) {
        props.onChangeName({ ...programProps, ...params })
        showToastSuccess(`Active program is updated`)
      } else {
        showToastError(response?.data || response.message || "Some error occurred")
      }
    } catch (error) {
      setLoader(false)
      showToastError(error?.data?.data || error.data?.message || "Some error occurred")
    }
    props.getProgramList();
    props.getProgramById();
  }


  const handleSubmitProgram = async (e) => {
    e.preventDefault();
    checkValidation()
  };

  useEffect(() => {
    setProgramName(props?.singleActiveProgram[0]?.title);
    setStartDate(
      props?.singleActiveProgram[0]?.start_date == undefined
        ? null
        : props?.singleActiveProgram[0]?.start_date
    );

    setEndDate(
      props?.singleActiveProgram[0]?.end_date == undefined
        ? null
        : props?.singleActiveProgram[0]?.end_date
    );
    setNoOfPeopleJoin(props?.singleActiveProgram[0]?.joinLimit);

    setInWaiting(props?.singleActiveProgram[0]?.waitingLimit);
    setDescription(props?.singleActiveProgram[0]?.description);
    setCoverShowImage(props?.singleActiveProgram[0]?.image)
  }, [props.singleActiveProgram]);

  const getDate = (date) => {
    try {
      if (date && new Date(date) != 'Invalid Date') {
        return new Date(date)
      }
      return new Date()
    } catch (error) {
      console.log('error', error)
    }
  }

  const renderError = (msg, value) => {
    return (
      value ? (
        <h6 className="blog_error_text4" style={{ marginBottom: 15, marginTop: -15 }}>
          {msg}
        </h6>) : null)
  }


  return (
    <>
      <form onSubmit={handleSubmitProgram}>
        <div className="row mt-4">
          <div className="col-md-4">
            {CoverShowImage.length ? (
              <img src={CoverShowImage} onError={(e) => {
                e.target.src = "images/dummy_image.jpg" //replacement image imported above
              }} alt="2" className="active_dummyimage" />
            ) : (
              <img
                src="images/dummy_image.jpg"
                alt="2"
                className="active_dummyimage"
              />
            )}
            <input
              type="file"
              accept="image/*"
              className="form-control uploader-input"
              value=""
              onChange={(e) => {
                setProgramImage(e.target.files[0]);
                setCoverShowImage(URL.createObjectURL(e.target.files[0]));
                setError({ ...error, image: false })
              }}
            />
            <div className="uploader-mask d-flex justify-content-center align-items-center">
              <BsFillPlusCircleFill className="upload-icon" />
            </div>
            {renderError('Please select image', error.image)}
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-12">
                <p className="whole_label">program <span className="small_letter2">name</span></p>
                <input
                  type="text"
                  className="description_inputf"
                  value={programName}
                  onChange={(e) => {
                    setProgramName(e.target.value);
                    setError({ ...error, name: false })
                  }}
                />
                {renderError('Please enter name', error.name)}
              </div>

              <div className="col-md-6">
                <p className="whole_label">start <span className="small_letter2">date</span></p>
                <DateInput
                  value={getDate(startDate) || ''}
                  onChangeDate={(date) => {
                    setStartDate(date);
                    setError({ ...error, start_date: false })
                  }}
                  minDate={new Date()}
                  maxDate={programProps.end_date === endDate ? '' : getDate(endDate)}
                  inputClassName={"description_inputf d-flex mb-0 align-items-center"} />
                {error.start_date ?
                  <h6 className="blog_error_text4" style={{ marginBottom: 15, marginTop: 7 }}>
                    {'Please select start date'}
                  </h6> : null}
              </div>

              <div className="col-md-6">
                <p className="whole_label">end <span className="small_letter2">date</span></p>
                <DateInput
                  value={endDate ? getDate(endDate) : ''}
                  onChangeDate={(date) => {
                    setEndDate(date);
                    setError({ ...error, end_date: false })
                  }}
                  minDate={programProps.start_date === startDate ? new Date() : getDate(startDate)}
                  inputClassName={"description_inputf d-flex mb-0 align-items-center"} />
                {error.end_date ?
                  <h6 className="blog_error_text4" style={{ marginBottom: 15, marginTop: 7 }}>
                    {'Please select end date'}
                  </h6> : null}
              </div>

              <div className="col-md-6 mt-3">
                <p className="whole_label">no <span className="small_letter2">of  people can join</span>  (max 50)</p>
                <input
                  type="text"
                  className="description_inputf"
                  value={noOfPeopleJoin}
                  onChange={(event) => {
                    if (event.target.value <= 50 && !isNaN(event.target.value)) {
                      setNoOfPeopleJoin(event?.target.value);
                      setError({ ...error, noOfPeopleJoin: false })
                    }
                  }}
                />
                {renderError('Please enter no of people can join', error.noOfPeopleJoin)}
              </div>
              <div className="col-md-6 mt-3">
                <p className="whole_label">in <span className="small_letter2">waiting</span> (max 30)</p>
                <input
                  type="text"
                  className="description_inputf"
                  value={inWaiting}
                  onChange={(event) => {
                    if (event.target.value <= 30 && !isNaN(event.target.value)) {
                      setInWaiting(event?.target.value);
                      setError({ ...error, inWaiting: false })
                    }
                  }}
                />
                {renderError('Please enter in waiting', error.inWaiting)}
              </div>

              <div className="col-md-12">
                <p className="whole_label">description</p>
                <textarea
                  rows="6"
                  type="text"
                  className="description_inputf description_descpf"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setError({ ...error, description: false })
                  }}
                />
                {renderError('Please enter description', error.description)}
              </div>
              <div className="col-md-12">
                <Button disabled isLoading={isLoading} type="submit" id="reateProgram" text={'Save'} style={{ cursor: 'none' }} className="description_btnsave description_disable" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ActiveDescription;
