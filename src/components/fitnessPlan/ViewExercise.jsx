import React, { useEffect, useState } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "../appointment/style.css";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import ViewRecipeMeter from "../recipes/ViewRecipeMeter";
import { RiEdit2Fill } from "react-icons/ri";
import { getExerciseListByIdService } from "../../services/CreateCarePlanService";
import { useAuth } from "../../Context/AuthContext";
import ApiConfig from "../../config/ApiConfig";

const ViewExercise = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const exerciseId = params.get("exerciseId");
  const [exerciseSingledata, setExerciseSingledata] = useState([]);
  console.log(exerciseSingledata[0]?.media[0] &&
    ApiConfig.ImageUrl +
    "exercise/" +
    exerciseSingledata[0]?.userId +
    "/video/" +
    exerciseSingledata[0]?.media[0], "exercisedata");
  const { isAdmin } = useAuth();

  useEffect(() => {
    getExerciseListById();
  }, []);

  const getExerciseListById = async () => {
    try {
      const response = await getExerciseListByIdService(exerciseId);
      // setLoader(false);
      if (response) {
        setExerciseSingledata(response.data);
      }
    } catch (error) {
      // setLoader(false);
      setExerciseSingledata([]);
    }
  };


  console.log(exerciseSingledata , "exerciseSingledata");
  return (
    <>
      <Navbar />

      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 pt-4 px-5">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li
                  class="breadcrumb-item cursor-pointer"
                  onClick={() => navigate("/mylibrary")}
                >
                  My Library
                </li>
                <li
                  class="breadcrumb-item cursor-pointer"
                  onClick={() => navigate(-1)}
                >
                  Fitness
                </li>
                <li class="breadcrumb-item active fw-bold" aria-current="page">
                  View Exercise
                </li>
              </ol>
            </nav>

            <div>
              <div className="view_recipe_div  mt-3">
                <h5 className="mb-5">View Exercise</h5>
                <div className="row">
                  <div className="col-md-4">
                    {/* <video className="singlepost_image43 cursor-pointer" autoPlay> */}
                    <video controls width="100%" height="100%"
                      src={
                        exerciseSingledata[0]?.media[0] &&
                        ApiConfig.ImageUrl +
                        "exercise/" +
                        exerciseSingledata[0]?.userId +
                        "/video/" +
                        exerciseSingledata[0]?.media[0]
                      }  >
                    </video>
                    {/* <img
                      src={
                        exerciseSingledata[0]?.thumbnail &&
                        ApiConfig.ImageUrl +
                        "posts/" +
                        exerciseSingledata[0]?.userId +
                        "/thumbnail/" +
                        exerciseSingledata[0]?.thumbnail
                      }
                      onError={(e) => {
                        e.target.src = "images/defaultPlaceholder.jpg"; //replacement image imported above
                      }}
                      alt=""
                      className="singlepost_image43 cursor-pointer"
                    /> */}

                    {/* <img src="images/dummy_image.jpg" alt="" /> */}
                  </div>

                  <div className="col-md-8">
                    <p className="viewrecipetitle">
                      {exerciseSingledata[0]?.name
                        ? exerciseSingledata[0]?.name
                        : null}
                    </p>
                    {/* <div className="row"> */}
                    {/* <ViewRecipeMeter
                        name={`Calories Burn`}
                        amount={exerciseSingledata[0]?.calorie ? exerciseSingledata[0]?.calorie : 0}
                        measure={`kcal`}
                      /> */}
                    {/* <ViewRecipeMeter
                        name={`Proteins`}
                        amount={"10"}
                        measure={`Gram`}
                      />
                      <ViewRecipeMeter
                        name={`Fats`}
                        amount={"10"}
                        measure={`Gram`}
                      />
                      <ViewRecipeMeter
                        name={`Carbs`}
                        amount={"10"}
                        measure={`Gram`}
                      /> */}
                    {/* </div> */}
                    {/* <br /> */}


                    <hr className="viewrecipe_hr  mb-2 px-2" />
                    <div className="row">
                      <div className="col-md-3">
                        <p className="viewrecipe_server">
                          Calories Burn <br />
                          <span>
                            {exerciseSingledata[0]?.calorie
                              ? exerciseSingledata[0]?.calorie
                              : null}{" "}
                            kcal

                          </span>
                        </p>
                      </div>
                      <div className="col-md-3">
                        <p className="viewrecipe_server">
                          Set <br />
                          <span>
                            {exerciseSingledata[0]?.sets
                              ? exerciseSingledata[0]?.sets
                              : null}
                          </span>
                        </p>
                      </div>
                      <div className="col-md-3">
                        <p className="viewrecipe_server">
                          Reps <br />
                          <span>
                            {exerciseSingledata[0]?.reps
                              ? exerciseSingledata[0]?.reps
                              : null}
                          </span>
                        </p>
                      </div>


                      <div className="col-md-3">
                        <p className="viewrecipe_server">
                          Category <br />
                          <span className="text-capitalize">
                            {exerciseSingledata[0]?.category
                              ? exerciseSingledata[0]?.category
                              : null}{" "}
                            {/* mins */}
                          </span>
                        </p>
                      </div>
                    </div>
                    <hr className="viewrecipe_hr  mb-1 " style={{ marginTop: "140px" }} />


                  </div>
                  {/* <div className="col-md-4">
                    <p className="viewrecipe_server">
                      Cook Time: <br />
                      <span>08 hrs 30 mins</span>
                    </p>
                  </div> */}
                </div>


                {/* <div className="d-flex mt-2">
                  <p className="mb-2">Category: </p>{" "}
                  <div className="ms-2 text-green mb-2">
                    {exerciseSingledata[0]?.category
                      ? exerciseSingledata[0]?.category
                      : null}
                  </div>
                </div> */}
                <div className="d-flex">
                  <p>
                    <span class="badge bg-green me-2 py-2 px-3 mt-4">
                      {exerciseSingledata[0]?.tags
                        ? exerciseSingledata[0]?.tags
                        : null}
                    </span>
                  </p>
                </div>

                <div className="row">
                  <div className="col-md-6" style={{ borderRight: "1px solid #e1e4e6", height: "250px" }}>
                    <p className="viewrecipe_server mb-2 ">Equipments</p>
                    <ul className="text-secondary">
                      {exerciseSingledata[0]?.equipment
                        ? exerciseSingledata[0]?.equipment.map((data) => {
                          return <li>{data}</li>;
                        })
                        : null}
                    </ul>
                  </div>

                  <div className="col-md-6">
                    <p className="viewrecipe_server mb-2">Instructions:</p>
                    <p className="text-secondary" style={{whiteSpace:"pre-wrap"}}>
                      {exerciseSingledata[0]?.instruction
                        ? exerciseSingledata[0]?.instruction
                        : null}
                    </p>
                  </div>
                </div>
              </div>

              {isAdmin ? (
                <Link to={`/editexercise?exerciseId=${exerciseSingledata[0]?._id}`} className="link_text">
                  <button className="btn btn-primary btn-custom ms-auto px-4">
                  <RiEdit2Fill className="me-2" />   Edit
                  </button>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ViewExercise;
