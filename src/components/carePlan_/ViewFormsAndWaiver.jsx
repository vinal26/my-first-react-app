import React, { useEffect, useState } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getFormShareLink, getSingleCarePlanFormListService } from "../../services/CreateCarePlanService";
import InfoTemplateView from "./carePlanViewTemplates/InfoTemplateView";
import LongResponseFormView from "./carePlanViewTemplates/LongResponseFormView";
import ScaleFormView from "./carePlanViewTemplates/ScaleFormView";
import YesNoFormView from "./carePlanViewTemplates/YesNoFormView";
import TextTypeFormView from "./carePlanViewTemplates/TextFieldFormView";
import MultipleChoiceFormView from "./carePlanViewTemplates/MutipleChoiceFormView";
import NumberTypeFormView from "./carePlanViewTemplates/NumberFieldTextView";
import ShortResponseFormView from "./carePlanViewTemplates/ShortResponseFormView";
import MultipleChoiceButtonView from "./carePlanViewTemplates/MultipleChoiceButtonView";
import MultipleChoiceGrid from "./carePlanTemplates/MultipleChoiceGrid";
import RichTextView from "./carePlanViewTemplates/RichTextView";
import CalenderView from "./carePlanViewTemplates/CalenderView";
import TimeView from "./carePlanViewTemplates/TimeView";
import MultipleChoiceGridView from "./carePlanViewTemplates/MultipleChoiceGridView";
import Loader from "../../commonComponent/Loader";
import ShareLinkModal from "./ShareLinkModal";
import ProviderWaiversView from "./carePlanViewTemplates/ProviderWaiversView";
import ClientWaiversView from "./carePlanViewTemplates/ClientWaiversView";

