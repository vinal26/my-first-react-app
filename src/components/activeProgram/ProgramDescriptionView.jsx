import { format, parseISO } from "date-fns";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ApiConfig from "../../config/ApiConfig";

const ProgramDescriptionView = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let program = location?.state.program || [];

    // const avgRating = () => {
    //     let total;
    //     {
    //         program?.ratings?.map((item) => {
    //             total += item;
    //             return total;
    //         })
    //     }
    //     return total / program?.ratings?.length
    // }
    return (
        <>

            <div className="container-fluid mb-5">
                <div>

                    {/* <div className="custom-tabs border-bottom d-flex mt-3">
                            <p className="px-3 py-2 border-bottom  border-2 tab mb-0 active">Program Description</p>
                            <p className="px-3 py-2 tab mb-0">Module</p>
                            <p className="px-3 py-2 tab mb-0">Session</p>
                            <p className="px-3 py-2 tab mb-0">Forum</p>
                            <p className="px-3 py-2 tab mb-0">Members</p>
                        </div> */}
                    {/* <hr className="viewrecipe_hr mt-4 mb-1" /> */}
                    <div className="text-center mt-4">
                        <img
                            src={ApiConfig.ImageUrl + 'programs/' + program.createdBy + '/' + program.programImage}
                            className="w-100"
                            style={{ height: "250px", objectFit: "cover" }}
                        />
                    </div>
                    <div className="w-100 mt-3 p-3 shadow-sm" style={{ backgroundColor: "#FBFBFB" }}>
                        <div className="row mb-4">
                            <div className="col-sm-4">
                                <p className="mb-1" style={{ color: "#a6a4a4" }}>Program Title</p>
                                <p className="mb-0">{program?.programName}</p>
                            </div>
                            <div className="col-sm-5">
                                <p className="mb-1" style={{ color: "#a6a4a4" }}>Description</p>
                                <p className="mb-0">{program?.description}</p>
                            </div>
                            {/* <div className="col-sm-3">
                                <p className="mb-1" style={{ color: "#a6a4a4" }}>Rating</p>
                                <p className="mb-0">{program?.ratings?.length ? avgRating() : 0}</p>
                            </div> */}
                        </div>
                        <div className="row">
                            <div className="col-sm-3">
                                <p className="mb-1" style={{ color: "#a6a4a4" }}>Start Date</p>
                                <p className="mb-0">{format(parseISO(program?.startDate), 'MMM d, yyyy')}</p>
                            </div>
                            <div className="col-sm-3">
                                <p className="mb-1" style={{ color: "#a6a4a4" }}>End Date</p>
                                <p className="mb-0">{format(parseISO(program?.endDate), 'MMM d, yyyy')}</p>
                            </div>
                            <div className="col-sm-3">
                                <p className="mb-1" style={{ color: "#a6a4a4" }}>No of Participants</p>
                                <p className="mb-0">{program?.programMembers?.length}</p>
                            </div>
                            <div className="col-sm-3">
                                <p className="mb-1" style={{ color: "#a6a4a4" }}>Interested Members</p>
                                <p className="mb-0">   {program?.interestedMembers?.length}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ProgramDescriptionView;