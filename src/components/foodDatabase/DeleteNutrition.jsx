import React from "react";


const DeleteNutrition = () => {
    return (
        <>
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog blog_modal_dialog ">
                    <div class="modal-content blog_modal_content">
                        <div class="modal-header border-0 text-center">
                            <h5 class="modal-title w-100" id="staticBackdropLabel">Delete</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p className="modal_text_body">Are you sure, you want to delete<br /> this Food Database?</p>
                        </div>
                        <div >
                            <center>
                                <button type="button" class="cancel_delete_blog" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="delete_blog">Delete</button>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </>
      );
    };

export default DeleteNutrition;



 


