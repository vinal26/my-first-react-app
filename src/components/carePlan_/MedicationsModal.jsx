import React, { useEffect, useState } from "react";
import { BsFillPlusCircleFill, BsThreeDots } from "react-icons/bs";
import { getUploadFileCategory, uploadFile } from "../../services/FileUploadService";
import { getFileName, isEmpty } from "../../Utils/Helper";
import Creatable from "react-select/creatable";
import Select, { components } from "react-select";
import TimePicker from "../../commonComponent/TimePicker";
import { FiEdit, FiSearch } from "react-icons/fi";
import { getMedicationData } from "../../services/CreateCarePlanService";
import { Dropdown } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

const NoOptionsMessage = (props) => {
    return (
        <components.NoOptionsMessage {...props}>
            <span>Start searching now</span>
        </components.NoOptionsMessage>
    );
};

const MedicationsModal = ({ medicationDetails, setMedicationsDetails }) => {
    // let location = useLocation();
    // let plan = location?.state?.careplan || [];
    // let supplementDetails = location?.state?.supplements || [];
    // const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [medicationName, setMedicationName] = useState('');
    const [isLoading, setLoader] = useState(false);
    const [showTimePicker, setTimePickerVisible] = useState(false);
    const [quantity, setQuantity] = useState("1");
    const [searchWord, setSearchWord] = useState("");
    const [schedule, setSchedule] = useState("Every morning");
    const [medicationData, setMedicationData] = useState([]);
    const [recommendedUse, setRecommendedUse] = useState("With meals");
    const [ch, setch] = useState("00");
    const [cm, setcm] = useState("00");
    const [note, setNote] = useState("");
    const [image, setImage] = useState("");
    const [flname, setflname] = useState("");
    const [editIndex, setEditIndex] = useState(-1);
    // const [allFormData, setAllFormData] = useState([]);
    const [showDropdown, setShowDropdown] = useState(true);
    const setDropdown = () => {
        setShowDropdown(!showDropdown)
    }
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
                errorsResult = { ...errorsResult, searchWord: true }
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
                setError(false);
            }

        } catch (error) {

        }
    }
    const handleFormChange = (index, event) => {
        // console.log(event, "event");
        setEditIndex(index);
        let data = [...medicationDetails];
        const myArray = event.time.split(":");
        setch(myArray[0])
        setcm(myArray[1])
        // console.log(data, "event Data");
        setMedicationName(event.medicineName);
        setQuantity(event.quantity);
        setRecommendedUse(event.recommendedUse);
        setNote(event.note);
        setSchedule(event.schedule);
        data[index][event.medicineName] = event.target.value;
        data[index][event.quantity] = event.target.value;
        data[index][event.recommendedUse] = event.target.value;
        data[index][event.note] = event.target.value;
        data[index][event.schedule] = event.target.value;
        data[index][event.myArray[0]] = event.target.value;
        data[index][event.myArray[1]] = event.target.value;
        setMedicationsDetails(data);
    }

    const handleData = (data) => {
        if (editIndex > -1) {
            let arr = [...medicationDetails]
            arr[editIndex] = data;
            setMedicationsDetails(arr)
        } else {
            setMedicationsDetails([...medicationDetails, data])
        }

    }
    let removeFormFields = (i) => {
        let newFormValues = [...medicationDetails];
        newFormValues.splice(i, 1);
        setMedicationsDetails(newFormValues)
    }
    const timeSetting = (date12, date24) => {
        const myArray = date24.split(":");
        setch(myArray[0] < 10 ? "0" + myArray[0] : myArray[0])
        setcm(myArray[1])
    }

    // const handleSubmit = async (e) => {

    //     e.preventDefault();

    // }
    const getMedicationList = async (searchWord1) => {
        try {
            const response = await getMedicationData(searchWord1)
            // setLoader(false)
            // console.log(searchWord1, "search")
            if (response) {
                // console.log(response.data.results[0].patient.drug, "medications")
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
                    {medicationDetails?.map((item, index) => {
                        return (
                            <tr>
                                <td className="text-muted">{item.medicineName.label}</td>
                                <td className="text-muted">{item.quantity}</td>

                                <td className="text-muted">{item.schedule}</td>
                                <td className="text-muted">{item.schedule === "Every morning" || item.schedule === "Every night" ? item.time : ""}</td>
                                <td className="text-muted">{item.note}</td>
                                <td className="text-muted">{item.recommendedUse}</td>
                                <td className="text-muted fw-bold text-left overflow-visible" style={{ cursor: 'pointer' }}>
                                    <div className="d-flex gap-1">
                                        <button type="button" onClick={() => removeFormFields(index)} className="btn btn-light"><FaTrash className="mb-1" /></button>
                                        <button type="button" onClick={() => handleFormChange(index, item)} className="btn btn-light"><FiEdit className="mb-1" /></button>
                                    </div>
                                    {/* <Dropdown>
                                        <Dropdown.Toggle variant="light" className="custom" id="dropdown-basic">
                                            <BsThreeDots className="icon" />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item type="button" onClick={() => removeFormFields(index)}>Delete</Dropdown.Item>
                                            <Dropdown.Item type="button" onClick={() => handleFormChange(index, item)}>Edit</Dropdown.Item>
                                        </Dropdown.Menu>

                                    </Dropdown> */}
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
                <div className="my-1">
                    {/* <h2>Supplements</h2> */}
                    {/* <p>View and fill in client supplements.</p> */}
                </div>
                {/* <div className="actsearch_medi mb-4">
                    <FiSearch className="boxicon" />
                    <input
                        placeholder="Search for medications...."
                        className="ms-2"
                        onChange={(e) => {
                            getMedicationList(e.target.value);
                            setSearchWord(e.target.value)
                        }}
                        value={searchWord}
                    />
                </div> */}
                {/* <form onSubmit={handleSubmit}> */}
                <div className="row   add-recipe">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <p className="whole_label">Condition Type <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                                <input
                                    type="text"
                                    placeholder="Search for medications...."
                                    className="description_inputf"
                                    onChange={(e) => {
                                        getMedicationList(e.target.value);
                                        setSearchWord(e.target.value)
                                    }}
                                    value={searchWord}
                                />
                                {(error && !searchWord) && <h2 className="text-danger error">Search condition type to continue.</h2>}
                            </div>
                            <div className="col-md-12">
                                <p className="whole_label">Medications Name <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
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
                                {(error && !medicationName) && <h2 className="text-danger error">Medication name should not be empty.</h2>}

                            </div>
                            <div className="col-md-12">
                                <p className="whole_label  ">Frequency </p>
                            </div>
                            <div className="col-md-6">
                                <p className="whole_label text-secondary">Quantity</p>
                                <input
                                    type="number"
                                    className="description_inputf"
                                    placeholder="E.g 1"
                                    min={0}
                                    value={quantity}
                                    onChange={(e) => { setQuantity(e.target.value) }}
                                />
                                {(error && !quantity) && <h2 className="text-danger error">Quantity should not be empty.</h2>}
                            </div>
                            <div className="col-md-6">
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

                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <p className="whole_label text-secondary">Recommended Use</p>
                                <select className="description_inputf  "
                                    value={recommendedUse}
                                    onChange={(e) => setRecommendedUse(e.target.value)}
                                >
                                    <option value="After meals">After meal</option>
                                    <option value="With meals">With meals</option>
                                    <option value="Between meals">Between meals</option>
                                    <option value="On an empty stomach">On an empty stomach</option>
                                </select>
                                {(error && !recommendedUse) && <h2 className="text-danger error">Recommended use should not be empty.</h2>}
                            </div>
                            <div className="col-md-6">
                                <p className="whole_label text-secondary">Time</p>
                                <TimePicker
                                    value={`${ch}:${cm}`}
                                    visibility={showTimePicker}
                                    onChangeDate={timeSetting}
                                    onDone={() => setTimePickerVisible(false)}
                                    hour12Mode
                                >
                                    <span className={schedule !== 'Every morning' && schedule !== 'Every night' ? "event-none " : null} onClick={() => setTimePickerVisible(!showTimePicker)}>
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
                        <button className="description_btnsave" type="button" onClick={() => {
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
                            setch("00");
                            setcm("00");
                            setNote("")
                            setEditIndex(-1)
                        }}>{editIndex > -1 ? "Edit" : "Add"}</button>
                    </div>
                </div>
                {/* </form> */}
                {medicationDetails.length ?
                    <div className="col-md-12 mt-2">
                        <p className="whole_label  ">Medications <span className="text-lowercase">added: </span></p>
                        {renderList()}
                    </div>
                    : null}
            </>
        );
    }
    return (
        <div class="modal fade" id="medicationsModal" aria-labelledby="memberModalLabel" aria-hidden="true">
            <div class="modal-dialog" style={{ maxWidth: '900px' }}>
                <div class="modal-content">
                    <div class="modal-header p-4 border-0">
                        <h5 className="ms-2">Medications</h5>
                        <button type="button" class="btn-close border-0" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <p style={{ marginLeft: 34, marginTop: -25 }}>View and fill in client medications.</p>
                    <div class="modal-body pb-4 px-4">

                        <div className="container" style={{ marginBottom: 100 }}>
                            <div className="row justify-content-start">
                                {renderForm()}
                            </div>
                        </div>
                        <hr />
                        <div className="modal-footer px-5 border-0">
                            <button type="button" onClick={() => document.getElementById('btn-close').click()} data-bs-dismiss="modal"
                                className="description_btnsave w-100 " style={{
                                    backgroundColor: "#1F7E78",
                                    borderColor: "#1f7e78",
                                }}>
                                {'Submit'}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

};

export default MedicationsModal;
