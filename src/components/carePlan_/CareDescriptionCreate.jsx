
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DateInput from "../../commonComponent/CutomDatePicker";
import Button from "../../commonComponent/Button";
import Select from "react-select";
import { changeDateFormatYYYY, formatNewDate, isEmpty, showToastError, showToastSuccess } from "../../Utils/Helper";
import { createCarePlanService, getCarePlanFormListService, getFitnessPlanListService, getSingleCarePlanListService, updateCarePlanService } from "../../services/CreateCarePlanService";
import { AiOutlinePlus } from "react-icons/ai";
import AssignClients from "./AssignClientsModal";
import AssignGroups from "./AssignGroupsModal";
import { getMealPlanListService } from "../../services/MealService";
import { getActiveProgram } from "../../services/ActivePrograms";
import { supplementList } from "../../Utils/AllConstant";
import SupplementsModal from "./SupplementsModal";
import MedicationsModal from "./MedicationsModal";
import { GoPrimitiveDot } from "react-icons/go";
import AddPrograms from "./AddProgramsModal";
import { getMyGroupList } from "../../services/GroupService";
import { getMyPatientList } from "../../services/PatientService";

const CareDescriptionCreate = (props) => {
    let location = useLocation();
    const newcareplanId = props.newcareplanId;
    // let supplementData = location?.state?.supplementDetail || [];
    const getDate = (date) => {
        try {
            if (date && new Date(date) != 'Invalid Date') {
                return new Date(date)
            }
            // return new Date()
        } catch (error) { }
    }
    //   let plan = location?.state.plan || [];
    const [carePlan, setCarePlanCreate] = useState({});
    const [careTitleCreate, setCareTitleCreate] = useState("");
    const [careDescriptionCreate, setCareDescriptionCreate] = useState("");
    const [careDuration, setCareDuration] = useState(0);
    const [fitnessPlan, setFitnessPlan] = useState("");
    const [mealPlan, setMealPlan] = useState("");
    const [assignDateCreate, setAssignDateCreate] = useState("");
    const [careAffirmations, setCareAffirmations] = useState([]);
    const [careAffirmationsEdit, setCareAffirmationsEdit] = useState([]);
    const [carePrograms, setCarePrograms] = useState([]);
    const [careProgramsEdit, setCareProgramsEdit] = useState([]);
    const [fitnessPlanEdit, setFitnessPlanEdit] = useState([]);
    const [fitnessList, setFitnessList] = useState([]);
    const [careGroups, setCareGroups] = useState([]);
    const [mealPlanList, setMealPlanList] = useState([]);
    const [programList, setProgramList] = useState([]);
    const [formName, setFormName] = useState("");
    const [formList, setFormList] = useState([]);
    const [careClients, setCareClients] = useState([]);
    const [careMedications, setCareMedications] = useState([]);
    const [careSuppliments, setCareSuppliments] = useState([]);
    const [supplimentsDetails, setSupplimentsDetails] = useState([]);
    const [medicationsDetails, setMedicationsDetails] = useState([]);
    const [programsName, setProgramsName] = useState([]);
    const [clientsName, setClientsName] = useState([]);
    const [groupLists, setGroupLists] = useState([]);
    const [groupsName, setGroupsName] = useState([]);
    const [patientLists, setPatientLists] = useState([]);
    const [status, setStatus] = useState(false);
    const [isLoading, setLoader] = useState(false);
    const [isLoading1, setLoader1] = useState(false);
    const [selectedClients, setSelectedClients] = useState([])
    const [error, setError] = useState({ title: false, desc: false, duration: false, assign_date: false });

    let navigate = useNavigate();

    const checkValidation = () => {
        try {
            let errorsResult = error;
            let isValid = true;
            if (!careTitleCreate || isEmpty(careTitleCreate)) {
                isValid = false;
                errorsResult = { ...errorsResult, title: true }
            }
            if (!careDescriptionCreate || isEmpty(careDescriptionCreate)) {
                isValid = false;
                errorsResult = { ...errorsResult, desc: true }
            }
            if (!careDuration || isEmpty(careDuration)) {
                isValid = false;
                errorsResult = { ...errorsResult, duration: true }
            }
            if (!assignDateCreate || isEmpty(assignDateCreate)) {
                isValid = false;
                errorsResult = { ...errorsResult, assign_date: true }
            }
            // if (!endDateCreate || isEmpty(endDateCreate)) {
            //   isValid = false;
            //   errorsResult = { ...errorsResult, end_date: true }
            // }
            // if (!programMembersCreate || isEmpty(programMembersCreate)) {
            //   isValid = false;
            //   errorsResult = { ...errorsResult, members: true }
            // }
            // if (!programCareTeam || isEmpty(programCareTeam)) {
            //   isValid = false;
            //   errorsResult = { ...errorsResult, careTeam: true }
            // }

            setError(errorsResult)
            if (isValid) {
                saveProgram()
            }

        } catch (error) {

        }
    }
    useEffect(() => {
        if (newcareplanId) {
            getSingleCarePlanById();
        }
    }, [newcareplanId])

    const getSingleCarePlanById = async () => {
        setLoader1(true)
        // console.log(sessionId);
        try {
            if (!newcareplanId) {
                return;
            }
            const response = await getSingleCarePlanListService(newcareplanId);
            // console.log(response.data[0].attachments, "response")
            if (response.status === 200) {
                setCarePlanCreate(response.data[0])
                setCareTitleCreate(response.data[0]?.name);
                setCareDescriptionCreate(response.data[0]?.description);
                setCareDuration(response.data[0]?.duration);
                setAssignDateCreate(new Date(formatNewDate(response.data[0]?.assignDate)) || '');
                setCareGroups(response.data[0]?.groups?.map((dt) => dt._id));
                setCareClients(response.data[0]?.clients);
                setCarePrograms(response.data[0]?.programs?.map((dt) => dt._id));
                // setProgramNames(response.data[0]?.programs?.map((dt) => dt.programName));
                setSupplimentsDetails(response.data[0].suppliments);
                setMedicationsDetails(response.data[0].medications)
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
    const saveProgram = async () => {
        setLoader(true)
        const mealResult = mealPlan?.value;
        const fitnessResult = fitnessPlan?.value
        const affirmationResult = careAffirmations?.map((item) => item.label)
        var params = {};
        params["name"] = careTitleCreate;
        params["description"] = careDescriptionCreate;
        params["duration"] = Number(careDuration);
        params["assignDate"] =
            assignDateCreate == null ? null : changeDateFormatYYYY(assignDateCreate);
        params["mealPlan"] = mealResult;
        params["formId"] = formName?.value;
        params["fitnessPlan"] = fitnessResult;
        params["affirmations"] = newcareplanId ? affirmationResult : careAffirmations;
        params["programs"] = carePrograms ? carePrograms : [];
        params["medications"] = medicationsDetails;
        params["suppliments"] = supplimentsDetails;
        // params["suppliments"] = newcareplanId ? supplimentResult : careSuppliments;
        params["groups"] = careGroups ? careGroups : [];
        params["clients"] = careClients ? careClients : [];
        if (newcareplanId) {
            try {
                const response = await updateCarePlanService(newcareplanId, params);
                setLoader(false)
                if (response.status === 200) {
                    showToastSuccess(`Care Plan is updated`)
                    props.onSave(response.data._id);
                    setCareClients([]);
                    setCareGroups([]);
                    // setProgramId(response.data.data.insertedId)
                } else {
                    showToastError(response?.data || response.message || "Some error occurred")
                }
            } catch (error) {
                setLoader(false)
                showToastError(error?.data?.data || error.data?.message || "Some error occurred")
            }
        }
        else {
            try {
                const response = await createCarePlanService(params);
                setLoader(false)
                if (response.status === 200) {
                    showToastSuccess(`Care Plan is created`)
                    setCareClients([]);
                    setCareGroups([]);
                    setCareSuppliments([]);
                    props.onSave(response.data)
                    // setProgramId(response.data.data.insertedId)
                    // navigate('/careplan', { state: { newCreatedPlanId: response.data.insertedId } })
                } else {
                    showToastError(response?.data || response.message || "Some error occurred")
                }
            } catch (error) {
                setLoader(false)
                showToastError(error?.data?.data || error.data?.message || "Some error occurred")
            }
        }
    }
    const handleCreateProgram = async (e) => {
        e.preventDefault();
        checkValidation();
    };
    const getPatientLists = async () => {
        try {
            const response = await getMyPatientList();
            if (response.status === 200) {
                setPatientLists(response?.data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const exceptThisSymbols = ["e", "E", "+", "-", "."];
    const getGroupLists = async () => {
        try {
            const response = await getMyGroupList();
            if (response.status === 200) {
                setGroupLists(response?.data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getProgramsList = () => {
        let finaldata = []
        programList?.forEach((item) => {
            if (carePrograms?.includes(item._id)) {
                return finaldata.push({
                    _id: item._id,
                    programsName: item.programName
                })
            }
        })
        setProgramsName(finaldata);
    }
    const getGroupsInfo = () => {
        let finaldata = []
        groupLists?.forEach((item) => {
            if (careGroups?.includes(item._id)) {
                return finaldata.push({
                    _id: item._id,
                    groupsName: item.groupName
                })
            }
        })
        setGroupsName(finaldata);
    }
    const getPatientsInfo = () => {
        let finaldata = []
        patientLists?.forEach((item) => {
            if (careClients?.includes(item._id)) {
                return finaldata.push({
                    _id: item._id,
                    clientsName: item.first_name
                })
            }
        })
        setClientsName(finaldata);
    }
    const getPrograms = async () => {
        try {
            const response = await getActiveProgram();
            // setLoader(false);
            if (response.status === 200) {
                setProgramList(response?.data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getForms = async () => {
        try {
            const response = await getCarePlanFormListService();
            // setLoader(false);
            if (response.status === 200) {
                setFormList(response?.data || []);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getFormName = () => {
        const result = formList.map((item) => {
            return {
                label: item.formName,
                value: item._id
            }
        });
        return result || [];
    }
    const getFitnessPlanList = async () => {
        try {
            const response = await getFitnessPlanListService();
            setLoader(false);
            if (response) {
                // console.log(response, "response");
                setFitnessList(response.data || []);
            }
        } catch (error) {
            // setLoader(false)
        }
    };
    const getFitnessPlanName = () => {
        const result = fitnessList?.map((item) => {
            return {
                label: item.planName,
                value: item._id
            }
        });
        return result || [];
    }
    const getSupplementName = () => {
        const result = supplementList.map((item) => {
            return {
                label: item.name,
                value: item.id
            }
        });
        return result || [];
    }
    const getMealPlan = async (firstTimeOnly) => {
        try {
            const response = await getMealPlanListService();
            // setLoader(false);
            if (response) {
                setMealPlanList(response)
            }
        } catch (error) {
            console.log(error);
        }
    };
    // const getSetProgramName = () => {
    //     const result = carePlan?.programs?.map((item) => {
    //         return {
    //             label: item.programName,
    //             value: item._id
    //         }
    //     });
    //     setCarePrograms(result);
    //     return result || [];
    // }
    const getSetFitnessPlan = () => {
        const result = carePlan?.fitnessPlan ? {
            label: carePlan?.fitnessPlan.planName,
            value: carePlan?.fitnessPlan._id
        } : {}
        setFitnessPlan(result);
        return result;
    }
    const getSetAffirmation = () => {
        const result = carePlan?.affirmations?.map((item) => {
            return {
                // label: item.planName,
                // value: item._id
                label: item,
                value: item
            }
        });
        setCareAffirmations(result);
        return result || [];
    }
    const getSetSupplimentsName = () => {
        const result = carePlan?.suppliments?.map((item, index) => {
            // console.log(item, index)
            return {
                label: item,
                value: index
            }
        });
        setCareSuppliments(result);
        return result || [];
    }
    const getMealPlanName = () => {
        const result = mealPlanList.map((item) => {
            return {
                label: item.mealPlanName,
                value: item._id
            }
        });
        return result || [];
    }
    useEffect(() => {
        getProgramsList()
    }, [carePrograms, programList])
    useEffect(() => {
        getPatientsInfo()
    }, [careClients, patientLists])
    useEffect(() => {
        getGroupsInfo()
    }, [careGroups, groupLists])
    useEffect(() => {
        getMealPlan('firstTimeOnly');
        getPrograms();
        getPatientLists();
        getGroupLists();
        getForms();
        getFitnessPlanList();
    }, [])
    useEffect(() => {
        if (newcareplanId) {
            setMealPlan({ label: carePlan?.mealPlan?.mealPlanName, value: carePlan?.mealPlan?._id });
            setFormName({ label: carePlan?.formId?.formName, value: carePlan?.formId?._id });
            // getSetProgramName();
            getSetFitnessPlan();
            getSetAffirmation();
            getSetSupplimentsName();
        }
    }, [carePlan])
    const renderError = (msg, value) => {
        return (
            value ? (
                <h6 className="text-danger error" style={{ marginBottom: 15, marginTop: -28 }}>
                    {msg}
                </h6>) : null)
    }
    const stopSubmitOnEnter = (e) => {
        var eve = e || window.event;
        var keycode = eve.keyCode || eve.which || eve.charCode;

        if (keycode == 13) {
            eve.cancelBubble = true;
            eve.returnValue = false;
            if (eve.stopPropagation) {
                eve.stopPropagation();
                eve.preventDefault();
            }
            return false;
        }
    }
    const renderForm = () => {
        return (
            <form onSubmit={handleCreateProgram}>
                <div className="row mt-5 mx-5">
                    <div className="col-sm-12 my-2">
                        <h4>Add Care Plan Description</h4>
                        <p className="text-secondary">Give your care plan a title and description so it gives clarification to the patients</p>
                    </div>
                    <div className="col-md-12">
                        <p className="whole_label">Care Plan Title<span style={{ color: "red", fontWeight: "bold" }}> *</span></p>
                        <input
                            type="text"
                            className="description_inputf"
                            value={careTitleCreate}
                            maxLength={80}
                            onChange={(e) => {
                                setCareTitleCreate(e.target.value)
                                setError({ ...error, title: false })
                            }} />
                        {renderError('Please enter title', error.title)}
                    </div>
                    <div className="col-md-12">
                        <p className="whole_label">description<span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                        <textarea
                            rows="6"
                            type="text"
                            className="description_inputf description_descpf is-invalid"
                            value={careDescriptionCreate}
                            maxLength={200}
                            onChange={(e) => {
                                setError({ ...error, desc: false })
                                setCareDescriptionCreate(e.target.value)
                            }} />
                        {renderError('Please enter description', error.desc)}
                    </div>
                    <div className="col-md-6 mb-4">
                        <p className="whole_label">Assign <span className="small_letter2">date</span> <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                        <DateInput
                            value={assignDateCreate}
                            onChangeDate={(date) => {
                                setAssignDateCreate(date)
                                setError({ ...error, assign_date: false })

                            }}
                            // maxDate={endDateCreate}
                            minDate={new Date()}
                            inputClassName={"description_inputf d-flex mb-0 align-items-center"} />
                        {error.assign_date ?
                            <h6 className="text-danger error" style={{ marginTop: 7 }}>
                                {'Please select assign date'}
                            </h6> : null}
                    </div>
                    <div className="col-md-6 ">
                        <p className="whole_label">Number<span className="small_letter2"> of Days</span><span style={{ color: "red", fontWeight: "bold" }}> *</span></p>
                        <input
                            type="number"
                            className="description_inputf"
                            value={careDuration}
                            min="0"
                            max="36500"
                            onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()}
                            onChange={(e) => {
                                setCareDuration(e.target.value.slice(0, 5))
                                setError({ ...error, duration: false })
                            }} />
                        {/* {renderError('Please enter duration', error.duration)} */}
                        {error.duration ?
                            <h6 className="text-danger error" style={{  marginTop: "-27px" }}>
                                {'Please select Number of days'}
                            </h6> : null}
                    </div>
                    <div className="col-md-6">
                        <p className="whole_label">Add Meal Plan</p>
                        <div className="member-select" >
                            <Select
                                className=""
                                value={mealPlan}
                                onChange={(e) => {
                                    setMealPlan(e);
                                }}
                                placeholder={"Add Meal Plan"}
                                options={getMealPlanName()}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <p className="whole_label">Add Fitness Plan</p>
                        <div className="member-select" >
                            <Select
                                // isMulti
                                className=""
                                value={newcareplanId ? fitnessPlan : fitnessPlanEdit}
                                onChange={(data) => {
                                    // console.log(data, "data")
                                    if (newcareplanId) {
                                        setFitnessPlan(data)
                                    }
                                    else {
                                        setFitnessPlan(data);
                                        setFitnessPlanEdit(data)
                                    }
                                }}
                                placeholder={"Add Fitness Plan"}
                                options={getFitnessPlanName()}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <p className="whole_label">Add Affirmations</p>
                        <div className="member-select" >
                            <Select
                                isMulti
                                className=""
                                value={newcareplanId ? careAffirmations : careAffirmationsEdit}
                                onChange={(data) => {
                                    // console.log(data, "data")
                                    if (newcareplanId) {
                                        setCareAffirmations(data)
                                    }
                                    else {
                                        setCareAffirmations(data.map((dt) => dt.label));
                                        setCareAffirmationsEdit(data)
                                    }
                                }}
                                placeholder={"Add Affirmations"}
                                options={[
                                    { label: 'Mindset', value: 'Mindset' },
                                    { label: 'Relationships', value: 'Relationships' },
                                    { label: 'Motivation', value: 'Motivation' },
                                    { label: 'Spirituality', value: 'Spirituality' },
                                    { label: 'Resilience', value: 'Resilience' }
                                ]}
                            />
                        </div>
                    </div>
                    {/* <div className="col-md-6">
                        <p className="whole_label">Add Programs</p>
                        <div className="member-select" >
                            <Select
                                isMulti
                                className=""
                                value={newcareplanId ? carePrograms : careProgramsEdit}
                                onChange={(data) => {
                                    console.log(data, "data")
                                    if (newcareplanId) {
                                        setCarePrograms(data)
                                    }
                                    else {
                                        setCarePrograms(data.map((dt) => dt.value));
                                        setCareProgramsEdit(data)
                                    }
                                }}
                                placeholder={"Add Programs"}
                                options={getProgramName()}
                            />

                        </div>
                    </div> */}
                    <div className="col-md-6">
                        <p className="whole_label">Add Forms & Waivers</p>
                        <div className="member-select" >
                            <Select
                                className=""
                                value={formName}
                                onChange={(data) => {
                                    setFormName(data);
                                }}
                                placeholder={"Add Forms & Waivers"}
                                options={getFormName()}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <p className="whole_label" type="button" data-bs-toggle="modal" data-bs-target="#medicationsModal">Add Medications <AiOutlinePlus /></p>
                        {medicationsDetails ? medicationsDetails.map((dt) =>
                            <p className="text-muted mt-2"><GoPrimitiveDot /> {dt.medicineName.label}</p>
                        ) : null}
                    </div>
                    <div className="col-md-6">
                        <p className="whole_label" type="button" data-bs-toggle="modal" data-bs-target="#supplementsModal">Add Supplements <AiOutlinePlus /></p>
                        {supplimentsDetails ? supplimentsDetails.map((dt) =>
                            <p className="text-muted mt-2"><GoPrimitiveDot /> {dt.supplementName.label}</p>
                        ) : null}
                    </div>
                    <div className="col-md-6 mt-3">
                        <p className="whole_label" type="button" data-bs-toggle="modal" data-bs-target="#assignclientsmodal">
                            Assign to Clients <AiOutlinePlus />
                        </p>
                        {clientsName ? clientsName.map((dt) =>
                            <p className="text-muted mt-2"><GoPrimitiveDot /> {dt.clientsName}</p>
                        ) : null}
                    </div>
                    <div className="col-md-6 mt-3">
                        <p className="whole_label" type="button" data-bs-toggle="modal" data-bs-target="#assigngroupsmodal">
                            Assign to Groups  <AiOutlinePlus />
                        </p>
                        {groupsName ? groupsName.map((dt) =>
                            <p className="text-muted mt-2"><GoPrimitiveDot /> {dt.groupsName}</p>
                        ) : null}
                    </div>
                    <div className="col-md-6 mt-3">
                        <p className="whole_label" type="button" data-bs-toggle="modal" data-bs-target="#assignprogrammodal">
                            Add Programs  <AiOutlinePlus />
                        </p>
                        {programsName ? programsName.map((dt) =>
                            <p className="text-muted mt-2"><GoPrimitiveDot /> {dt.programsName}</p>
                        ) : null}
                    </div>
                    <SupplementsModal supplimentDetails={supplimentsDetails} setSupplimentsDetails={setSupplimentsDetails} />
                    <MedicationsModal medicationDetails={medicationsDetails} setMedicationsDetails={setMedicationsDetails} />
                    <AssignClients members={careClients ? careClients : null} setMembers={setCareClients} patientsList={patientLists} />
                    <AssignGroups members={careGroups ? careGroups : null} setMembers={setCareGroups} groupLists={groupLists} />
                    <AddPrograms members={carePrograms ? carePrograms : null} setMembers={setCarePrograms} programsList={programList} />
                    <div className="col-md-12 mt-5">
                        <hr />
                        <div className="d-flex justify-content-between mx-0">
                            <div style={isLoading ? { pointerEvents: 'none' } : { backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9' }} className="pointer description_btnsave d-flex justify-content-center align-items-center mx-0" onClick={() => !isLoading && navigate('/careplan')}>Cancel</div>
                            <Button isLoading={isLoading} type="submit" id="reateProgram" text={'Save & Continue'} style={isLoading ? { cursor: 'none' } : {}} className="description_btnsave mx-0" />
                        </div>
                    </div>

                </div>
            </form>
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

export default CareDescriptionCreate;