import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { resetPasswordService } from "../../services/api";
import { checkPassword, isEmpty, showToastError, showToastSuccess } from "../../Utils/Helper";
import "../login/style.css";
import Button from '../../commonComponent/Button';

const ResetPassword = () => {
  let navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token");
  const userId = params.get("userId");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);
  const [error, setError] = useState({});
  const [isLoading, setLoader] = useState(false);


  const submitData = async (e) => {
    try {
      if (!checkValidation()) {
        return;
      }
      setLoader(true)
      let params = {
        password
      }
      const response = await resetPasswordService(params, userId, token);
      if (response) {
        setLoader(false)
        showToastSuccess(response?.data || response?.message)
        navigate('/');
      } else {
        setLoader(false)
        showToastError(response?.data || response.message);
      }

    } catch (error) {
      setLoader(false)
      error?.data?.data && showToastError(error?.data?.data || error.data?.message);
      navigate('/');
    }
  }

  const onChangePassword = (key, value) => {

    if (key === 'password') {
      setPassword(value);
    } else if (key === 'confirmPassword') {
      setConfirmPassword(value);
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

  const renderError = (msg, value, style) => {
    return (
      value ? (
        <h6 className="blog_error_text4 signUpMsg12" style={{ marginBottom: 10, marginTop: style !== undefined ? 10 : -10 }}>
          {msg}
        </h6>) : null)
  }


  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6  d-none d-md-block">
            <img src="images/login_image.png" className="login_image" alt="" />
          </div>
          <div className="col-md-6 text-center">
            <img src="images/login_arr.png" alt="" className="login_arr" />
            <img src="images/logo2.png" alt="" className="logo_login" />
            <p className="continue_login mb-4">Welcome to WellnessWits Dashboard</p>
            <form>
              <div className="col-md-12">
                <input
                  required
                  type={passwordVisibility ? "text" : "password"}
                  className="login_input"
                  placeholder="Create password"
                  value={password}
                  maxLength={20}
                  onChange={(e) => { onChangePassword('password', e.target.value); setError({ ...error, password: false }) }}
                />
                <img src={passwordVisibility ? "images/eye-show.png" : "images/eye-hide.png"} className="password_eye" alt="" onClick={() => setPasswordVisibility(!passwordVisibility)} />
                {renderError('Password must be minimum of 8 characters including a number, special character, and an uppercase letter.', error.password)}
              </div>

              <div className="col-md-12">
                <input
                  required
                  type={confirmPasswordVisibility ? "text" : "password"}
                  className="login_input mb-0"
                  placeholder="Confirm password"
                  maxLength={20}
                  value={confirmPassword}
                  onChange={(e) => { onChangePassword('confirmPassword', e.target.value); setError({ ...error, confirmPassword: false }) }}
                />
                <img src={confirmPasswordVisibility ? "images/eye-show.png" : "images/eye-hide.png"} className="password_eye" alt="" onClick={() => setConfirmPasswordVisibility(!confirmPasswordVisibility)} />
                {!confirmPassword || error.confirmPassword ? renderError('Please confirm password', error.confirmPassword, false) : null}
                {password && confirmPassword && password !== confirmPassword ? renderError('Password do not match', true, false) : null}
              </div>

              <Button isLoading={isLoading} type="button" id="submit" text={'Submit'} onClick={submitData} style={isLoading ? { cursor: 'none' } : {}} className="login_btnlogin mt-3" />
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

export default ResetPassword;
