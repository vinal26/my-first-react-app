import React, { useEffect, useState } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "./style.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import DailyJournalheader from "./DailyJournalheader";
import AllButton from "./AllButton";
import LifeStyleComponent from "./LifeStyleComponent";
import { getUserLifeStyleDetailService } from "../../services/LifestyleService";
import { changeDateFormat, changeDateFormatddmmyyyy, changeDateFormatYYYY } from "../../Utils/Helper";
import LifeStyleHeader from "./LifeStyleHeader";
import Loader from "../../commonComponent/Loader";
import ChooseUserTemplate from "./ChooseUserTemplate";

const category = ['sleep', 'connect', 'relax', 'reflect', 'takeCare'];
let defaultResponse = {};
const LifeStyle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [lifeStyleDetail, setLifeStyleDetail] = useState('');
  const [isLoading, setLoader] = useState(true);
  const [showChooseUserTemplateModal, setChooseUserTemplateModal] = useState(true);

  useEffect(() => {
    getData(selectedDate)
  }, []);

  const getData = (date) => {
    category.map(async (item) => await getLifeStyleDetail(item, date));
  }

  const getLifeStyleDetail = async (category, date) => {
    try {
      const response = await getUserLifeStyleDetailService(date, category, { userId: user._id });
      if (response) {
        defaultResponse = { ...defaultResponse, [category]: response }
        setLifeStyleDetail(defaultResponse);
      }
      if (category === 'takeCare') {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  }

  const onDateChange = (date) => {
    setSelectedDate(date)
    getData(date)
  }

  const onChangeTemplate = () => {
    setChooseUserTemplateModal(true)
  }

  const onChangeTemplateCompleted = () => {
    getData(selectedDate)
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
              lifestyle
            </p>
            <LifeStyleHeader onChangeTemplate={onChangeTemplate} user={user} onDateChange={onDateChange} date={selectedDate} />
            <Loader visible={isLoading} emptyTextKey={!lifeStyleDetail && 'emptyLifestyle'} />
            {!isLoading && lifeStyleDetail && <LifeStyleComponent user={user} lifeStyleDetail={lifeStyleDetail} />}
            <AllButton user={user}/>
          </div>
        </div>
      </div>
      {showChooseUserTemplateModal && <ChooseUserTemplate userID={user._id} onChangeTemplate={onChangeTemplateCompleted}/>}
    </>
  );
};

export default LifeStyle;
