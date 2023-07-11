import React, { Fragment, useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { RiDeleteBinFill } from 'react-icons/ri';

function useAC() {
  const [FieldValues, setFieldValues] = useState({affirmation: [], question: []})
  let handleChange = (i, e, checkList) => {
        let newFieldValues = {...FieldValues};
        checkList ?
        newFieldValues['question'][i] = {'ques': e.target.value, 'createdBy': 'Doctor'}
        :
        newFieldValues['affirmation'][i] = {'ques': e.target.value, 'createdBy': 'Doctor'}
        
        setFieldValues(newFieldValues);
    }

    let addFormFields = (checkList) => {
        checkList ?
        setFieldValues((prev) => {return {...prev, question: [...prev.question, {'ques': '', 'createdBy': 'Doctor'}] }})
        : 
        setFieldValues((prev) => { return {...prev, affirmation: [...prev.affirmation, {'ques': '', 'createdBy': 'Doctor'}] }})
    }

    let removeFormFields = (i, checkList) => {
        let newFieldValues = checkList ? [...FieldValues.question] : [...FieldValues.affirmation];
        newFieldValues.splice(i, 1);
        checkList ?
        setFieldValues((prev) => {return {...prev, question: newFieldValues }})
        :
        setFieldValues((prev) => {return {...prev, affirmation: newFieldValues }})
    }

    // useEffect(() => {
    //   console.log(FieldValues);

    // }, [FieldValues])

  return {
    SetState: setFieldValues,
    State: FieldValues,
    Render: (
    <div className='row'>
        <div className="col-sm-6">
            <div className="row mt-2">
                {FieldValues.affirmation.map((element, index) => (
                <Fragment key={index}>
                    <div className="col-md-10 pe-0">
                    <input
                    name={"affirmation"+"_"+index}
                    type="text"
                    style={{borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                    className="description_inputf mb-3"
                    placeholder="e.g. I can become financialy free"
                    value={element.ques || ""} onChange={e => handleChange(index, e)}
                    />
                    </div>
                    <div className="col-md-2 ps-0">
                        <div style={{height: "55px", backgroundColor: "rgb(255, 255, 255)", color: "black", border: "1px solid rgb(187, 185, 185)", borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} className="pointer description_btnsave mx-0 d-flex justify-content-center align-items-center text-danger px-0" onClick={() => removeFormFields(index)}><RiDeleteBinFill size="1.4em"/></div>
                    </div>
                </Fragment>
                ))}
            </div>
            <div className="w-100">
                <div style={{marginBottom: "35px", width: "max-content"}} className="pointer description_btnsave mx-0 d-flex justify-content-center align-items-center" onClick={() => addFormFields()}><AiOutlinePlus className="me-2" /> Add New Affirmation</div>
            </div>
        </div>
        <div className="col-sm-6">
        <div className="row mt-2">
                {FieldValues.question.map((element, index) => (
                <Fragment key={index}>
                    <div className="col-md-10 pe-0">
                    <input
                    name="question"
                    type="text"
                    style={{borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                    className="description_inputf mb-3"
                    placeholder="e.g. I can become financialy free"
                    value={element.ques || ""} onChange={e => handleChange(index, e, true)}
                    />
                    </div>
                    <div className="col-md-2 ps-0">
                        <div style={{height: "55px", backgroundColor: "rgb(255, 255, 255)", color: "black", border: "1px solid rgb(187, 185, 185)", borderTopLeftRadius: 0, borderBottomLeftRadius: 0  }} className="pointer description_btnsave mx-0 d-flex justify-content-center align-items-center text-danger px-0" onClick={() => removeFormFields(index, true)}><RiDeleteBinFill size="1.4em"/></div>
                    </div>
                </Fragment>
                ))}
            </div>
            <div className="w-100">
                <div style={{marginBottom: "35px", width: "max-content"}} className="pointer description_btnsave mx-0 d-flex justify-content-center align-items-center" onClick={() => addFormFields(true)}><AiOutlinePlus className="me-2" /> Add New Checklist</div>
            </div>
        </div>
    </div>
  )}
}

export {useAC}