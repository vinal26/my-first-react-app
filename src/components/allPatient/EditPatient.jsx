import React, { forwardRef, useEffect, useState } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "../appointment/style.css";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { isEmpty, showToastError, showToastSuccess, validateEmail, getFileName } from "../../Utils/Helper";
import { getCity, getCountry, getState } from "../../services/DoctorService";
import PhoneInput from "react-phone-input-2";
import ReactDatePicker from "react-datepicker";
import { toastMsg } from "../../Utils/AllConstant";
import { updatePatientProfileService } from "../../services/PatientOverviewServices";


const requiredField = {
  first_name: 'first_name',
  last_name: 'last_name',
  dob: 'dob',
  email: 'email',
  race: 'race',
  profileCreatedFor: 'profileCreatedFor',
  // profilePicture: 'profilePicture',
  country: 'country',
  // mobileNo: 'mobileNo',
  // employmentStatus: 'employmentStatus',
  // gender: 'gender',
}

const userInfoField = {
  first_name: 'first_name',
  last_name: 'last_name',
  dob: 'dob',
  email: 'email',
  race: 'race',
  profileCreatedFor: 'profileCreatedFor',
  // profilePicture: 'profilePicture',
  country: 'country',
  state: 'state',
  mobileNo: 'mobileNo',
  employmentStatus: 'employmentStatus',
  gender: 'gender',
  city: 'city',

}

