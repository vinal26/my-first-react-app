import React, { useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { getDoctorProfile } from "../../services/DoctorService";
import { uploadFile } from "../../services/FileUploadService";

const ProfileHeader = () => {
  const [image, setImage] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const uploadPicture = async (e) => {
    setImage(e.target.files[0]);
    try {
      await uploadFile(image);
      await getDoctorInfo()
    } catch (error) {
      console.log(error);
    }
  }

  const getDoctorInfo = async () => {
    try {
      const response = await getDoctorProfile();
      if (response.status === 200) {
        console.log(response?.data);
        response?.data?.data[0]?.profilePicture && setProfilePicture(response?.data?.data[0]?.profilePicture);
      } else {
        alert(response?.data || response.message);
      }
    } catch (error) {
      error?.data?.data && alert(error?.data?.data || error.data?.message);
    }
  }

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <>
      <div className="row mb-5">
        <div className="col-md-12 text-center">
        
          <center>
          <img
            src={(image && URL.createObjectURL(image)) || profilePicture || "images/defaultProfile.png"}
            alt=""
            className="profile_iconmain8"
          />

          </center>
          <input type="file" className="form-control profile_circleinput" 
          accept="image/*"
          onChange={(e) => {
            uploadPicture(e);
          }} />
          <div className="profile_circleimask d-flex justify-content-center align-items-center">
            <BsFillPlusCircleFill className="profile_circleicon" />
          </div>
      
        </div>
        <div className="col-md-12">
        <div className="float-end react_stars">
        <p className="whole_label1">My Ratings</p>
      <Link to="/myratingslist">
      <div className="rating_back89">
        <ReactStars 
              count={5}
              value={2}
              edit={false}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
            </div>
            </Link>
           
            </div>
            
            </div>
      </div>
    </>
  );
};

export default ProfileHeader;
