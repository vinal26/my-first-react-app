import react, { useEffect, useState } from 'react';

const Modal = ({heading,  modalId, processing, modalClose, modalDilog, ...props }) => {

  return (
    <div
      class="modal fade"
      id={modalId}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby={modalId}
      aria-hidden="true"
    >
    <div class={`modal-dialog ${modalDilog}`}>
        <div class="modal-content blog_modal_content">
          <div class="modal-header border-0 text-center">
            <h5 class="modal-title w-100" id={modalId}>
              {heading}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => modalClose()}
              disabled={processing}
            ></button>
          </div>
          <div class="modal-body">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )

}
export default Modal;