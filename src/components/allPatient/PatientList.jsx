import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPatientList } from "../../Reducer/actions/patientAction";
import { getPatientList } from "../../services/PatientService";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Loader from "../../commonComponent/Loader";
import { useAuth } from "../../Context/AuthContext";
import ApiConfig from "../../config/ApiConfig";

const PatientList = (props) => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [patientLists, setPatientLists] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [isLoading, setLoader] = useState(true);
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.patient.patientLists);

  useEffect(() => {
    getPatientLists();
  }, []);

  useEffect(() => {
    if(props.imported) getPatientLists();
  }, [props.imported]);

  useEffect(() => {
    props.getList && updatePatientLists();
  }, [props.getList]);

  useEffect(() => {
    onPatientSearch(props.search)
  }, [props.search])
  

  const onPatientSearch = async (word) => {
    try {

      let searchWord = word;
      const result = patientLists.filter((value) => {
        if (value) {
          return (
            value?.full_name
              ?.toLowerCase()
              ?.includes(searchWord?.toLowerCase()) ||
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
    } catch (e) {
      console.log("user not found");
    }
  };

  const activeSelection = (e) => {
    const activeTab = document.querySelector(
      ".react-tabs__tab-list li:first-child"
    );
    if (activeTab) activeTab.click();

    const active = document.querySelector(".memlist_scroll .active");

    if (active) active.classList.remove("active");

    e.target.classList.add("active");
  };

  const getPatientLists = async (searchWord) => {
    try {
      const response = await getPatientList(searchWord);
      setLoader(false);
      if (response.status === 200) {
        setPatientLists((response?.data?.data).sort(function (a, b) {
            if ((a.full_name).toLowerCase() < (b.full_name).toLowerCase()) {
              return -1;
            }
            if ((a.full_name).toLowerCase() > (b.full_name).toLowerCase()) {
              return 1;
            }
            return 0;
          }));
        setFilterData((response?.data?.data).sort(function (a, b) {
            if ((a.full_name).toLowerCase() < (b.full_name).toLowerCase()) {
              return -1;
            }
            if ((a.full_name).toLowerCase() > (b.full_name).toLowerCase()) {
              return 1;
            }
            return 0;
          }));
        // props.onselectpatient(
        //   response?.data?.data[(response?.data?.data).length - 1]
        // );
        // dispatch(setPatientList(response.data.data.reverse()));
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const updatePatientLists = async () => {
    try {
      const searchWord = document.getElementById("search_word").value;
      const response = await getPatientList();
      if (response.status === 200) {
        setPatientLists((response?.data?.data).reverse());

        if (searchWord != "") {
          const result = (response?.data?.data).filter((value) => {
            if (value) {
              return (
                value?.full_name
                  ?.toLowerCase()
                  ?.includes(searchWord?.toLowerCase()) ||
                value?.first_name
                  ?.toLowerCase()
                  ?.includes(searchWord?.toLowerCase()) ||
                value?.last_name
                  ?.toLowerCase()
                  ?.includes(searchWord?.toLowerCase())
              );
            }
          });
          setFilterData(result);
        } else {
          setFilterData(response?.data?.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <>
      <div style={{ height: "400px" }}>
        {/* <div className={isAdmin ? "custom_changesearch me-2" : "custom_changesearch me-2 withl_dummy"} >
          <FiSearch className="boxicon" />
          <input
            placeholder="Search Patient Name here..."
            className="ms-2"
            id="search_word"
            onChange={(e) => onPatientSearch(e)}
          />
        </div> */}
        {isLoading ? (
          <center>
            {/* <div
                    style={{
                      width: "3rem", height: "3rem", color: "#1f7e78", top: "110px",
                      position: "relative"
                    }}
                    class="spinner-border mt-3 mb-4"
                    role="status"
                  /> */}

            <Loader
              visible={isLoading}
              style={{ top: "48px", position: "relative" }}
            />
          </center>
        ) : filterdata?.length ? (
          filterdata.map((dt, index) => {
            return (
              <div
                key={dt._id}
                className="card shadow-sm border-0 mb-3 p-3 d-flex flex-md-row justify-content-between"
              >
                <div className="d-flex align-items-center">

                {dt?.profilePicture ? <img
                    src={`${ApiConfig.ImageUrl}user/${dt?._id}/${dt?.profilePicture}`}
                    className="recipe_image_ me-4"
                    alt=""
                  /> : <img
                  src="images/avatar.png"
                  className="recipe_image_ me-4"
                  alt=""
                  />}


                  
                  <p className="m-0">{`${dt.full_name}`}</p>
                </div>
                <div className="d-flex justify-content-around align-items-center">
                  <Link
                    className="btn btn-primary btn-custom-light ms-3"
                    to="/allpatientinfo"
                    state={{ user: dt }}
                  >
                    <span>
                      <AiOutlineEye className="me-2" />
                      View
                    </span>
                  </Link>
                  <Link
                    className="btn btn-primary btn-custom-light ms-3"
                    to="/editpatient"
                    state={{ user: dt }}
                  >
                    <span>
                      <RiEdit2Fill className="me-2" />
                      Edit
                    </span>
                  </Link>
                  {/* <Link className="btn btn-primary btn-custom-light ms-3" to={`/EditRecipe?recipeId=${dt._id}`}>
            <span><RiEdit2Fill className="me-2" />Edit</span>
          </Link> */}
                </div>
              </div>
            );
          })
        ) : (
          <div class="card px-3 py-4">
            <h2 class="text-green text-center mx-5 mb-4">
              Hi, Doctor! let’s begin connecting with your clients .
            </h2>
            <p class="text-green text-center">
              Click on the button above to add new patient or here.
            </p>
          </div>
        )}
      </div>

      {/* <div className="memberside_list mt-2" style={{ height: "486px" }}>
        <div className="row">
          <div className="col-md-12 d-flex">
            <div className="actsearch_box1">
              <FiSearch className="boxicon" />
              <input
                placeholder="Search Patients"
                id="search_word"
                onChange={(e) => onPatientSearch(e)}
              />
            </div>
            <Link
              to="/addnewpatient"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Add New Patient"
            >
              <BsFillPlusCircleFill className="member_plusadd_new" />
            </Link>
          </div>

          <div className="col-md-12">
            <div className="memlist_scroll mt-4 spacing_scroll">
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

                  <Loader
                    visible={isLoading}
                    style={{ top: "48px", position: "relative" }}
                  />
                </center>
              ) : filterdata?.length ? (
                filterdata.map((dt, index) => {
                  return (
                    <div
                      key={dt._id}
                      // className={`card mb-2 p-1 ${index == 0 ? "active" : ""}`}
                      className={`card mb-2 p-1 ${props?.selectedPatient?._id == dt?._id ? "active" : ""}`}
                      onClick={(e) => {
                        props.onselectpatient(dt);
                        // activeSelection(e);
                      }}
                      id={dt._id}
                    >
                      <div className="row">
                        <div className="col-md-4 p-0 actlist_wid1 d-flex justify-content-center align-items-center">
                          <img
                            src={dt.profilePicture && dt.profilePicture}
                            onError={(e) => {
                              e.target.src = "images/avatar.png" //replacement image imported above
                            }}
                            alt=""
                            className="member_listimage"
                          />
                        </div>
                        <div className="col-md-8 actlist_wid2 p-0">
                          <p className="mb-0 py-3">{`${dt.full_name}`}</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <h4 class="mt-5 text-center message_headfour34">Please add patient...</h4>

              )}
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default PatientList;
