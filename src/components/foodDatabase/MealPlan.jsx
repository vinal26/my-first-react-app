import React, { useState, useEffect } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { FiSearch } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import MealPlanTabs from "./MealPlanTabs";
import { addMealPlanDaysService, addMealPlanDetailService, addMealPlanService, getMealPlanAvailableService, getMealPlanDetailService, getMealPlanListService, getRecipeListService, getRecommendedMealPlanListService } from "../../services/MealService";
import { showToastSuccess, isEmpty } from "../../Utils/Helper";
import Loader from "../../commonComponent/Loader";


const MealPlan = () => {

  const navigate = useNavigate();
  const [mealPlanName, setMealPlanName] = useState('');
  const [mealPlanNameAvailable, setMealPlanNameAvailable] = useState(false);
  const [isLoading, setLoader] = useState(true);
  const [mealPlanList, setMealPlanList] = useState([]);
  const [recommendedMealPlanList, setRecommendedMealPlanList] = useState([]);
  const [recipeList, setRecipeList] = useState([]);
  const [selectedMealPlan, setSelectedMealPlan] = useState('');
  const [filterdata, setFilterData] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if(tabIndex===0) getMealPlanList();
    else if(tabIndex===1) getRecommendedMealPlan()
  }, [tabIndex])

  const getMealPlanList = async () => {
    setLoader(true)
    try {
      const response = await getMealPlanListService();
      setLoader(false)
      if (response) {
        setMealPlanList(response || []);
        setFilterData(response || []);
      }
    } catch (error) {
      setLoader(false)
    }
  }

  const getRecommendedMealPlan = async () => {
    setLoader(true)
    try {
      const response = await getRecommendedMealPlanListService();
      setLoader(false)
      if (response) {
        setRecommendedMealPlanList(response || []);
        setFilterData(response || []);
      }
    } catch (error) {
      setLoader(false)
    }
  }



  const selectMealPlan = (item) => {
    setSelectedMealPlan(item);
    // getMealPlanDetail(item.value);
    // setSelectedTab(0)
  }

  const onChangeSearchText = async (e) => {
    let searchWord = e.target.value;
    const result = ((tabIndex===0) ? mealPlanList?.filter((value) => {
      if (value) {
        return (
          value?.mealPlanName?.toLowerCase()?.includes(searchWord?.toLowerCase())
        );
      }
    }) : recommendedMealPlanList?.filter((value) => {
      if (value) {
        return (
          value?.mealPlanName?.toLowerCase()?.includes(searchWord?.toLowerCase())
        );
      }
    }));

    if (searchWord === "") {
      if(tabIndex===0) setFilterData(mealPlanList);
      else if(tabIndex===1) setFilterData(recommendedMealPlanList)
      // getForumsById(searchWord);
    } else {
      setFilterData(result);
    }
  };

  const renderSearchHeader = () => {
    return (
      <div className="d-flex mt-5 mb-3">
        <div className="w-50">
          <h4>Meal Plans</h4>
          <p>View your Meal Plans curate and customize meals.</p>
        </div>
        <div className="w-50 d-flex">
          <div className="actsearch_simple me-2">
            <FiSearch className="boxicon" />
            <input
              placeholder="Search Meal Plans Name here..."
              className="ms-2"
              onChange={(e) => onChangeSearchText(e)}
            />
          </div>
          <button
            onClick={() => {
              setMealPlanName('');
              navigate(`/addmealplan`)
            }}
            // data-bs-toggle="modal" data-bs-target="#addmealplan"
            className="btn btn-primary btn-custom"          >
            <AiOutlinePlusCircle className="me-2" /> Add Meal Plan
          </button>

        </div>
      </div>
    );
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
                    placeholder="Enter meal plan name here"
                  />
                  {(mealPlanName && !mealPlanNameAvailable) ?
                    <h6
                      style={{ marginTop: 10, marginBottom: 10 }}
                      className="error_alert_text4 LifeStyleSearchInput">
                      {`Meal plan name taken`}
                    </h6> : null}
                  {(mealPlanName && mealPlanNameAvailable && isEmpty(mealPlanName)) && <h6
                    style={{ marginTop: 10, marginBottom: 10 }}
                    className="error_alert_text4 LifeStyleSearchInput">
                    {`Meal plan name taken`}
                  </h6>}

                </div>
              </div>
            </div>
            <div className="modal-footer px-3">
              <button data-bs-dismiss="modal" onClick={() => !isEmpty(mealPlanName) && mealPlanNameAvailable && mealPlanName && addMealPlanName()} className="btn btn-primary btn-lg w-100" style={{
                backgroundColor: (!isEmpty(mealPlanName) && mealPlanNameAvailable && mealPlanName) ? "#1f7e78" : "#d2d2d2",
                borderColor: (!isEmpty(mealPlanName) && mealPlanNameAvailable && mealPlanName) ? "#1f7e78" : "#d2d2d2",
              }}>
                {'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }


  const addMealPlanName = async () => {
    try {
      const params = {
        mealPlanName: mealPlanName.toLocaleLowerCase(),
        "description": "new description",
        "tags": [],
        "mealfile": "mealfile"
      }

      const response = await addMealPlanService(params);
      setLoader(false);
      console.log(response);
      setMealPlanName('');
      if (response) {
        navigate(`/editmealplan?mealplanId=${response.insertedId}`)
        showToastSuccess("Meal plan successfully added.")
      }
    } catch (error) {
      setLoader(false)
    }
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
            <div className="row">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item  cursor-pointer" onClick={() => navigate("/mylibrary")}>My Library</li>
                  <li
                    class="breadcrumb-item active fw-bold"
                    aria-current="page"
                  >
                    Meal Plans
                  </li>
                </ol>
              </nav>
              {renderSearchHeader()}

              <div>
                <MealPlanTabs tabIndex={tabIndex} setTabIndex={setTabIndex} mealPlanList={filterdata} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {renderModelMealPlanName()}
    </>
  );
};

export default MealPlan;
