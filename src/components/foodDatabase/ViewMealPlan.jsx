import React, { useState, useEffect } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Select, { components } from "react-select";
import { GrPlan } from "react-icons/gr";
import { useNavigate, useSearchParams } from "react-router-dom";
import { recipeTags } from "../../Utils/AllConstant";
import {
  addMealPlanDetailService,
  addMealPlanService,
  getMealPlanAvailableService,
  getMealPlanDetailService,
  getMealPlanListService,
  getRecipeListService,
  updateMealPlanService,
} from "../../services/MealService";
import { toastMsg } from "../../Utils/AllConstant";
import { TabList, TabPanel, Tabs, Tab } from "react-tabs";
import Loader from "../../commonComponent/Loader";
import { showToastSuccess } from "../../Utils/Helper";
import { Link } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";
import { BlogEditorComponent } from "../blog/BlogEditor";
import { useAuth } from "../../Context/AuthContext";
import ApiConfig from "../../config/ApiConfig";

const ViewMealPlan = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { isAdmin } = useAuth();
  const [mealPlanList, setMealPlanList] = useState([]);
  const mealPlanId = params.get("mealplanId");
  const [selectedTab, setSelectedTab] = useState(
    parseInt(params.get("tab") ? params.get("tab") : 0)
  );
  const [updateMealPlan, setUpdateMealPlan] = useState({
    mealPlanName: "",
    description: "",
    tags: [],
  });

  const [selectedMealPlan, setSelectedMealPlan] = useState("");
  const [mealPlanDetail, setMealPlanDetail] = useState("");
  const [isLoading, setLoader] = useState(true);
  const [selectedRecipeList, setSelectedRecipeList] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const [selectedRecipeCategoryModel, setSelectedRecipeCategoryModel] =
    useState("");
  const [error, setError] = useState(false);
  const [mealPlanName, setMealPlanName] = useState("");
  const [mealPlanNameAvailable, setMealPlanNameAvailable] = useState(false);

  useEffect(() => {
    getMealPlanList("firstTimeOnly");
  }, []);

  console.log(updateMealPlan);

  const getMealPlanList = async (firstTimeOnly) => {
    try {
      const response = await getMealPlanListService();
      setLoader(false);
      if (response) {
        setMealPlanList(response || []);
        if (mealPlanId && firstTimeOnly) {
          const mealPlan = response?.find((item) => item._id === mealPlanId);
          setSelectedMealPlan({
            value: mealPlanId,
            label: mealPlan.mealPlanName,
          });

          setUpdateMealPlan({
            mealPlanName: mealPlan.mealPlanName,
            description: mealPlan.description,
            tags: mealPlan.tags,
          });

          getMealPlanDetail(mealPlanId);
          //   setSelectedTab(0)
        }
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const getMealPlanDetail = async (mealPlanId) => {
    try {
      const response = await getMealPlanDetailService(mealPlanId);
      if (response) {
        setMealPlanDetail(response?.[0]?.mealPlan);
      }
    } catch (error) { }
  };
  const renderTabList = () => {
    return (
      <TabList className="mealcustom-list">
        {mealPlanDetail?.map((item) => {
          return <Tab>{"Day " + item.day}</Tab>;
        })}
      </TabList>
    );
  };

  const renderTabPanel = () => {
    return mealPlanDetail?.map((item) => {
      return (
        <TabPanel>
          <div className="row">
            {renderTabItem(item.breakfast, item.day, "breakfast", "Breakfast")}
            {renderTabItem(item.lunch, item.day, "lunch", "Lunch")}
            {renderTabItem(item.dinner, item.day, "dinner", "Dinner")}
            {renderTabItem(item.snacks, item.day, "snacks", "Snacks")}
          </div>
        </TabPanel>
      );
    });
  };

  const renderTabItem = (items, day, category, title) => {
    return (
      <div className="col-md-6 pb-4">
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
                      src={ApiConfig.recipeImageUrl + item.createdBy + "/" + item.recipeImage}
                      onError={(e) => {
                        e.target.src = "images/cookie.png"; //replacement image imported above
                      }}
                      className="recipe_image_ me-4"
                      alt=""
                    />
                    <p className="m-0 text-capitalize">{item.recipeName}</p>
                  </div>
                  {
                    <>
                      <div style={{ position: "absolute", right: "15px" }}>
                        <Link
                          className="eye_viewmplan"
                          to={`/viewrecipe?recipeId=${item._id}`}
                          state={{ "mealplan": true }}
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
                Add new recipe...
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const getMealPlanRecipe = async (category, day, mealPlan) => {
    try {
      setSelectedRecipeCategoryModel({ category, day, mealPlan });
      const response = await getRecipeListService({
        category,
        recipeArray: mealPlan || [],
      });
      if (response) {
        setRecipeList(response);
      }
    } catch (error) { }
  };

  const formatList = (list, valueKey, labelKey) => {
    const result = list?.map((item) => {
      return {
        value: item[valueKey],
        label: item[labelKey],
      };
    });
    return result || [];
  };

  const addMealPlanName = async () => {
    try {
      const params = {
        mealPlanName: mealPlanName.toLocaleLowerCase(),
        mealfile: "mealfile",
      };
      const response = await addMealPlanService(params);
      setLoader(false);
      setMealPlanName("");
      if (response) {
        getMealPlanList();
        showToastSuccess("Meal plan successfully added.");
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const getMealPlanNameAvailable = async (str) => {
    try {
      setMealPlanName(str);
      if (str) {
        const response = await getMealPlanAvailableService(str?.toLowerCase());
        if (response) {
          setMealPlanNameAvailable(true);
        }
      } else {
        setMealPlanNameAvailable(false);
      }
    } catch (error) {
      setMealPlanNameAvailable(false);
    }
  };

  const addMealPlanDetail = async () => {
    try {
      let params = {};
      const selectedRecipeResult = selectedRecipeList?.map((list) => {
        // console.log(list, "item")
        const recipe = recipeList?.find((item) => item._id === list.value);
        return recipe;
      });
      const selectedRecipeResultId = selectedRecipeResult?.map((list) => {
        return list._id;
        // console.log(list._id, "item3")
      });
      // console.log(selectedRecipeResultId, "item1")
      params = {
        mealPlanId: selectedMealPlan.value,
        day: selectedRecipeCategoryModel.day,
        [selectedRecipeCategoryModel.category]: [...selectedRecipeResultId],
      };
      const response = await addMealPlanDetailService(params);
      if (response) {
        showToastSuccess(response);
        getMealPlanDetail(selectedMealPlan.value);
      }
    } catch (error) { }
  };

  const onChangeDetail = (key, value) => {
    setUpdateMealPlan({ ...updateMealPlan, [key]: value });
  };

  const getRecipeTags = () => {
    const result = recipeTags.map((item) => {
      return {
        label: item,
        value: item,
      };
    });
    return result || [];
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
                        class="breadcrumb-item cursor-pointer"
                        onClick={() => navigate(-1)}
                      >
                        Meal Plans
                      </li>
                      <li class="breadcrumb-item active fw-bold">Meal Plan View</li>
                    </ol>
                  </nav>
                </div>

                <div className="col-md-6"></div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="card shadow border-0 p-3 viewmeal_head88">
                    <h4>
                      {updateMealPlan.mealPlanName ? (
                        <>
                          <GrPlan className="icon" />{" "}
                          {updateMealPlan.mealPlanName}{" "}
                        </>
                      ) : null}
                    </h4>
                    {/* <p className="viewmeal_desp88">
                      {updateMealPlan.description}
                    </p> */}
                    <p className="viewmeal_tags88">
                      {updateMealPlan.tags.length ? "Tags :" : null}{" "}
                      {updateMealPlan.tags.map((dt) => (
                        <span>{dt.length > 0 ? dt + "," : dt} </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="col-md-12">
                  {selectedMealPlan?.value && mealPlanDetail ? (
                    <Tabs
                    //   selectedIndex={selectedTab}
                    //   onSelect={(index) => setSelectedTab(index)}
                    >
                      {renderTabList()}

                      {renderTabPanel()}
                    </Tabs>
                  ) : (
                    <Loader
                      visible={false}
                      emptyTextKey={"pleaseSelectMealPlan"}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewMealPlan;
