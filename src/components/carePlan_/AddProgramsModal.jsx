import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { RiContactsBookUploadFill } from 'react-icons/ri';
import Loader from '../../commonComponent/Loader';
import { getMyPatientList } from '../../services/PatientService';
import { groupMembers } from '../../Utils/AllConstant';
import { getActiveProgram } from '../../services/ActivePrograms';
import ApiConfig from '../../config/ApiConfig';
import { forEach } from 'async';
import { formatNewDate } from '../../Utils/Helper';
import { format } from 'date-fns';


const AddPrograms = ({ programsList, members, setMembers }) => {
    // const [programList, setProgramList] = useState([]);
    const [filterdata, setFilterData] = useState([]);
    const [isLoading, setLoader] = useState(true);
    const [memberAdd, setMemberAdd] = useState([...members]);

    // // Server Methods
    // const getProgramLists = async (searchWord) => {
    //     setProgramList([])
    //     // setMembers([])

    //     try {
    //         const response = await getActiveProgram(searchWord);
    //         setLoader(false);
    //         if (response.status === 200) {
    //             setProgramList(response?.data?.data);
    //             setFilterData(response?.data?.data);
    //         }
    //     } catch (error) {
    //         setLoader(false);
    //         console.log(error);
    //     }
    // };

    useEffect(() => {
        if (programsList) {
            setFilterData(programsList)
            setLoader(false)
        }
    }, [programsList])
    const UpdateMember = (checked, member) => {
        if (checked)
        setMemberAdd((prev) => [...prev, member])
        else
        setMemberAdd((prev) => prev.filter(dt => dt != member))
    }
    // const UpdateMember = (checked, member) => {
    //     if (checked) {
    //         setMembers((prev) => {
    //             return [...prev, member]
    //         })
    //     }
    //     else {
    //         setMembers((prev) => {
    //             let arr = prev.filter(dt => dt != member)
    //             return arr
    //         })
    //     }
    // }

    const onSearch = async (e) => {
        let searchWord = e.target.value;
        const result = programsList.filter((value) => {
            if (value) {
                return (
                    value?.programName?.toLowerCase()?.includes(searchWord?.toLowerCase())
                );
            }
        });
        if (searchWord === "") {
            setFilterData(programsList);
            // getGroupLists(searchWord);
        } else {
            setFilterData(result);
        }
    };
    // useEffect(() => {
    //     getProgramLists();
    // }, [])

    return (
        <div
            className="modal fade"
            id="assignprogrammodal"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content px-4">
                    <div className="modal-header px-4 border-0">
                        <h5 className="modal-title">Add Programs</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body pt-4 pb-2 px-4">
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
                                                    className={`card mb-2 py-2 px-3`}
                                                    style={{ background: "#F2F4F6" }}
                                                    onClick={() => {
                                                    }}
                                                    id={dt._id}
                                                >
                                                    <div className="btn-group align-items-center gap-2">
                                                        <p className="affir_checkbox mb-0">
                                                            <input
                                                                type="checkbox"
                                                                name="members"
                                                                value={dt._id}
                                                                checked={memberAdd?.includes(dt._id)}
                                                                id="flexCheckDefault"
                                                                onChange={(e) => {
                                                                    UpdateMember(e.target.checked, e.target.value, dt);
                                                                }}
                                                            />
                                                        </p>

                                                        <div className="p-0 actlist_wid1 d-flex mb-0 justify-content-center align-items-center affir_checkbox" for="flexCheckDefault" >
                                                            <img src={ApiConfig.ImageUrl + 'programs/' + dt.createdBy + '/' + dt.programImage} onError={(e) => {
                                                                e.target.src = "images/avatar.png" //replacement image imported above
                                                            }} alt="" className="member_listimage" />

                                                        </div>
                                                        <div className="actlist_wid2 ms-2">
                                                            <p className="py-0">
                                                                {`${dt.programName}`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="table_resouter card bg-light p-2 my-2">
                                                        <table class="table mb-0 table-borderless table_resinner4">
                                                            <tbody>
                                                                <tr>
                                                                    <td><span className="fw-bold">Start Date:</span> {formatNewDate(dt.startDate)}</td>
                                                                    <td className='text-capitalize'><span className="fw-bold">Program Type:</span> {dt.programType}</td>
                                                                    <td><span className="fw-bold">Status:</span> {dt.status ? <span className='text-success'>◉ Active</span> : <span className='text-danger'>◉ In Active</span>}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><span className="fw-bold">End Date:</span>  {formatNewDate(dt.endDate)}</td>
                                                                    <td><span className="fw-bold">Price:</span> {dt.price}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) : (                                        
                                        <h4 class="mt-5 text-center text_bolderror" >No data here...</h4>
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer px-3 border-0 mb-3">
                        <button type="button" 
                         onClick={() =>   setMembers(memberAdd)}
                         data-bs-dismiss="modal"
                        // onClick={() => document.getElementById('btn-close').click()} 
                            className="description_btnsave w-100 " style={{
                                backgroundColor: "#1F7E78",
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

export default AddPrograms;