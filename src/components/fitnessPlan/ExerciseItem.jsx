import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { RiEdit2Fill, RiDeleteBin6Line } from "react-icons/ri";
import ApiConfig from "../../config/ApiConfig";
import DeleteModal from "../../commonComponent/DeleteModal";
import { deleteExerciseService } from "../../services/CreateCarePlanService";
import { showToastError, showToastSuccess } from "../../Utils/Helper";
import { useState } from "react";

const ExerciseItem = ({
  exerciseList,
  isLoading,
  isAdmin,
  getExerciseList,
}) => {
  const [deleteId, setDeleteId] = useState("");

  const deletePost = async (id) => {
    try {
      const response = await deleteExerciseService(id);
      if (response) {
        showToastSuccess(response?.data || "Exercise deleted successfully.");
        getExerciseList();
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
  // const renderDeleteExercise = () => (
  //   <div
  //     class="modal fade"
  //     id="deletexercise"
  //     data-bs-backdrop="static"
  //     data-bs-keyboard="false"
  //     tabindex="-1"
  //     aria-labelledby="staticBackdropLabel"
  //     aria-hidden="true"
  //   >
  //     <div class="modal-dialog blog_modal_dialog ">
  //       <div class="modal-content blog_modal_content">
  //         <div class="modal-header border-0 text-center">
  //           <h5 class="modal-title w-100" id="staticBackdropLabel">
  //             Delete
  //           </h5>
  //           <button
  //             type="button"
  //             class="btn-close"
  //             data-bs-dismiss="modal"
  //             aria-label="Close"
  //           ></button>
  //         </div>
  //         <div class="modal-body">
  //           <p className="modal_text_body">
  //             Are you sure, you want to delete
  //             <br /> this Exercise?
  //           </p>
  //         </div>
  //         <div>
  //           <center>
  //             <button
  //               type="button"
  //               class="cancel_delete_blog"
  //               data-bs-dismiss="modal"
  //             >
  //               Cancel
  //             </button>
  //             <button
  //               data-bs-dismiss="modal"
  //               // onClick={() => onDelete(data)}
  //               type="button"
  //               class="delete_blog"
  //             >
  //               Delete
  //             </button>
  //           </center>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <>
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
      ) : exerciseList.length ? (
        exerciseList.map((dt, i) => (
          <div
            key={i}
            className="card shadow-sm border-0 mb-3 p-3 d-flex flex-md-row justify-content-between"
          >
            <div className="d-flex align-items-center">
              {/* <video className="recipe_image_ me-4">
                <source
                  src={
                    ApiConfig.ImageUrl +
                    "exercise/" +
                    dt.userId +
                    "/video/" +
                    dt.media[0]
                  }
                  type="video/mp4"
                />
                <source src="movie.ogg" type="video/ogg" />
                Your browser does not support the video tag.
              </video> */}

              <img
                src={
                  dt.thumbnail &&
                  ApiConfig.ImageUrl +
                    "posts/" +
                    dt.userId +
                    "/thumbnail/" +
                    dt.thumbnail
                }
                onError={(e) => {
                  e.target.src = "images/defaultPlaceholder.jpg"; //replacement image imported above
                }}
                className="recipe_image_ me-4"
                alt=""
              />
              <p className="m-0 text-capitalize">{dt.name}</p>
            </div>
            <div className="d-flex justify-content-around align-items-center">
              <Link
                className="btn btn-primary btn-custom-light ms-3"
                to={`/viewexercise?exerciseId=${dt._id}`}
              >
                <span>
                  <AiOutlineEye className="me-2" />
                  View
                </span>
              </Link>

              {isAdmin ? (
                <>
                  <Link
                    className="btn btn-primary btn-custom-light ms-3"
                    // to={`/editmealplan?mealplanId=${dt._id}`}
                    to={`/editexercise?exerciseId=${dt._id}`}
                  >
                    <span>
                      <RiEdit2Fill className="me-2" />
                      Edit
                    </span>
                  </Link>
                  <button
                    className="btn btn-primary btn-custom-light ms-3"
                    data-bs-toggle="modal"
                    data-bs-target="#deletexercise"
                    to=""
                    onClick={() => setDeleteId(dt._id)}
                  >
                    <span>
                      <RiDeleteBin6Line className="me-2" />
                      Delete
                    </span>
                  </button>
                </>
              ) : null}
            </div>
          </div>
        ))
      ) : (
        <div class="card px-3 py-4">
          <h2 class="text-green text-center mx-5 mb-4">
            You do not have any Exercises yet,
          </h2>
          <p class="text-green text-center">
            Click the ‘Add New Exercise’ button to begin.
          </p>
        </div>
      )}
      <DeleteModal
        title={"Delete"}
        content1={"Are you sure you want to delete"}
        content2={"this Exercise?"}
        modalId={"deletexercise"}
        button2={"No"}
        button1={"Yes"}
        onDelete={() => deletePost(deleteId)}
      />
      {/* {renderDeleteExercise()} */}
    </>
  );
};

export default ExerciseItem;
