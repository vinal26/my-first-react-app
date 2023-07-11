import React, { useState } from 'react'
import { useEffect } from 'react';
import { AiOutlineCheck } from 'react-icons/ai'
import { BsExclamationCircle, BsQuestionCircle } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import { useAuth } from '../../Context/AuthContext';


function Reactions({ data, formClick, index }) {
    const auth = useAuth();
    const [valid, setValid] = useState([]);
    const [invalid, setInvalid] = useState([]);
    const [notsure, setNotSure] = useState([]);
    const [toxic, setToxic] = useState([]);

    useEffect(() => {
        console.log(data, auth?.authUser?._id, "data")
        if (data.length) {
            let valid = data.filter((item) => item.reaction == "valid")
            let invalid = data.filter((item) => item.reaction == "invalid")
            let notsure = data.filter((item) => item.reaction == "notsure")
            let toxic = data.filter((item) => item.reaction == "toxic")
            setValid(valid)
            setInvalid(invalid)
            setNotSure(notsure)
            setToxic(toxic)
        }
        else {
            setValid(null)
            setInvalid(null)
            setNotSure(null)
            setToxic(null)
        }
    }, [data])
    return (
        <div>
            <div className="reactions bg-gray d-flex align-items-center">
                <p className="mb-0 fw-bold">{data?.length}</p>
                {/* Reactions */}
                <div className={`forum_valid ${valid?.findIndex((item) => item.userId == auth?.authUser?._id) > -1 ? 'p-3' : ''}`} onClick={() => {
                    { valid?.findIndex((item) => item.userId == auth?.authUser?._id) > -1 ? formClick("") : formClick("valid") }
                }} ><AiOutlineCheck />{valid?.length || 0}</div>
                <div className={`forum_invalid ${invalid?.findIndex((item) => item.userId == auth?.authUser?._id) > -1 ? 'p-3' : ''}`} onClick={() => { { invalid?.findIndex((item) => item.userId == auth?.authUser?._id) > -1 ? formClick("") : formClick("invalid") } }}><IoMdClose /> {invalid?.length || 0}</div>
                <div className={`forum_not_sure ${notsure?.findIndex((item) => item.userId == auth?.authUser?._id) > -1 ? 'p-3' : ''}`} onClick={() => { { notsure?.findIndex((item) => item.userId == auth?.authUser?._id) > -1 ? formClick("") : formClick("notsure") } }}><BsQuestionCircle /> {notsure?.length || 0}</div>
                <div className={`forum_toxic ${toxic?.findIndex((item) => item.userId == auth?.authUser?._id) > -1 ? 'p-3' : ''}`} onClick={() => { { toxic?.findIndex((item) => item.userId == auth?.authUser?._id) > -1 ? formClick("") : formClick("toxic") } }}><BsExclamationCircle />{toxic?.length || 0}</div>
            </div>
        </div>
    )
}

export default React.memo(Reactions)