const EditPatient = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location?.state?.user;

  const [userInfo, setUserInfo] = useState({ ...user });
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);

  const [error, setErrors] = useState({});
  const [errorMsg, setErrorsMsg] = useState({});
  const [isLoader, setLoader] = useState(false);

  useEffect(() => {
    getCountryList();
  }, []);

  const getCountryList = async () => {
    try {
      const response = await getCountry();
      if (response.length) {
        setCountry(response);
        const result = response?.find((list) => list.name === userInfo['country']);
        result && setUserInfo((userInfo) => ({ ...userInfo, country: `${result.name}-${result.iso2}` }))
        result && getStates(result.iso2);
      } else {
        showToastError(toastMsg.errorMssg)
      }
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error?.data?.message || toastMsg.errorMssg)
    }
  }


  const getStates = async (cid) => {
    try {
      const response = await getState(cid);
      if (response.length) {
        setState(response);
        const result = response?.find((list) => list.name === userInfo['state']);
        result && setUserInfo((userInfo) => ({ ...userInfo, state: `${result.name}-${result.iso2}` }))
        result && getCities(cid, result.iso2);
      }
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error?.data?.message || toastMsg.errorMssg)
    }
  }

  const getCities = async (cid, csid) => {
    try {
      const response = await getCity(cid, csid);
      if (response.length) {
        setCity(response);
      }
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error?.data?.message || toastMsg.errorMssg)
    }
  }

  const onChangeUserInfo = (key, value) => {
    setUserInfo({ ...userInfo, [key]: value });
    error[key] && setErrors({ ...error, [key]: false });
  }

  const checkValidation = () => {
    let isValid = true;
    let errors = {}
    Object.keys(requiredField).map((item) => {
      if (!userInfo[item] || isEmpty(userInfo[item])) {
        isValid = false;
        errors = { ...errors, [item]: true }
      }
    })
    if (!validateEmail(userInfo.email) && userInfo.email) {
      isValid = false;
    }
    if (!isValid) {
      console.log(errors)
      setErrors(errors);
    }
    return isValid;
  }

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (checkValidation()) {
      updatePatientProfile();
    }
  }

  const updatePatientProfile = async () => {
    try {
      setLoader(true);
      const params = {
        ...userInfo,
        // profilePicture: fileName,
        country: userInfo.country.split('-')[0],
        state: userInfo.state.split('-')[0],
      }
      const response = await updatePatientProfileService(params);
      if (response) {
        setLoader(false);
        showToastSuccess('Patient profile updated successfully');
        navigate(-1)
      }
    } catch (errors) {
      console.log(errors);
      setLoader(false);
      errors?.data?.data && setErrorsMsg({ ...errorMsg, ...errors?.data?.data })
      errors?.data?.data && setErrors({ ...error, ...errors?.data?.data })
    }
  }

  const CustomDatePicker = forwardRef(({ value, onClick }, ref) => (
    <div className="description_inputf d-flex mb-0 align-items-center" onClick={onClick} ref={ref}>
      <img src={"images/calnder.png"} />
      <input value={value} placeholder={'mm-dd-yyyy'} className="ms-2 border-0 bg-transparent" style={{
        color: "#9f9f9f",
        flex: 1
      }} disabled />
    </div>
  ));

  const renderField = () => {
    return (
      <>


        <form onSubmit={handleSubmit}>
          <div>
            <div className="row">
              {/* <div className="col-md-12 mt-4 mb-4">
        <img
          src={
            userInfo.profilePicture
          }
          onError={(e) => {
            e.target.src = "images/avatar.png"; //replacement image imported above
          }}
          alt=""
          className="profile_iconmain99"
        />

        <input
          type="file"
          className="form-control profile_circleinput"
          accept="image/*"
          onChange={(e) => {
            onChangeUserInfo(userInfoField.profilePicture, e.target.files[0]);
          }}
        />
        <div className="profile_circleimask d-flex justify-content-center align-items-center">
          <BsFillPlusCircleFill className="profile_circleicon" />
        </div>
      </div> */}
              <div className="col-md-6">
                <p className="whole_label mt-2">First name<span className="text-danger"> *</span></p>
                <input
                  required
                  type="text"
                  key={'tetx'}
                  className="description_inputf mb-0"
                  placeholder="First Name"
                  value={userInfo.first_name}
                  onChange={(e) => onChangeUserInfo(userInfoField.first_name, e.target.value)}
                />
                {(error && error[userInfoField.first_name]) && <label className="text-danger error mb-0 mt-1">This field should be filled.</label>}
              </div>

              <div className="col-md-6">
                <p className="whole_label mt-2">Last name<span className="text-danger"> *</span></p>
                <input
                  required
                  type="text"
                  className="description_inputf mb-0"
                  placeholder="Last Name"
                  value={userInfo.last_name}
                  onChange={(e) => onChangeUserInfo(userInfoField.last_name, e.target.value)}
                />
                {(error && error[userInfoField.last_name]) && <label className="text-danger error mb-0 mt-1">This field should be filled.</label>}
              </div>

              <div className="col-md-12">
                <p className="whole_label mt-4">Mobile <span className="text-lowercase">Number</span></p>
                <PhoneInput
                  country={"us"}
                  enableSearch={true}
                  className="addpatient_input mb-0"
                  style={{backgroundColor:"#F8F8F8" , borderRadius:"5px"}}
                  value={userInfo.mobileNo}
                  onChange={(phone) => onChangeUserInfo(userInfoField.mobileNo, phone)}
                />
                {/* {(error && error[userInfoField.mobileNo]) && <label className="text-danger mt-1">This field should be filled.</label>} */}
              </div>

              <div className="col-md-12">
                <p className="whole_label mt-4">E-mail <span className="text-lowercase">address</span> <span className="text-danger"> *</span></p>
                <input
                  required
                  type="email"
                  className="description_inputf mb-0"
                  placeholder="Enter Email"
                  // disabled={user.status?.toLowerCase() === 'active' || user.onBoarding}
                  value={userInfo.email}
                  onChange={(e) => onChangeUserInfo(userInfoField.email, e.target.value)}
                />
                {(error && error[userInfoField.email] && errorMsg.email) && <label className="text-danger error mb-0 mt-1">{errorMsg.email || `This field should be filled.`}</label>}
                {(error && !validateEmail(userInfo.email) && userInfo.email) && <label className="text-danger error mb-0 m-1">Email format is not valid.</label>}
              </div>

              <div className="col-md-6">
                <p className="whole_label mt-4">DOB</p>
                <ReactDatePicker
                  dateFormat="MM-dd-yyyy"
                  selected={new Date(userInfo.dob ? userInfo.dob : null)}
                  className="description_inputf mb-0"
                  minDate={new Date("01-01-1720")}
                  maxDate={new Date()}
                  showMonthDropdown
                  showYearDropdown
                  yearDropdownItemNumber={300}
                  scrollableYearDropdown
                  onChange={(date) => onChangeUserInfo(userInfoField.dob, date)}
                  customInput={<CustomDatePicker />}
                  placeholderText='mm-dd-yyyy'
                />
                {(error && error[userInfoField.dob]) && <label className="text-danger error mb-0 mt-1">This field should be filled.</label>}
              </div>

              <div className="col-md-6">
                <p className="whole_label mt-4">Gender</p>
                <select name="" className="description_inputf mb-0"
                  value={userInfo.gender}
                  required
                  onChange={(e) => onChangeUserInfo(userInfoField.gender, e.target.value)}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="transgender">Transgender</option>
                  <option value="other">Other</option>
                </select>
                {/* {(error && error[userInfoField.gender]) && <label className="text-danger">You need to select an option.</label>} */}
              </div>
              <div className="col-md-12">
                <p className="whole_label mt-4">Profile <span className="text-lowercase">created for</span> <span className="text-danger"> *</span></p>
                <select name="" className="description_inputf mb-0"
                  value={userInfo.profileCreatedFor}
                  required
                  onChange={(e) => onChangeUserInfo(userInfoField.profileCreatedFor, e.target.value)}>
                  <option value="">Select an option</option>
                  <option value="Myself">Myself</option>
                  <option value="My Family Member">My Family Member</option>
                  <option value="A Patient">A Patient</option>
                </select>
                {(error && error[userInfoField.profileCreatedFor]) && <label className="text-danger error mb-0 mt-1">This field should be filled.</label>}
              </div>

              <div className="col-md-12">
                <p className="whole_label mt-4">Employment <span className="text-lowercase">Status</span></p>
                <select name="" className="description_inputf mb-0"
                  value={userInfo.employmentStatus}
                  required
                  onChange={(e) => onChangeUserInfo(userInfoField.employmentStatus, e.target.value)}>
                  <option value="">Select an option</option>
                  <option value="Employed">Employed</option>
                  <option value="Self-employed">Self-employed</option>
                  <option value="Unemployed">Unemployed</option>
                </select>
                {/* {(error && error[userInfoField.employmentStatus]) && <label className="text-danger mt-1">This field should be filled.</label>} */}
              </div>

              <div className="col-md-6">
                <p className="whole_label mt-4">Country <span className="text-danger"> *</span></p>
                <select name="" className="description_inputf mb-0"
                  value={`${userInfo.country}`}
                  required
                  onChange={(e) => {
                    getStates(e.target.value.split("-")[1])
                    onChangeUserInfo(userInfoField.country, e.target.value)
                    setUserInfo({ ...userInfo, country: e.target.value, city: '', state: '' });
                    setCity([])
                    setState([])
                  }}>
                  <option value="">Select Country</option>
                  {country?.length && country.map(dt => {
                    return <option key={dt.id} value={`${dt.name}-${dt.iso2}`}>
                      {dt.name}
                    </option>
                  })}
                </select>
                {(error && error[userInfoField.country]) && <label className="text-danger error mb-0 mt-1">This field should be filled.</label>}
              </div>

              <div className="col-md-6">
                <p className="whole_label mt-4">Race<span className="text-danger"> *</span></p>
                <select name="" className="description_inputf mb-0"
                  value={userInfo.race}
                  required
                  onChange={(e) => onChangeUserInfo(userInfoField.race, e.target.value)}>
                  <option value="">Select an option</option>
                  <option value="White">White</option>
                  <option value="Black or African American">Black or African American</option>
                  <option value="American Indian or Alaska Native">American Indian or Alaska Native</option>
                  <option value="Asian">Asian</option>
                  <option value="Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</option>
                </select>
                {(error && error[userInfoField.race]) && <label className="text-danger error mb-0 mt-1">You need to select an option.</label>}
              </div>

              <div className="col-md-6">
                <p className="whole_label mt-4">State</p>
                <select name="" className="description_inputf mb-0"
                  value={userInfo.state}
                  onChange={(e) => {
                    getCities(userInfo.country.split("-")[1], e.target.value.split("-")[1])
                    onChangeUserInfo(userInfoField.state, e.target.value)
                    setUserInfo({ ...userInfo, state: e.target.value, city: '' });
                    setCity([]);
                  }}>
                  <option value="">Select State</option>
                 {state?.length && state.sort(function (a, b) {
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
                  value={userInfo.city}
                  onChange={(e) => onChangeUserInfo(userInfoField.city, e.target.value)}>
                  <option value="">Select City</option>
                  {city.length && city.map(dt =>
                    <option key={dt.id} value={dt.name}>{dt.name}</option>
                  )}
                </select>
              </div>
              <div className="col-md-12">
                <button
                  type="button"
                  disabled={isLoader}
                  className="description_btnsave btnfix_wid81 mt-4 ms-0"
                  onClick={() => handleSubmit()}>
                  {isLoader ?
                    <div className=" text-center text-capitalize" style={{ marginLeft: "10px" }}>
                      <div style={{ width: '2rem', height: '2rem', marginTop: "6px" }} class="spinner-border" role="status" />
                    </div> : 'Update'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid mb-5">

        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 py-4 px-5">

            <div className="row">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item  cursor-pointer" onClick={() => navigate(-1)}>My Client</li>
                  <li
                    class="breadcrumb-item active fw-bold"
                    aria-current="page"
                  >
                    {user.full_name}
                  </li>
                </ol>
              </nav>
              <div className="d-flex mb-3">
                <div className="w-100">
                  <h4>{user.full_name}</h4>
                  <p>Edit client information and update profile</p>
                </div>

              </div>
            </div>
            {renderField()}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPatient;
