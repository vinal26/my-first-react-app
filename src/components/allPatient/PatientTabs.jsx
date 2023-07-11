import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useAuth } from "../../Context/AuthContext";
import AllPatientListRightSection from "./AllPatientListRightSection";
import MyPatientList from "./MyPatientList";
import PatientList from "./PatientList";

const PatientTabs = ({imported, search}) => {
  const [selectedPatient, setSelectedpatient] = useState();
  const [getList, setgetList] = useState(false);
  const [getMyList, setgetMyList] = useState(true);
  const location = useLocation();
  const { isAdmin } = useAuth();

  const state = location.state || {};

  const onselectpatient = (patientdetails) => {
    setSelectedpatient(patientdetails);
  };

  const onStatusChange = (status) => {
    setSelectedpatient({ ...selectedPatient, status: status });
    setgetList(!getList);
    setgetMyList(!getMyList);
  };

  const renderMyPatient = () => {
    return (
      
      <div className="row">
        <div className="col-md-12">
          <MyPatientList
            onselectpatient={onselectpatient}
            selectedPatient={selectedPatient}
            getList={getList}
            search={search}
            imported={imported}
          />
        </div>
        {/* <div className="col-md-8">
          <AllPatientListRightSection onStatusChange={onStatusChange} selectedPatient={selectedPatient} />
        </div> */}
      </div>
    );
  };

  const renderAllPatient = () => {
    return (
      <div className="row">
        <div className="col-md-12">
          <PatientList
            onselectpatient={onselectpatient}
            selectedPatient={selectedPatient}
            getList={getList}
            search={search}
            imported={imported}
          />
        </div>
        {/* <div className="col-md-8">
          <AllPatientListRightSection onStatusChange={onStatusChange} selectedPatient={selectedPatient} />
        </div> */}
      </div>
    );
  };

  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [selectedTab, setSelectedTab] = useState(
    parseInt(params.get("tab") ? params.get("tab") : 0)
  );

  useEffect(() => {
    navigate({
      search: `?tab=${selectedTab}`,
    });
    // if(selectedTab == 0) document.getElementsByClassName("memlist_scroll")[0].firstElementChild.click()
  }, [selectedTab]);

  if (isAdmin) {
    return (
      <>
        <Tabs
          selectedIndex={selectedTab}
          onSelect={(index) => setSelectedTab(index)}
        >
          <TabList>
            <Tab>My Client</Tab>
            <Tab>All Clients</Tab>
          </TabList>
          <TabPanel>{selectedTab == 0 && renderMyPatient()}</TabPanel>
          <TabPanel>{selectedTab == 1 && renderAllPatient()}</TabPanel>
        </Tabs>
      </>
    );
  }

  return renderAllPatient();
};

export default PatientTabs;
