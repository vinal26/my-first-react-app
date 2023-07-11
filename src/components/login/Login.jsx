import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { login } from "../../services/api";
import "./style.css";
import auth_image from '../../images/auth_image.png';
import { showToastError, showToastSuccess, validateEmail } from '../../Utils/Helper';
import { toastMsg } from "../../Utils/AllConstant";
import { getObjectFromStore, removeStoreItem, setObjectInStore } from "../../storage/Storage";

const Login = () => {
  let navigate = useNavigate();
  const auth = useAuth();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState();
  const [pass, setPass] = useState();
  const [loader, setLoader] = useState(false);
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    try {
      let rememberMe = getObjectFromStore("rememberMe")
      if (rememberMe) {
        setUser(rememberMe?.email)
        setPass(rememberMe?.password)
        setRemember(rememberMe?.rememberMe)
      }
    } catch (e) {
      console.log(e, "Remember me getting localstorage obj")
    }
  }, [])


  const getLogin = (e) => {
    // e.preventDefault();
    try {
      let rememberMe = getObjectFromStore("rememberMe")
      if (!user || !pass) {
        setError(true)
      } else {
        setError(true)
        if (validateEmail(user)) {
          setError(false)
          setLoader(true)
          let loginObj = {
            email: user,
            password: pass,
          };
          login(loginObj)
            .then(async (data) => {
              if (data.status === 200) {
                let rememberMeObj = {
                  email: user,
                  password: pass,
                  rememberMe: remember,
                  token: data?.data?.data?.token
                }
                if (remember) {
                  setObjectInStore("rememberMe", rememberMeObj)
                } else {
                  if (rememberMe?.rememberMe) {
                    removeStoreItem("rememberMe")
                  }
                }
                showToastSuccess(toastMsg.userLogged)
                await auth.setLogin(data.data.data.token);
              } else {
                setError(data.data.data);
                showToastError(toastMsg.userFailed)
              }
              setLoader(false)
            })
            .then(() => {
              setLoader(false)
              navigate("/", { replace: true });
            })
            .catch((error) => {
              setError(error?.data?.data);
              setLoader(false)
              showToastError(error?.data?.data || toastMsg.userFailed)
            });
        } else {
          setError(true)
          setLoader(false)
        }
      }
    } catch (e) {
      console.log(e, 'error login')
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 d-none d-md-block">
            <img src={auth_image} className="login_image" style={{ marginLeft: "-150px" }} alt="" />
          </div>
          <div className="col-md-6 text-center">
            {/* <img src="images/login_arr.png" alt="" className="login_arr" /> */}
            {/* {error && (
              <div className="mt-2 alert alert-danger mb-4 mx-4" role="alert">
                {error}
              </div>
            )} */}
            <img src="images/logo2.png" alt="" className="logo_login" />
            <p className="continue_login mb-4 fs-5 text-green">
              Welcome to WellnessWits Dashboard
            </p>
            <form>
              <div className="col-md-12">
                <input
                  type="email"
                  className="login_input rounded-pill"
                  placeholder="Email Address"
                  value={user}
                  onChange={(e) => setUser(e.target.value.toLowerCase())}
                />
                {(error && !user) && <label className="text-danger" style={{
                  width: "80%",
                  margin: "0 auto 0",
                  textAlign: "left",
                  position: "relative",
                  top: "-15px"
                }}>Please enter valid email.</label>}
                {(error && !validateEmail(user) && user) && <label className="text-danger m-1"
                  style={{
                    width: "80%",
                    margin: "0 auto 0",
                    textAlign: "left",
                    position: "relative",
                    top: "-15px"
                  }}>Email format is not valid.</label>}
              </div>

              <div className="col-md-12">
                <input
                  type={passwordVisibility ? "text" : "password"}
                  className="login_input rounded-pill"
                  placeholder="Password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
                <img
                  src={
                    passwordVisibility
                      ? "images/eye-show.png"
                      : "images/eye-hide.png"
                  }
                  className="password_eye rounded"
                  alt=""
                  onClick={() => setPasswordVisibility(!passwordVisibility)}
                />
                {(error && !pass) && <label className="text-danger" style={{
                  width: "80%",
                  margin: "0 auto 0",
                  textAlign: "left",
                  position: "relative",
                  top: "-15px"
                }}>Please enter password.</label>}
              </div>
              <p className="forgot_password"><input type="checkbox" checked={remember} onClick={(e) => {
                if (e.target)
                  setRemember(e.target.checked)
              }} /> Remember me
                <Link to="/forgotpassword" className="link_text">
                  <span>Forgot Password?</span>
                </Link>
              </p>

              <button type="button" disabled={loader} className="rounded-pill login_btnlogin mt-3  mx-auto d-flex justify-content-center align-items-center" onClick={() => { getLogin() }} >
                sign in  {loader && <div className=" text-center text-capitalize" style={{ marginLeft: "10px" }}>
                  <div style={{ width: '2rem', height: '2rem', marginTop: "6px" }} class="spinner-border" role="status" />
                </div>}
              </button>
            </form>
            {/* <button className="login_btngoogle mt-3">
              <img src="images/google.png" alt="" /> sign in with google
            </button> */}
            <div className="ftr_wrp">
              <Link to="/privacypolicy" className="link_text text-decoration-none">
                <span>Privacy Policy</span>
              </Link>
              <Link to="/policyusages" className="link_text mx-5 text-decoration-none">
                <span>Terms and Usages</span>
              </Link>
              <Link to="/contactus" className="link_text text-decoration-none">
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
