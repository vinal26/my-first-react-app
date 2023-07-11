import React, { useEffect, useState } from "react";
import { BsFillPlusCircleFill, BsThreeDots } from "react-icons/bs";
import { getUploadFileCategory, uploadFile } from "../../services/FileUploadService";
import { getFileName, isEmpty } from "../../Utils/Helper";
import Creatable from "react-select/creatable";
import Select, { components } from "react-select";
import TimePicker from "../../commonComponent/TimePicker";
import { FiEdit, FiSearch } from "react-icons/fi";
import { getSupplementData, getSupplementQuantity } from "../../services/CreateCarePlanService";
import { Dropdown } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
const NoOptionsMessage = (props) => {
    return (
        <components.NoOptionsMessage {...props}>
            <span>Start searching now</span>
        </components.NoOptionsMessage>
    );
};

const SupplementsModal = ({ supplimentDetails, setSupplimentsDetails }) => {
    // let location = useLocation();
    // let plan = location?.state?.careplan || [];
    // let supplementDetails = location?.state?.supplements || [];
    // const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [medicationName, setMedicationName] = useState('');
    const [isLoading, setLoader] = useState(false);
    const [showTimePicker, setTimePickerVisible] = useState(false);
    const [quantity, setQuantity] = useState("");
    const [searchWord, setSearchWord] = useState("");
    const [schedule, setSchedule] = useState("Everyday");
    const [ch, setch] = useState("00");
    const [cm, setcm] = useState("00");
    const [supplementName, setSupplementName] = useState([]);
    const [image, setImage] = useState("");
    const [flname, setflname] = useState("");
    const [editIndex, setEditIndex] = useState(-1);
    // const [allFormData, setAllFormData] = useState([]);
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
                    supplementName: medicationName,
                    quantity: quantity,
                    time: `${ch}:${cm}`,
                    schedule: schedule
                })
                setError(false);
            }

        } catch (error) {

        }
    }
    const handleFormChange = (index, event) => {
        setEditIndex(index);
        const myArray = event.time.split(":");
        setch(myArray[0])
        setcm(myArray[1])
        // console.log(event, "event");

        let data = [...supplimentDetails];
        // console.log(data, "event Data");
        setMedicationName(event.supplementName);
        setQuantity(event.quantity);
        setSchedule(event.schedule);
        // timeSetting(event.time)
        data[index][event.medicineName] = event.target.value;
        data[index][event.quantity] = event.target.value;
        data[index][event.schedule] = event.target.value;
        data[index][event.myArray[0]] = event.target.value;
        data[index][event.myArray[1]] = event.target.value;
        setSupplimentsDetails(data);
    }

    const handleData = (data) => {
        if (editIndex > -1) {
            let arr = [...supplimentDetails]
            arr[editIndex] = data;
            setSupplimentsDetails(arr)
        } else {
            setSupplimentsDetails([...supplimentDetails, data])
        }
    }
    let removeFormFields = (i) => {
        let newFormValues = [...supplimentDetails];
        newFormValues.splice(i, 1);
        setSupplimentsDetails(newFormValues)
    }
    const timeSetting = (date12, date24) => {
        const myArray = date24.split(":");
        setch(myArray[0] < 10 ? "0" + myArray[0] : myArray[0])
        setcm(myArray[1])
    }

    // const handleSubmit = async (e) => {

    //     e.preventDefault();

    // }
    const getSupplementList = async (searchWord1) => {
        try {
            const response = await getSupplementData(searchWord1)
            // setLoader(false)
            console.log(searchWord1, "search")
            if (response) {
                // console.log(response.data.hits, "supplements")
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
                setQuantity(response.data.servingSizes[0].minQuantity.toString())
            }
        } catch (error) {
            // setLoader(false)
            console.log(error);
        }
    }
    // useEffect(() => {
    //     setAllFormData(supplimentDetails);
    // }, [])

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
                    {supplimentDetails?.map((item, index) => {
                        return (
                            <tr>
                                <td className="text-muted">{item.supplementName.label}</td>
                                <td className="text-muted">{item.quantity}</td>
                                <td className="text-muted">{item.schedule}</td>
                                <td className="text-muted">{item.schedule === "Every morning" || item.schedule === "Every night" || item.schedule === "Everyday" ? item.time : ""}</td>
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
                {/* <div className="col-md-12 actsearch_medi mb-4 ">
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
                </div> */}
                {/* <form onSubmit={handleSubmit}> */}

                <div className="row   add-recipe">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <p className="whole_label  ">Supplement <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                                <input
                                    type="text"
                                    placeholder="Search for supplements-mineral,vitamin,herb...."
                                    className="description_inputf"
                                    onChange={(e) => {
                                        getSupplementList(e.target.value);
                                        setSearchWord(e.target.value)
                                    }}
                                    value={searchWord}
                                />
                            </div>
                            {(error && !searchWord) && <h2 className="text-danger error">Search condition type to continue.</h2>}
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
                            <div className="col-md-3">
                                <p className="whole_label text-secondary">Quantity</p>
                                <input
                                    type="number"
                                    className="description_inputf"
                                    placeholder="1 or 2"
                                    value={quantity}
                                    min={0}
                                    onChange={(e) => { setQuantity(e.target.value) }}
                                />
                                {(error && !quantity) && <h2 className="text-danger error">Quantity should not be empty.</h2>}
                            </div>
                            <div className="col-md-6">
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
                                    <span className={schedule !== 'Everyday' && schedule !== 'Every morning' && schedule !== 'Every night' ? "event-none " : null} onClick={() => setTimePickerVisible(!showTimePicker)}>
                                        <input
                                            // required
                                            placeholder="--:--"
                                            disabled={schedule !== 'Everyday' && schedule !== 'Every morning' && schedule !== 'Every night'}
                                            className="description_inputf"
                                            value={`${ch}:${cm}`}
                                        />
                                        <img src="images/clock.png" className="clock_icon" />
                                    </span>
                                </TimePicker>
                                {/* {(error && (ch <= 0 && cm <= 0)) && <h2 className="text-danger error">Time cannot not be 0.</h2>} */}
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-md-12">
                        <div className="position-sticky" style={{ "top": 10 }}>
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
                    </div> */}
                    <div className="col-md-4 mt-4 ">
                        <button type="button" className="description_btnsave justify-content-end flex-end" onClick={() => {
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
                            setEditIndex(-1)
                        }}>{editIndex > -1 ? "Edit" : "Add"}</button>
                    </div>


                </div>
                {/* </form> */}
                {supplimentDetails.length ?
                    <div className="col-md-12 mt-4">
                        <p className="whole_label  ">Supplements <span className="text-lowercase">added: </span></p>
                        {renderList()}
                    </div>
                    : null}
            </>
        );
    }
    return (
        <div class="modal fade" id="supplementsModal" aria-labelledby="memberModalLabel" aria-hidden="true">
            <div class="modal-dialog" style={{ maxWidth: '900px' }}>
                <div class="modal-content">
                    <div class="modal-header p-4 border-0">
                        <h5 className="ms-2">Supplements</h5>
                        <button type="button" class="btn-close border-0" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <p style={{ marginLeft: 33, marginTop: -25 }}>View and fill in client supplements.</p>
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
                        {/* <div className="col-md-12 mt-5">
                            <hr />
                            <div className="d-flex justify-content-right">
                                {/* <div text={'Cancel'} style={isLoading ? { cursor: 'none' } : { cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9' }} className="description_btnsave d-flex justify-content-center align-items-center">Cancel</div> */}
                        {/* <Button isLoading={isLoading} onClick={() => document.getElementById('btn-close').click()} id="reateProgram" data-bs-dismiss="modal" text={'Save & Continue'} style={isLoading ? { cursor: 'none' } : {}} className="description_btnsave" />
                            </div>
                        </div> */}

                    </div>

                </div>
            </div>
        </div>
    )

};

export default SupplementsModal;
