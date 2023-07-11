import React from "react";
import { useState } from "react";
import {
    addActiveSession,
    deleteSessionService,
    getActiveSession,
    getSessionDaysService,
    getSIngleSession,
    putSIngleActiveSession,
} from "../../services/ActivePrograms";
import { useEffect } from "react";
import { changeDateFormat, changeDateFormatYYYY, checkEndDate, convertTime12to24, isEmpty, onStartSession, showToastError, showToastSuccess } from "../../Utils/Helper";
import TimePicker from "../../commonComponent/TimePicker";
import Loader from "../../commonComponent/Loader";
import DropDownMultiSelect from "../../commonComponent/DropDownMultiSelect";
import Button from "../../commonComponent/Button";
import { createZoomMeetingService } from "../../services/ZoomService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { timezone } from "../../Utils/AllConstant";
import DeleteModal from "../../commonComponent/DeleteModal";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBinFill, RiEdit2Fill } from "react-icons/ri";
import DateInput from "../../commonComponent/CutomDatePicker";
import { addDays, formatISO, isBefore, isEqual, parse, parseISO, toDate } from "date-fns";
import { createCarePlanGoalService, deleteGoal, getGoalListService, getSingleGoal, updateCarePlanGoalService } from "../../services/CreateCarePlanService";
import { BsChevronDown } from "react-icons/bs";
import { Accordion } from "react-bootstrap";

let selectedDeleteSession = '';

