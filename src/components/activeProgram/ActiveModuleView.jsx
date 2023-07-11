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

const ActiveModuleView = (props) => {
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
    const [attachmentList, setAttachmentList] = useState({});
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


    const getModuleById = async () => {
        try {
            const response = await getActiveModule(props.programId);
            setLoader(false);
            if (response.status === 200) {
                setGetModuleList(response?.data?.data);
                setAttachmentList({});
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

    const renderError = (msg, value, style) => {
        return (
            value ? (
                <h6 className="blog_error_text4" style={{ marginBottom: 15, marginTop: -15, ...style }}>
                    {msg}
                </h6>) : null)
    }

    return (
        <div className="container">
            <div className="my-4">
                <h2>Modules</h2>
                {/* <p>Gravida vestibulum felis tristique lectus elementum. Amet ut est cursus sociis.</p> */}
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
                    <Loader textClassName={`mt-0`} showBR={false} emptyTextKey={`noData`} mainClassName={`active_n0data2`} />
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

                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default ActiveModuleView;
