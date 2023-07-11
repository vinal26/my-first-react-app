import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ActiveDescription from "./ActiveDescription";
import ActiveDescriptiponCreate from "./ActiveDescriptiponCreate";
import ActiveForums from "./ActiveForums";
import ActiveMembers from "./ActiveMembers";
import ActiveModule from "./ActiveModule";
import ActiveDescriptiponEdit from "./ActiveProgramEdit";
import ActiveSession from "./ActiveSession";
import { useNavigate } from "react-router-dom";


const ActiveProgramTabs = (props) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState(
    parseInt(params.get("tab") ? params.get("tab") : 0)
  );
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
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item cursor-pointer" onClick={() => navigate(-1)}>Programs</li>
          <li class="breadcrumb-item active fw-bold" aria-current="page">Edit program</li>
        </ol>
      </nav>
      <Tabs
        selectedIndex={selectedTab}
        onSelect={(index) => onTabClick(index)} className="new_multiform">
        <TabList>
          <Tab>Description</Tab>
          <Tab>Module</Tab>
          <Tab>Sessions</Tab>
          <Tab>Forums</Tab>
          <Tab>Members</Tab>
        </TabList>
        <TabPanel>
          <ActiveDescriptiponEdit
            singleActiveProgram={props.singleActiveProgram}
            programId={props.programId}
            getProgramList={props.getProgramList}
            getProgramById={props.getProgramById}
            onSave={() => { setSelectedTab(1) }}
            onChangeName={(item) => { props.onChangeName(item); setSelectedTab(1) }} />
        </TabPanel>
        <TabPanel>
          <ActiveModule
            programId={props.programId}
            singleActiveProgram={props.singleActiveProgram}
            onBack={() => { setSelectedTab(selectedTab - 1) }}
            onSave={() => { setSelectedTab(2) }}
          />
        </TabPanel>
        <TabPanel>
          <ActiveSession
            programId={props.programId}
            singleActiveProgram={props.singleActiveProgram}
            onBack={() => { setSelectedTab(selectedTab - 1) }}
            onSave={() => { setSelectedTab(3) }} />
        </TabPanel>
        <TabPanel>
          <ActiveForums programId={props.programId}
            onBack={() => { setSelectedTab(selectedTab - 1) }}
            onSave={() => { setSelectedTab(4) }} />
        </TabPanel>
        <TabPanel>
          <ActiveMembers programId={props.programId}
            singleActiveProgram={props.singleActiveProgram}
            onBack={() => { setSelectedTab(selectedTab - 1) }} />
        </TabPanel>
      </Tabs>
    </>
  );
};

export default ActiveProgramTabs;
