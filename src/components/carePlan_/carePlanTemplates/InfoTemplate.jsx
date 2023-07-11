import React, { useState } from 'react'
import { formList1, formList2 } from '../../../Utils/AllConstant'

function InfoTemplate({ handleFormValuesUpdate, element, index }) {
    // console.log(element, "ele")
    return (
        <div>
            <div className="card px-4 mb-2">
                <div className="row mt-3">
                    <div className="col-md-12">
                        <p className="whole_label fw-bold">Patient Information <span style={{ color: "red" }}>*</span></p>
                        {/* <input
                            type="text"
                            className="description_inputMedi"
                            name="title"
                            placeholder="********"
                            value={element.title || ""}
                            onChange={e => handleFormValuesUpdate(index, e, 'input')}
                        /> */}
                    </div>
                    <div className="col-md-12">
                        <p className="whole_label">Help text</p>
                        <input
                            type="text"
                            className="description_inputMedi"
                            name="helpText"
                            maxLength={40}
                            placeholder="Fill this form with your patient information"
                            value={element.helpText || ""}
                            onChange={e => handleFormValuesUpdate(index, e, 'input')}
                        />
                    </div>
                    <div className="container ">
                        <div className="row">
                            {formList1?.map((dt, i) => {
                                // console.log(dt, "dt")
                                return (
                                    <div className="col-md-6 mt-1 justify-content-center">
                                        <div
                                            key={i}
                                            className={`mb-1`}>
                                            <div className="btn-group mt-1 align-items-center">
                                                <p className="affir_checkbox">
                                                    <input
                                                        type="checkbox"
                                                        name={`info_${dt}`}
                                                        value={dt}
                                                        checked={element.options ? element.options?.includes(dt) : null}
                                                        id={`info_${dt}`}
                                                        onChange={(e) => {
                                                            handleFormValuesUpdate(index, e, 'checkbox_options')
                                                        }}
                                                    />
                                                </p>
                                                <div className="col-md-12 actlist_wid2">
                                                    <p className="py-0">
                                                        {dt}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {/* <div className="col-md-12 mb-2 mt-4">
                        <button className="description_btnsave justify-content-end flex-end">Done</button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default InfoTemplate