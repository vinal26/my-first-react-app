import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const PolicyUsages = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="header_policy">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-2">
                            <div>
                                <BsArrowLeft className="arrow_poly" onClick={() => {
                                    navigate(-1)
                                }} />
                            </div>
                        </div>
                        <div className="col-md-4 col-9">
                            <h1 className="header_text">Terms and Usages</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="body_policy policy_usage">
                <div className="container">
                    <h2 style={{fontSize: 30, marginBottom: 20}}>Terms of Use</h2>
                    <h3>For Educational and Informational Purposes Only</h3>

                    <p>The content of this website are for educational and informational purposes only. WellnessWits is a Functional health consulting practice.  Our physicians do not provide medical diagnosis nor prescribe treatment unless you establish a doctor patient relationship with us via an in person office visit. Our team of providers and nutritionists provide education to enhance knowledge of health as it relates to foods, dietary supplements, and behaviors associated with eating. While nutritional and botanical support can be an important compliment to medical care, nutrition coaching is not a substitute for the diagnosis, treatment, or care of disease by a primary care provider.</p>



                    <p>If the Client is under the care of a health care professional or currently uses prescription medications, the Client should discuss any dietary changes or potential dietary supplements use with his or her doctor and should not discontinue any prescription medications without first consulting his or her doctor.</p>



                    <p>The Client acknowledges that the care that they receive during their health coaching sessions is separate from the care that they receive from any medical facility and that the nutrition coaching sessions are in no way intended to be construed as medical advice or care. The Client should continue regular medical supervision and care by their primary care physician.</p>



                    <h3>Personal Responsibility and Release of Health Care Related Claims</h3>
                    <p>The Client acknowledges that the Client takes full responsibility for the Client’s life and well-­‐being, as well as the lives and well-­‐being of the Client’s family and children (where applicable), and all decisions made during and after the duration of the client’s wellness sessions.</p>


                    <p>The Client expressly assumes the risks of nutrition coaching sessions, including the risks of trying new foods, and the risks inherent in making lifestyle changes.</p>



                    <p>The Client releases WellnessWits LLC and its team of providers from any and all liability, damages, causes of action, allegations, suits, sums of money, claims and demands whatsoever, in law or equity, which the Client ever had, now has or will have in the future against the provider or WellnessWits LLC, arising from the Client’s past or future participation in, or otherwise with respect to, the coaching sessions.</p>





                    <h3>Arbitration, Choice of Law and Limited Remedies</h3>
                    <p>In the event that there ever arises a dispute between WellnessWits LLC and the Client with respect to the services provided pursuant to this agreement or otherwise pertaining to the relationship between the parties, the parties agree to submit to binding arbitration before the American Arbitration Association (Commercial Arbitration and Mediation Center for the Americas Mediation and Arbitration Rules).</p>



                    <p>Any judgment on the award rendered by the arbitrator(s) may be entered in any court having jurisdiction thereof. Such arbitration shall be conducted by a single arbitrator. The sole remedy that can be awarded to the Client in the event that an award is granted in arbitration is refund of the Session Fee.</p>



                    <p>Without limiting the generality of the foregoing, no award of consequential or other damages, unless specifically set forth herein, may be granted to the Client.</p>



                    <p>This agreement shall be construed according to the laws of the State of Texas. In the event that any provision of this Agreement is deemed unenforceable, the remaining portions of the Agreement shall be severed and remain in full force.</p>



                    <h3>Confidentiality</h3>
                    <p>We will keep the Client's information private and will not share any Client’s information to any third party unless compelled to by law or with the consent of the Client.</p>


                    <h3>Payments and Refunds</h3>
                    <p>Payments are due at the time of service and there are no refunds for payments made to WellnessWits LLC.</p>


                    <h3>No‐Show/Cancellation Policy</h3>
                    <p>In the event that the client does not show up to an appointment or cancels within 24 hours of a scheduled appointment the Coach and/or WellnessWits LLC, reserves the right to charge the client 50% of the session payment fee. Exceptions may be made in the event of an emergency.</p>

                    {/* <h1 style={{ marginBottom: "10px", marginTop: "40px", fontSize: 30 }} >Zoom Usages</h1>

                    <div style={{marginBottom: 30}}>
                        <div style={{fontSize: 17, fontWeight: "500", marginBottom: 10}}>Wellnesswits LLC welcomes your questions or comments regarding the Privacy Policy:</div>
                        
                        <div style={{fontSize: 17}}>WellnessWits</div>
                        <div style={{fontSize: 17}}>8118 Fry Road #1303</div>
                        <div style={{fontSize: 17, marginBottom: 10}}>Cypress TX, USA</div>
                        
                        <div style={{fontSize: 17, marginBottom: 10}}>Email Address: info@wellnesswits.com</div>
                        
                        <div style={{fontSize: 17, marginBottom: 10}}>Effective as of 9/9/2020</div>
                    </div> */}


                    <h1 style={{ marginBottom: "10px", marginTop: "40px", fontSize: 30 }} >Contact Us</h1>

                    <div style={{marginBottom: 30}}>
                        <div style={{fontSize: 17, fontWeight: "500", marginBottom: 10}}>Wellnesswits LLC welcomes your questions or comments regarding the Privacy Policy:</div>
                        
                        <div style={{fontSize: 15}}>WellnessWits</div>
                        <div style={{fontSize: 15}}>8118 Fry Road #1303</div>
                        <div style={{fontSize: 15, marginBottom: 10}}>Cypress TX, USA</div>
                        
                        <div style={{fontSize: 15, marginBottom: 10}}>Email Address: <a href="mailto:info@wellnesswits.com">info@wellnesswits.com</a></div>
                        
                        <div style={{fontSize: 15, marginBottom: 10}}>Effective as of 9/9/2020</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PolicyUsages;
