import React, { useEffect, useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Creatable from "react-select/creatable";
import { addRecipe } from "../../services/NutritionService";
import { components } from 'react-select';
import { getUploadFileCategory, uploadFile } from "../../services/FileUploadService";
import { getFileName, isEmpty } from "../../Utils/Helper";
import { toast } from "react-toastify";
import Select from "react-select";
import TimePicker from "../../commonComponent/TimePicker";

import { BlogEditorComponent } from "../blog/BlogEditor";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { format, parseISO } from "date-fns";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";
import { recipeTags } from "../../Utils/AllConstant";
import { MdPreview } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { AiOutlinePlus, AiOutlinePlusCircle } from "react-icons/ai";
import Loader from "../../commonComponent/Loader";
import RecommendedFormsView from "./RecommendedFormsView";
import CreatedFormsView from "./CreatedFormsView";
import { TabList, TabPanel, Tabs, Tab } from "react-tabs";


const FormsAndWaiverView = (props) => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [search, setSearch] = useState("")

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
    const renderForm = () => {
        return (
            <>
                <div className="d-flex mt-5 mb-3">
                    <div className="w-50">
                        <h4>Forms & Waivers</h4>
                        <p>View your curated Forms and Waivers.</p>
                    </div>
                    <div className="w-50 d-flex">
                        <div className="actsearch_simple me-2">
                            <FiSearch className="boxicon" />
                            <input
                                placeholder="Search for forms..."
                                className="ms-2"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <button
                            to="/groupadd"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Add Group"
                            onClick={() => navigate("/addformsandwaiver")}
                            className="btn btn-primary btn-custom">
                            <AiOutlinePlus className="me-2" /> Add Form and Waiver
                        </button>
                    </div>
                </div>
                {/* <hr /> */}
                <Tabs
                    selectedIndex={selectedTab}
                    onSelect={(index) => onTabClick(index)} >
                    <TabList className="ps-0 mx-0 border-bottom">
                        <Tab>Created Forms and Waivers</Tab>
                        <Tab>Templates for Forms and Waivers</Tab>
                    </TabList>

                    <TabPanel>
                        <CreatedFormsView search={search}
                        />
                    </TabPanel>
                    <TabPanel>
                        <RecommendedFormsView />
                    </TabPanel>

                </Tabs>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 mb-5">
                        <Sidebar />
                    </div>
                    <div className="col-md-10 py-4 px-5">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item pointer" onClick={() => navigate(-1)}>My Library</li>
                                <li class="breadcrumb-item active fw-bold" aria-current="page">Forms & Waivers</li>
                            </ol>
                        </nav>
                        {renderForm()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormsAndWaiverView;
