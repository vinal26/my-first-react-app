import React, { useState } from "react";
import { BiError } from "react-icons/bi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../commonComponent/Button";
import auth_image from '../../images/auth_image.png';
import { SignUpService } from "../../services/api";
import { checkPassword, isEmpty, showToastError, showToastSuccess } from "../../Utils/Helper";
import "../login/style.css";

const SignUp = () => {
  let navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const [terms, setTerms] = useState(false);

  const submitData = async (e) => {
    e.preventDefault();
    try {
      if (!checkValidation()) {
        return;
      }
      setLoader(true)
      let params = {
        email,
        validationToken: token,
        password: password
      }
      const response = await SignUpService(params);
      setLoader(false)
      if (response.status === 200) {
        showToastSuccess("User Signed Up Successfully")
        navigate('/');
      } else {
        showToastError(response?.data || response.message || "User signup failed")
      }
    } catch (error) {
      setLoader(false);
      showToastError(error?.data?.data || error.data?.message || "User signup failed")
      navigate('/');
    }
  }

  const checkValidation = () => {
    try {
      let isValid = true;
      let errors = error;
      if (!password || isEmpty(password) || !checkPassword(password)) {
        isValid = false;
        errors = { ...errors, password: true }
      }
      if (!confirmPassword || isEmpty(confirmPassword) || !checkPassword(password)) {
        isValid = false;
        errors = { ...errors, confirmPassword: true }
      }
      if (!terms) {
        isValid = false;
        errors = { ...errors, terms: true }
      }
      if (isValid) {
        if (password !== confirmPassword) {
          isValid = false;
          errors = { ...errors, confirmPassword: true }
        }
      }
      setError(errors);
      return isValid;
    } catch (error) {
      console.log(error)
    }
  }

  const onChangePassword = (key, value) => {
    if (key === 'password') {
      setPassword(value);
    } else if (key === 'confirmPassword') {
      setConfirmPassword(value);
    }
  }


  const renderError = (msg, value, style) => {
    return (
      value ? (
        <h6 className="blog_error_text4 signUpMsg12" style={{ marginBottom: 10, marginTop: style !== undefined ? 10 : -10 }}>
          {msg}
        </h6>) : null)
  }

  // Connect to zoom pop up
  const renderZoomPopUp = () => {
    return (
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
        <div class="modal-dialog blog_modal_dialog ">
          <div class="modal-content blog_modal_content" style={{ marginTop: "25vh" }}>
            <div class="modal-header border-0 text-center">
              <h5 class="modal-title w-100" id="staticBackdropLabel">
                Connect to zoom
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="text-center">
              <div className="col-md-12">
                <input
                  type={passwordVisibility ? "text" : "password"}
                  className="login_input"
                  placeholder="Zoom Api Key"
                  value={password}
                  onChange={(e) => { onChangePassword('password', e.target.value); setError({ ...error, password: false }) }}
                />
              </div>
              <div className="col-md-12">
                <input
                  type={passwordVisibility ? "text" : "password"}
                  className="login_input"
                  placeholder="Zoom Api Secret"
                  value={password}
                  onChange={(e) => { onChangePassword('password', e.target.value); setError({ ...error, password: false }) }}
                />
              </div>
            </div>
            <div style={{ paddingBottom: 20 }}>
              <center>
                <button
                  data-bs-dismiss="modal"
                  onClick={() => { }}
                  type="button"
                  class="delete_blog">
                  Submit
                </button>
              </center>
            </div>
          </div>
        </div>
      </div>
    );
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
            <p className="continue_login mb-4 fs-5 text-green">Welcome to WellnessWits Dashboard</p>
            <form onSubmit={submitData}>
              <div className="col-md-12">
                <input
                  type="text"
                  className="login_input rounded-pill"
                  placeholder="Email Address"
                  value={email}
                  contentEditable={false}
                  focusable={false}
                  onClick={(e) => e.currentTarget.blur()}
                />
              </div>
              <div className="col-md-12">
                <input
                  type={passwordVisibility ? "text" : "password"}
                  className="login_input rounded-pill"
                  placeholder="Create Password"
                  maxLength={20}
                  value={password}
                  onChange={(e) => { onChangePassword('password', e.target.value); setError({ ...error, password: false }) }}
                />
                <img src={passwordVisibility ? "images/eye-show.png" : "images/eye-hide.png"} className="password_eye" alt="" onClick={() => setPasswordVisibility(!passwordVisibility)} />
              </div>
              {renderError('Password must be minimum of 8 characters including a number, special character and an uppercase letter.', error.password)}

              <div className="col-md-12">
                <input
                  type={confirmPasswordVisibility ? "text" : "password"}
                  className="login_input mb-0 rounded-pill"
                  placeholder="Confirm Password"
                  maxLength={20}
                  value={confirmPassword}
                  onChange={(e) => { onChangePassword('confirmPassword', e.target.value); setError({ ...error, confirmPassword: false }) }}
                />
                <img src={confirmPasswordVisibility ? "images/eye-show.png" : "images/eye-hide.png"} className="password_eye" alt="" onClick={() => setConfirmPasswordVisibility(!confirmPasswordVisibility)} />
              </div>
              {!confirmPassword || error.confirmPassword ? renderError('Please confirm Password.', error.confirmPassword, false) : null}
              {password && confirmPassword && password !== confirmPassword ? renderError('Password do not match', true, false) : null}
              <span className=" forgot_password mt-4 me-5 mx-auto d-flex justify-content-left align-items-left"  >
                <input type="checkbox" checked={terms} onClick={(e) => {
                  if (e.target)
                    setTerms(e.target.checked)
                }} /> I agree to the privacy policy
                {/* </p> */}
              </span>
              {(error.terms && !terms) && <label className="text-danger" style={{
                width: "72%",
                marginLeft: "0px",
                textAlign: "left",
                position: "relative",
              }}>Please click to continue.</label>}
              <Button isLoading={isLoading} type="submit" id="reateProgram" text={'SignUp'} style={isLoading ? { cursor: 'none' } : {}} className="login_btnlogin mt-3 rounded-pill" />
            </form>
            <div className="ftr_wrp">
              <Link to="/privacypolicy" className="link_text">
                <span>Privacy Policy</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Connect to zoom button */}
      {/* {renderZoomPopUp()}
      <div className="btn-group zoom_group" style={{ width: 700 }}>
        <Button class="connect_to_zoom mt-3"
          style={{ cursor: "pointer" }}
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop" isLoading={isLoading} type="submit" id="reateProgram" text={'Connect to zoom'} style={isLoading ? { cursor: 'none' } : {}} />
        <p className="connect_to_zoom_p">Connect to zoom is required to signup <Link to="">learn more</Link></p>
      </div> */}
    </>
  );
};

export default SignUp;
