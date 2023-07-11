import React from "react";
import DoctorProfileHeader from "./DoctorProfileHeader";

const EditProfileForm = () => {
  return (
    <>
      <div className="row mt-4">
        <div className="col-md-12 mt-3">
          <DoctorProfileHeader />
        </div>
        <div className="col-md-6">
          <p className="whole_label">First name</p>
          <input type="text" className="description_inputf" value="lisa" />
        </div>

        <div className="col-md-6">
          <p className="whole_label">Last name</p>
          <input type="text" className="description_inputf" value="jones" />
        </div>

        <div className="col-md-12">
          <p className="whole_label">DOB</p>
          <input type="text" className="description_inputf" value="DOB" />
        </div>

        <div className="col-md-12">
          <p className="whole_label">Email id</p>
          <input
            type="text"
            className="description_inputf"
            value="lisa@gmail.com"
          />
        </div>

        <div className="col-md-12">
          <p className="whole_label">Years of experience</p>
          <input type="text" className="description_inputf" value="4 years " />
        </div>
      </div>

      <div className="col-md-12">
        <p className="whole_label">Qualification</p>
        <input type="text" className="description_inputf" value="MBBS" />
      </div>

      <div className="col-md-12">
        <p className="whole_label">profession</p>
        <input
          type="text"
          className="description_inputf"
          value="gynecoiogist"
        />
      </div>

      <div className="col-md-12">
        <p className="whole_label">description</p>
        <input
          type="text"
          className="description_inputf"
          value="Lorem Ipsum is simply dummy"
        />
      </div>

      <div className="col-md-12">
        <p className="whole_label">addess</p>
        <input
          type="text"
          className="description_inputf"
          value="Akshya Nagar 1st Block Rammurthy nagar, Bangalore-560016"
        />
      </div>

      <div className="col-md-12">
        <button className="description_btnsave mt-2">save</button>
      </div>
    </>
  );
};

export default EditProfileForm;
