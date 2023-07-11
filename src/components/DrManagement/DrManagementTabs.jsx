import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { getObjectFromStore } from "../../storage/Storage";
import AddDoctor from "./AddDoctor";
import DoctorViewProfile from "./DoctorViewProfile";

const DrManagementTabs = () => {
  const navigate = useNavigate();
  // const [params] = useSearchParams();

  // const [selectedTab, setSelectedTab] = useState(parseInt(params.get("tab") ? params.get("tab") : 0));

  // useEffect(() => {
  //   navigate({
  //     search: `?tab=${selectedTab}`
  //   });
  //   if(selectedTab == 0) document.getElementsByClassName("memlist_scroll")[0].firstElementChild.click()
  // }, [selectedTab])
  return (
    <>
      {/* <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)} style={{ marginTop: "-15px" }}>
        <TabList>
          
          {getObjectFromStore("role") === "administrator" && 
          <><Tab>View profile</Tab><Tab>Add doctor</Tab></>}
        </TabList>

        <TabPanel>
          <DoctorViewProfile />
        </TabPanel>
        {getObjectFromStore("role") === "administrator" && <TabPanel>
          <AddDoctor />
        </TabPanel>}
      </Tabs> */}

      {getObjectFromStore("role") === "administrator" &&
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">View profile</h5>
        <button className="me-0 description_btnsave d-flex justify-content-center align-items-center" onClick={() => navigate('/adddoctor')}>Add Doctor</button>
      </div>}
      <DoctorViewProfile />
    </>
  );
};

export default DrManagementTabs;
