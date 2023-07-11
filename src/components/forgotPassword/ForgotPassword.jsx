import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth_image from '../../images/auth_image.png';
import { forgotPasswordService } from "../../services/api";
import { toastMsg } from "../../Utils/AllConstant";
import { showToastError, showToastSuccess, validateEmail } from "../../Utils/Helper";
import "./style.css";


const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      if (!email) {
        setError(true)
      } else {
        setError(true)
        if (validateEmail(email)) {
          setError(false)
          const response = await forgotPasswordService({ email });
          if (response) {
            showToastSuccess(response?.data)
            setEmail('');
          } else {
            showToastError(toastMsg.accountDoesNotExist)
          }
        }
      }

    } catch (error) {
      showToastError(error?.data?.data || toastMsg.errorMssg)
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 d-none d-md-block">
            <img src={auth_image} className="login_image" style={{ marginLeft: "-150px" }} alt="" />
          </div>
          <div className="col-md-6 text-center">
            {/* <img src="images/login_arr.png" alt="" className="login_arr" /> */}
            <img src="images/logo2.png" alt="" className="logo_login" />
            <p className="continue_login mb-4 fs-5 text-green">Password recovery link will be send to this email</p>
            <form >
              {/* onSubmit={getLogin}> */}
              <div className="col-md-12">
                <input
                  required
                  type="email"
                  className="login_input rounded-pill"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                />
                {(error && !email) && <label className="text-danger" style={{
                  width: "80%",
                  margin: "0 auto 0",
                  textAlign: "left",
                  position: "relative",
                  top: "-15px"
                }}>Please enter valid email</label>}
                {(error && !validateEmail(email) && email) && <label className="text-danger m-1"
                  style={{
                    width: "80%",
                    margin: "0 auto 0",
                    textAlign: "left",
                    position: "relative",
                    top: "-15px"
                  }}>Email format is not valid</label>}
              </div>
              {/* <Link to="" className="link_text"> */}
              <button type="button" className="login_btnlogin mt-3 rounded-pill" onClick={handleSubmit}>Send Recovery Link</button>
              {/* </Link> */}
            </form>
            <div className="ftr_wrp">
              <Link to="/privacypolicy" className="link_text">
                <span>Privacy Policy</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
