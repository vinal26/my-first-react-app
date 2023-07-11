import React, { useEffect, useState, useCallback } from 'react';
import Select from "react-select";
import Modal from '../../commonComponent/Modal';
import { changeUserLifestyleTemplate, getTemplateListService } from '../../services/LifestyleService';
import { toastMsg } from '../../Utils/AllConstant';
import { getFileName, showToastSuccess } from '../../Utils/Helper';
import Dropzone, { useDropzone } from 'react-dropzone'
import { getUploadFileCategory, uploadFile } from '../../services/FileUploadService';
import { uploadFileService } from '../../services/MealService';
const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 130,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
    flexDirection: "column",
    fontSize: "11px",
    position: "relative"
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

const dropzone = {
    width: "100%",
    minHeight: "120px",
    border: "4px dashed #1f7e78",
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
    padding: "10px"
}

const cross ={
    position: "absolute",
    right: "0",
    top: "0px",
    background: "#1f7e78",
    width: "34px",
    height: "25px",
    zIndex: "100",
    textAlign: "center",
    color: "white",
    paddingtop: "1px",
    fontWeight: "bold",
    cursor: "pointer",
    paddingTop: "5px"
}

const MealPlanModal = ({toggleApi, setToggleApi }) => {
    const [files, setFiles] = useState([]);
    const [mealType, setMealType] = useState("");
    const [mealPlanName, setMealPlanName] = useState("");
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'application/pdf': []
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        },
        maxFiles: 1
    });

    const deleteFile = (e, index) =>{
        let updated = files;
        updated.splice(index,1);
        setFiles(updated)
        setMealPlanName("")
        // e.stopPropagation();
    }

    useEffect(()=>{
        setMealPlanName(files[0]?.name.substring(0, 39))
    },[files])

    const thumbs = files.map((file,index) =>{
       
      return (<div style={thumb} key={file.name+index}>
            <div style={thumbInner}>
                <span  style={cross} onClick={(e)=>{deleteFile(e, index)}}>X</span>
                <img
                    src={'images/pdf.png'}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
                <p>{file.name}</p>
            </div>
        </div>
        ) 
    })

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);


    const uploadFiles = async () => {
        setLoader(true)
        try {
            const fileName = getFileName(files[0]);
            const result = await uploadFile(
                files[0],
                getUploadFileCategory.mealPlan,
                fileName
            );
            const response = await uploadFileService({
                "mealplan": mealPlanName,
                "mealtype": mealPlanName,
                "mealfile": fileName
            }
            );
            if (response) {
                showToastSuccess(toastMsg.addMealPlan)
                setFiles([])
                setMealPlanName("");
                setMealType("");
                setLoader(false)
                document.getElementById("close_btn").click();
                setToggleApi(!toggleApi);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (<Modal modalId={"mealPlanModal"} processing={loader} modalClose={() => { 
        setFiles([])
        setMealPlanName("");
        setMealType("");
        setLoader(false)
        setError(false) 
        }}>
        <div class="">
            <div>
                <div className="row">
                    <div className="col-md-12 mb-4 px-4">
                        <p className="whole_label" style={{ fontWeight: "bold" }}>Meal Plan Name <sub style={{
                                top: "-1px",
                                position: "relative",
                                fontSize: "9px",
                                color: "#b9b9b9",
                                marginLeft: "5px",
                        }}>(max 40 characters)</sub></p>
                        <input
                            required
                            type="text"
                            className="description_inputf mb-0"
                            value={mealPlanName}
                            onChange={(e) => {
                                if (e?.target?.value?.trim()) {
                                    setMealPlanName(e.target.value)
                                } else {
                                    setMealPlanName("")
                                }
                            }
                            }
                            placeholder="Plan Name"
                            style={{color: "black"}}
                            maxLength={40}
                        />
                        {(error && !mealPlanName) && <label className="text-danger mt-1">Please enter meal plan name.</label>}
                    </div>
                </div>
            </div>
            <section className="container">
                <p className="whole_label" style={{ fontWeight: "bold" }}>Upload File</p>
                <div {...getRootProps({ className: 'dropzone' })} style={dropzone}>
                    <input {...getInputProps()} />
                    {thumbs.length == 0 && <p style={{ textAlign: "center", width: "100%" }}>You can Drag or Select only 1 PDF file.</p>}
                    <aside style={thumbsContainer}>
                        {thumbs}
                    </aside>
                </div>
                {(error && !files.length) && <label className="text-danger" style={{ top: "-15px", position: "relative" }}>Please select files.</label>}
            </section>
            <div>
                <center>
                    <button
                        onClick={() => {
                            if (files.length && mealPlanName) {
                                uploadFiles()
                                setError(false)
                            } else {
                                setError(true)
                            }
                        }}
                        type="button"
                        class={'cancel_delete_blog m-0 text-white d-flex justify-content-center align-items-center'}
                        style={{ backgroundColor: "#1f7e78" }}
                        disabled={loader}
                    >
                        Upload {loader && <div className=" text-center text-capitalize" style={{ marginLeft: "10px" }}>
                            <div style={{ width: '2rem', height: '2rem', marginTop: "6px" }} class="spinner-border" role="status" />
                        </div>}
                    </button>
                    <button id="close_btn" data-bs-dismiss="modal" type="button" className='d-none'>
                        Upload
                    </button>
                </center>
            </div>
        </div>
    </Modal>
    )

}
export default MealPlanModal;