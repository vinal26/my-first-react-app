import React, { useEffect, useState } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "../appointment/style.css";
import "./style.css";
import { FiSearch } from "react-icons/fi";
import AllpatientDiagram from "./AllpatientDiagram";
// import AllPatientButton from "./AllPatientButton";
// import AllPatientProfile from "./AllPatientProfile";
import AllPatientCurrentReading from "./AllPatientCurrentReading";
import ShiftScore from "./ShiftScore";
import ModerateRiskChiefConcerns from "./ModerateRiskChiefConcerns";
import AllButton from "./AllButton";
import OnProcess from "./OnProcess";
import { useLocation, useNavigate } from "react-router-dom";
import { HiDocumentText, HiOutlineArrowSmLeft } from "react-icons/hi";
import { GiMedicines } from "react-icons/gi";
import Avatar from "../../commonComponent/Avatar";
import { getFormResponses, getUserAllergies_Vaccination, getUserAssesment, getUserGoals, getUserScore, getUserSymptoms, getUserVital_Metrix } from "../../services/PatientOverviewServices";
import { changeDateFormat, showToastError } from "../../Utils/Helper";
import { getPatientList, getUserShortGoalData, getVisits } from "../../services/PatientService";
import { useAuth } from "../../Context/AuthContext";
import weight from '../../images/weight.png';
import temp from '../../images/temp.png';
import height from '../../images/height.png';
import lungs from '../../images/lungs.png';
import bmi from '../../images/bmi.png';
import bp from '../../images/blood_pressure.png';
import bs from '../../images/blood_sugar.png';
import bd from '../../images/blood_drop.png';
import heart from '../../images/heart.png';
import { endOfMonth, format, isToday, parseISO, startOfMonth, subDays } from "date-fns";
// new package added
import Accordion from 'react-bootstrap/Accordion';
import { BiCookie } from "react-icons/bi";
import { CustomLine } from "../../commonComponent/CustomChart";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import ApiConfig from "../../config/ApiConfig";
import { AiOutlineForm } from "react-icons/ai";
import FormsModal from "./FormsModal";

