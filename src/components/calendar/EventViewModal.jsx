import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiFillCloseCircle, AiFillPlusCircle, AiOutlineCloseCircle, AiOutlinePlus } from 'react-icons/ai';
import { CgPoll } from 'react-icons/cg';
import { HiUserGroup } from 'react-icons/hi';
import { ImAttachment } from 'react-icons/im';
import { IoMdImages } from 'react-icons/io';
import SquareAvatar from '../../commonComponent/SquareAvatar';
import { getUploadFileCategory, uploadFile } from '../../services/FileUploadService';
import { createPostService } from '../../services/GroupService';
import { getObjectFromStore } from '../../storage/Storage';
import { toastMsg } from '../../Utils/AllConstant';
import { getFileName, isEmpty, showToastSuccess } from '../../Utils/Helper';
import generatePdfThumbnails from 'pdf-thumbnails-generator';
import { v4 as uuidv4 } from 'uuid';
import { getMyPatientList } from '../../services/PatientService';
import Loader from '../../commonComponent/Loader';
import { FiSearch } from 'react-icons/fi';

const defaultPostDetail = {
    groupId: "",
    post: "",
    image: [],
    video: [],
    document: [],
    options: [],
    documentThumbnail: "",
    videoThumbnail: "",
    pollday: 0
};

export default function EventViewModal(props) {

    const [postDetail, setPostDetail] = useState(defaultPostDetail);
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


    // const handleSubmit = () => {
    //     // e.preventDefault();
    //     let isValid = true;

    //     if (postType.iv && !postDetail.image[0] && !postDetail.video[0]) {
    //         isValid = false;
    //         setImageError(true)
    //     }

    //     if (!postDetail.post || isEmpty(postDetail.post) || postDetail.post === '<p><br></p>') {
    //         isValid = false;
    //         setContentError(true)
    //     }

    //     if (postType.poll && !(postDetail.options).length || ((postDetail.options).filter(dt => dt.option == "")).length) {
    //         isValid = false;
    //         setOptionError(true)
    //     }

    //     if (postType.poll && (isEmpty(postDetail.pollday) || postDetail.pollday === "")) {
    //         isValid = false;
    //         setDayError(true)
    //     }

    //     if (postType.doc && (!postDetail.document || postDetail.document === {} || !(postDetail.document).length)) {
    //         isValid = false;
    //         setDocError(true)
    //     }

    //     console.log("Status: ", isValid, isLoader);

    //     if (isValid && !isLoader) {
    //         setLoaderSave(true);
    //         // console.log(getFileType(postDetail.image[0]));
    //         createPost();
    //     }

    //     console.log(postDetail);
    // };


    // let handleChange = (i, e) => {
    //     let newFormValues = [...formValues];
    //     newFormValues[i][e.target.name] = e.target.value;
    //     setFormValues(newFormValues);

    //     if (!(((postDetail.options).filter(dt => dt.option == "")).length)) setOptionError(false)

    //     onChangeDetail('options', newFormValues);
    // }

    return (
        <Modal
            {...props}
            onExited={() => {
                setPostDetail(defaultPostDetail)
                // setFormValues([{ option: "" }, { option: "" }])
                // setAttachmentList({})
                // setContentError(false)
                // setDocError(false)
                // setImageError(false)
                // setOptionError(false)
                // setDayError(false)
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className='py-2'>
                    <h5 className='mb-0'>View Event</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <h4>Centered Modal</h4> */}
                <div className="d-flex gap-3 my-2">
                    <img
                        src="images/calenderEvent.png"
                        onError={(e) => {
                            e.target.src = "images/calenderEvent.png"; //replacement image imported above
                        }}
                        className="event_view me-4"
                        alt=""
                    />
                    <div>
                        <p className='mb-2 whole_label'>Title:</p>
                        <p className='mb-0 mt-2 whole_label'>Description:</p>
                        <p className='text-secondary'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy textLorem Ipsum is simpl</p>
                    </div>

                </div>

                <div className="d-flex justify-content-space-between">
                    <div className="col-md-6">
                        <p className='mb-0 whole_label'>Date:</p>
                    </div>
                    <div className="col-md-6">
                        <p className='mb-0  whole_label'>Frequency:</p>
                    </div>
                </div>
                <div className="d-flex justify-content-space-between mt-4">
                    <div className="col-md-6">
                        <p className='mb-0 whole_label'>Location:</p>
                    </div>
                    <div className="col-md-6 ">
                        <p className='mb-0 whole_label'>Services:</p>
                    </div>
                </div>
                <div style={{ marginTop: "15px", display: "flex", "justifyContent": "end", marginBottom: "20px", marginLeft: "-5px" }}>
                    <div className="actsearch_box1">
                        <FiSearch className="boxicon" />
                        <input
                            placeholder="Search for Participant"
                            onChange={(e) => onSearch(e)}
                        />
                    </div>
                </div>


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
            </Modal.Body>

        </Modal>
    );
}