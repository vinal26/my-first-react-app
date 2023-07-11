import React, { useEffect, useState } from "react";
import {
  addQualification,
  editDoctorEmail,
  editDoctorOtp,
  editDoctorProfile,
  getCategories,
  getDoctorProfile,
  getLocation,
  getQualifications,
  getServices,
} from "../../services/DoctorService";
import Creatable from "react-select/creatable";
import Select, { components } from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { removeStoreItem } from "../../storage/Storage";
import { format } from "date-fns";
import {
  getFileName,
  isValidHttpUrl,
  qualification_list,
  showToastError,
  showToastSuccess,
} from "../../Utils/Helper";
import {
  getUploadFileCategory,
  uploadFile,
} from "../../services/FileUploadService";
import ReactStars from "react-rating-stars-component";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useAuth } from "../../Context/AuthContext";
import DateInput from "../../commonComponent/CutomDatePicker";
import { changeDateFormatYYYY, changeDateFormat } from "../../Utils/Helper";
import {
  addZoomCredentialService,
  checkZoomCodeAddedService,
} from "../../services/ZoomService";
import { FaArrowLeft, FaEdit, FaPen } from "react-icons/fa";

const ProfileInput = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [fname, setfname] = useState("");
  const [sname, setsname] = useState("");
  const [dob, setdob] = useState("");
  const [email, setemail] = useState("");
  const [emailNew, setemailNew] = useState("");
  const [tokenNew, settokenNew] = useState("");
  const [yoe, setyoe] = useState(0);
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
  const [insta, setInsta] = useState("");
  const [fb, setFb] = useState("");
  const [publication, setpublication] = useState([]);
  const [zipcode, setzipcode] = useState("");
  const [lattitude, setlattitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [error, setError] = useState(false);
  const [image, setImage] = useState("");
  const [flname, setflname] = useState("");
  const [askLoader, setAskLoader] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [emailApiChange, setEmailApiChange] = useState("");
  const [zoomApiKey, setZoomApiKey] = useState("");
  const [zoomApiSecret, setZoomApiSecret] = useState("");

  const [isLoading, setLoader] = useState(true);

  const NoOptionsMessage = (props) => {
    return (
      <components.NoOptionsMessage {...props}>
        <span>Type a valid url and press enter</span>
      </components.NoOptionsMessage>
    );
  };
  var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const handleEmailChange = async (e) => {
    // console.log(service, "serviceList");
    e.preventDefault();
    // console.log(qualification, service);
    let params = {
      email: emailNew,
    };
    try {
      const response = await editDoctorEmail(params);
      if (response.status === 200) {
        console.log(response, "response email");
        showToastSuccess("Kindly Check your email to verify.");
        setEmailApiChange("edit");
      } else {
        showToastError(response?.data || response.message);
      }
    } catch (error) {
      // error?.data?.data && alert(error?.data?.data || error.data?.message);
      // error?.data?.data && showToastError(error?.data?.data || error.data?.message)
    }

    console.log(params);
  };
  const handleEmailToken = async (e) => {
    // console.log(service, "serviceList");
    e.preventDefault();
    // console.log(qualification, service);
    // let params = {
    //   "token": tokenNew,
    // }
    try {
      const response = await editDoctorOtp(tokenNew);
      if (response?.data?.status === 200) {
        console.log(response, "response token");
        if (response?.data?.data === "Email updated Successfully") {
          showToastSuccess("Email Changed Successfully");
          setemail(emailNew);
          setEmailApiChange("");
          settokenNew("");
        } else {
          showToastSuccess("Some Error Occurred.");
        }
      } else {
        showToastError(response?.data || response.message);
      }
    } catch (error) {
      // error?.data?.data && alert(error?.data?.data || error.data?.message);
      // error?.data?.data && showToastError(error?.data?.data || error.data?.message)
    }

    // console.log(params);
  };
  const handleSubmit = async (e) => {
    // console.log(service, "serviceList");
    e.preventDefault();
    // console.log(qualification, service);
    let addObject = {
      first_name: fname,
      last_name: sname,
      dob: dob.split("-").reverse().join("-"),
      email: email,
      yearsOfExperience: yoe,
      qualifications: qualification,
      docCategory: category,
      address: address,
      country: country,
      city: city,
      state: state,
      fbId: fb,
      instaId: insta,
      gender: gender,
      // "zipcode": zipcode,
      lattitude: lattitude,
      longitude: longitude,
      services: service,
      publications: publication.map((dt) => {
        return dt.label;
      }),
    };

    // const tokenOTP={
    //   "token":token
    // }
    const fileName = profilePicture.split("/");
    const imageName = fileName[fileName.length - 1];
    addObject.profilePicture = flname ? flname : imageName;

    try {
      if (zoomApiSecret || zoomApiKey) {
        const zoomResponse = await postZoomDetail();
        if (!zoomResponse) {
          return;
        }
      }
      const response = await editDoctorProfile(addObject);
      if (response.status === 200) {
        console.log(response?.data);
        showToastSuccess(response?.data?.data);
        removeStoreItem("first_name");
        removeStoreItem("last_name");
        removeStoreItem("qualifications");
        removeStoreItem("category");
        removeStoreItem("profile_picture");
        navigate("/");
      } else {
        showToastError(response?.data || response.message);
      }
    } catch (error) {
      // error?.data?.data && alert(error?.data?.data || error.data?.message);
      error?.data?.data &&
        showToastError(error?.data?.data || error.data?.message);
    }

    console.log(addObject);
  };

  const locationFetch = async (e) => {
    // console.log('Get Location');
    setzipcode(e.target.value);
    if (e.target.value.length < 6) return;

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
        alert(response?.data || response.message);
      }
    } catch (error) {
      error?.data?.data && alert(error?.data?.data || error.data?.message);
    }
  };

  const getCategoryList = async () => {
    try {
      const response = await getCategories();
      if (response.status === 200) {
        // console.log(response?.data);
        setcategories(response?.data?.data);
      } else {
        alert(response?.data || response.message);
      }
    } catch (error) {
      error?.data?.data && alert(error?.data?.data || error.data?.message);
    }
  };

  const getQualificationList = async () => {
    try {
      const response = await getQualifications();
      if (response.status === 200) {
        // console.log(response?.data);

        let res = (response?.data?.data).map((dt) => ({
          value: dt._id,
          label: dt.name,
        }));

        setqualificationlist(res);
      } else {
        alert(response?.data || response.message);
      }
    } catch (error) {
      error?.data?.data && alert(error?.data?.data || error.data?.message);
    }
  };

  const getServiceList = async () => {
    try {
      const response = await getServices();
      if (response.status === 200) {
        // console.log(response?.data);

        let res = (response?.data?.data).map((dt) => ({
          value: dt._id,
          label: dt.name,
        }));

        setserviceList(res);
      } else {
        alert(response?.data || response.message);
      }
    } catch (error) {
      error?.data?.data && alert(error?.data?.data || error.data?.message);
    }
  };

  const addNewQualification = async (payload) => {
    try {
      const response = await addQualification(payload);
      if (response.status === 200) {
        alert(response?.data?.message);
        getQualificationList();
      } else {
        alert(response?.data || response.message);
      }
    } catch (error) {
      error?.data?.data && alert(error?.data?.data || error.data?.message);
    }
  };

  const getDoctorInfo = async () => {
    try {
      const response = await getDoctorProfile();
      setLoader(false);

      if (response.status === 200) {
        console.log(response?.data);
        response?.data?.data[0]?.first_name &&
          setfname(response?.data?.data[0]?.first_name);
        response?.data?.data[0]?.last_name &&
          setsname(response?.data?.data[0]?.last_name);
        //setdob(("08-19-1998").split("-").reverse().join("-"));
        response?.data?.data[0]?.dob &&
          setdob((response?.data?.data[0]?.dob).split("-").reverse().join("-"));
        response?.data?.data[0]?.email &&
          setemail(response?.data?.data[0]?.email);
        response?.data?.data[0]?.yearsOfExperience &&
          setyoe(response?.data?.data[0]?.yearsOfExperience);
        response?.data?.data[0]?.qualifications &&
          setqualification(response?.data?.data[0]?.qualifications);
        response?.data?.data[0]?.docCategory &&
          setcategory(response?.data?.data[0]?.docCategory);
        response?.data?.data[0].address &&
          setaddress(response?.data?.data[0].address);
        response?.data?.data[0]?.country &&
          setcountry(response?.data?.data[0]?.country);
        response?.data?.data[0]?.city && setcity(response?.data?.data[0]?.city);
        response?.data?.data[0]?.state &&
          setstate(response?.data?.data[0]?.state);
        response?.data?.data[0]?.instaId &&
          setInsta(response?.data?.data[0]?.instaId);
        response?.data?.data[0]?.fbId &&
          setFb(response?.data?.data[0]?.fbId);
        response?.data?.data[0]?.gender &&
          setgender(response?.data?.data[0]?.gender);
        response?.data?.data[0]?.location?.lattitude &&
          setlattitude(response?.data?.data[0].location?.lattitude);
        response?.data?.data[0]?.location?.longitude &&
          setlongitude(response?.data?.data[0].location?.longitude);
        response?.data?.data[0]?.services &&
          setservice(response?.data?.data[0]?.services);
        response?.data?.data[0]?.profilePicture &&
          setProfilePicture(response?.data?.data[0]?.profilePicture);
        response?.data?.data[0]?.publications &&
          setpublication(
            response?.data?.data[0]?.publications.map((dt) => {
              return {
                value: dt,
                label: dt,
              };
            })
          );
      } else {
        alert(response?.data || response.message);
      }
    } catch (error) {
      setLoader(false);
      error?.data?.data && alert(error?.data?.data || error.data?.message);
    }
  };

  const uploadPicture = async (e) => {
    setImage(e.target.files[0]);
    // const filename = getFileName(e.target.files[0]);
    const filename = auth.authUser._id; // Make constant for custom profile url
    try {
      await uploadFile(
        e.target.files[0],
        getUploadFileCategory.uploadProfile,
        filename
      );
      setflname(filename);
    } catch (error) {
      console.log(error);
    }
  };

  const postZoomDetail = async () => {
    try {
      let params = {
        APIKey: zoomApiKey,
        APISecret: zoomApiSecret,
      };
      const response = await addZoomCredentialService(params);
      return response;
    } catch (error) {
      error?.data?.data &&
        showToastError(error?.data?.data || error.data?.message);
    }
  };

  const getZoomDetail = async () => {
    try {
      const response = await checkZoomCodeAddedService();
      if (response) {
        setZoomApiKey(response.api_key);
        setZoomApiSecret(response.api_secret);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const exceptThisSymbols = ["e", "E", "+", "-", "."];
  useEffect(() => {
    getCategoryList();
    // getQualificationList();
    getServiceList();
    getZoomDetail();
    getDoctorInfo();
  }, []);

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const getDate = (date) => {
    try {
      if (date && new Date(date) != "Invalid Date") {
        return new Date(date);
      }
      // return new Date()
    } catch (error) {}
  };

  return (
    <>
      {isLoading ? (
        <center>
          <div
            style={{
              width: "3rem",
              height: "3rem",
              color: "#1f7e78",
              top: "110px",
              position: "relative",
            }}
            class="spinner-border mt-3 mb-4"
            role="status"
          />
        </center>
      ) : (
        <>
          <div className="row mb-5">
            <div className="col-md-12 mt-4 mb-1">
              <img
                src={
                  (image && URL.createObjectURL(image)) ||
                  `${profilePicture}?${Date.now()}`
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
            {/* <div className="col-md-12">
            <div className="float-end react_stars">
              <p className="whole_label1">My Ratings</p>
              <Link to="/myratingslist">
                <div className="rating_back89">
                  <ReactStars
                    count={5}
                    value={4}
                    edit={false}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                  />
                </div>
              </Link>

            </div>

          </div> */}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row mt-4">
              <div className="col-md-6">
                <p className="whole_label">
                  First name<span class="text-danger"> *</span>
                </p>
                <input
                  type="text"
                  required
                  pattern="^\S.*$"
                  className="description_inputf"
                  maxLength="20"
                  value={fname}
                  onChange={(e) => setfname(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <p className="whole_label">
                  Last name<span class="text-danger"> *</span>
                </p>
                <input
                  type="text"
                  required
                  pattern="^\S.*$"
                  className="description_inputf"
                  maxLength="20"
                  value={sname}
                  onChange={(e) => setsname(e.target.value)}
                />
              </div>

              {/* <div className="col-md-12 profile_date ">
                <p className="whole_label">
                  Date <span className="small_letter2">of</span> birth
                </p>
                <DateInput
                  value={getDate(dob) || ""}
                  onChangeDate={(date) => setdob(changeDateFormatYYYY(date))}
                  maxDate={new Date()}
                  imageStyle={{
                    width: 22,
                    height: 22,
                    position: "absolute",
                    borderRadius: "0px",
                    marginBlock: "17px",
                    left: "20px",
                  }}
                  inputClassName1={"description_inputf"}
                />
              </div> */}

              <div className="col-md-6">
                <p className="whole_label">
                  Email<span class="text-danger"> *</span>
                </p>
                <div className="d-flex justify-content-between">
                  <input
                    type="text"
                    required
                    className="description_inputf event-none"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                  <span>
                    {/* {emailApiChange == "edit" ? Verify : */}
                    <FaPen
                      className="like_group_email"
                      data-bs-toggle="modal"
                      data-bs-target="#forumModal"
                    ></FaPen>
                    {/* } */}
                  </span>
                </div>
              </div>

              <div className="col-md-6">
                <p className="whole_label">
                  Years <span className="small_letter2">of</span> experience <span class="text-danger"> *</span>
                </p>
                <input
                  type="number"
                  required
                  min="1"
                  max="99"
                  className="description_inputf"
                  value={yoe}
                  onKeyDown={(e) =>
                    exceptThisSymbols.includes(e.key) && e.preventDefault()
                  }
                  onChange={(e) => {
                    // if (e.target.value == 0)
                    //   (error && (!yoe || parseInt(yoe) <= 0 || parseInt(yoe) > 100)) && <label className="text-danger">Experience should not be empty and should not exceed 100.</label>
                    setyoe(e.target.value.slice(0, 2));
                  }}
                />
                {error &&
                  (!yoe || parseInt(yoe) <= 0 || parseInt(yoe) > 100) && (
                    <label className="text-danger">
                      Experience should not be empty and should not exceed 100.
                    </label>
                  )}
              </div>

              <div className="col-md-6">
                <p className="whole_label">Qualification</p>
                <Select
                  // formatCreateLabel={(input) => {
                  //   if (!isNaN(input) || format.test(input))
                  //     return "Numbers and special characters not allowed";
                  //   return `Add "${input}" to the list`;
                  // }}
                  value={qualification.map((dt) => {
                    return { value: dt.qualificationId, label: dt.name };
                  })}
                  // onCreateOption={(input) => {
                  //   // console.log(`Added ${input}`)
                  //   if (isNaN(input) && !format.test(input))
                  //     addNewQualification({ name: input });
                  // }}
                  // components={{
                  //   Menu: SelectMenuButton
                  // }}
                  isMulti
                  closeMenuOnSelect={false}
                  placeholder={"Select"}
                  onChange={(opt, meta) => {
                    // console.log(opt);
                    setqualification(
                      opt.map((dt) => {
                        return { qualificationId: dt.value, name: dt.label };
                      })
                    );
                  }}
                  options={qualificationList}
                />
              </div>

              <div className="col-md-6">
                <p className="whole_label">Websites</p>
                <Creatable
                  value={publication}
                  formatCreateLabel={(input) => {
                    if (!isValidHttpUrl(input))
                      return "Please enter a valid url";
                    return `Add "${input}"`;
                  }}
                  onCreateOption={(input) => {
                    if (!isValidHttpUrl(input)) return;
                    setpublication(prev => [...prev, {value: input, label: input}]);
                  }}
                  // formatCreateLabel={(input) => `Add "${input}"`}
                  placeholder="Enter an URL"
                  isMulti
                  closeMenuOnSelect={false}
                  // menuIsOpen={false}
                  components={{
                    DropdownIndicator: null,
                    NoOptionsMessage,
                  }}
                  onChange={(opt, meta) => {
                    setpublication(opt);
                  }}
                />
              </div>

              <div className="col-md-6">
                <p className="whole_label">Services</p>
                <Select
                  value={service.map((dt) => {
                    return { value: dt.serviceId, label: dt.name };
                  })}
                  isMulti
                  closeMenuOnSelect={false}
                  placeholder={"Select"}
                  onChange={(opt, meta) => {
                    // console.log(opt);
                    setservice(
                      opt.map((dt) => {
                        return { serviceId: dt.value, name: dt.label };
                      })
                    );
                  }}
                  options={serviceList}
                />
              </div>

              <div className="col-md-6">
                <p className="whole_label">Categories</p>
                <select
                  name=""
                  className="description_inputf"
                  value={category}
                  onChange={(e) => setcategory(e.target.value)}
                >
                  <option value="category">Select Category</option>
                  {categories.length &&
                    categories.map((dt) => (
                      <option key={dt._id} value={dt.name}>
                        {dt.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-md-12">
                <p className="whole_label">
                  Address
                </p>
                {/* <input
                  type="text"
                  required
                  pattern="^\S.*$"
                  title="Check for leading whitespaces"
                  className="description_inputf"
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                /> */}

                <textarea
                  rows="4"
                  type="text"
                  class="description_inputf description_descpf"
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                  
                  pattern="^\S.*$"
                >
                  new
                </textarea>
              </div>

              <div className="col-md-6">
                <p className="whole_label">Gender</p>
                <select
                  name=""
                  className="description_inputf"
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                >
                  <option value="category">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="transgender">Transgender</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="col-md-6">
                <p className="whole_label">City</p>
                <input
                  type="text"
                  pattern="^\S.*$"
                  title="Check for leading whitespaces"
                  className="description_inputf"
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <p className="whole_label">
                  State<span class="text-danger"> *</span>
                </p>
                <input
                  type="text"
                  required
                  pattern="^\S.*$"
                  className="description_inputf"
                  value={state}
                  onChange={(e) => setstate(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <p className="whole_label">
                  Country<span class="text-danger"> *</span>
                </p>
                <input
                  type="text"
                  required
                  pattern="^\S.*$"
                  className="description_inputf"
                  value={country}
                  onChange={(e) => setcountry(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <p className="whole_label">
                  Instagram Link
                </p>
                <input
                  type="text"
                  pattern="^\S.*$"
                  className="description_inputf"
                  value={insta}
                  onChange={(e) => setInsta(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <p className="whole_label">
                  Facebook Link
                </p>
                <input
                  type="text"
                  pattern="^\S.*$"
                  className="description_inputf"
                  value={fb}
                  onChange={(e) => setFb(e.target.value)}
                />
              </div>
              <p className="connect_to_zoom_p">
                Connect to zoom is required{" "}
                <a
                  target="_blank"
                  href="https://marketplace.zoom.us/"
                  rel="noreferrer"
                >
                  click here
                </a>
              </p>
              <div className="col-md-6">
                <p className="whole_label">Client ID<span class="text-danger"> *</span></p>
                <input
                required
                  className="description_inputf"
                  placeholder="Zoom Api Key"
                  value={zoomApiKey}
                  onChange={(e) => setZoomApiKey(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <p className="whole_label">Client Secret<span class="text-danger"> *</span></p>
                <input
                required
                  className="description_inputf"
                  placeholder="Zoom Api Secret"
                  value={zoomApiSecret}
                  onChange={(e) => setZoomApiSecret(e.target.value)}
                />
              </div>

              <hr className="mt-4" />
              <div className="col-md-12 d-flex justify-content-between px-0">
                <div text={'Cancel'} style={{ cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9' }} className="mx-0 description_btnsave btnfix_wid81 d-flex justify-content-center align-items-center" onClick={() => navigate(-1)}>Cancel</div>
                <button
                  type="submit"
                  className="description_btnsave mx-0"
                >
                  Update Now
                </button>
              </div>
            </div>
          </form>
        </>
      )}
      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="forumModal"
        aria-labelledby="exampleModalLabel"
        data-keyboard="false"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content py-4 px-3">
            <div class="modal-header border-0">
              {emailApiChange === "edit" ? (
                <>
                  <h3>Enter Token to Verify</h3>
                </>
              ) : (
                <h3>Enter New Email</h3>
              )}
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form
                onSubmit={
                  emailApiChange === "edit"
                    ? handleEmailToken
                    : handleEmailChange
                }
              >
                <div className="col-md-12">
                  <div
                    className="btn-group chat_inputsection mt-2 mb-4"
                    style={{
                      paddingLeft: "0%",
                      paddingRight: "0%",
                    }}
                  >
                    {emailApiChange === "edit" ? (
                      <input
                        type="text"
                        placeholder="Enter Token here..."
                        value={tokenNew}
                        onChange={(e) => settokenNew(e.target.value)}
                        style={{ width: "92%" }}
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder="Enter New Email here..."
                        value={emailNew}
                        onChange={(e) => setemailNew(e.target.value)}
                        style={{ width: "92%" }}
                      />
                    )}
                    {emailApiChange === "edit" ? (
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#forumModal"
                        id="email-modal"
                        style={askLoader ? { cursor: "none" } : {}}
                        type="submit"
                      >
                        <img src="images/arrow.png" alt="" />
                      </button>
                    ) : (
                      <button
                        style={askLoader ? { cursor: "none" } : {}}
                        type="submit"
                      >
                        <img src="images/arrow.png" alt="" />
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInput;
