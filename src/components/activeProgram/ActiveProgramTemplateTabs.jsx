import React, { useEffect, useState } from "react";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import ActiveForums from "./ActiveForums";
import ActiveMembers from "./ActiveMembers";
import ActiveModule from "./ActiveModule";
import ActiveSession from "./ActiveSession";
import ActiveTemplateCreate from "./ActiveTemplateCreate";

const ActiveProgramTemplateTabs = (props) => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const [programId, setProgramId] = useState("");
    const [newprogramId, setNewProgramId] = useState("");
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
            <Navbar />
            <div className="container-fluid mb-5">
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar />
                    </div>
                    <div className="col-md-10 py-4 px-5">

                        {/* <div className="container mb-5"> */}
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item">Programs</li>
                                    <li class="breadcrumb-item active fw-bold" aria-current="page">Create New Program</li>
                                </ol>
                            </nav>
                            <Tabs
                                selectedIndex={selectedTab}
                                // onSelect={(index) => onTabClick(index)}
                                className="new_multiform"
                            >
                                <TabList>
                                    <Tab>Description</Tab>
                                    <Tab>Module</Tab>
                                    <Tab>Sessions</Tab>
                                    <Tab>Forums</Tab>
                                    <Tab>Members</Tab>
                                </TabList>
                                <TabPanel>
                                    <ActiveTemplateCreate
                                        newprogramId={newprogramId}
                                        onSave={(data) => { setSelectedTab(1); setProgramId(data) }} />
                                </TabPanel>
                                <TabPanel>
                                    <ActiveModule
                                        programId={programId}
                                        onBack={(data) => { setSelectedTab(selectedTab - 1); setNewProgramId(data) }}
                                        onSave={() => { setSelectedTab(2) }}
                                    />
                                </TabPanel>
                                <TabPanel>
                                    <ActiveSession
                                        programId={programId}
                                        onBack={() => { setSelectedTab(selectedTab - 1) }}
                                        onSave={() => { setSelectedTab(3) }}
                                    />
                                </TabPanel>
                                <TabPanel>
                                    <ActiveForums programId={programId}
                                        onBack={() => { setSelectedTab(selectedTab - 1) }}
                                        onSave={() => { setSelectedTab(4) }} />
                                </TabPanel>
                                <TabPanel>
                                    <ActiveMembers programId={programId}
                                        onBack={() => { setSelectedTab(selectedTab - 1) }}
                                    />
                                </TabPanel>
                            </Tabs>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ActiveProgramTemplateTabs;
