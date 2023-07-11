import { format, parseISO } from "date-fns";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";
import { RiEdit2Fill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SquareAvatar from "../../commonComponent/SquareAvatar";
import { getActiveProgramById } from "../../services/ActivePrograms";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import ActiveProgramTabs from "./ActiveProgramTabs";
import ActiveViewTabs from "./ActiveViewTabs";

const ActiveProgramInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let program = location?.state.program || [];
    const state = location.state;
    const programID = state?.program?._id;
    const defaultProgram = [state?.program];
    const defaultIsFromCreate = state.isFromCreate; // To Navigate for Active program tab module

    const [isFromCreate, setIsFromCreate] = useState(defaultIsFromCreate);

    return (
        <>
            <Navbar />
            <div className="container-fluid mb-5">
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar />
                    </div>
                    <div className="col-md-10 py-4 px-5">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                            <li class="breadcrumb-item cursor-pointer" onClick={() => navigate(-1)}>Programs</li>
                            <li class="breadcrumb-item active fw-bold" aria-current="page">{program?.programName}</li>
                            </ol>
                        </nav>
                        <div className="d-flex justify-content-between p-2">
                            <div className="w-75">
                                <h4>{program?.programName}</h4>
                                <p>{program?.description}</p>
                                <div className="row py-4">
                                    <div className="col-md-3">
                                        <p className="mb-0 text-muted">
                                            Created by : <span className="fw-bold">{program.createdByDoc}</span>
                                        </p>
                                    </div>

                                    <div className="col-md-4">
                                        <p className="mb-0 text-muted">
                                            Created on: <span className="fw-bold">{program?.createdAt && format(parseISO(program?.createdAt), 'MMM d, yyyy')} </span>
                                        </p>
                                    </div>

                                    <div className="col-md-4">
                                        <p className="mb-0 text-muted">
                                            <IoIosPeople size={"30px"} /> Members: <span className="fw-bold">{program?.programMembers?.length}</span>
                                        </p>
                                    </div>

                                </div>
                            </div>
                            <div className="w-25 d-flex justify-content-end">
                                <button
                                    onClick={() => navigate("/activeprogram", { state: { program, isFromCreate: false } })}
                                    className="btn btn-primary btn-custom">
                                    <RiEdit2Fill className="me-2" /> Edit
                                </button>
                            </div>
                        </div>
                        <div className="mb-5">
                            <ActiveViewTabs
                                singleActiveProgram={program}
                                programId={programID}
                                getProgramList={() => { }}
                                getProgramById={() => { }}
                                onChangeName={program}
                                onChangeTab={() => setIsFromCreate(false)}
                                selectedIndex={isFromCreate} />
                        </div>
                        {/* <div className="custom-tabs border-bottom d-flex mt-3">
                            <p className="px-3 py-2 border-bottom  border-2 tab mb-0 active">Program Description</p>
                            <p className="px-3 py-2 tab mb-0">Module</p>
                            <p className="px-3 py-2 tab mb-0">Session</p>
                            <p className="px-3 py-2 tab mb-0">Forum</p>
                            <p className="px-3 py-2 tab mb-0">Members</p>
                        </div> */}

                    </div>
                </div>
            </div>
        </>
    );
};

export default ActiveProgramInfo;