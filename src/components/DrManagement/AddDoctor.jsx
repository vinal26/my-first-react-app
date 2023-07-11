import React, { forwardRef, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoctor, addQualification, getCategories, getCity, getCountry, getLocation, getQualifications, getServices, getState } from '../../services/DoctorService';
import Creatable from 'react-select/creatable';
import Select, { components } from 'react-select';
import { doctorContext } from '../../Context/DoctorContext';
import { format } from 'date-fns';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { formatDate, isValidHttpUrl, qualification_list, showToastError, showToastSuccess, validateEmail } from '../../Utils/Helper';
import { toast } from 'react-toastify';
import { toastMsg } from '../../Utils/AllConstant';
import { changeDateFormatYYYY } from '../../Utils/Helper';
import DateInput from '../../commonComponent/CutomDatePicker';
import { getUploadFileCategory, uploadFile } from '../../services/FileUploadService';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import Button from "../../commonComponent/Button";
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../header/Navbar';

const AddDoctor = () => {
  const [fname, setfname] = useState("");
  const [sname, setsname] = useState("");
  const [dob, setdob] = useState("");
  const [email, setemail] = useState("");
  const [yoe, setyoe] = useState("0");
  const [qualification, setqualification] = useState([]);
  const [qualificationList, setqualificationlist] = useState(qualification_list);
  const [category, setcategory] = useState("");
  const [categories, setcategories] = useState([]);
  const [service, setservice] = useState([]);
  const [serviceList, setserviceList] = useState([]);
  const [gender, setgender] = useState("");
  const [address, setaddress] = useState("");
  const [country, setcountry] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [publication, setpublication] = useState([]);
  const [zipcode, setzipcode] = useState("");
  const [lattitude, setlattitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [error, setError] = useState(false);
  const [zoomChecked, setZoomChecked] = useState(false);
  const [flname, setflname] = useState("");
  const [image, setImage] = useState("");

  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([])
  const [states, setStates] = useState([])

  const [loader, setLoader] = useState(false);
  const { dispatch } = useContext(doctorContext);
  let navigate = useNavigate();

  const NoOptionsMessage = props => {
    return (
      <components.NoOptionsMessage {...props}>
        <span>Type something and press create</span>
      </components.NoOptionsMessage>
    );
  };
  var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  // const SelectMenuButton = (props) => {
  //   return (
  //       <components.Menu  {...props}>
  //           {props.children}
  //           <button>Add new element</button>
  //       </components.Menu >
  //   )
  // }

  const handleSubmit = async (e) => {
    // e.preventDefault();

    let addObject = {
      "first_name": fname,
      "last_name": sname,
      //"dob": formatDate(dob),
      "dob": dob.split("-").reverse().join("-"),
      "email": email,
      "yearsOfExperience": yoe,
      "qualifications": qualification,
      "docCategory": category,
      "address": address,
      "country": country.split("-")[0],
      "city": city,
      "state": state.split("-")[0],
      "gender": gender,
      "zipcode": zipcode,
      "lattitude": lattitude,
      "longitude": longitude,
      "services": service,
      "publications": publication,
    }

    addObject.profilePicture = flname ? flname : "firstPic";

    try {
      if (!fname || !sname || !email || !yoe || !service || !country || !qualification.length || !service.length || !dob || !gender || !category || !address) {
        setError(true)
      } else {
        if (validateEmail(email)) {
          setError(false)
          setLoader(true)
          const response = await addDoctor(addObject);
          if (response.status === 200) {
            image && await uploadPicture(response.data.data.insertedId)
            setLoader(false)
            showToastSuccess("Doctor added successfully.")
            navigate("/doctorviewprofile");
          } else {
            setLoader(false)
            showToastError(response?.data || response?.message || toastMsg.errorMssg)
          }
        }
        setError(true)
        setLoader(false)
      }

    } catch (error) {
      setLoader(false)
      error?.data?.data && showToastError(error?.data?.data || error?.data?.message || toastMsg.errorMssg)
    }
  }

  const uploadPicture = async (userId) => {
    // setImage(e.target.files[0]);
    // const filename = getFileName(e.target.files[0]);
    const filename = "firstPic"; // Make constant for custom profile url
    try {
      await uploadFile(
        image,
        getUploadFileCategory.uploadProfile,
        filename,
        "",
        userId
      );
      setflname(filename);
    } catch (error) {
      console.log(error);
    }
  };

  const locationFetch = async (e) => {
    // console.log('Get Location');
    setzipcode(e.target.value);
    if ((e.target.value).length < 6) return;

    try {
      const response = await getLocation(zipcode);
      if (response.status === 200) {
        console.log(response?.data);
        setcity(response?.data?.results.postcode_localities[0]);
        setstate(response?.data?.results.address_components[1].long_name);
        setcountry(response?.data?.results.address_components[2].long_name);
        setlattitude(response?.data?.results.geometry.location.lat);
        setlongitude(response?.data?.results.geometry.location.lng);
      } else {
        showToastError(response?.data || response.message);
      }
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error.data?.message);
    }
  }

  const getCategoryList = async () => {
    try {
      const response = await getCategories();
      if (response.status === 200) {
        setcategories(response?.data?.data);
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

        setqualificationlist(res);
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

        setserviceList(res);
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

  useEffect(() => {
    const active = document.querySelector(".memlist_scroll .active");
    if (active) active.classList.remove("active");
    dispatch({ type: "Clear Profile" });

    getCategoryList();
    // getQualificationList();
    getServiceList();
    getCountries();
  }, []);

  const getCountries = async () => {
    try {
      const response = await getCountry();

      if (response.length) {
        setCountries(response);
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
      }
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error.data?.message);
    }
  }

  const CustomDatePicker = forwardRef(({ value, onClick }, ref) => (
    <div className="description_inputf d-flex mb-0 align-items-center" onClick={onClick} ref={ref}>
      <input value={value} placeholder={'mm-dd-yyyy'} className="border-0 bg-white" style={{
        color: "#9f9f9f",
        flex: 1
      }} disabled />
      <img src={"images/calnder.png"} />
    </div>
  ));

  const getDate = (date) => {
    try {
      if (date && new Date(date) != 'Invalid Date') {
        return new Date(date)
      }
      // return new Date()
    } catch (error) {

    }
  }
  const exceptThisSymbols = ["e", "E", "+", "-", "."];

  const renderField = () => {
    return (
      <>
      {/* <form> */}
        {/* <hr /> */}
        <div className="row mt-4">
          <div className="col-md-12 mt-4 mb-5">
            <img
              src={
                (image && URL.createObjectURL(image)) || "images/avatar.png"
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
                // uploadPicture(e);
                setImage(e.target.files[0]);
              }}
            />
            <div className="profile_circleimask d-flex justify-content-center align-items-center">
              <BsFillPlusCircleFill className="profile_circleicon" />
            </div>
          </div>
          <div className="col-md-6" style={{ marginBottom: "20px" }}>
            <p className="whole_label">First name<span className="text-danger"> *</span></p>
            <input
              required
              pattern="^\S.*$"
              type="text"
              className="description_inputf mb-1"
              value={fname}
              onChange={(e) => setfname(e.target.value)}
              placeholder="First Name"
            />
            {(error && !fname) && <label className="text-danger error mb-0">First name should not be empty.</label>}
          </div>
          <div className="col-md-6" style={{ marginBottom: "20px" }}>
            <p className="whole_label">Last name<span className="text-danger"> *</span></p>
            <input
              required
              pattern="^\S.*$"
              type="text"
              className="description_inputf mb-1"
              value={sname}
              onChange={(e) => setsname(e.target.value)}
              placeholder="Last Name"
            />
            {(error && !sname) && <label className="text-danger error mb-0">Last name should not be empty.</label>}
          </div>
        </div>

        <div className="col-md-12" style={{ marginBottom: "20px" }}>
          <p className="whole_label">Date <span className='small_letter2'>of</span> birth<span className="text-danger"> *</span></p>
          {/* <ReactDatePicker
            dateFormat="MM-dd-yyyy"
            selected={dob}
            value={getDate(dob) || ''}
            className="description_inputf mb-1"
            maxDate={new Date()}
            showMonthDropdown
            showYearDropdown
            yearDropdownItemNumber={40}
            scrollableYearDropdown
            placeholderText='mm-dd-yyyy'
            onChange={(date) => {
              console.log(date)
              setdob(changeDateFormatYYYY(date))
            }}
            customInput={<CustomDatePicker />}
          /> */}

          <DateInput
            value={getDate(dob) || ''}
            onChangeDate={(date) => {
              console.log(changeDateFormatYYYY(date));
              setdob(changeDateFormatYYYY(date))
            }}
            maxDate={new Date()}
            inputClassName={"description_inputf d-flex mb-1 align-items-center"}
          />
          {(error && !dob) && <label className="text-danger error mb-0">Date of Birth should not be empty.</label>}
        </div>

        <div className="col-md-12" style={{ marginBottom: "20px" }}>
          <p className="whole_label">Email<span className="text-danger"> *</span></p>
          <input
            required
            className="description_inputf mb-1"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Enter Email"
          />
          {(error && !email) && <label className="text-danger error mb-0">Email should not be empty.</label>}
          {(error && !validateEmail(email) && email) && <label className="text-danger error mb-0">Email format is not valid.</label>}
        </div>

        <div className="col-md-12" style={{ marginBottom: "20px" }}>
          <p className="whole_label">Years <span className='small_letter2'>of</span> experience<span className="text-danger"> *</span></p>
          <input
            type="number"
            min="0"
            max="99"
            className="description_inputf mb-1"
            value={yoe}
            onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()}
            onChange={(e) => {
              setyoe(e.target.value.slice(0, 2));
            }}
          />
          {(error && (!yoe)) && <label className="text-danger error mb-0">Experience should not be empty and should not exceed 100.</label>}
        </div>

        <div className="col-md-12" >
          <p className="whole_label">Qualification<span className="text-danger"> *</span></p>
          <Creatable
            className='mb-0'
            // formatCreateLabel={(input) => {

            //   if (!isNaN(input) || format.test(input))
            //     return "Numbers and special characters not allowed"
            //   return `Add "${input}" to the list`
            // }}
            // onCreateOption={(input) => {
            //   console.log(format.test(input), "format")
            //   if (isNaN(input) && !format.test(input))
            //     addNewQualification({ "name": input });
            // }}
            value={qualification.map((dt) => {
              return { value: dt.qualificationId, label: dt.name };
            })}
            isMulti
            closeMenuOnSelect={false}
            placeholder={"Select or Add"}
            onChange={(opt, meta) => {
              let data = [];
              opt.length && opt.map(dt => data.push({ "qualificationId": dt.value, "name": dt.label }))
              setqualification(data);
            }}
            options={qualificationList}
          />
          {(error && qualification.length == 0) && <label className="text-danger error mb-0" style={{position:"relative" , top:-30}}>Qualification should not be empty.</label>}
        </div>

        <div className="col-md-12" style={{ marginTop: -10 }}>
          <p className="whole_label">Service<span className="text-danger"> *</span></p>
          <Select
            isMulti
            closeMenuOnSelect={false}
            placeholder={"Select"}
            onChange={(opt, meta) => {
              let data = [];
              opt.length && opt.map(dt => data.push({ "serviceId": dt.value, "name": dt.label }))
              setservice(data);
            }}
            options={serviceList}
          />
          {(error && service.length == 0) && <label className="text-danger error mb-0" style={{position:"relative" , top:-30}}>Service should not be empty.</label>}
        </div>

        <div className="col-md-12" style={{ marginBottom:20 , marginTop: -10 }}>
          <p className="whole_label">Gender<span className="text-danger"> *</span></p>
          <select name="" className="description_inputf mb-1"
            value={gender}
            onChange={(e) => setgender(e.target.value)}
          >
            <option value="category">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="transgender">Transgender</option>
            <option value="other">Other</option>
          </select>
          {(error && !gender) && <label className="text-danger error mb-0">Gender should not be empty.</label>}
        </div>

        <div className="col-md-12" style={{ marginBottom: "20px" }}>
          <p className="whole_label">Category<span className="text-danger"> *</span></p>
          <select name="" className="description_inputf mb-1"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="category">Select Category</option>
            {categories.length && categories.map(dt =>
              <option key={dt._id} value={dt.name}>{dt.name}</option>
            )}
          </select>
          {(error && !category) && <label className="text-danger error mb-0">Category should not be empty.</label>}
        </div>

        <div className="col-md-12">
          <p className="whole_label">Websites</p>
          <Creatable
            value={publication.map(dt => ({ value: dt, label: dt }))}
            formatCreateLabel={(input) => {
              if (!isValidHttpUrl(input))
                return "Please enter a valid url";
              return `Add "${input}"`;
            }}
            onCreateOption={(input) => {
              if (!isValidHttpUrl(input)) return;
              setpublication(prev => [...prev, input]);
            }}
            placeholder="Enter an URL"
            isMulti
            closeMenuOnSelect={false}
            components={{
              DropdownIndicator: null,
              NoOptionsMessage,
            }}
            onChange={(opt, meta) => {
              let data = [];
              opt.length && opt.map(dt => data.push(dt.value))
              setpublication(data);
            }}
          />
        </div>

        <div className="col-md-12" style={{ marginBottom: 20 ,marginTop: -10 }}>
          <p className="whole_label">Address<span className="text-danger"> *</span></p>
          <input
            required
            pattern="^\S.*$"
            title="Check for leading whitespaces"
            type="text"
            className="description_inputf mb-1"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            placeholder="Address"
          />
          {(error && !address) && <label className="text-danger error mb-0">Address should not be empty.</label>}

        </div>
        <div className="col-md-12" style={{ marginBottom: "20px" }}>
          <p className="whole_label">Country<span className="text-danger"> *</span></p>

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
          {(error && !country) && <label className="text-danger error mb-0">Country should not be empty.</label>}
        </div>
        <div className="col-md-12" style={{ marginBottom: "20px" }}>
          <p className="whole_label">State</p>
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
        <div className="col-md-12" style={{ marginBottom: "20px" }} >
          <p className="whole_label">City</p>
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

        {/* <div style={{ marginLeft: 10, marginBottom: 10 }}><div className="btn-group">
          <p className="affir_checkbox">
            <input type="checkbox" onClick={() => setZoomChecked(!zoomChecked)} checked={zoomChecked} />
          </p>
          <p className="affir_checkbox">
            {'Do you have added this doctor on zoom account? if not then '}
            <a href="https://us02web.zoom.us/account/user?_x_zm_rtaid=rAy_ZpFMTL-A3HeqPJaVXw.1660299841392.81419490e5ceaf542b087ba681f526b7&_x_zm_rhtaid=37#/" target={'_blank'}>click here</a>
            {'.'}
          </p>
        </div>
        </div> */}



        <hr />
        <div className="d-flex justify-content-between col-md-12">
          <button type='button' style={{ cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9' }} className="description_btnsave btnfix_wid81 d-flex justify-content-center align-items-center mx-0" disabled={loader} onClick={() => navigate(-1)}>Cancel</button>
          {/* <button type='button' disabled={loader} className="description_btnsave mt-2  d-flex justify-content-center align-items-center"
            onClick={() => { handleSubmit(); }}>Send Link  {loader && <div className="ms-2 text-center text-capitalize" style={{ marginLeft: "10px" }}>
              <div style={{ width: '2rem', height: '2rem', marginTop: "6px" }} class="spinner-border" role="status" />
            </div>}</button> */}


          <Button onClick={() => { handleSubmit(); }} isLoading={loader} loadingText={false} type="submit"
            text={'Send Link'}
            style={loader ? { pointerEvent: 'none' } : {}}
            className="description_btnsave btnfix_wid81" />
        </div>
        {/* </form> */}
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
                <li class="breadcrumb-item active fw-bold" aria-current="page">Add Doctor</li>
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

export default AddDoctor;