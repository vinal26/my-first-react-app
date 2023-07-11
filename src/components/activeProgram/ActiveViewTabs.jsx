import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ActiveDescription from "./ActiveDescription";
import ActiveDescriptiponCreate from "./ActiveDescriptiponCreate";
import ActiveForums from "./ActiveForums";
import ActiveForumsView from "./ActiveForumView";
import ActiveMembersView from "./ActiveMembersView";
import ActiveModuleView from "./ActiveModuleView";
import ActiveSessionView from "./ActiveSessionView";
import ProgramDescriptionView from "./ProgramDescriptionView";
const ActiveViewTabs = (props) => {
    const [params] = useSearchParams();

    const [selectedTab, setSelectedTab] = useState(
        parseInt(params.get("tab") ? params.get("tab") : 0)
    );
    console.log(props, "props")
    useEffect(() => {
        if (props.selectedIndex) {
            setSelectedTab(1)
        }
    }, [props.selectedIndex])

    const onTabClick = (index) => {
        setSelectedTab(index);
        props.selectedIndex && props.onChangeTab();
    }

    return (
        <>
            <Tabs
                selectedIndex={selectedTab}
                onSelect={(index) => onTabClick(index)} className="multiform">
                <TabList>
                    <Tab>Program Description</Tab>
                    <Tab>Module</Tab>
                    <Tab>Session</Tab>
                    <Tab>Forum</Tab>
                    <Tab>Members</Tab>
                </TabList>
                {/* <hr className="viewrecipe_hr mb-1" /> */}
                <TabPanel>
                    <ProgramDescriptionView
                        programId={props.programId} />
                </TabPanel>
                <TabPanel>
                    <ActiveModuleView
                        programId={props.programId} />
                </TabPanel>
                <TabPanel>
                    <ActiveSessionView
                        programId={props.programId} />
                </TabPanel>
                <TabPanel>
                    <ActiveForumsView programId={props.programId} />
                </TabPanel>
                <TabPanel>
                    <ActiveMembersView programId={props.programId} />
                </TabPanel>
            </Tabs>
        </>
    );
};

export default ActiveViewTabs;
