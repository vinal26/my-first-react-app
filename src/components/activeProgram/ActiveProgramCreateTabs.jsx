import React, { useEffect, useState } from "react";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import ActiveDescription from "./ActiveDescription";
import ActiveDescriptiponCreate from "./ActiveDescriptiponCreate";
import ActiveForums from "./ActiveForums";
import ActiveMembers from "./ActiveMembers";
import ActiveModule from "./ActiveModule";
import ActiveDescriptiponEdit from "./ActiveProgramEdit";
import ActiveSession from "./ActiveSession";
import { showToastError } from "../../Utils/Helper";

const ActiveProgramCreateTabs = (props) => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const [programId, setProgramId] = useState("");
    const [newprogramId, setNewProgramId] = useState("");
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
                                <li class="breadcrumb-item cursor-pointer" onClick={() => navigate(-1)}>Programs</li>
                                <li class="breadcrumb-item active fw-bold" aria-current="page">Create New Program</li>
                            </ol>
                        </nav>
                        <Tabs
                            selectedIndex={selectedTab}
                            onSelect={newprogramId ? (index) => onTabClick(index) : null}
                            className="new_multiform"
                        >
                            <TabList>
                                <Tab>Description</Tab>
                                <Tab onClick={() => !newprogramId ? showToastError("Click Save to Continue") : null}>Module</Tab>
                                <Tab onClick={() => !newprogramId ? showToastError("Click Save to Continue") : null}>Sessions</Tab>
                                <Tab onClick={() => !newprogramId ? showToastError("Click Save to Continue") : null}>Forums</Tab>
                                <Tab onClick={() => !newprogramId ? showToastError("Click Save to Continue") : null}>Members</Tab>
                            </TabList>
                            <TabPanel>
                                <ActiveDescriptiponCreate
                                    newprogramId={newprogramId}
                                    // singleActiveProgram={props.singleActiveProgram}
                                    onSave={(data) => { setSelectedTab(1); setProgramId(data) }} />
                            </TabPanel>
                            <TabPanel>
                                <ActiveModule
                                    programId={programId}
                                    // singleActiveProgram={props.singleActiveProgram}
                                    onBack={(data) => { setSelectedTab(selectedTab - 1); setNewProgramId(data) }}
                                    onSave={() => { setSelectedTab(2) }}
                                />
                            </TabPanel>
                            <TabPanel>
                                <ActiveSession
                                    programId={programId}
                                    // singleActiveProgram={props.singleActiveProgram}
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
                                    // singleActiveProgram={props.singleActiveProgram}
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

export default ActiveProgramCreateTabs;
