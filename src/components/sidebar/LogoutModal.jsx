import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const LogoutModal = () => {
  let navigate = useNavigate();
  const auth = useAuth();
    const logout = () => {
      auth.setLogout();
      navigate("/login", { replace: true });
    };

    return (
        <>
        <div className="modal fade" id="logoutModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header border-0 text-center">
                        {/* <h5 className="modal-title w-100" id="staticBackdropLabel">Signing out</h5> */}
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p className="modal_text_body">Are you sure, you want to Logout ?</p>
                    </div>
                    <div >
                        <center>
                            <button type="button" className="cancel_delete_blog" onClick={logout}>Yes</button>
                            <button type="button" className="delete_blog" data-bs-dismiss="modal">No</button>
                        </center>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default LogoutModal;