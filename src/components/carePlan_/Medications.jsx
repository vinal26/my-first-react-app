import React, { useEffect, useState } from "react";
import { BsFillPlusCircleFill, BsThreeDots } from "react-icons/bs";
import { getUploadFileCategory, uploadFile } from "../../services/FileUploadService";
import { getFileName, isEmpty } from "../../Utils/Helper";
import Select from "react-select";
import TimePicker from "../../commonComponent/TimePicker";
import Button from "../../commonComponent/Button";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { getMedicationData } from "../../services/CreateCarePlanService";
import { Dropdown } from "react-bootstrap";

const Medications = () => {
    const navigate = useNavigate();
    let location = useLocation();
    let plan = location?.state?.careplan || [];
    let medicationDetails = location?.state?.medications || [];

    const [error, setError] = useState(false);
    const [medicationName, setMedicationName] = useState('');
    const [showTimePicker, setTimePickerVisible] = useState(false);
    const [quantity, setQuantity] = useState("");
    const [searchWord, setSearchWord] = useState("");
    const [frequency, setFrequency] = useState("");
    const [schedule, setSchedule] = useState("");
    const [ch, setch] = useState("00");
    const [cm, setcm] = useState("00");
    const [calories, setcalories] = useState("");
    const [medicationData, setMedicationData] = useState([]);
    const [recommendedUse, setRecommendedUse] = useState("");
    const [time, setTime] = useState("");
    const [image, setImage] = useState("");
    const [note, setNote] = useState("");
    const [flname, setflname] = useState("");
    const [isLoading, setLoader] = useState(false);
    const [allFormData, setAllFormData] = useState([]);
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
                    medicineName: medicationName,
                    quantity: quantity,
                    time: `${ch}:${cm}`,
                    schedule: schedule,
                    recommendedUse: recommendedUse,
                    note: note
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
    useEffect(() => {
        setAllFormData(medicationDetails);
    }, [])
    const getMedicationList = async (searchWord1) => {
        try {
            const response = await getMedicationData(searchWord1)
            // setLoader(false)
            // console.log(searchWord1, "search")
            if (response) {
                console.log(response.data.results[0].patient.drug, "medications")
                setMedicationData(response.data.results[0].patient.drug[0].openfda.brand_name)
                setMedicationName({
                    label: response.data.results[0].patient.drug[0].openfda.brand_name[0],
                    value: response.data.results[0].patient.drug[0].openfda.brand_name[0],
                })
                // getSupplementQuantityData(response.data.hits[0]._id);
            }
        } catch (error) {
            // setLoader(false)
            console.log(error);
        }
    }
    const getList = () => {
        const result = medicationData.map((item) => {
            return {
                label: item,
                value: item,
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
                                <td className="text-muted">{item.medicineName.label}</td>
                                <td className="text-muted">{item.quantity}</td>

                                <td className="text-muted">{item.schedule}</td>
                                <td className="text-muted">{item.schedule === "Every morning" || item.schedule === "Every night" ? item.time : ""}</td>
                                <td className="text-muted">{item.note}</td>
                                <td className="text-muted">{item.recommendedUse}</td>
                                <td className="text-muted fw-bold text-left overflow-visible" style={{ cursor: 'pointer' }}>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="light" className="custom" id="dropdown-basic">
                                            <BsThreeDots className="icon" />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => removeFormFields(index)}>Delete</Dropdown.Item>
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
                    <h2>Medications</h2>
                    <p>View and fill in client medications.</p>
                </div>
                <div className="actsearch_medi mb-4">
                    <FiSearch className="boxicon" />
                    <input
                        placeholder="Search for topic..."
                        className="ms-2"
                        onChange={(e) => {
                            getMedicationList(e.target.value);
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
                                    <p className="whole_label">Name <span className="text-lowercase">of </span>Medication <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                                    <Select
                                        placeholder={"Select medication from the list..."}
                                        className=" description_inputMedi1"
                                        onChange={(data) => {
                                            // console.log(data.value, "ele")
                                            setMedicationName(data);
                                            // getSupplementQuantityData(data.value);
                                        }
                                        }

                                        options={getList()}
                                        value={medicationName}
                                    />
                                    {/* <input
                                        type="text"
                                        className="description_inputMedi  "
                                        placeholder="List all medications-Vitamins,Minerals,Herbs"
                                        value={medicationName}
                                        maxLength="40"
                                        onChange={(e) => setMedicationName(e.target.value)}
                                    /> */}
                                    {(error && !medicationName) && <h2 className="text-danger error">Medication name should not be empty.</h2>}
                                </div>
                                <div className="col-md-12">
                                    <p className="whole_label  ">Frequency <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                                </div>
                                <div className="col-md-4">
                                    <p className="whole_label text-secondary">Quantity</p>
                                    <input
                                        type="text"
                                        className="description_inputf"
                                        placeholder="E.g Twice or Once"
                                        value={quantity}
                                        onChange={(e) => { setQuantity(e.target.value) }}
                                    />
                                    {(error && !quantity) && <h2 className="text-danger error">Quantity should not be empty.</h2>}
                                </div>
                                <div className="col-md-4">
                                    <p className="whole_label text-secondary">Schedule</p>
                                    <select className="description_inputf  "
                                        onChange={(e) => setSchedule(e.target.value)}
                                        value={schedule}
                                    >
                                        <option value="Twice/day">Twice/day</option>
                                        <option value="Three Times/day">Three Times/day</option>
                                        <option value="Four Times/day">Four Times/day</option>
                                        <option value="Every morning">Every morning</option>
                                        <option value="Every night">Every night</option>
                                    </select>
                                    {(error && !schedule) && <h2 className="text-danger error">Schedule should not be empty.</h2>}
                                </div>
                                <div className="col-md-4">
                                    <p className="whole_label text-secondary">Recommended Use</p>
                                    <select className="description_inputf  "
                                        value={recommendedUse}
                                        onChange={(e) => setRecommendedUse(e.target.value)}
                                    >
                                        <option value="With meals">With meals</option>
                                        <option value="Between meals">Between meals</option>
                                        <option value="On an empty stomach">On an empty stomach</option>
                                    </select>
                                    {(error && !recommendedUse) && <h2 className="text-danger error">Recommended use should not be empty.</h2>}
                                </div>
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
                                            required
                                            placeholder="--:--"
                                            disabled={schedule !== 'Every morning' && schedule !== 'Every night'}
                                            className="description_inputf  "
                                            value={`${ch}:${cm}`}
                                        />
                                        <img src="images/clock.png" className="clock_icon" />
                                    </span>
                                </TimePicker>
                                {/* {(error && (ch <= 0 && cm <= 0)) && <h2 className="text-danger error">Time cannot not be 0.</h2>} */}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <p className="whole_label  ">Note <span className="text-lowercase">for Patient</span></p>
                            <input
                                type="text"
                                className="description_inputMedi  "
                                placeholder="Shots and vaccinations (including flu shots)"
                                value={note}
                                maxLength="40"
                                onChange={(e) => setNote(e.target.value)}
                            />
                            {/* {(error && !note) && <h2 className="text-danger error">Note should not be empty.</h2>} */}
                        </div>
                        <div className="col-md-12">
                            <button className="description_btnsave" onClick={() => {
                                checkValidation();
                                // handleData({
                                //     medicineName: medicationName,
                                //     quantity: quantity,
                                //     time: `${ch}:${cm}`,
                                //     schedule: schedule,
                                //     recommendedUse: recommendedUse,
                                //     note: note
                                // });
                                setMedicationName("");
                                setSearchWord("");
                                setQuantity("1");
                                setch(schedule === "Every morning" || schedule === "Every night" ? "00" : "");
                                setcm(schedule === "Every morning" || schedule === "Every night" ? "00" : "");
                                setNote("")
                            }}>Add</button>
                        </div>


                    </div>
                </form>
                {/* <div className="col-md-12 mt-4">
                    <p className="whole_label  ">Medicatons <span className="text-lowercase">in </span> Use:</p>
                    {renderList()}
                </div> */}
                {allFormData.length ?
                    <div className="col-md-12 mt-4">
                        <p className="whole_label  ">Medicatons Added:</p>
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
                                <li class="breadcrumb-item active fw-bold" aria-current="page">Medication</li>
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
                                <Button isLoading={isLoading} type="submit" id="reateProgram" text={'Save & Continue'} style={isLoading ? { cursor: 'none' } : {}} className="description_btnsave" onClick={() => { navigate("/editplan", { state: { careplan: plan, medicationDetail: allFormData } }) }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Medications;
