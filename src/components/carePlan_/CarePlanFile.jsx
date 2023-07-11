import React from "react";
import { useState } from "react";
import {
    addActiveSession,
    deleteSessionService,
    getActiveSession,
    getSessionDaysService,
    getSIngleSession,
    putSIngleActiveSession,
} from "../../services/ActivePrograms";
import { useEffect } from "react";
import { changeDateFormat, changeDateFormatYYYY, checkEndDate, convertTime12to24, getFileName, isEmpty, onStartSession, showToastError, showToastSuccess } from "../../Utils/Helper";
import TimePicker from "../../commonComponent/TimePicker";
import Loader from "../../commonComponent/Loader";
import DropDownMultiSelect from "../../commonComponent/DropDownMultiSelect";
import Button from "../../commonComponent/Button";
import { createZoomMeetingService } from "../../services/ZoomService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { timezone } from "../../Utils/AllConstant";
import DeleteModal from "../../commonComponent/DeleteModal";
import { AiOutlinePlus } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import DateInput from "../../commonComponent/CutomDatePicker";
import { toDate } from "date-fns";
import SquareAvatar from "../../commonComponent/SquareAvatar";
import { createCarePlanFileService, getAllCarePlanListService, getSingleCarePlanListService } from "../../services/CreateCarePlanService";
import { getUploadFileCategory, uploadCareFile } from "../../services/FileUploadService";
import { getCarePLan } from "../../services/PatientService";
import ApiConfig from "../../config/ApiConfig";

let selectedDeleteSession = '';

