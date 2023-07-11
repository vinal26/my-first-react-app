import React, { useState, useEffect } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Select from "react-select";
import { BlogEditorComponent } from "../blog/BlogEditor";
import Button from "../../commonComponent/Button";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { groupMembers, toastMsg } from "../../Utils/AllConstant";
import { getMyPatientList } from "../../services/PatientService";
import { getUploadFileCategory, uploadFile } from "../../services/FileUploadService";
import { getFileName, isEmpty, showToastSuccess } from "../../Utils/Helper";
import { getGroupbyId, updateGroupService } from "../../services/GroupService";
import ApiConfig from "../../config/ApiConfig";
let filesNames = []

const GroupUpdate = () => {
    const navigate = useNavigate();
    let location = useLocation();
    let group = location?.state.user || [];
    const [groupDetail, setGroupDetail] = useState({ ...group });
    const [patientLists, setPatientLists] = useState([]);
    const [isLoading, setLoader] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [keyWordError, setKeyWordError] = useState(false);
    console.log(group, "group")
    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;

        if (!groupDetail.groupName || isEmpty(groupDetail.groupName)) {
            isValid = false;
            setTitleError(true)
        }

        if (!groupDetail.groupImage) {
            isValid = false;
            setImageError(true)
        }

        if (!groupDetail.groupType || isEmpty(groupDetail.groupType)) {
            isValid = false;
            setCategoryError(true)
        }

        // if (!groupDetail.groupMembers || !groupDetail.groupMembers?.length) {
        //     isValid = false;
        //     setKeyWordError(true)
        // }

        if (!groupDetail.description || isEmpty(groupDetail.description) || groupDetail.description === '<p><br></p>') {
            isValid = false;
            setContentError(true)
        }

        if (isValid && !isLoading) {
            setLoader(true);
            updateGroup();
        }

        console.log(groupDetail, "groupDEtail");
    };

    const updateGroup = async () => {
        try {
            // const groupMembersData = groupDetail.groupMembers?.map((item) => {
            //     return item.value
            // })
            setLoader(true);
            if (group.groupImage !== groupDetail.groupImage) {
                const fileName = getFileName(groupDetail.groupImage);
                const result = await uploadFile(
                    groupDetail.groupImage,
                    getUploadFileCategory.group,
                    fileName
                );
                const response = await updateGroupService(groupDetail._id, {
                    ...groupDetail,
                    // groupMembers: groupMembersData,
                    groupImage: fileName,
                });
                if (response) {
                    showToastSuccess(toastMsg.updateGroup)
                    navigate(-1)
                }
                setLoader(false);
            } else {
                const fileName = groupDetail.groupImage.split('/')
                const imageName = fileName[fileName.length - 1];
                const response = await updateGroupService(groupDetail._id, {
                    ...groupDetail,
                    // groupMembers: groupMembersData,
                    groupImage: imageName,
                })
                setLoader(false)
                if (response) {
                    showToastSuccess(toastMsg.updateGroup)
                    navigate(-1)
                }
            }
        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    };

    const getMemberNames = () => {
        const result = groupDetail.groupMemerDetails.map((item) => {
            return {
                label: item.userName,
                value: item.user_id
            }
        });
        return result || [];
    }
    const onChangeDetail = (key, value) => {
        setGroupDetail({ ...groupDetail, [key]: value });
        // console.log(groupDetail, "groupDetail")
    };
    // const renderAddMemberDropDown = () => {

    //     return (
    //         <div className="col-md-12">
    //             <div className="member-select">
    //                 <Select
    //                     isMulti
    //                     className=""
    //                     onChange={(data) => {
    //                         onChangeDetail("groupMembers", data);
    //                         console.log(data, "dattaaaa")
    //                         setKeyWordError(false);
    //                     }}
    //                     value={groupDetail.groupMembers || []}
    //                     placeholder={"Add Members"}
    //                     options={getMemberNames()} />
    //                 {keyWordError ? (
    //                     <h6 className="text-danger error">
    //                         Please choose members
    //                     </h6>
    //                 ) : null}
    //             </div>
    //         </div>
    //     )
    // }

    const renderForm = () => {
        return (
            <>
                <form onSubmit={handleSubmit}>
                    <div className="w-50">
                        <h4>Edit group</h4>
                        <p>Fill in group information</p>
                    </div>
                    <div className="row   add-recipe">
                        {/* <div className="col-md-4">
                            <div className="position-sticky" style={{ "top": 20 }}>
                                <img
                                    src={group.groupImage !== groupDetail.groupImage ? URL.createObjectURL(groupDetail.groupImage) : group.groupImage}
                                    alt=""
                                    className="active_dummyimage"
                                />
                                <input type="file" className="form-control uploader-input_"
                                    accept="image/*"
                                    onChange={(e) => {
                                        onChangeDetail("groupImage", e.target.files[0]);
                                        setImageError(false)
                                    }}
                                />

                                <div className="uploader-mask d-flex justify-content-center align-items-center">
                                    <BsFillPlusCircleFill className="upload-icon" />
                                </div>
                                {imageError ? (
                                    <h6 className="text-danger error" >Please select image</h6>
                                ) : null}
                            </div>
                        </div> */}
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-4 position-relative pb-4">
                                    <img
                                        src={group.groupImage !== groupDetail.groupImage ? URL.createObjectURL(groupDetail.groupImage) : ApiConfig.ImageUrl + 'groups/' + group.createdBy + '/' + group.groupImage}
                                        alt=""
                                        className="active_dummyimage"
                                    />
                                    <input type="file" className="form-control uploader-input_"
                                        accept="image/*"
                                        onChange={(e) => {
                                            onChangeDetail("groupImage", e.target.files[0]);
                                            setImageError(false)
                                        }}
                                    />

                                    <div className="uploader-mask d-flex justify-content-center align-items-center">
                                        <BsFillPlusCircleFill className="upload-icon" />
                                    </div>
                                    {imageError ? (
                                        <h6 className="text-danger error" >Please select image</h6>
                                    ) : null}
                            </div>
                                <div className="col-md-8">
                                    <div className="ps-4">
                                    <p className="whole_label">Group <span className="text-lowercase">Name</span></p>
                                    <input
                                        type="text"
                                        className="description_inputf  "
                                        placeholder="Group Name"
                                        maxLength="40"
                                        value={groupDetail.groupName}

                                        onChange={(e) => {
                                            // onChangeDetail("groupName", e.target.value.replace(/[^\w\s]/gi, ""));
                                            onChangeDetail("groupName", e.target.value);
                                            setTitleError(false);
                                        }}
                                    // style={{ marginBotton: 0 }}
                                    />
                                    {titleError ? (
                                        <h6 className="text-danger error">Please enter name</h6>
                                    ) : null}

                                    <p className="whole_label  ">Group <span className="text-lowercase">Type</span></p>
                                    <select className="description_inputf "
                                        value={groupDetail.groupType}
                                        onChange={(e) => {
                                            onChangeDetail("groupType", e.target.value);
                                            setCategoryError(false);
                                        }}
                                    >
                                        <option value="public">Public</option>
                                        <option value="private">Private</option>
                                    </select>
                                    {categoryError ? (
                                        <h6 className="text-danger error" style={{ marginTop: 0 }}>Please select category</h6>
                                    ) : null}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <p className="whole_label  ">Description</p>

                                    <div className="text-editor-receipe" style={{ marginBottom: 20 }}>
                                        {/* <BlogEditorComponent
                                            onChange={(data) => {
                                                onChangeDetail('description', data);
                                                setContentError(false);
                                            }}
                                            value={groupDetail.description}
                                            onAddNewFile={(fileName) => { filesNames = [...filesNames, fileName] }}
                                        /> */}
                                        <textarea
                                            className="description_inputf mb-0 p-4"
                                            style={{ height: "200px" }}
                                            onChange={(e) => {
                                                onChangeDetail('description', e.target.value);
                                                setContentError(false);
                                            }}
                                            value={groupDetail.description}
                                        />
                                        {contentError ? (
                                            <h6 className="text-danger error" style={{ marginTop: "5px" }}>
                                                Please add content
                                            </h6>
                                        ) : null}
                                    </div>
                                </div>
                                {/* <div className="row">
                                    <p className="whole_label  ">Members</p>
                                    {renderAddMemberDropDown()}

                                </div> */}
                                {/* <AddMemberModal /> */}
                                <div className="col-md-12">
                                    {/* <button className="description_btnsave mt-3 d-flex justify-content-center align-items-center" disabled={isLoading}>Update {isLoading &&
                                        <div className=" text-center text-capitalize" style={{ marginLeft: "10px" }}>
                                            <div style={{ width: '2rem', height: '2rem' }} class="spinner-border" role="status" />
                                        </div>}</button> */}
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                        <div text={'Cancel'} style={{ cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9' }} className="mx-0 description_btnsave d-flex btnfix_wid81 justify-content-center align-items-center" onClick={() => navigate(-1)}>Cancel</div>
                                        {/* <button className="mx-0 description_btnsave d-flex justify-content-center
                                         align-items-center" disabled={isLoading}>
                                        Update {isLoading &&
                                            <div className="ms-2 text-center text-capitalize mt-1">
                                                <div style={{ width: '2rem', height: '2rem' }} 
                                                class="spinner-border" role="status" />
                                            </div>}
                                        </button> */}
                                        <Button isLoading={isLoading} loadingText={false} type="submit" 
                                         text={'Update'}
                                         style={isLoading ? { pointerEvent: 'none' } : {}}
                                          className="description_btnsave btnfix_wid81" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        );
    }

    // Server Methods
    const getPatientLists = async () => {
        try {
            const response = await getMyPatientList();
            // setLoader(false);
            if (response.status === 200) {
                setPatientLists(response?.data?.data);
                console.log(response?.data?.data);
            }
        } catch (error) {
            // setLoader(false);
            console.log(error);
        }
    };

    useEffect(() => {
        getPatientLists();
    }, [])

    return (
        <>
            <Navbar />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar />
                    </div>
                    <div className="col-md-10 py-4 px-5">
                    <   nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item pointer" onClick={() => navigate(-1)}>Group</li>
                                <li class="breadcrumb-item active fw-bold" aria-current="page">Edit group</li>
                            </ol>
                        </nav>
                        {/* <div className="container mt-5 px-5"> */}
                            <div className="row justify-content-start">
                                {renderForm()}
                            </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default GroupUpdate;
