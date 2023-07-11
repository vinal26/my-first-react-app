import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import DateInput from '../../commonComponent/CutomDatePicker'
import TimePicker from '../../commonComponent/TimePicker'
import { formatDate } from '../../Utils/Helper'
import { RichEditor } from '../carePlan_/RichEditor'

function FormsModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title} - Forms & Waivers Response
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-4'>
          {/* {JSON.stringify(props.questions)} */}
          {props.questions?.map(ques => {
            if(ques.type==='shortResponse' || ques.type==='longResponse' || ques.type==='text'  || ques.type==='number'){
                return (
                    <>
                        <p className="whole_label mt-4">{ques.title} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                        <input
                            type="text"
                            className="description_inputMedi ps-0"
                            disabled
                            value={ques.answer}
                        />
                    </>
                )
            }
            if(ques.type==='richText'){
                return (
                    <>
                        <p className="whole_label mt-3">{ques.title} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                        <RichEditor
                            readOnly
                            toolbar={false}
                            value={ques.answer.title}
                        />
                    </>
                )
            }
            if(ques.type==='yesNo'){
                return (
                    <div className='mt-3'>
                    <p className="whole_label">{ques.title} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>

                    <div className="row">
                            <div className="col-md-6 mt-1 justify-content-center">
                                    <div className="d-flex">
                                        <p className="affir_checkbox">
                                            <input
                                                disabled
                                                value={"yes"} name="yesNo"
                                                type="radio"
                                                checked={ques.answer==='yes'}
                                            />
                                        </p>
                                        <p className="py-0">
                                            Yes
                                        </p>
                                    </div>
                            </div>
                            <div className="col-md-6 mt-1 justify-content-center">
                                    <div className="d-flex">
                                        <p className="affir_checkbox">
                                            <input
                                                disabled
                                                value={"no"} name="yesNo"
                                                type="radio"
                                                checked={ques.answer==='no'}
                                            />
                                        </p>
                                        <p className="py-0">
                                            No
                                        </p>
                                    </div>
                            </div>
                    </div>
                    </div>
                )
            }
            if(ques.type==='multiChoice'){
                return (
                <div className="row mt-3">
                    <div className="col-md-12">
                        <p className="whole_label">{ques.title} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                    </div>
                    <div className="col-md-12">
                        <p className="text-secondary">{ques.helpText} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                    </div>
                    <div className="col-md-12">
                        {ques?.options?.map((ele, i) => (
                            <div className="d-flex" key={i}>
                                <div className="affir_checkbox">
                                    <input
                                        value={ele}
                                        disabled
                                        checked={ques.answer[ele]}
                                        type="checkbox"
                                    />
                                </div>
                                <div className="actlist_wid2">
                                    <p className="py-0">
                                        {ele}
                                    </p>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
                )
            }
            if(ques.type==='multipleChoiceButton'){
                return (
                <div className="row mt-3">
                    <div className="col-md-12">
                        <p className="whole_label">{ques.title} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                    </div>
                    <div className="col-md-12">
                        <p className="text-secondary">{ques.helpText}</p>
                    </div>
                    <div className="col-md-12">
                        {ques?.options?.map((ele, i) => (
                            <div className="d-flex" key={i}>
                                <div className="affir_checkbox">
                                    <input
                                        disabled
                                        type="radio" checked={ques.answer[ele]} id="btnradio1"
                                    />
                                </div>
                                <div className="actlist_wid2">
                                    <p className="py-0">
                                        {ele}
                                    </p>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
                )
            }
            if(ques.type==='multipleChoiceGrid'){
                return (
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <p className="whole_label">{ques.title} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                        </div>
                        <div className="col-md-12">
                            <p className="text-secondary">{ques.helpText}</p>
                        </div>
                        <div className="col-md-12">
                            {ques?.options?.map((ele, i) => (
                                <div key={i}>
                                        <div className="mb-3 justify-content-center">
                                            <div className="btn-group align-items-center">
                                                <div className="actlist_wid2 me-4">
                                                    <p className="py-0 mb-0">
                                                        {ele}
                                                    </p>
                                                </div>
                                                <p className="affir_checkbox mb-0">
                                                    <input
                                                        value="1" type="radio" disabled checked={ques.answer[ele]==1} id="btnradio1"
                                                    />
                                                </p>
                                                <p className="affir_checkbox mb-0">
                                                    <input
                                                        value="2" type="radio" disabled checked={ques.answer[ele]==2} id="btnradio1"
                                                    />
                                                </p>
                                                <p className="affir_checkbox mb-0">
                                                    <input
                                                        value="3" type="radio" disabled checked={ques.answer[ele]==3} id="btnradio1"
                                                    />
                                                </p>
                                                <p className="affir_checkbox mb-0">
                                                    <input
                                                        value="4" type="radio" disabled checked={ques.answer[ele]==4} id="btnradio1"
                                                    />
                                                </p>
                                                <p className="affir_checkbox mb-0">
                                                    <input
                                                        value="5" type="radio" disabled checked={ques.answer[ele]==5} id="btnradio1"
                                                    />
                                                </p>
                                                
                                            </div>
                                        </div>
                                </div>

                            ))}
                        </div>
                    </div>
                )
            }
            if(ques.type==='time'){
                return (
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <p className="whole_label">{ques.title} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                            <TimePicker
                                value={ques.answer}
                                onDone={() => {}}
                                >
                                <span>
                                    <input
                                        disabled
                                        className="description_inputMedi px-0"
                                        value={ques.answer}
                                    />
                                    <img src="images/clock.png" className="clock_icon mt-2" alt="" />
                                </span>
                            </TimePicker>
                        </div>
                    </div>
                )
            }
            if(ques.type==='calender'){
                return (
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <p className="whole_label">{ques.title} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                            <DateInput
                                disabled
                                imageStyle={{ width: "22px", height: "22px", position: "absolute", borderRadius: "0px", marginBlock: "17px", left: 0 }}
                                inputClassName={"description_inputMedi d-flex align-items-center ps-2"}
                                value={new Date(ques.answer)}
                                />
                        </div>
                    </div>
                )
            }
            if(ques.type==='scale'){
                return (
                    <div className="mb-2">
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <p className="whole_label">{ques.title} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                            </div>
                            <div className="container ">
                                <div className="row">
                                        <div className="col-md-1 mt-1 justify-content-center">
                                            <div className="btn-group mt-1 align-items-center">
                                                <p className="affir_checkbox">
                                                    <input
                                                        type="radio" disabled checked={ques.answer==1} value={"1"}  id="btnradio1" 
                                                    />
                                                </p>
                                                <div className="actlist_wid2">
                                                    <p className="py-0">
                                                        1
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-1 mt-1 justify-content-center">
                                            <div className="btn-group mt-1 align-items-center">
                                                <p className="affir_checkbox">
                                                    <input
                                                        type="radio" disabled checked={ques.answer==2} value={"2"}  id="btnradio1" 
                                                    />
                                                </p>
                                                <div className="actlist_wid2">
                                                    <p className="py-0">
                                                        2
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-1 mt-1 justify-content-center">
                                            <div className="btn-group mt-1 align-items-center">
                                                <p className="affir_checkbox">
                                                    <input
                                                        type="radio" disabled checked={ques.answer==3} value={"3"}  id="btnradio1" 
                                                    />
                                                </p>
                                                <div className="actlist_wid2">
                                                    <p className="py-0">
                                                        3
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-1 mt-1 justify-content-center">
                                            <div className="btn-group mt-1 align-items-center">
                                                <p className="affir_checkbox">
                                                    <input
                                                        type="radio" disabled checked={ques.answer==4} value={"4"}  id="btnradio1" 
                                                    />
                                                </p>
                                                <div className="actlist_wid2">
                                                    <p className="py-0">
                                                        4
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-1 mt-1 justify-content-center">
                                            <div className="btn-group mt-1 align-items-center">
                                                <p className="affir_checkbox">
                                                    <input
                                                        type="radio" disabled checked={ques.answer==5} value={"5"}  id="btnradio1" 
                                                    />
                                                </p>
                                                <div className="actlist_wid2">
                                                    <p className="py-0">
                                                        5
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-1 mt-1 justify-content-center">
                                            <div className="btn-group mt-1 align-items-center">
                                                <p className="affir_checkbox">
                                                    <input
                                                        type="radio" disabled checked={ques.answer==6} value={"6"}  id="btnradio1" 
                                                    />
                                                </p>
                                                <div className="actlist_wid2">
                                                    <p className="py-0">
                                                        6
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-1 mt-1 justify-content-center">
                                            <div className="btn-group mt-1 align-items-center">
                                                <p className="affir_checkbox">
                                                    <input
                                                        type="radio" disabled checked={ques.answer==7} value={"7"}  id="btnradio1" 
                                                    />
                                                </p>
                                                <div className="actlist_wid2">
                                                    <p className="py-0">
                                                        7
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-1 mt-1 justify-content-center">
                                            <div className="btn-group mt-1 align-items-center">
                                                <p className="affir_checkbox">
                                                    <input
                                                        type="radio" disabled checked={ques.answer==8} value={"8"}  id="btnradio1" 
                                                    />
                                                </p>
                                                <div className="actlist_wid2">
                                                    <p className="py-0">
                                                        8
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-1 mt-1 justify-content-center">
                                            <div className="btn-group mt-1 align-items-center">
                                                <p className="affir_checkbox">
                                                    <input
                                                        type="radio" disabled checked={ques.answer==9} value={"9"}  id="btnradio1" 
                                                    />
                                                </p>
                                                <div className="actlist_wid2">
                                                    <p className="py-0">
                                                        9
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-1 mt-1 justify-content-center">
                                            <div className="btn-group mt-1 align-items-center">
                                                <p className="affir_checkbox">
                                                    <input value={"10"}  id="btnradio2"
                                                        type="radio" disabled checked={ques.answer==10}
                                                    />
                                                </p>
                                                <div className="actlist_wid2">
                                                    <p className="py-0">
                                                        10
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            if(ques.type==='info'){
                return (
                    <div className="row mt-3">
                        <div className="col-md-12">
                            {/* <p className="whole_label">{element.title || ""} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p> */}
                            <p className="whole_label">Patient Information <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                        </div>
                        <div className="col-md-12">
                            <p className="text-secondary">{ques.helpText}</p>

                        </div>
                        <div className="container ">
                            <div className="row">
                                {ques.options?.map((dt, i) => {
                                    console.log(dt, "dt")
                                    return (
                                        <div className="col-sm-6 mt-1 justify-content-center">
                                            <div
                                                key={i}
                                                className={`mb-1`}>
                                                        <p className="py-0">
                                                            {dt}<span style={{ color: "red", fontWeight: "bold" }}> *</span>
                                                        </p>
                                                        {(dt!=='Gender' && dt!=='Relationship Status' && dt!=='Date of Birth' && dt!=='Address') && <input
                                                            type="text"
                                                            disabled
                                                            className="description_inputForm ps-0"
                                                            name={dt}
                                                            value={ques.answer[dt]}
                                                        />}
                                                        {dt=='Address' && <input
                                                            type="text"
                                                            disabled
                                                            className="description_inputForm ps-0"
                                                            name={dt}
                                                            value={ques.answer[dt]}
                                                        />}
                                                        {dt=='Gender' && <select
                                                            name={dt}
                                                            className="description_inputForm ps-0"
                                                            value={ques.answer[dt]}
                                                            disabled
                                                            >
                                                                <option selected disabled>Select Gender</option>
                                                                <option value="male">Male</option>
                                                                <option value="female">Female</option>
                                                                <option value="transgender">Transgender</option>
                                                                <option value="other">Other</option>
                                                            </select>}
                                                        {dt=='Relationship Status' && <select
                                                            disabled
                                                            name={dt}
                                                            className="description_inputForm ps-0"
                                                            value={ques.answer[dt]}
                                                            >
                                                                <option selected disabled>Select Status</option>
                                                                <option value="single">Single</option>
                                                                <option value="married">Married</option>
                                                            </select>}
                                                        {dt=='Date of Birth' && <DateInput
                                                            disabled
                                                            imageStyle={{ width: "22px", height: "22px", position: "absolute", borderRadius: "0px", marginBlock: "17px", left: 0 }}
                                                            inputClassName={"description_inputForm d-flex align-items-center ps-2"}
                                                            value={new Date(ques.answer[dt])}
                                                        />}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )
            }
            if (ques.type === 'waiverProvider') {
                return (
                    <div className="card px-3 mb-2">
                        <p className="whole_label my-2 py-0">Provider's Waiver</p>
                        <p className="whole_label mt-2">Signature <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                        <p style={{ fontStyle: 'italic' }}>{ques.title}</p>
                        <p className="whole_label mt-2">Acknowledgement <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                        <p>I agreed to the terms and conditions</p>
                    </div>
                )
            }
            if (ques.type === 'waiverClient') {
                return (
                    <div className="card px-3 mb-2">
                        <p className="whole_label my-2 py-0">Client's Waiver</p>
                        <p className="whole_label mt-2">Signature <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                        <p style={{ fontStyle: 'italic' }}>{ques.answer.name}</p>
                        <p className="whole_label mt-2">Acknowledgement <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                        <p>I agreed to the terms and conditions</p>
                    </div>
                )
            }
          })}
      </Modal.Body>
      <Modal.Footer>
        {/* <button className='description_btnsave bg-secondary' onClick={props.onHide}>Close</button> */}
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default FormsModal