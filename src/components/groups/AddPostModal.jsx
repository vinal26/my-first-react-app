import { useState } from 'react';
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

export default function AddPostModal(props) {
    const [fname, setfname] = useState(getObjectFromStore("first_name") || "images/avatar.png");
    const [sname, setsname] = useState(getObjectFromStore("last_name") || "images/avatar.png");
    const [profilePicture, setprofilePicture] = useState(getObjectFromStore("profile_picture") || "images/avatar.png");
    const [attachmentList, setAttachmentList] = useState([]);
    const [formValues, setFormValues] = useState([{ option: "" }, { option: "" }])
    const [postType, setPostType] = useState({
        "iv": true,
        "poll": false,
        "doc": false
    });

    const [postDetail, setPostDetail] = useState(defaultPostDetail);
    const [mediaType, setMediaType] = useState("image")
    const [imageError, setImageError] = useState(false);
    const [isLoader, setLoaderSave] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [docError, setDocError] = useState(false);
    const [optionError, setOptionError] = useState(false);
    const [dayError, setDayError] = useState(false);
    const[pollError , setPollError] = useState();

    const urltoFile = (url, filename, mimeType) => {
        return (fetch(url)
            .then(function(res){return res.arrayBuffer();})
            .then(function(buf){return new File([buf], filename,{type:mimeType});})
        );
    }

    const createThumb = async (event) => {
        try {
            const thumbnails = await generatePdfThumbnails(URL.createObjectURL(event.target.files[0]), 250);
            // console.log(thumbnails[0].thumbnail);
            //Usage example:
            urltoFile(thumbnails[0].thumbnail, 'thumb.png','image/png')
            .then(function(file){
                // console.log(file);
                setPostDetail((prev) => {return {...prev, "documentThumbnail": [file]}})
            });
        } catch (err) {
            console.error(err);
        }
    }

    const generateVideoThumbnail = (file) => {
        return new Promise((resolve) => {
            const canvas = document.createElement("canvas");
            const video = document.createElement("video");
        
            // this is important
            video.autoplay = true;
            video.muted = true;
            video.src = URL.createObjectURL(file);
        
            video.onloadeddata = () => {
            let ctx = canvas.getContext("2d");
        
            canvas.width = video.videoWidth/5;
            canvas.height = video.videoHeight/5;
        
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            video.pause();
            return resolve(canvas.toDataURL("image/png"));
            };
        });
    };

    function captureVideoThumb(e){
        generateVideoThumbnail(e.target.files[0]).then(dt => {
            // console.log(dt)
            urltoFile(dt, 'videoThumb.png','image/png')
            .then(function(file){
                console.log(file);
                setPostDetail((prev) => {return {...prev, "videoThumbnail": [file]}})
            });
        })
    }

    const handleSubmit = () => {
        // e.preventDefault();
        let isValid = true;

        // if (postType.iv && !postDetail.image[0] && !postDetail.video[0]) {
        //     isValid = false;
        //     setImageError(true)
        // }

        if (!postDetail.post || isEmpty(postDetail.post) || postDetail.post === '<p><br></p>') {
            isValid = false;
            setContentError(true)
        }

        if (postType.poll && !(postDetail.options).length || ((postDetail.options).filter(dt => dt.option=="")).length) {
            isValid = false;
            setOptionError(true)
        }

        if (postType.poll && (isEmpty(postDetail.pollday) || postDetail.pollday === "")){
            isValid = false;
            setDayError(true)
        }

        if (postType.doc && (!postDetail.document || postDetail.document==={} || !(postDetail.document).length)) {
            isValid = false;
            setDocError(true)
        }

        if (pollError) {
            isValid = false; 
        }

        // console.log("Status: ", isValid, isLoader);

        if (isValid && !isLoader) {
            setLoaderSave(true);
            // console.log(getFileType(postDetail.image[0]));
            createPost();
        }

        // console.log(postDetail);
    };

    const createPost = async () => {
        props.onHide();
        try {
            // setLoaderSave(true);
            let documentName = [];
            documentName = attachmentList.map(it => getFileName(it));
            const imageName = postDetail.image[0] ? getFileName(postDetail.image[0]) : null;
            const videoName = postDetail.video[0] ? getFileName(postDetail.video[0]) : null;
            const docthumbnail = `docThumbnail__${uuidv4()}`
            const vthumbnail = `videoThumbnail__${uuidv4()}`
            
            const allOptions = postDetail.options;
            let ob = {}
            allOptions.map((dt, i) => ob["option"+i]=dt.option)

            if(postType.iv && postDetail.video[0])
                await uploadFile(
                    postDetail.video[0],
                    getUploadFileCategory.postVideo,
                    videoName,
                );
            if(postType.iv && postDetail.video[0])
                await uploadFile(
                    postDetail.videoThumbnail[0],
                    getUploadFileCategory.postDocThumb,
                    vthumbnail,
                );
            if(postType.iv && postDetail.image[0])
                await uploadFile(
                    postDetail.image[0],
                    getUploadFileCategory.postImage,
                    imageName,
                );
            // postDetail.document[0] && await uploadFile(
            //     postDetail.document[0],
            //     getUploadFileCategory.postDocument,
            //     documentName
            // );
            if(postType.doc && postDetail.documentThumbnail[0])
                await uploadFile(
                    postDetail.documentThumbnail[0],
                    getUploadFileCategory.postDocThumb,
                    docthumbnail
                );

            if(postType.doc)
                attachmentList.map(async (it, i) => await uploadFile(
                    it,
                    getUploadFileCategory.postDocument,
                    documentName[i]
                ));

            const response = await createPostService({
                ...postDetail,
                groupId: props.gid,
                video: (postType.iv && videoName) ? [videoName] : [],
                videoThumbnail: (postType.iv && videoName) ? vthumbnail : "",
                image: (postType.iv && imageName) ? [imageName] : [],
                document: postType.doc ? documentName : [],
                documentThumbnail: postType.doc ? docthumbnail : "",
                options: postType.poll ? ob : {},
                pollday: postType.poll ? parseInt(postDetail.pollday) : 0,
            });
            if (response) {
                showToastSuccess(toastMsg.createPost)
                setPostDetail(defaultPostDetail);
                props.getGroupPosts();
                // navigate(-1)
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

    const onChangeDetail = (key, value) => {
        setPostDetail({ ...postDetail, [key]: value });
    };
    
    let handleChange = (i, e) => {
        const Names = formValues.map((el) => el.option);
        if (Names.includes(e.target.value.trim())) {
            setPollError(i);
        } else {
            setPollError(null);
        }
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);

        if(!(((postDetail.options).filter(dt => dt.option=="")).length)) setOptionError(false)

        onChangeDetail('options', newFormValues);
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
        
        onChangeDetail('options', newFormValues);
    }

    let addFormFields = () => {
        if(formValues.length<=4)
            setFormValues([...formValues, { option: "" }])
    }

    const instandDn = (dt) => {
        const a = document.createElement('a');
        document.body.appendChild(a);
        var url  = URL.createObjectURL(dt);
        a.href = url;
        a.download = dt.name;
        a.target = "_blank";
        a.click();
        setTimeout(() => {
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }, 0)
    }

  return (
    <Modal
      {...props}
      onExited={() => {
        setPostDetail(defaultPostDetail)
        setFormValues([{ option: "" }, { option: "" }])
        setAttachmentList([])
        setContentError(false)
        setDocError(false)
        setImageError(false)
        setOptionError(false)
        setDayError(false)
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className='py-2'>
          <h5 className='mb-0'>Add Post</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Centered Modal</h4> */}
        <div className="d-flex gap-3 my-2">
            <SquareAvatar
              src={profilePicture}
              className="member_listimage rounded-circle"
            />
            <div>
                <p className='mb-0 fw-bold'>{fname} {sname}</p>
                <span class="badge bg-less-white text-dark"><HiUserGroup size="1.2em" className="me-1 mb-1" /> {props.gname}</span>
            </div>
        </div>
        {/* <form action=""> */}
            <p className="whole_labelx mt-4">Write a post <span className="text-danger"> *</span></p>
            <input
                className="form-control description_inputf mb-0 mt-2"
                maxLength={60}
                style={{outline: "none"}}
                onChange={(e) => {
                    onChangeDetail('post', e.target.value);
                    setContentError(false);
                }}
                placeholder="Write something..."
                value={postDetail.post}
            />
            {contentError ? (
                <h6 className="text-danger error mt-2" >Please write something...</h6>
            ) : null}
            {/* Image/Video Upload */}
            {postType.iv && <div className="pb-4 position-relative">
                <p className="whole_labelx mt-4">Upload image/video</p>

                <div className="position-relative">
                    {mediaType=="image" ? (<img
                        src={
                            (postDetail.image[0] && URL.createObjectURL(postDetail.image[0])) ||
                            "images/upload_banner.png"
                        }
                        alt=""
                        style={{height: 170}}
                        className="active_dummyimg"
                    />) :
                    postDetail.video[0] ? <video className="active_dummyimg">
                        <source src={(postDetail.video[0] && URL.createObjectURL(postDetail.video[0]))} type="video/mp4" />
                        {/* <source src="movie.ogg" type="video/ogg" /> */}
                        Your browser does not support the video tag.
                    </video> : <img
                        src="images/upload_banner.png"
                        alt=""
                        style={{height: 170}}
                        className="active_dummyimg"
                    />}
                    
                    {(!postDetail.image[0] && !postDetail.video[0]) ? <><input type="file" className="form-control uploader-input"
                        accept="image/*, video/*"
                        style={{marginRight: '7px'}}
                        onChange={(e) => {
                            setPostDetail({...postDetail, "image": [], "video": []})

                            if(getFileType(e.target.files[0])!="image") {
                                setMediaType("video")
                                // onChangeDetail("video", [e.target.files[0]]);
                                captureVideoThumb(e)
                                setPostDetail({...postDetail, "image": [], "video": [e.target.files[0]]})
                            }
                            else {
                                setMediaType("image")
                                // onChangeDetail("image", [e.target.files[0]]);
                                setPostDetail({...postDetail,"image": [e.target.files[0]], "video": []})
                            }

                            // onChangeDetail(mediaType, postDetail[mediaType]);

                            setImageError(false)
                        }}
                    /></> :
                    <div onClick={() => setPostDetail({...postDetail,"image": [], "video": []})} className="pointer">
                        <AiFillCloseCircle className="upload-icon-x bg-white" />
                    </div>}
                </div>
                
                {imageError ? (
                    <h6 className="text-danger error mt-2" >Please select a image/video</h6>
                ) : null}
            </div>}
            {/* Document Upload */}
            {postType.doc && <div className='my-4'>
                <p className="whole_labelx">Upload documents <span className="text-danger"> *</span></p>
                <div className="multi-uploader d-flex">
                {/* File Uploader */}
                <div className="uploader-input_multi me-3 bg-white">
                    <input type="file" className="form-control uploader-input"
                    accept="application/pdf"
                    multiple
                    onClick={(e) => e.target.value=null}
                    onChange={(e) => {
                        // console.log(e.target.files)
                        setAttachmentList([...Array.from(e.target.files), ...attachmentList])
                        setPostDetail({...postDetail, "document": [...Array.from(e.target.files), ...attachmentList]})
                        setDocError(false)
                        createThumb(e)
                    }}
                    />
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" color="#1f7e78" height="3rem" width="3rem" xmlns="http://www.w3.org/2000/svg" style={{ color: "rgb(31, 126, 120)" }}><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"></path></svg>
                </div>
                {/* All Attached Files */}
                {attachmentList.length>0 && attachmentList.map((dt, i) => <div className="me-3" key={i} style={{ position: "relative", width: "100px", cursor: "pointer" }}>
                    <img
                    src="images/pdf.png"
                    alt=""
                    className="active_dummyimg_multi bg-white"
                    onClick={() => instandDn(dt)}
                    />
                    <span onClick={() => {
                        let newFormValues = [...attachmentList];
                        newFormValues.splice(i, 1);
                        setAttachmentList(newFormValues);
                        setPostDetail({...postDetail, "document": newFormValues})}
                    }
                    className="close-button"></span>
                    <p style={{ width: "100%", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }} className="mb-0">{dt.name}</p>
                </div>)}
            </div>
            {docError ? (
                <h6 className="text-danger error mt-2" >Please add a document</h6>
            ) : null}
            </div>
            }

            {/* Option List Input */}
            {postType.poll && <>
            <p className="whole_labelx mt-4">Options <span className="text-danger"> *</span></p>
            {formValues.map((element, index) => (
            <>
            <div className="row mb-2" key={index}>
                <div className="col-md-10">
                {/* <label className="form-label">Email Address</label> */}
                <input className="form-control description_inputf mb-1" type="text" name="option" placeholder="Add option" value={element.option || ""} onChange={e => (e.target.value).length<40 && handleChange(index, e)} />
               
                
                </div>

                <div className="col-md-2 d-flex align-items-center">
                {
                    index>1 ?
                    <button type="button" title="Remove" className="btn btn-outline-danger px-2" onClick={() => removeFormFields(index)}><AiOutlineCloseCircle style={{ marginTop: "-4px" }} size="22px" /></button>
                    : null
                }
                </div>
            </div>
            
             <h6 className="text-danger error mt-1" >{index === pollError && "option already exists"}</h6>
             </>
            ))}
            {optionError ? (
                <h6 className="text-danger error mt-2" >Options fields cannot be empty</h6>
            ) : null}
            {formValues.length<5 ? <div className="btn-custom-link ms-0 mt-3 mb-4" onClick={() => addFormFields()}><AiOutlinePlus className="me-2" /> Add option</div> : <div className='mb-3' /> }
            
            <p className="whole_labelx mt-4">Poll ends in (Days) <span className="text-danger"> *</span></p>
            <div className="mb-4">
                <input className="form-control description_inputf mb-0" min={0} max={100} type="number" name="option" placeholder="eg. 5" value={postDetail.pollday}
                onChange={(e) => {
                    if(e.target.value>=0 && e.target.value<100){
                        onChangeDetail('pollday', e.target.value);
                        setDayError(false);
                    }
                }} />
                {dayError ? (
                    <h6 className="text-danger error mt-2" >Please enter number of days</h6>
                ) : null}
            </div>
            </>
            }
        {/* </form> */}


        <div className="border rounded p-3 d-flex justify-content-between">
            <p className='mb-0'>Add to your post</p>
            <div className="post-actions">
                <IoMdImages onClick={() => setPostType(prev => { return { prev, iv: true } })} size="1.5em" className='ms-2 text-success' />
                <CgPoll onClick={() => setPostType(prev => { return { prev, poll: true } })} size="1.4em" className='ms-2 text-danger' />
                <ImAttachment onClick={() => setPostType(prev => { return { prev, doc: true } })} size="1.2em" className='ms-2 text-primary' />
            </div>
        </div>

      </Modal.Body>
      <Modal.Footer className='mx-3 px-0 justify-content-between'>
        <button className='description_btnsave-white mx-0' onClick={() => { props.onHide();}}>Cancel</button>
        <button className='description_btnsave mx-0' onClick={() => {
            // props.onHide();
            handleSubmit()
        }}>Create Post</button>
      </Modal.Footer>
    </Modal>
  );
}