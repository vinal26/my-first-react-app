import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CalenderAvailability from "./CalenderAvailability";
import MyCalender from "./MyCalender";
import MyEvents from "./MyEvents";


const CalenderTabs = () => {
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
                    <Tab>My Availability</Tab>
                    <Tab>My Calendar</Tab>
                    <Tab>My Events</Tab>
                </TabList>

                <TabPanel>
                    <CalenderAvailability
                        onNext={() => { setSelectedTab(1) }} />

                </TabPanel>
                <TabPanel>
                    <MyCalender />
                </TabPanel>
                <TabPanel>
                    <MyEvents />
                </TabPanel>

            </Tabs>
        </>
    );
};

export default CalenderTabs;
