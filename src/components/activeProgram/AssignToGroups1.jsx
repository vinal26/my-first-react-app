import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { RiContactsBookUploadFill } from 'react-icons/ri';
import Loader from '../../commonComponent/Loader';
import { getMyGroupList, updateGroupService } from '../../services/GroupService';
import { getMyPatientList } from '../../services/PatientService';
import { groupMembers, toastMsg } from '../../Utils/AllConstant';
import { showToastSuccess } from '../../Utils/Helper';


const AssignGroupModal1 = ({ members }) => {
    const [groupLists, setGroupLists] = useState([]);
    const [groupid, setGroupid] = useState("");
    const [filterdata, setFilterData] = useState([]);
    const [isLoading, setLoader] = useState(true);
    const [memeberLists, setMemberLists] = useState([members]);
    // Server Methods
    const getGroupLists = async (searchWord) => {
        setGroupLists([])

        try {
            const response = await getMyGroupList(searchWord);
            setLoader(false);
            if (response.status === 200) {
                setGroupLists(response?.data?.data);
                setFilterData(response?.data?.data);
            }
        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    };

    const UpdateGroup = (checked, id) => {
        if (checked)
            setMemberLists((prev) => [...prev, members])
        else
            setMemberLists(groupLists.filter(dt => dt._id != id))

    }

    const saveGroup = () => {
        memeberLists.map(dt => {
            updateGroup(dt);
        })

        document.getElementById('btn-close').click()
    };

    const updateGroup = async (id) => {
        try {
            setLoader(true);
            const response = await updateGroupService(id, {
                careplanId: [members],
            })
            setLoader(false)
            if (response) {
                showToastSuccess(toastMsg.updateGroup)
                // navigate(-1)
            }
        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    }

    const onSearch = async (e) => {
        let searchWord = e.target.value;
        const result = groupLists.filter((value) => {
            if (value) {
                return (
                    value?.groupName?.toLowerCase()?.includes(searchWord?.toLowerCase())
                );
            }
        });

        if (searchWord === "") {
            setFilterData(groupLists);
            // getGroupLists(searchWord);
        } else {
            setFilterData(result);
        }
    };
    useEffect(() => {
        getGroupLists();
        // setMemberLists(members);
    }, [members])

    return (
        <div
            className="modal fade"
            id="assigngroupmodal1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header px-4 border-0">
                        <h5 >Assign to Groups</h5>
                        <button type="button" id="btn-close" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-4">
                        <div style={{ marginTop: "-10px", display: "flex", "justifyContent": "end", marginBottom: "10px", marginLeft: "-5px" }}>
                            <div className="actsearch_box1">
                                <FiSearch className="boxicon" />
                                <input
                                    placeholder="Search Here..."
                                    className="ms-2"
                                    onChange={(e) => onSearch(e)}
                                />
                            </div>
                        </div>


                        <div className="col-md-12 p-1">
                            <div className="memlist_scroll mt-1 justify-content-center spacing_scroll" style={{ height: 300 }}>
                                {isLoading ? (
                                    <center>
                                        <Loader
                                            visible={isLoading}
                                            style={{ top: "48px", position: "relative" }}
                                        />
                                    </center>
                                ) :
                                    filterdata?.length ? (
                                        // filterdata.filter(dt => !members?.includes(dt._id)).map((dt, index) => {
                                        filterdata.map((dt, index) => {
                                            return (
                                                <div
                                                    key={dt._id}
                                                    // className={`card mb-2 p-1 ${index == 0 ? "active" : ""}`}
                                                    className={`card mb-2 p-1`}
                                                    onClick={() => {
                                                    }}
                                                    id={dt._id}
                                                >
                                                    <div className="btn-group mt-1 align-items-center">
                                                        <p className="affir_checkbox">
                                                            <input
                                                                type="checkbox"
                                                                name="members"
                                                                value={dt._id}
                                                                // checked={memeberLists?.includes(members) ? true : false}
                                                                id="flexCheckDefault"
                                                                onChange={(e) => UpdateGroup(e.target.checked, e.target.value)}
                                                            />
                                                        </p>

                                                        {/* <div className="col-md-2 p-0 actlist_wid1 d-flex  justify-content-center align-items-center affir_checkbox" for="flexCheckDefault" >
                                                            <img src={dt.groupImage} onError={(e) => {
                                                                e.target.src = "images/avatar.png" //replacement image imported above
                                                            }} alt="" className="member_listimage" />

                                                        </div> */}
                                                        <div className="col-md-10 actlist_wid2">
                                                            <p className="py-0">
                                                                {`${dt.groupName}`}
                                                            </p>
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    ) : (
                                        <p className="p-2">No data found!</p>
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer px-5 border-0">
                        <button type="button" onClick={() => saveGroup()} data-bs-dismiss="modal"
                            className="description_btnsave w-100" style={{
                                backgroundColor: "#1f7e78",
                                borderColor: "#1f7e78",
                            }}>
                            {'Assign'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default AssignGroupModal1;
