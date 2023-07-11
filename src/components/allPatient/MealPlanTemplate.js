import React, { useState, useEffect, useRef } from "react";
import Creatable from 'react-select/creatable';
import Select, { components } from 'react-select';
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "../appointment/style.css";
import "./style.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { TabList, TabPanel, Tabs, Tab } from "react-tabs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { addMealPlanDaysService, addMealPlanDetailService, addMealPlanService, getMealPlanAvailableService, getMealPlanDetailService, getMealPlanListService, getRecipeListService } from "../../services/MealService";
import { showToastSuccess } from "../../Utils/Helper";
import Loader from "../../commonComponent/Loader";
import { GoPrimitiveDot } from "react-icons/go";
import { useAuth } from "../../Context/AuthContext";

const MealPlanTemplate = () => {
  const { isAdmin } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const mealPlanId = location?.state?.mealPlanId;
  const selectInputRef = useRef();
  const [mealPlanList, setMealPlanList] = useState([]);
  const [recipeList, setRecipeList] = useState([]);
  const [selectedRecipeList, setSelectedRecipeList] = useState('');
  const [selectedRecipeCategoryModel, setSelectedRecipeCategoryModel] = useState('');

  const [mealPlanDetail, setMealPlanDetail] = useState('');
  const [selectedMealPlan, setSelectedMealPlan] = useState('');
  const [mealPlanName, setMealPlanName] = useState('');
  const [mealPlanNameAvailable, setMealPlanNameAvailable] = useState(false);

  const [isLoading, setLoader] = useState(true);
  const [params] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState(parseInt(params.get("tab") ? params.get("tab") : 0));

  // useEffect(() => {
  //   navigate({
  //     search: `?tab=${selectedTab}`
  //   });

  // }, [selectedTab]);

  useEffect(() => {
    getMealPlanList('firstTimeOnly');
  }, [])

  const getMealPlanList = async (firstTimeOnly) => {
    try {
      const response = await getMealPlanListService();
      setLoader(false)
      if (response) {
        setMealPlanList(response || []);
        if (mealPlanId && firstTimeOnly) {
          const mealPlan = response?.find((item) => item._id === mealPlanId);
          setSelectedMealPlan({ value: mealPlanId, label: mealPlan.mealPlanName });
          getMealPlanDetail(mealPlanId);
          setSelectedTab(0)
        }
      }
    } catch (error) {
      setLoader(false)
    }
  }

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
  }

  const addMealPlanName = async () => {
    try {
      const params = {
        mealPlanName: mealPlanName.toLocaleLowerCase(),
        "mealfile": "mealfile"
      }
      const response = await addMealPlanService(params);
      setLoader(false);
      setMealPlanName('');
      if (response) {
        getMealPlanList();
        showToastSuccess("Meal plan successfully added.")
      }
    } catch (error) {
      setLoader(false)
    }
  }

  const getMealPlanDetail = async (mealPlanId) => {
    try {
      const response = await getMealPlanDetailService(mealPlanId);
      if (response) {
        setMealPlanDetail(response?.[0]?.mealPlan)
      }
    } catch (error) {
    }
  }

  const addMealPlanDays = async () => {
    try {
      const response = await addMealPlanDaysService({ mealPlanId: selectedMealPlan.value });
      if (response) {
        showToastSuccess("Day added successfully.")
        getMealPlanDetail(selectedMealPlan.value);
      }
    } catch (error) {
    }
  }

  const addMealPlanDetail = async () => {
    try {
      let params = {}
      const selectedRecipeResult = selectedRecipeList?.map((list) => {
        // console.log(list, "item")
        const recipe = recipeList?.find((item) => item._id === list.value);
        return recipe;
      })
      const selectedRecipeResultId = selectedRecipeResult?.map((list) => {
        return list._id
        // console.log(list._id, "item3")
      })
      // console.log(selectedRecipeResultId, "item1")
      params = {
        "mealPlanId": selectedMealPlan.value,
        "day": selectedRecipeCategoryModel.day,
        [selectedRecipeCategoryModel.category]: [
          ...selectedRecipeResultId,
          ...selectedRecipeCategoryModel?.mealPlan
        ],
      };
      // console.log(params, "params")
      const response = await addMealPlanDetailService(params);
      if (response) {
        showToastSuccess(response)
        getMealPlanDetail(selectedMealPlan.value);
      }
    } catch (error) {
    }
  }

  const removeMealPlanDetail = async (category, day, itemIndex) => {
    try {
      let params = {}
      const removedItemResult = mealPlanDetail[selectedTab]?.[category].splice(itemIndex, 1)
      const leftRecipeResultId = mealPlanDetail[selectedTab]?.[category]?.map((list) => {
        return list._id
        // console.log(list._id, "item3")
      })
      params = {
        "mealPlanId": selectedMealPlan.value,
        "day": day,
        [category]: leftRecipeResultId,
      };

      const response = await addMealPlanDetailService(params);
      if (response) {
        showToastSuccess(response)
        getMealPlanDetail(selectedMealPlan.value);
      }
    } catch (error) {
    }
  }


  const getMealPlanRecipe = async (category, day, mealPlan) => {
    try {
      setSelectedRecipeCategoryModel({ category, day, mealPlan })
      const response = await getRecipeListService({ category, recipeArray: mealPlan || [] });
      if (response) {
        setRecipeList(response)
      }
    } catch (error) {
    }
  }

  const selectMealPlan = (item) => {
    setSelectedMealPlan(item);
    getMealPlanDetail(item.value);
    setSelectedTab(0)
  }

  const formatList = (list, valueKey, labelKey) => {
    const result = list?.map((item) => {
      return ({
        value: item[valueKey],
        label: item[labelKey],
      })
    })
    return result || []
  }

  const NoOptionsMessage = props => {
    return (
      <components.NoOptionsMessage {...props}>
        <span>Type something and press create</span>
      </components.NoOptionsMessage>
    );
  };

  const renderMealPlanDropDown = () => {
    return (
      <div className="col-md-9">
        <div className="mb-0 meal-select">
          <Select
            className=""
            placeholder={"Please select meal plan"}
            onChange={selectMealPlan}
            options={formatList(mealPlanList, '_id', 'mealPlanName')}
            value={selectedMealPlan}
            ref={selectInputRef}
          />
        </div>
      </div>
    )
  }

  const renderModelMealPlanName = () => {
    return (
      <div
        className="modal fade"
        id="addmealplan"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content chooselist_mdiv8">
            <div className="modal-header px-4">
              <h5 className="modal-title text-center">Add New Meal Plan</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-4">
              <div className="row">
                <div className="col-md-12">
                  <input
                    className="mealplan_input"
                    type="text"
                    value={mealPlanName}
                    onChange={(e) => getMealPlanNameAvailable(e.target.value)}
                    placeholder="Enter meal plan"
                  />
                  {(mealPlanName && !mealPlanNameAvailable) ?
                    <h6
                      style={{ marginTop: 10, marginBottom: 10 }}
                      className="error_alert_text4 LifeStyleSearchInput">
                      {`Meal plan name taken`}
                    </h6> : null}
                </div>
              </div>
            </div>
            <div className="modal-footer px-3">
              <button data-bs-dismiss="modal" onClick={() => mealPlanNameAvailable && mealPlanName && addMealPlanName()} className="btn btn-primary btn-lg w-100" style={{
                backgroundColor: (mealPlanNameAvailable && mealPlanName) ? "#1f7e78" : "#d2d2d2",
                borderColor: (mealPlanNameAvailable && mealPlanName) ? "#1f7e78" : "#d2d2d2",
              }}>
                {'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderTabList = () => {
    return (
      <TabList className="mealcustom-list">
        {mealPlanDetail?.map((item) => {
          return <Tab>{'Day ' + item.day}</Tab>
        })}
      </TabList>
    )
  }

  const renderTabPanel = () => {
    return (
      mealPlanDetail?.map((item) => {
        return (
          <TabPanel>
            <div className="row">
              {renderTabItem(item.breakfast, item.day, 'breakfast', 'Breakfast')}
              {renderTabItem(item.lunch, item.day, 'lunch', 'Lunch')}
              {renderTabItem(item.dinner, item.day, 'dinner', 'Dinner')}
              {renderTabItem(item.snacks, item.day, 'snacks', 'Snacks')}
            </div>
          </TabPanel>)
      })
    )
  }

  const renderTabItem = (items, day, category, title) => {
    return (
      <div className="col-md-6 pb-4">
        <div className="card shadow border-0 p-3 d-flex h-100">
          <div className="d-flex justify-content-between mb-4">
            <h5 className="card-title">{title}</h5>
            {isAdmin ? <button onClick={() => {
              getMealPlanRecipe(category, day, items);
              setSelectedRecipeList('');
            }} className="btn btn-primary btn-sm" style={{ backgroundColor: "#1f7e78", borderColor: "#1f7e78" }} data-bs-toggle="modal" data-bs-target="#recipelist"><AiOutlinePlus style={{ marginTop: -3 }} /> ADD</button> : null}
          </div>
          {items.length ?
            items?.map((item, index) => {
              return (
                <div key={index} className="d-flex mb-3 px-3 align-items-center justify-content-between flex-row py-2 card">
                  <div className="d-flex align-items-center">
                    <img
                      src={item.recipeImage}
                      onError={(e) => {
                        e.target.src = "images/cookie.png" //replacement image imported above
                      }}
                      className="recipe_image_ me-4" alt="" />
                    <p className="m-0 text-capitalize">{item.recipeName}</p>
                  </div>
                  {isAdmin ? <button onClick={() => removeMealPlanDetail(category, day, index)} className="btn btn-outline-danger btn-sm rounded-circle"><AiOutlineMinus style={{ marginTop: -3 }} /></button> : null}
                </div>)
            })
            :
            <div className="d-flex mb-3 px-3 align-items-center justify-content-center flex-row py-2">
              <p className="m-0 text-capitalize text-secondary">No recipe added</p>
            </div>}
        </div>
      </div>
    )
  }

  const renderModelAddRecipe = () => {
    return (
      <div
        className="modal fade"
        id="recipelist"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content chooselist_mdiv8">
            <div className="modal-header px-4">
              <h5 className="modal-title text-center">Add New Recipes</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-4">
              <div className="row">
                <div className="col-md-12 recipe-select">
                  <Select
                    // closeMenuOnSelect={false}
                    isMulti
                    value={selectedRecipeList}
                    placeholder="Please Select Recipes"
                    options={formatList(recipeList, '_id', 'recipeName')}
                    onChange={(data) => setSelectedRecipeList(data)}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer px-3">
              <button
                onClick={() => selectedRecipeList.length && addMealPlanDetail()}
                className="btn btn-primary btn-lg w-100"
                data-bs-dismiss="modal"
                style={{
                  backgroundColor: selectedRecipeList?.length ? "#1f7e78" : '#d2d2d2',
                  borderColor: selectedRecipeList?.length ? "#1f7e78" : "#d2d2d2",
                }}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
            <p className="dashboard_title">
              <HiOutlineArrowSmLeft
                onClick={() => navigate(-1)}
                className="icon"
              />
              Nutrition
              <span className="patient_lifestyle2">
                <GoPrimitiveDot />
                meal plan
              </span>
            </p>
            <div className="container">
              <div className="row">
                {renderMealPlanDropDown()}
                {isAdmin ? <div className="col-md-3">
                  <div onClick={() => { setMealPlanName('') }} className="btn w-100 h-100 d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#addmealplan" style={{ backgroundColor: "#1f7e78", marginBottom: 20 }}>
                    <p className="m-0 text-white"><AiOutlinePlus /> Add Meal Plan</p>
                  </div>
                </div> : null}
                <div className="col-md-12">
                  <hr />
                  {selectedMealPlan?.value && mealPlanDetail ? <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
                    {renderTabList()}
                    {isAdmin ? <span onClick={addMealPlanDays} className="addDay"></span> : null}
                    {renderTabPanel()}
                  </Tabs> : <Loader visible={false} emptyTextKey={'pleaseSelectMealPlan'} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {renderModelAddRecipe()}
      {renderModelMealPlanName()}
    </>
  );
};

export default MealPlanTemplate;