const CarePlanFile = (props) => {
    console.log('props', props)
    const navigate = useNavigate();
    const auth = useAuth();
    const carePlanId = props.careplanId;
    const [fileName, setFileName] = useState("");
    const [fileDescription, setFileDescription] = useState("");
    const [fileUpload, setFileUpload] = useState("");
    const [isLoading, setLoader] = useState(false);
    const [isSubmit, setSubmit] = useState(false);
    const [error, setError] = useState(false);
    const [fileApiChange, setFileApiChange] = useState("");
    const [fileId, setFileId] = useState("");
    const [getFileList, setGetFileList] = useState([]);
    const [existList, setExistList] = useState("");
    const [attachmentList, setAttachmentList] = useState([]);

    const checkValidation = () => {
        try {
            let errorsResult = error;
            let isValid = true;

            if (!fileName || isEmpty(fileName)) {
                isValid = false;
                errorsResult = { ...errorsResult, name: true }
            }
            if (!fileDescription || isEmpty(fileDescription)) {
                isValid = false;
                errorsResult = { ...errorsResult, desc: true }
            }
            if (fileApiChange != "edit") {
                if (!fileUpload || isEmpty(fileUpload)) {
                    isValid = false;
                    errorsResult = { ...errorsResult, file: true }
                }
            }
            setError(errorsResult)

            return isValid;
        } catch (error) {
        }
    }
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
    const handleSubmitFile = async (e) => {
        console.log(e);
        e.preventDefault();
        if (!checkValidation()) {
            return;
        }
        setSubmit(true)
        try {
            console.log(fileUpload, "files");
            const documentName = fileUpload ? getFileName(fileUpload) : null;

            fileUpload && await uploadCareFile(
                fileUpload,
                getUploadFileCategory.carePlan,
                documentName,
                carePlanId
            );

            var params = {
                "attachments": [
                    ...getFileList,
                    // "fileId": getFileList?.length ? getFileList[getFileList?.length - 1].fileId + 1 : 1,
                    {
                        "fileName": fileName,
                        "description": fileDescription,
                        "file": documentName ? documentName : ""

                    }]

            };
            if (fileApiChange == "edit") {
                let fileList = [...getFileList]
                // let fileIndex = fileList?.findIndex((item) => item.fileId == fileId)

                fileList[fileId] = {
                    // "fileId": fileId,
                    "fileName": fileName,
                    "description": fileDescription,
                    "file": documentName ? documentName : existList
                    // "file": documentName ? documentName : existList?.split("/").pop()
                }

                params = {
                    ...params, "attachments": fileList
                };

            }
            fileApi(params, carePlanId);
            console.log(existList, params, "params")

        }
        catch (error) {
            setSubmit(false)
            showToastError(
                error?.data?.data || error.data?.message || "Some error occurred"
            );
        }
    }
    useEffect(() => {
        getSingleFileById();
    }, [carePlanId])
    const getSingleFileById = async () => {
        setLoader(true)
        // console.log(sessionId);
        try {
            // if (!carePlanId) {
            //     return;
            // }
            const response = await getSingleCarePlanListService(carePlanId);
            // console.log(response.data[0].attachments, "response")
            if (response.status === 200) {
                setGetFileList(response.data[0].attachments)
                // setExistList("");

            } else {
                console.log(response?.data || response.message);
            }
            setLoader(false)
        } catch (error) {
            error?.data?.data &&
                console.log(error?.data?.data || error.data?.message);
            setLoader(false)
        }

    };
    const deleteFile = (deleteFileId) => {
        console.log(deleteFileId, "delete")
        if (deleteFileId >= 0) {
            let deleteFileList = [...getFileList]
            let updatedFileList = deleteFileList.filter((item, index) => index != deleteFileId)
            var params = {
                "attachments": updatedFileList
            };
            console.log(updatedFileList, deleteFileId, params, carePlanId, "params")

            fileApi(params, carePlanId);
        }
    }

    const fileApi = async (payload) => {
        try {
            const response = await createCarePlanFileService(payload, carePlanId);
            // setShowLoader(false)
            setSubmit(false);
            if (response.status === 200) {
                // props.onSave();
                document.getElementById('btn-close').click()
                showToastSuccess(`Action completed successfully`);
                getSingleFileById();
            } else {
                showToastError(
                    response?.data || response.message || "Some error occurred"
                );
            }
        }
        catch (error) {
            // setShowLoader(false)
            showToastError(
                error?.data?.data || error.data?.message || "Some error occurred"
            );
        }

    }
    const renderError = (msg, value) => {
        return (
            value ? (
                <h6 className="text-danger error" style={{ marginBottom: 15, marginTop: -15 }}>
                    {msg}
                </h6>) : null)
    }

    const renderForm = () => {
        return (
            <form onSubmit={handleSubmitFile}>
                <div className="row">
                    <div className="col-md-12">
                        <p className="whole_label">File Name <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                        <input
                            type="text"
                            className="description_inputf mb-4"
                            placeholder="Eg. Sample module"
                            maxLength={80}
                            value={fileName}
                            onChange={(e) => {
                                setFileName(e.target.value);
                                setError({ ...error, name: false });
                            }}
                        />
                        {renderError('Please enter file name', error.name)}
                    </div>

                    <div className="col-md-12">
                        <p className="whole_label">Description <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                        <textarea
                            type="text"
                            className="pt-3 description_inputf mb-4"
                            placeholder="Please add description..."
                            style={{ height: "200px" }}
                            value={fileDescription}
                            maxLength={200}
                            onChange={(e) => {
                                setFileDescription(e.target.value);
                                setError({ ...error, desc: false });
                            }}
                        />
                        {renderError('Please enter description', error.desc)}
                    </div>

                    <div className="col-md-12">
                        <p className="whole_label">Attach File <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                        <div className="position-relative">
                            <img
                                src={
                                    fileUpload != "" || existList !== "" ?
                                        "images/pdf.png" :
                                        "images/fileUpload.png"
                                }
                                style={{ objectFit: fileUpload != "" || existList !== "" ? "contain" : "cover" }}
                                className="active_dummyimg p-3"
                            />
                            <input
                                type="file"
                                accept="application/pdf"
                                className="form-control uploader-input"
                                // value={`${ApiConfig.awsBaseUrl}careplan/${carePlanId}/${existList}`}
                                onChange={(e) => {
                                    setFileUpload(e.target.files[0]);
                                    // setAttachmentList(URL.createObjectURL(e.target.files[0]));
                                    setError({ ...error, file: false })
                                }}
                                onClick={(e) => e.target.value = null}
                            />
                        </div>
                        <p onClick={() => fileUpload != "" ? instandDn(fileUpload) : existList !== "" ? window.open(ApiConfig.ImageUrl + 'careplan/' + carePlanId + '/' + existList, '_blank') : null} className="badge rounded-pill bg-dark py-2 px-3 mt-1 pointer">{fileUpload?.name || existList}</p>
                        <div className="uploader-mask d-flex justify-content-center align-items-center mb-1">
                            {/* <BsFillPlusCircleFill className="upload-icon" /> */}
                        </div>
                        {renderError('Please select file', error.file)}
                    </div>

                    <div className="col-md-12 text-center">
                        <Button
                            isLoading={isSubmit} disabled={isSubmit} type="submit" id="reateProgram" text={fileApiChange == "edit" ? 'Update File' : 'Add New File'} style={isSubmit ? { cursor: 'none' } : {}}
                            className="description_createsess" />
                    </div>
                </div>
            </form>
        )
    }

    const renderFileList = () => {
        return getFileList.map((item, index) => {
            // const canStartSession = !checkEndDate(session.sessionDate);
            // var time = new Date(session.createdAt);
            // let index = 0;
            return (
                <div className="d-flex mb-3">
                    <span className="px-3 py-4 numbr">{index + 1 < 10 && "0"}{index + 1}</span>
                    <div className="flex-grow-1 card d-flex px-4 py-3 flex-row justify-content-between align-items-center">
                        {/* <div className="pe-4">
                            <SquareAvatar
                                src=""
                                className="member_listimage squre_image2"
                            />
                        </div> */}
                        <div>
                            <h6>{item.fileName}</h6>
                            <p className="mb-0">{item.description}</p>
                        </div>
                        <DeleteModal
                            title={'Delete'}
                            content1={'Are you sure you want to remove'}
                            content2={'this File?'}
                            modalId={'deleteFile'}
                            button2={'No'}
                            button1={'Yes'}
                            onDelete={() => deleteFile(fileId)}
                        />
                        <div className="d-flex">
                            <button
                                className="btn btn-primary btn-custom-light"
                                data-bs-toggle="modal" data-bs-target="#deleteFile"
                                style={{ marginRight: "15px" }}
                                onClick={() => {
                                    setFileId(index);
                                }}
                            >
                                Delete
                            </button>
                            <button
                                className="btn btn-primary btn-custom-light ms-3"
                                data-bs-toggle="modal" data-bs-target="#sessionModal"
                                onClick={() => {
                                    setFileName(item.fileName);
                                    setFileDescription(item.description);
                                    setFileUpload("");
                                    setFileApiChange("edit")
                                    setExistList(item.file);
                                    setFileId(index);
                                }}
                            >
                                <RiEdit2Fill className="me-2" /> Edit
                            </button>
                        </div>
                    </div>
                </div>
            );
        })
    }

    return (
        <div className="mx-5 mt-5">
            <div className="col-md-12 d-flex justify-content-between">
                <div className="w-80">
                    <h4>Add Care Plan File</h4>
                    <p>Attach file to complete care plan process</p>
                </div>
                <div className="w-20 d-flex">
                    <span className="btn btn-primary btn-custom" data-bs-toggle="modal" data-bs-target="#sessionModal"
                        style={{ marginLeft: "150px" }}
                        onClick={() => {
                            // getSessionById();
                            setExistList("");
                            setFileName("");
                            setFileDescription("");
                            setFileUpload("");
                            setFileApiChange("Add");
                        }}
                    > Upload New File</span>
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
                ) : getFileList == "" ? (
                    <Loader textClassName={`mt-0`} showBR={false} emptyTextKey={`addNewFile`} mainClassName={`active_n0data2`} />
                ) :
                    renderFileList()
                }
            </div>
            <div className="col-md-12 mt-5">
                <hr />
                <div className="d-flex justify-content-between">
                    <div text={'Back'} style={{ cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9', width: "120px" }} className="description_btnsave d-flex justify-content-center align-items-center" onClick={() => !isLoading && props.onBack()}>Back</div>
                    <div text={'Finish'} style={{ width: "120px" }} className="description_btnsave d-flex justify-content-center align-items-center" onClick={() => !isLoading && showToastSuccess("Action Completed Succesfully.") && navigate('/careplan')}>Finish</div>
                </div>
            </div>
            {/* <!-- Modal --> */}
            <div class="modal fade" id="sessionModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content py-4 px-3">
                        <div class="modal-header border-0">
                            {/* <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> */}
                            <h5>{fileApiChange == "edit" ? "Edit File" : "Add New File"}</h5>
                            <button type="button" class="btn-close" id="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {isLoading ? (
                                <center>
                                    <div
                                        style={{ width: "3rem", height: "3rem", color: "#1f7e78" }}
                                        class="spinner-border mt-3 mb-4"
                                        role="status"
                                    />
                                </center>
                            ) : (
                                renderForm()
                            )}
                        </div>
                        {/* </div> */}
                        {/* <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarePlanFile;
