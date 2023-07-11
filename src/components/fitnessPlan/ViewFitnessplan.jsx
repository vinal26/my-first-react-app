import React, { useState, useEffect } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Select, { components } from "react-select";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router-dom";
import { recipeTags } from "../../Utils/AllConstant";
import { IoIosArrowBack } from "react-icons/io";
import { GrPlan } from "react-icons/gr";
import {
  updateFitnessPlanService,
  getFitnessPlanListService,
  getExerciseListService,
  addFitnessPlanDaysService,
  addfitnessPlanDetailService,
} from "../../services/CreateCarePlanService";
import { toastMsg } from "../../Utils/AllConstant";
import { TabList, TabPanel, Tabs, Tab } from "react-tabs";
import Loader from "../../commonComponent/Loader";
import { showToastSuccess } from "../../Utils/Helper";
import { Link } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";
import { BlogEditorComponent } from "../blog/BlogEditor";
import { useAuth } from "../../Context/AuthContext";
import ApiConfig from "../../config/ApiConfig";

const ViewFitnessplan = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { isAdmin } = useAuth();
  const [fitnessPlanList, setFitnessPlanList] = useState([]);
  const fitnessPlanId = params.get("fitnessplanId");
  const [selectedTab, setSelectedTab] = useState(
    parseInt(params.get("tab") ? params.get("tab") : 0)
  );
  const [updateFitnessPlan, setUpdateFitnessPlan] = useState({
    planName: "",
    description: "",
    tags: "",
  });

  const [selectedFitnessPlan, setSelectedFitnessPlan] = useState("");
  //   const [mealPlanDetail, setMealPlanDetail] = useState("");
  const [fitnessPlanDetail, setFitnessPlanDetail] = useState("");
  const [isLoading, setLoader] = useState(true);
  const [selectedExerciseList, setSelectedExerciseList] = useState("");
  const [exerciseList, setExerciseList] = useState([]);
  const [selectedExerciseCategoryModel, setSelectedExerciseCategoryModel] =
    useState("");
  const [error, setError] = useState(false);
  //   const [mealPlanNameAvailable, setMealPlanNameAvailable] = useState(false);

  const [saveFitnessplan, setSaveFitnessplan] = useState([]);

  useEffect(() => {
    getFitnessPlanList("firstTimeOnly");
  }, []);

  const getFitnessPlanList = async (firstTimeOnly) => {
    try {
      const response = await getFitnessPlanListService();
      setLoader(false);
      if (response) {
        setFitnessPlanList(response.data || []);
        if (fitnessPlanId && firstTimeOnly) {
          const fitnessPlan = response.data?.find(
            (item) => item._id === fitnessPlanId
          );

          setSaveFitnessplan(fitnessPlan);

          setFitnessPlanDetail(fitnessPlan.fitness);

          setSelectedFitnessPlan({
            value: fitnessPlanId,
            label: fitnessPlan.planName,
          });

          setUpdateFitnessPlan({
            planName: fitnessPlan.planName,
            description: fitnessPlan.description,
            tags: fitnessPlan.tags,
          });

          // getMealPlanDetail(fitnessPlanId);
          //   setSelectedTab(0)
        }
      }
    } catch (error) {
      setLoader(false);
    }
  };

  //   const getMealPlanDetail = async (mealPlanId) => {
  //     try {
  //       const response = await getMealPlanDetailService(mealPlanId);
  //       if (response) {
  //         setFitnessPlanDetail(response?.[0]?.mealPlan);
  //       }
  //     } catch (error) {}
  //   };

  const renderTabList = () => {
    return (
      <TabList className="mealcustom-list">
        {saveFitnessplan?.fitness?.map((item) => {
          return <Tab>{"Day " + item.day}</Tab>;
        })}
      </TabList>
    );
  };

  const renderTabPanel = () => {
    return fitnessPlanDetail?.map((item) => {
      return (
        <TabPanel>
          <div className="row">
            {renderTabItem(item?.warmup, item?.day, "warmup", "Warm Up")}
            {renderTabItem(item?.exercise, item?.day, "exercise", "Exercise")}
            {renderTabItem(item?.warmdown, item?.day, "warmdown", "Warm Down")}
          </div>
        </TabPanel>
      );
    });
  };

  const renderTabItem = (items, day, category, title) => {
    return (
      <div className="col-md-12 pb-4">
        <div className="card shadow border-0 p-3 d-flex h-100">
          <div className="d-flex justify-content-between mb-4">
            <h5 className="card-title">{title}</h5>
          </div>
          {items?.length ? (
            items?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="d-flex mb-3 px-3 align-items-center flex-row py-2 card"
                >
                  <div className="d-flex align-items-center">
                  <img
                      src={
                        item.thumbnail &&
                        ApiConfig.ImageUrl +
                        "posts/" +
                        item.userId +
                        "/thumbnail/" +
                        item.thumbnail
                      }
                      onError={(e) => {
                        e.target.src = "images/cookie.png"; //replacement image imported above
                      }}
                      className="recipe_image_ me-4"
                      alt=""
                    />
                    <p className="m-0 text-capitalize">{item.name}</p>
                  </div>
                  {
                    <>
                      <div style={{ position: "absolute", right: "15px" }}>
                        <Link
                          className="eye_viewmplan"
                          to={`/viewexercise?exerciseId=${item._id}`}
                        >
                          <BsFillEyeFill className="icon" />
                        </Link>
                      </div>
                    </>
                  }
                </div>
              );
            })
          ) : (
            <div className="d-flex mb-3 px-3 align-items-center justify-content-center flex-row py-2">
              <p className="m-0 text-capitalize text-secondary">
                Add new exercise...
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };
  const addfitnessPlanDetail = async () => {
    try {
      let params = {};
      const selectedRecipeResult = selectedExerciseList?.map((list) => {
        const recipe = exerciseList?.data?.find(
          (item) => item._id === list.value
        );
        return recipe;
      });
      const selectedRecipeResultId = selectedRecipeResult?.map((list) => {
        return list._id;
      });

      params = {
        planId: selectedFitnessPlan.value,
        day: selectedExerciseCategoryModel.day,
        [selectedExerciseCategoryModel.category]: [...selectedRecipeResultId],
      };

      const response = await addfitnessPlanDetailService(params);
      if (response) {
        showToastSuccess(response);
        // getFitnessPlanList();
      }
    } catch (error) {}
  };

  const renderModelAddRecipe = () => {
    return (
      <div
        className="modal fade"
        id="recipelist"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content chooselist_mdiv8">
            <div className="modal-header px-4">
              <h5 className="modal-title text-center">Add New Exercise </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
              <div className="row">
                <div className="col-md-12 recipe-select">
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    value={selectedExerciseList}
                    placeholder="Please Select Recipes"
                    options={formatList(exerciseList, "_id", "name")}
                    onChange={(data) => setSelectedExerciseList(data)}
                  />

                  <button
                    onClick={() =>
                      selectedExerciseList.length === 1 &&
                      addfitnessPlanDetail()
                    }
                    className="btn btn-primary btn-lg w-100 mb-4"
                    data-bs-dismiss="modal"
                    style={{
                      backgroundColor:
                        selectedExerciseList?.length === 1
                          ? "#0956C6"
                          : "#d2d2d2",
                      borderColor:
                        selectedExerciseList?.length === 1
                          ? "#0956C6"
                          : "#d2d2d2",
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getFitnessPlanExercise = async (category, day, mealPlan) => {
    try {
      setSelectedExerciseCategoryModel({ category, day, mealPlan });
      const response = await getExerciseListService({
        category,
        recipeArray: mealPlan || [],
      });
      if (response) {
        setExerciseList(response);
      }
    } catch (error) {}
  };

  const formatList = (list, valueKey, labelKey) => {
    const result = list?.data?.map((item) => {
      return {
        value: item[valueKey],
        label: item[labelKey],
      };
    });
    return result || [];
  };

  const addFitnessPlanDays = async () => {
    try {
      const response = await addFitnessPlanDaysService({
        fitnessId: selectedFitnessPlan.value,
      });
      if (response) {
        showToastSuccess("Day added successfully.");
        // getMealPlanDetail(selectedFitnessPlan.value);
      }
    } catch (error) {}
  };

  // const getMealPlanNameAvailable = async (str) => {
  //   try {
  //     setMealPlanName(str);
  //     if (str) {
  //       const response = await getMealPlanAvailableService(str?.toLowerCase());
  //       if (response) {
  //         setMealPlanNameAvailable(true);
  //       }
  //     } else {
  //       setMealPlanNameAvailable(false);
  //     }
  //   } catch (error) {
  //     setMealPlanNameAvailable(false);
  //   }
  // };

  const onChangeDetail = (key, value) => {
    setUpdateFitnessPlan({ ...updateFitnessPlan, [key]: value });
  };

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
              <div className="row">
                <div className="col-md-6">
                  <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                      <li
                        class="breadcrumb-item  cursor-pointer"
                        onClick={() => navigate("/mylibrary")}
                      >
                        My Library
                      </li>
                      <li
                        class="breadcrumb-item cursor-pointer"
                        aria-current="page"
                        onClick={() => navigate(-1)}
                      >
                        Fitness
                      </li>

                      <li
                        class="breadcrumb-item active fw-bold"
                        aria-current="page"
                      >
                        Fitness Plan
                      </li>
                    </ol>
                  </nav>
                </div>

                <div className="col-md-6"></div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="card shadow border-0 p-3 viewmeal_head88">
                    <h4>
                      {updateFitnessPlan.planName ? (
                        <>
                          <GrPlan className="icon" />{" "}
                          {updateFitnessPlan.planName}{" "}
                        </>
                      ) : null}
                    </h4>
                    <p className="viewmeal_desp88">
                      {updateFitnessPlan.description}
                    </p>
                    <p className="viewmeal_tags88">
                      {updateFitnessPlan.tags ? (
                        <>
                          Tags : <span>{updateFitnessPlan.tags}</span>
                        </>
                      ) : null}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="col-md-12">
                  {selectedFitnessPlan?.value && fitnessPlanDetail ? (
                    <Tabs
                      selectedIndex={selectedTab}
                      onSelect={(index) => setSelectedTab(index)}
                    >
                      {renderTabList()}

                      {renderTabPanel()}
                    </Tabs>
                  ) : (
                    <Loader
                      visible={false}
                      emptyTextKey={"pleaseSelecFitnessPlan"}
                    />
                    // null
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {renderModelAddRecipe()}
    </>
  );
};

export default ViewFitnessplan;
