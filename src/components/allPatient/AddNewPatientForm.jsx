import React, { forwardRef, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { addElimination, addLifeStyle, addMealPlan, getCity, getCountry, getState } from "../../services/DoctorService";
import { addPatient, getCarePLan, getElimination, getLifestyle, getMealPlan } from "../../services/PatientService";
import CarePlanModal from "./carePlanModal";
import LifestyleModal from "./lifestyleModal";
import NutritionModal from "./nutritionModal";
import ProgramModal from "./programModal";
import PhoneInput, { isValidPhoneNumber } from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { formatDate, showToastError, showToastSuccess, validateEmail, isEmpty } from "../../Utils/Helper";
import { toast } from "react-toastify";
import Select from 'react-select';
import { toastMsg } from "../../Utils/AllConstant";

const AddNewPatientForm = () => {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [fname, setfname] = useState("");
  const [sname, setsname] = useState("");
  const [dob, setdob] = useState(new Date());
  const [email, setemail] = useState("");
  const [profileCategory, setProfileCategory] = useState("");
  const [lifestyle, setLifestyle] = useState("");
  const [lifestyleList, setLifestyleList] = useState([]);
  const [eliminationPlan, setEliminationPlan] = useState([]);
  const [eliminationPlanList, setEliminationPlanList] = useState([]);
  const [carePlan, setCarePlan] = useState("");
  const [carePlanList, setCarePlanList] = useState([]);
  const [nutrition, setNutrition] = useState("");
  const [nutritionList, setNutritionList] = useState([]);
  const [gender, setgender] = useState("");
  const [country, setcountry] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [race, setRace] = useState("");
  const [co, setco] = useState("+");


  const [userID, setUserID] = useState('');
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    let addObject = {
      "first_name": fname,
      "last_name": sname,
      "dob": formatDate(dob),
      "email": email,
      "race": race,
      "profileCreatedFor": profileCategory,
      "country": country.split("-")[0],
      "state": state.split("-")[0],
      "city": city,
      "mobileNo": co + phone,
      "employmentStatus": status,
      "gender": gender,
    }
    try {
      // if (!fname || isEmpty(fname) || !sname || isEmpty(sname) || !email || !country || !race || !profileCategory || !phone || phone.length < 10 || !status || !gender) {
      if (!fname || isEmpty(fname) || !sname || isEmpty(sname) || !email || !country || !race || !profileCategory) {
        setError(true)
      } else {
        if (validateEmail(email)) {
          setError(false)
          setLoader(true)
          const response = await addPatient(addObject);
          if (response.status === 200) {
            setUserID(response?.data?.data?._id);
            setLoader(false)
            showToastSuccess(response?.data?.data?.message || toastMsg.patientAdded)
            setVisible(true);
            setError(false);
          } else {
            setLoader(false)
            showToastError(response?.data || response?.message || toastMsg.patientNotAdded)
          }
        }
      }

    } catch (error) {
      setLoader(false)
      showToastError(error?.data?.data || error?.data?.message || toastMsg.patientNotAdded)
    }
  }

  const getLifestyleList = async () => {
    try {
      const response = await getLifestyle();
      if (response.status === 200) {
        setLifestyleList(response?.data?.data);
      } else {
        showToastError(response?.data || response.message)
      }
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error?.data?.message)
    }
  }

  const getCarePLanList = async () => {
    try {
      const response = await getCarePLan();
      if (response.status === 200) {
        console.log(response?.data);
        setCarePlanList(response?.data?.data);
      } else {
        showToastError(response?.data || response.message)
      }
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error?.data?.message)
    }
  }

  const getEliminationList = async () => {
    try {
      const response = await getElimination(userID);
      if (response.status === 200) {
        console.log(response?.data);
        setEliminationPlanList(response?.data?.data);
      } else {
        showToastError(response?.data || response.message)
      }
    } catch (error) {
      showToastError(error?.data?.data || error.data?.message)
    }
  }

  const getMealPlanList = async () => {
    try {
      const response = await getMealPlan();
      if (response.status === 200) {
        console.log(response?.data);
        setNutritionList(response?.data?.data);
      } else {
        showToastError(response?.data || response.message)
      }
    } catch (error) {
      showToastError(error?.data?.data || error.data?.message)
    }
  }

  const assignLifeStyle = async () => {
    if (lifestyle === "") return;
    if (lifestyle === "Customised") {
      showToastSuccess(toastMsg.changeLifeStyleTemplate)
      return;
    }

    let addobject = {
      "templifestyleId": lifestyle,
      "userId": userID
    }
    try {
      const response = await addLifeStyle(addobject);
      if (response.status === 200) {
        showToastSuccess(toastMsg.changeLifeStyleTemplate)
      } else {
        showToastError(response?.data || response.message)
      }
    } catch (error) {
      showToastError(error?.data?.data || error.data?.message)
    }
  }

  const assignElimination = async (templateId) => {
    if (templateId === []) return;
    let addobject = {
      "eliminationProgramIds": templateId.map(dt => { return dt.value }),
      "approve_user_id": userID
    }
    try {
      const response = await addElimination(addobject);
      if (response.status === 200) {
        showToastSuccess(toastMsg.programAssigned);
      } else {
        showToastError(response?.data || response.message);
      }
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error.data?.message);
    }
  }

  const assignMealPlan = async (templateId) => {
    if (templateId === "") return;
    let addobject = {
      "userId": [userID]
    }
    try {
      const response = await addMealPlan(templateId, addobject);
      if (response.status === 200) {
        showToastSuccess(toastMsg.meealAssigned);
      } else {
        showToastError(response?.data || response.message);
      }
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error.data?.message || toastMsg.errorMssg);
    }
  }

  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([])
  const [states, setStates] = useState([])

  const getCountries = async () => {
    try {
      const response = await getCountry();

      if (response.length) {
        setCountries(response);
      } else {
        showToastError(toastMsg.errorMssg)
      }
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error?.data?.message || toastMsg.errorMssg)
    }
  }

  const getCities = async (cid, csid) => {
    try {
      const response = await getCity(cid, csid);
      if (response.length) {
        setCities(response);
      }
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error?.data?.message || toastMsg.errorMssg)
    }
  }

  const getStates = async (cid) => {
    try {
      const response = await getState(cid);
      if (response.length) {
        setStates(response);
      }
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error?.data?.message || toastMsg.errorMssg)
    }
  }

  useEffect(() => {
    getLifestyleList();
    getCarePLanList();
    getEliminationList();
    getMealPlanList();
    getCountries();
  }, [])

  const CustomDatePicker = forwardRef(({ value, onClick }, ref) => (
    <div className="description_inputf d-flex mb-0 align-items-center" onClick={onClick} ref={ref}>
      <img src={"images/calnder.png"} />
      <input value={value} placeholder={'mm-dd-yyyy'} className="ms-2 bg-transparent border-0" style={{
        color: "#9f9f9f",
        flex: 1
      }} disabled />
    </div>
  ));

  userID && console.log(userID);

  return (
    <>
      <form>
        {
          !visible &&
          <div className="row">
            <div className="col-md-6">
              <p className="whole_label mt-2">First name<span className="text-danger"> *</span></p>
              <input
                required
                type="text"
                className="description_inputf mb-0"
                value={fname}
                onChange={(e) => setfname(e.target.value)}
                placeholder="First Name"
              />
              {(error && !fname) && <label className="text-danger error mb-0 mt-1">This field should be filled.</label>}
              {(fname && isEmpty(fname)) && <label className="text-danger error mb-0 mt-1">This field should be filled.</label>}
            </div>

            <div className="col-md-6">
              <p className="whole_label mt-2">Last name<span className="text-danger"> *</span></p>
              <input
                required
                type="text"
                className="description_inputf mb-0"
                value={sname}
                onChange={(e) => setsname(e.target.value)}
                placeholder="Last Name"
              />
              {(error && !sname) && <label className="text-danger error mb-0 mt-1">This field should be filled.</label>}
              {(sname && isEmpty(sname)) && <label className="text-danger error mb-0 mt-1">This field should be filled.</label>}
            </div>

            <div className="col-md-12">
              <p className="whole_label mt-4">Mobile <span className="text-lowercase">Number</span></p>
              <PhoneInput
                country={"us"}
                enableSearch={true}
                value={phone}
                style={{backgroundColor:"#F8F8F8" , borderRadius:"5px"}}
                className="addpatient_input mb-0"
                onChange={(phone) => setPhone(phone)}
              />
              {/* {(error && !phone) && <label className="text-danger mt-1">This field should be filled.</label>} */}

              {/* {(phone && phone.length < 10) && <label className="text-danger mt-1">This field should be filled.</label>} */}

            </div>

            <div className="col-md-12">
              <p className="whole_label mt-4">E-mail <span className="text-lowercase">address</span><span className="text-danger"> *</span></p>
              <input
                required
                type="email"
                className="description_inputf mb-0"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              {(error && !email) && <label className="text-danger error mb-0 mt-1 ">This field should be filled.</label>}
              {(error && !validateEmail(email) && email) && <label className="text-danger  error mb-0 m-1 ">Email format is not valid.</label>}
            </div>

            <div className="col-md-6">
              <p className="whole_label mt-4">DOB</p>
              <ReactDatePicker
                dateFormat="MM-dd-yyyy"
                selected={dob}
                className="description_inputf mb-0"
                minDate={new Date("01-01-1720")}
                maxDate={new Date()}
                showMonthDropdown
                showYearDropdown
                yearDropdownItemNumber={300}
                scrollableYearDropdown
                onChange={(date) => setdob(date)}
                customInput={<CustomDatePicker />}
                placeholderText='mm-dd-yyyy'
              />
              {(error && !dob) && <label className="text-danger error mb-0 mt-1">This field should be filled.</label>}
            </div>

            <div className="col-md-6">
              <p className="whole_label mt-4">Gender</p>
              <select name="" className="description_inputf mb-0"
                value={gender}
                required
                onChange={(e) => setgender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="transgender">Transgender</option>
                <option value="other">Other</option>
              </select>
              {/* {(error && !gender) && <label className="text-danger">You need to select an option.</label>} */}
            </div>

            <div className="col-md-12">
              <p className="whole_label mt-4">Profile <span className="text-lowercase">created for</span><span className="text-danger"> *</span></p>
              <select name="" className="description_inputf mb-0"
                value={profileCategory}
                required
                onChange={(e) => setProfileCategory(e.target.value)}
              >
                <option value="">Select an option</option>
                <option value="Myself">Myself</option>
                <option value="My Family Member">My Family Member</option>
                <option value="A Patient">A Patient</option>
              </select>
              {(error && !profileCategory) && <label className="text-danger error mb-0 mt-1">This field should be filled.</label>}
            </div>

            <div className="col-md-12">
              <p className="whole_label mt-4">Employment <span className="text-lowercase">Status</span></p>
              <select name="" className="description_inputf mb-0"
                value={status}
                required
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select an option</option>
                <option value="Employed">Employed</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Unemployed">Unemployed</option>
              </select>
              {/* {(error && !status) && <label className="text-danger mt-1">This field should be filled.</label>} */}
            </div>

            <div className="col-md-6">
              <p className="whole_label mt-4">Country<span className="text-danger"> *</span></p>

              <select name="" className="description_inputf mb-0"
                value={country}
                required
                onChange={(e) => {
                  setcountry(e.target.value)
                  getStates(e.target.value.split("-")[1])
                  setcity("")
                  setCities([])
                  setStates([])
                }}
              >
                <option value="">Select Country</option>
                {countries?.length && countries.map(dt => {
                  return <option key={dt.id} value={`${dt.name}-${dt.iso2}`}>
                    {dt.name}
                  </option>
                }
                )}
              </select>
              {(error && !country) && <label className="text-danger error mb-0">This field should be filled.</label>}
            </div>

            <div className="col-md-6">
              <p className="whole_label mt-4">Race<span className="text-danger"> *</span></p>
              <select name="" className="description_inputf mb-0"
                value={race}
                required
                onChange={(e) => setRace(e.target.value)}
              >
                <option value="">Select an option</option>
                <option value="White">White</option>
                <option value="Black or African American">Black or African American</option>
                <option value="American Indian or Alaska Native">American Indian or Alaska Native</option>
                <option value="Asian">Asian</option>
                <option value="Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</option>
              </select>
              {(error && !race) && <label className="text-danger error mb-0 mt-1">You need to select an option.</label>}
            </div>

            <div className="col-md-6">
              <p className="whole_label mt-4">State</p>
              <select name="" className="description_inputf mb-0"
                value={state}
                onChange={(e) => {
                  setstate(e.target.value)
                  getCities(country.split("-")[1], e.target.value.split("-")[1])
                  setCities([])
                }}
              >
                <option value="">Select State</option>
                {states?.length && states.sort(function (a, b) {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                }
                return 0;
              }).map(dt => {
              return <option key={dt.id} value={`${dt.name}-${dt.iso2}`}>
                {dt.name}
              </option>
            }
            )}
              </select>
            </div>

            <div className="col-md-6">
              <p className="whole_label mt-4">City</p>
              <select name="" className="description_inputf mb-0"
                value={city}
                onChange={(e) => setcity(e.target.value)}
              >
                <option value="">Select City</option>
                {cities.length && cities.map(dt =>
                  <option key={dt.id} value={dt.name}>{dt.name}</option>
                )}
              </select>
            </div>

            <hr className="mt-5" />
            <div className="col-md-12 d-flex justify-content-between px-0">
              <button type="button" disabled={loader} style={{ cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9' }} className="description_btnsave btnfix_wid81 mx-0" onClick={() => navigate(-1)}>Cancel</button>
              <button type="button" disabled={loader} className="description_btnsave btnfix_wid81 mx-0 d-flex justify-content-center align-items-center"
                onClick={() => handleSubmit()}>Send link {loader && <div className="ms-2 text-center">
                  <div style={{ width: '2rem', height: '2rem', marginTop: "6px" }} class="spinner-border" role="status" />
                </div>}</button>
            </div>
          </div>}

        {
          visible &&
          <div className="card">
            <div className="row card-body">
              <div className="col-md-12">
                <p className="whole_label">Suggested Program</p>
                <Select
                  value={eliminationPlan}
                  isMulti
                  closeMenuOnSelect={false}
                  placeholder={"Select"}
                  onChange={(opt, meta) => {
                    console.log(opt);
                    setEliminationPlan(opt.map(dt => { return { 'value': dt.value, 'label': dt.label } }));
                  }}
                  options={eliminationPlanList.map(dt => { return { 'value': dt._id, 'label': dt.title } })}
                />
              </div>


              <div className="col-md-6">
                <p className="whole_label">Lifestyle</p>
                <select name="" className="description_inputf"
                  value={lifestyle}
                  onChange={(e) => setLifestyle(e.target.value)}
                >
                  <option value="">Select an option</option>
                  {lifestyleList.length && lifestyleList.map(dt =>
                    <option key={dt._id} value={dt._id}>{dt.templateName}</option>
                  )}
                </select>
              </div>

              <div className="col-md-6">
                <div className="d-flex justify-content-center align-items-center cursor-pointer description_btnsave addpatient_margin8"
                  data-bs-toggle="modal"
                  data-bs-target="#lifestyleModal"
                  onClick={() => {
                    !lifestyleList.filter((dt) => dt.templateName === "Customised").length > 0 && setLifestyleList([{ _id: "Customised", templateName: "Customised" }, ...lifestyleList])
                    setLifestyle("Customised")
                  }
                  }
                >Add new lifestyle</div>
              </div>
              <LifestyleModal userid={userID} />


              <div className="col-md-12">
                <p className="whole_label">Nutrition</p>
                <select name="" className="description_inputf"
                  value={nutrition}
                  onChange={(e) => setNutrition(e.target.value)}
                >
                  <option value="">Select an option</option>
                  {nutritionList.length && nutritionList.map(dt =>
                    <option key={dt._id} value={dt._id}>{dt.mealPlanName}</option>
                  )}
                </select>
              </div>


              <div className="col-md-12">
                <div className="d-flex justify-content-center align-items-center cursor-pointer description_btnsave addpatient_margin8"
                  onClick={() => {
                    assignLifeStyle();
                    assignElimination(eliminationPlan);
                    assignMealPlan(nutrition);
                    navigate("/allpatientlist");
                  }}>save</div>
              </div>
            </div>
          </div>}
      </form>
    </>
  );
};

export default AddNewPatientForm;
