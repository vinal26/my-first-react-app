import React from "react";

const ToastBox = ({ toastShow, content }) => {
  return (
    <>
      <div class="position-fixed bottom-0 end-0 p-3" style={{ zIndex: "9999" }}>
        <div
          id="liveToast"
          class={`toast ${toastShow ? "show" : "hide"}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div class="toast-header">
            <strong class="me-auto text-success">{content} </strong>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToastBox;
