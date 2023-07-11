import React, { useContext, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { getDoctors } from "../../services/DoctorService";
import { doctorContext } from "../../Context/DoctorContext";
import { showToastError } from "../../Utils/Helper";
import ApiConfig from "../../config/ApiConfig";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

let firstTime = true
const ActivemembersList = (props) => {
  const navigate = useNavigate();
  // let location = useLocation();
  const { dispatch, updateDoctorStatus } = useContext(doctorContext);

  const [isLoading, setLoader] = useState(true);
  const [doctorList, setDoctorList] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   if(searchParams.get("doctorId")) console.log(searchParams.get("doctorId"));
  // }, [searchParams])
  

  const getDoctorList = async () => {
    try {
      const response = await getDoctors();

      if (response.status === 200) {
        setLoader(false);
        setDoctorList(response?.data?.data);
        setFilterData(response?.data?.data);
        setTimeout(() => {
          if(searchParams.get("doctorId")){
            document?.getElementById(searchParams.get("doctorId")).click();
            document?.getElementById(searchParams.get("doctorId"))?.scrollIntoView({
                // behavior: 'smooth'
            });
          }
          else document?.getElementById(response?.data?.data[0]._id)?.click()
        }, 1000);

      } else {
        showToastError(response?.data || response.message);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      error?.data?.data && showToastError(error?.data?.data || error.data?.message);
    }
  }

  const updateDoctorList = async () => {
    try {
      const searchWord = document.getElementById("search_word").value;
      const response = await getDoctors();
      if (response.status === 200) {
        setDoctorList(response?.data?.data);
        if (searchWord != '') {
          const result = response?.data?.data.filter((value) => {
            return value?.full_name?.toLowerCase()?.includes(searchWord.toLowerCase()) ||
              value?.first_name?.toLowerCase()?.includes(searchWord.toLowerCase()) ||
              value?.last_name?.toLowerCase()?.includes(searchWord.toLowerCase());
          });
          setFilterData(result);
        }
        else {
          setFilterData(response?.data?.data);
        }
      } else {
        showToastError(response?.data || response.message);
      }
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error.data?.message);
    }
  }

  const activeSelection = (e) => {
    // console.log(e, 'test')
    // const activeTab = document.querySelector(".react-tabs__tab-list li:first-child");
    // if (activeTab) activeTab.click();

    const active = document.querySelector(".list_scroll .active");
    if (active) active.classList.remove("active");

    (e.target).classList.add("active");

    navigate({
      search: `?doctorId=${e.target.id}`,
    });
  }

  const onSearch = (e) => {
    try {
      const active = document.querySelector(".list_scroll .active");
      if (active) active.classList.remove("active");
      const searchWord = e.target.value;
      const result = doctorList.filter((value) => {
        return value?.full_name?.toLowerCase()?.includes(searchWord.toLowerCase()) ||
          value?.first_name?.toLowerCase()?.includes(searchWord.toLowerCase()) ||
          value?.last_name?.toLowerCase()?.includes(searchWord.toLowerCase());
      });
      if (searchWord === "") {
        setFilterData(doctorList);
        dispatch({ type: 'Update Profile', profile: doctorList[0] });
        let element = document.getElementById(doctorList[0]._id);
        if (element) {
          element.click()
        }
      } else {
        setFilterData(result);
        dispatch({ type: 'Update Profile', profile: result[0] });
        let element = document.getElementById(result[0]._id);
        if (element) {
          element.click()
        }
      }
    }
    catch (e) {
      console.log("user not found")
    }
  };

  useEffect(() => {
    updateDoctorList();
  }, [updateDoctorStatus])

  useEffect(() => {
    getDoctorList();
  }, [])


  return (
    <>
      <div className="memberside_list mt-2">
        <div className="row">
          <div className="col-md-12">
            <div className="actsearch_box1">
              <FiSearch className="boxicon" />
              <input id="search_word" placeholder="Search Here..." onChange={(e) => onSearch(e)} />
            </div>
          </div>

          <div className="col-md-12">
            <div
              className="list_scroll mt-4 spacing_scroll dr_management_scroll"
              style={{ height: props.heightDiv }}
            >
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
                </center>
              ) : filterdata?.length ? filterdata.map((dt, index) =>
                <div key={dt._id} id={dt._id} className={`card mb-2 p-1`} onClick={(e) => {
                  dispatch({ type: 'Update Profile', profile: dt });
                  // console.log('Called.............')
                  activeSelection(e);
                }}>
                  <div className="row">
                    <div className="col-md-4 p-0 actlist_wid1 d-flex justify-content-center align-items-center">
                      <img
                        src={dt.profilePicture ? ApiConfig.ImageUrl + 'doctor/' + dt._id + '/' + dt.profilePicture : "/images/avatar.png"}
                        onError={(e) => {
                          e.target.src = "images/avatar.png" //replacement image imported above
                        }}
                        alt=""
                        className="member_listimage"
                      />
                    </div>
                    <div className="col-md-8 actlist_wid2">
                      <p className="mb-0 py-3">{`${dt.first_name} ${dt.last_name}`}</p>
                    </div>
                  </div>
                </div>
              ) : <h4 class="mt-5 text-center message_headfour34">Please add members...</h4>
              }
            </div>
          </div>
        </div>
        <BsFillPlusCircleFill className="member_plusadd" style={{ display: props.iconHide }} />
      </div>
    </>
  );
};

export default ActivemembersList;
