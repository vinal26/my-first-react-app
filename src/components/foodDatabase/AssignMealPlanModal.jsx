import React, { useEffect, useState, useCallback, useRef } from 'react';
import Select from "react-select";
import Modal from '../../commonComponent/Modal';
import { changeUserMealPlanService, getPatientList } from '../../services/PatientService';
import { toastMsg } from '../../Utils/AllConstant';

import { getFileName, showToastSuccess } from '../../Utils/Helper';

const AssignMealPlanModal = ({ assigneId, setAssigneId }) => {
    const [loader, setLoader] = useState(false);
    const [patientLists, setPatientLists] = useState([]);
    const [selectedPatients, setSelectedPatients] = useState([]);
    const [error, setError] = useState(false);


    const selectInputRef = useRef(null)
    const getPatientLists = async () => {
        try {
            const response = await getPatientList();
            setLoader(false);
            if (response.data.status === 200) {
                let patientList = response.data?.data?.map((item) => {
                    return {
                        label: item.full_name,
                        value: item._id
                    }
                })
                setPatientLists(patientList.reverse());
            }
        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    };

    useEffect(() => {
        getPatientLists()
    }, [])

    const onSave = async () => {
        console.log(assigneId, selectedPatients)
        try {
            if (selectedPatients.length) {
                const params = {
                    "mealPlanId": assigneId,
                    "userId": { "userId": selectedPatients }
                }
                const response = await changeUserMealPlanService(params)
                if (response.data.status == 200) {
                    showToastSuccess(toastMsg.changeMealPlanTemplate)
                    setSelectedPatients([]);
                    selectInputRef.current.clearValue();
                    setAssigneId("")
                }
                document.getElementById("close_btn_meal").click()
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (<Modal modalId={"assignMealPlanModal"} modalDilog="modal-lg" modalClose={()=>{setError(false)}}>
        <div class="modal-body">
            <div>
                <div>
                    <Select
                        ref={selectInputRef}
                        closeMenuOnSelect={false}
                        isMulti
                        name="colors"
                        placeholder="Select Patients"
                        options={patientLists}
                        className="basic-multi-select"
                        classNamePrefix=" select"
                        onChange={(value) => {
                            const updatedValues = value?.map((item) => {
                                return item.value
                            })
                            setSelectedPatients(updatedValues)
                        }}
                    />
                     {(error && !selectedPatients.length) && <label className="text-danger" style={{top: "-15px", position: "relative"}}>Please select atleast 1 patient.</label>}
                </div>
                <center>
                    <button
                        onClick={() => {
                            if (selectedPatients?.length && assigneId) {
                                setError(false)
                                onSave()
                            }else{
                                setError(true)
                            }
                        }
                        }
                        type="button"
                        class={'cancel_delete_blog m-0 text-white d-flex justify-content-center align-items-center'}
                        style={{ backgroundColor: "#1f7e78" }}
                        disabled={loader}
                    >
                        Assign {loader && <div className=" text-center text-capitalize" style={{ marginLeft: "10px" }}>
                            <div style={{ width: '2rem', height: '2rem' }} class="spinner-border" role="status" />
                        </div>}
                    </button>
                    <button
                        id="close_btn_meal"
                        data-bs-dismiss="modal"
                        type="button"
                        className='d-none'
                    >
                        Assign
                    </button>
                </center>
            </div>
        </div>
    </Modal>
    )

}
export default AssignMealPlanModal;