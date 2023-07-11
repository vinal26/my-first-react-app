import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import GroupSession from "../upcomingGroupSessions/GroupSession";
import UpcomingAppointmentComponents from "./UpcomingAppointmentComponents";
import PastAppointments from "./PastAppointments";
import TodayAppointmentComponents from "./TodayAppointmentComponents";

const TodayAppointmentTabs = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [selectedTab, setSelectedTab] = useState(
    parseInt(params.get("tab") ? params.get("tab") : 0)
  );

  useEffect(() => {
    navigate({
      search: `?tab=${selectedTab}`,
    });
  }, [selectedTab]);

  return (
    <>
      <Tabs
        selectedIndex={selectedTab}
        onSelect={(index) => setSelectedTab(index)}
      >
        <TabList>
          <Tab>today's <span className="text-lowercase">appointments</span></Tab>
          <Tab>upcoming <span className="text-lowercase">appoinments</span></Tab>
          <Tab>upcoming <span className="text-lowercase">program session</span></Tab>
          <Tab>history</Tab>
        </TabList>


        <TabPanel>
          <TodayAppointmentComponents />
        </TabPanel>
        <TabPanel>
          <UpcomingAppointmentComponents />
        </TabPanel>
        <TabPanel>
          <GroupSession />
        </TabPanel>
        <TabPanel>
          <PastAppointments />
        </TabPanel>
      </Tabs>
    </>
  );
};

export default TodayAppointmentTabs;
