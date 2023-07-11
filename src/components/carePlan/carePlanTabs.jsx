import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CarePlanDescriptionEdit from "./CarePlanDescriptionEdit";
import CarePlanGoalsTable from "./CarePlanGoalsTable";
import CarePlanTaskTable from "./CarePlanTaskTable";
import CareBox from "./CareBox";
import EmptyText from "../activeProgram/EmptyText";
import CarePlanFile from "./CarePlanFile";

const CarePlanTabs = ({changeSelectedGoal, updateCarePlan}) => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
  
    const [selectedTab, setSelectedTab] = useState(parseInt(params.get("tab") ? params.get("tab") : 0));
  
    useEffect(() => {
      navigate({
        search: `?tab=${selectedTab}`
      });
  
    }, [selectedTab])
  return (
    <>
          <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
              <TabList>
                  <Tab>description</Tab>
                  <Tab>goals</Tab>
                  <Tab>task</Tab>
                  <Tab>file</Tab>
              </TabList>

              <TabPanel>
                <div className="care_margin">
              <CareBox   text={`Create new care plan`}
                    url={`/caredescription`}
                  />
                  </div>
                  <CarePlanDescriptionEdit updateCarePlan={updateCarePlan}/>

              </TabPanel>
              <TabPanel>
              <CareBox   text={`Create new goal`}
                    url={`/caregoal`}
                  />
                  <CarePlanGoalsTable changeSelectedGoal={changeSelectedGoal}/>
              </TabPanel>
              <TabPanel>
              <CareBox   text={`Create new task`}
                    url={`/caretask`}
                  />
                  <CarePlanTaskTable />
              </TabPanel>
              <TabPanel>
                  <CarePlanFile />
              </TabPanel>
          </Tabs>
    </>
  );
};

export default CarePlanTabs;
