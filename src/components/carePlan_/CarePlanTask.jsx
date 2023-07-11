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
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { timezone } from "../../Utils/AllConstant";
import DeleteModal from "../../commonComponent/DeleteModal";
import { AiOutlinePlus } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import DateInput from "../../commonComponent/CutomDatePicker";
import { toDate } from "date-fns";
import { getGoalListService, getSingleGoal, updateCarePlanGoalService } from "../../services/CreateCarePlanService";

let selectedDeleteSession = '';

const CarePlanTask = (props) => {

    const navigate = useNavigate();
    const location = useLocation();

    // console.log('props', props)
    const auth = useAuth();
    const careplanId = props.careplanId;
    const goalId = props.goal._id;
    const goal = props.goal;
    const [isLoading, setLoader] = useState(true);
    const [isSubmit, setSubmit] = useState(false);
    const [error, setError] = useState({ title: false, freq: false, priority: false, repeatsOn: false, descr: false });
    const [sessionApiChange, setSessionApiChange] = useState("");
    const goalName = goal.goalName;
    // const [goalsId, setGoalId] = useState("");
    const startDate = goal.startDate;
    const noOfDays = goal.duration;
    const description = goal.notes;
    const category = goal.category;
    // const [task, setTask] = useState([]);
    const [getTaskList, setGetTaskList] = useState([]);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskFrequency, setTaskFrequency] = useState("");
    const [taskPriority, setTaskPriority] = useState("");
    // const [taskStartDate, settaskStartDate] = useState("");
    // const [taskEndDate, settaskEndDate] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskRepeatsOn, setTaskRepeatOn] = useState([]);
    const [taskApiChange, setTaskApiChange] = useState("");
    const [taskId, setTaskId] = useState(1);

    useEffect(() => {
        getSingleGoalById(goalId);

    }, [careplanId]);

    // const getDate = (date) => {
    //     try {
    //         if (date && new Date(date) != 'Invalid Date') {
    //             return new Date(date)
    //         }
    //         // return new Date()
    //     } catch (error) { }
    // }
    // const startDateCreate = getDate(props?.singleActiveProgram[0]?.startDate);
    // const endDateCreate = getDate(props?.singleActiveProgram[0]?.endDate)
    const checkValidation = () => {
        try {
            let errorsResult = error;
            let isValid = true;

            if (!taskTitle || isEmpty(taskTitle)) {
                isValid = false;
                errorsResult = { ...errorsResult, title: true }
            }
            if (!taskFrequency || isEmpty(taskFrequency)) {
                isValid = false;
                errorsResult = { ...errorsResult, freq: true }
            }
            if (!taskPriority || isEmpty(taskPriority)) {
                isValid = false;
                errorsResult = { ...errorsResult, priority: true }
            }
            // if (!taskStartDate || isEmpty(taskStartDate)) {
            //   isValid = false;
            //   errorsResult = { ...errorsResult, start_date: true }
            // }
            // if (!taskEndDate || isEmpty(taskEndDate)) {
            //     isValid = false;
            //     errorsResult = { ...errorsResult, end_date: true }
            // }
            if (taskFrequency === "weekly") {
                if (!taskRepeatsOn || isEmpty(taskRepeatsOn)) {
                    isValid = false;
                    errorsResult = { ...errorsResult, repeatsOn: true }
                }
            }
            if (!taskDescription || isEmpty(taskDescription)) {
                isValid = false;
                errorsResult = { ...errorsResult, descr: true }
            }
            setError(errorsResult)

            return isValid;

            // if (isValid) {
            //   handleSubmitSession()
            // }
        } catch (error) {
        }
    }


    const handleSubmitTask = async (e) => {

        e.preventDefault();
        if (!checkValidation()) {
            return;
        }
        setSubmit(true)
        try {

            var params = {
                "goalId": goalId,
                "goalName": goalName,
                "notes": description,
                "startDate": startDate == null ? null : changeDateFormatYYYY(startDate),
                "duration": Number(noOfDays),
                "category": category,
                "tasks": [...getTaskList,
                {
                    "taskId": getTaskList?.length ? getTaskList[getTaskList?.length - 1].taskId + 1 : 1,
                    "title": taskTitle,
                    "description": taskDescription,
                    "frequency": taskFrequency,
                    "repeatsOn": taskRepeatsOn,
                    "priority": taskPriority
                    // "dates": ["2022-12-02", "2022-12-22"]
                }
                ]
            };
            if (taskApiChange == "edit") {
                let taskList = [...getTaskList]
                let taskIndex = taskList?.findIndex((item) => item.taskId == taskId)
                taskList[taskIndex] = {
                    "taskId": taskId,
                    "title": taskTitle,
                    "description": taskDescription,
                    "frequency": taskFrequency,
                    "repeatsOn": taskRepeatsOn,
                    "priority": taskPriority
                }

                params = {
                    ...params, "tasks": taskList
                };
            }
            taskApi(params, careplanId);
        }
        catch (error) {
            // setShowLoader(false)
            showToastError(
                error?.data?.data || error.data?.message || "Some error occurred"
            );
        }
    }

    const getSingleGoalById = async (goalId) => {
        setLoader(true)
        try {
            if (!goalId) {
                return;
            }
            const response = await getSingleGoal(goalId, careplanId);
            if (response.status === 200) {
                setGetTaskList(response.data[0].tasks)
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
    const deleteTask = (deleteTaskId) => {
        if (deleteTaskId) {
            let deleteTaskList = [...getTaskList]
            let updatedTaskList = deleteTaskList.filter((item) => item.taskId != deleteTaskId)
            var params = {
                "goalId": goalId,
                "goalName": goalName,
                "notes": description,
                "startDate": startDate == null ? null : changeDateFormatYYYY(startDate),
                "duration": Number(noOfDays),
                "category": category,
                "tasks": updatedTaskList
            };
            taskApi(params, careplanId);
        }
    }

    const taskApi = async (payload) => {
        try {
            const response = await updateCarePlanGoalService(payload, careplanId);
            // setShowLoader(false)
            setSubmit(false);
            if (response.status === 200) {
                // props.onSave();
                document.getElementById('btn-close').click()
                showToastSuccess(`Care Task is updated`);
                getSingleGoalById(goalId);
            } else {
                showToastError(
                    response?.data || response.message || "Some error occurred"
                );
            }
        }
        catch (error) {
            // setShowLoader(false)
            showToastError(
                error?.data?.data || error.data?.message || "Some error occurred"
            );
        }

    }

    const renderError = (msg, value) => {
        return (
            value ? (
                <h6 className="blog_error_text4" style={{ marginBottom: 15, marginTop: -15 }}>
                    {msg}
                </h6>) : null)
    }

    const renderForm = () => {
        return (
            <form onSubmit={handleSubmitTask}>
                <div className="row">
                    <div className="col-md-12">
                        <p className="whole_label">Task Title <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                        <input
                            type="text"
                            className="description_inputf"
                            maxLength={80}
                            value={taskTitle}
                            onChange={(e) => {
                                setTaskTitle(e.target.value);
                                setError({ ...error, title: false });
                            }}
                        />
                        {renderError('Please enter title', error.title)}
                    </div>
                    <div className="col-md-12">
                        <p className="whole_label">Description <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                        <input
                            type="text"
                            className="description_inputf"
                            maxLength={200}
                            value={taskDescription}
                            onChange={(e) => {
                                setTaskDescription(e.target.value);
                                setError({ ...error, descr: false });
                            }}
                        />
                        {renderError('Please enter description', error.descr)}
                    </div>
                    <div className="col-md-12">
                        <p className="whole_label">Frequency <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                        <select
                            name=""
                            value={taskFrequency}
                            onChange={(e) => {
                                setTaskFrequency(e.target.value);
                                setError({ ...error, freq: false });
                            }}
                            className="description_inputf">
                            <option disabled value="">{`Please choose...`}</option>
                            <option value="once">Once</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                            {/* {getDropDownSessionDays().map((item) => <option value={item}>{item}</option>)} */}
                        </select>
                        {renderError('Please select frequency', error.freq)}
                    </div>
                    {taskFrequency === "weekly" ?
                        <div className="col-md-12">
                            <p className="whole_label">Repeats On <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                            <select
                                name=""
                                value={taskRepeatsOn}
                                onChange={(e) => {
                                    setTaskRepeatOn(e.target.value);
                                    setError({ ...error, repeatsOn: false });
                                }}
                                className="description_inputf">
                                <option disabled value="">{`Please choose...`}</option>
                                <option value="monday">Monday</option>
                                <option value="tuesday">Tuesday</option>
                                <option value="wednesday">Wednesday</option>
                                <option value="thursday">Thursday</option>
                                <option value="friday">Friday</option>
                                <option value="saturday">Saturday</option>
                                <option value="sunday">Sunday</option>
                                {/* {getDropDownSessionDays().map((item) => <option value={item}>{item}</option>)} */}
                            </select>
                            {renderError('Please select session week', error.repeatsOn)}
                        </div>
                        : null}
                    <div className="col-md-12">
                        <p className="whole_label">Priority Level <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                        <select
                            name=""
                            value={taskPriority}
                            onChange={(e) => {
                                setTaskPriority(e.target.value);
                                setError({ ...error, priority: false });
                            }}
                            className="description_inputf">
                            <option disabled value="">{`Please choose...`}</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                            {/* {getDropDownSessionDays().map((item) => <option value={item}>{item}</option>)} */}
                        </select>
                        {renderError('Please select priority', error.priority)}
                    </div>

                    <div className="col-md-12 text-center">
                        <Button
                            isLoading={isSubmit} disabled={isSubmit} type="submit" id="reateProgram" text={taskApiChange == "edit" ? 'Update Task' : 'Create New Task'} style={isSubmit ? { cursor: 'none' } : {}}
                            className="description_createsess" />
                    </div>
                </div>
            </form>
        )
    }

    const renderTaskList = () => {
        return getTaskList?.map((task, index) => {
            // const canStartSession = !checkEndDate(session.sessionDate);
            // var time = new Date(session.createdAt);

            // setTaskId(index + 1)
            // setTask(task)
            return (
                <div className="d-flex mb-3">
                    <span className="px-3 py-4 numbr">{index + 1 < 10 && "0"}{index + 1}</span>
                    <div className="flex-grow-1 card d-flex px-4 py-3 flex-row justify-content-between align-items-center">
                        {/* <span className="px-3 py-4"><input class="form-check-input checknum" type="checkbox" id="checkboxNoLabel" value="" /></span>
                    <div className="flex-grow-1 card d-flex px-4 py-3 flex-row justify-content-between align-items-center"> */}
                        <div>
                            <h6>{task.title}</h6>
                            <p>{task.description}</p>
                            <div className="row" style={{ width: "180%" }}>
                                <div className="col-sm-3"><p className="mb-0 me-3">Priority: </p></div>
                                <div className="col-sm-3"><p className="mb-0 me-3">{task.priority}</p></div>
                                <div className="col-sm-3"><p className="mb-0 me-3">Frequency:</p></div>
                                <div className="col-sm-3"><p className="mb-0 me-3">{task.frequency}</p></div>


                                {task.frequency === "weekly" ?
                                    <>
                                        <div className="col-sm-3"><p className="mb-0 me-3">Repeats On</p></div>
                                        <div className="col-sm-3"><p className="mb-0 me-3 text-green fw-bold">{task.repeatsOn}</p></div>
                                    </>
                                    : null}
                            </div>
                        </div>
                        <DeleteModal
                            title={'Delete'}
                            content1={'Are you sure you want to delete'}
                            content2={'this Task?'}
                            modalId={'deleteTask'}
                            button2={'No'}
                            button1={'Yes'}
                            onDelete={() => { deleteTask(taskId) }}
                        />
                        <div className="d-flex">
                            <button
                                className="btn btn-primary btn-custom-light"
                                data-bs-toggle="modal" data-bs-target="#deleteTask"
                                style={{ marginRight: "15px" }}
                                onClick={() => {
                                    setTaskId(task.taskId)
                                }}
                            >
                                Delete
                            </button>
                            <button
                                className="btn btn-primary btn-custom-light ms-3"
                                data-bs-toggle="modal" data-bs-target="#sessionModal"
                                onClick={() => {
                                    setTaskTitle(task.title);
                                    setTaskDescription(task.description);
                                    setTaskFrequency(task.frequency);
                                    setTaskPriority(task.priority);
                                    setTaskRepeatOn(task.repeatsOn);
                                    setTaskId(task.taskId)
                                    setTaskApiChange("edit")
                                }}
                            >
                                <RiEdit2Fill className="me-2" /> Edit
                            </button>
                        </div>
                    </div>
                </div>
            );
        })
    }

    return (
        <div className="mx-5 mt-5">
            <div className="col-md-12 d-flex justify-content-between">
                <div className="w-80">
                    <h4>Add Care Plan Task</h4>
                    <p>Give your care plan a task and description so it gives clarification to the patients.</p>
                </div>
                <div className="w-20 d-flex">
                    <span className="btn btn-primary btn-custom" data-bs-toggle="modal" data-bs-target="#sessionModal"
                        style={{ marginLeft: "150px" }}
                        onClick={() => {
                            setTaskTitle("");
                            setTaskDescription("");
                            setTaskFrequency("");
                            setTaskPriority("");
                            setTaskRepeatOn("");
                            setTaskId("")
                            setTaskApiChange("Add");
                        }}
                    >Add New Task</span>
                </div>
            </div>
            <div className="table_resouter mt-4">
                {isLoading ? (
                    <center>
                        <div
                            style={{ width: "3rem", height: "3rem", color: "#1f7e78" }}
                            class="spinner-border mt-3 mb-4"
                            role="status"
                        />
                    </center>
                ) : getTaskList == "" ? (
                    <Loader textClassName={`mt-0`} showBR={false} emptyTextKey={`addNewTask`}
                        mainClassName={`active_n0data2`} />
                ) :
                    renderTaskList()
                }
            </div>
            <div className="col-md-12 mt-5">
                <hr />
                <div className="d-flex justify-content-between">
                    <div text={'Back'} style={{ cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9' }} className="description_btnsave d-flex justify-content-center align-items-center" onClick={() => !isLoading && props.onBack()}>Back</div>
                    <div text={'Continue'} style={{ cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9' }} className="description_btnsave d-flex justify-content-center align-items-center" onClick={() => !isLoading && props.onSave()}>Continue</div>
                </div>
            </div>
            {/* <!-- Modal --> */}
            <div class="modal fade" id="sessionModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content py-4 px-3">
                        <div class="modal-header border-0">
                            {/* <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> */}
                            <h3>{taskApiChange == "edit" ? "Edit Task" : "Add New Task"}</h3>
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

export default CarePlanTask;
