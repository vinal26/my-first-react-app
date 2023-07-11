import React from 'react';


const DeleteModal = ({ modalId, title, button1, button2, onDelete, onCancel, content1, content2 }) => {
  return (
    <div
      id={modalId}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      className="modal fade"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content blog_modal_content com_deletemodal88">
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
              {content1}<br /> {content2}
            </p>
          </div>
          <div className='py-3 px-3'>
            <hr />
            {/* <div className='d-flex justify-content-between' >
                <button
                  data-bs-dismiss="modal"
                  onClick={onDelete}
                  type="button"
                  class="delete_blog">
                  {button1}
                </button>
                <button
                  type="button"
                  class="cancel_delete_blog"
                  data-bs-dismiss="modal">
                  {button2}
                </button>
            </div> */}
            <div className="d-flex float-end">
              <div style={{ cursor: 'pointer', backgroundColor: '#1f7e78', color: 'white', border: '1px solid #bbb9b9', height: "48px", width: "90px", float: "right" }} className="description_btnsave d-flex justify-content-center align-items-center" data-bs-dismiss="modal" onClick={onDelete}>{button1}</div>
              <div style={{ cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9', height: "48px", width: "90px" }} className="description_btnsave d-flex justify-content-center align-items-center" data-bs-dismiss="modal">{button2}</div>
            </div>
          </div>
        </div >
      </div >
    </div >
  );
};

export default DeleteModal;