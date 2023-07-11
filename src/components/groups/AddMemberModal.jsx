import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { RiContactsBookUploadFill } from 'react-icons/ri';
import Loader from '../../commonComponent/Loader';
import { getMyPatientList } from '../../services/PatientService';
import { groupMembers } from '../../Utils/AllConstant';
import ApiConfig from '../../config/ApiConfig';


const AddMemberModal = ({ addMember, members, setMembers }) => {
    const [patientLists, setPatientLists] = useState([]);
    const [filterdata, setFilterData] = useState([]);
    const [isLoading, setLoader] = useState(true);
    // const [memebertLists, setMemberLists] = useState([]);
    // Server Methods
    const getPatientLists = async (searchWord) => {
        setPatientLists([])
        setMembers([])

        try {
            const response = await getMyPatientList(searchWord);
            setLoader(false);
            if (response.status === 200) {
                setPatientLists(response?.data?.data);
                setFilterData(response?.data?.data);
                console.log(response?.data?.data);
            }
        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    };

    const UpdateMember = (checked, member) => {
        console.log("Inside");
        if (checked)
            setMembers((prev) => [...prev, member])
        else
            setMembers((prev) => prev.filter(dt => dt != member))
    }
    const onSearch = async (e) => {
        let searchWord = e.target.value;
        const result = patientLists.filter((value) => {
            if (value) {
                // console.log(value, "value")
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
        // console.log(patientLists, "patientLists")
    }, [members])

    return (
        <div
            className="modal fade"
            id="addmembermodal1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content px-4">
                    <div className="modal-header px-4 border-0 mt-3">
                        <h5 className="modal-title">Add members</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body pt-4 pb-2 px-4">
                        <div style={{ marginTop: "-10px", display: "flex", "justifyContent": "end", marginBottom: "20px", marginLeft: "-5px" }}>
                            <div className="actsearch_box1">
                                <FiSearch className="boxicon" />
                                <input
                                    placeholder="Search Here..."
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
                                                                id="flexCheckDefault"
                                                                onChange={(e) => UpdateMember(e.target.checked, e.target.value)}
                                                            />
                                                        </p>

                                                        <div className="p-0 actlist_wid1 d-flex mb-0 justify-content-center align-items-center affir_checkbox" htmlFor="flexCheckDefault" >
                                                            <img src={dt.profilePicture ? ApiConfig.ImageUrl + 'user/' + dt._id + '/' + dt.profilePicture : "images/avatar.png"} onError={(e) => {
                                                                e.target.src = "images/avatar.png" //replacement image imported above
                                                            }} alt="" className="member_listimage" />

                                                        </div>
                                                        <div className="actlist_wid2 ms-2">
                                                            <p className="py-0 mb-0">
                                                                {`${dt.first_name} ${dt.last_name}`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="table_resouter card bg-light p-2 my-2">
                                                        <table class="table mb-0 table-borderless table_resinner4">
                                                            <tbody>
                                                                <tr>
                                                                    <td><span className="fw-bold">Employment Status:</span> {dt.employmentStatus}</td>
                                                                    <td><span className="fw-bold">Status:</span> {dt.status ? <span className='text-success'>◉ Active</span> : <span className='text-danger'>◉ In Active</span>}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className='text-lowercase'><span className="fw-bold text-capitalize">Email:</span> {dt.email}</td>
                                                                    <td><span className="fw-bold">Location:</span>  {dt.city}</td>
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
                        <button onClick={() => addMember()} data-bs-dismiss="modal"
                            className="description_btnsave w-100" style={{
                                backgroundColor: "#1f7e78",
                                borderColor: "#1f7e78",
                            }}>
                            {'Add'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AddMemberModal;