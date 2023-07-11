import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "../appointment/style.css";
import "./style.css";
import { useNavigate } from "react-router-dom";
import CarePlanTabs from "./carePlanTabs";
import { getAllCarePlanListService } from "../../services/CreateCarePlanService";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCarePlanID } from "../../Reducer/actions/carePlanAction";
import Loader from "../../commonComponent/Loader";
import CareBox from "./CareBox";

const CarePlan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectInputRef = useRef();
  const carePlan = useSelector(state => state.carePlan.selectedCarePlan);
  const [carePlanList, setCarePlanList] = useState([]);
  const selectedCarePlan = carePlan._id ? { label: carePlan.name, value: carePlan._id } : '';
  const [isLoading, setLoader] = useState(true);

  useEffect(() => {
    getCarePlanList();
  }, [])

  // useEffect(() => {
  //   getCarePlanList();
  // }, [carePlan])

  const getCarePlanList = async () => {
    try {
      const response = await getAllCarePlanListService()
      setLoader(false)
      if (response) {
        setCarePlanList(response.data);
        if (carePlan) {
          response.data?.map((item) => {
            if (item._id === carePlan._id) {
              dispatch(setSelectedCarePlanID(item))
            }
            return item;
          })
        }
      }
    } catch (error) {
      setLoader(false)
      console.log(error);
    }
  }

  const getSelectedCarePlanList = () => {
    let result = carePlanList.map((dt) => ({
      value: dt._id,
      label: dt.name,
    }));
    return result;
  }

  const selectCarePlan = (item) => {
    const selectedItem = carePlanList.find((carePlan) => carePlan._id === item.value)
    dispatch(setSelectedCarePlanID(selectedItem))
  }

  const changeSelectedGoal = (selected_goal) => {
    const result = carePlanList.map((item) => {
      if (item._id === selected_goal._id) {
        return selected_goal;
      }
      return item;
    })
    setCarePlanList(result);
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
            {/* <p className="dashboard_title">
              <HiOutlineArrowSmLeft
                onClick={() => navigate('/')}
                className="icon"
              />
              care plans
            </p> */}
            <div className="container">
              <div className="row">
                <div className="col-md-7">
                  <div className="active_msearch6">
                    <Select
                      className=""
                      placeholder={"Please select care plan"}
                      onChange={selectCarePlan}
                      options={getSelectedCarePlanList()}
                      ref={selectInputRef}
                      value={selectedCarePlan}
                    />
                  </div>
                </div>
                {carePlanList.length === 0 && <div className="care_margin">
                  <CareBox style={{ marginTop: -22 }} text={`Create new care plan`}
                    url={`/caredescription`}
                  />
                </div>}
                <hr className="create_bottomhr caremob_hr" />
                {!carePlan && carePlanList.length && <div className="button_top">
                  <CareBox text={`Create new care plan`}
                    url={`/caredescription`}
                  />
                </div> || null}
                {carePlanList.length && carePlan ? <CarePlanTabs updateCarePlan={() => getCarePlanList()} changeSelectedGoal={changeSelectedGoal} />
                  : <Loader visible={isLoading} emptyTextKey={!carePlan && 'selectCarePlan'} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarePlan;
