import React, { useEffect, useState } from "react";
import { BsFillPlusCircleFill, BsThreeDots } from "react-icons/bs";

import { getUploadFileCategory, uploadFile } from "../../services/FileUploadService";
import { getFileName, isEmpty } from "../../Utils/Helper";
import Select from "react-select";
import TimePicker from "../../commonComponent/TimePicker";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { getSupplementData, getSupplementQuantity } from "../../services/CreateCarePlanService";
import Button from "../../commonComponent/Button";
import { Dropdown } from "react-bootstrap";


const Supplements = () => {
    let location = useLocation();
    let plan = location?.state?.careplan || [];
    let supplementDetails = location?.state?.supplements || [];
    console.log(plan, "supplementDEtails")
    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [medicationName, setMedicationName] = useState('');
    const [isLoading, setLoader] = useState(false);
    const [showTimePicker, setTimePickerVisible] = useState(false);
    const [quantity, setQuantity] = useState("");
    const [searchWord, setSearchWord] = useState("");
    const [schedule, setSchedule] = useState("Everyday");
    const [ch, setch] = useState("00");
    const [cm, setcm] = useState("00");
    const [defaultSupplement, setDefaultSupplement] = useState("");
    const [calories, setcalories] = useState("");
    const [supplementName, setSupplementName] = useState([]);
    const [time, setTime] = useState("");
    const [image, setImage] = useState("");
    const [note, setNote] = useState("");
    const [flname, setflname] = useState("");
    const [allFormData, setAllFormData] = useState([]);
    // const [isLoading, setLoader] = useState(false);
    const checkValidation = () => {
        try {
            let errorsResult = error;
            let isValid = true;
            if (!medicationName || isEmpty(medicationName)) {
                isValid = false;
                errorsResult = { ...errorsResult, medicationName: true }
            }
            if (!searchWord || isEmpty(searchWord)) {
                isValid = false;
                errorsResult = { ...errorsResult, quantity: true }
            }
            if (!quantity || isEmpty(quantity)) {
                isValid = false;
                errorsResult = { ...errorsResult, quantity: true }
            }
            if (!schedule || isEmpty(schedule)) {
                isValid = false;
                errorsResult = { ...errorsResult, schedule: true }
            }

            setError(errorsResult)
            if (isValid) {
                handleData({
                    supplementName: medicationName,
                    quantity: quantity,
                    time: `${ch}:${cm}`,
                    schedule: schedule
                })
            }

        } catch (error) {

        }
    }

    const handleData = (data) => {
        // console.log(data)
        setAllFormData([...allFormData, data])
    }
    let removeFormFields = (i) => {
        let newFormValues = [...allFormData];
        newFormValues.splice(i, 1);
        setAllFormData(newFormValues)
    }
    const timeSetting = (date12, date24) => {
        const myArray = date24.split(":");
        setch(myArray[0] < 10 ? "0" + myArray[0] : myArray[0])
        setcm(myArray[1])
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

    }
    const getSupplementList = async (searchWord1) => {
        try {
            const response = await getSupplementData(searchWord1)
            // setLoader(false)
            console.log(searchWord1, "search")
            if (response) {
                console.log(response.data.hits, "supplements")
                setSupplementName(response.data.hits)
                setMedicationName({
                    label: response.data.hits[0]._source.fullName,
                    value: response.data.hits[0]._id,
                })
                getSupplementQuantityData(response.data.hits[0]._id);
            }
        } catch (error) {
            // setLoader(false)
            console.log(error);
        }
    }
    const getSupplementQuantityData = async (supplementId) => {
        try {
            const response = await getSupplementQuantity(supplementId)
            if (response) {
                // console.log(response.data.servingSizes[0].minQuantity, "supplements quantity")
                setQuantity(response.data.servingSizes[0].minQuantity)
                // setSupplementName(response.data.hits)
                // setMedicationName({
                //     label: response.data.hits[0]._source.fullName,
                //     value: response.data.hits[0]._id,
                // })
            }
        } catch (error) {
            // setLoader(false)
            console.log(error);
        }
    }
    useEffect(() => {
        setAllFormData(supplementDetails);
    }, [])

    const getList = () => {
        const result = supplementName.map((item) => {
            return {
                label: item._source.fullName,
                value: item._id,
            };
        });
        // setDefaultSupplement(result[0]);
        return result || [];
    };
    const uploadPicture = async (e) => {
        setImage(e.target.files[0]);
        const filename = getFileName(e.target.files[0]);
        try {
            await uploadFile(e.target.files[0], getUploadFileCategory.recipe, filename);
            setflname(filename);

        } catch (error) {
            console.log(error);
        }
    }
    const renderList = () => {
        return (
            <table class="table table-hover">
                <tbody>

                    {allFormData?.map((item, index) => {

                        return (
                            <tr>
                                <td className="text-muted">{item.supplementName.label}</td>
                                <td className="text-muted">{item.quantity}</td>
                                <td className="text-muted">{item.schedule}</td>
                                <td className="text-muted">{item.schedule === "Every morning" || item.schedule === "Every night" || item.schedule === "Everyday" ? item.time : ""}</td>
                                <td className="text-muted fw-bold text-left overflow-visible" style={{ cursor: 'pointer' }}>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="light" className="custom" id="dropdown-basic">
                                            <BsThreeDots className="icon" />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-3" data-bs-toggle="modal" data-bs-target="#shareModal" onClick={() => removeFormFields(index)}>Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        )
    }

    const renderForm = () => {
        return (
            <>
                <div className="my-4">
                    <h2>Supplements</h2>
                    <p>View and fill in client supplements.</p>
                </div>
                <div className="actsearch_medi mb-4">
                    <FiSearch className="boxicon" />
                    <input
                        placeholder="Search for supplements-mineral,vitamin,herb...."
                        className="ms-2"
                        onChange={(e) => {
                            getSupplementList(e.target.value);
                            setSearchWord(e.target.value)
                        }}
                        value={searchWord}
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row   add-recipe">
                        <div className="col-md-4">
                            <div className="position-sticky" style={{ "top": 20 }}>
                                <img
                                    src={(image && URL.createObjectURL(image)) || "images/dummy_image.jpg"}
                                    alt=""
                                    className="active_dummyimage"
                                />
                                <input type="file" className="form-control uploader-input_"
                                    accept="image/*"
                                    onChange={(e) => {
                                        uploadPicture(e);
                                    }}
                                />
                                <div className="uploader-mask d-flex justify-content-center align-items-center">
                                    <BsFillPlusCircleFill className="upload-icon" />
                                </div>
                                {(error && !image) && <h2 className="text-danger error">Picture should not be empty.</h2>}
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="row">

                                <div className="col-md-12">
                                    <p className="whole_label">Supplements Name <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                                    <Select
                                        placeholder={"Select supplement from the list..."}
                                        className=" description_inputMedi1"
                                        onChange={(data) => {
                                            // console.log(data.value, "ele")
                                            setMedicationName(data);
                                            getSupplementQuantityData(data.value);
                                        }
                                        }

                                        options={getList()}
                                        value={medicationName}
                                    />
                                    {(error && !medicationName) && <h2 className="text-danger error">Supplement name should not be empty.</h2>}
                                    {/* <input
                                        type="text"
                                        className="description_inputMedi  "
                                        placeholder="List all medications-Vitamins,Minerals,Herbs"
                                        value={medicationName}
                                        maxLength="40"
                                        onChange={(e) => setMedicationName(e.target.value)}
                                    />
                                    {(error && !medicationName) && <h2 className="text-danger error">Medication name should not be empty.</h2>} */}
                                </div>
                                <div className="col-md-12">
                                    <p className="whole_label  ">Frequency <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                                </div>
                                <div className="col-md-4">
                                    <p className="whole_label text-secondary">Quantity</p>
                                    <input
                                        type="text"
                                        className="description_inputf"
                                        placeholder="E.g 1 or 2"
                                        value={quantity}
                                        onChange={(e) => { setQuantity(e.target.value) }}
                                    />
                                    {(error && !quantity) && <h2 className="text-danger error">Quantity should not be empty.</h2>}
                                </div>
                                <div className="col-md-4">
                                    <p className="whole_label text-secondary">Schedule</p>
                                    <select className="description_inputf  "
                                        value={schedule}
                                        onChange={(e) => setSchedule(e.target.value)}
                                    >
                                        <option value="Everyday">Everyday</option>
                                        <option value="Twice/day">Twice/day</option>
                                        <option value="Three Times/day">Three Times/day</option>
                                        <option value="Four Times/day">Four Times/day</option>
                                        <option value="Every morning">Every morning</option>
                                        <option value="Every night">Every night</option>
                                    </select>
                                    {(error && !schedule) && <h2 className="text-danger error">Schedule should not be empty.</h2>}
                                </div>

                                <div className="col-md-3">
                                    <p className="whole_label text-secondary">Time</p>
                                    <TimePicker
                                        value={`${ch}:${cm}`}
                                        visibility={showTimePicker}
                                        onChangeDate={timeSetting}
                                        onDone={() => setTimePickerVisible(false)}
                                        hour12Mode
                                    >
                                        <span onClick={() => setTimePickerVisible(!showTimePicker)}>
                                            <input

                                                placeholder="--:--"
                                                disabled={schedule !== 'Everyday' && schedule !== 'Every morning' && schedule !== 'Every night'}
                                                className="description_inputf  "
                                                value={`${ch}:${cm}`}
                                            />
                                            <img src="images/clock.png" className="clock_icon" />
                                        </span>
                                    </TimePicker>
                                    {/* {(error && (ch <= 0 && cm <= 0)) && <h2 className="text-danger error">Time cannot not be 0.</h2>} */}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mt-4 ">
                            <button className="description_btnsave justify-content-end flex-end" onClick={() => {
                                checkValidation();
                                //    handleData({
                                //         supplementName: medicationName,
                                //         quantity: quantity,
                                //         time: `${ch}:${cm}`,
                                //         schedule: schedule
                                //     })
                                setMedicationName("");
                                setSearchWord("");
                                setQuantity("1");
                                setch("00");
                                setcm("00");
                            }}>Add</button>
                        </div>


                    </div>
                </form>
                {allFormData.length ?
                    <div className="col-md-12 mt-4">
                        <p className="whole_label  ">Supplements <span className="text-lowercase">added: </span></p>
                        {renderList()}
                    </div>
                    : null}
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar />
                    </div>
                    <div className="col-md-10">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item" onClick={() => navigate('/')}>Dashboard</li>
                                <li class="breadcrumb-item" onClick={() => navigate(-1)}>Careplan</li>
                                <li class="breadcrumb-item active fw-bold" aria-current="page">Supplements</li>
                            </ol>
                        </nav>
                        <div className="container" style={{ marginBottom: 100 }}>
                            <div className="row justify-content-start">
                                {renderForm()}
                            </div>
                        </div>
                        <div className="col-md-12 mt-5">
                            <hr />
                            <div className="d-flex justify-content-between">
                                <div text={'Cancel'} style={isLoading ? { cursor: 'none' } : { cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9' }} className="description_btnsave d-flex justify-content-center align-items-center" onClick={() => navigate(-1)}>Cancel</div>
                                <Button isLoading={isLoading} type="submit" id="reateProgram" text={'Save & Continue'} style={isLoading ? { cursor: 'none' } : {}} className="description_btnsave" onClick={() => { navigate("/editplan", { state: { careplan: plan, supplementDetail: allFormData } }) }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Supplements;
