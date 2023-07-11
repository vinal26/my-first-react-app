import React, { useState, useEffect } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Select from "react-select";
import { BlogEditorComponent } from "../blog/BlogEditor";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import { groupMembers, toastMsg } from "../../Utils/AllConstant";
import { AiFillCloseCircle, AiFillPlusCircle, AiOutlinePlus } from "react-icons/ai";
import AddMemberModal from "./AddMemberModal";
import { FiSearch } from "react-icons/fi";
import { getMyPatientList } from "../../services/PatientService";
import { getUploadFileCategory, uploadFile } from "../../services/FileUploadService";
import { getFileName, isEmpty, showToastSuccess } from "../../Utils/Helper";
import { createPostService } from "../../services/GroupService";
import Attachments from "../../commonComponent/Attachments";

const defaultPostDetail = {
    groupId: "",
    post: "",
    image: [],
    video: [],
    document: []
};

let filesNames = []

const GroupPostAdd = () => {
    const [postDetail, setPostDetail] = useState(defaultPostDetail);
    const [mediaType, setMediaType] = useState("image")
    const [groupID, setGroupID] = useState("");
    const [isLoading, setLoader] = useState(false);
    const [isLoader, setLoaderSave] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [attachmentList, setAttachmentList] = useState([]);

    let location = useLocation();
    let group_id = location?.state?.groupID || '';

    useEffect(() => {
        console.log(group_id, "group_ID")
        setGroupID(group_id)
    }, [group_id])

    const onChangeDetail = (key, value) => {
        setPostDetail({ ...postDetail, [key]: value });
    };

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;

        if (!postDetail.image[0] && !postDetail.video[0]) {
            isValid = false;
            setImageError(true)
        }

        if (!postDetail.post || isEmpty(postDetail.post) || postDetail.post === '<p><br></p>') {
            isValid = false;
            setContentError(true)
        }

        // console.log("Status: ", isValid, isLoader);

        if (isValid && !isLoader) {
            setLoaderSave(true);
            // console.log(getFileType(postDetail.image[0]));
            createPost();
        }

        console.log(postDetail);
    };

    const createPost = async () => {
        try {
            setLoaderSave(true);
            const imageName = postDetail.image[0] ? getFileName(postDetail.image[0]) : null;
            const videoName = postDetail.video[0] ? getFileName(postDetail.video[0]) : null;
            const documentName = postDetail.document[0] ? getFileName(postDetail.document[0]) : null;

            postDetail.video[0] && await uploadFile(
                postDetail.video[0],
                getUploadFileCategory.postVideo,
                videoName,
            );
            postDetail.image[0] && await uploadFile(
                postDetail.image[0],
                getUploadFileCategory.postImage,
                imageName,
            );
            postDetail.document[0] && await uploadFile(
                postDetail.document[0],
                getUploadFileCategory.postDocument,
                documentName
            );

            const response = await createPostService({
                ...postDetail,
                groupId: groupID,
                video: videoName ? [videoName] : [],
                image: imageName ? [imageName] : [],
                document: documentName ? [documentName] : [],
            });
            if (response) {
                showToastSuccess(toastMsg.createPost)
                setPostDetail(defaultPostDetail);
                navigate(-1)
            }
            setLoaderSave(false);
        } catch (error) {
            setLoaderSave(false);
            console.log(error);
        }
    };

    const getFileType = (file) => {

        if(file.type.match('image.*'))
            return 'image';
        
        if(file.type.match('video.*'))
            return 'video';
        
        if(file.type.match('audio.*'))
            return 'audio';
        
        // etc...
        
        return 'other';
    }

    const onAddAttachment = async (file) => {
        setLoader(true);
        try {
            const fileName = getFileName(file);
            const result = await uploadFile(
                file,
                // getUploadFileCategory.blogAttachment,
                getUploadFileCategory.postAttachment,
                fileName,
                false
            );
            setAttachmentList([...attachmentList, ...[file]])
            setLoader(false);
        } catch (error) {
            console.log(error);
            setLoader(false);
        }
    }

    const onRemoveAttachment = (index) => {
        const list = attachmentList;
        list.splice(index, 1);
        setAttachmentList([...list]);
    }

    const renderForm = () => {
        return (
            <>
                <form onSubmit={handleSubmit}>
                    <div className="row add-recipe">
                        <div className="col-md-12">
                            <div className="position-sticky" style={{ "top": 20 }}>
                                <div className="row">
                                    <div className="col-md-4 position-relative">
                                        {mediaType=="image" ? (<img
                                            src={
                                                (postDetail.image[0] && URL.createObjectURL(postDetail.image[0])) ||
                                                "images/dummy_vi.jpg"
                                            }
                                            alt=""
                                            className="active_dummyimage"
                                        />) :
                                        postDetail.video[0] ? <video className="active_dummyimage" autoPlay>
                                            <source src={(postDetail.video[0] && URL.createObjectURL(postDetail.video[0]))} type="video/mp4" />
                                            {/* <source src="movie.ogg" type="video/ogg" /> */}
                                            Your browser does not support the video tag.
                                        </video> : <img
                                            src="images/dummy_vi.jpg"
                                            alt=""
                                            className="active_dummyimage"
                                        />}
                                        
                                        {(!postDetail.image[0] && !postDetail.video[0]) ? <><input type="file" className="form-control uploader-input_"
                                            accept="image/*, video/*"
                                            style={{marginRight: '7px'}}
                                            onChange={(e) => {
                                                setPostDetail({...postDetail, "image": [], "video": []})

                                                if(getFileType(e.target.files[0])!="image") {
                                                    setMediaType("video")
                                                    // onChangeDetail("video", [e.target.files[0]]);
                                                    setPostDetail({...postDetail, "image": [], "video": [e.target.files[0]]})
                                                }
                                                else {
                                                    setMediaType("image")
                                                    // onChangeDetail("image", [e.target.files[0]]);
                                                    setPostDetail({...postDetail,"image": [e.target.files[0]], "video": []})
                                                }

                                                setImageError(false)
                                            }}
                                        />

                                        <div className="uploader-mask d-flex justify-content-center align-items-center" style={{marginLeft: 'auto', marginRight: '-5px'}}>
                                            <AiFillPlusCircle className="upload-icon bg-white" />
                                        </div></> :
                                        <div onClick={() => setPostDetail({...postDetail,"image": [], "video": []})} className="uploader-mask d-flex justify-content-center align-items-center" style={{marginLeft: 'auto', marginRight: '-5px'}}>
                                            <AiFillCloseCircle className="upload-icon bg-white" />
                                        </div>}
                                        {imageError ? (
                                            <h6 className="text-danger error" >Please select a image/video</h6>
                                        ) : null}
                                    </div>
                                    <div className="col-md-4 position-relative">
                                        {/* Doocument upload */}
                                        <img
                                            src={
                                                (postDetail.document[0] && "images/pdf.png") ||
                                                "images/dummy_doc.jpg"
                                            }
                                            alt=""
                                            className="active_dummyimage"
                                        />
                                        {!postDetail.document[0] ? <>
                                        <input type="file" className="form-control uploader-input_"
                                            accept="application/pdf"
                                            style={{marginRight: '7px'}}
                                            onChange={(e) => {
                                                    onChangeDetail("document", [e.target.files[0]]);
                                            }}
                                        />
                                        <div className="uploader-mask d-flex justify-content-center align-items-center" style={{marginLeft: 'auto', marginRight: '-5px'}}>
                                            <AiFillPlusCircle className="upload-icon bg-white" />
                                        </div>
                                        </> : 
                                        <div onClick={() => setPostDetail({...postDetail,"document": []})} className="uploader-mask d-flex justify-content-center align-items-center" style={{marginLeft: 'auto', marginRight: '-5px'}}>
                                            <AiFillCloseCircle className="upload-icon bg-white" />
                                        </div>}
                                    </div>
                                    <div className="col-md-4"></div>
                                </div>


                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-12">
                                    <p className="whole_label  ">Description</p>

                                    <div className="text-editor-receipe" style={{ marginBottom: 20 }}>
                                        {/* <BlogEditorComponent
                                            onChange={(data) => {
                                                onChangeDetail('post', data);
                                                setContentError(false);
                                            }}
                                            value={postDetail.post}
                                            onAddNewFile={(fileName) => { filesNames = [...filesNames, fileName] }}
                                        /> */}
                                        <textarea
                                            className="description_inputf mb-0 p-4"
                                            style={{height: "300px"}}
                                            onChange={(e) => {
                                                onChangeDetail('post', e.target.value);
                                                setContentError(false);
                                            }}
                                            value={postDetail.post}
                                        />
                                        {contentError ? (
                                            <h6 className="text-danger error" style={{ marginTop: "5px" }}>
                                                Please add content
                                            </h6>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <button className="description_btnsave mt-3 d-flex justify-content-center align-items-center" disabled={isLoader}>Create
                                        {isLoader &&
                                            <div className=" text-center text-capitalize" style={{ marginLeft: "10px" }}>
                                                <div style={{ width: '2rem', height: '2rem' }} className="spinner-border" role="status" />
                                            </div>}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar />
                    </div>
                    <div className="col-md-10">
                        <p className="dashboard_title">
                            <HiOutlineArrowSmLeft
                                onClick={() => navigate(-1)}
                                className="icon"
                            />
                            Add Post
                        </p>
                        <div className="container" style={{ marginBottom: 100 }}>
                            <div className="row justify-content-start">
                                {renderForm()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GroupPostAdd;
