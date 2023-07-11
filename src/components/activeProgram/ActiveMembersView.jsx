import React from "react";
import { useState, useEffect } from "react";
import {
    inviteMembers,
    deleteMemberService,
    getActiveMembers,
    getActiveProgramById,
} from "../../services/ActivePrograms";
import { isOnlyEmpty, showToastError, showToastSuccess } from "../../Utils/Helper";
import Loader from "../../commonComponent/Loader";
import { FiSearch } from "react-icons/fi";
import { AiOutlineCloseCircle, AiOutlinePlus } from "react-icons/ai";
import { Link as button, useLocation, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { format, parseISO } from "date-fns";
import SquareAvatar from "../../commonComponent/SquareAvatar";
import DeleteModal from "../../commonComponent/DeleteModal";

const ActiveMembersView = (props) => {
    const [memberList, setMemberList] = useState([]);
    const [memberId, setMemberId] = useState("");
    const [askLoader, setAskLoader] = useState(false);
    const [replyLoader, setReplyLoader] = useState(false);
    const [isLoading, setLoader] = useState(true);
    const [filterdata, setFilterData] = useState([]);

    let location = useLocation();
    // console.log(program, "programss")
    const programId = props.programId;
    const [program, setProgramDetails] = useState({});
    const [formValues, setFormValues] = useState([{ email: "", first_name: "", last_name: "" }])
    let addFormFields = () => {
        setFormValues([...formValues, { email: "", first_name: "", last_name: "" }])
    }

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }
    useEffect(() => {
        getMembersById();
        getActiveProgramByIds();
    }, [programId]);

    const getMembersById = async (searchWord) => {
        try {
            const response = await getActiveMembers(programId, searchWord);
            // setLoader(false);
            if (response.status === 200) {
                console.log(response.data.data, "membersss")
                setMemberList(response?.data?.data[0]?.programMembers)
                setFilterData(response?.data?.data[0]?.programMembers);
            } else {
                console.log(response?.data || response.message);
            }
        } catch (error) {
            // setLoader(false);
            error?.data?.data &&
                console.log(error?.data?.data || error.data?.message);
        }
    };
    const getActiveProgramByIds = async (programId) => {
        setLoader(true)
        // console.log(sessionId);
        try {

            const response = await getActiveProgramById(programId);

            if (response.status === 200 && response?.data) {
                setProgramDetails(response.data);
            } else {
                console.log(response?.data || response.message);
            }
            setLoader(false)
        } catch (error) {

            error?.data?.data &&
                console.log(error?.data?.data || error.data?.message);
            setLoader(false)
        }
    };
    const renderListRow = (item) => {
        // console.log(item.date, "item")
        return (
            <tr>
                <td className="text-muted"><SquareAvatar
                    src={item?._id?.profilePicture}
                    className="member_listimage squre_image2"
                /></td>
                <td className="text-muted">{`${item?._id?.full_name}`}</td>
                <td className="text-muted">User</td>
                <td className="text-muted">{item?.date ? format(parseISO(item?.date), 'MMM d, yyyy') : null}</td>
                {/* <td className="text-muted">Dec 1, 2022</td> */}

            </tr>
        )
    }

    const renderList = () => {
        return (
            <tbody>
                {filterdata?.map((item) => {
                    return renderListRow(item)
                })}
            </tbody>
        )
    }
    const renderLoader = () => {
        return (
            <Loader
                visible={false}
                emptyTextKey={'noAnyActiveMember'}
                style={{ top: 0, position: "relative" }} />
        )
    }

    return (
        <div className="container">
            <div className="mt-4 px-2" style={{ height: "486px" }}>
                <div className="my-4">
                    <h2>Members</h2>
                </div>
                <div className="memlist_scroll mt-4 spacing_scroll">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <td className="py-4" scope="col text-secondary">Photo</td>
                                <td className="py-4" scope="col text-secondary">Member Name</td>
                                <td className="py-4" scope="col text-secondary">Role</td>
                                <td className="py-4" scope="col text-secondary">Date Added</td>
                                {/* <td className="py-4" scope="col text-secondary">Last Active</td> */}
                            </tr>
                        </thead>
                        {renderList()}
                    </table>
                    {!memberList?.length ? renderLoader() : null}
                </div>
            </div>
        </div>
    );
};

export default ActiveMembersView;
