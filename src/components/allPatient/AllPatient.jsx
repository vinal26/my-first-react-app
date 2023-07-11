import React, { useEffect, useState } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { GoPrimitiveDot } from "react-icons/go";
import "../appointment/style.css";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { FiSearch } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import AllPatientTabs from "./AllPatientTabs";
import AllPatientLifeStyleSearch from "./AllPatientLifeStyleSearch";
import LifeStyleSearchInput from "./LifeStyleSearchInput";
import { getTemplateListService } from "../../services/LifestyleService";
import Loader from "../../commonComponent/Loader";
import { useAuth } from "../../Context/AuthContext";

const AllPatient = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [list, setList] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isLoading, setLoader] = useState(true);

  useEffect(() => {
    getTemplateList()
  }, [])

  const getTemplateList = async (isAddedNew) => {
    try {
      const response = await getTemplateListService()
      setLoader(false)
      if (response) {
        setList(response);
        !selectedTemplate && setSelectedTemplate(response?.[0])
        isAddedNew && setSelectedTemplate(response?.[response?.length - 1])
      }
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  const onChangeSelectedTemplate = (template) => {
    setSelectedTemplate(template)
  }

  const onAddNewTemplate = () => {
    getTemplateList(true)
  }
  return (
    <>
      <Navbar />

      <div className="container-fluid mb-5">
        <div className="row mb-5">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
            <p className="dashboard_title">
              {/* <HiOutlineArrowSmLeft
                onClick={() => navigate("/allpatientoverview")}
                className="icon"
              /> */}
              {/* <img src="images/profile.png" alt="" /> */}
              {/* <span className="patient_name2"> lisa jons</span> */}
              
              <span className="dashboard_title">
                {/* <GoPrimitiveDot /> */}
                lifestyle
              </span>
            </p>
            <AllPatientLifeStyleSearch selectedTemplate={selectedTemplate} list={list} onChangeSelectedTemplate={onChangeSelectedTemplate} />

            {/* for input */}
            {auth.isAdmin && <LifeStyleSearchInput onAddNewTemplate={onAddNewTemplate} /> || null}

            {/* for tabs */}
            {selectedTemplate ? <AllPatientTabs selectedTemplate={selectedTemplate} /> : <Loader visible={isLoading} emptyTextKey={'selectLifeStyle'} />}
            <br />
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPatient;
