import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import {
  addActiveModule,
  deleteModuleService,
  getActiveModule,
  getSIngleActiveModule,
  putSIngleActiveModule,
} from "../../services/ActivePrograms";
import { BsTrash, BsPlusCircle } from "react-icons/bs";
import { changeDateFormat, getFileName, isEmpty, showToastError, showToastSuccess } from "../../Utils/Helper";
import Loader from "../../commonComponent/Loader";
import Button from "../../commonComponent/Button";
import { BlogEditorComponent } from "../blog/BlogEditor";
import Attachments from "../../commonComponent/Attachments";
import { getUploadFileCategory, uploadFile } from "../../services/FileUploadService";
import { RiEdit2Fill } from "react-icons/ri";
import { AiFillPlusCircle, AiOutlinePlus } from "react-icons/ai";
import DateInput from "../../commonComponent/CutomDatePicker";
import DeleteModal from "../../commonComponent/DeleteModal";
import SquareAvatar from "../../commonComponent/SquareAvatar";

const ActiveModule = (props) => {
  let navigate = useNavigate();
  const auth = useAuth();
  const [moduleName, setModuleName] = useState("");
  const [moduleContent, setModuleContent] = useState("");
  const [description, setDescription] = useState("");
  const [inputList, setInputList] = useState([{ addPoints: "" }]);
  const [getModuleList, setGetModuleList] = useState([]);
  const [moduleApiChange, setModuleApiChange] = useState("");
  const [ModuleId, setModuleId] = useState("");
  const [getSingleModule, setSIngleGetModule] = useState([]);
  const [isLoading, setLoader] = useState(true);
  const [isShowLoader, setShowLoader] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [error, setError] = useState(false);
  const [attachmentList, setAttachmentList] = useState([]);
  const [existList, setExistList] = useState([]);
  const [CoverShowImageCreate, setCoverShowImageCreate] = useState("");
  const [CoverShowImage, setCoverShowImage] = useState("");
  // const [validation, setValidation] = useState(false);

  const rootElement = document.documentElement;
  const messagesEndRef = useRef(null);
  // console.log(props, "props")
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    getModuleById();
    // getSIngleModuleById();
    // scrollToBottom();
  }, [props.programId]);


  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { addPoints: "" }]);
  };

  const checkValidation = () => {
    try {

      let isValid = true;
      let error = {};

      if (!CoverShowImageCreate) {
        isValid = false;
        error = { ...error, image: true }
      }
      if (!moduleName || isEmpty(moduleName)) {
        isValid = false;
        error = { ...error, name: true }
      }

      if (!description || isEmpty(description)) {
        isValid = false;
        error = { ...error, description: true }
      }

      if (!moduleContent || moduleContent === '<p><br></p>') {
        isValid = false;
        error = { ...error, moduleContent: true }
      }

      // if (inputList.length) {
      //   inputList.map((item, index) => {
      //     if (!item.addPoints || isEmpty(item.addPoints)) {
      //       isValid = false;
      //       let name = `addPoint${[index]}`
      //       error = { ...error, [name]: true }
      //     }
      //   })
      // }
      setError(error)
      console.log(isValid, "isValid")
      // if (isValid == false)
      //   setValidation(false);

      return isValid;
    } catch (error) {

    }
  }

  const handleSubmitModule = async (e) => {
    e.preventDefault();
    if (!checkValidation()) {
      // setValidation(true);
      return;
    }
    // console.log(validation, "validation")
    setSubmit(true)

    var parms = {};
    parms["title"] = moduleName;
    parms["description"] = description;
    parms["content"] = moduleContent;

    console.log(parms);
    if (moduleApiChange == "edit") {
      try {
        let el = [], documentName = [];
        documentName = attachmentList.map(it => getFileName(it));
        const imageName = CoverShowImageCreate ? getFileName(CoverShowImageCreate) : null;

        console.log(attachmentList, CoverShowImageCreate, ": Files");

        CoverShowImageCreate && await uploadFile(
          CoverShowImageCreate,
          getUploadFileCategory.moduleImage,
          imageName,
          props.programId
        );
        attachmentList.map(async (it, i) => await uploadFile(
          it,
          getUploadFileCategory.moduleDoc,
          documentName[i],
          props.programId
        ));

        el = existList?.map(dt => dt.split("/").pop())

        const response = await putSIngleActiveModule(props.programId, ModuleId, {
          ...parms,
          image: imageName ? imageName : CoverShowImage?.split("/").pop(),
          attachments: [...el, ...documentName],
          isVideoAttached: moduleContent.includes("ql-video")
        });
        setSubmit(false)
        // setShowLoader(false)
        if (response.status === 200) {
          // props.onSave();
          document.getElementById('btn-close').click()
          showToastSuccess(`Active module is updated`);
          getModuleById();
        } else {
          showToastError(
            response?.data || response.message || "Some error occurred"
          );
        }
      } catch (error) {
        setSubmit(false);
        // setShowLoader(false)
        showToastError(
          error?.data?.data || error.data?.message || "Some error occurred"
        );
        console.log(error);
      }
    } else {
      try {
        let documentName = [];
        documentName = attachmentList.map(it => getFileName(it));
        const imageName = CoverShowImageCreate ? getFileName(CoverShowImageCreate) : null;

        CoverShowImageCreate && await uploadFile(
          CoverShowImageCreate,
          getUploadFileCategory.moduleImage,
          imageName,
          props.programId
        );
        attachmentList.map(async (it, i) => await uploadFile(
          it,
          getUploadFileCategory.moduleDoc,
          documentName[i],
          props.programId
        ));

        const response = await addActiveModule(props.programId, {
          ...parms,
          image: imageName ? imageName : "",
          attachments: documentName,
          isVideoAttached: moduleContent.includes("ql-video")
        });
        setSubmit(false)
        // setShowLoader(false)
        if (response.status === 200) {
          // props.onSave();
          document.getElementById('btn-close').click()
          showToastSuccess(`Active module is created`);
          setModuleContent('');
          setAttachmentList([]);
          setInputList([{ addPoints: "" }]);
          setModuleName("");
          setDescription("");
          getModuleById();
          setCoverShowImageCreate("")
        } else {
          showToastError(
            response?.data || response.message || "Some error occurred"
          );
        }
      } catch (error) {
        setSubmit(false);
        // setShowLoader(false)
        showToastError(
          error?.data?.data || error.data?.message || "Some error occurred"
        );
      }
    }
    // // }
  };


  const getModuleById = async () => {
    try {
      const response = await getActiveModule(props.programId);
      setLoader(false);
      if (response.status === 200) {
        setGetModuleList(response?.data?.data);
        setAttachmentList([]);
        setModuleContent('');
        setDescription("");
        setInputList([{ addPoints: "" }]);
        setModuleName("");
        setCoverShowImageCreate("");
        setCoverShowImage("");
        setExistList([]);
      } else {
        console.log(response?.data || response.message);
      }
    } catch (error) {
      setSubmit(false)
      // setLoader(false);
      setGetModuleList([]);
      error?.data?.data &&
        console.log(error?.data?.data || error.data?.message);
    }
  };
  const instandDn = (dt) => {
    const a = document.createElement('a');
    document.body.appendChild(a);
    var url = URL.createObjectURL(dt);
    a.href = url;
    a.download = dt.name;
    a.target = "_blank";
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0)
  }
  const getSIngleModuleById = async (ModuleId) => {
    setLoader(true)
    console.log(ModuleId);
    try {
      if (!ModuleId) {
        return;
      }
      const response = await getSIngleActiveModule(props.programId, ModuleId);

      if (response.status === 200 && response.data) {
        console.log(response, "module response")
        const module = response.data.data[0];
        setSIngleGetModule(module);
        setModuleName(module.title);
        setDescription(module.description);
        setModuleContent(module.content);
        setExistList(module.attachments);
        setCoverShowImage(module.image);
      } else {
        console.log(response?.data || response.message);
      }
      setLoader(false)
    } catch (error) {
      // setSIngleGetModule([]);
      // setInputList([{ addPoints: "" }]);
      // setAttachmentList([]);
      // setModuleContent('')
      // setModuleName("");
      // setDescription("");
      // setCoverShowImageCreate("")
      error?.data?.data &&
        console.log(error?.data?.data || error.data?.message);
      setLoader(false)
    }
  };

  const deleteModule = async (ModuleId) => {
    try {
      const response = await deleteModuleService(props.programId, ModuleId);
      if (response) {
        showToastSuccess(response?.data || 'Module deleted successfully.');
        getModuleById();
      } else {
        showToastError(response?.data || response.message || "Some error occurred")
      }
    } catch (error) {
      showToastError(error?.data?.data || error.data?.message || "Some error occurred")
    }
  }

  const renderError = (msg, value, style) => {
    return (
      value ? (
        <h6 className="text-danger error" style={{ marginBottom: 15, marginTop: -15, ...style }}>
          {msg}
        </h6>) : null)
  }

  return (
    <div className="px-5 mt-5">
      <div className="col-md-12 d-flex justify-content-between">
        <div className="w-80">
          <h4>Add Modules</h4>
          {/* <p>Gravida vestibulum felis tristique lectus elementum. Amet ut est cursus sociis.</p> */}
        </div>
        <div className="w-20 d-flex">
          <span className="btn btn-primary btn-custom" data-bs-toggle="modal" data-bs-target="#exampleModal"
            style={{ marginLeft: "150px" }}
            onClick={() => {
              setExistList("");
              setAttachmentList([]);
              setModuleContent('');
              setModuleName("");
              setDescription("");
              setCoverShowImageCreate("");
              setCoverShowImage("");
              setModuleApiChange("Add");
              // setValidation(false)
            }
            }><AiOutlinePlus className="me-2" /> Add New Module</span>
        </div>
      </div>
      <div className="table_resouter mt-4">
        {isLoading ? (
          <center>
            <div
              style={{ width: "3rem", height: "3rem", color: "#1f7e78" }}
              class="spinner-border mt-3 mb-4"
              role="status"
            />
          </center>
        ) : getModuleList.length == 0 ? (
          <Loader textClassName={`mt-0`} showBR={false} emptyTextKey={`addNewModules`} mainClassName={`active_n0data2`} />
        ) : (
          getModuleList.reverse().map((curelem, index) => {
            var time = new Date(curelem.createdAt);

            return (
              <div className="d-flex mb-3">
                <span className="px-3 py-3 numbr">{index + 1 < 10 && "0"}{index + 1}</span>
                <div className="flex-grow-1 card d-flex px-4 py-3 flex-row justify-content-between align-items-center">
                  <div className="d-flex">
                    <img
                      src={curelem.image}
                      onError={(e) => {
                        e.target.src = "images/defaultPlaceholder.jpg"
                      }}
                      className="member_listimage squre_image2"
                    />
                    <div className="ms-3">
                      <h5 className="mb-1">{curelem.title}</h5>
                      <p className="mb-0">{curelem.description}</p>
                    </div>
                  </div>
                  <DeleteModal
                    title={'Delete'}
                    content1={'Are you sure you want to delete'}
                    content2={'this module?'}
                    modalId={'deleteModule'}
                    button2={'No'}
                    button1={'Yes'}
                    onDelete={() => deleteModule(ModuleId)}
                  />
                  <div className="d-flex">
                    <button
                      className="btn btn-primary btn-custom-light"
                      data-bs-toggle="modal" data-bs-target="#deleteModule"
                      onClick={() => {
                        setModuleId(curelem._id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-primary btn-custom-light"
                      data-bs-toggle="modal" data-bs-target="#exampleModal"
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        setModuleApiChange("edit");
                        setModuleId(curelem._id);
                        setAttachmentList([]);
                        getSIngleModuleById(curelem._id)
                        // setValidation(false);
                        console.log(curelem._id);
                      }}
                    >
                      <RiEdit2Fill className="me-2" /> Edit
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* <span className="d-block btn-custom-link" data-bs-toggle="modal" data-bs-target="#exampleModal"
        onClick={() => {
          setExistList("");
          setAttachmentList({});
          setModuleContent('');
          setModuleName("");
          setDescription("");
          setCoverShowImageCreate("");
          setCoverShowImage("");
          setModuleApiChange("Add");
          // setValidation(false)
        }
        }><AiOutlinePlus className="me-2" /> Add New Module</span> */}
      <div className="col-md-12 mt-5">
        <hr />
        <div className="d-flex justify-content-between">
          <div text={'Back'} style={{ cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9', width: "120px" }} className="description_btnsave d-flex justify-content-center align-items-center" onClick={() => !isLoading && props.onBack(props.programId)}>Back</div>
          <div text={'Continue'} style={{ cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9', width: "120px" }} className="description_btnsave d-flex justify-content-center align-items-center" onClick={() => !isLoading && props.onSave()}>Continue</div>
        </div>
      </div>
      {/* <!-- Modal --> */}
      <div class="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header p-4">
              {/* <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> */}
              <h5 className="mb-0">{moduleApiChange == "edit" ? "Edit Module" : "Add New Module"}</h5>
              <button type="button" class="btn-close" id="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body px-4">
              {isLoading ? (
                <center>
                  <div
                    style={{ width: "3rem", height: "3rem", color: "#1f7e78" }}
                    class="spinner-border mt-3 mb-4"
                    role="status"
                  />
                </center>
              ) : (
                <form onSubmit={handleSubmitModule}>
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <p className="whole_label">module <span className="small_letter2">title</span><span className="text-danger"> *</span></p>
                      <input
                        type="text"
                        value={moduleName}
                        maxLength={80}
                        onChange={(e) => {
                          setModuleName(e.target.value);
                          setError({ ...error, name: false })
                        }}
                        placeholder="Module title"
                        className="description_inputf mb-4"
                      />
                      {renderError('Please enter name', error.name)}
                    </div>
                    <div className="col-md-12">
                      <p className="whole_label">description<span className="text-danger"> *</span></p>
                      <input
                        type="text"
                        value={description}
                        maxLength={200}
                        onChange={(e) => {
                          setDescription(e.target.value);
                          setError({ ...error, description: false })
                        }}
                        placeholder="Description"
                        className="description_inputf mb-4"
                      />
                      {renderError('Please enter description', error.description)}
                    </div>

                    <div className="col-md-12 position-relative mt-1">
                      <p className="whole_label">Thumbnail</p>
                      <img
                        src={(CoverShowImageCreate !== "" && URL.createObjectURL(CoverShowImageCreate)) || CoverShowImage !== "" && CoverShowImage ||
                          "images/upload_banner.png"}
                        style={{ objectFit: "cover" }}
                        onError={(e) => {
                          e.target.src = "images/defaultPlaceholder.jpg" //replacement image imported above
                        }}
                        alt="2"
                        className="active_dummyimg"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control uploader-input mb-5"
                        value=""
                        onChange={(e) => {
                          // setProgramImageCreate(e.target.files[0]);
                          setCoverShowImageCreate(e.target.files[0]);
                          setError({ ...error, image: false })
                        }}
                      />
                      {renderError('Please enter image', error.image ,  { marginTop: 10 , marginBottom:-5 })}
                    </div>
                    <div className="uploader-mask d-flex justify-content-center align-items-center">
                    </div>
                    <div className="col-md-12">
                    <p className="whole_label">Module Content<span className="text-danger"> *</span></p>
                      <div className="text-editor-receipe my-3">
                        <BlogEditorComponent
                          onChange={(data) => {
                            setModuleContent(data);
                            setError({ ...error, moduleContent: false })
                          }}
                          placeholder="start writing..."
                          value={moduleContent}
                          onAddNewFile={(fileName) => { }}
                        />
                      </div>
                      {renderError('Please add content.', error.moduleContent, { marginTop: -5 })}
                    </div>
                    <div className="col-md-12 position-relative mt-3">
                      <p className="whole_label">Upload files (pdf)</p>

                      {/* Document Upload */}
                      <div className="multi-uploader d-flex">
                        {/* File Uploader */}
                        <div className="uploader-input_multi me-3 bg-white">
                          <input type="file" className="form-control uploader-input"
                            accept="application/pdf"
                            multiple
                            onChange={(e) => {
                              console.log(attachmentList)
                              setAttachmentList([...Array.from(e.target.files), ...attachmentList])
                            }}
                            onClick={(e) => e.target.value = null}
                          />
                          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" color="#1f7e78" height="3rem" width="3rem" xmlns="http://www.w3.org/2000/svg" style={{ color: "rgb(31, 126, 120)" }}><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"></path></svg>
                        </div>
                        {/* All Attached Files */}
                        {attachmentList.length > 0 && attachmentList.map((dt, i) => <div className="me-3" key={i} style={{ position: "relative", width: "100px", cursor: "pointer" }}>
                          <img
                            src="images/pdf.png"
                            alt=""
                            className="active_dummyimg_multi bg-white"
                            onClick={() => instandDn(dt)}
                          />
                          <span onClick={() => {
                            let newFormValues = [...attachmentList];
                            newFormValues.splice(i, 1);
                            setAttachmentList(newFormValues)
                          }} className="close-button"></span>
                          <p style={{ width: "100%", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }} className="mb-0">{dt.name}</p>
                        </div>)}

                        {/* All Existed Files */}
                        {existList.length > 0 && existList?.map((dt, i) => <div className="me-3" key={i} style={{ position: "relative", width: "100px", cursor: "pointer" }}>
                          <img
                            src="images/pdf.png"
                            alt=""
                            className="active_dummyimg_multi"
                            onClick={() => window.open(dt, '_blank')}
                          />
                          <span onClick={() => setExistList(existList.filter(it => it !== dt))} className="close-button"></span>
                          <p onClick={() => window.open(dt, '_blank')} style={{ width: "100%", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }} className="mb-0">{dt?.split("/").pop()}</p>
                        </div>)}
                      </div>

                    </div>

                    <div>
                      <hr className="mt-4 px-3 mb-0" />
                      <Button isLoading={isSubmit} disabled={isSubmit} type="submit" id="reateProgram" text={moduleApiChange == "edit" ? 'Update Module' : 'Add Module'} style={isSubmit ? { cursor: 'none' } : { width: "max-content", marginLeft: 0 }} className="description_btnsave blogbtn_widfix mt-3" />
                    </div>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default ActiveModule;
