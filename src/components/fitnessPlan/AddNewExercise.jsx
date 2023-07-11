import React, { useState } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "../appointment/style.css";
import { Link } from "react-router-dom";
// import "./style.css";
import { BsTrash } from "react-icons/bs";
import { AiFillPlusCircle, AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { exerciseCategory } from "../../Utils/AllConstant";
import { createExerciseService } from "../../services/CreateCarePlanService";
import Button from "../../commonComponent/Button";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import {
  showToastError,
  showToastSuccess,
  getFileName,
  isEmpty
} from "../../Utils/Helper";
import {
  getUploadFileCategory,
  uploadFile,
} from "../../services/FileUploadService";
import { v4 as uuidv4 } from "uuid";

const AddNewExercise = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [media, setMedia] = useState([]);
  const [category, setCategory] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [instruction, setInstruction] = useState("");
  const [inputList, setInputList] = useState([{ Equipment: "" }]);
  const [tags, setTags] = useState("");
  const [calorie, setCalorie] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const MAX_FILE_SIZE = 10240000 // 10000MB
  const CheckMedia = media[0]?.size;
  const fileSizeKiloBytes = CheckMedia / 1024;
  const [equipmentNeeded, setEquipmentNeeded] = useState();


  const handleAddClick = () => {
    setInputList([...inputList, { Equipment: "" }]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value.replace(/[^\w\s]/gi, "");
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const urltoFile = (url, filename, mimeType) => {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  };

  const generateVideoThumbnail = (file) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const video = document.createElement("video");

      // this is important
      video.autoplay = true;
      video.muted = true;
      video.src = URL.createObjectURL(file);

      video.onloadeddata = () => {
        let ctx = canvas.getContext("2d");

        canvas.width = video.videoWidth / 5;
        canvas.height = video.videoHeight / 5;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        video.pause();
        return resolve(canvas.toDataURL("image/png"));
      };
    });
  };

  function captureVideoThumb(e) {
    generateVideoThumbnail(e.target.files[0]).then((dt) => {
      // console.log(dt);
      urltoFile(dt, "videoThumb.png", "image/png").then(function (file) {
        // console.log(file);
        setThumbnail([file]);
        // setThumbnail((prev) => {return {...prev, file}})
      });
    });
  }

  const handleSubmit = async (e) => {
    let addObject = {
      name: name,
      category: category,
      reps: Number(reps),
      sets: Number(sets),
      equipment: inputList.filter(o => Object.values(o).some(v => v !== '')).map((item) => {
        return item.Equipment;
      }),
      instruction: instruction,
      tags: tags,
      calorie: Number(calorie),
      thumbnail: thumbnail,
    };
    try {
      if (
        media.length === 0 ||
        !name ||
        isEmpty(name) ||
        !category ||
        !reps ||
        reps <= 0 || 
        !sets ||
        sets <= 0 || 
        // !equipmentNeeded ||
        !instruction ||
        !tags ||
        !calorie || 
        calorie <= 0 || 
        fileSizeKiloBytes > MAX_FILE_SIZE
      ) {
        setError(true);
      } else {
        setError(false);
        setLoader(true);
        // console.log(addObject);
        const videoName = media[0] ? getFileName(media[0]) : null;
        console.log(videoName, "videoName");
        const vthumbnail = `videoThumbnail__${uuidv4()}`;
        if (media[0])
          await uploadFile(
            media[0],
            getUploadFileCategory.exerciseVideo,
            videoName
          );

        if (media[0]) {
          // console.log(thumbnail[0]);
          await uploadFile(
            thumbnail[0],
            getUploadFileCategory.postDocThumb,
            vthumbnail
          );
        }

        const response = await createExerciseService({
          ...addObject,
          media: videoName ? [videoName] : [],
          thumbnail: videoName ? vthumbnail : "",
        });
        if (response.status === 200) {
          navigate(-1);
          setLoader(false);
          showToastSuccess(`Exercise is created successfully`);
          setError(false);
        }
      }
    } catch (error) {
      setLoader(false);
      showToastError(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 py-4 px-5">
            <div className="row">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li
                    class="breadcrumb-item  cursor-pointer"
                    onClick={() => navigate("/mylibrary")}
                  >
                    My Library
                  </li>
                  <li
                    class="breadcrumb-item cursor-pointer"
                    aria-current="page"
                    onClick={() => navigate(-1)}
                  >
                    Fitness
                  </li>

                  <li
                    class="breadcrumb-item active fw-bold"
                    aria-current="page"
                  >
                    Exercise
                  </li>
                </ol>
              </nav>
              <div className="d-flex mb-3">
                <div className="w-100">
                  <h4>Add New Exercise</h4>
                  <p>Fill in exercise information</p>
                </div>
              </div>

              <div className="row">
                <div className="d-flex">
                  <div className="col-md-4 mt-4 pe-4" style={{ position: "relative" }}>
                    {media[0] ? (
                      <video className="active_dummyimg">
                        <source
                          src={media[0] && URL.createObjectURL(media[0])}
                          type="video/mp4"
                        />
                        {/* <source src="movie.ogg" type="video/ogg" /> */}
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src="images/dummy_image.jpg"
                        alt=""
                        className="active_dummyimg"
                      />
                    )}

                    {!media[0] ? (
                      <>
                        <input
                          type="file"
                          className="form-control uploader-input"
                          // className="form-control uploader-input_new"
                          accept="video/*"
                          style={{ marginRight: "7px" }}
                          onChange={(e) => {
                            console.log(e.target.files[0], "eee")
                            // setMedia(e.target.files[0]);
                            setMedia([e.target.files[0]]);
                            captureVideoThumb(e);
                            // setMediaType("video");
                          }}
                        />
                        <div className="uploader-mask d-flex justify-content-center align-items-center">
                          <BsFillPlusCircleFill className="upload-icon" />
                        </div>
                      </>
                    ) : <div onClick={() => setMedia([])} className="pointer">
                      <AiFillCloseCircle
                        className="upload-icon-x bg-white"
                        style={{ right: "10px" }}
                      />
                    </div>
                    }

                    {error && !media[0] && (
                      <h6 className="text-danger error mt-2">
                        Please enter a video
                      </h6>
                    )}

                    {fileSizeKiloBytes > MAX_FILE_SIZE && <h6 className="text-danger error mt-2">File size is greater than maximum limit</h6>
                    }

                  </div>
                  <div className="col-md-8 px-2 ms-1 ">
                    <div className="col-md-12 ">
                      <p className="whole_label ">
                        Exercise Title<span class="text-danger"> *</span>
                      </p>
                      <input
                        type="text"
                        className={`description_inputf`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter  Exercise name"
                      />
                      {error && !name && (
                        <h6
                          className="text-danger error"
                          style={{ marginTop: "-26px" }}
                        >
                          This field should be filled.
                        </h6>
                      )}

                      {(name && isEmpty(name)) && <h6
                        className="text-danger error"
                        style={{ marginTop: "-26px" }}
                      >
                        This field should be filled.
                      </h6>}
                    </div>

                    <div className="col-md-12">
                      <p className="whole_label ">
                        category
                        <span className="text-danger"> *</span>
                      </p>
                      <select
                        name=""
                        className="description_inputf mb-0"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">Select an option</option>
                        {/* {exerciseCategory.map((item) => (
                      <option value={item}>{item}</option>
                    ))} */}
                        <option value="cardio">Cardio</option>
                        <option value="pilates">Pilates</option>
                        <option value="weight lifting">Weight Lifting</option>
                        <option value="hiit">HIIT</option>
                        <option value="stretching">Stretching</option>
                        <option value="cycling">Cycling</option>
                        <option value="resistance training">Resistance training</option>
                        <option value="dance">Dance</option>
                        <option value="barre">Barre</option>
                        <option value="circuit training">Circuit training</option>
                      </select>
                      {error && !category && (
                        <h6 className="text-danger error mt-2">
                          You need to select an option.
                        </h6>
                      )}
                    </div>
                    <div className="d-flex mt-4">
                      <div className="col-md-6 ">
                        <p className="whole_label">
                          Sets
                          {/* sets <span className="text-lowercase">for e/a </span>
                          rep */}
                          <span class="text-danger"> *</span>
                        </p>
                        <input
                          type="number"
                          className={`description_inputf`}
                          value={sets}
                          // onChange={(e) => setsets(e.target.value)}
                          onChange={(e) => {
                            if (e.target.value >= 0 && e.target.value < 100000)
                              setSets(e.target.value);
                          }}
                          // placeholder="in min"
                          placeholder="10"
                        />
                        {error && !sets && (
                          <h6
                            className="text-danger error"
                            style={{ marginTop: "-26px" }}
                          >
                            This field should be filled.
                          </h6>
                        )}
                         {(error && sets && sets <= 0) && <h6
                            className="text-danger error"
                            style={{ marginTop: "-26px" }}>Sets cannot be 0 or less than 0.</h6>}
                      </div>
                      <div className="col-md-6 ps-4">
                        <p className="whole_label">
                          Reps<span class="text-danger"> *</span>
                        </p>
                        <input
                          type="number"
                          value={reps}
                          onChange={(e) => {
                            if (e.target.value >= 0 && e.target.value < 100000)
                            setReps(e.target.value);
                          }}
                          className={`description_inputf`}
                          placeholder="in min"
                        />
                        {error && !reps && (
                          <h6
                            className="text-danger error"
                            style={{ marginTop: "-26px" }}
                          >
                            This field should be filled.
                          </h6>
                        )}
                         {(error && reps && reps <= 0) && <h6
                            className="text-danger error"
                            style={{ marginTop: "-26px" }}>Reps cannot be 0 or less than 0.</h6>}
                      </div>


                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <p className="whole_label">
                    Equipment{" "}
                    <span className="text-lowercase">
                      needed for this exercise
                    </span>{" "}
                    {/* <span class="text-danger"> *</span> */}
                  </p>
                
                  {inputList.map((x, i) => {
                    return (
                      <>
                        <div className="btn-group act_modulbtn">

                          
                          <input
                            name="Equipment"
                            placeholder="e.g. 2 Dumbells"
                            value={x.Equipment}
                            onChange={(e) => {
                              handleInputChange(e, i);
                              let name = "addPoint" + i;
                              setEquipmentNeeded(x.Equipment)
                              // setError({ ...error, [name]: false })
                            }}
                            className="description_inputf Module_pright"
                          />

                          <div className="boxmod">
                            {/* {inputList.length - 1 === i && (
                              <AiFillPlusCircle
                                size="1.5em"
                                className="add"
                                onClick={handleAddClick}
                              />
                            )} */}
                            {inputList.length !== 1 && (
                              <BsTrash
                                className="delete"
                                onClick={() => {
                                  // setError({})
                                  handleRemoveClick(i);
                                }}
                              />
                            )}
                          </div>
                        </div>
                        {/* {renderError('Please enter point', error['addPoint' + i])} */}
                        {/* {error && !x.Equipment && (
                          <h6
                            className="text-danger error"
                            style={{ marginTop: "-26px" }}
                          >
                            This field should be filled.
                          </h6>
                        )} */}
                      </>
                    );
                  })}
                </div>
                <div className="col-md-12">
                              <div style={{marginBottom: "35px", width: "max-content", marginTop:"-5px"}}
                               className="pointer description_btnsave mx-0 d-flex justify-content-center align-items-center"
                                onClick={() => handleAddClick()}>
                                <AiOutlinePlus className="me-2" /> Add {inputList.length === 0 ? "New" : "More"} Equipment</div>
                            </div>
                <div className="col-md-12">
                  <p className="whole_label">instructions<span class="text-danger"> *</span></p>
                  <textarea
                    rows="6"
                    type="text"
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                    className="description_inputf description_descpf"
                    placeholder="Please add workout steps here"
                  />
                  {error && !instruction && (
                    <h6
                      className="text-danger error"
                      style={{ marginTop: "-30px" }}
                    >
                      This field should be filled.
                    </h6>
                  )}
                </div>
                <div className="col-md-6">
                  <p className="whole_label">
                    tags
                    <span className="text-danger"> *</span>
                  </p>
                  <select
                    name=""
                    className="description_inputf"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  >
                    <option value="">Select an option</option>
                    <option value="low impact">low impact</option>
                    <option value="medium impact">medium impact</option>
                    <option value="high impact">high impact</option>
                  </select>
                  {error && !tags && (
                    <h6
                      className="text-danger error"
                      style={{ marginTop: "-26px" }}
                    >
                      You need to select an option.
                    </h6>
                  )}
                </div>

                <div className="col-md-6">
                  <p className="whole_label">
                    calorie<span class="text-danger"> *</span>
                  </p>
                  <input
                    type="number"
                    value={calorie}
                    onChange={(e) => {
                      if (e.target.value >= 0 && e.target.value < 100000)
                      setCalorie(e.target.value);
                    }}
                    className={`description_inputf`}
                    placeholder="Enter calorie"
                  />
                  {error && !calorie && (
                    <h6
                      className="text-danger error"
                      style={{ marginTop: "-26px" }}
                    >
                      This field should be filled.
                    </h6>
                  )}
                  {(error && calorie && calorie <= 0) && <h6
                            className="text-danger error"
                            style={{ marginTop: "-26px" }}>Calorie cannot be 0 or less than 0.</h6>}
                </div>

                <div class="col-md-12">
                  <hr />
                  <div className="d-flex justify-content-between">

                    <div text={'Cancel'} style={{ cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9' }} className="description_btnsave d-flex btnfix_wid81 justify-content-center align-items-center" onClick={() => navigate(-1)}>Cancel</div>
                    <Button
                      value="Submit"
                      onClick={() => handleSubmit()}
                      isLoading={isLoading}
                      type="submit"
                      loadingText={false}
                      text={"Submit"}
                      style={isLoading ? { cursor: "none" } : {}}
                      className="description_btnsave btnfix_wid81"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewExercise;
