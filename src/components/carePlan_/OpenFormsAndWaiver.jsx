import React, { useEffect, useState } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { formListSumbitService, getSingleCarePlanFormListService } from "../../services/CreateCarePlanService";
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
import { showToastError, showToastSuccess } from "../../Utils/Helper";
import Button from "../../commonComponent/Button";
import ClientWaiversView from "./carePlanViewTemplates/ClientWaiversView";
import ProviderWaiversView from "./carePlanViewTemplates/ProviderWaiversView";

const OpenFormsAndWaiver = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // let careplanid = location?.state.careplanid || [];
    // let formid = location?.state.formid || []
    const [searchParams, setSearchParams] = useSearchParams();
    let userid = searchParams.get("userid")
    let formid = searchParams.get("formid")
    const [formName, setFormName] = useState('');
    const [description, setDescription] = useState("");
    const [allFormData, setAllFormData] = useState([]);
    const [allForm, setAllForm] = useState({});
    const [FData, setFData] = useState({});
    const [isLoading, setLoader] = useState(true);
    const [btnLoad, setBtnLoad] = useState(false);
    const [Ty, setTy] = useState(false);
    const getSingleFormList = async () => {
        try {
            const response = await getSingleCarePlanFormListService(formid);
            setLoader(false);

            if (response.status === 200) {
                console.log(response?.data, "response");
                setAllFormData(response?.data[0]?.questions);
                setFData(response?.data[0]);
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

    const saveProgram = async () => {
        try {
            const response = await formListSumbitService(formid, {
                "formName": formName,
                // "careplanId": FData?.careplanId,
                "userId": userid,
                "description": description,
                "questions": (Object.entries(allForm).sort((a, b) => a - b)).map(it => it[1])
            });
            setLoader(false);

            if (response.status === 200) {
                showToastSuccess("Form Submitted Successfully")
                console.log(response?.data, "response");
                setBtnLoad(false)
                setTy(true)
                // setTimeout(() => {
                //     window.location = "/openformandwaivers/submit/successfully";
                // }, 400);
                // setAllFormData(response?.data[0]?.questions);
                // setFormName(response?.data[0]?.formName);
                // setDescription(response?.data[0]?.description)
                // setFilterData(response?.data?.data);
            } else {
                showToastError(response?.data || response.message || "Some error occurred")
                // alert(response?.data || response.message);
                setBtnLoad(false)
            }
        } catch (error) {
            setLoader(false);
            setBtnLoad(false)
            showToastError(error?.data?.data || error.data?.message || "Some error occurred")
            // error?.data?.data && alert(error?.data?.data || error.data?.message);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        setBtnLoad(true)
        console.log(allForm);
        let info = true;

        // Object.entries(allForm).map(it => {
        //     if(it[1].type==='info' && (it[1].options).length!==Object.entries(it[1].answer).length){
        //         let valid = Object.values(it[1].answer).filter(val => val==="" || !val.length)
        //         if(valid.length){
        //             alert("Please fill all the inputs! x1")
        //             setBtnLoad(false)
        //             info = false
        //         }
        //     }
        // })
        if (allFormData.length !== Object.values(allForm).length) {
            showToastError("Please fill all the inputs!")
            // alert("Please fill all the inputs!")
            setBtnLoad(false)
            return
        }

        let inValid = Object.keys(allForm).filter(key => {
            if (allForm[key].type === 'info') {
                console.log(allForm[key].answer);
                if ((allForm[key].options).length !== Object.values(allForm[key].answer).length) return true;

                return Object.values(allForm[key].answer).filter(v => v === "" || !v.length).length
            }
            else if (allForm[key].type === 'multiChoice') {
                return Object.values(allForm[key].answer).filter(v => v).length == 0
            }
            else if (allForm[key].type === 'multipleChoiceButton') {
                return Object.values(allForm[key].answer).filter(v => v).length == 0
            }
            else if (allForm[key].type === 'multipleChoiceGrid') {
                return Object.values(allForm[key].answer).filter(v => v === "" || !v.length).length
            }
            else if (allForm[key].type === 'waiverClient') {
                return Object.values(allForm[key].answer).filter(v => !v || v === "").length
            }
            else if (allForm[key].type === 'waiverProvider') {
                return Object.values(allForm[key].answer).filter(v => !v || v === "").length
            }
            else if (allForm[key].type === 'richText') {
                return Object.values(allForm[key].answer).filter(v => v === "").length
            }
            else {
                console.log(allForm[key].answer);
                return (allForm[key].answer === "" || !(allForm[key].answer).length)
            }
        })

        console.log(inValid);
        if (inValid.length > 0) {
            showToastError("Please fill all the inputs!")
            // alert("Please fill all the inputs!!")
            setBtnLoad(false)
            return
        }
        else {
            // alert("All the inputs are submitted! x4")
            // setBtnLoad(false)

            saveProgram();
            // Final Data
            // let finalData = Object.entries(allForm).map(dt => {
            //     return dt[1];
            // })
            // console.log(finalData);
        }


    }

    let handleFormValuesUpdate = (element, formValues, index) => {
        console.log(formValues);
        setAllForm(prev => { return { ...prev, [+index]: { ...element, "answer": formValues } } })
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
                {!Ty ? <div>
                    <div className="my-4">
                        <h1 style={{ color: "#1f7e78" }}>{formName}</h1>
                        {/* <h3 className="mt-4">Edit Waiver and Form screen to customise and tailor form</h3> */}
                        <h3 className="mt-4">{description}</h3>
                        {/* <p className="text-secondary">Fill in waiver information</p> */}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="row add-recipe">

                            {/* <div className="col-md-11">
                            <div className="row">

                                <div className="col-md-12 mt-4">
                                    <h5>{formName}</h5>
                                </div>
                                <div className="col-md-12 mt-2">
                                    <p className="text-secondary">{description}</p>
                                </div>

                            </div>
                        </div> */}

                            <div className="col-md-12">
                                {
                                    allFormData?.map((item, index) => {
                                        if (item.type == 'info') {
                                            return (
                                                <div key={index}>
                                                    <InfoTemplateView element={item} index={index} handleFormValuesUpdate={handleFormValuesUpdate} />
                                                </div>
                                            )
                                        }
                                        if (item.type == 'waiverProvider') {
                                            return (
                                                <div key={index}>
                                                    <ProviderWaiversView element={item} index={index} handleFormValuesUpdate={handleFormValuesUpdate} />
                                                </div>
                                            )
                                        }
                                        if (item.type == 'waiverClient') {
                                            return (
                                                <div key={index}>
                                                    <ClientWaiversView element={item} index={index} handleFormValuesUpdate={handleFormValuesUpdate} />
                                                </div>
                                            )
                                        }
                                        if (item.type == 'longResponse') {
                                            return (
                                                <div key={index}>
                                                    <LongResponseFormView element={item} index={index} handleFormValuesUpdate={handleFormValuesUpdate} />
                                                </div>
                                            )
                                        }
                                        if (item.type == 'scale') {
                                            return (
                                                <div key={index}>
                                                    <ScaleFormView element={item} index={index} handleFormValuesUpdate={handleFormValuesUpdate} />
                                                </div>
                                            )
                                        }
                                        if (item.type == 'richText') {
                                            return (
                                                <div key={index}>
                                                    <RichTextView element={item} index={index} handleFormValuesUpdate={handleFormValuesUpdate} />
                                                </div>
                                            )
                                        }
                                        if (item.type == 'multipleChoiceGrid') {
                                            return (
                                                <div key={index}>
                                                    <MultipleChoiceGridView element={item} index={index} handleFormValuesUpdate={handleFormValuesUpdate} />
                                                </div>
                                            )
                                        }
                                        if (item.type == 'multipleChoiceButton') {
                                            return (
                                                <div key={index}>
                                                    <MultipleChoiceButtonView element={item} index={index} handleFormValuesUpdate={handleFormValuesUpdate} />
                                                </div>
                                            )
                                        }
                                        if (item.type == 'calender') {
                                            return (
                                                <div key={index}>
                                                    <CalenderView element={item} index={index} handleFormValuesUpdate={handleFormValuesUpdate} />
                                                </div>
                                            )
                                        }
                                        if (item.type == 'time') {
                                            return (
                                                <div key={index}>
                                                    <TimeView element={item} index={index} handleFormValuesUpdate={handleFormValuesUpdate} />
                                                </div>
                                            )
                                        }
                                        if (item.type == 'yesNo') {
                                            return (
                                                <div key={index}>
                                                    <YesNoFormView element={item} index={index} handleFormValuesUpdate={handleFormValuesUpdate} />
                                                </div>
                                            )
                                        }
                                        if (item.type == 'text') {
                                            return (
                                                <div key={index}>
                                                    <TextTypeFormView element={item} index={index} handleFormValuesUpdate={handleFormValuesUpdate} />
                                                </div>
                                            )
                                        }
                                        if (item.type == 'multiChoice') {
                                            return (
                                                <div key={index}>
                                                    <MultipleChoiceFormView element={item} index={index} handleFormValuesUpdate={handleFormValuesUpdate} />
                                                </div>
                                            )
                                        }
                                        if (item.type == 'number') {
                                            return (
                                                <div key={index}>
                                                    <NumberTypeFormView element={item} index={index} handleFormValuesUpdate={handleFormValuesUpdate} />
                                                </div>
                                            )
                                        }
                                        if (item.type == 'shortResponse') {
                                            return (
                                                <div key={index}>
                                                    <ShortResponseFormView element={item} index={index} handleFormValuesUpdate={handleFormValuesUpdate} />
                                                </div>
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
                                    {/* <button className="description_btnsave justify-content-end flex-end" onClick={() => navigate("/formsandwaiver", { state: { carePlan: careplanid } })}>Back</button> */}
                                    {/* <button className="description_btnsave mx-0">Submit</button> */}
                                    <Button isLoading={btnLoad} type="submit" id="jhsv" text={'Submit'} style={btnLoad ? { pointerEvents: 'none' } : {}} className="description_btnsave mx-0" />
                                </div>
                            </div>
                        </div>

                    </form>
                </div> :
                    <div className="my-5 d-flex align-items-center flex-column">
                        <h1 style={{ color: "#1f7e78" }} className="text-center">{formName}</h1>
                        {/* <h3 className="mt-4 text-center">{description}</h3> */}
                        <p className="text-secondary text-center">Thank you your response has been recorded. you can safely close the form now.</p>
                        <Button text="View your response" type="button" className="btn btn-primary btn-custom mt-3" onClick={() => window.location = `/openformandwaivers/submitted?formid=${formid}&userid=${userid}`} />
                    </div>
                }

            </>
        );
    }

    return (
        <>
            <div className="container-fluid py-4">
                {/* <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">Dashboard</li>
                    <li className="breadcrumb-item">Careplan</li>
                    <li className="breadcrumb-item active fw-bold" aria-current="page">Forms & Waivers</li>
                </ol>
            </nav> */}
                <div className="container">
                    <div className="row justify-content-start">
                        {!isLoading ? renderForm() : renderLoader()}
                        {/* {renderForm()} */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default OpenFormsAndWaiver;