const ViewFormsAndWaiver = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let formId = location?.state.formId || []
    const [formName, setFormName] = useState('');
    const [description, setDescription] = useState("");
    const [allFormData, setAllFormData] = useState([]);
    const [isLoading, setLoader] = useState(true);
    const [linkInput, setLinkInput] = useState("");

    const getShareLink = async () => {
        try {
            const response = await getFormShareLink(formId);
            setLoader(false);

            if (response.status === 200) {
                console.log(response, "responseData");
                setLinkInput(response?.data);
            } else {
                alert(response?.data || response.message);
            }
        } catch (error) {
            setLoader(false);
            error?.data?.data && alert(error?.data?.data || error.data?.message);
        }
    }

    const getSingleFormList = async () => {
        try {
            const response = await getSingleCarePlanFormListService(formId);
            setLoader(false);

            if (response.status === 200) {
                setAllFormData(response?.data[0]?.questions);
                setFormName(response?.data[0]?.formName);
                setDescription(response?.data[0]?.description)
                // setFilterData(response?.data?.data);
            } else {
                alert(response?.data || response.message);
            }
        } catch (error) {
            setLoader(false);
            error?.data?.data && alert(error?.data?.data || error.data?.message);
        }
    }

    useEffect(() => {
        getSingleFormList()
    }, [])
    const handleSubmit = async (e) => {

        e.preventDefault();
        // saveProgram();

    }
    const renderLoader = () => {
        return (
            <Loader
                visible={isLoading}
                style={{ top: 100, position: "relative" }}
            />)
    }
    const renderForm = () => {
        return (
            <>
                <ShareLinkModal link={linkInput} />
                <div className="my-4">
                    <h1 style={{ color: "#1f7e78" }}>{formName}</h1>
                    <h3 className="mt-4">{description}</h3>
                    {/* <p className="text-secondary">Fill in waiver information</p> */}
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="row add-recipe">

                        <div className="col-md-12 mt-4">
                            {
                                allFormData?.map((item, index) => {
                                    if (item.type == 'info') {
                                        return (
                                            <InfoTemplateView element={item} index={index} handleFormValuesUpdate={(a, b, c) => console.log("Typing...")} />
                                        )
                                    }
                                    if (item.type == 'longResponse') {
                                        return (
                                            <LongResponseFormView element={item} index={index} handleFormValuesUpdate={(a, b, c) => console.log("Typing...")} />
                                        )
                                    }
                                    if (item.type == 'scale') {
                                        return (
                                            <ScaleFormView element={item} index={index} handleFormValuesUpdate={(a, b, c) => console.log("Typing...")} />
                                        )
                                    }
                                    if (item.type == 'richText') {
                                        return (
                                            <RichTextView element={item} index={index} handleFormValuesUpdate={(a, b, c) => console.log("Typing...")} />
                                        )
                                    }
                                    if (item.type == 'waiverProvider') {
                                        return (
                                            <div key={index}>
                                                <ProviderWaiversView element={item} index={index} handleFormValuesUpdate={(a, b, c) => console.log("Typing...")} />
                                            </div>
                                        )
                                    }
                                    if (item.type == 'waiverClient') {
                                        return (
                                            <div key={index}>
                                                <ClientWaiversView element={item} index={index} handleFormValuesUpdate={(a, b, c) => console.log("Typing...")} />
                                            </div>
                                        )
                                    }
                                    if (item.type == 'multipleChoiceGrid') {
                                        return (
                                            <MultipleChoiceGridView element={item} index={index} handleFormValuesUpdate={(a, b, c) => console.log("Typing...")} />
                                        )
                                    }
                                    if (item.type == 'multipleChoiceButton') {
                                        return (
                                            <MultipleChoiceButtonView element={item} index={index} handleFormValuesUpdate={(a, b, c) => console.log("Typing...")} />
                                        )
                                    }
                                    if (item.type == 'calender') {
                                        return (
                                            <CalenderView element={item} index={index} handleFormValuesUpdate={(a, b, c) => console.log("Typing...")} />
                                        )
                                    }
                                    if (item.type == 'time') {
                                        return (
                                            <TimeView element={item} index={index} handleFormValuesUpdate={(a, b, c) => console.log("Typing...")} />
                                        )
                                    }
                                    if (item.type == 'yesNo') {
                                        return (
                                            <YesNoFormView element={item} index={index} handleFormValuesUpdate={(a, b, c) => console.log("Typing...")} />
                                        )
                                    }
                                    if (item.type == 'text') {
                                        return (
                                            <TextTypeFormView element={item} index={index} handleFormValuesUpdate={(a, b, c) => console.log("Typing...")} />
                                        )
                                    }
                                    if (item.type == 'multiChoice') {
                                        return (
                                            <MultipleChoiceFormView element={item} index={index} handleFormValuesUpdate={(a, b, c) => console.log("Typing...")} />
                                        )
                                    }
                                    if (item.type == 'number') {
                                        return (
                                            <NumberTypeFormView element={item} index={index} handleFormValuesUpdate={(a, b, c) => console.log("Typing...")} />
                                        )
                                    }
                                    if (item.type == 'shortResponse') {
                                        return (
                                            <ShortResponseFormView element={item} index={index} handleFormValuesUpdate={(a, b, c) => console.log("Typing...")} />
                                        )
                                    }
                                })
                            }
                        </div>
                        <div className="col-md-1 px-2 text-secondary">
                        </div>
                        <div className="col-md-12 mt-5">
                            <hr />
                            <div className="d-flex justify-content-between">
                                <button className="description_btnsave-white" onClick={() => navigate("/formsandwaiver")}>Back</button>
                                <button className="description_btnsave" data-bs-toggle="modal" data-bs-target="#shareModal" onClick={() => getShareLink()}>Share</button>
                            </div>
                        </div>
                    </div>

                </form>
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
                                <li class="breadcrumb-item active fw-bold" aria-current="page">View Forms & Waivers</li>
                            </ol>
                        </nav>
                        {!isLoading ? renderForm() : renderLoader()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewFormsAndWaiver;
