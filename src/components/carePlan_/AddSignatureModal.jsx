import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { RiContactsBookUploadFill } from 'react-icons/ri';
import Loader from '../../commonComponent/Loader';
import { getMyPatientList } from '../../services/PatientService';
import { groupMembers } from '../../Utils/AllConstant';


const SignatureModal = ({onHandle}) => {
    const [Type, setType] = useState("client")
    const [Sign, setSign] = useState("")
    const [Acknowledged, setAcknowledged] = useState(false)

    let handleSubmit = async (event) => {
        console.log("Inside");;

        if(Type==='client'){
            onHandle({
                title: '',
                helpText: '',
                answer: {name: '', acknowledged: false},
                options: [],
                type: 'waiverClient'
            })
        }
        else {
            onHandle({
                title: Sign,
                helpText: '',
                answer: {name: Sign, acknowledged: true},
                options: [],
                type: 'waiverProvider'
            })
        }

        setSign("")
        setAcknowledged(false)
    }

    return (
        <div class="modal fade" id="shareModal" aria-labelledby="memberModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header p-4 border-0">
                        {/* <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> */}
                        <h3 className="mb-0" style={{ color: "#1f7e78" }}>Consent & Signature</h3>
                        <button type="button" class="btn-close border-0" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body pb-4 px-4">

                        {/* <form onSubmit={handleSubmit}> */}

                            <div className="col-md-12">
                                <p className="whole_label text-green">Who needs to sign? <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                                <select
                                    type="text"
                                    className="description_inputf"
                                    value={Type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="client">My Client</option>
                                    <option value="provider">Me</option>
                                </select>
                                {/* {(error && !medicationName) && <h2 className="text-danger error">Medication name should not be empty.</h2>} */}
                            </div>

                            {Type==='provider' && <>
                            <div className="col-md-12 mt-4 mb-5">
                                <p className='fw-bold'>Signature</p>
                                <input
                                    name="sign"
                                    type="text"
                                    maxLength={50}
                                    className="description_inputf mb-0"
                                    value={Sign} onChange={e => setSign(e.target.value)}
                                    // onChange={(e) => { if (e.target.value >= 0 && e.target.value < 100) setserve(e.target.value) }}
                                  />
                            </div>
                            <div className="col-md-12 mt-5 mb-4">
                                <p className='fw-bold'>Acknowledgement</p>
                                <div>
                                    <div class="form-check mt-1 mb-5">
                                        <input class="form-check-input" checked={Acknowledged} type="checkbox" value="" id="flexCheckDefault" onChange={e => setAcknowledged(e.target.checked)} />
                                        <label class="form-check-label" htmlFor="flexCheckDefault">
                                        I agree to the terms and conditions
                                        </label>
                                    </div>
                                </div>
                            </div>
                            </>}

                            <hr />
                            <div className="d-flex justify-content-between">
                                <button type="button" className="btn btn-primary btn-custom-light px-4 me-2" style={{ backgroundColor: 'transparent' }} data-bs-dismiss="modal">Never Mind</button>
                                <button className="btn btn-primary btn-custom" type='button' disabled={Type==="provider" ? (Sign==="" || !Acknowledged) : false} onClick={handleSubmit} data-bs-dismiss="modal">Save</button>
                            </div>
                        {/* </form> */}
                    </div>

                </div>
            </div>
        </div>
    )
};

export default SignatureModal;