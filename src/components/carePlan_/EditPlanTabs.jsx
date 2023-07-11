import React, { useEffect, useState } from "react";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CarePlanTask from "./CarePlanTask";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import CarePlanGoal from "./CarePlanGoal";
import CarePlanFile from "./CarePlanFile";
import CareDescriptionEdit from "./CareDescriptionEdit";

const EditPlanTabs = (props) => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const location = useLocation();
    const state = location.state;
    const [selectedGoal, setSelectedGoal] = useState({});
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
                        {/* <p className="dashboard_title">
                            <HiOutlineArrowSmLeft
                                onClick={() => navigate('/careplan')}
                                className="icon"
                            />
                            care plans
                        </p> */}
                        {/* <div className="container"> */}
                        <div className="row">
                            <div className="col-md-12">
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item cursor-pointer" onClick={() => navigate(-1)}>Care Plans</li>
                                        <li class="breadcrumb-item active fw-bold" aria-current="page">Edit care plans</li>
                                    </ol>
                                </nav>
                                <Tabs
                                    selectedIndex={selectedTab}
                                    onSelect={(index) => onTabClick(index)}
                                    className="new_multiform">
                                    <TabList>
                                        <Tab>Description</Tab>
                                        <Tab>Goals</Tab>
                                        {/* <Tab>Task</Tab> */}
                                        <Tab>File</Tab>
                                    </TabList>
                                    <TabPanel>
                                        <CareDescriptionEdit
                                            careplanId={state.careplan._id}
                                            onSave={() => {
                                                setSelectedTab(1);

                                            }} />
                                    </TabPanel>
                                    <TabPanel>
                                        <CarePlanGoal
                                            careplanId={state.careplan._id}
                                            onBack={() => { setSelectedTab(selectedTab - 1) }}
                                            onSave={(data) => {
                                                setSelectedTab(2);
                                                setSelectedGoal(data)
                                            }}
                                            onSkip={() => { setSelectedTab(2) }} />
                                    </TabPanel>
                                    {/* <TabPanel>
                                            <CarePlanTask
                                                careplanId={state.careplan._id}
                                                // singleActiveProgram={props.singleActiveProgram}
                                                goal={selectedGoal}
                                                onBack={() => { setSelectedTab(selectedTab - 1) }}
                                                onSave={() => { setSelectedTab(3) }}
                                            />
                                        </TabPanel> */}
                                    <TabPanel>
                                        <CarePlanFile
                                            careplanId={state.careplan._id}
                                            onBack={() => { setSelectedTab(selectedTab - 1) }}
                                            onSave={() => { setSelectedTab(2) }} />
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditPlanTabs;
