import React, { useState } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "../appointment/style.css";
import { useLocation } from "react-router-dom";
import "./style.css";
import ActiveProgramTabs from "./ActiveProgramTabs";
import { useNavigate } from "react-router-dom";
import { getActiveProgramById } from "../../services/ActivePrograms";
import ActiveProgramTemplateTabs from "./ActiveProgramTemplateTabs";

const ActiveTemplate = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;
    const programID = state?.program?._id;
    const defaultProgram = [state?.program];
    const defaultIsFromCreate = state.isFromCreate; // To Navigate for Active program tab module

    const [program, setProgram] = useState(defaultProgram);
    const [isFromCreate, setIsFromCreate] = useState(defaultIsFromCreate);

    const getProgram = async () => {
        try {
            const response = await getActiveProgramById(programID);
            console.log(response, "active program details")
            if (response.status === 200) {
                setProgram(response?.data?.data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>

            <div className="container-fluid mb-5">
                <div className="row">


                    <ActiveProgramTemplateTabs
                        singleActiveProgram={program}
                        programId={programID}
                        getProgramList={() => { }}
                        getProgramById={() => { }}
                        onChangeName={getProgram}
                        onChangeTab={() => setIsFromCreate(false)}
                        selectedIndex={isFromCreate} />
                </div>
            </div>
            {/* </div> */}
            {/* </div> */}
        </>
    );
};

export default ActiveTemplate;