const CarePlanGoal = (props) => {
    // console.log('props', props.careplanId)
    const navigate = useNavigate();
    const auth = useAuth();
    const carePlanId = props.careplanId;
    const [goalName, setGoalName] = useState("");
    const [goalId, setGoalId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [noOfDays, setNoOfDays] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [getGoalList, setGetGoalList] = useState([]);
    const [isLoading, setLoader] = useState(true);
    const [isSubmit, setSubmit] = useState(false);
    const [error, setError] = useState(false);
    const [goalApiChange, setGoalApiChange] = useState("");
    const [formValues, setFormValues] = useState([])
    const [frequency, setFrequency] = useState("daily")
    const [repeats, setRepeats] = useState("monday")
    const [dateRange, setDateRange] = useState([])

    const getDate = (date) => {
        try {
            if (date && new Date(date) != 'Invalid Date') {
                return new Date(date)
            }
            // return new Date()
        } catch (error) { }
    }

    const checkValidation = () => {
        try {
            let errorsResult = error;
            let isValid = true;

            if (!goalName || isEmpty(goalName)) {
                isValid = false;
                errorsResult = { ...errorsResult, name: true }
            }
            if (!description || isEmpty(description)) {
                isValid = false;
                errorsResult = { ...errorsResult, descr: true }
            }
            if (!startDate || isEmpty(startDate)) {
                isValid = false;
                errorsResult = { ...errorsResult, sDate: true }
            }
            if (!noOfDays || isEmpty(noOfDays)) {
                isValid = false;
                errorsResult = { ...errorsResult, eDate: true }
            }
            if (!category || isEmpty(category)) {
                isValid = false;
                errorsResult = { ...errorsResult, cat: true }
            }
            setError(errorsResult)

            return isValid;

            // if (isValid) {
            //   handleSubmitGoal()
            // }
        } catch (error) {
        }
    }

    useEffect(() => {
        getGoalDetails();
    }, [carePlanId])

    useEffect(() => {
        if (startDate && noOfDays) {
            DateRange(startDate, +noOfDays)
        }
    }, [startDate, noOfDays])

    const getSingleGoalById = async (goalId) => {
        setLoader(true)

        try {
            if (!goalId) {
                return;
            }
            const response = await getSingleGoal(goalId, carePlanId);

            if (response.status === 200) {
                const startDates = getDate(response?.data[0]?.startDate);
                setGoalName(response?.data[0]?.goalName);
                setDescription(response?.data[0]?.notes);
                setStartDate(startDates);
                setNoOfDays(response?.data[0]?.duration ? response?.data[0]?.duration : 0);
                setCategory(response.data[0].category);
                setFrequency(response.data[0].tasks[0]?.frequency || "daily");
                setRepeats(response.data[0].tasks[0]?.repeatsOn);
                setFormValues(response.data[0].tasks)
                console.log(response?.data[0], " - Goals");
            } else {
                console.log(response?.data || response.message);
            }
            setLoader(false)
        } catch (error) {
            error?.data?.data &&
                console.log(error?.data?.data || error.data?.message);
            setLoader(false)
        }
    };
    const handleSubmitGoal = async (e) => {
        console.log(e);

        e.preventDefault();
        if (!checkValidation()) {
            return;
        }
        setSubmit(true)

        if (goalApiChange == "edit") {
            try {
                var params = {
                    "goalId": goalId,
                    "goalName": goalName,
                    "notes": description,
                    "startDate": startDate == null ? null : changeDateFormatYYYY(startDate),
                    "duration": Number(noOfDays),
                    "category": category,
                    "tasks": formValues.filter(it => it.title).map(dt => {
                        return {
                            ...dt,
                            dates: dateRange,
                            frequency: frequency,
                            repeatsOn: repeats,
                        }
                    })
                };

                const response = await updateCarePlanGoalService(params, carePlanId);
                // setShowLoader(false)
                setSubmit(false);
                if (response.status === 200) {
                    // props.onSave();
                    showToastSuccess(`Goal Plan is updated`);
                    getGoalDetails();
                    document.getElementById('btn-close').click()

                } else {
                    showToastError(
                        response?.data || response.message || "Some error occurred"
                    );
                }
                // console.log(params, "Edit Goals Params");

            }
            catch (error) {
                // setShowLoader(false)
                showToastError(
                    error?.data?.data || error.data?.message || "Some error occurred"
                );
            }
        } else {
            try {

                var params = {
                    "goalName": goalName,
                    "notes": description,
                    "startDate": startDate == null ? null : changeDateFormatYYYY(startDate),
                    "duration": Number(noOfDays),
                    "category": category,
                    "tasks": formValues.filter(it => it.title).map(dt => {
                        return {
                            ...dt,
                            dates: dateRange,
                            frequency: frequency,
                            repeatsOn: repeats,
                        }
                    })
                };
                const response = await createCarePlanGoalService(params, carePlanId);
                setSubmit(false);
                if (response.status === 200) {
                    // props.onSave();
                    showToastSuccess(`Goal Plan is created`);
                    getGoalDetails();
                    document.getElementById('btn-close').click()

                } else {
                    showToastError(response?.data || response.message || "Some error occurred")
                }
                // console.log(params, "New Goals Params");


            } catch (error) {
                setSubmit(false)
                showToastError(error?.data?.data || error.data?.message || "Some error occurred")
            }
        }
    }

    const DateRange = (startDate, noofdays) => {
        const endDate = addDays(startDate, noofdays);

        let it = startDate, dater = []
        while (isEqual(it, endDate) || isBefore(it, endDate)) {
            dater = [...dater, changeDateFormatYYYY(it)]
            setDateRange(dater)
            it = addDays(it, 1)
        }

        // console.log(startDate, it, endDate, dater);
    }

    const getGoalDetails = async () => {
        try {
            const response = await getGoalListService(carePlanId);
            setLoader(false);
            if (response.status === 200) {
                setGetGoalList(response?.data);
            }
        } catch (error) {
            setLoader(false);
            // setGetSessionList([]);
        }
    };

    const deleteGoals = async (goalId) => {
        try {
            const response = await deleteGoal(goalId, carePlanId);
            if (response) {
                showToastSuccess(response?.data || 'Goal deleted successfully.');
                getGoalDetails()
            } else {
                showToastError(response?.data || response.message || "Some error occurred")
            }
        } catch (error) {
            showToastError(error?.data?.data || error.data?.message || "Some error occurred")
        }
    }

    const renderError = (msg, value) => {
        return (
            value ? (
                <h6 className="text-danger error" style={{ marginBottom: 15, marginTop: -15 }}>
                    {msg}
                </h6>) : null)
    }

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        // console.log(formValues.lastIndexOf(), ' :Task Id');
        setFormValues([...formValues, { taskId: formValues.at(-1) ? formValues.at(-1).taskId + 1 : 0, title: "", description: "", frequency: frequency, repeatsOn: repeats, priority: "high" }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    const renderForm = () => {
        return (
            <form onSubmit={handleSubmitGoal}>
                <div className="row">
                    <div className="col-md-12">
                        <p className="whole_label">Goal Name<span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                        <input
                            type="text"
                            className="description_inputf mb-4"
                            value={goalName}
                            maxLength={80}
                            onChange={(e) => {
                                setGoalName(e.target.value);
                                setError({ ...error, name: false });
                            }}
                        />
                        {renderError('Please enter name', error.name)}
                    </div>

                    <div className="col-md-12">
                        <p className="whole_label">Description<span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                        <textarea
                            type="text"
                            className="description_inputf pt-3 mb-4"
                            style={{ height: "200px" }}
                            maxLength={200}
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                                setError({ ...error, descr: false });
                            }}
                        />
                        {renderError('Please enter description', error.descr)}
                    </div>
                    <div className="col-md-12 mb-4">
                        <p className="whole_label">Assign <span className="small_letter2">date</span> <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                        <DateInput
                            value={startDate}
                            onChangeDate={(date) => {
                                setError({ ...error, sDate: false })
                                setStartDate(date)
                            }}
                            minDate={new Date()}
                            inputClassName={"description_inputf d-flex mb-0 align-items-center"} />
                        {error.sDate ?
                            <h6 className="text-danger error" style={{ marginBottom: 15, marginTop: 7 }}>
                                {'Please select start date'}
                            </h6> : null}
                    </div>
                    <div className="col-md-12">
                        <p className="whole_label">Number<span className="small_letter2"> of Days</span><span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                        <input
                            type="number"
                            className="description_inputf mb-4"
                            value={noOfDays}
                            min="0"
                            id="days"
                            onChange={(e) => {
                                setNoOfDays(e.target.value);
                                setError({ ...error, eDate: false });
                            }}
                        />
                        {renderError('Please enter number of days', error.eDate)}
                        {/* <DateInput
                            value={endDate}
                            onChangeDate={(date) => {
                                setError({ ...error, eDate: false })
                                setEndDate(date)
                            }}
                            // minDate={startDateCreate ? startDateCreate : new Date()}
                            inputClassName={"description_inputf d-flex mb-0 align-items-center"} /> */}
                        {/* {error.eDate ?
                            <h6 className="blog_error_text4" style={{ marginBottom: 15, marginTop: 7 }}>
                                {'Please select end date'}
                            </h6> : null} */}
                    </div>

                    <div className="col-md-12">
                        <p className="whole_label">Category <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                        <select
                            name=""
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setError({ ...error, cat: false });
                            }}
                            className="description_inputf mb-4">
                            <option disabled value="">{`Please choose...`}</option>
                            <option value="nutrition">Nutrition</option>
                            <option value="fitness">Fitness</option>
                            <option value="lifestyle">LifeStyle</option>
                            <option value="health">Health</option>
                            {/* {getDropDownSessionDays().map((item) => <option value={item}>{item}</option>)} */}
                        </select>
                        {renderError('Please select category', error.cat)}
                    </div>
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-md-6">
                                <p className="whole_label">Frequency</p>
                                <select
                                    name="freq"
                                    value={frequency}
                                    onChange={e => setFrequency(e.target.value)}
                                    className="description_inputf">
                                    {/* <option value="once">Once</option> */}
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    {/* <option value="yearly">Yearly</option> */}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <p className="whole_label">Repeats On</p>
                                <select
                                    name="repeats"
                                    disabled={frequency !== 'weekly'}
                                    value={repeats}
                                    onChange={e => setRepeats(e.target.value)}
                                    className="description_inputf">
                                    <option value="monday">Monday</option>
                                    <option value="tuesday">Tuesday</option>
                                    <option value="wednesday">Wednesday</option>
                                    <option value="thursday">Thursday</option>
                                    <option value="friday">Friday</option>
                                    <option value="saturday">Saturday</option>
                                    <option value="sunday">Sunday</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <p className="whole_label  ">Tasks</p>
                        <div className="row">
                            {formValues.length > 0 && <>
                                {/* <div className="col-md-2"><p className="whole_label fw-light">Title</p></div> */}
                                <div className="col-md-11"><p className="whole_label fw-light">Description</p></div>
                                {/* <div className="col-md-2"><p className="whole_label fw-light">Frequency</p></div> */}
                                {/* <div className="col-md-2"><p className="whole_label fw-light">Repeats On</p></div> */}
                                {/* <div className="col-md-2"><p className="whole_label fw-light">Priority</p></div> */}
                            </>}
                            {formValues.map((element, index) => (
                                <>
                                    <div className="col-md-11">
                                        <input
                                            name="title"
                                            type="text"
                                            maxLength={100}
                                            className="description_inputf  "
                                            placeholder="Description"
                                            value={element?.title || ""} onChange={e => handleChange(index, e)}
                                        />
                                    </div>
                                    {/* <div className="col-md-3">
                                        <input
                                            name="description"
                                            type="text"
                                            className="description_inputf  "
                                            placeholder="Description"
                                            value={element.description || ""} onChange={e => handleChange(index, e)}
                                        />
                                    </div> */}
                                    {/* <div className="col-md-2">
                                        <select
                                            name="frequency"
                                            value={element.frequency || ""}
                                            onChange={e => handleChange(index, e)}
                                            className="description_inputf">
                                            <option value="once">Once</option>
                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                            <option value="yearly">Yearly</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <select
                                            name="repeatsOn"
                                            disabled={element.frequency !== 'weekly'}
                                            value={element.repeatsOn[0] || ""}
                                            onChange={e => handleChange(index, e)}
                                            className="description_inputf">
                                            <option value="" selected disabled>Select</option>
                                            <option value="monday">Monday</option>
                                            <option value="tuesday">Tuesday</option>
                                            <option value="wednesday">Wednesday</option>
                                            <option value="thursday">Thursday</option>
                                            <option value="friday">Friday</option>
                                            <option value="saturday">Saturday</option>
                                            <option value="sunday">Sunday</option>
                                        </select>
                                    </div> */}
                                    {/* <div className="col-md-2">
                                        <select
                                            name="priority"
                                            value={element.priority || ""}
                                            onChange={e => handleChange(index, e)}
                                            className="description_inputf">
                                            <option value="high">High</option>
                                            <option value="medium">Medium</option>
                                            <option value="low">Low</option>
                                        </select>
                                    </div> */}
                                    {/* {
                                  index ? */}
                                    <div className="col-md-1">
                                        <div style={{ height: "54px", backgroundColor: "rgb(255, 255, 255)", color: "black", border: "1px solid rgb(187, 185, 185)" }} className="pointer border-0 mx-0 d-flex justify-content-center align-items-center text-danger px-0" onClick={() => removeFormFields(index)}><RiDeleteBinFill size="1.4em" /></div>
                                    </div>
                                    {/* : null
                                } */}
                                </>
                            ))}

                            <div className="col-md-12">
                                <div style={{ marginBottom: "35px", width: "max-content" }} className="pointer description_btnsave mx-0 d-flex justify-content-center align-items-center" onClick={() => addFormFields()}><AiOutlinePlus className="me-2" /> Add New Tasks</div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <hr />
                        <div className="d-flex justify-content-between">
                            <div style={isLoading ? { pointerEvents: 'none' } : { backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9' }} className="description_btnsave pointer d-flex justify-content-center align-items-center" data-bs-dismiss="modal" aria-label="Close">Cancel</div>
                            <Button
                                isLoading={isSubmit} disabled={isSubmit} type="submit" id="reateProgram" text={goalApiChange == "edit" ? 'Update Goal Plan' : 'Create New Goal'} style={isSubmit ? { pointerEvents: 'none' } : {}} className="description_btnsave d-flex justify-content-center align-items-center" />
                        </div>
                    </div>
                </div>
            </form>

        )
    }

    const renderGoalList = () => {
        return getGoalList.map((goal, index) => {
            // let index = 0;
            return (
                <div className="d-flex mb-3">
                    <span className="px-3 py-4 numbr">{index + 1 < 10 && "0"}{index + 1}</span>
                    <div className="card px-4 py-3 flex-grow-1">
                        <div className="d-flex flex-row justify-content-between align-items-center">
                            <div onClick={() => props.onSave(goal)} >
                                <h6>{goal.goalName}</h6>
                                <p className="pe-3">{goal.notes}</p>
                                <div className="row">
                                    <div className="col-sm-3"><p className="mb-0 me-3">Assign date: </p></div>
                                    <div className="col-sm-3"><p className="mb-0 me-3  text-green fw-bold">{changeDateFormat(goal.startDate)}</p></div>
                                    <div className="col-sm-3"><p className="mb-0 me-3">Category: </p></div>
                                    <div className="col-sm-3"><p className="mb-0 me-3 text-green fw-bold">{goal.category}</p></div>

                                    <div className="col-sm-3"><p className="mb-0 me-3">Duration: </p></div>
                                    <div className="col-sm-3"><p className="mb-0 me-3">{goal.duration} days</p></div>

                                </div>

                            </div>
                            <div className="d-flex">
                                {/* <div onClick={() => props.onSave(goal)}>
                                    <button
                                        className="btn btn-primary btn-custom-light"
                                        style={{ marginRight: "15px" }}
                                        onClick={() => {
                                            setGoalId(goal._id);
                                        }}
                                    >
                                        Add task
                                    </button>
                                </div> */}
                                <button
                                    className="btn btn-primary btn-custom-light"
                                    data-bs-toggle="modal" data-bs-target="#deleteGoal"
                                    onClick={() => {
                                        setGoalId(goal._id);
                                    }}
                                >
                                    Delete
                                </button>
                                <button
                                    className="btn btn-primary btn-custom-light ms-3"
                                    data-bs-toggle="modal" data-bs-target="#goalModal"
                                    onClick={() => {
                                        setGoalApiChange("edit");
                                        setGoalId(goal._id);
                                        getSingleGoalById(goal._id);
                                    }}
                                >
                                    <RiEdit2Fill className="me-2" /> Edit
                                </button>
                            </div>
                        </div>

                        <Accordion className="mt-3">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <h6 className="mb-0 text-center">View tasks</h6>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="row">
                                        {goal.tasks.length > 0 ? <>
                                            <div className="col-sm-6"><h6>Description</h6></div>
                                            <div className="col-sm-6"><h6>Frequency</h6></div>
                                            {/* <div className="col-sm-3"><h6>Priority</h6></div> */}
                                        </> : <p className="text-center py-2">Add a new task</p>}

                                        {goal.tasks.map(dt => <>
                                            <div className="col-sm-6"><p className="mb-0">{dt?.title}</p></div>
                                            <div className="col-sm-6"><p className="mb-0 text-capitalize">{dt?.frequency}</p></div>
                                            {/* <div className="col-sm-3"><p className="mb-0 text-capitalize">{dt.priority}</p></div> */}
                                        </>)}
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                    </div>
                </div >
            );
        })
    }

    return (
        <div className="mx-5 mt-5">
            <div className="col-md-12 d-flex justify-content-between">
                <div className="w-80">
                    <h4>Add Care Plan Goals</h4>
                    <p>Give your care plan goals and description so it gives clarification to the patients. Click on the goal to view or add tasks.</p>
                </div>
                <div className="w-20 d-flex">
                    <button className="btn btn-primary btn-custom" data-bs-toggle="modal" data-bs-target="#goalModal"
                        style={{ marginLeft: "150px" }}
                        onClick={() => {
                            // getSessionById();
                            // getSessionDays();
                            setGoalName("");
                            setDescription("");
                            setStartDate("");
                            setNoOfDays(0);
                            setCategory("");
                            setGoalApiChange("Add");
                            setFormValues([]);
                        }}
                    > Add New Goal</button>
                </div>
                {/* </div> */}
            </div>

            <DeleteModal
                title={'Delete'}
                content1={'Are you sure you want to delete'}
                content2={'this Goal?'}
                modalId={'deleteGoal'}
                button2={'No'}
                button1={'Yes'}
                onDelete={() => deleteGoals(goalId)}
            />

            <div className="table_resouter mt-4">
                {isLoading ? (
                    <center>
                        <div
                            style={{ width: "3rem", height: "3rem", color: "#1f7e78" }}
                            class="spinner-border mt-3 mb-4"
                            role="status"
                        />
                    </center>
                ) : getGoalList == "" ? (
                    <Loader textClassName={`mt-0`} showBR={false} emptyTextKey={`addNewGoal`} mainClassName={`active_n0data2`} />
                ) :
                    renderGoalList()
                }
            </div>

            <div className="col-md-12 mt-5">
                <hr />
                <div className="d-flex justify-content-between">
                    <div text={'Back'} style={isLoading ? { pointerEvents: 'none' } : { cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9', width: "120px" }} className="description_btnsave d-flex justify-content-center align-items-center" onClick={() => !isLoading && props.onBack(carePlanId)}>Back</div>
                    <div text={'Continue'} className="description_btnsave pointer d-flex justify-content-center align-items-center" onClick={() => !isLoading && props.onSkip()} style={{ width: "120px" }}>Continue</div>
                </div>
            </div>
            {/* <!-- Modal --> */}
            <div class="modal fade" id="goalModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" style={{ maxWidth: '900px' }}>
                    <div class="modal-content py-4 px-3">
                        <div class="modal-header border-0">
                            {/* <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> */}
                            <h5>{goalApiChange == "edit" ? "Edit Goal" : "Add New Goal"}</h5>
                            <button type="button" class="btn-close" id="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {isLoading ? (
                                <center>
                                    <div
                                        style={{ width: "3rem", height: "3rem", color: "#1f7e78" }}
                                        class="spinner-border mt-3 mb-4"
                                        role="status"
                                    />
                                </center>
                            ) : (
                                renderForm()
                            )}
                        </div>
                        {/* </div> */}
                        {/* <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarePlanGoal;
