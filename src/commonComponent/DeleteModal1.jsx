import React from 'react';


const DeleteModal1 = ({ modalId, title, button1, button2, onDelete, onCancel, content1, content2 }) => {
    return (
        <div
            class="modal fade"
            id={modalId}
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            className="modal fade"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog blog_modal_center">
                <div class="modal-content blog_modal_content">
                    <div class="modal-header border-0 text-center">
                        <h5 class="modal_delete_text_component w-100" id="staticBackdropLabel">
                            {/* {title} */}
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p className="modal_text_body_component">
                            {content1} {content2}
                        </p>
                    </div>
                    <div>
                        <div className='row' >
                            <div className='col-md-6' >
                                <button
                                    data-bs-dismiss="modal"
                                    onClick={onDelete}
                                    type="button"
                                    class="delete_blog1">
                                    {button1}
                                </button>
                            </div>
                            <div className='col-md-6' >
                                {/* <center> */}
                                <button
                                    type="button"
                                    class="cancel_delete_blog1"
                                    data-bs-dismiss="modal">
                                    {button2}
                                </button>
                            </div>
                        </div>
                        {/* </center> */}
                    </div>
                </div >
            </div >
        </div >
    );
};

export default DeleteModal1;