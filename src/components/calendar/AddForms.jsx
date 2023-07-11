import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { RiContactsBookUploadFill } from 'react-icons/ri';
import Select from "react-select";
import Loader from '../../commonComponent/Loader';
import { getAllForms, getMyPatientList } from '../../services/PatientService';
import { groupMembers } from '../../Utils/AllConstant';
import { getCarePlanFormListService } from '../../services/CreateCarePlanService';


const AddForms = ({ members, setMembers, formName, setFormName }) => {
    const [formLists, setFormLists] = useState([]);
    const [filterdata, setFilterData] = useState([]);
    const [isLoading, setLoader] = useState(true);
    const [clientLists, setClientLists] = useState([]);
    // Server Methods
    // console.log(formName, members, "formNAme")
    const getAllFormsData = async (searchWord) => {
        setFormLists([])
        // setMembers([])

        try {
            const response = await getCarePlanFormListService(searchWord);
            setLoader(false);
            if (response.status === 200) {
                setFormLists(response?.data);
                setFilterData(response?.data?.data);
            }
        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    };

    const UpdateMember = (checked, member) => {
        if (checked)
            setMembers((prev) => [...prev, member])
        else
            setMembers((prev) => prev.filter(dt => dt != member))
    }
    const onSearch = async (e) => {
        let searchWord = e.target.value;
        const result = formLists.filter((value) => {
            if (value) {
                return (
                    value?.formName?.toLowerCase()?.includes(searchWord?.toLowerCase())
                );
            }
        });

        if (searchWord === "") {
            setFilterData(formLists);
            // getGroupLists(searchWord);
        } else {
            setFilterData(result);
        }
    };
    useEffect(() => {
        getAllFormsData();
    }, [members])

    return (
        <div
            className="modal fade"
            id="addformsmodal"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content px-4">
                    <div className="modal-header px-4 border-0">
                        <h5 className="modal-title">Pre-Visit form or Action</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <hr />
                    <div className="modal-body pt-4 pb-2 px-4">
                        <p className="text-secondary mb-4 ">Add <span className="text-lowercase"> a pre-visit form or request an action from your client to complete before their appointment.</span></p>
                        {/* <div style={{ marginTop: "-10px", display: "flex", "justifyContent": "end", marginBottom: "10px", marginLeft: "-5px" }}> */}

                        {/* <div className="actsearch_box1 mb-5">
                                <FiSearch className="boxicon" /> */}
                        {/* <input
                                    placeholder="Search Here..."
                                    className="ms-2"
                                    onChange={(e) => onSearch(e)}
                                /> */}
                        <Select
                            value={{
                                "value": members,
                                "label": formName
                            }}
                            className="w-100 mb-4"
                            placeholder="Search Here...."
                            options={formLists.map((dt) => {
                                return ({
                                    "value": dt._id,
                                    "label": dt.formName
                                })

                            })}
                            onChange={(opt, meta) => {
                                onSearch(opt);
                                // console.log(opt, "opt")
                                setMembers(opt.value);
                                setFormName(opt.label)
                            }}
                        />
                        {/* </div> */}
                        {/* </div> */}

                    </div>
                    <hr className="mt-4" />
                    <div className="modal-footer px-3 border-0 mb-3">
                        <div className="col-md-12">
                            <div className="d-flex justify-content-between">

                                <div text={'Cancel'} style={{ cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9' }} className="description_btnsave d-flex justify-content-center align-items-center" onClick={() => document.getElementById('btn-close').click()} data-bs-dismiss="modal">Cancel</div>
                                <button type="button" onClick={() => document.getElementById('btn-close').click()} data-bs-dismiss="modal"
                                    className="description_btnsave" style={{
                                        backgroundColor: "#1F7E78",
                                        borderColor: "#1f7e78",
                                    }}>
                                    {'Save'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AddForms;