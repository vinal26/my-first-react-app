import React, { useEffect, useState } from 'react';
import { RWebShare } from "react-web-share";
import { showToastSuccess } from '../../Utils/Helper';


const ShareLinkModal = (props) => {
    const [isLoading, setLoader] = useState(true);
    // console.log(link, "link")
    let handleSubmit = async (event) => {
        event.preventDefault();
    }
    return (
        <div class="modal fade" id="shareModal" aria-labelledby="memberModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header p-4 border-0">
                        {/* <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> */}
                        <h5 className="mb-0">Share this link</h5>
                        <button type="button" class="btn-close border-0" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body pb-4 px-4">

                        <form onSubmit={handleSubmit}>


                            <div className="col-md-12 d-flex justify-content-center">

                                <input className="form-control description_inputf mb-2" type="text" name="link" placeholder="https://www.google.com/fwe4234dwq" value={props.link} />
                            </div>
                            <div className="col-md-12 d-flex justify-content-center mb-4">
                                <p style={{ color: "#d1d1d1" }}>Anyone with this link can become a care team member on this platform</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <button type="button" className="btn btn-outline-secondary px-4 border-0" data-bs-dismiss="modal">Cancel</button>
                                <button className="btn btn-primary border-0" type="copy" style={{ backgroundColor: "#d81010" }} onClick={() => { navigator.clipboard.writeText(props.link); showToastSuccess("Link copied to clipboard") }}>Copy Link</button>
                                <RWebShare
                                    data={{
                                        text: "Share forms to get details",
                                        url: props.link,
                                        title: "WellnessWits Forms",
                                    }}
                                // onClick={() => console.log("shared successfully!")}
                                >

                                    <button className="btn btn-primary btn-custom" type="submit" data-bs-dismiss="modal">Share Link</button>
                                </RWebShare>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
};

export default ShareLinkModal;