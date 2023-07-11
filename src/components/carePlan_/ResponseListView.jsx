import React, { useEffect, useState } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { TabList, TabPanel, Tabs, Tab } from "react-tabs";
import { CgStack } from "react-icons/cg";
import { getCarePlanFormResponseList } from "../../services/CreateCarePlanService";
import { Button, Modal } from "react-bootstrap";
import TimePicker from "../../commonComponent/TimePicker";
import DateInput from "../../commonComponent/CutomDatePicker";
import { RichEditor } from "./RichEditor";


const ResponseListView = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setLoader] = useState(true);
    const [responseList, setResponseList] = useState([]);
    const [response, setResponse] = useState([]);
    const [filterdata, setFilterData] = useState([]);
    // let careplanId = location?.state.careplanId || "";
    let formId = location?.state.formId || "";

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [search, setSearch] = useState("")

    const [selectedTab, setSelectedTab] = useState(
        parseInt(params.get("tab") ? params.get("tab") : 0)
    );

    const getFormResponsesList = async () => {
        try {
            const response = await getCarePlanFormResponseList(formId);
            setLoader(false);

            if (response.status === 200) {
                console.log(response.data, "response");
                setResponseList(response?.data);
                setFilterData(response?.data);
                console.log(response?.data);
            } else {
                alert(response?.data || response.message);
            }
        } catch (error) {
            setLoader(false);
            error?.data?.data && alert(error?.data?.data || error.data?.message);
        }
    }

    useEffect(() => {
        getFormResponsesList()
    }, [formId])

    const onTabClick = (index) => {
        setSelectedTab(index);
    }

    const onFormsSearch = async (searchWord) => {
        const result = responseList?.filter((value) => {
            if (value) {
                console.log(value, "value")
                return (
                    value?.formName?.toLowerCase()?.includes(searchWord?.toLowerCase())
                );
            }
        });

        if (searchWord === "") {
            setFilterData(responseList);
            // getGroupLists(searchWord);
        } else {
            setFilterData(result);
        }
    };

    const renderForm = () => {
        return (
            <>
                <div className="d-flex mt-5 mb-3">
                    <div className="w-50">
                        <h4>All Responses</h4>
                        <p>View your curated forms and Waivers responses.</p>
                    </div>
                    <div className="w-50 d-flex">
                        <div className="actsearch_simple me-2">
                            <FiSearch className="boxicon" />
                            <input
                                placeholder="Search for response..."
                                className="ms-2"
                                // value={search}
                                onChange={(e) => onFormsSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <Tabs
                    selectedIndex={selectedTab}
                    onSelect={(index) => onTabClick(index)} >
                    <TabList className="ps-0 mx-0 border-bottom">
                        <Tab>All Responses</Tab>
                    </TabList>

                    <TabPanel>
                        <>
                            {isLoading ? (
                                <center>
                                    <div
                                        style={{
                                            width: "3rem", height: "3rem", color: "#1f7e78", top: "110px",
                                            position: "relative"
                                        }}
                                        className="spinner-border mt-3 mb-4"
                                        role="status"
                                    />
                                </center>
                            ) : filterdata.length ? filterdata.map((dt, i) =>
                                <div key={i} className="card shadow-sm border-0 mb-3 p-3 d-flex flex-md-row justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <h6>{dt.formName}</h6>
                                            <div className="col-md-12"><p className="mb-0 ">{dt.description}</p></div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-around align-items-center">
                                        <button className="btn btn-primary btn-custom-light ms-3" onClick={() => {
                                            handleShow()
                                            setResponse(dt)
                                        }}>
                                            <span><CgStack className="me-2" />View</span>
                                        </button>
                                    </div>
                                </div>
                            ) : <div className="card p-2"><div className="card-body ml-10">There are currently no forms.</div></div>}
                        </>
                    </TabPanel>

                </Tabs>


                {/* All Response Modal */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">{response.formName} - Forms & Waivers Response</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='px-4'>
                        {/* {JSON.stringify(props.questions)} */}
                        {response.questions?.map((ques, index) => {
                            if (ques.type === 'shortResponse' || ques.type === 'longResponse' || ques.type === 'text' || ques.type === 'number') {
                                return (
                                    <>
                                        <p className="whole_label mt-4">{ques.title} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                                        <input
                                            type="text"
                                            className="description_inputMedi ps-0"
                                            disabled
                                            value={ques.answer}
                                        />
                                    </>
                                )
                            }
                            if (ques.type === 'richText') {
                                return (
                                    <>
                                        {/* <p className="whole_label mt-3">{ques.title} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p> */}
                                        <RichEditor
                                            readOnly
                                            toolbar={false}
                                            value={ques.answer.title}
                                        />
                                    </>
                                )
                            }
                            if (ques.type === 'yesNo') {
                                return (
                                    <div className='mt-3'>
                                        <p className="whole_label">{ques.title} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>

                                        <div className="row">
                                            <div className="col-md-6 mt-1 justify-content-center">
                                                <div className="d-flex">
                                                    <p className="affir_checkbox">
                                                        <input
                                                            disabled
                                                            value={"yes"} name={"yesNo_"+index}
                                                            type="radio"
                                                            checked={ques.answer === "yes"}
                                                        />
                                                    </p>
                                                    <p className="py-0">
                                                        Yes
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mt-1 justify-content-center">
                                                <div className="d-flex">
                                                    <p className="affir_checkbox">
                                                        <input
                                                            disabled
                                                            value={"no"} name={"yesNo_"+index}
                                                            type="radio"
                                                            checked={ques.answer === "no"}
                                                        />
                                                    </p>
                                                    <p className="py-0">
                                                        No
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            if (ques.type === 'multiChoice') {
                                return (
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <p className="whole_label">{ques.title} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                                        </div>
                                        <div className="col-md-12">
                                            <p className="text-secondary">{ques.helpText} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                                        </div>
                                        <div className="col-md-12">
                                            {ques?.options?.map((ele, i) => (
                                                <div className="d-flex" key={i}>
                                                    <div className="affir_checkbox">
                                                        <input
                                                            value={ele}
                                                            disabled
                                                            checked={ques.answer[ele]}
                                                            type="checkbox"
                                                        />
                                                    </div>
                                                    <div className="actlist_wid2">
                                                        <p className="py-0">
                                                            {ele}
                                                        </p>
                                                    </div>
                                                </div>

                                            ))}
                                        </div>
                                    </div>
                                )
                            }
                            if (ques.type === 'multipleChoiceButton') {
                                return (
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <p className="whole_label">{ques.title} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                                        </div>
                                        <div className="col-md-12">
                                            <p className="text-secondary">{ques.helpText}</p>
                                        </div>
                                        <div className="col-md-12">
                                            {ques?.options?.map((ele, i) => (
                                                <div className="d-flex" key={i}>
                                                    <div className="affir_checkbox">
                                                        <input
                                                            disabled
                                                            type="radio" checked={ques.answer[ele]} id="btnradio1"
                                                        />
                                                    </div>
                                                    <div className="actlist_wid2">
                                                        <p className="py-0">
                                                            {ele}
                                                        </p>
                                                    </div>
                                                </div>

                                            ))}
                                        </div>
                                    </div>
                                )
                            }
                            if (ques.type === 'multipleChoiceGrid') {
                                return (
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <p className="whole_label">{ques.title} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                                        </div>
                                        <div className="col-md-12">
                                            <p className="text-secondary">{ques.helpText}</p>
                                        </div>
                                        <div className="col-md-12">
                                            {ques?.options?.map((ele, i) => (
                                                <div key={i}>
                                                    <div className="mb-3 justify-content-center">
                                                        <div className="btn-group align-items-center">
                                                            <div className="actlist_wid2 me-4">
                                                                <p className="py-0 mb-0">
                                                                    {ele}
                                                                </p>
                                                            </div>
                                                            <p className="affir_checkbox mb-0">
                                                                <input
                                                                    value="1" type="radio" disabled checked={ques.answer[ele] == 1} id="btnradio1"
                                                                />
                                                            </p>
                                                            <p className="affir_checkbox mb-0">
                                                                <input
                                                                    value="2" type="radio" disabled checked={ques.answer[ele] == 2} id="btnradio1"
                                                                />
                                                            </p>
                                                            <p className="affir_checkbox mb-0">
                                                                <input
                                                                    value="3" type="radio" disabled checked={ques.answer[ele] == 3} id="btnradio1"
                                                                />
                                                            </p>
                                                            <p className="affir_checkbox mb-0">
                                                                <input
                                                                    value="4" type="radio" disabled checked={ques.answer[ele] == 4} id="btnradio1"
                                                                />
                                                            </p>
                                                            <p className="affir_checkbox mb-0">
                                                                <input
                                                                    value="5" type="radio" disabled checked={ques.answer[ele] == 5} id="btnradio1"
                                                                />
                                                            </p>

                                                        </div>
                                                    </div>
                                                </div>

                                            ))}
                                        </div>
                                    </div>
                                )
                            }
                            if (ques.type === 'time') {
                                return (
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <p className="whole_label">{ques.title} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                                            <TimePicker
                                                value={ques.answer}
                                                onDone={() => { }}
                                            >
                                                <span>
                                                    <input
                                                        disabled
                                                        className="description_inputMedi px-0"
                                                        value={ques.answer}
                                                    />
                                                    <img src="images/clock.png" className="clock_icon mt-2" alt="" />
                                                </span>
                                            </TimePicker>
                                        </div>
                                    </div>
                                )
                            }
                            if (ques.type === 'calender') {
                                return (
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <p className="whole_label">{ques.title} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                                            <DateInput
                                                disabled
                                                imageStyle={{ width: "22px", height: "22px", position: "absolute", borderRadius: "0px", marginBlock: "17px", left: 0 }}
                                                inputClassName={"description_inputMedi d-flex align-items-center ps-2"}
                                                value={new Date(ques.answer)}
                                            />
                                        </div>
                                    </div>
                                )
                            }
                            if (ques.type === 'scale') {
                                return (
                                    <div className="mb-2">
                                        <div className="row mt-3">
                                            <div className="col-md-12">
                                                <p className="whole_label">{ques.title} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                                            </div>
                                            <div className="container ">
                                                <div className="row">
                                                    <div className="col-md-1 mt-1 justify-content-center">
                                                        <div className="btn-group mt-1 align-items-center">
                                                            <p className="affir_checkbox">
                                                                <input
                                                                    type="radio" disabled checked={ques.answer == 1} value={"1"} id="btnradio1"
                                                                />
                                                            </p>
                                                            <div className="actlist_wid2">
                                                                <p className="py-0">
                                                                    1
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-1 mt-1 justify-content-center">
                                                        <div className="btn-group mt-1 align-items-center">
                                                            <p className="affir_checkbox">
                                                                <input
                                                                    type="radio" disabled checked={ques.answer == 2} value={"2"} id="btnradio1"
                                                                />
                                                            </p>
                                                            <div className="actlist_wid2">
                                                                <p className="py-0">
                                                                    2
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-1 mt-1 justify-content-center">
                                                        <div className="btn-group mt-1 align-items-center">
                                                            <p className="affir_checkbox">
                                                                <input
                                                                    type="radio" disabled checked={ques.answer == 3} value={"3"} id="btnradio1"
                                                                />
                                                            </p>
                                                            <div className="actlist_wid2">
                                                                <p className="py-0">
                                                                    3
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-1 mt-1 justify-content-center">
                                                        <div className="btn-group mt-1 align-items-center">
                                                            <p className="affir_checkbox">
                                                                <input
                                                                    type="radio" disabled checked={ques.answer == 4} value={"4"} id="btnradio1"
                                                                />
                                                            </p>
                                                            <div className="actlist_wid2">
                                                                <p className="py-0">
                                                                    4
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-1 mt-1 justify-content-center">
                                                        <div className="btn-group mt-1 align-items-center">
                                                            <p className="affir_checkbox">
                                                                <input
                                                                    type="radio" disabled checked={ques.answer == 5} value={"5"} id="btnradio1"
                                                                />
                                                            </p>
                                                            <div className="actlist_wid2">
                                                                <p className="py-0">
                                                                    5
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-1 mt-1 justify-content-center">
                                                        <div className="btn-group mt-1 align-items-center">
                                                            <p className="affir_checkbox">
                                                                <input
                                                                    type="radio" disabled checked={ques.answer == 6} value={"6"} id="btnradio1"
                                                                />
                                                            </p>
                                                            <div className="actlist_wid2">
                                                                <p className="py-0">
                                                                    6
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-1 mt-1 justify-content-center">
                                                        <div className="btn-group mt-1 align-items-center">
                                                            <p className="affir_checkbox">
                                                                <input
                                                                    type="radio" disabled checked={ques.answer == 7} value={"7"} id="btnradio1"
                                                                />
                                                            </p>
                                                            <div className="actlist_wid2">
                                                                <p className="py-0">
                                                                    7
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-1 mt-1 justify-content-center">
                                                        <div className="btn-group mt-1 align-items-center">
                                                            <p className="affir_checkbox">
                                                                <input
                                                                    type="radio" disabled checked={ques.answer == 8} value={"8"} id="btnradio1"
                                                                />
                                                            </p>
                                                            <div className="actlist_wid2">
                                                                <p className="py-0">
                                                                    8
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-1 mt-1 justify-content-center">
                                                        <div className="btn-group mt-1 align-items-center">
                                                            <p className="affir_checkbox">
                                                                <input
                                                                    type="radio" disabled checked={ques.answer == 9} value={"9"} id="btnradio1"
                                                                />
                                                            </p>
                                                            <div className="actlist_wid2">
                                                                <p className="py-0">
                                                                    9
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-1 mt-1 justify-content-center">
                                                        <div className="btn-group mt-1 align-items-center">
                                                            <p className="affir_checkbox">
                                                                <input value={"10"} id="btnradio2"
                                                                    type="radio" disabled checked={ques.answer == 10}
                                                                />
                                                            </p>
                                                            <div className="actlist_wid2">
                                                                <p className="py-0">
                                                                    10
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            if (ques.type === 'info') {
                                return (
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            {/* <p className="whole_label">{element.title || ""} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p> */}
                                            <p className="whole_label">Patient Information <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                                        </div>
                                        <div className="col-md-12">
                                            <p className="text-secondary">{ques.helpText}</p>

                                        </div>
                                        <div className="container ">
                                            <div className="row">
                                                {ques.options?.map((dt, i) => {
                                                    console.log(dt, "dt")
                                                    return (
                                                        <div className="col-sm-6 mt-1 justify-content-center">
                                                            <div
                                                                key={i}
                                                                className={`mb-1`}>
                                                                <p className="py-0">
                                                                    {dt}<span style={{ color: "red", fontWeight: "bold" }}> *</span>
                                                                </p>
                                                                {(dt !== 'Gender' && dt !== 'Relationship Status' && dt !== 'Date of Birth' && dt !== 'Address') && <input
                                                                    type="text"
                                                                    disabled
                                                                    className="description_inputForm ps-0"
                                                                    name={dt+'_'+index}
                                                                    value={ques.answer[dt]}
                                                                />}
                                                                {dt == 'Address' && <input
                                                                    type="text"
                                                                    disabled
                                                                    className="description_inputForm ps-0"
                                                                    name={dt+'_'+index}
                                                                    value={ques.answer[dt]}
                                                                />}
                                                                {dt == 'Gender' && <select
                                                                    name={dt+'_'+index}
                                                                    className="description_inputForm ps-0"
                                                                    value={ques.answer[dt]}
                                                                    disabled
                                                                >
                                                                    <option selected disabled>Select Gender</option>
                                                                    <option value="male">Male</option>
                                                                    <option value="female">Female</option>
                                                                    <option value="transgender">Transgender</option>
                                                                    <option value="other">Other</option>
                                                                </select>}
                                                                {dt == 'Relationship Status' && <select
                                                                    disabled
                                                                    name={dt+'_'+index}
                                                                    className="description_inputForm ps-0"
                                                                    value={ques.answer[dt]}
                                                                >
                                                                    <option selected disabled>Select Status</option>
                                                                    <option value="single">Single</option>
                                                                    <option value="married">Married</option>
                                                                </select>}
                                                                {dt == 'Date of Birth' && <DateInput
                                                                    disabled
                                                                    imageStyle={{ width: "22px", height: "22px", position: "absolute", borderRadius: "0px", marginBlock: "17px", left: 0 }}
                                                                    inputClassName={"description_inputForm d-flex align-items-center ps-2"}
                                                                    value={new Date(ques.answer[dt])}
                                                                />}
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            if (ques.type === 'waiverProvider') {
                                return (
                                    <div className="card px-3 mb-2">
                                        <p className="whole_label my-2 py-0">Provider's Waiver</p>
                                        <p className="whole_label mt-2">Signature <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                                        <p style={{ fontStyle: 'italic' }}>{ques.title}</p>
                                        <p className="whole_label mt-2">Acknowledgement <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                                        <p>I agreed to the terms and conditions</p>
                                    </div>
                                )
                            }
                            if (ques.type === 'waiverClient') {
                                return (
                                    <div className="card px-3 mb-2">
                                        <p className="whole_label my-2 py-0">Client's Waiver</p>
                                        <p className="whole_label mt-2">Signature <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                                        <p style={{ fontStyle: 'italic' }}>{ques.answer.name}</p>
                                        <p className="whole_label mt-2">Acknowledgement <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                                        <p>I agreed to the terms and conditions</p>
                                    </div>
                                )
                            }
                        })}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        {/* <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button> */}
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 mb-5">
                        <Sidebar />
                    </div>
                    <div className="col-md-10 py-4 px-5">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item pointer" onClick={() => navigate(-2)}>Library</li>
                                <li class="breadcrumb-item pointer" onClick={() => navigate(-1)}>Forms & Waivers</li>
                                <li class="breadcrumb-item active fw-bold" aria-current="page">Responses</li>
                            </ol>
                        </nav>
                        {renderForm()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResponseListView;
