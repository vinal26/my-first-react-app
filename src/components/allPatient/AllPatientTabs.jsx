import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useAuth } from "../../Context/AuthContext";
import AllPatientConnect from "./AllPatientConnect";
import AllPatientReflect from "./AllPatientReflect";
import AllPatientRelax from "./AllPatientRelax";
import AllPatientSleep from "./AllPatientSleep";
import AllPatientTakeCare from "./AllPatientTakeCare";

const AllPatientTabs = (props) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [selectedTab, setSelectedTab] = useState(parseInt(params.get("tab") ? params.get("tab") : 0));
  const {isAdmin} = useAuth();
  const isDisable = !(isAdmin || props.userid);

  useEffect(() => {
    if (!props.fromEditLifestyle) {
      navigate({
        search: `?tab=${selectedTab}`
      });
    }

  }, [selectedTab])

  // props.userid && console.log(props.userid);

  return (
    <>
      <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
        <TabList>
          <Tab>sleep</Tab>
          <Tab>connect</Tab>
          <Tab>reflect</Tab>
          <Tab>relax</Tab>
          <Tab>take care</Tab>
        </TabList>

        <TabPanel>
          <AllPatientSleep isDisable={isDisable} userid={props.userid} selectedTemplate={props.selectedTemplate} />
        </TabPanel>
        <TabPanel>
          <AllPatientConnect isDisable={isDisable} userid={props.userid} selectedTemplate={props.selectedTemplate} />
        </TabPanel>
        <TabPanel>
          <AllPatientReflect isDisable={isDisable} userid={props.userid} selectedTemplate={props.selectedTemplate} />
        </TabPanel>
        <TabPanel>
          <AllPatientRelax isDisable={isDisable} userid={props.userid} selectedTemplate={props.selectedTemplate} />
        </TabPanel>
        <TabPanel>
          <AllPatientTakeCare isDisable={isDisable} userid={props.userid} selectedTemplate={props.selectedTemplate} />
        </TabPanel>
      </Tabs>
    </>
  );
};

export default AllPatientTabs;
