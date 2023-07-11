import React, { useEffect, useState } from "react";
import { BiShare } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
import { RiEdit2Fill, RiShareFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { getCarePlanFormDefaultList, getCarePlanFormListService, getFormShareLink, setDefaultTemplate } from "../../services/CreateCarePlanService";
import { showToastError, showToastSuccess } from "../../Utils/Helper";
import ShareLinkModal from "./ShareLinkModal";

const RecommendedFormsView = () => {
    const navigate = useNavigate();
    const { isAdmin } = useAuth();
    const [isLoading, setLoader] = useState(true);
    const [formList, setFormList] = useState([]);
    const [linkInput, setLinkInput] = useState("");
    const getShareLink = async (formId) => {
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

    const getFormList = async () => {
        try {
            const response = await getCarePlanFormDefaultList();
            setLoader(false);

            if (response.status === 200) {
                setFormList(response?.data);
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
        getFormList()
    }, [])

    const makeDefault = async (id) => {
        try {
            const response = await setDefaultTemplate(id);
            if (response.status === 200) {
                // document.getElementById("checkbox").checked = true;
                getFormList()
                showToastSuccess(`Action completed successfully`)
                // renderListRow();

            } else {
                showToastError(response?.data || response.message || "Some error occurred")
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            {isLoading ? (
                <center>
                    <div
                        style={{
                            width: "3rem", height: "3rem", color: "#1f7e78", top: "110px",
                            position: "relative"
                        }}
                        className="spinner-border mt-3 mb-4"
                        role="status"
                    />
                </center>
            ) :
                formList.length ? formList.map((dt, i) =>
                    <div key={i} className="card shadow-sm border-0 mb-3 p-3 d-flex flex-md-row justify-content-between">
                        <ShareLinkModal link={linkInput} />
                        <div className="d-flex align-items-center">
                            <div>
                                <h6>{dt.formName}</h6>
                                {/* <div className="row"> */}
                                {/* <div className="col-sm-3"><p className="mb-0 me-3">Description</p></div> */}
                                <div className="col-md-12"><p className="mb-0 ">{dt.description}</p></div>
                                {/* </div> */}
                            </div>
                        </div>

                        <div className="d-flex justify-content-around align-items-center">
                            {isAdmin && <button className="btn btn-primary btn-custom-light ms-3" onClick={() => makeDefault(dt._id)}>
                                <span>{dt.default === true ? 'Remove as template' : 'Set as template'}</span>
                            </button>}
                            <button className="btn btn-primary btn-custom-light ms-3" onClick={() => navigate("/viewformsandwaiver", { state: { formId: dt._id } })}>
                                <span><BsFillEyeFill className="me-2" />View</span>
                            </button>
                            <button className="btn btn-primary btn-custom-light ms-3" onClick={() => navigate("/editformsandwaivertemplate", { state: { formId: dt._id } })} >
                                <span><RiEdit2Fill className="me-2" />Edit</span>
                            </button>

                            {/* <button className="btn btn-primary btn-custom-light ms-3" data-bs-toggle="modal" data-bs-target="#shareModal" onClick={() => getShareLink(dt._id)}>
                                <span><RiShareFill className="me-2" />Share</span>
                            </button> */}
                        </div>

                    </div>
                ) : <div className="card p-2"><div className="card-body ml-10">There are currently no forms.</div></div>}

        </>
    );
};

export default RecommendedFormsView;