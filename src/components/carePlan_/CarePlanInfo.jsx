import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { AiOutlineCheck, AiOutlinePlus, AiTwotoneCalendar } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { differenceInHours, differenceInMinutes, differenceInSeconds, format, isToday, isYesterday, parseISO } from 'date-fns'
import Loader from "../../commonComponent/Loader";
import { useAuth } from "../../Context/AuthContext";
import { toastMsg } from "../../Utils/AllConstant";
import { changeDateFormat, isOnlyEmpty, showToastError, showToastSuccess } from "../../Utils/Helper";
import { FaEdit, FaTrash } from "react-icons/fa";
import DeleteModal from "../../commonComponent/DeleteModal";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../header/Navbar";
import { RiCapsuleFill, RiEdit2Fill } from "react-icons/ri";
import { getGoalListService, getSingleCarePlanListService } from "../../services/CreateCarePlanService";
import SquareAvatar from "../../commonComponent/SquareAvatar";
import ApiConfig from "../../config/ApiConfig";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { Accordion } from "react-bootstrap";

const CarePlanInfo = () => {
    let navigate = useNavigate();
    const location = useLocation();
    let plan = location?.state.careplan || [];
    const [isLoading, setLoader] = useState(true);
    const [getGoalList, setGetGoalList] = useState([]);
    const [getTaskList, setGetTaskList] = useState([]);
    const [carePrograms, setCarePrograms] = useState([]);
    const [careUsers, setCareUsers] = useState([]);
    const [careGroups, setCareGroups] = useState([]);
    const [careFiles, setCareFiles] = useState([]);
    console.log(plan, "plan")
    const carePlanId = plan._id;
    const auth = useAuth();

    const getSingleCarePlan = async () => {
        // setLoader1(true)
        // console.log(sessionId);
        try {
            if (!carePlanId) {
                return;
            }
            const response = await getSingleCarePlanListService(carePlanId);
            if (response.status === 200) {
                console.log(response.data[0], "response")
                // setCarePlanCreate(response.data[0])
                // setCareTitleCreate(response.data[0]?.name);
                // setCareDescriptionCreate(response.data[0]?.description);
                // setCareDuration(response.data[0]?.duration);
                // setAssignDateCreate(getDate(response.data[0]?.assignDate) || '');
                setCarePrograms(response.data[0]?.programs);
                setCareGroups(response.data[0]?.groups);
                setCareUsers(response.data[0]?.activatedUsers);
                setCareFiles(response.data[0]?.attachments);
                // setCareClients(response.data[0]?.clients);
                // setSupplimentsDetails(response.data[0].suppliments);
                // setMedicationsDetails(response.data[0].medications)
            } else {
                console.log(response?.data || response.message);
            }
            //   setLoader1(false)
        } catch (error) {
            error?.data?.data &&
                console.log(error?.data?.data || error.data?.message);
            //   setLoader1(false)
        }

    };

    const calT = (date) => {
        let hrs = differenceInHours(new Date(), parseISO(date))
        let min = differenceInMinutes(new Date(), parseISO(date))
        let sec = differenceInSeconds(new Date(), parseISO(date))

        if (hrs) return hrs + " hrs"
        else if (min) return min + " mins"
        else return sec + " secs"
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
    const renderLoader = () => {
        return (
            <Loader
                visible={false}
                emptyTextKey={'clickGoalsToViewTask'}
                style={{ top: 0, position: "relative" }} />
        )
    }
    const renderLoader1 = () => {
        return (
            <Loader
                visible={false}
                emptyTextKey={'noGoalsFound'}
                style={{ top: 0, position: "relative" }} />
        )
    }
    useEffect(() => {
        getSingleCarePlan();
        getGoalDetails();
    }, [carePlanId])
    return (
        <>
            <Navbar />
            <div className="container-fluid mb-5">
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar />
                    </div>
                    <div className="col-md-10 py-4 px-5">

                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item pointer" onClick={() => navigate('/careplan')}>Careplan</li>
                                <li class="breadcrumb-item active fw-bold" aria-current="page">{plan?.name}</li>
                            </ol>
                        </nav>
                        <div className="row px-2 mt-3">
                            <div className="col-md-12">
                                <div className="my-4">
                                    <h2>{plan?.name}</h2>
                                    <p>{plan?.description}</p>
                                </div>
                            </div>
                            <div className="col-md-8">

                                <div className="d-flex">
                                    <p className="me-3 mb-0">Assigned by: <strong>{plan?.userId?.full_name}</strong></p>
                                    <p className="mb-0">Created on: <strong>{format(parseISO(plan?.createdAt), 'MMM d, yyyy')}</strong></p>
                                </div>
                                <hr />

                                <h6>Goals</h6>
                                {getGoalList.map((goal, index) => {
                                    console.log(goal, "goal")
                                    return (
                                        <div className="d-flex mb-3">
                                            <span className="px-3 py-4 numbr">{index + 1 < 10 && "0"}{index + 1}</span>
                                            {/* <span className="px-3 py-4 numbr">01</span> */}
                                            <div className="card px-4 py-3 flex-grow-1 ">
                                                <div className="d-flex flex-row justify-content-between align-items-center">
                                                    <div onClick={() => setGetTaskList(goal.tasks)}>
                                                        <h6>{goal?.goalName}</h6>
                                                        <p>{goal.notes}</p>
                                                        <div className="row">
                                                            <div className="col-sm-3"><p className="mb-0 me-3">Assign date: </p></div>
                                                            <div className="col-sm-3"><p className="mb-0 me-3 text-green fw-bold">{changeDateFormat(goal.startDate)}</p></div>
                                                            {/* <div className="col-sm-3"><p className="mb-0 me-3">Description</p></div>
                                                            <div className="col-sm-3"><p className="mb-0 me-3">{goal.notes}</p></div> */}

                                                            <div className="col-sm-3"><p className="mb-0 me-3">Duration: </p></div>
                                                            <div className="col-sm-3"><p className="mb-0 me-3">{goal.duration} days</p></div>
                                                            <div className="col-sm-3"><p className="mb-0 me-3">Category: </p></div>
                                                            <div className="col-sm-3"><p className="mb-0 me-3 text-green fw-bold">{goal.category}</p></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Accordion className="mt-3">
                                                    <Accordion.Item eventKey="0">
                                                        <Accordion.Header>
                                                            <h6 className="mb-0 text-center">View tasks</h6>
                                                        </Accordion.Header>
                                                        <Accordion.Body>
                                                            <div className="row">
                                                                <div className="col-sm-6"><h6>Title</h6></div>
                                                                <div className="col-sm-6"><h6>Frequency</h6></div>
                                                                {/* <div className="col-sm-3"><h6>Priority</h6></div> */}

                                                                {goal.tasks.map(dt => <>
                                                                    <div className="col-sm-6"><p className="mb-0">{dt.title}</p></div>
                                                                    <div className="col-sm-6"><p className="mb-0 text-capitalize">{dt.frequency}</p></div>
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
                                {!getGoalList?.length ? renderLoader1() : null}


                                <hr />
                                {/* Programs */}
                                <h6 className="mb-4">Programs</h6>
                                {carePrograms.length > 0 && <div className="d-flex gap-3 scroller-custom pb-2" style={{ width: "100%", overflowX: 'scroll' }}>
                                    {carePrograms.map((dt) =>
                                        <div key={dt._id} onClick={() => navigate("/activeprograminfo", { state: { program: dt } })}>
                                            <div className="pointer d-flex flex-column justify-content-end rounded p-3"
                                                style={{
                                                    width: "350px", height: "180px", backgroundSize: 'cover',
                                                    backgroundImage: `linear-gradient(180deg, rgba(4, 21, 21, 0) 0%, #041515 100%), url(${ApiConfig.ImageUrl}programs/${dt.createdBy}/${dt.programImage})`
                                                }}>
                                                <p className="mb-3 text-white fs-5">{dt.programName}</p>
                                                <p className="mb-0 text-white"><AiTwotoneCalendar className="mb-1" size={"1.5em"} /> {format(parseISO(dt.startDate), 'do MMMM, yyyy')}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>}

                                <div className="row">
                                    <div className="col-md-6">
                                        <Link to={`/medicationsview`} state={{ plan }} className="btn btn-primary btn-custom-light1 w-100">
                                            <RiCapsuleFill className="me-2" />
                                            Medications
                                        </Link>
                                    </div>
                                    <div className="col-md-6">
                                        <Link to={`/supplementsview`} state={{ plan }} className="btn btn-primary btn-custom-light1 w-100">
                                            <RiCapsuleFill className="me-2" />
                                            Supplements
                                        </Link>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Link to={`/mealplanview`} state={{ plan }} className="btn btn-primary btn-custom-light1 w-100" >
                                            <RiCapsuleFill className="me-2" />
                                            Meal Plan
                                        </Link>
                                    </div>
                                    <div className="col-md-6">
                                        <Link to={`/fitnessplanview`} state={{ plan }} className="btn btn-primary btn-custom-light1 w-100" >
                                            <RiCapsuleFill className="me-2" />
                                            Fitness Plan
                                        </Link>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Link to={`/affirmationsview`} state={{ plan }} className="btn btn-primary btn-custom-light1 w-100" >
                                            <RiCapsuleFill className="me-2" />
                                            Affirmations
                                        </Link>
                                    </div>
                                    <div className="col-md-6">
                                        <Link to={`/formsview`} state={{ plan }} className="btn btn-primary btn-custom-light1 w-100" >
                                            <RiCapsuleFill className="me-2" />
                                            Forms & Waivers
                                        </Link>
                                        {/* <button className="btn btn-primary btn-custom-light1 w-100" onClick={() => navigate("/formsandwaiver", { state: { carePlan: carePlanId } })}>
                                            <RiCapsuleFill className="me-2" />
                                            Forms & Waivers
                                        </button> */}

                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <button
                                    data-bs-placement="top"
                                    className="btn btn-primary btn-custom w-100"
                                    onClick={() => { navigate("/editplan", { state: { careplan: plan } }) }}
                                // data-bs-toggle="modal" data-bs-target="#forumModal"
                                >

                                    {/* <AiOutlinePlus className="me-2" /> */}
                                    Edit
                                </button>
                                <div className="top-users bg-gray mt-3 p-4 shadow-sm">
                                    <h5>Active Users</h5>
                                    <div className="scroller-custom pe-2" style={{ height: '200px', overflowY: 'scroll' }}>
                                        {careUsers.length > 0 && careUsers.map(dt => <div className="member mt-4">
                                            <div className="d-flex align-items-center pointer" onClick={() => { navigate("/allpatientinfo", { state: { user: dt.userId } }) }}>
                                                <div className="forum_ava forum_ava_sm me-3">
                                                    <img
                                                        src={`${ApiConfig.ImageUrl}user/${dt.userId._id}/${dt.userId.profilePicture}`}
                                                        onError={(e) => {
                                                            e.target.src = "images/avatar.png"; //replacement image imported above
                                                        }}
                                                        alt=""
                                                    />
                                                </div><p className="mb-0 text-green">{dt.userId.full_name}</p>
                                            </div>
                                        </div>)}
                                    </div>

                                    <hr className="mt-4" />

                                    <h5>Groups</h5>
                                    <div className="member mt-4 scroller-custom pe-2" style={{ height: '250px', overflowY: 'scroll' }}>
                                        {careGroups.length > 0 && careGroups.map(dt => <div className="d-flex align-items-center mb-3 pointer" onClick={() => navigate("/groupactivities", { state: { selectedGroup: dt, isFromCreate: false } })}>
                                            <div className="me-4" style={{ width: "80px", height: "80px", aspectRatio: "2/2" }}>
                                                <img
                                                    src={`${ApiConfig.ImageUrl}groups/${dt.createdBy}/${dt.groupImage}`}
                                                    onError={(e) => {
                                                        e.target.src = "images/avatar.png"; //replacement image imported above
                                                    }}
                                                    alt=""
                                                    className="w-100 h-100 rounded-circle"
                                                />
                                            </div>

                                            <div className="d-flex flex-column">
                                                <h5>{dt.groupName}</h5>
                                                <p className="mb-0 fs-small">{dt.description.substring(0, 66) + '...'}</p>
                                            </div>
                                        </div>)}
                                    </div>
                                </div>
                                <div className="mt-3 p-4">
                                    <h5>Files</h5>

                                    {careFiles.length > 0 && careFiles.map((dt, i) => <p className="pointer" onClick={() => window.open(ApiConfig.ImageUrl + 'careplan/' + carePlanId + '/' + dt.file)} key={i}>{dt.fileName}</p>)}
                                </div>
                            </div>
                        </div>
                        {/* <!-- Modal --> */}
                        <div class="modal fade" id="forumModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content py-4 px-3">
                                    <div class="modal-header border-0">
                                        {/* <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> */}
                                        <h3>Add New Question</h3>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                    </div>
                                    {/* <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                                </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CarePlanInfo;
