import React from "react";
import AddNewPatientForm from "./AddNewPatientForm";
import AllPatientListLeftSection from "./AllPatientListLeftSection";

const AddNewPatientComponent = () => {
  return (
    <>
      <div className="row">
        {/* <div className="col-md-4">
          <AllPatientListLeftSection />
        </div> */}

        <div className="col-md-12">
          <AddNewPatientForm />
        </div>
      </div>
    </>
  );
};

export default AddNewPatientComponent;
