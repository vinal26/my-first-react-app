import React from "react";

const DeleteRecipe = ({recipeId}) => {

    // const delete_recipe = async () => {
    //     try {
    //         const response = await deleteRecipe(recipeId);
    //         if (response.status === 200) {
    //             alert(response?.data?.message);
    //         } else {
    //             alert(response?.data || response.message);
    //         }
    //     } catch (error) {
    //         error?.data?.data && alert(error?.data?.data || error.data?.message);
    //     }
    // }

    return (
        <>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog blog_modal_dialog ">
                    <div className="modal-content blog_modal_content">
                        <div className="modal-header border-0 text-center">
                            <h5 className="modal-title w-100" id="staticBackdropLabel">Delete</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p className="modal_text_body">Are you sure, you want to delete<br /> this Recipe?</p>
                        </div>
                        <div >
                            <center>
                                <button type="button" className="cancel_delete_blog" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" className="delete_blog">Delete</button>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </>
      );
    };

export default DeleteRecipe;



 


