import React, { useEffect, useState } from "react";
import { getMyPatientList } from "../../services/PatientService";
import { FiSearch } from "react-icons/fi";
import Loader from "../../commonComponent/Loader";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../header/Navbar";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import AssignClients from "./AssignClients";

const ViewEvent = () => {
    const navigate = useNavigate();
    const [patientLists, setPatientLists] = useState([]);
    const [filterdata, setFilterData] = useState([]);
    const [isLoading, setLoader] = useState(true);
    const getPatientLists = async (searchWord) => {
        setPatientLists([])
        // setMembers([])

        try {
            const response = await getMyPatientList(searchWord);
            setLoader(false);
            if (response.status === 200) {
                setPatientLists(response?.data?.data);
                setFilterData(response?.data?.data);
            }
        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    };
    const onSearch = async (e) => {
        let searchWord = e.target.value;
        const result = patientLists.filter((value) => {
            if (value) {
                return (
                    value?.full_name?.toLowerCase()?.includes(searchWord?.toLowerCase())
                );
            }
        });

        if (searchWord === "") {
            setFilterData(patientLists);
            // getGroupLists(searchWord);
        } else {
            setFilterData(result);
        }
    };
    useEffect(() => {
        getPatientLists();
    }, [])


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
                                <li class="breadcrumb-item cursor-pointer" onClick={() => { navigate(-1) }}>My Events</li>
                                <li class="breadcrumb-item active fw-bold" aria-current="page">View Event</li>
                            </ol>
                        </nav>
                        <div className="d-flex justify-content-space-between mt-5">
                            <div className="col-md-6">
                                <p className='mb-0 whole_label'>Service Title:</p>
                                <p className='text-secondary'>Lorem Ipsum is simply dummy</p>
                            </div>
                            <div className="col-md-6">
                                <p className='mb-0  whole_label'>Service Type:</p>
                                <p className='text-secondary'>Lorem Ipsum is simply dummy</p>
                            </div>
                        </div>
                        <p className='mb-0 mt-2 whole_label'>Description:</p>
                        <p className='text-secondary'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy textLorem Ipsum is simpl</p>

                        <div className="d-flex justify-content-space-between">
                            <div className="col-md-6">
                                <p className='mb-0 whole_label'>Date:</p>
                                <p className='text-secondary'>Lorem Ipsum is simply dummy</p>
                            </div>
                            <div className="col-md-6">
                                <p className='mb-0  whole_label'>Location:</p>
                                <p className='text-secondary'>Lorem Ipsum is simply dummy</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-space-between mt-4">
                            <div className="col-md-6">
                                <p className='mb-0 whole_label'>Start Time:</p>
                                <p className='text-secondary'>Lorem Ipsum is simply dummy</p>
                            </div>
                            <div className="col-md-6 ">
                                <p className='mb-0 whole_label'>End Time:</p>
                                <p className='text-secondary'>Lorem Ipsum is simply dummy</p>
                            </div>
                        </div>
                        <hr />
                        <h5>Participants/ Attendees(6/50)</h5>
                        <div style={{ marginTop: "25px", display: "flex", "justifyContent": "end", marginBottom: "20px", marginLeft: "-5px" }}>
                            <div className="col-md-8 pe-4">
                                <div className="actsearch_box1">
                                    <FiSearch className="boxicon" />
                                    <input
                                        placeholder="Search for Participant"
                                        onChange={(e) => onSearch(e)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 px-4">
                                <button type="button" className="description_btnsave w-100 " data-bs-toggle="modal" data-bs-target="#assignclientsmodal">
                                    <AiOutlinePlus /> Add Clients
                                </button>
                            </div>
                        </div>
                        <AssignClients />

                        <div className="col-md-12 p-1 ">
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
                                        filterdata.map((dt, index) => {
                                            return (
                                                <div
                                                    key={dt._id}
                                                    // className={`card mb-2 p-1 ${index == 0 ? "active" : ""}`}
                                                    className={`card mb-2 py-2 px-3`}
                                                    // style={{ background: "#F2F4F6" }}
                                                    onClick={() => {
                                                    }}
                                                    id={dt._id}
                                                >
                                                    <div className="btn-group align-items-center gap-2">
                                                        {/* <p className="affir_checkbox mb-0">
                                                    <input
                                                        type="checkbox"
                                                        name="members"
                                                        value={dt._id}
                                                        id="flexCheckDefault"
                                                    // onChange={(e) => UpdateMember(e.target.checked, e.target.value)}
                                                    />
                                                </p> */}

                                                        <div className="p-0 actlist_wid1 d-flex mb-0 justify-content-center align-items-center affir_checkbox" for="flexCheckDefault" >
                                                            <img src={dt.profilePicture} onError={(e) => {
                                                                e.target.src = "images/avatar.png" //replacement image imported above
                                                            }} alt="" className="member_listimage" />

                                                        </div>
                                                        <div className="actlist_wid2 ms-2">
                                                            <p className="py-0 mb-0">
                                                                {`${dt.first_name} ${dt.last_name}`}
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
                </div>
            </div >
        </>
    );
};

export default ViewEvent;
