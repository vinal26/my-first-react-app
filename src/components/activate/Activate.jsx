import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { activateAccount } from '../../services/api';
import { showToastError } from '../../Utils/Helper';

function Activate() {
    const navigate = useNavigate();
    const [isLoading, setLoader] = useState(true);
    const [url, setUrl] = useState("");
    const { id, token } = useParams();
    const activate = async () => {
        setLoader(true)
        try {
            const response = await activateAccount(id, token, {});
            if (response.status === 200) {
                console.log(response.data);
                setUrl(response.data.url);
                // window.location.href = response.data.url;
                setLoader(false)
                // showToastSuccess(`Account activated successfully`)
            } else {
                setLoader(false)
                showToastError(response?.data || response.message || "Some error occurred")
            }
        } catch (error) {
            setLoader(false)
            console.log(error);
        }
    }
    useEffect(() => {
        activate()
    }, [])
    
    return (
        <div className="d-flex align-items-center flex-column" style={{height: "100vh"}}>
            <img src="/images/logo2.png" alt="" className="logo_login p-2 mb-4" />
            <h2 className='text-center'>Your account has been activated.</h2>

            <button className="mt-4 btn btn-primary btn-custom d-flex justify-content-center align-items-center" onClick={() => window.location.replace(url || 'https://wellnesswits.page.link/patient')} disabled={isLoading}>
                {isLoading ?
                <div className=" text-center text-capitalize mt-1">
                    <div style={{ width: '2rem', height: '2rem' }} className="spinner-border" role="status" />
                </div> : "Open App"}
            </button>
        </div>
    )
}

export default Activate