const AllPatientInfo = () => {
  const [visits, setVisits] = useState(0)
  const [userAssesment, setUserAssesment] = useState([])
  const [symptoms, setUserSymptoms] = useState([])
  const [AV, setUserAV] = useState([])
  const [riskProfile, setRiskProfile] = useState(1)
  const [goals, setUserGoals] = useState({})
  const [healthGoal, setUserHealthGoals] = useState({})
  const [goalsLifestyle, setUserLifestyleGoals] = useState({})
  const [score, setUserScores] = useState({})
  const [patientLists, setPatientLists] = useState([]);
  const [FormLists, setFormLists] = useState([]);
  const [questionsShow, setQuestionsShow] = useState([]);
  const [formTitle, setFormTitle] = useState("");
  const [modalFormShow, setModalFormShow] = useState(false);
  const [filterdata, setFilterData] = useState([]);
  const [isLoading, setLoader] = useState(true);
  const [chartTabs, setChartTabs] = useState({
    "metrix": true,
    "vitals": false,
  });
  const [userHeart, setUserHeart] = useState([])
  const [userRes, setUserRes] = useState([])
  const [userBs, setUserBs] = useState([])
  const [userB02, setUserB02] = useState([])
  const [userBbp, setUserBbp] = useState([])
  const [userBt, setUserBt] = useState([])

  const [userHeight, setUserHeight] = useState([])
  const [userWeight, setUserWeight] = useState([])
  const [userBmi, setUserBmi] = useState([])
  const [userWaist, setUserWaist] = useState([])


  const [graphData, setGraphData] = useState([])
  const [graphData1, setGraphData1] = useState([])
  const [selVM, setSelVM] = useState("heartRate")
  const [selVM1, setSelVM1] = useState("weight")
  const [flip, setFlip] = useState(false)
  const [flip1, setFlip1] = useState(false)
  const [dur, setDur] = useState("week")
  const [dur1, setDur1] = useState("week")


  let location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  let user = location?.state?.user || '';
  let checkRoute = location?.state?.route || false;
console.log(user);

  const fetchUserAssesment = async () => {
    try {

      let resp = await getUserAssesment(format(new Date(), 'yyyy-MM-dd'), user._id)
      if (resp?.status == 200) {
        setUserAssesment(resp.data.data)
      }
    } catch (e) {
      // showToastError("Unable to Fetch User Assesment")
      console.log(e, "User Assesment")
    }
  }
  const fetchUserSymptoms = async () => {
    try {

      let resp = await getUserSymptoms(format(new Date(), 'yyyy-MM-dd'), user._id)
      if (resp?.status == 200) {
        setUserSymptoms(resp.data.data[0]?.symptoms)
      }
    } catch (e) {
      // showToastError("Unable to Fetch User Symptoms")
      console.log(e, "User Symptoms")
    }
  }

  const getUserShortGoal = async (key) => {
    try {
      let resp = await getUserShortGoalData(key, user._id)
      if (resp?.status == 200) {
        if (key == "Nutrition") {
          setUserGoals(resp)
        }
        else if (key == "Health") {
          setUserHealthGoals(resp);
        }
        else {
          setUserLifestyleGoals(resp)
        }
      }
    } catch (e) {
      // showToastError("Unable to Fetch User Symptoms")
      console.log(e, "User goals")
    }
  }

  const getUserScores = async () => {
    try {

      let resp = await getUserScore(user._id)
      if (resp?.status == 200) {
        setUserScores(resp.data.data)
      }
    } catch (e) {
      // showToastError("Unable to Fetch User Symptoms")
      console.log(e, "User Symptoms")
    }
  }

  const getFormList = async () => {
    try {

      let resp = await getFormResponses(user._id)
      if (resp?.status == 200) {
        setFormLists(resp.data.data)
      }
    } catch (e) {
      // showToastError("Unable to Fetch User Symptoms")
      console.log(e, "User Symptoms")
    }
  }


  useEffect(() => {
    fetchUserAssesment()
    fetchUserSymptoms()
    getPatientVisits()
    getFormList()
    // getUserShortGoal("Nutrition")
    // getUserShortGoal("Lifestyle")
    // getUserShortGoal("Health")
    // getUserScores()
    getHeight()
    getWeight()
    getBMI()
    getWaist()

    getResRate()
    getHeartRate()
    getBloodSugar()
    getBlood02()
    getBloodBP()
    getBodyTemp()
    getAllergies()
    getGraphData()
    getGraphData1()
  }, [])

  useEffect(() => {
    getGraphData()
  }, [selVM, dur])

  useEffect(() => {
    getGraphData1()
  }, [selVM1, dur1])

  // useEffect(() => {
  //   console.log("Duration: ", dur);
  // },[dur])

  useEffect(() => {
    if (userAssesment[0]?.totalScore <= 120) {
      setRiskProfile(1)
    } else if (userAssesment[0]?.totalScore > 120 && userAssesment[0]?.totalScore <= 240) {
      setRiskProfile(2)
    } else if (userAssesment[0]?.totalScore > 240 && userAssesment[0]?.totalScore <= 360) {
      setRiskProfile(3)
    } else {
      setRiskProfile(0)
    }
  }, [userAssesment[0]?.totalScore])

  const getPatientLists = async (searchWord) => {
    try {
      const response = await getPatientList(searchWord);
      setLoader(false);
      if (response.status === 200) {
        setPatientLists((response?.data?.data).reverse());
        setFilterData((response?.data?.data).reverse());
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const getPatientVisits = async () => {
    try {
      const response = await getVisits(user._id);
      // setLoader(false);
      if (response.status === 200) {
        // console.log(response.data);
        setVisits((response?.data?.data).length);
      }
    } catch (error) {
      // setLoader(false);
      console.log(error);
    }
  };

  const onPatientSearch = async (e) => {
    let searchWord = e.target.value;
    const result = patientLists.filter((value) => {
      if (value) {
        return (
          value?.first_name
            ?.toLowerCase()
            ?.includes(searchWord?.toLowerCase()) ||
          value?.last_name?.toLowerCase()?.includes(searchWord?.toLowerCase())
        );
      }
    });

    if (searchWord === "") {
      setFilterData(patientLists);
      getPatientLists(searchWord);
    } else {
      setFilterData(result);
    }
  };

  const navigateToChat = () => {
    auth.createDialog(user);
    navigate('/messages', { state: { route: 'allpatientoverview', user: user } }, { replace: true })
  }

  const getAllergies = async () => {
    try {

      let data = await getUserAllergies_Vaccination(user._id)
      if (data?.status == 200) {
        console.log(data.data.data[0], "Allergies & Vaccination");
        setUserAV(data.data.data[0])
      }
    } catch (e) {
      // showToastError("Unable to Fetch User Assesment")
      console.log(e, "User Vitals/Metrics")
    }
  }

  const getVital = async (type, name, start, end) => {
    try {

      let resp = await getUserVital_Metrix(type, name, start, end, user._id)
      if (resp?.status == 200) {
        return resp.data
      }
    } catch (e) {
      // showToastError("Unable to Fetch User Assesment")
      console.log(e, "User Vitals/Metrics")
    }
  }

  const getGraphData = async () => {
    try {
      let data;
      if (dur == "week")
        data = await getVital("daily", selVM, format(subDays(new Date(), 7), 'yyyy-MM-dd'), format(new Date(), 'yyyy-MM-dd'))
      else if (dur == "month")
        data = await getVital("daily", selVM, format(startOfMonth(new Date()), 'yyyy-MM-dd'), format(endOfMonth(new Date()), 'yyyy-MM-dd'))

      if (data?.status == 200) {
        console.log(data, "Graph line");
        setGraphData(data.data)
      }
    } catch (e) {
      // showToastError("Unable to Fetch User Assesment")
      console.log(e, "Graph line")
    }
  }

  const getGraphData1 = async () => {
    try {
      let data;
      if (dur1 == "week")
        data = await getVital("daily", selVM1, format(subDays(new Date(), 7), 'yyyy-MM-dd'), format(new Date(), 'yyyy-MM-dd'))
      else if (dur1 == "month")
        data = await getVital("daily", selVM1, format(startOfMonth(new Date()), 'yyyy-MM-dd'), format(endOfMonth(new Date()), 'yyyy-MM-dd'))

      if (data?.status == 200) {
        console.log(data, "Graph line");
        setGraphData1(data.data)
      }
    } catch (e) {
      // showToastError("Unable to Fetch User Assesment")
      console.log(e, "Graph line")
    }
  }

  const getResRate = async () => {
    // console.log(format(new Date(), 'yyyy-MM-dd'), "Vital Date")
    try {
      let data = await getVital("day", "respRate", format(new Date(), 'yyyy-MM-dd'), '')
      if (data?.status == 200) {
        console.log(data, "Resp");
        setUserRes(data.data)
      }
    } catch (e) {
      // showToastError("Unable to Fetch User Assesment")
      console.log(e, "Res rate")
    }
  }

  const getHeartRate = async () => {
    // console.log(format(new Date(), 'yyyy-MM-dd'), "Vital Date")
    try {
      let data = await getVital("day", "heartRate", format(new Date(), 'yyyy-MM-dd'), '')
      if (data?.status == 200) {
        console.log(data, "heart");
        setUserHeart(data.data)
      }
    } catch (e) {
      // showToastError("Unable to Fetch User Assesment")
      console.log(e, "Heart rate")
    }
  }

  const getBloodSugar = async () => {
    // console.log(format(new Date(), 'yyyy-MM-dd'), "Vital Date")
    try {
      let data = await getVital("day", "bloodSugar", format(new Date(), 'yyyy-MM-dd'), '')
      if (data?.status == 200) {
        console.log(data, "sugar");
        setUserBs(data.data)
      }
    } catch (e) {
      // showToastError("Unable to Fetch User Assesment")
      console.log(e, "Sugar rate")
    }
  }

  const getBlood02 = async () => {
    // console.log(format(new Date(), 'yyyy-MM-dd'), "Vital Date")
    try {
      let data = await getVital("day", "bloodO2", format(new Date(), 'yyyy-MM-dd'), '')
      if (data?.status == 200) {
        console.log(data, "02");
        setUserB02(data.data)
      }
    } catch (e) {
      // showToastError("Unable to Fetch User Assesment")
      console.log(e, "O2 rate")
    }
  }

  const getBloodBP = async () => {
    // console.log(format(new Date(), 'yyyy-MM-dd'), "Vital Date")
    try {
      let data = await getVital("day", "bloodBP", format(new Date(), 'yyyy-MM-dd'), '')
      if (data?.status == 200) {
        console.log(data, "BP");
        setUserBbp(data.data)
      }
    } catch (e) {
      // showToastError("Unable to Fetch User Assesment")
      console.log(e, "BP rate")
    }
  }

  const getBodyTemp = async () => {
    // console.log(format(new Date(), 'yyyy-MM-dd'), "Vital Date")
    try {
      let data = await getVital("day", "bodyTemp", format(new Date(), 'yyyy-MM-dd'), '')
      if (data?.status == 200) {
        console.log(data, "Body Temp");
        setUserBt(data.data)
      }
    } catch (e) {
      // showToastError("Unable to Fetch User Assesment")
      console.log(e, "Body Temp")
    }
  }

  // Metrics
  const getHeight = async () => {
    // console.log(format(new Date(), 'yyyy-MM-dd'), "Vital Date")
    try {
      let data = await getVital("day", "height", format(new Date(), 'yyyy-MM-dd'), '')
      if (data?.status == 200) {
        console.log(data, "height");
        setUserHeight(data.data)
      }
    } catch (e) {
      // showToastError("Unable to Fetch User Assesment")
      console.log(e, "height")
    }
  }

  const getWeight = async () => {
    // console.log(format(new Date(), 'yyyy-MM-dd'), "Vital Date")
    try {
      let data = await getVital("day", "weight", format(new Date(), 'yyyy-MM-dd'), '')
      if (data?.status == 200) {
        console.log(data, "weight");
        setUserWeight(data.data)
      }
    } catch (e) {
      // showToastError("Unable to Fetch User Assesment")
      console.log(e, "weight")
    }
  }

  const getBMI = async () => {
    // console.log(format(new Date(), 'yyyy-MM-dd'), "Vital Date")
    try {
      let data = await getVital("day", "bmi", format(new Date(), 'yyyy-MM-dd'), '')
      if (data?.status == 200) {
        console.log(data, "bmi");
        setUserBmi(data.data)
      }
    } catch (e) {
      // showToastError("Unable to Fetch User Assesment")
      console.log(e, "bmi")
    }
  }

  const getWaist = async () => {
    // console.log(format(new Date(), 'yyyy-MM-dd'), "Vital Date")
    try {
      let data = await getVital("day", "waist", format(new Date(), 'yyyy-MM-dd'), '')
      if (data?.status == 200) {
        console.log(data, "waist");
        setUserWaist(data.data)
      }
    } catch (e) {
      // showToastError("Unable to Fetch User Assesment")
      console.log(e, "waist")
    }
  }

  return (
    <>
      <Navbar searchide={`none`} />

      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 py-4 px-5">
            <div className="row patient_row1">
              <div className="col-xl-4 col-lg-5 col-md-6 col-4 d-flex" style={{ alignItems: "center" }}>
                <span className="dashboard_title">
                  <HiOutlineArrowSmLeft
                    // onClick={() => (checkRoute) ? navigate(-1) : navigate('/allpatientlist')}
                    onClick={() => navigate(-1)}
                    className="icon"
                  />
                </span>
                <div className="avatar_warper d-flex align-items-center">
                  <Avatar
                    image={`${ApiConfig.ImageUrl}user/${user?._id}/${user?.profilePicture}`}
                    style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                  />
                  <span
                    className="allpatient_name12"
                    // data-bs-toggle="modal"
                    // data-bs-target="#chooseprogram"
                    style={{ marginTop: 0, marginLeft: 20 }}
                  >
                    {user.full_name}
                  </span>
                  <div className="avatar_detail">
                    <div className="row">

                      <div className="col-4">
                        <p className="lf_avt">name:</p>
                      </div>
                      <div className="col-8">
                        <p className="rt_avt">{user.full_name}</p>
                      </div>
                      <div className="col-4">
                        <p className="lf_avt">DOB/Age:</p>
                      </div>
                      <div className="col-8">
                        <p className="rt_avt">{user.dob}</p>
                      </div>
                      <div className="col-4">
                        <p className="lf_avt">Gender:</p>
                      </div>
                      <div className="col-8">
                        <p className="rt_avt">{user.gender}</p>
                      </div>
                      <div className="col-4">
                        <p className="lf_avt">Email:</p>
                      </div>
                      <div className="col-8">
                        <p className="rt_avt">{user.email}</p>
                      </div>
                      <div className="col-4">
                        <p className="lf_avt mb-0">Address:</p>
                      </div>
                      <div className="col-8">
                        <p className="rt_avt mb-0">{user.city} {user.state} {user.country}</p>
                      </div>
                      <div className="col-8 offset-4  d-flex justify-content-between">
                        <a className="avt_link">Quick Link</a>
                        {/* <a className="avt_link">Send Message</a> */}
                        {user.onBoarding ?
                          <span
                            onClick={() => navigateToChat()}
                            className="link_text">
                            <p className="avt_link">
                              Send Message
                            </p>
                          </span> : null}
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* Commented for now enable later if want search in patient overview */}
              {/* <div className="col-xl-8 col-lg-7 col-md-6 col-12">
                <div className="allpatient_search position-relative">
                  <FiSearch className="boxicon" />
                  <input className="patient_searchbox" placeholder="Search Patient Name Here..."
                    onChange={(e) => {
                      onPatientSearch(e)
                    }} onFocus={() => { getPatientLists() }} />
                  <div className="patients_search_result">
                    {isLoading ? (
                      <center>
                        <div
                          style={{
                            width: "3rem", height: "3rem", color: "#1f7e78", top: "110px",
                            position: "relative"
                          }}
                          class="spinner-border mt-3 mb-4"
                          role="status"
                        />
                      </center>
                    ) : filterdata?.length ? (
                      filterdata.map((dt, index) => {
                        return (
                          <div className="d-flex align-items-center mb-2 border-bottom pb-2">
                            <img
                              src={dt.profilePicture && dt.profilePicture}
                              onError={(e) => {
                                e.target.src = "images/avatar.png" //replacement image imported above
                              }}
                              alt=""
                              className="member_listimage"
                              style={{
                                height: "40px",
                                width: "40px",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                            <div className="mx-3">{`${dt.full_name}`}</div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="p-2 d-flex justify-content-center align-items-center h-100">No data found!</div>
                    )}
                  </div>
                </div>
              </div> */}
            </div>

            {/* <div className="row mt-4">
              <div className="col-md-12"> */}
            <div className="row mt-4">
              <div className="col-md-12 col-lg-12 col-xl-4 pb-3 pb-xl-0">
                <div className="card p-2 h-100 d-flex justify-content-start align-items-center">
                  <Avatar
                    image={`${ApiConfig.ImageUrl}user/${user?._id}/${user?.profilePicture}`}
                    className="my-2"
                    style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                  />
                  <p className="fw-bold mb-4">{user.full_name}</p>
                  <div className="row w-100">
                    <div className="col-12">
                      <p className="rt_avt">DOB/Age:</p>

                      {/* <p className="lf_avt">{format(parseISO(user.dob), 'do MMM, yyyy')}</p> */}
                      <p className="lf_avt">{user.dob}</p>

                      <p className="rt_avt">Gender:</p>

                      <p className="lf_avt">{user.gender}</p>

                      <p className="rt_avt">Email:</p>

                      <p className="lf_avt text-lowercase">{user.email}</p>

                      <p className="rt_avt mb-0">Address:</p>

                      <p className="lf_avt mb-0">{user.city} {user.state} {user.country}</p>
                    </div>
                    <div className="col-12">
                      <Accordion className="mt-4">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header><BiCookie size={"1.5em"} />&nbsp; Allergies</Accordion.Header>
                          <Accordion.Body>
                            {AV && AV.allergies?.map(dt => <span class="badge bg-green me-2 py-2 px-3 rounded-pill">{dt}</span>)}
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                          <Accordion.Header><GiMedicines size={"1.5em"} />&nbsp; Vaccination</Accordion.Header>
                          <Accordion.Body>
                            {AV && AV.vaccination?.map(dt => <span class="badge bg-light text-dark me-2 my-1 py-2 px-3 pointer rounded-pill" onClick={() => window.location.href = ApiConfig.ImageUrl + "vaccination/" + user._id + "/" + dt}><HiDocumentText size="1.2em" className="me-2" />{dt}</span>)}
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                          <Accordion.Header><GiMedicines size={"1.5em"} />&nbsp; Medications</Accordion.Header>
                          <Accordion.Body>
                            {/* {AV && AV.vaccination?.map(dt=> <span class="badge bg-light text-dark me-2 py-2 px-3 pointer rounded-pill">{dt}</span>)} */}
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                          <Accordion.Header><GiMedicines size={"1.5em"} />&nbsp; Supplements</Accordion.Header>
                          <Accordion.Body>
                            {/* {AV && AV.vaccination?.map(dt=> <span class="badge bg-light text-dark me-2 py-2 px-3 pointer rounded-pill">{dt}</span>)} */}
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                          <Accordion.Header><AiOutlineForm size={"1.5em"} />&nbsp; Forms & Waivers</Accordion.Header>
                          <Accordion.Body>
                            {FormLists.length > 0 && FormLists.map(dt => <p className="py-2 px-3 badge bg-primary rounded-pill pointer" onClick={() => { setQuestionsShow(dt.questions); setFormTitle(dt.formName); setModalFormShow(true) }}>{dt.formName}</p>)}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>

                      <FormsModal
                        show={modalFormShow}
                        title={formTitle}
                        questions={questionsShow}
                        onHide={() => setModalFormShow(false)}
                      />
                    </div>
                  </div>

                </div>

              </div>
              <div className="col-md-12 col-lg-12 col-xl-8 mb-4 mb-xl-0">
                <div className="row h-100">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-sm-4">
                        <ShiftScore totalScore={userAssesment[0]?.totalScore} fromScore="360" compText="nutrishift score" />
                      </div>
                      <div className="col-sm-4">
                        <ShiftScore totalScore={visits} fromDisable compText="Total Visit" />
                      </div>
                      <div className="col-sm-4">
                        <ShiftScore totalScore={"95%"} fromDisable compText="Engagement" />
                      </div>
                    </div>
                    <hr />
                  </div>
                  <div className="col-md-5 d-flex flex-column">
                    {/* <ShiftScore totalScore={userAssesment[0]?.totalScore} fromScore="360" compText="nutrishift score" />
                        <hr /> */}
                    <div className="card p-3 flex-fill">
                      <ModerateRiskChiefConcerns symptoms={symptoms} riskProfile={riskProfile} userScore={userAssesment[0]?.score} totalScore={userAssesment[0]?.totalScore} />
                    </div>
                  </div>
                  <div className="col-md-7 d-flex flex-column">
                    <div className="mb-3 d-flex chart-tabs">
                      <button onClick={() => setChartTabs(prev => { return { prev, metrix: true } })} type="button" class={`btn btn-light ${chartTabs.metrix && 'active'} me-2`}>Metrics</button>
                      <button onClick={() => setChartTabs(prev => { return { prev, vitals: true } })} type="button" class={`btn btn-light ${chartTabs.vitals && 'active'}`}>Vitals</button>
                    </div>

                    {chartTabs.metrix && <div className={"card shadow-sm custom-card flex-grow-1 flip-content" + (flip1 ? " flip" : "")}>
                      <div className="content">
                        <div className={"card-body front" + (flip1 ? " event-none" : "")}>
                          <div className="mb-0 d-flex justify-content-between align-items-center">
                            <h6 className="mb-3" style={{ fontSize: '0.8rem' }}>Body Metrics</h6>
                            {/* <select className="metrix_select">
                                  <option value="breakfast">This week</option>
                                  <option value="Snacks">This month</option>
                                </select> */}
                          </div>
                          <div className="d-flex flex-wrap" style={{ gap: '10px' }}>
                            <div onClick={() => { setFlip1(true); setSelVM1("weight") }} className="card shadow-sm pointer" style={{ flex: '48%' }}>
                              <div className="card-body">
                                <p className="d-flex align-items-center text-secondary" style={{ fontSize: '0.8rem' }}><img width="25px" src={weight} style={{ padding: '2px', marginRight: '1px' }} /> Weight</p>
                                <h3 className="my-3">{userWeight?.length > 0 ? (userWeight[0]?.weight)?.toFixed(1) : (0.0).toFixed(1)} lbs</h3>
                                {userWeight?.length > 0 ? <p className="text-secondary m-0 sm-ft">last updated on {format(parseISO(userWeight[0]?.createdAt), 'do MMM, yyyy')}</p> : <p className="text-secondary m-0 sm-ft">Not updated yet</p>}
                              </div>
                            </div>
                            <div onClick={() => { setFlip1(true); setSelVM1("bmi") }} className="card shadow-sm pointer" style={{ flex: '48%' }}>
                              <div className="card-body">
                                <p className="d-flex align-items-center text-secondary" style={{ fontSize: '0.8rem' }}><img width="25px" src={bmi} style={{ padding: '2px', marginRight: '1px' }} /> BMI</p>
                                <h3 className="my-3">{userBmi?.length > 0 ? (userBmi[0]?.bmi)?.toFixed(1) : (0.0).toFixed(1)}</h3>
                                {userBmi?.length > 0 ? <p className="text-secondary m-0 sm-ft">last updated on {format(parseISO(userBmi[0]?.createdAt), 'do MMM, yyyy')}</p> : <p className="text-secondary m-0 sm-ft">Not updated yet</p>}
                              </div>
                            </div>
                            <div onClick={() => { setFlip1(true); setSelVM1("height") }} className="card shadow-sm pointer" style={{ flex: '48%' }}>
                              <div className="card-body">
                                <p className="d-flex align-items-center text-secondary" style={{ fontSize: '0.8rem' }}><img width="25px" src={height} style={{ padding: '2px', marginRight: '1px' }} /> Height</p>
                                <h3 className="my-3">{userHeight?.length > 0 ? (userHeight[0]?.height)?.toFixed(1) : (0.0).toFixed(1)} in</h3>
                                {userHeight?.length > 0 ? <p className="text-secondary m-0 sm-ft">last updated on {format(parseISO(userHeight[0]?.createdAt), 'do MMM, yyyy')}</p> : <p className="text-secondary m-0 sm-ft">Not updated yet</p>}
                              </div>
                            </div>
                            <div onClick={() => { setFlip1(true); setSelVM1("waist") }} className="card shadow-sm pointer" style={{ flex: '48%' }}>
                              <div className="card-body">
                                <p className="d-flex align-items-center text-secondary" style={{ fontSize: '0.8rem' }}><img width="25px" src={weight} style={{ padding: '2px', marginRight: '1px' }} /> Waist Circum</p>
                                <h3 className="my-3">{userWaist?.length > 0 ? (userWaist[0]?.waist)?.toFixed(1) : (0.0).toFixed(1)} in</h3>
                                {userWaist?.length > 0 ? <p className="text-secondary m-0 sm-ft">last updated on {format(parseISO(userWaist[0]?.createdAt), 'do MMM, yyyy')}</p> : <p className="text-secondary m-0 sm-ft">Not updated yet</p>}
                              </div>
                            </div>

                          </div>
                        </div>

                        {/* back */}
                        <div className="card-body back">
                          <div className="mb-3 d-flex justify-content-between align-items-center">
                            <div className="d-flex">
                              <BsFillArrowLeftCircleFill
                                className="me-3 pointer"
                                size={"1.4em"}
                                onClick={() => setFlip1(false)}
                              />
                              {selVM1 == "weight" && <h6 className="mb-0" style={{ fontSize: '1rem' }}>Weight</h6>}
                              {selVM1 == "height" && <h6 className="mb-0" style={{ fontSize: '1rem' }}>Height</h6>}
                              {selVM1 == "bmi" && <h6 className="mb-0" style={{ fontSize: '1rem' }}>BMI</h6>}
                              {selVM1 == "waist" && <h6 className="mb-0" style={{ fontSize: '1rem' }}>Waist</h6>}
                            </div>
                            <select defaultValue={dur1} onChange={(e) => setDur1(e.target.value)} className="metrix_select mb-0">
                              <option value="week">This week</option>
                              <option value="month">This month</option>
                            </select>
                          </div>
                          <div className="card shadow-sm">
                            <div className="card-body">
                              <CustomLine data={graphData1} name={selVM1} duration={dur1} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>}

                    {chartTabs.vitals && <div className={"card shadow-sm custom-card flex-grow-1 flip-content" + (flip ? " flip" : "")}>
                      <div className="content">
                        <div className={"card-body front" + (flip ? " event-none" : "")}>
                          <div className="mb-0 d-flex justify-content-between align-items-center">
                            <h6 className="mb-3" style={{ fontSize: '0.8rem' }}>Vitals</h6>
                            {/* <select className="metrix_select">
                                  <option value="breakfast">This week</option>
                                  <option value="Snacks">This month</option>
                                </select> */}
                          </div>
                          <div className="d-flex flex-wrap" style={{ gap: '10px' }}>
                            <div onClick={() => { setFlip(true); setSelVM("heartRate") }} className="card shadow-sm pointer" style={{ flex: '48%' }}>
                              <div className="card-body">
                                <p className="d-flex align-items-center text-secondary" style={{ fontSize: '0.8rem' }}><img width="25px" src={heart} style={{ padding: '2px', marginRight: '1px' }} /> Heart rate</p>
                                <h3 className="my-3">{userHeart?.length > 0 ? (userHeart[0]?.heartRate)?.toFixed(1) : (0.0).toFixed(1)} bpm</h3>
                                {userHeart?.length > 0 ? <p className="text-secondary m-0 sm-ft">last updated on {format(parseISO(userHeart[0]?.createdAt), 'do MMM, yyyy')}</p> : <p className="text-secondary m-0 sm-ft">Not updated yet</p>}
                              </div>
                            </div>
                            <div onClick={() => { setFlip(true); setSelVM("respRate") }} className="card shadow-sm pointer" style={{ flex: '48%' }}>
                              <div className="card-body">
                                <p className="d-flex align-items-center text-secondary" style={{ fontSize: '0.8rem' }}><img width="25px" src={lungs} style={{ padding: '2px', marginRight: '1px' }} /> Resp. rate</p>
                                <h3 className="my-3">{userRes?.length > 0 ? (userRes[0]?.respRate)?.toFixed(1) : (0.0).toFixed(1)} bpm</h3>
                                {userRes?.length > 0 ? <p className="text-secondary m-0 sm-ft">last updated on {format(parseISO(userRes[0]?.createdAt), 'do MMM, yyyy')}</p> : <p className="text-secondary m-0 sm-ft">Not updated yet</p>}
                              </div>
                            </div>
                            <div onClick={() => { setFlip(true); setSelVM("bloodSugar") }} className="card shadow-sm pointer" style={{ flex: '48%' }}>
                              <div className="card-body">
                                <p className="d-flex align-items-center text-secondary" style={{ fontSize: '0.8rem' }}><img width="25px" src={bs} style={{ padding: '2px', marginRight: '1px' }} /> Blood sugar</p>
                                <h3 className="my-3">{userBs?.length ? (userBs[0]?.bloodSugar)?.toFixed(1) : (0.0).toFixed(1)} mg/gl</h3>
                                {userBs?.length > 0 ? <p className="text-secondary m-0 sm-ft">last updated on {format(parseISO(userBs[0]?.createdAt), 'do MMM, yyyy')}</p> : <p className="text-secondary m-0 sm-ft">Not updated yet</p>}
                              </div>
                            </div>
                            <div onClick={() => { setFlip(true); setSelVM("bloodO2") }} className="card shadow-sm pointer" style={{ flex: '48%' }}>
                              <div className="card-body">
                                <p className="d-flex align-items-center text-secondary" style={{ fontSize: '0.8rem' }}><img width="25px" src={bd} style={{ padding: '2px', marginRight: '1px' }} /> Blood 02</p>
                                <h3 className="my-3">{userB02?.length ? (userB02[0]?.bloodO2)?.toFixed(1) : (0.0).toFixed(1)} %</h3>
                                {userB02?.length > 0 ? <p className="text-secondary m-0 sm-ft">last updated on {format(parseISO(userB02[0]?.createdAt), 'do MMM, yyyy')}</p> : <p className="text-secondary m-0 sm-ft">Not updated yet</p>}
                              </div>
                            </div>
                            <div onClick={() => { setFlip(true); setSelVM("bloodBP") }} className="card shadow-sm pointer" style={{ flex: '48%' }}>
                              <div className="card-body">
                                <p className="d-flex align-items-center text-secondary" style={{ fontSize: '0.8rem' }}><img width="25px" src={bp} style={{ padding: '2px', marginRight: '1px' }} /> Blood BP</p>
                                {/* <h3 className="my-3">{userBbp?.length ? (userBbp[0]?.bloodBP)?.toFixed(1) : (0.0).toFixed(1)} %</h3> */}
                                <h3 className="my-3">{userBbp[0]?.bloodBP} mmhg</h3>
                                {userBbp?.length > 0 ? <p className="text-secondary m-0 sm-ft">last updated on {format(parseISO(userBbp[0]?.createdAt), 'do MMM, yyyy')}</p> : <p className="text-secondary m-0 sm-ft">Not updated yet</p>}
                              </div>
                            </div>
                            <div onClick={() => { setFlip(true); setSelVM("bodyTemp") }} className="card shadow-sm pointer" style={{ flex: '48%' }}>
                              <div className="card-body">
                                <p className="d-flex align-items-center text-secondary" style={{ fontSize: '0.8rem' }}><img width="25px" src={temp} style={{ padding: '2px', marginRight: '1px' }} /> Body temp</p>
                                <h3 className="my-3">{userBt?.length ? (userBt[0]?.bodyTemp)?.toFixed(1) : (0.0).toFixed(1)} °F</h3>
                                {userBt?.length > 0 ? <p className="text-secondary m-0 sm-ft">last updated on {format(parseISO(userBt[0]?.createdAt), 'do MMM, yyyy')}</p> : <p className="text-secondary m-0 sm-ft">Not updated yet</p>}
                              </div>
                            </div>

                          </div>
                        </div>

                        {/* back */}
                        <div className="card-body back">
                          <div className="mb-3 d-flex justify-content-between align-items-center">
                            <div className="d-flex">
                              <BsFillArrowLeftCircleFill
                                className="me-3 pointer"
                                size={"1.4em"}
                                onClick={() => setFlip(false)}
                              />
                              {selVM == "heartRate" && <h6 className="mb-0" style={{ fontSize: '1rem' }}>Heart Rate</h6>}
                              {selVM == "respRate" && <h6 className="mb-0" style={{ fontSize: '1rem' }}>Respiration Rate</h6>}
                              {selVM == "bloodSugar" && <h6 className="mb-0" style={{ fontSize: '1rem' }}>Blood Sugar</h6>}
                              {selVM == "bloodO2" && <h6 className="mb-0" style={{ fontSize: '1rem' }}>Blood Oxygen</h6>}
                              {selVM == "bloodBP" && <h6 className="mb-0" style={{ fontSize: '1rem' }}>Blood Pressure</h6>}
                              {selVM == "bodyTemp" && <h6 className="mb-0" style={{ fontSize: '1rem' }}>Body Temperature</h6>}
                            </div>
                            <select defaultValue={dur} onChange={(e) => setDur(e.target.value)} className="metrix_select mb-0">
                              <option value="week">This week</option>
                              <option value="month">This month</option>
                            </select>
                          </div>
                          <div className="card shadow-sm">
                            <div className="card-body">
                              <CustomLine data={graphData} name={selVM} duration={dur} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>}
                  </div>
                  {/* <div className="col-md-6">
                        <div className="card p-3">
                          <AllPatientCurrentReading score={score} />
                        </div>
                      </div> */}
                </div>
                {/* <AllpatientDiagram data={symptoms || []}
                      datalifeGoal={goalsLifestyle.hasOwnProperty("data") ?
                        (goalsLifestyle?.data.length && (goalsLifestyle?.data[0]?.endDate !== changeDateFormat(new Date())))
                          ? goalsLifestyle?.data[0]?.affirmations : [] : [] || []}
                      // dataGoal={goals.hasOwnProperty("affirmations") ? goals?.affirmations : [] || []} 
                      dataGoal={goals.hasOwnProperty("data") ?
                        (goals?.data.length && (goals?.data[0]?.endDate !== changeDateFormat(new Date()))) ?
                          goals?.data[0]?.affirmations : [] : [] || []}
                      healthGoal={healthGoal.hasOwnProperty("data") ?
                        (healthGoal?.data.length && (healthGoal?.data[0]?.endDate !== changeDateFormat(new Date()))) ?
                          healthGoal?.data[0]?.affirmations : [] : [] || []}
                    /> */}
              </div>
            </div>

            <AllButton user={user} />
            <OnProcess user={user} score={score} />
            {/* </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPatientInfo;
