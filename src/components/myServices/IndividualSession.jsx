import React, { useState, useEffect } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { addService } from "../../services/MyService";
import { showToastError, showToastSuccess } from "../../Utils/Helper";
import { getCarePlanFormListService } from "../../services/CreateCarePlanService";
import Button from "../../commonComponent/Button";

const IndividualSession = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("")
  const [desc, setdesc] = useState("")
  const [type, settype] = useState([])
  const [duration, setduration] = useState(0)
  const [buffertime, setbuffertime] = useState(10)
  const [form, setform] = useState("")
  const [location, setlocation] = useState("")
  const [phone, setphone] = useState("")
  const [curr, setcurr] = useState("USD")
  const [rate, setrate] = useState(0)
  const [error, setError] = useState("")
  const [isLoading, setLoader] = useState(false)
  const [formLists, setFormLists] = useState([])

  let handleSubmit = async (event) => {
    event.preventDefault();
    if (!type.length || type.includes('phone') && !phone || type.includes('inperson') && !location || !rate || !name || !desc || !duration || !buffertime || !form) {
      setError(true)
      
      return
    }

    var params = {
      serviceId: "",
      masterAvailabilityId: "",
      session: true,
      group: false,
      serviceName: name,
      serviceDesc: desc,
      serviceType: type,
      attendeesLimit: 0, //if group is true
      duration: +duration,
      currency: curr,
      rate: rate,
      breakTime: +buffertime,
      form: form.value,
      location: location,
      phone: phone,
    };

    setLoader(true)

    try {
      const response = await addService(params);
      setLoader(false);
      if (response.status === 200) {
        console.log(response.data.data, "response data");
        showToastSuccess("Service created successfully")
        navigate("/myservices")
      } else {
        showToastError(
          response?.data || response.message || "Some error occurred"
        );
      }
    } catch (error) {
      setLoader(false);
      showToastError(
        error?.data?.data || error.data?.message || "Some error occurred"
      );
    }

    console.log(params);
  };

  const getAllFormsData = async (searchWord) => {
      setFormLists([])
      // setMembers([])

      try {
          const response = await getCarePlanFormListService(searchWord);
          // setLoader(false);
          if (response.status === 200) {
              setFormLists(response?.data);
          }
      } catch (error) {
          // setLoader(false);
          console.log(error);
      }
  };

  useEffect(() => {
    getAllFormsData()
  }, [])
  

  const renderSearchHeader = () => {
    return (
      <div className="d-flex mt-5 mb-3">
        <div className="w-100">
          <h4>Service Information</h4>
          <p>Individual Session</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid mb-2">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 py-4 px-5">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li
                  class="breadcrumb-item cursor-pointer"
                  onClick={() => navigate(-1)}
                >
                  My Services
                </li>
                <li class="breadcrumb-item active fw-bold" aria-current="page">
                  Individual Session
                </li>
              </ol>
            </nav>
            <div>
              {renderSearchHeader()}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <label className="form-label" htmlFor="Team Name">
                      Service Title
                    </label>
                    <input
                      className="form-control description_inputf mb-4 mt-2"
                      placeholder="e.g. Initail Consuition"
                      onChange={e => setname(e.target.value)}
                    />
                    {error && !name && <h6 className="text-danger error">Please enter a title</h6>}

                    <label className="form-label" htmlFor="Description">
                      Description
                    </label>
                    <textarea
                      rows="4"
                      type="text"
                      className="description_inputf description_descpf mt-2 mb-4"
                      placeholder="e.g. A brief description of your service here"
                      onChange={e => setdesc(e.target.value)}
                    />
                    {error && !desc && <h6 className="text-danger error">Please enter a description</h6>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label mb-3">
                      Duration (in minutes)
                    </label>
                    <input
                      type="number"
                      className="form-control description_inputf mb-4"
                      placeholder="e.g. 30"
                      value={duration}
                      onChange={e => (e.target.value>=0 && e.target.value<999_999_999_999_999) && setduration(e.target.value)}
                    />
                    {error && !duration && <h6 className="text-danger error">Please enter a duration</h6>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label mb-3">
                      Pre-visit Form or Action
                    </label>

                    <Select
                        value={form}
                        className="w-100"
                        placeholder="Search here"
                        options={formLists.map((dt) => {
                            return ({
                                "value": dt._id,
                                "label": dt.formName
                            })

                        })}
                        onChange={(opt, meta) => {
                            setform(opt)
                        }}
                    />
                    {error && !form && <h6 className="text-danger error" style={{marginTop: "-2em"}}>Please select a form</h6>}
                  </div>

                  <div className="col-md-12">
                    <label className="form-label mb-3">
                      Service Fee
                    </label>
                    
                    <div className="row">
                      <div className="col-sm-10">
                        <input
                          type="number"
                          className="form-control description_inputf mb-4"
                          placeholder="e.g. 30"
                          value={rate}
                          onChange={e => (e.target.value>=0 && e.target.value<999_999_999) && setrate(e.target.value)}
                        />
                      </div>
                      <div className="col-sm-2">
                        <select value={curr} onChange={e => setcurr(e.target.value)} className="description_inputf">
                          <option value="USD">USD</option>
                          <option value="INR">INR</option>
                          <option value="EUR">EUR</option>
                        </select>
                      </div>
                    </div>
                    {error && !rate && <h6 className="text-danger error" style={{marginTop: "-2em"}}>Please enter a fee</h6>}
                  </div>

                  <div className="col-md-12 mt-1">
                    <label className="form-label mb-3" htmlFor="Team Name">
                      Service Availability
                    </label>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value="inperson"
                        id="in-person"
                        onChange={e => settype(prev => {
                          if(e.target.checked)
                            return [...prev, "inperson"]
                          else
                            return prev.filter(it => it!=="inperson")
                        }
                        )}
                      />
                      <label class="form-check-label" htmlFor="in-person">
                        In Person
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value="phone"
                        id="by-phone"
                        onChange={e => settype(prev => {
                          if(e.target.checked)
                            return [...prev, "phone"]
                          else
                            return prev.filter(it => it!=="phone")
                        }
                        )}
                      />
                      <label class="form-check-label" htmlFor="by-phone">
                        By Phone
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value="video"
                        id="online"
                        onChange={e => settype(prev => {
                          if(e.target.checked)
                            return [...prev, "video"]
                          else
                            return prev.filter(it => it!=="video")
                        }
                        )}
                      />
                      <label class="form-check-label" htmlFor="online">
                        Online Video
                      </label>
                    </div>
                    {error && !type.length && <h6 className="text-danger error mt-3">Please choose a type</h6>}
                  </div>
                  <div className="col-md-12 mt-3">
                    <h4>Booking Option</h4>
                  </div>
                  <div className="col-md-12 mt-3">
                    <label className="form-label" htmlFor="Team Name">
                      Buffer Time
                    </label>
                    <select value={buffertime} onChange={e => setbuffertime(e.target.value)} className="description_inputf mb-4 mt-2">
                      <option value="10">10 minutes</option>
                      <option value="15">15 minutes</option>
                      <option value="20">20 minutes</option>
                    </select>
                    {error && !buffertime && <h6 className="text-danger error">Please enter a buffer time</h6>}
                  </div>
                  {/* <div className="col-md-6 mt-3">
                    <label className="form-label" for="Team Name">
                      Attendee Limit
                    </label>
                    <select className="description_inputf mb-4 mt-2">
                      <option value="free">10 </option>
                      <option value="free">15 </option>
                      <option value="free">20 </option>
                    </select>
                    {error && !limit && <h6 className="text-danger error">Please give a limit</h6>}
                  </div> */}
                  {type.includes("inperson") && <div className="col-md-12">
                    <label className="form-label" htmlFor="location">
                        Location
                    </label>
                    <input
                      id="location"
                      className="form-control description_inputf mb-4 mt-2"
                      placeholder="e.g. 123 Street, City, State, Zip code"
                      onChange={e => setlocation(e.target.value)}
                    />
                    {error && !location && <h6 className="text-danger error">Please give a location</h6>}
                  </div>}
                  {type.includes("phone") && <div className="col-md-12">
                    <label className="form-label" htmlFor="phone">
                        Phone
                    </label>
                    <input
                      id="phone"
                      className="form-control description_inputf mb-4 mt-2"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={e => (e.target.value>=0 && e.target.value<999_999_999_999_999) && setphone(e.target.value)}
                    />
                    {error && !phone && <h6 className="text-danger error">Please enter a phone number</h6>}
                  </div>}
                </div>

                <hr />
                <div className="d-flex justify-content-between mt-2">
                  {/* <button className="btn btn-primary btn-custom-light" onClick={() => navigate(-1)} type="button">
                    cancel
                  </button>
                  <button className="btn btn-primary btn-custom " type="submit">
                    Add Service
                  </button> */}

                  <div style={{ pointerEvents: isLoading ? 'none' : 'auto', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9' }} className="pointer description_btnsave d-flex justify-content-center align-items-center mx-0" onClick={() => !isLoading && navigate(-1)}>Cancel</div>
                  <Button isLoading={isLoading} type="submit" text={'Add Service'} style={{ pointerEvents: isLoading ? 'none' : 'auto'}} className="description_btnsave mx-0" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndividualSession;
