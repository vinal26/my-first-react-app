import React, {useState} from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { RiEdit2Fill, RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../commonComponent/DeleteModal";
import { deleteFitnessPlanService } from "../../services/CreateCarePlanService";
import { showToastError, showToastSuccess } from "../../Utils/Helper";

const FitnessPlanItem = ({ fitnessPlanList, isLoading , getFitnessPlanList }) => {
  const [deleteId, setDeleteId] = useState("");


  const deletePost = async (id) => {
    try {
      const response = await deleteFitnessPlanService(id);
      if (response) {
        showToastSuccess(response?.data || "Fitness Plan deleted successfully.");
        getFitnessPlanList();
      } else {
        showToastError(
          response?.data || response.message || "Some error occurred"
        );
      }
    } catch (error) {
      showToastError(
        error?.data?.data || error.data?.message || "Some error occurred"
      );
    }
  };
  return (
    <>

<DeleteModal
  title={"Delete"}
  content1={"Are you sure you want to delete"}
  content2={"this Fitness Plan?"}
  modalId={"deletfitnessplan"}
  button2={"No"}
  button1={"Yes"}
  onDelete={() => deletePost(deleteId)}
/>
      {isLoading ? (
        <center>
          <div
            style={{
              width: "3rem",
              height: "3rem",
              color: "#1f7e78",
              top: "110px",
              position: "relative",
            }}
            className="spinner-border mt-3 mb-4"
            role="status"
          />
        </center>
      ) : fitnessPlanList.length ? (
        fitnessPlanList.map((dt, i) => (
          <div
            key={i}
            className="card shadow-sm border-0 mb-3 p-3 d-flex flex-md-row justify-content-between"
          >
            <div className="d-flex align-items-center">
              <p className="m-0 text-capitalize">{dt.planName}</p>
            </div>
            <div className="d-flex justify-content-around align-items-center">
              <Link
                className="btn btn-primary btn-custom-light ms-3"
                to={`/viewfitnessplan?fitnessplanId=${dt._id}`}
              >
                <span>
                  <AiOutlineEye className="me-2" />
                  View
                </span>
              </Link>

              <>
                <Link
                  className="btn btn-primary btn-custom-light ms-3"
                  to={`/createfitnessplan?fitnessplanId=${dt._id}`}
                >
                  <span>
                    <RiEdit2Fill className="me-2" />
                    Edit
                  </span>
                </Link>
                <button
                  className="btn btn-primary btn-custom-light ms-3"
                  data-bs-toggle="modal"
                  data-bs-target="#deletfitnessplan"
                  // to=""
                  onClick={() => setDeleteId(dt._id)}
                >
                  <span>
                    <RiDeleteBin6Line className="me-2" />
                    Delete
                  </span>
                </button>
              </>
            </div>
          </div>
        ))
      ) : (
        <div class="card px-3 py-4">
          <h2 class="text-green text-center mx-5 mb-4">
            You do not have any Fitness Plans yet,
          </h2>
          <p class="text-green text-center">
            Click the ‘Add New Fitness Plan button to begin.
          </p>
        </div>
      )}
    </>

    
  );


};

export default FitnessPlanItem;
