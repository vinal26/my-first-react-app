import React, { useEffect, useState } from "react";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CarePlanTask from "./CarePlanTask";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import CareDescription from "./CareDescriptionEdit";
import CarePlanGoal from "./CarePlanGoal";
import CarePlanFile from "./CarePlanFile";
import CareDescriptionCreate from "./CareDescriptionCreate";
import CareDescriptionTemplate from "./CareDescriptionTemplate";
import { showToastError, showToastWarning } from "../../Utils/Helper";

const CreateTemplateTabs = (props) => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const [careplanId, setcareplanId] = useState("");
    const [newcareplanId, setnewcareplanId] = useState("");
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
                                        <li class="breadcrumb-item" onClick={() => navigate(-1)}>Care Plans</li>
                                        <li class="breadcrumb-item active fw-bold" aria-current="page">Create new care plans</li>
                                    </ol>
                                </nav>
                                <Tabs
                                    selectedIndex={selectedTab}
                                    onSelect={newcareplanId ? (index) => onTabClick(index) : null}
                                    className="new_multiform">
                                    <TabList>
                                        <Tab >Description</Tab>
                                        <Tab onClick={() => !newcareplanId ? showToastError("Click Save to Continue") : null}>Goals</Tab>
                                        <Tab onClick={() => !newcareplanId ? showToastError("Click Save to Continue") : null}>File</Tab>
                                    </TabList>
                                    <TabPanel>
                                        <CareDescriptionTemplate
                                            newcareplanId={newcareplanId}
                                            onSave={(data) => { setSelectedTab(1); setcareplanId(data) }}
                                        />
                                    </TabPanel>
                                    <TabPanel>
                                        <CarePlanGoal
                                            careplanId={careplanId}
                                            onBack={(data) => { setSelectedTab(selectedTab - 1); setnewcareplanId(data); }}
                                            onSave={(data) => {
                                                setSelectedTab(2);
                                                setSelectedGoal(data)
                                            }} />
                                    </TabPanel>
                                    <TabPanel>
                                        <CarePlanFile
                                            careplanId={careplanId}
                                            onBack={() => { setSelectedTab(selectedTab - 1) }}
                                            onSave={() => { setSelectedTab(2) }} />
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    );
};

export default CreateTemplateTabs;
