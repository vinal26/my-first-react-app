import React from "react";
import { useState } from "react";
import {
    addActiveSession,
    deleteSessionService,
    getActiveSession,
    getSessionDaysService,
    getSIngleSession,
    putSIngleActiveSession,
} from "../../services/ActivePrograms";
import { useEffect } from "react";
import { changeDateFormat, changeDateFormatmmddyyyy, changeDateFormatYYYY, checkEndDate, convertTime12to24, isEmpty, onStartSession, showToastError, showToastSuccess } from "../../Utils/Helper";
import TimePicker from "../../commonComponent/TimePicker";
import Loader from "../../commonComponent/Loader";
import DropDownMultiSelect from "../../commonComponent/DropDownMultiSelect";
import Button from "../../commonComponent/Button";
import { createZoomMeetingService } from "../../services/ZoomService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";


const ActiveSessionView = (props) => {
    const navigate = useNavigate();
    const auth = useAuth();
    const programId = props.programId;
    // const [programDetails, setProgramDetails] = useState({});
    const [sessionWeeks, setSessionWeeks] = useState("");
    const [getSessionList, setGetSessionList] = useState([]);
    const [sessionDays, setSessionDays] = useState("");
    const [isLoading, setLoader] = useState(true);
    const [sessionId, setSessionId] = useState("");
    useEffect(() => {
        getSessionById();
        getSessionDays();

    }, [programId]);
    const getSessionDays = async () => {
        try {
            const response = await getSessionDaysService(programId);
            if (response) {
                setSessionDays(response);
            }
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(sessionWeeks)


    const getSessionById = async () => {
        try {
            const response = await getActiveSession(programId);
            setLoader(false);
            if (response.status === 200) {
                setGetSessionList(response?.data?.data);
            }
        } catch (error) {
            setLoader(false);
            setGetSessionList([]);
        }
    };


    const renderError = (msg, value) => {
        return (
            value ? (
                <h6 className="blog_error_text4" style={{ marginBottom: 15, marginTop: -15 }}>
                    {msg}
                </h6>) : null)
    }


    const renderSessionList = () => {
        return getSessionList.map((session, index) => {
            const canStartSession = !checkEndDate(session.sessionDate);
            // var time = new Date(session.createdAt);
            return (
                <div className="d-flex mb-3">
                    <span className="px-3 py-3 numbr">{index + 1 < 10 && "0"}{index + 1}</span>
                    <div className="flex-grow-1 card d-flex px-4 py-3 flex-row justify-content-between align-items-center">
                        <div>
                            <h5>{session.title}</h5>
                            <p className="mb-0">{changeDateFormatmmddyyyy(session.sessionDate)}</p>
                        </div>
                        <button
                            className="btn btn-primary btn-custom-light"
                            // data-bs-toggle="modal" data-bs-target="#exampleModal"
                            disabled={auth?.authUser?._id !== session?.createdById || !canStartSession} onClick={() => canStartSession && auth?.authUser?._id === session?.createdById && onStartSession(session?.sessionLink_doctor)} style={{ backgroundColor: canStartSession ? null : '#d81010' }}
                        >
                            {canStartSession ? 'start session' : 'session completed'}
                        </button>
                    </div>
                </div>
            );
        })
    }

    return (
        <div className="container">
            <div className="my-4">
                <h2>Session </h2>
                {/* <p>Gravida vestibulum felis tristique lectus elementum. Amet ut est cursus sociis.</p> */}
            </div>
            <div className="table_resouter mt-4">
                {isLoading ? (
                    <center>
                        <div
                            style={{ width: "3rem", height: "3rem", color: "#1f7e78" }}
                            class="spinner-border mt-3 mb-4"
                            role="status"
                        />
                    </center>
                ) : getSessionList == "" ? (
                    <Loader textClassName={`mt-0`} showBR={false} emptyTextKey={`noData`} mainClassName={`active_n0data2`} />
                ) : renderSessionList()}
            </div>

        </div>
    );
};

export default ActiveSessionView;
