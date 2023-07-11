import React, { useEffect, useState } from "react";
import { CiViewList } from "react-icons/ci";
import { getFileName, isEmpty, showToastError, showToastSuccess } from "../../Utils/Helper";
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { CgUserList } from "react-icons/cg";
import { RiEdit2Fill, RiFileUserLine, RiScales2Line } from "react-icons/ri";
import { FiCheckSquare, FiClock, FiList, FiSearch } from "react-icons/fi";
import { FaRegListAlt, FaSignature, FaSortNumericUp, FaTrash, FaWpforms } from "react-icons/fa";
import SignatureModal from "./AddSignatureModal";
import { BsCalendarDate, BsCheck2Circle, BsFileRichtext, BsJustifyLeft, BsPersonSquare } from "react-icons/bs";
import { BiHeading, BiMenuAltLeft } from "react-icons/bi";
import { DiGitCommit } from "react-icons/di";
import { GiFeather } from "react-icons/gi";
import LongResponseForm from "./carePlanTemplates/LongResponseForm";
import ShortResponseForm from "./carePlanTemplates/ShortResponseForm";
import NumberTypeForm from "./carePlanTemplates/NumberFieldText";
import TextTypeForm from "./carePlanTemplates/TextFieldForm";
import MultipleChoiceForm from "./carePlanTemplates/MutipleChoiceForm";
import YesNoForm from "./carePlanTemplates/YesNoForm";
import { relativeTimeRounding } from "moment";
import { createCarePlanFormService, getSingleCarePlanFormListService, updateCarePlanFormService } from "../../services/CreateCarePlanService";
import { Button } from "bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { formList1, formList2 } from "../../Utils/AllConstant";
import ScaleForm from "./carePlanTemplates/ScaleForm";
import InfoTemplate from "./carePlanTemplates/InfoTemplate";
import MultipleChoiceButton from "./carePlanTemplates/MultipleChoiceButton";
import RichTextForm from "./carePlanTemplates/RichTextForm";
import MultipleChoiceGrid from "./carePlanTemplates/MultipleChoiceGrid";
import CalenderForm from "./carePlanTemplates/CalendarForm";
import TimeForm from "./carePlanTemplates/TimeForm";
import Loader from "../../commonComponent/Loader";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const EditFormsAndWaiver = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let formId = location?.state.formId || []
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({});
    const [formName, setFormName] = useState('');
    const [description, setDescription] = useState("");
    const [allFormData, setAllFormData] = useState([]);
    const [isLoading, setLoader] = useState(true);

    // Error states
    const [InfoError, setInfoError] = useState(false)
    const [MultiChoiceBtnError, setMultiChoiceBtnError] = useState(false)
    const [MultiChoiceGridError, setMultiChoiceGridError] = useState(false)
    const [MultiOneChoiceError, setMultiOneChoiceError] = useState(false)

    const [RichTextError, setRichTextError] = useState(false)
    const [LongResponseError, setLongResponseError] = useState(false)
    const [ScaleError, setScaleError] = useState(false)
    const [YesNoError, setYesNoError] = useState(false)
    const [TextError, setTextError] = useState(false)
    const [ShortResponseError, setShortResponseError] = useState(false)
    const [NumberError, setNumberError] = useState(false)
    const [TimeError, setTimeError] = useState(false)
    const [CalenderError, setCalenderError] = useState(false)

    const scrollToView = () => setTimeout(() => {
        document.getElementById('stb').scrollIntoView({
            behavior: 'smooth'
        });
    }, 200);

    const handleData = (data) => {
        setAllFormData([...allFormData, data])
        clearTimeout(scrollToView)

        scrollToView()
    }
    let handleFormValuesUpdate = (i, e = null, type = '', optionIndex = null) => {

        let newFormValues = [...allFormData];
        if (type == 'input') {
            newFormValues[i][e.target.name] = e.target.value;
        }
        if (type == 'editor') {
            newFormValues[i]['title'] = e;
        }
        if (type == "checkbox_options") {
            let value = e.target.value
            let isChecked = e.target.checked
            if (isChecked) {
                newFormValues[i]?.options.push(value);
            } else {
                let options = newFormValues[i]?.options
                let newOptions = options?.filter((item) => item != value)
                newFormValues[i].options = newOptions
            }
        }
        if (type == "input_options") {
            if (e != null) {
                newFormValues[i].options[optionIndex] = e.target.value
            } else {
                if ((optionIndex >= 0) && optionIndex != null && e == null) {
                    //remove
                    newFormValues[i]?.options.splice(optionIndex, 1);
                } else {
                    //add new field
                    newFormValues[i]?.options.push('');
                }
            }
        }
        // console.log(newFormValues, "Edit Forms")

        newFormValues.map(dt => {
            if (dt.type === 'info' && (dt.options).length > 0) {
                setInfoError(false)
            }
            if (dt.type === 'multipleChoiceButton' && ((dt.title).length > 0 && (dt.options).length > 1)) {
                setMultiChoiceBtnError(false)
            }
            if (dt.type === 'multipleChoiceGrid' && ((dt.title).length > 0 && (dt.options).length > 1)) {
                setMultiChoiceGridError(false)
            }
            if (dt.type === 'multiChoice' && ((dt.title).length > 0 && (dt.options).length > 1)) {
                setMultiOneChoiceError(false)
            }

            if (dt.type === 'richText' && (dt.title).length > 0) {
                setRichTextError(false)
            }
            if (dt.type === 'longResponse' && (dt.title).length > 0) {
                setLongResponseError(false)
            }
            if (dt.type === 'scale' && (dt.title).length > 0) {
                setScaleError(false)
            }
            if (dt.type === 'yesNo' && (dt.title).length > 0) {
                setYesNoError(false)
            }
            if (dt.type === 'text' && (dt.title).length > 0) {
                setTextError(false)
            }
            if (dt.type === 'shortResponse' && (dt.title).length > 0) {
                setShortResponseError(false)
            }
            if (dt.type === 'number' && (dt.title).length > 0) {
                setNumberError(false)
            }
            if (dt.type === 'time' && (dt.title).length > 0) {
                setTimeError(false)
            }
            if (dt.type === 'calender' && (dt.title).length > 0) {
                setCalenderError(false)
            }
        })

        setAllFormData(newFormValues);
    }

    let removeFormFields = (i) => {
        let newFormValues = [...allFormData];
        newFormValues.splice(i, 1);
        setAllFormData(newFormValues)
    }
    const getSingleFormList = async () => {
        try {
            const response = await getSingleCarePlanFormListService(formId);
            setLoader(false);

            if (response.status === 200) {
                console.log(response?.data, "response");
                setAllFormData(response?.data[0]?.questions);
                setFormName(response?.data[0]?.formName);
                setDescription(response?.data[0]?.description)
                // setFilterData(response?.data?.data);
            } else {
                alert(response?.data || response.message);
            }
        } catch (error) {
            setLoader(false);
            error?.data?.data && alert(error?.data?.data || error.data?.message);
        }
    }

    useEffect(() => {
        getSingleFormList()
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValid = true;

        // if (formName == '' || description == '' || !allFormData.length) {
        if (formName == '' || !allFormData.length) {
            // alert("Please fill all the fields before continuing")
            setError(true)
            isValid = false;
        }


        allFormData.map(dt => {
            // Info
            if (dt.type === 'info' && !(dt.options).length) {
                setInfoError(true)
                isValid = false;
            }
            if (dt.type === 'multipleChoiceButton' && (!(dt.title).length || (dt.options).length < 2)) {
                setMultiChoiceBtnError(true)
                isValid = false;
            }
            if (dt.type === 'multipleChoiceGrid' && (!(dt.title).length || (dt.options).length < 2)) {
                setMultiChoiceGridError(true)
                isValid = false;
            }
            if (dt.type === 'multiChoice' && (!(dt.title).length || (dt.options).length < 2)) {
                setMultiOneChoiceError(true)
                isValid = false;
            }
            if (dt.type === 'richText' && !(dt.title).length) {
                setRichTextError(true)
                isValid = false;
            }
            if (dt.type === 'longResponse' && !(dt.title).length) {
                setLongResponseError(true)
                isValid = false;
            }
            if (dt.type === 'scale' && !(dt.title).length) {
                setScaleError(true)
                isValid = false;
            }
            if (dt.type === 'yesNo' && !(dt.title).length) {
                setYesNoError(true)
                isValid = false;
            }
            if (dt.type === 'text' && !(dt.title).length) {
                setTextError(true)
                isValid = false;
            }
            if (dt.type === 'shortResponse' && !(dt.title).length) {
                setShortResponseError(true)
                isValid = false;
            }
            if (dt.type === 'number' && !(dt.title).length) {
                setNumberError(true)
                isValid = false;
            }
            if (dt.type === 'time' && !(dt.title).length) {
                setTimeError(true)
                isValid = false;
            }
            if (dt.type === 'calender' && !(dt.title).length) {
                setCalenderError(true)
                isValid = false;
            }

            // 
        })

        if (isValid) {
            console.log(allFormData);
            saveProgram();
        }
        else {
            showToastError("Please all the fields before submitting")
        }

    }
    const saveProgram = async () => {
        setLoader(true)
        var params = {};
        params["formName"] = formName;
        params["description"] = description;
        params["questions"] = allFormData;
        // params["text"] = formValues1 ? formValues1 : []
        // console.log(params, "params");
        try {
            const response = await updateCarePlanFormService(formId, params);
            setLoader(false)
            if (response.status === 200) {
                showToastSuccess(`Care Plan Form is updated`)
                // setFormName("");
                // setDescription("");
                // setCareSuppliments([]);
                // props.onSave(response.data)
                // setProgramId(response.data.data.insertedId)
                navigate("/formsandwaiver")
            } else {
                showToastError(response?.data || response.message || "Some error occurred")
            }
        } catch (error) {
            setLoader(false)
            showToastError(error?.data?.data || error.data?.message || "Some error occurred")
        }
    }
    const renderLoader = () => {
        return (
            <Loader
                visible={isLoading}
                style={{ top: 100, position: "relative" }}
            />)
    }

    const renderForm = () => {
        return (
            <>
                <div className="my-4">
                    <h1 style={{ color: "#1f7e78" }}>Edit forms and Waivers</h1>
                    <h3 className="mt-4">Edit Waiver and Form screen to customise and tailor form</h3>
                    {/* <p className="text-secondary">Fill in waiver information</p> */}
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="row add-recipe">

                        <div className="col-md-10">
                            <div className="row">

                                <div className="col-md-12">
                                    <p className="whole_label">Form Name <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                                    <input
                                        type="text"
                                        className="description_inputMedi  "
                                        placeholder="Untitled Form"
                                        value={formName}
                                        maxLength="40"
                                        onChange={(e) => setFormName(e.target.value)}
                                    />
                                    {(error && !formName) && <p className="text-danger mb-4 fw-bold">Form name should not be empty.</p>}
                                </div>
                                <div className="col-md-12">
                                    <p className="whole_label">Description</p>
                                    <input
                                        type="text"
                                        className="description_inputMedi  "
                                        placeholder="Add additional notes or instructions here"
                                        value={description}
                                        maxLength="40"
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    {/* {(error && !description) && <p className="text-danger mb-4 fw-bold">Description should not be empty.</p>} */}
                                </div>
                            </div>
                        </div>
                        <SignatureModal onHandle={handleData} />
                        <div className="col-md-2 d-flex justify-content-center">
                            <div>
                                <div className="mb-4 px-1">
                                    <OverlayTrigger
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id="tooltip-headiing">
                                                Information
                                            </Tooltip>
                                        }
                                    >
                                        <span onClick={() => {
                                            handleData({
                                                title: '',
                                                helpText: '',
                                                options: [],
                                                type: 'info'
                                            })
                                        }}>
                                            <CgUserList size="1.5em" />
                                        </span>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id="tooltip-headiing">
                                                Waiver
                                            </Tooltip>
                                        }
                                    >
                                        <span className="ms-3" data-bs-toggle="modal" data-bs-target="#shareModal">
                                            <GiFeather size="1.5em" />
                                        </span>
                                    </OverlayTrigger>
                                </div>
                                <div className="mb-4">
                                    <OverlayTrigger
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id="tooltip-headiing">
                                                Heading
                                            </Tooltip>
                                        }
                                    >
                                        <span>
                                            <BiHeading size="1.5em" onClick={() => {

                                                handleData({
                                                    title: '',
                                                    helpText: '',
                                                    options: [],
                                                    type: 'text'
                                                })
                                            }} />
                                        </span>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id="tooltip-headiing">
                                                Rich Text
                                            </Tooltip>
                                        }
                                    >
                                        <span className="ms-3">
                                            <BsFileRichtext size="1.5em" onClick={() => {
                                                handleData({
                                                    title: '',
                                                    helpText: '',
                                                    options: [],
                                                    type: 'richText'
                                                })
                                            }}
                                            />
                                        </span>
                                    </OverlayTrigger>
                                </div>
                                <div className="mb-4">
                                    <OverlayTrigger
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id="tooltip-headiing">
                                                Short Response
                                            </Tooltip>
                                        }
                                    >
                                        <span>
                                            <BiMenuAltLeft size="1.5em" onClick={() => {
                                                handleData({
                                                    title: '',
                                                    helpText: '',
                                                    options: [],
                                                    type: 'shortResponse'
                                                })
                                            }} />
                                        </span>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id="tooltip-headiing">
                                                Long Response
                                            </Tooltip>
                                        }
                                    >
                                        <span className="ms-3">
                                            <BsJustifyLeft size="1.5em" onClick={() => {
                                                handleData({
                                                    title: '',
                                                    helpText: '',
                                                    options: [],
                                                    type: 'longResponse'
                                                })
                                            }} />
                                        </span>
                                    </OverlayTrigger>
                                </div>
                                <div className="mb-4" >
                                    <OverlayTrigger
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id="tooltip-headiing">
                                                Yes/No
                                            </Tooltip>
                                        }
                                    >
                                        <span>
                                            <DiGitCommit size="1.5em" onClick={() => {
                                                handleData({
                                                    title: '',
                                                    helpText: '',
                                                    options: [],
                                                    type: 'yesNo'
                                                })
                                            }} />
                                        </span>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id="tooltip-headiing">
                                                Multiple Choice
                                            </Tooltip>
                                        }
                                    >
                                        <span className="ms-3">
                                            <FiCheckSquare size="1.5em" onClick={() => {
                                                handleData({
                                                    title: '',
                                                    helpText: '',
                                                    options: [],
                                                    type: 'multiChoice'
                                                })
                                            }} />
                                        </span>
                                    </OverlayTrigger>
                                </div>

                                <div className="mb-4" >
                                    <OverlayTrigger
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id="tooltip-headiing">
                                                Choose One
                                            </Tooltip>
                                        }
                                    >
                                        <span>
                                            <BsCheck2Circle size="1.5em" onClick={() => {
                                                handleData({
                                                    title: '',
                                                    helpText: '',
                                                    options: [],
                                                    type: 'multipleChoiceButton'
                                                })
                                            }} />
                                        </span>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id="tooltip-headiing">
                                                Multiple Choice Grid
                                            </Tooltip>
                                        }
                                    >
                                        <span className="ms-3">
                                            <IoCheckmarkDoneCircleOutline size="1.5em" onClick={() => {
                                                handleData({
                                                    title: '',
                                                    helpText: '',
                                                    options: [],
                                                    type: 'multipleChoiceGrid'
                                                })
                                            }} />
                                        </span>
                                    </OverlayTrigger>
                                </div>
                                <div className="mb-4" >
                                    <OverlayTrigger
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id="tooltip-headiing">
                                                Time
                                            </Tooltip>
                                        }
                                    >
                                        <span>
                                            <FiClock size="1.5em" onClick={() => {
                                                handleData({
                                                    title: '',
                                                    helpText: '',
                                                    options: [],
                                                    type: 'time'
                                                })
                                            }} />
                                        </span>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id="tooltip-headiing">
                                                Calender
                                            </Tooltip>
                                        }
                                    >
                                        <span className="ms-3">
                                            <BsCalendarDate size="1.5em" onClick={() => {
                                                handleData({
                                                    title: '',
                                                    helpText: '',
                                                    options: [],
                                                    type: 'calender'
                                                })
                                            }} />
                                        </span>
                                    </OverlayTrigger>
                                </div>
                                <div className="mb-4" >
                                    <OverlayTrigger
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id="tooltip-headiing">
                                                Scale
                                            </Tooltip>
                                        }
                                    >
                                        <span>
                                            <RiScales2Line size="1.5em" onClick={() => {
                                                handleData({
                                                    title: '',
                                                    helpText: '',
                                                    options: '',
                                                    type: 'scale'
                                                })
                                            }} />
                                        </span>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id="tooltip-headiing">
                                                Number
                                            </Tooltip>
                                        }
                                    >
                                        <span className="ms-3">
                                            <FaSortNumericUp size="1.5em" onClick={() => {
                                                handleData({
                                                    title: '',
                                                    helpText: '',
                                                    options: '',
                                                    type: 'number'
                                                })
                                            }}
                                            />
                                        </span>
                                    </OverlayTrigger>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            {allFormData?.length === 0 ?
                                <div className="row w-100 mt-4" >
                                    <span className="d-flex justify-content-center align-items-center ">
                                        <CiViewList className="text-secondary" size="5.5em" />
                                    </span>
                                    <span className="d-flex justify-content-center align-items-center ">
                                        <p >Click components from the toolbox on the right to construct your form </p>
                                    </span>
                                </div>
                                : null}
                            {
                                allFormData?.map((item, index) => {
                                    if (item.type == 'info') {
                                        return (
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-11">
                                                        <InfoTemplate handleFormValuesUpdate={handleFormValuesUpdate} element={item} index={index} />
                                                    </div>
                                                    <div className="col-md-1">
                                                        <FaTrash className="like_group_form"
                                                            onClick={() => removeFormFields(index)}
                                                        />
                                                    </div>
                                                    <div className="col-md-12">
                                                        {InfoError && <p className="text-danger mb-4 fw-bold">Please fill all the details and choose atleast one option</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    if (item.type == 'waiverClient') {
                                        return (
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-11">
                                                        <div className="card px-4 mb-2">
                                                            <div className="row mt-3">
                                                                <div className="col-md-12">
                                                                    <div className=" col-md-3 card px-2 mt-1 mb-2">
                                                                        <p className="whole_label mt-1">Waiver</p>
                                                                    </div>
                                                                    <p className="whole_label mt-4">Client Waiver Attached <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-1">
                                                        <FaTrash className="like_group_form"
                                                            onClick={() => removeFormFields(index)}
                                                        />
                                                    </div>
                                                    {/* <div className="col-md-12">
                                                        {InfoError && <p className="text-danger mb-4 fw-bold">Please fill all the details and choose atleast one option</p>}
                                                    </div> */}
                                                </div>
                                            </div>
                                        )
                                    }
                                    if (item.type == 'waiverProvider') {
                                        return (

                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-11">
                                                        <div className="card px-4 mb-2">
                                                            <div className="row mt-3">
                                                                <div className="col-md-12">
                                                                    <div className=" col-md-3 card px-2 mt-1 mb-2">
                                                                        <p className="whole_label mt-1">Waiver</p>
                                                                    </div>
                                                                    <p className="whole_label mt-4">Signature <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                                                                    <p style={{ fontStyle: 'italic' }}>{item.title}</p>
                                                                    <p className="whole_label mt-4">Acknowledgement <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                                                                    <p>I agreed to the terms and conditions</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-1">
                                                        <FaTrash className="like_group_form"
                                                            onClick={() => removeFormFields(index)}
                                                        />
                                                    </div>
                                                    {/* <div className="col-md-12">
                                                        {InfoError && <p className="text-danger mb-4 fw-bold">Please fill all the details and choose atleast one option</p>}
                                                    </div> */}
                                                </div>
                                            </div>
                                        )
                                    }
                                    if (item.type == 'multipleChoiceButton') {
                                        return (
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-11">
                                                        <MultipleChoiceButton handleFormValuesUpdate={handleFormValuesUpdate} element={item} index={index} />
                                                    </div>
                                                    <div className="col-md-1">
                                                        <FaTrash className="like_group_form"
                                                            onClick={() => removeFormFields(index)}
                                                        />
                                                    </div>
                                                    <div className="col-md-12">
                                                        {MultiChoiceBtnError && <p className="text-danger mb-4 fw-bold">Please fill all the details and provide atleast two options</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    if (item.type == 'richText') {
                                        return (
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-11">
                                                        <RichTextForm handleFormValuesUpdate={handleFormValuesUpdate} element={item} index={index} />
                                                    </div>
                                                    <div className="col-md-1">
                                                        <FaTrash className="like_group_form"
                                                            onClick={() => removeFormFields(index)}
                                                        />
                                                    </div>
                                                    <div className="col-md-12">
                                                        {RichTextError && <p className="text-danger mb-4 fw-bold">Please fill all the details</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    if (item.type == 'multipleChoiceGrid') {
                                        return (
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-11">
                                                        <MultipleChoiceGrid handleFormValuesUpdate={handleFormValuesUpdate} element={item} index={index} />
                                                    </div>
                                                    <div className="col-md-1">
                                                        <FaTrash className="like_group_form"
                                                            onClick={() => removeFormFields(index)}
                                                        />
                                                    </div>
                                                    <div className="col-md-12">
                                                        {MultiChoiceGridError && <p className="text-danger mb-4 fw-bold">Please fill all the details and provide atleast two options</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    if (item.type == 'calender') {
                                        return (
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-11">
                                                        <CalenderForm handleFormValuesUpdate={handleFormValuesUpdate} element={item} index={index} />
                                                    </div>
                                                    <div className="col-md-1">
                                                        <FaTrash className="like_group_form"
                                                            onClick={() => removeFormFields(index)}
                                                        />
                                                    </div>
                                                    <div className="col-md-12">
                                                        {CalenderError && <p className="text-danger mb-4 fw-bold">Please fill all the details</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    if (item.type == 'time') {
                                        return (
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-11">
                                                        <TimeForm handleFormValuesUpdate={handleFormValuesUpdate} element={item} index={index} />
                                                    </div>
                                                    <div className="col-md-1">
                                                        <FaTrash className="like_group_form"
                                                            onClick={() => removeFormFields(index)}
                                                        />
                                                    </div>
                                                    <div className="col-md-12">
                                                        {TimeError && <p className="text-danger mb-4 fw-bold">Please fill all the details</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    if (item.type == 'longResponse') {
                                        return (
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-11">
                                                        <LongResponseForm handleFormValuesUpdate={handleFormValuesUpdate} element={item} index={index} />
                                                    </div>
                                                    <div className="col-md-1">
                                                        <FaTrash className="like_group_form"
                                                            onClick={() => removeFormFields(index)} />
                                                    </div>
                                                    <div className="col-md-12">
                                                        {LongResponseError && <p className="text-danger mb-4 fw-bold">Please fill all the details</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    if (item.type == 'scale') {
                                        return (
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-11">
                                                        <ScaleForm handleFormValuesUpdate={handleFormValuesUpdate} element={item} index={index} />
                                                    </div>
                                                    <div className="col-md-1">
                                                        <FaTrash className="like_group_form"
                                                            onClick={() => removeFormFields(index)}
                                                        />
                                                    </div>
                                                    <div className="col-md-12">
                                                        {ScaleError && <p className="text-danger mb-4 fw-bold">Please fill all the details</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    if (item.type == 'yesNo') {
                                        return (
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-11">
                                                        <YesNoForm handleFormValuesUpdate={handleFormValuesUpdate} element={item} index={index} />
                                                    </div>
                                                    <div className="col-md-1">
                                                        <FaTrash className="like_group_form"
                                                            onClick={() => removeFormFields(index)}
                                                        />
                                                    </div>
                                                    <div className="col-md-12">
                                                        {YesNoError && <p className="text-danger mb-4 fw-bold">Please fill all the details</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    if (item.type == 'text') {
                                        return (
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-11">
                                                        <TextTypeForm handleFormValuesUpdate={handleFormValuesUpdate} element={item} index={index} />
                                                    </div>
                                                    <div className="col-md-1">
                                                        <FaTrash className="like_group_form"
                                                            onClick={() => removeFormFields(index)}
                                                        />
                                                    </div>
                                                    <div className="col-md-12">
                                                        {TextError && <p className="text-danger mb-4 fw-bold">Please fill all the details</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    if (item.type == 'multiChoice') {
                                        return (
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-11">
                                                        <MultipleChoiceForm handleFormValuesUpdate={handleFormValuesUpdate} element={item} index={index} />
                                                    </div>
                                                    <div className="col-md-1">
                                                        <FaTrash className="like_group_form"
                                                            onClick={() => removeFormFields(index)}
                                                        />
                                                    </div>
                                                    <div className="col-md-12">
                                                        {MultiOneChoiceError && <p className="text-danger mb-4 fw-bold">Please fill all the details and provide atleast two options</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    if (item.type == 'number') {
                                        return (
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-11">
                                                        <NumberTypeForm handleFormValuesUpdate={handleFormValuesUpdate} element={item} index={index} />
                                                    </div>
                                                    <div className="col-md-1">
                                                        <FaTrash className="like_group_form"
                                                            onClick={() => removeFormFields(index)}
                                                        />
                                                    </div>
                                                    <div className="col-md-12">
                                                        {NumberError && <p className="text-danger mb-4 fw-bold">Please fill all the details</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    if (item.type == 'shortResponse') {
                                        return (
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-11">
                                                        <ShortResponseForm handleFormValuesUpdate={handleFormValuesUpdate} element={item} index={index} />
                                                    </div>
                                                    <div className="col-md-1">
                                                        <FaTrash className="like_group_form"
                                                            onClick={() => removeFormFields(index)}
                                                        />
                                                    </div>
                                                    <div className="col-md-12">
                                                        {ShortResponseError && <p className="text-danger mb-4 fw-bold">Please fill all the details</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }

                        </div>
                        <div className="col-md-1 px-2 text-secondary">
                        </div>
                        <div className="col-md-12 mt-5" id="stb">
                            <hr />
                            <div className="d-flex justify-content-between">
                                <div text={'Cancel'} style={isLoading ? { cursor: 'none' } : { cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9' }} className="description_btnsave d-flex justify-content-center align-items-center" onClick={() => !isLoading && navigate("/formsandwaiver")}>Cancel</div>
                                <button className="description_btnsave justify-content-end flex-end">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>

            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 mb-2">
                        <Sidebar />
                    </div>
                    <div className="col-md-10 py-4 px-5">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item pointer" onClick={() => navigate(-1)}>My Library</li>
                                <li class="breadcrumb-item active fw-bold" aria-current="page">Edit Forms & Waivers</li>
                            </ol>
                        </nav>
                        {!isLoading ? renderForm() : renderLoader()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditFormsAndWaiver;
