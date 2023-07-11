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
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import Avatar from "../../commonComponent/Avatar";
import { getUserAssesment, getUserGoals, getUserScore, getUserSymptoms } from "../../services/PatientOverviewServices";
import { changeDateFormat, showToastError } from "../../Utils/Helper";
import { getPatientList, getUserShortGoalData } from "../../services/PatientService";
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

const AllPatientOverview = () => {
  const [userAssesment, setUserAssesment] = useState([])
  const [symptoms, setUserSymptoms] = useState({})
  const [riskProfile, setRiskProfile] = useState(1)
  const [goals, setUserGoals] = useState({})
  const [healthGoal, setUserHealthGoals] = useState({})
  const [goalsLifestyle, setUserLifestyleGoals] = useState({})
  const [score, setUserScores] = useState({})
  const [patientLists, setPatientLists] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [isLoading, setLoader] = useState(true);
  let location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  let user = location?.state?.user || '';
  let checkRoute = location?.state?.route || false;
  // console.log(user, 'akdjf')

  const fetchUserAssesment = async () => {
    try {

      let resp = await getUserAssesment(user._id)
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

      let resp = await getUserSymptoms(user._id)
      if (resp?.status == 200) {
        setUserSymptoms(resp.data.data?.symptoms)
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


  useEffect(() => {
    fetchUserAssesment()
    fetchUserSymptoms()
    getUserShortGoal("Nutrition")
    getUserShortGoal("Lifestyle")
    getUserShortGoal("Health")
    getUserScores()
  }, [])

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

  return (
    <>
      <Navbar searchide={`none`} />

      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
            <div className="row patient_row1">
              <div className="col-xl-4 col-lg-5 col-md-6 col-4 d-flex" style={{ alignItems: "center" }}>
                <span className="dashboard_title">
                  <HiOutlineArrowSmLeft
                    onClick={() => (checkRoute) ? navigate(-1) : navigate('/allpatientlist')}
                    //onClick={() => navigate('/allpatientlist')}
                    className="icon"
                  />
                </span>
                <div className="avatar_warper d-flex align-items-center">
                  <Avatar
                    image={user?.profilePicture}
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

            <div className="row mt-4">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-12 col-lg-12 col-xl-8  mb-4 mb-xl-0">
                    <div className="row">
                      {/* <div className="col-md-4">
                        <p className='nutrishift_overview'>overview</p>

                        <ShiftScore totalScore={userAssesment[0]?.totalScore} fromScore="360" compText="nutrishift score" />
                        <ShiftScore totalScore={isNaN(user?.bodyMatrix?.bmi) ? "N/A" : Number(user?.bodyMatrix?.bmi).toFixed(2)}
                          fromScore="0" fromDisable={true} compText="bmi" style={{ textTransform: "uppercase" }} />
                      </div> */}
                      <div className="col-md-6">
                        <ModerateRiskChiefConcerns riskProfile={riskProfile} userScore={userAssesment[0]?.score} totalScore={userAssesment[0]?.totalScore} />
                      </div>
                      <div className="col-md-6">
                        <div className="card p-3">
                          <AllPatientCurrentReading score={score} />
                        </div>
                      </div>
                    </div>
                    <AllpatientDiagram data={symptoms || []}
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
                    />
                  </div>
                  <div className="col-md-12 col-lg-12 col-xl-4">
                    <div className="card shadow-sm custom-card">
                      <div className="card-body">
                        <div className="mb-0 d-flex justify-content-between align-items-center">
                          <h6 className="mb-3" style={{ fontSize: '0.8rem' }}>Body Metrics</h6>
                          <select className="metrix_select">
                            <option value="breakfast">This week</option>
                            <option value="Snacks">This month</option>
                          </select>
                        </div>
                        <div className="d-flex flex-wrap" style={{ gap: '10px' }}>
                          <div className="card shadow-sm" style={{ flex: '48%' }}>
                            <div className="card-body">
                              <p className="d-flex align-items-center text-secondary" style={{ fontSize: '0.8rem' }}><img width="25px" src={weight} style={{ padding: '2px', marginRight: '1px' }} /> Weight</p>
                              <h3 className="my-3">62.2 Kg</h3>
                              <p className="text-secondary m-0">last 63.5 kg</p>
                            </div>
                          </div>
                          <div className="card shadow-sm" style={{ flex: '48%' }}>
                            <div className="card-body">
                              <p className="d-flex align-items-center text-secondary" style={{ fontSize: '0.8rem' }}><img width="25px" src={bmi} style={{ padding: '2px', marginRight: '1px' }} /> BMI</p>
                              <h3 className="my-3">62.2 Kg</h3>
                              <p className="text-secondary m-0">last 63.5 kg</p>
                            </div>
                          </div>
                          <div className="card shadow-sm" style={{ flex: '48%' }}>
                            <div className="card-body">
                              <p className="d-flex align-items-center text-secondary" style={{ fontSize: '0.8rem' }}><img width="25px" src={height} style={{ padding: '2px', marginRight: '1px' }} /> Height</p>
                              <h3 className="my-3">62.2 Kg</h3>
                              <p className="text-secondary m-0">last 63.5 kg</p>
                            </div>
                          </div>
                          <div className="card shadow-sm" style={{ flex: '48%' }}>
                            <div className="card-body">
                              <p className="d-flex align-items-center text-secondary" style={{ fontSize: '0.8rem' }}><img width="25px" src={weight} style={{ padding: '2px', marginRight: '1px' }} /> Waist Circum</p>
                              <h3 className="my-3">62.2 Kg</h3>
                              <p className="text-secondary m-0">last 63.5 kg</p>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="card shadow-sm custom-card mt-3">
                      <div className="card-body">
                        <div className="mb-0 d-flex justify-content-between align-items-center">
                          <h6 className="mb-3" style={{ fontSize: '0.8rem' }}>Vitals</h6>
                          <select className="metrix_select">
                            <option value="breakfast">This week</option>
                            <option value="Snacks">This month</option>
                          </select>
                        </div>
                        <div className="d-flex flex-wrap" style={{ gap: '10px' }}>
                          <div className="card shadow-sm" style={{ flex: '48%' }}>
                            <div className="card-body">
                              <p className="d-flex align-items-center text-secondary" style={{ fontSize: '0.8rem' }}><img width="25px" src={heart} style={{ padding: '2px', marginRight: '1px' }} /> Heart rate</p>
                              <h3 className="my-3">62.2 Kg</h3>
                              <p className="text-secondary m-0">last 63.5 kg</p>
                            </div>
                          </div>
                          <div className="card shadow-sm" style={{ flex: '48%' }}>
                            <div className="card-body">
                              <p className="d-flex align-items-center text-secondary" style={{ fontSize: '0.8rem' }}><img width="25px" src={lungs} style={{ padding: '2px', marginRight: '1px' }} /> Resp. rate</p>
                              <h3 className="my-3">62.2 Kg</h3>
                              <p className="text-secondary m-0">last 63.5 kg</p>
                            </div>
                          </div>
                          <div className="card shadow-sm" style={{ flex: '48%' }}>
                            <div className="card-body">
                              <p className="d-flex align-items-center text-secondary" style={{ fontSize: '0.8rem' }}><img width="25px" src={bs} style={{ padding: '2px', marginRight: '1px' }} /> Blood sugar</p>
                              <h3 className="my-3">62.2 Kg</h3>
                              <p className="text-secondary m-0">last 63.5 kg</p>
                            </div>
                          </div>
                          <div className="card shadow-sm" style={{ flex: '48%' }}>
                            <div className="card-body">
                              <p className="d-flex align-items-center text-secondary" style={{ fontSize: '0.8rem' }}><img width="25px" src={bd} style={{ padding: '2px', marginRight: '1px' }} /> Blood 02</p>
                              <h3 className="my-3">62.2 Kg</h3>
                              <p className="text-secondary m-0">last 63.5 kg</p>
                            </div>
                          </div>
                          <div className="card shadow-sm" style={{ flex: '48%' }}>
                            <div className="card-body">
                              <p className="d-flex align-items-center text-secondary" style={{ fontSize: '0.8rem' }}><img width="25px" src={bp} style={{ padding: '2px', marginRight: '1px' }} /> Blood BP</p>
                              <h3 className="my-3">62.2 Kg</h3>
                              <p className="text-secondary m-0">last 63.5 kg</p>
                            </div>
                          </div>
                          <div className="card shadow-sm" style={{ flex: '48%' }}>
                            <div className="card-body">
                              <p className="d-flex align-items-center text-secondary" style={{ fontSize: '0.8rem' }}><img width="25px" src={temp} style={{ padding: '2px', marginRight: '1px' }} /> body Temp</p>
                              <h3 className="my-3">62.2 Kg</h3>
                              <p className="text-secondary m-0">last 63.5 kg</p>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <AllButton user={user} />
                <OnProcess user={user} score={score} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPatientOverview;
