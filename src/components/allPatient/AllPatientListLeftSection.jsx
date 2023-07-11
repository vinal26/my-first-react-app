import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setPatientList } from "../../Reducer/actions/patientAction";
import { getPatientList } from "../../services/PatientService";

const PatientList = () => {
  const [patientLists, setPatientLists] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.patient.patientLists);
  // console.log(patient);

  useEffect(() => {
    getPatientLists();
  }, []);

  const onPatientSearch = async (e) => {
    let searchWord = e.target.value;
    const result = patientLists.filter((value) => {
     if (value) {
        return (
            value?.first_name?.toLowerCase()?.includes(searchWord?.toLowerCase()) ||
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
  };

  // const activeSelection = (e) => {
  //   const activeTab = document.querySelector(".react-tabs__tab-list li:first-child");
  //   if(activeTab) activeTab.click();
    
  //   const active = document.querySelector(".memlist_scroll .active");
  //   if(active) active.classList.remove("active");

  //   (e.target).classList.add("active");
  // }

  const getPatientLists = async (searchWord) => {
    try {
      const response = await getPatientList(searchWord);
      if (response.status === 200) {
        setPatientLists(response?.data?.data);
        setFilterData(response?.data?.data);
        dispatch(setPatientList(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="memberside_list" style={{height: "84vh"}}>
        <div className="row">
          <div className="col-md-12">
            <div className="actsearch_box1">
              <FiSearch className="boxicon" />
              <input
                placeholder="Search Patients"
                onChange={(e) => onPatientSearch(e)}
              />
            </div>
          </div>

          <div className="col-md-12">
            <div className="memlist_scroll mt-4 spacing_scroll">
              {filterdata?.length ? (
                filterdata.map((dt) => (
                  <div
                    key={dt._id}
                    className="shadow-sm border ms-2 rounded mb-3 p-1"
                    // onClick={(e) => {
                    //     props.onselectpatient(dt);
                    //     activeSelection(e);
                    // }}
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
                        <p className="mb-0 py-3">{`${dt.first_name}`}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="p-2">No Data Found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientList;
