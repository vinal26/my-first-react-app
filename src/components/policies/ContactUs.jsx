import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const ContactUs = () => {
    const navigate = useNavigate();
    return (
        <>
        <div class="templete_polygon">
                <div className="header_policy" style={{
                    boxShadow: "none",
                    position: "relative"
                }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-2">
                                <div>
                                    <BsArrowLeft className="arrow_poly" onClick={() => {
                                        navigate(-1)
                                    }} />
                                </div>
                            </div>
                            {/* <div className="col-md-4 col-9">
                                <h1 className="header_text">Contact Us</h1>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div class="templete_card" style={{paddingBottom: 75}}>
            <div className="body_policy policy_usage" style={{marginTop: 30, paddingTop: 0}}>
                <div className="container">
                    <h1 style={{ marginBottom: "10px", fontSize: 30 }} >Contact Us</h1>
                    <div style={{ marginBottom: 30 }}>
                        <div style={{ fontSize: 17, fontWeight: "500", marginBottom: 10 }}>Wellnesswits LLC welcomes your questions or comments:</div>

                        <div style={{ fontSize: 15 }}>WellnessWits</div>
                        <div style={{ fontSize: 15 }}>8118 Fry Road #1303</div>
                        <div style={{ fontSize: 15, marginBottom: 10 }}>Cypress TX, USA</div>

                        <div style={{ fontSize: 15, marginBottom: 10 }}><span style={{ fontWeight: "500" }}>Email Address:</span> <a href="mailto:info@wellnesswits.com">info@wellnesswits.com</a></div>

                        {/* <div style={{ fontSize: 15, marginBottom: 10 }}>Effective as of 9/9/2020</div> */}
                    </div>
                </div>
            </div> 
                <img
                    src="/images/logo2.png"
                    class="templte_img"
                    alt="Wellness Team"
                 
                />
            </div>


        </>
    );
};

export default ContactUs;