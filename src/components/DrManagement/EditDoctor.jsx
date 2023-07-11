import React, { forwardRef, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addQualification, getCategories, getCity, getCountry, getQualifications, getServices, getState, updateDoctorProfileService } from '../../services/DoctorService';
import Creatable from 'react-select/creatable';
import Select, { components } from 'react-select';
import { doctorContext } from '../../Context/DoctorContext';
import "react-datepicker/dist/react-datepicker.css";
import { isEmpty, isValidHttpUrl, qualification_list, showToastError, showToastSuccess, validateEmail } from '../../Utils/Helper';
import { toastMsg } from '../../Utils/AllConstant';
import { changeDateFormatYYYY } from '../../Utils/Helper';
import DateInput from '../../commonComponent/CutomDatePicker';
import Navbar from '../header/Navbar';
import Sidebar from '../sidebar/Sidebar';
import Button from "../../commonComponent/Button";
import { HiOutlineArrowSmLeft } from 'react-icons/hi';
import { getUploadFileCategory, uploadFile } from '../../services/FileUploadService';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import ApiConfig from '../../config/ApiConfig';

const requiredField = {
  first_name: 'first_name',
  last_name: 'last_name',
  dob: 'dob',
  email: 'email',
  yearsOfExperience: 'yearsOfExperience',
  qualifications: 'qualifications',
  address: 'address',
  country: 'country',
  services: 'services',
  docCategory: 'docCategory',
}

const doctorField = {
  first_name: 'first_name',
  last_name: 'last_name',
  dob: 'dob',
  email: 'email',
  yearsOfExperience: 'yearsOfExperience',
  qualifications: 'qualifications',
  docCategory: 'docCategory',
  address: 'address',
  country: 'country',
  city: 'city',
  state: 'state',
  gender: 'gender',
  zipcode: 'zipcode',
  lattitude: 'lattitude',
  longitude: 'longitude',
  services: 'services',
  publications: 'publications',
}

