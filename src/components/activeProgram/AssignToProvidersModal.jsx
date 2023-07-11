import React, { Fragment, useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { RiContactsBookUploadFill } from 'react-icons/ri';
import Loader from '../../commonComponent/Loader';
import { getMyGroupList } from '../../services/GroupService';
import { getDoctors } from '../../services/DoctorService';
import { showToastError } from '../../Utils/Helper';
import ApiConfig from '../../config/ApiConfig';

const AssignProvidersModal = ({ addMember, members, setMembers }) => {
    const [check, setCheck] = useState(0);
    const [providersLists, setProvidersLists] = useState(members);
    const [groupLists, setGroupLists] = useState([]);
    const [filterdata, setFilterData] = useState([]);
    const [isLoading, setLoader] = useState(true);
    // const [memeberLists, setMemberLists] = useState([]);
    // Server Methods
    // console.log(members, "members")
    // const getGroupLists = async (searchWord) => {
    //     setGroupLists([])
    //     setMembers([])

    //     try {
    //         const response = await getMyGroupList(searchWord);
    //         setLoader(false);
    //         if (response.status === 200) {
    //             setGroupLists(response?.data?.data);
    //             setFilterData(response?.data?.data);
    //         }
    //     } catch (error) {
    //         setLoader(false);
    //         console.log(error);
    //     }
    // };

    const getDoctorList = async () => {
        setProvidersLists([])

        try {
        const response = await getDoctors();

        if (response.status === 200) {
            setLoader(false);
            // console.log(response?.data?.data, "Doctor List");
            setGroupLists(response?.data?.data);
            setFilterData(response?.data?.data);
            setTimeout(() => {
            // document?.getElementById(response?.data?.data[0]._id)?.click()
            }, 1000);

        } else {
            showToastError(response?.data || response.message);
            setLoader(false);
        }
        } catch (error) {
        setLoader(false);
        error?.data?.data && showToastError(error?.data?.data || error.data?.message);
        }
    }

    const UpdateGroup = (checked, member) => {
        if (checked) {
            setCheck(prev => prev+1);
            setProvidersLists((prev) => [...prev, member])
        }
        else {
            setCheck(prev => prev-1);
            setProvidersLists((prev) => prev.filter(dt => dt != member))
        }
    }

    const onSearch = async (e) => {
        let searchWord = e.target.value;
        const result = groupLists.filter((value) => {
            if (value) {
                return (
                    value?.full_name?.toLowerCase()?.includes(searchWord?.toLowerCase())
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
        // getGroupLists();
        getDoctorList()
        // setMemberLists(members);
    }, [members])

    return (
        <div
            className="modal fade"
            id="assigngroupproviders"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content px-4">
                    <div className="modal-header px-4 border-0">
                        <h5 className="modal-title">Assign to Providers</h5>
                        <button type="button" id="btn-close" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body pt-4 pb-2 px-4 ">
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
                                        filterdata.filter(dt => !members?.includes(dt._id)).map((dt, index) => {
                                            // filterdata.map((dt, index) => {
                                            // console.log(dt, "dt._id")
                                            return (
                                                <div
                                                    key={index}
                                                    // className={`card mb-2 p-1 ${index == 0 ? "active" : ""}`}
                                                    className={`card mb-2 py-2 px-3`}
                                                    style={{ background: "#F2F4F6" }}
                                                    onClick={() => {
                                                    }}
                                                    id={dt._id}
                                                >
                                                    <div className="btn-group  align-items-center gap-2">
                                                        <p className="affir_checkbox mb-0">
                                                            <input
                                                                type="checkbox"
                                                                name="members"
                                                                value={dt._id}
                                                                checked={providersLists.includes(dt._id)}
                                                                id="flexCheckDefault"
                                                                onChange={(e) => UpdateGroup(e.target.checked, e.target.value)}
                                                            />
                                                        </p>

                                                        <div className="p-0 actlist_wid1 d-flex mb-0 justify-content-center align-items-center affir_checkbox" for="flexCheckDefault" >
                                                            <img src={dt.profilePicture ? ApiConfig.ImageUrl + 'doctor/' + dt._id + '/' + dt.profilePicture : "/images/avatar.png"} onError={(e) => {
                                                                e.target.src = "/images/avatar.png" //replacement image imported above
                                                            }} alt="" className="member_listimage" />

                                                        </div>
                                                        <div className=" actlist_wid2 ms-2">
                                                            <p className="py-0 mb-0">
                                                                {`${dt.full_name}`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="table_resouter card bg-light p-2 my-2">
                                                        <table class="table mb-0 table-borderless table_resinner4">
                                                            <tbody>
                                                                <tr>
                                                                    <td colSpan={2}><span className="fw-bold">Qualifications: </span> 
                                                                    {Array.isArray(dt.qualifications)
                                                                    ? dt?.qualifications.length > 0
                                                                        ? dt.qualifications.map((item, idx, arr) => {
                                                                        return (
                                                                            <Fragment key={idx}>
                                                                            {item.name}
                                                                            {arr.length - 1 == idx ? "" : ", "}
                                                                            </Fragment>
                                                                        );
                                                                        })
                                                                        : "N/A"
                                                                    : dt.qualifications}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className='text-capitalize'><span className="fw-bold">Category:</span> {dt.docCategory}</td>
                                                                    <td><span className="fw-bold">Year of experience:</span>  {dt.yearsOfExperience}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
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
                    <div className="modal-footer px-3 border-0 mb-3">
                        <button type="button" onClick={() => {addMember(providersLists); setProvidersLists([])}} data-bs-dismiss="modal"
                            disabled={check==0}
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

export default AssignProvidersModal;