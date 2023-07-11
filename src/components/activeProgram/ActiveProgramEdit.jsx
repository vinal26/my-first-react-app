
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addActiveProgram, getActiveProgramById, updateActiveProgramById, updateCareTeamActiveProgramById } from "../../services/ActivePrograms";
import { BsFillPlusCircleFill } from "react-icons/bs";
import DateInput from "../../commonComponent/CutomDatePicker";
import { changeDateFormatddmmyyyy, changeDateFormatmmddyyyy, changeDateFormatYYYY, formatNewDate, getFileName, isEmpty, showToastError, showToastSuccess } from "../../Utils/Helper";
import { getUploadFileCategory, uploadFile } from "../../services/FileUploadService";
import Button from "../../commonComponent/Button";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { format, parseISO } from "date-fns";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import Select from "react-select";
import { getMyPatientList } from "../../services/PatientService";
import { AiOutlinePlus } from "react-icons/ai";
import ApiConfig from "../../config/ApiConfig";


const ActiveDescriptiponEdit = (props) => {
  let location = useLocation();
  let program = location?.state.program || [];
  let isFromAssigned = location?.state.isFromAssigned || false;
  // let startDates = format(parseISO(program?.startDate), 'mm-dd-yyyy')
  const programId = program._id;
  // console.log(program._id, "program.startDate")
  // const [programDetail, setProgramDetail] = useState({ ...program });

  const getDate = (date) => {
    try {
      if (date && new Date(date) != 'Invalid Date') {
        return new Date(date)
      }
      // return new Date()
    } catch (error) { }
  }

  const [patientLists, setPatientLists] = useState([]);
  const [programImageCreate, setProgramImageCreate] = useState("");
  const [updateImage, setUpdateImage] = useState("");
  const [programNameCreate, setProgramNameCreate] = useState("");
  const [programDetails, setProgramDetails] = useState({});
  const [programMembers, setProgramMembers] = useState([]);
  const [programPrice, setProgramPrice] = useState("");
  const [programTypeCreate, setProgramTypeCreate] = useState("");
  const [startDateCreate, setStartDateCreate] = useState("");
  const [endDateCreate, setEndDateCreate] = useState("");
  const [programCareTeam, setProgramCareTeam] = useState([]);
  const [status, setStatus] = useState(false);
  const [descriptionCreate, setDescriptionCreate] = useState("");
  const [CoverShowImageCreate, setCoverShowImageCreate] = useState("");
  const [isLoading, setLoader] = useState(false);
  const [isLoading1, setLoader1] = useState(false);
  const [isLoading2, setLoader2] = useState(false);
  const [error, setError] = useState({ name: false, type: false, image: false, size: false, start_date: false, end_date: false, description: false, price: false, members: false, careTeam: false });
  const MAX_FILE_SIZE = 5120 // 5MB
  const fileSizeKiloBytes = updateImage?.size / 1024

  let navigate = useNavigate();
  const getSelectedMemberNames = () => {
    const result = program.programMemerDetails?.map((item) => {
      return {
        label: item.userName,
        value: item.user_id
      }
    }) || [];
    setProgramMembers(result)
  }

  const checkValidation = () => {
    try {
      let errorsResult = error;
      let isValid = true;
      if ( !programImageCreate) {
        isValid = false;
        errorsResult = { ...errorsResult, image: true }
      }

      if (fileSizeKiloBytes > MAX_FILE_SIZE) {
        isValid = false;
        errorsResult = { ...errorsResult, size: true }
      }
      if (!programNameCreate || isEmpty(programNameCreate)) {
        isValid = false;
        errorsResult = { ...errorsResult, name: true }
      }
      if (!programTypeCreate || isEmpty(programTypeCreate)) {
        isValid = false;
        errorsResult = { ...errorsResult, type: true }
      }
      if (programTypeCreate === "paid") {
        if (!programPrice || isEmpty(programPrice)) {
          isValid = false;
          errorsResult = { ...errorsResult, price: true }
        }
      }
      if (!startDateCreate || isEmpty(startDateCreate)) {
        isValid = false;
        errorsResult = { ...errorsResult, start_date: true }
      }
      if (!endDateCreate || isEmpty(endDateCreate)) {
        isValid = false;
        errorsResult = { ...errorsResult, end_date: true }
      }
      // if (!programMembersCreate || isEmpty(programMembersCreate)) {
      //   isValid = false;
      //   errorsResult = { ...errorsResult, members: true }
      // }
      // if (!programCareTeam || isEmpty(programCareTeam)) {
      //   isValid = false;
      //   errorsResult = { ...errorsResult, careTeam: true }
      // }
      if (!descriptionCreate || isEmpty(descriptionCreate)) {
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
  useEffect(() => {
    getActiveProgramByIds();
  }, [programId])

  const getActiveProgramByIds = async () => {
    setLoader1(true)
    // console.log(sessionId);
    try {
      if (!programId) {
        return;
      }
      const response = await getActiveProgramById(programId);

      if (response.status === 200) {
        // console.log(response.data.data[0], "programsssss")
        setProgramDetails(response.data.data[0]);
        setProgramImageCreate(response.data.data[0].programImage);
        setProgramNameCreate(response.data.data[0].programName);
        setProgramPrice(response.data.data[0].price);
        setProgramTypeCreate(response.data.data[0].programType);
        setDescriptionCreate(response.data.data[0].description);
        setCoverShowImageCreate(response.data.data[0].programImage);
        setStartDateCreate(new Date(formatNewDate(response.data.data[0]?.startDate)) || '');
        setEndDateCreate(new Date(formatNewDate(response.data.data[0]?.endDate)) || '');
      } else {
        console.log(response?.data || response.message);
      }
      setLoader1(false)
    } catch (error) {

      error?.data?.data &&
        console.log(error?.data?.data || error.data?.message);
      setLoader1(false)
    }
  };
  const updateProgram = async () => {

    setLoader(true)
    var params = {};
    if (program.programImage !== programImageCreate) {
      const fileName = getFileName(programImageCreate);
      const result = await uploadFile(
        programImageCreate,
        getUploadFileCategory.createActiveProgram,
        fileName
      );
      params["programImage"] = fileName;
    }
    else {
      const fileName = programImageCreate.split('/')
      const imageName = fileName[fileName.length - 1];
      params["programImage"] = imageName;
    }


    params["programName"] = programNameCreate;
    params["programType"] = programTypeCreate;
    params["price"] = programPrice;
    params["startDate"] =
      startDateCreate == null ? null : changeDateFormatYYYY(startDateCreate);
    params["endDate"] =
      endDateCreate == null ? null : changeDateFormatYYYY(endDateCreate);
    params["programMembers"] = programMembers;
    params["careTeam"] = programCareTeam;
    params["description"] = descriptionCreate;
    params["status"] = status;
    const memberResult = programMembers?.map((item) => {
      return item.value
    })

    params.programMembers = memberResult
    try {
      const response = isFromAssigned ? await updateCareTeamActiveProgramById(program._id, params) : await updateActiveProgramById(program._id, params);
      setLoader(false)
      if (response.status === 200) {
        showToastSuccess(`Active program is updated`)
        // console.log(response, "response")
        props.onSave();
        // navigate('/activeprogramlist', { state: { newCreatedProgramId: response.data.data.insertedId } })
      } else {
        showToastError(response?.data || response.message || "Some error occurred")
      }
    } catch (error) {
      setLoader(false)
      showToastError(error?.data?.data || error.data?.message || "Some error occurred")
    }
  }
  const getPatientLists = async () => {
    try {
      const response = await getMyPatientList();
      // setLoader(false);
      if (response.status === 200) {
        setPatientLists(response?.data?.data);
        // console.log(response?.data?.data);
      }
    } catch (error) {
      // setLoader(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getPatientLists();
    getSelectedMemberNames();
  }, [])
  const getMemberNames = () => {
    const result = patientLists.filter(dt => !programDetails.programMembers?.includes(dt._id)).map((item) => {
      return {
        label: item.full_name,
        value: item._id
      }
    });
    return result || [];
  }
  const handleCreateProgram = async (e) => {
    e.preventDefault();
    checkValidation();
  };

  const renderError = (msg, value) => {
    return (
      value ? (
        <h6 className="text-danger error" style={{ marginBottom: 15, marginTop: -15 }}>
          {msg}
        </h6>) : null)
  }
  const renderAddMemberDropDown = () => {

    return (
      <div className="member-select" >
        <Select
          isMulti
          className=""
          onChange={(data) => {
            // console.log(data.map((dt) => dt.value), "data")
            // setProgramMembersCreate(data.map((dt) => dt.value));
            setProgramMembers(data)
          }}
          placeholder={"Add New Members"}
          options={getMemberNames()}
        // value={programMembers}
        />

      </div>
    )
  }
  const renderAddCareTeamDropDown = () => {
    return (
      <div className="member-select" >
        <Select
          isMulti
          className=""
          onChange={(data) => {
            setProgramCareTeam(data.map((dt) => dt.value));
          }}
          placeholder={"Add Care Team"}
        // options={getMemberNames()}
        />

      </div>
    )
  }
  const renderHeader = () => {
    return (
      <p className="dashboard_title">
        <HiOutlineArrowSmLeft
          onClick={() => navigate("/activeprogramlist")}
          className="icon"
        />
        active program
      </p>
    )
  }

  const renderForm = () => {
    return (
      <form onSubmit={handleCreateProgram}>
        <div className="row mx-5 mt-5">
          <div className="col-sm-12 my-2">
            <h4>Edit Program Description</h4>
            <p className="text-secondary">Give your program a title and description so it gives clarification to the patients</p>
          </div>
          {isLoading1 ? (
            <center>
              <div
                style={{ width: "3rem", height: "3rem", color: "#1f7e78" }}
                class="spinner-border mt-3 mb-4"
                role="status"
              />
            </center>
          ) : (
            <>
              <div className="col-md-12">
                <p className="whole_label">program Title<span className="text-danger"> *</span></p>
                <input
                  type="text"
                  className="description_inputf mb-4"
                  value={programNameCreate}
                  maxLength={80}
                  onChange={(e) => {
                    setProgramNameCreate(e.target.value)
                    setError({ ...error, name: false })
                  }} />
                {renderError('Please enter name', error.name)}
              </div>
              <div className="col-md-12">
                <p className="whole_label">description<span className="text-danger"> *</span></p>
                <textarea
                  rows="6"
                  type="text"
                  className="description_inputf description_descpf is-invalid mb-4"
                  value={descriptionCreate}
                  maxLength={200}
                  onChange={(e) => {
                    setError({ ...error, description: false })
                    setDescriptionCreate(e.target.value)
                  }} />
                {renderError('Please enter description', error.description)}
              </div>
              <div className="col-md-12">
                <p className="whole_label  ">Program <span className="text-lowercase">Type<span className="text-danger"> *</span></span></p>
                <select className="description_inputf "
                  value={programTypeCreate}
                  onChange={(e) => {
                    setProgramTypeCreate(e.target.value);
                    setError({ ...error, type: false })
                  }}
                >
                  <option value="free">free</option>
                  <option value="paid">paid</option>


                </select>
                {renderError('Please select program type', error.type)}
              </div>
              {programTypeCreate == "paid" ?
                <div className="col-md-12">
                  <p className="whole_label">Price </p>
                  <input
                    type="number"
                    className="description_inputf"
                    min={0}
                    value={programPrice}
                    onChange={(e) => {
                      setProgramPrice(e.target.value)
                      setError({ ...error, price: false })
                    }} />
                  {renderError('Please enter price', error.price)}
                </div>

                : null}
              <div className="col-md-6">
                <p className="whole_label">start <span className="small_letter2">date</span><span className="text-danger"> *</span></p>
                <DateInput
                  value={startDateCreate}
                  onChangeDate={(date) => {
                    setStartDateCreate(date)
                    setError({ ...error, start_date: false })

                  }}
                  maxDate={endDateCreate}
                  minDate={new Date()}
                  inputClassName={"description_inputf d-flex align-items-center"} />
                {error.start_date ?
                  <h6 className="text-danger error" style={{ marginBottom: 15, marginTop: 7 }}>
                    {'Please select start date'}
                  </h6> : null}
              </div>
              <div className="col-md-6">
                <p className="whole_label">end <span className="small_letter2">date</span><span className="text-danger"> *</span></p>
                <DateInput
                  value={endDateCreate}
                  onChangeDate={(date) => {
                    setError({ ...error, end_date: false })
                    setEndDateCreate(date)
                  }}
                  minDate={startDateCreate ? startDateCreate : new Date()}
                  inputClassName={"description_inputf d-flex align-items-center"} />
                {error.end_date ?
                  <h6 className="text-danger error" style={{ marginBottom: 15, marginTop: 7 }}>
                    {'Please select end date'}
                  </h6> : null}
              </div>

              <p className="whole_label">Add Members</p>
              {renderAddMemberDropDown()}

              <p className="whole_label">Care Team</p>
              {renderAddCareTeamDropDown()}

              <div className="col-md-12 position-relative">
                <p className="whole_label">Thumbnail<span className="text-danger"> *</span></p>
                {CoverShowImageCreate.length ? (
                 <img
                 src={updateImage ? (updateImage && URL.createObjectURL(updateImage)) || "images/dummy_image.jpg" : ApiConfig.ImageUrl + 'programs/' + programDetails.createdBy + '/' + CoverShowImageCreate}
                 alt="2"
                 className="active_dummyimage"
               />
                ) : (
                  <img
                    src="images/dummy_image.jpg"
                    alt="2"
                    className="active_dummyimage"
                    style={{ objectFit: "cover" }}
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="form-control uploader-input"
                  value=""
                  onChange={(e) => {
                    setUpdateImage(e.target.files[0]);
                    setProgramImageCreate(e.target.files[0]);
                    setCoverShowImageCreate(URL.createObjectURL(e.target.files[0]));
                    setError({ ...error, image: false , size: false })
                  }} />
                <div className="uploader-mask d-flex justify-content-center align-items-center">
                  {/* <BsFillPlusCircleFill className="upload-icon" /> */}
                </div>
                {renderError('Please select image', error.image)}
                {renderError(`File size is greater than maximum limit`, error.size)}
              </div>
            </>
          )}
          <hr className="mt-4" />

          <div className="col-md-12 d-flex justify-content-between">
            <div text={'Cancel'} style={isLoading ? { cursor: 'none' } : { cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9' }} className="description_btnsave d-flex justify-content-center align-items-center" onClick={() => !isLoading && navigate('/activeprogramlist')}>Cancel</div>

            <Button isLoading={isLoading} loadingText={false} type="submit" id="reateProgram" text={'Save & Continue'} style={isLoading ? { cursor: 'none' } : {}} className="description_btnsave blogbtn_widfix" />

            {program.status === false ?
              <Button isLoading={isLoading} loadingText={false} type="submit" id="reateProgram" onClick={() => setStatus(true)} text={'Save & Publish'} style={isLoading ? { cursor: 'none' } : {}} className="description_btnsave blogbtn_widfix" />
              : null}
          </div>
        </div>
      </form >
    )
  }

  return (
    <>
      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-md-12">
            {renderForm()}
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveDescriptiponEdit;
