import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ExerciseItem from "./ExerciseItem";
import FitnessPlanItem from "./FitnessPlanItem";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { FiSearch } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import {
  getExerciseListService,
  getFitnessPlanListService,
} from "../../services/CreateCarePlanService";
import { useAuth } from "../../Context/AuthContext";
import { addFitnessPlanService } from "../../services/CreateCarePlanService";
import { showToastSuccess , isEmpty } from "../../Utils/Helper";

const FitnessPlan = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { isAdmin } = useAuth();
  const [isLoading, setLoader] = useState(true);
  const [filterdata, setFilterData] = useState([]);
  const [filterdata2, setFilterData2] = useState([]);
  const [planName, setPlanName] = useState("");
  const [selectedTab, setSelectedTab] = useState(
    parseInt(params.get("tab") ? params.get("tab") : 0)
  );

  const [exerciseList, setExerciseList] = useState([]);
  const [fitnessPlanList, setFitnessPlanList] = useState([]);
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   navigate({
  //     search: `?tab=${selectedTab}`,
  //   });
  // }, [selectedTab]);

  useEffect(() => {
    getExerciseList();
    getFitnessPlanList();
  }, []);

  const getExerciseList = async () => {
    try {
      const response = await getExerciseListService();
      setLoader(false);
      if (response) {
        setExerciseList(response.data || []);
        setFilterData(response.data || []);
        // if (mealPlanId && firstTimeOnly) {
        //   const mealPlan = response?.find((item) => item._id === mealPlanId);
        //   setSelectedMealPlan({ value: mealPlanId, label: mealPlan.mealPlanName });
        //   getMealPlanDetail(mealPlanId);
        //   // setSelectedTab(0)
        // }
      }
    } catch (error) {
      // setLoader(false)
    }
  };

  const getFitnessPlanList = async () => {
    try {
      const response = await getFitnessPlanListService();
      setLoader(false);
      if (response) {
        // console.log(response, "response");
        setFitnessPlanList(response.data || []);
        setFilterData2(response.data || []);
      }
    } catch (error) {
      // setLoader(false)
    }
  };

  const onChangeSearchText = async (e) => {
    let searchWord = e.target.value;
    const result = exerciseList?.filter((value) => {
      if (value) {
        return value?.name?.toLowerCase()?.includes(searchWord?.toLowerCase());
      }
    });

    if (searchWord === "") {
      setFilterData(exerciseList);
      // getForumsById(searchWord);
    } else {
      setFilterData(result);
    }
  };

  const onChangeSearchTextNew = async (e) => {
    let searchWord = e.target.value;
    const result = fitnessPlanList?.filter((value) => {
      if (value) {
        return value?.planName
          ?.toLowerCase()
          ?.includes(searchWord?.toLowerCase());
      }
    });

    if (searchWord === "") {
      setFilterData2(fitnessPlanList);
      // getForumsById(searchWord);
    } else {
      setFilterData2(result);
    }
  };

  const renderSearchHeader = () => {
    return (
      <div className="d-flex mt-5 mb-3">
        <div className="w-50">
          <h4>Fitness </h4>
          <p>View and add exercise plans and workouts for your clients!</p>
        </div>
        {selectedTab === 0 ? (
          <div className="w-50 d-flex">
            <div className="actsearch_simple me-2">
              <FiSearch className="boxicon" />
              <input
                placeholder="Search Exercise Name here..."
                className="ms-2"
                onChange={(e) => onChangeSearchText(e)}
              />
            </div>
            {isAdmin ? (
              <Link to="/addnewexercise" className="link_text">
                <button className="btn btn-primary btn-custom">
                  <AiOutlinePlusCircle className="me-2" /> Add New Exercise
                </button>
              </Link>
            ) : null}
          </div>
        ) : (
          <div className="w-50 d-flex">
            <div className="actsearch_simple me-2">
              <FiSearch className="boxicon" />
              <input
                placeholder="Search Fitness Plan Name here..."
                className="ms-2"
                onChange={(e) => onChangeSearchTextNew(e)}
              />
            </div>

            <button
              className="btn btn-primary btn-custom"
              onClick={() => {
                setPlanName("");
              }}
              data-bs-toggle="modal"
              data-bs-target="#addmealplan"
            >
              <AiOutlinePlusCircle className="me-2" /> Add New Fitness Plan
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderModelFitnessPlanName = () => {
    return (
      <div
        className="modal fade"
        id="addmealplan"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content chooselist_mdiv8">
            <div className="modal-header px-4">
              <h5 className="modal-title text-center">Add New Fitness Plan</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
              <div className="row">
                <div className="col-md-12">
                  <input
                    className="mealplan_input"
                    type="text"
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value)}
                    placeholder="Enter fitness plan name here"
                  />
                  {error && !planName ? (
                    <h6
                      style={{ marginTop: 10, marginBottom: "-6px" }}
                      className="error_alert_text4 LifeStyleSearchInput"
                    >
                      {`fitness plan name taken`}
                    </h6>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="modal-footer px-3">
              <button
                data-bs-dismiss="modal"
                onClick={() => !isEmpty(planName) && planName && addFitnessPlanName()}
                className="btn btn-primary btn-lg w-100"
                style={{
                  backgroundColor: !isEmpty(planName) && planName ? "#1f7e78" : "#d2d2d2",
                  borderColor: !isEmpty(planName) && planName ? "#1f7e78" : "#d2d2d2",
                }}
              >
                {"Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const addFitnessPlanName = async () => {
    try {
      if (!planName) {
        setError(true);
      } else {
        setError(false);
        const params = {
          planName: planName.toLocaleLowerCase(),
        };

        const response = await addFitnessPlanService(params);
        setLoader(false);
        console.log(response);
        setPlanName("");
        if (response) {
          navigate(`/createfitnessplan?fitnessplanId=${response.insertedId}`);
          showToastSuccess("fitness plan successfully added.");
        }
      }
    } catch (error) {
      setLoader(false);
    }
  };

  useEffect(() => {
    navigate({
        search: `?tab=${selectedTab}`
    });

}, [selectedTab])
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 py-4 px-5">
            <div className="row">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li
                    class="breadcrumb-item  cursor-pointer"
                    onClick={() => navigate("/mylibrary")}
                  >
                    My Library
                  </li>
                  <li
                    class="breadcrumb-item active fw-bold"
                    aria-current="page"
                  >
                    Fitness
                  </li>
                </ol>
              </nav>
              {renderSearchHeader()}

              <div>
                <Tabs
                  selectedIndex={selectedTab}
                  onSelect={(index) => setSelectedTab(index)}
                >
                  <TabList>
                    <Tab>Exercises </Tab>
                    <Tab>Fitness Plan</Tab>
                  </TabList>
                  <TabPanel>
                    <ExerciseItem
                      exerciseList={filterdata}
                      isLoading={isLoading}
                      isAdmin={isAdmin}
                      getExerciseList={getExerciseList}
                    />
                  </TabPanel>
                  <TabPanel>
                    <FitnessPlanItem
                      fitnessPlanList={filterdata2}
                      isLoading={isLoading}
                      getFitnessPlanList={getFitnessPlanList}
                    />
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
      {renderModelFitnessPlanName()}
    </>
  );
};

export default FitnessPlan;