const EditDoctor = () => {
  const { dispatch } = useContext(doctorContext);
  let navigate = useNavigate();

  const location = useLocation();
  const user = location?.state?.user;
  console.log(user, "- USER");
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture);
  const [flname, setflname] = useState("");
  const [image, setImage] = useState("");

  const [userInfo, setUserInfo] = useState({ ...user });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [qualificationList, setQualificationList] = useState(qualification_list);
  const [serviceList, setServiceList] = useState([]);

  const [error, setErrors] = useState({});
  const [isLoader, setLoader] = useState(false);

  useEffect(() => {
    // const active = document.querySelector(".memlist_scroll .active");
    // if (active) active.classList.remove("active");
    // dispatch({ type: "Clear Profile" });

    getCategoryList();
    // getQualificationList();
    getServiceList();
    getCountries();
  }, []);

  var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const formateQualification = () => {
    let qualificationResult = userInfo?.qualifications?.map(dt => ({
      "value": dt.qualificationId,
      "label": dt.name,
    }))
    return qualificationResult || [];
  }

  const formateServiceList = (list) => {
    let result = list?.map(dt => ({
      "value": dt.serviceId,
      "label": dt.name,
    }))
    return result || [];
  }


  const formatePublication = (list) => {
    let result = list?.map(dt => ({
      "value": dt,
      "label": dt,
    }))
    return result || [];
  }


  const getCategoryList = async () => {
    try {
      const response = await getCategories();
      if (response.status === 200) {
        setCategories(response?.data?.data);
      } else {
        showToastError(response?.data || response.message);
      }
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error.data?.message);
    }
  }

  const getQualificationList = async () => {
    try {
      const response = await getQualifications();
      if (response.status === 200) {
        let res = (response?.data?.data).map(dt => ({
          "value": dt._id,
          "label": dt.name,
        }))
        setQualificationList(res);
      } else {
        showToastError(response?.data || response.message);
      }
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error.data?.message);
    }
  }

  const getServiceList = async () => {
    try {
      const response = await getServices();
      if (response.status === 200) {
        let res = (response?.data?.data).map(dt => ({
          "value": dt._id,
          "label": dt.name,
        }))
        setServiceList(res);
      } else {
        showToastError(response?.data || response.message);
      }
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error.data?.message);
    }
  }

  const addNewQualification = async (payload) => {
    try {
      const response = await addQualification(payload);
      if (response.status === 200) {
        showToastSuccess(response?.data?.message);
        getQualificationList();
      } else {
        showToastError(response?.data || response.message);
      }
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error.data?.message);
    }
  }


  const getCountries = async () => {
    try {
      const response = await getCountry();
      if (response.length) {
        setCountries(response);
        const result = response?.find((list) => list.name === userInfo['country']);
        result && setUserInfo((userInfo) => ({ ...userInfo, country: `${result.name}-${result.iso2}` }))
        result && getStates(result.iso2);
      } else {
        showToastError(toastMsg.errorMssg)
      }
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error.data?.message);
    }
  }

  const getCities = async (cid, csid) => {
    try {
      const response = await getCity(cid, csid);
      if (response.length) {
        setCities(response);
      }
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error.data?.message);
    }
  }

  const getStates = async (cid) => {
    try {
      const response = await getState(cid);
      if (response.length) {
        setStates(response);
        const result = response?.find((list) => list.name === userInfo['state']);
        result && setUserInfo((userInfo) => ({ ...userInfo, state: `${result.name}-${result.iso2}` }))
        result && getCities(cid, result.iso2);
      }
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error.data?.message);
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
      if (userInfo[item] && Array.isArray(userInfo[item]) && userInfo[item]?.length < 1) {
        isValid = false;
        errors = { ...errors, [item]: true }
      }
    })
    if (!validateEmail(userInfo.email) && userInfo.email) {
      isValid = false;
    }
    if (!isValid) {
      setErrors(errors);
    }
    return isValid;
  }

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (checkValidation()) {
      updatePatientProfile()
    }
  }

  const updatePatientProfile = async () => {
    try {
      setLoader(true);
      const params = {
        ...userInfo,
        country: userInfo.country.split('-')[0],
        state: userInfo.state.split('-')[0],
      }

      // const fileName = profilePicture.split("/");
      // const imageName = fileName[fileName.length - 1];
      params.profilePicture = flname ? flname : profilePicture;

      const response = await updateDoctorProfileService(params);
      console.log(response, "response doctor")
      if (response.status === 200) {
        setLoader(false);
        showToastSuccess('Doctor profile updated successfully');
        navigate(-1)
      }
      else if (response.status === 404) {

        setLoader(false);
        showToastError("Email already taken.")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const uploadPicture = async (e) => {
    setImage(e.target.files[0]);
    // const filename = getFileName(e.target.files[0]);
    const filename = user._id; // Make constant for custom profile url
    try {
      await uploadFile(
        e.target.files[0],
        getUploadFileCategory.uploadProfile,
        filename,
        "",
        user._id
      );
      setflname(filename);
    } catch (error) {
      console.log(error);
    }
  };

  const exceptThisSymbols = ["e", "E", "+", "-", "."];


  const getDate = (date) => {
    try {
      if (date && new Date(date) != 'Invalid Date') {
        return new Date(date)
      }
      // return new Date()
    } catch (error) { }
  }


  const NoOptionsMessage = props => {
    return (
      <components.NoOptionsMessage {...props}>
        <span>Type something and press create</span>
      </components.NoOptionsMessage>
    );
  };

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
        <div className="row mt-4">
            <div className="col-md-12 mt-4 mb-5">
              <img
                src={
                  (image && URL.createObjectURL(image)) ||
                  `${ApiConfig.ImageUrl}doctor/${user._id}/${profilePicture}`
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
                  uploadPicture(e);
                }}
              />
              <div className="profile_circleimask d-flex justify-content-center align-items-center">
                <BsFillPlusCircleFill className="profile_circleicon" />
              </div>
            </div>

          {/* ******************************************** First name ******************************************** */}

          <div className="col-md-6" style={{ marginBottom: "20px" }}>
            <p className="whole_label">First name<span className="text-danger"> *</span></p>
            <input
              required
              pattern="^\S.*$"
              type="text"
              className="description_inputf mb-1"
              value={userInfo.first_name}
              onChange={(e) => onChangeUserInfo(doctorField.first_name, e.target.value)}
              placeholder="First Name"
            />
            {(error && error[doctorField.first_name]) && <label className="text-danger error mb-0">First name should not be empty.</label>}
          </div>

          {/* ******************************************** Last name ******************************************** */}

          <div className="col-md-6" style={{ marginBottom: "20px" }}>
            <p className="whole_label">Last name<span className="text-danger"> *</span></p>
            <input
              required
              pattern="^\S.*$"
              type="text"
              className="description_inputf mb-1"
              value={userInfo.last_name}
              onChange={(e) => onChangeUserInfo(doctorField.last_name, e.target.value)}
              placeholder="Last Name"
            />
            {(error && error[doctorField.last_name]) && <label className="text-danger error mb-0">Last name should not be empty.</label>}
          </div>
        </div>

        {/* ******************************************** DOB ******************************************** */}

        <div className="col-md-12" style={{ marginBottom: "20px" }}>
          <p className="whole_label">Date <span className='small_letter2'>of</span> birth<span className="text-danger"> *</span></p>
          <DateInput
            value={getDate(userInfo.dob) || ''}
            onChangeDate={(date) => {
              onChangeUserInfo(doctorField.dob, changeDateFormatYYYY(date))
            }}
            maxDate={new Date()}
            inputClassName={"description_inputf d-flex mb-1 align-items-center"} />
          {(error && error[doctorField.dob]) && <label className="text-danger error mb-0">Date of Birth should not be empty.</label>}
        </div>

        {/* ******************************************** Email ******************************************** */}

        <div className="col-md-12" style={{ marginBottom: "20px" }}>
          <p className="whole_label">Email<span className="text-danger"> *</span></p>
          <input
            required
            // disabled={true}
            className="description_inputf mb-1"
            value={userInfo.email}
            onChange={(e) => onChangeUserInfo(doctorField.email, e.target.value)}
            placeholder="Enter Email"
          />
          {(error && error[doctorField.email]) && <label className="text-danger error mb-0">Email should not be empty.</label>}
          {(error && !validateEmail(userInfo.email) && userInfo.email) && <label className="text-danger error mb-0">Email format is not valid.</label>}
        </div>


        {/* ******************************************** Experience ******************************************** */}

        <div className="col-md-12" style={{ marginBottom: "20px" }}>
          <p className="whole_label">Years <span className='small_letter2'>of</span> experience<span className="text-danger"> *</span></p>
          <input
            type="number"
            min="0"
            max="99"
            className="description_inputf mb-1"
            value={userInfo.yearsOfExperience}
            onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()}
            onChange={(e) => onChangeUserInfo(doctorField.yearsOfExperience, e.target.value.slice(0, 2))}
          />
          {(error && error[doctorField.yearsOfExperience]) && <label className="text-danger error mb-0">Experience should not be empty.</label>}
        </div>


        {/* ******************************************** Qualification ******************************************** */}

        <div className="col-md-12">
          <p className="whole_label">Qualification<span className="text-danger"> *</span></p>
          <Creatable
            className='mb-0'
            // formatCreateLabel={(input) => {
            //   if (!isNaN(input) || format.test(input))
            //     return "Numbers and special characters not allowed"
            //   return `Add "${input}" to the list`
            // }}
            // onCreateOption={(input) => {
            //   console.log(`Added ${input}`)
            //   if (isNaN(input) && !format.test(input))
            //     addNewQualification({ "name": input });
            // }}
            isMulti
            value={formateQualification(userInfo.qualifications)}
            closeMenuOnSelect={false}
            placeholder={"Select or Add"}
            onChange={(opt, meta) => {
              if (meta.option) {
                const result = { qualificationId: meta.option.value, name: meta.option.label };
                onChangeUserInfo(doctorField.qualifications, [...userInfo.qualifications, result]);
              } else if (meta.removedValue) {
                const result = userInfo.qualifications.filter(e => e.qualificationId !== meta.removedValue.value)
                onChangeUserInfo(doctorField.qualifications, result);
              }
            }}
            options={qualificationList} />
          {(error && error[doctorField.qualifications]) && <label className="text-danger error mb-0" style={{position:"relative" , top:-30}}>Qualification should not be empty.</label>}
        </div>


        {/* ******************************************** Service ******************************************** */}

        <div className="col-md-12" style={{ marginTop: -10 }}>
          <p className="whole_label">Service<span className="text-danger"> *</span></p>
          <Select
            isMulti
            closeMenuOnSelect={false}
            placeholder={"Select"}
            defaultValue={formateServiceList(userInfo.services)}
            onChange={(opt, meta) => {
              if (meta.option) {
                const result = { serviceId: meta.option.value, name: meta.option.label };
                onChangeUserInfo(doctorField.services, [...userInfo.services, result]);
              } else if (meta.removedValue) {
                const result = userInfo.services.filter(e => e.serviceId !== meta.removedValue.value)
                onChangeUserInfo(doctorField.services, result);
              }
            }}
            options={serviceList}
          />
          {(error && error[doctorField.services]) && <label className="text-danger error mb-0" style={{position:"relative" , top:-30}}>Service should not be empty.</label>}
        </div>


        {/* ******************************************** Gender ******************************************** */}

        <div className="col-md-12" style={{ marginBottom:20 , marginTop: -10 }}>
          <p className="whole_label">Gender<span className="text-danger"> *</span></p>
          <select name="" className="description_inputf mb-1"
            value={userInfo.gender}
            onChange={(e) => onChangeUserInfo(doctorField.gender, e.target.value)}>
            <option disabled value="category">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="transgender">Transgender</option>
            <option value="other">Other</option>
          </select>
          {(error && error[doctorField.gender]) && <label className="text-danger error mb-0">Gender should not be empty.</label>}
        </div>


        {/* ******************************************** Category ******************************************** */}

        <div className="col-md-12" style={{ marginBottom: "20px" }}>
          <p className="whole_label">Category<span className="text-danger"> *</span></p>
          <select name="" className="description_inputf mb-1"
            value={userInfo.docCategory}
            onChange={(e) => onChangeUserInfo(doctorField.docCategory, e.target.value)}>
            <option disabled value="category">Select Category</option>
            {categories.length && categories.map(dt =>
              <option key={dt._id} value={dt.name}>{dt.name}</option>
            )}
          </select>
          {(error && error[doctorField.docCategory]) && <label className="text-danger error mb-0">Category should not be empty.</label>}
        </div>


        {/* ******************************************** Websites (Publication) ******************************************** */}

        <div className="col-md-12">
          <p className="whole_label">Websites</p>
          <Creatable
            formatCreateLabel={(input) => {
              if (!isValidHttpUrl(input))
                return "Please enter a valid url";
              return `Add "${input}"`;
            }}
            onCreateOption={(input) => {
              if (!isValidHttpUrl(input)) return;
              onChangeUserInfo(doctorField.publications, [...userInfo.publications, input]);
            }}
            placeholder="Enter an URL"
            isMulti
            closeMenuOnSelect={false}
            value={formatePublication(userInfo.publications)}
            components={{
              DropdownIndicator: null,
              NoOptionsMessage,
            }}
            onChange={(opt, meta) => {
              if (meta.option) {
                const result = meta.option.value;
                onChangeUserInfo(doctorField.publications, [...userInfo.publications, result]);
              } else if (meta.removedValue) {
                const result = userInfo.publications.filter(e => e !== meta.removedValue.value)
                onChangeUserInfo(doctorField.publications, result);
              }
            }}
          />
        </div>


        {/* ******************************************** Address ******************************************** */}

        <div className="col-md-12" style={{ marginBottom: 20 ,marginTop: -10 }}>
          <p className="whole_label">Address<span className="text-danger"> *</span></p>
          <input
            required
            pattern="^\S.*$"
            title="Check for leading whitespaces"
            type="text"
            className="description_inputf mb-1"
            value={userInfo.address}
            onChange={(e) => onChangeUserInfo(doctorField.address, e.target.value)}
            placeholder="Address"
          />
          {(error && error[doctorField.address]) && <label className="text-danger error mb-0">Address should not be empty.</label>}
        </div>


        {/* ******************************************** Country ******************************************** */}
        <div className="col-md-12" style={{ marginBottom: "20px" }}>
          <p className="whole_label">Country<span className="text-danger"> *</span></p>
          <select name="" className="description_inputf mb-0"
            value={userInfo.country}
            required
            onChange={(e) => {
              getStates(e.target.value.split("-")[1])
              setUserInfo({ ...userInfo, country: e.target.value, city: '', state: '' });
              setCities([])
              setStates([])
            }} >
            <option value="">Select Country</option>
            {countries?.length && countries.map(dt => {
              return <option key={dt.id} value={`${dt.name}-${dt.iso2}`}>
                {dt.name}
              </option>
            })}
          </select>
          {(error && error[doctorField.country]) && <label className="text-danger error mb-0">Country should not be empty.</label>}
        </div>


        {/* ******************************************** State ******************************************** */}
        <div className="col-md-12" style={{ marginBottom: "20px" }}>
          <p className="whole_label">State</p>
          <select name="" className="description_inputf mb-0"
            value={userInfo.state}
            onChange={(e) => {
              getCities(userInfo.country.split("-")[1], e.target.value.split("-")[1])
              setUserInfo({ ...userInfo, state: e.target.value, city: '' });
              setCities([]);
            }}>
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
            })}
          </select>
        </div>


        {/* ******************************************** City ******************************************** */}
        <div className="col-md-12 pb-5" >
          <p className="whole_label">City</p>
          <select name="" className="description_inputf mb-0"
            value={userInfo.city}
            onChange={(e) => onChangeUserInfo(doctorField.city, e.target.value)}>
            <option value="">Select City</option>
            {cities.length && cities.map(dt =>
              <option key={dt.id} value={dt.name}>{dt.name}</option>
            )}
          </select>
        </div>

        {/* ******************************************** Button ******************************************** */}
        <hr />
        <div className="d-flex justify-content-between col-md-12">
          <button type='button' style={{ cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9' }} className="description_btnsave btnfix_wid81 d-flex justify-content-center align-items-center mx-0" disabled={isLoader} onClick={() => navigate(-1)}>Cancel</button>
          {/* <button
            type='button'
            disabled={isLoader}
            className="description_btnsave mx-0 d-flex justify-content-center align-items-center"
            onClick={handleSubmit}>
            Update
            {isLoader &&
              <div className="ms-2 text-center text-capitalize">
                <div style={{ width: '2rem', height: '2rem', marginTop: "6px" }} class="spinner-border" role="status" />
              </div>}
          </button> */}


          <Button onClick={handleSubmit} isLoading={isLoader} loadingText={false} type="submit" 
                                         text={'Update'}
                                         style={isLoader ? { pointerEvent: 'none' } : {}}
                                          className="description_btnsave btnfix_wid81" />
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 py-4 px-5">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item cursor-pointer" onClick={() => navigate(-1)}>Dr. Management</li>
                <li class="breadcrumb-item active fw-bold" aria-current="page">{user.full_name}</li>
              </ol>
            </nav>
            <div className="row">
              {renderField()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditDoctor;