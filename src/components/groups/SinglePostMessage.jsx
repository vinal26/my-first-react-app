import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { FaCommentDots } from "react-icons/fa";
import { BsArrowUp } from "react-icons/bs";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { useAuth } from "../../Context/AuthContext";
import { showToastError, showToastSuccess } from "../../Utils/Helper";
import DeleteModal from "../../commonComponent/DeleteModal";
import Loader from "../../commonComponent/Loader";
import { toastMsg } from "../../Utils/AllConstant";
import ApiConfig from "../../config/ApiConfig";
import {
  addCommentService,
  addReplyService,
  deleteCommentReplyService,
  deleteCommentService,
  deletePostService,
  getGroupPostsService,
  postLikeService,
} from "../../services/GroupService";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  format,
  isBefore,
  isToday,
  isYesterday,
  parseISO,
} from "date-fns";
import AddPostModal from "./AddPostModal";

const SinglePostMessage = () => {
  const location = useLocation();
  const state = location.state;
  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoading, setLoader] = useState(false);
  const [isLoading2, setLoader2] = useState(true);
  const [likes, setLikes] = useState("");
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState("");
  const [commentId, setCommentId] = useState("");
  const [replyId, setReplyId] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [vidImgShow, setVidImgShow] = useState(false);
  // console.log(posts, "posts list");

  useEffect(() => {
    getGroupPosts();
  }, []);

  const calT = (date) => {
    let hrs = differenceInHours(new Date(), parseISO(date));
    let min = differenceInMinutes(new Date(), parseISO(date));
    let sec = differenceInSeconds(new Date(), parseISO(date));

    if (hrs) return hrs + " hrs";
    else if (min) return min + " mins";
    else return sec + " secs";
  };
  const TotalLength = (x) => {
    let arr = Object.keys(x)
    let totallength = 0;
    arr.forEach((el) => {
      totallength += x[el].length
    })
    return totallength;
  };
  const postLike = async (postId) => {
    try {
      const response = await postLikeService(postId);
      if (response) {
        showToastSuccess(response?.data || "Post updated successfully.");
        setLikes(response);
        getGroupPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getGroupPosts = async () => {
    // setLoader2(true);
    try {
      const response = await getGroupPostsService(state.selectedGroup._id);
      setLoader2(false);
      if (response) {
        setPosts(response);
      }
    } catch (error) {
      setPosts([]);
      console.log(error);
      setLoader2(false);
    }
  };

  const deletePostOther = async (postId) => {
    try {
      const response = await deletePostService(postId);

      if (response) {
        showToastSuccess(response?.data || "Post deleted successfully.");
        getGroupPosts();
        // getSessionById()
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

  const addComment = async (postID, comment) => {
    try {
      const response = await addCommentService({
        postId: postID,
        comment: comment,
      });
      if (response) {
        showToastSuccess(toastMsg.newComment);
        document.querySelector(`input[name='${postID}']`).value = "";
        getGroupPosts();
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let comment =
      e.target.children[0].children[0].children[0].children[0].value;
    let postID = e.target.children[0].children[0].children[0].children[0].name;
    let isValid = true;

    if (!comment) {
      isValid = false;
    }

    if (isValid && !isLoading) {
      setLoader(true);
      addComment(postID, comment);
    }

    console.log(postID, comment);
  };

  const addReply = async (commentID, reply) => {
    try {
      const response = await addReplyService({
        commentId: commentID,
        reply: reply,
      });
      if (response) {
        showToastSuccess(toastMsg.newReply);
        document.querySelector(`input[name='${commentID}']`).value = "";
        getGroupPosts();
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const handleReply = (e) => {
    e.preventDefault();
    let reply = e.target.children[0].value;
    let commentID = e.target.children[0].name;
    let isValid = true;

    if (!reply) {
      isValid = false;
    }

    if (isValid && !isLoading) {
      setLoader(true);
      addReply(commentID, reply);
    }

    console.log(commentID, reply);
  };

  const deleteComment = async (postId, commentId) => {
    try {
      const response = await deleteCommentService(postId, commentId);
      if (response) {
        showToastSuccess(response?.data || "Comment deleted successfully.");
        getGroupPosts();
      } else {
        showToastError(
          response?.data || response.message || "Some error occurred"
        );
      }
    } catch (error) {
      showToastError(
        error?.data?.data || error.data?.message || "Some error occurred"
      );
      console.log(error);
    }
  };
  const deleteCommentReply = async (commentId, replyId) => {
    try {
      const response = await deleteCommentReplyService(commentId, replyId);
      if (response) {
        showToastSuccess(response?.data || "Reply deleted successfully.");
        getGroupPosts();
      } else {
        showToastError(
          response?.data || response.message || "Some error occurred"
        );
      }
    } catch (error) {
      showToastError(
        error?.data?.data || error.data?.message || "Some error occurred"
      );
      console.log(error);
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
                  <li class="breadcrumb-item pointer" onClick={() => navigate(-2)}>Groups</li>
                  <li class="breadcrumb-item pointer" onClick={() => navigate(-1)}>Details</li>
                  <li class="breadcrumb-item active fw-bold" aria-current="page">Posts</li>
                </ol>
              </nav>
            </div>

            <div className="row mt-3">
              <div className="col-md-8">
                {isLoading2 ? (
                  <center>
                    <div
                      style={{
                        width: "3rem",
                        height: "3rem",
                        color: "#1f7e78",
                        top: "130px",
                        position: "relative",
                      }}
                      className="spinner-border mt-3 mb-4"
                      role="status"
                    />
                  </center>
                ) : posts.length > 0 ? (
                  posts.map((dt, i) => (
                    <>
                      <div key={i} className="ques p-4 shadow-sm mb-4">
                        <div className=" d-flex justify-content-between mb-3">
                          <div className="d-flex align-items-center">
                            <h5 className="mb-0">{dt.createdBy.full_name} </h5>
                            <span className="ms-2 text-secondary">
                              • Posted {moment(new Date(dt?.createdAt)).fromNow()}
                            </span>
                          </div>

                          <div>
                            <DeleteModal
                              title={"Delete"}
                              content1={"Are you sure you want to delete"}
                              content2={"this post?"}
                              modalId={"deletePost"}
                              button2={"No"}
                              button1={"Yes"}
                              onDelete={() => deletePostOther(postId)}
                            />

                            {dt.createdBy._id === auth?.authUser?._id ? (
                              <span onClick={() => setPostId(dt._id)}>
                                <FaTrash
                                  className="like_group me-0"
                                  data-bs-toggle="modal"
                                  data-bs-target="#deletePost"
                                />
                              </span>
                            ) : null}
                          </div>
                        </div>

                        {dt.image.length != 0 ? (
                          <img
                            src={dt.image}
                            alt=""
                            onError={(e) => {
                              e.target.src = "images/defaultPlaceholder.jpg"; //replacement image imported above
                            }}
                            className="singlepost_image43"
                          />
                        ) : null}

                        {dt.video.length != 0 ? (
                          <>
                            {vidImgShow ? (
                              <video className="active_dummyimg" autoPlay>
                                <source src={dt.video} type="video/mp4" />
                              </video>
                            ) : (
                              // <img
                              //   src="images/defaultPlaceholder.jpg"
                              //   onClick={() => setVidImgShow(true)}
                              //   className="singlepost_image43 cursor-pointer"
                              // />

                              <>
                                <div style={{ position: "relative" }}>
                                  <img
                                    src={
                                      dt.videoThumbnail &&
                                      ApiConfig.ImageUrl +
                                      "posts/" +
                                      dt.createdBy._id +
                                      "/thumbnail/" +
                                      dt.videoThumbnail
                                    }
                                    onError={(e) => {
                                      e.target.src =
                                        "images/defaultPlaceholder.jpg"; //replacement image imported above
                                    }}
                                    alt=""
                                    className="singlepost_image43 cursor-pointer"
                                  />
                                  <img
                                    src="https://img.icons8.com/ios11/600/000000/play-button-circled.png"
                                    onClick={() => setVidImgShow(true)}
                                    className="play_btn765 cursor-pointer"
                                    alt=""
                                  />
                                </div>
                              </>
                            )}
                          </>
                        ) : null}

                        {dt.document.length != 0 ? (
                          <>
                            <img
                              src={
                                dt.documentThumbnail &&
                                ApiConfig.ImageUrl +
                                "posts/" +
                                dt.createdBy._id +
                                "/thumbnail/" +
                                dt.documentThumbnail
                              }
                              onError={(e) => {
                                e.target.src = "images/defaultPlaceholder.jpg"; //replacement image imported above
                              }}
                              alt=""
                              className="singlepost_image43"
                            />

                            <p className="single_postlink00">
                              {dt.document.map((doct, i) => (
                                <a href={doct} target="_blank">
                                  Document {i + 1}
                                </a>
                              ))}
                            </p>
                          </>
                        ) : null}

                        {Object.keys(dt.options || {}).length === 0 ? null : (
                          <>
                            {Object.keys(dt.options || {}).map((poll) => (
                              <>
                                <div className="progress mb-2">
                                  <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{
                                      width: `${dt.options[poll].length ? dt.options[poll].length / TotalLength(dt.options) * 100 : 0}%`,
                                    }}
                                    aria-valuenow="25"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  >
                                    {dt.options[poll].length ? (dt.options[poll].length / TotalLength(dt.options) * 100).toFixed(1) : 0}%
                                  </div>
                                </div>
                                <p className="mt-1 poll_bartext">{poll}</p>
                              </>
                            ))}
                          </>
                        )}

                        <div className="d-flex justify-content-between">
                          <p className="singlepost_text mt-3">{dt.post}</p>
                          <p className="text-muted mt-3">{Object.keys(dt.options).length>0 ? isBefore(parseISO(dt.pollDate), new Date()) ? 'Ended' : `Ends in ${differenceInDays(parseISO(dt.pollDate), new Date())} days` : ""}</p>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center ques-foot">
                          {/* <div className="d-flex align-items-center">
                            <div className="forum_ava forum_ava_sm me-3">
                              <img
                                src={
                                  dt.createdBy.proPicture &&
                                  dt.createdBy.proPicture
                                }
                                onError={(e) => {
                                  e.target.src = "images/avatar.png"; //replacement image imported above
                                }}
                                alt=""
                              />
                            </div>

                            <p className="mb-0">
                              Posted by
                              <span className="fw-bold text-green">
                                {" "}
                                {dt.createdBy.full_name}
                              </span>
                            </p>
                          </div> */}

                          <div className="reactions bg-gray d-flex align-items-center">
                            <div className="forum_valid">
                              {dt?.likes?.filter(
                                (l) => l == auth?.authUser?._id
                              ).length === 1 ? (
                                <BsHeartFill
                                  className="icon1 cursor-pointer mt-1"
                                  onClick={() => postLike(dt._id)}
                                />
                              ) : (
                                <BsHeart
                                  className="icon1 cursor-pointer mt-1"
                                  onClick={() => postLike(dt._id)}
                                />
                              )}
                              {dt?.likes ? dt?.likes.length : 0}
                            </div>

                            <div
                              data-bs-toggle="collapse"
                              data-bs-target={`#linuxTop${dt?._id}`}
                              aria-expanded="false"
                              aria-controls={`#linuxTop${dt?._id}`}
                              className="forum_valid cursor-pointer"
                              style={{ backgroundColor: "#EC8080" }}
                            >
                              <FaCommentDots className="icon1 cursor-pointer mt-1" />
                              {dt?.comments ? dt?.comments.length : 0}
                            </div>
                          </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                          <div className="row mt-3 mb-0">
                            <div className="col-md-12">
                              <div
                                className="btn-group activeforum_chat"
                                style={{ marginBottom: "0px" }}
                              >
                                <input
                                  type="text"
                                  name={dt._id}
                                  placeholder="Type your message here..."
                                />
                                <button type="submit">
                                  <img src="images/arrow.png" alt="" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                        <div className="ques-forum-comment px-2 mt-3">
                          {/* start reply on comment................................................... */}
                          <div id={`linuxTop${dt?._id}`} class="collapse">
                            {dt?.comments.map((cm) => (
                              <>
                                <div>
                                  <div className="d-flex align-items-center mt-4">
                                    <div className="forum_ava me-3">
                                      <img
                                        src={cm.profilePicture}
                                        onError={(e) => {
                                          e.target.src = "images/avatar.png";
                                        }}
                                        alt=""
                                      />
                                    </div>

                                    <div className="col-md-10">
                                      <p className="mb-0 fw-bold">
                                        {cm.full_name}
                                      </p>
                                    </div>

                                    <div className="col-md-2">
                                      {/* <span>
                                      <FaEdit className="like_group mt-2 "></FaEdit>
                                    </span> */}
                                      {cm.userId === auth?.authUser?._id ? (
                                        <span>
                                          <FaTrash
                                            className="like_group"
                                            style={{ marginTop: "10px" }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#deleteComment"
                                            onClick={() => {
                                              setPostId(dt._id);
                                              setCommentId(cm._id);
                                            }}
                                          />
                                        </span>
                                      ) : null}
                                      <DeleteModal
                                        title={"Delete"}
                                        content1={
                                          "Are you sure you want to delete"
                                        }
                                        content2={"this comment?"}
                                        modalId={"deleteComment"}
                                        button2={"No"}
                                        button1={"Yes"}
                                        onDelete={() =>
                                          deleteComment(postId, commentId)
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="ms-4 ps-4 border-start py-3">
                                    <p className="mb-4">{cm.comment}</p>
                                    <hr className="mt-0 mb-2" />
                                    <div className="d-flex justify-content-between align-items-center ques-foot">
                                      <p className="mb-0 text-secondary">
                                        {isYesterday(parseISO(cm.createdAt))
                                          ? "Posted Yesterday"
                                          : isToday(parseISO(cm.createdAt))
                                            ? "Posted " +
                                            calT(cm.createdAt) +
                                            " ago"
                                            : format(
                                              parseISO(cm.createdAt),
                                              "do MMM, yyyy"
                                            )}
                                      </p>
                                      <div className="reactions bg-gray d-flex align-items-center">
                                        <div className="forum_valid">
                                          <BsHeart className="mt-1" />1
                                        </div>
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="btn-group activeforum_chat">
                                          <form
                                            onSubmit={handleReply}
                                            className="d-flex w-100"
                                          >
                                            <input
                                              type="text"
                                              name={cm._id}
                                              placeholder="Type your reply here..."
                                            />
                                            <button type="submit">
                                              <img
                                                src="images/arrow.png"
                                                alt=""
                                              />
                                            </button>
                                          </form>
                                        </div>
                                      </div>
                                    </div>

                                    {cm?.repDetailedComments.length != 0 && (
                                      <p
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#linux${cm?._id}`}
                                        aria-expanded="false"
                                        aria-controls={`#linux${cm?._id}`}
                                        className="mb-2 mx-3 cursor-pointer"
                                        style={{ fontWeight: 500 }}
                                      >
                                        View {cm?.repDetailedComments.length}{" "}
                                        replies
                                      </p>
                                    )}
                                    <div
                                      id={`linux${cm?._id}`}
                                      class="collapse"
                                    >
                                      {cm?.repDetailedComments.map((rep) => (
                                        <div>
                                          <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                              <div className="forum_ava me-3">
                                                <img
                                                  src={rep.profilePicture}
                                                  onError={(e) => {
                                                    e.target.src =
                                                      "images/avatar.png";
                                                  }}
                                                  alt=""
                                                />
                                              </div>

                                              <p className="mb-0 fw-bold">
                                                {rep.name}
                                              </p>
                                              <span className="ms-2 text-secondary">
                                                {isYesterday(
                                                  parseISO(rep.createdAt)
                                                )
                                                  ? "Posted Yesterday"
                                                  : isToday(
                                                    parseISO(rep.createdAt)
                                                  )
                                                    ? "Posted " +
                                                    calT(rep.createdAt) +
                                                    " ago"
                                                    : format(
                                                      parseISO(rep.createdAt),
                                                      "do MMM, yyyy"
                                                    )}
                                              </span>
                                            </div>

                                            <div>
                                              {/* <span>
                                            <FaEdit className="like_group mt-2 "></FaEdit>
                                          </span> */}
                                              {rep.userId ===
                                                auth?.authUser?._id ? (
                                                <span
                                                  onClick={() => {
                                                    setCommentId(cm._id);
                                                    setReplyId(rep._id);
                                                  }}
                                                >
                                                  <FaTrash
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#deleteCommentReply"
                                                    className="like_group"
                                                    style={{
                                                      marginTop: "10px",
                                                    }}
                                                  />
                                                </span>
                                              ) : null}
                                              <DeleteModal
                                                title={"Delete"}
                                                content1={
                                                  "Are you sure you want to delete"
                                                }
                                                content2={"this reply?"}
                                                modalId={"deleteCommentReply"}
                                                button2={"No"}
                                                button1={"Yes"}
                                                onDelete={() =>
                                                  deleteCommentReply(
                                                    commentId,
                                                    replyId
                                                  )
                                                }
                                              />
                                            </div>
                                          </div>
                                          <div className="border-start ms-4 ps-4">
                                            <p className=" py-3 mb-0">
                                              {rep.commentReply}
                                            </p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </>
                            ))}
                          </div>

                          {/* end reply on comment ................................................................ */}
                        </div>
                      </div>
                    </>
                  ))
                ) : (
                  <div className="card mt-4 d-flex justify-content-center align-items-center p-4">
                    <p className="m-0">Add new posts...</p>
                  </div>
                )}
              </div>

              <div className="col-md-4">
                <button
                  className="btn btn-primary btn-custom w-100"
                  onClick={() => setModalShow(true)}
                >
                  <AiOutlinePlus className="me-2" />
                  Create a New Post
                </button>

                {/* <div className="topuser_div09 shadow-sm mt-4">
                  <h5 className="mt-2 mb-4">
                    Top User <span style={{ color: "#B5B5B5" }}>(10)</span>
                  </h5>
                  <div className="row group_topuser mt-3">
                    <div className="col-md-2">
                      <img src="images/profile.png" alt="" />
                    </div>
                    <div className="col-md-10">
                      <p className="mt-2">
                        O. Westervelt{" "}
                        <span className="float-end">
                          15.5k <BsArrowUp className="icon" />
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="row group_topuser mt-3">
                    <div className="col-md-2">
                      <img src="images/profile.png" alt="" />
                    </div>
                    <div className="col-md-10">
                      <p className="mt-2">
                        O. Westervelt{" "}
                        <span className="float-end">
                          15.5k <BsArrowUp className="icon" />
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="row group_topuser mt-3">
                    <div className="col-md-2">
                      <img src="images/profile.png" alt="" />
                    </div>
                    <div className="col-md-10">
                      <p className="mt-2">
                        O. Westervelt{" "}
                        <span className="float-end">
                          15.5k <BsArrowUp className="icon" />
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="row group_topuser mt-3">
                    <div className="col-md-2">
                      <img src="images/profile.png" alt="" />
                    </div>
                    <div className="col-md-10">
                      <p className="mt-2">
                        O. Westervelt{" "}
                        <span className="float-end">
                          15.5k <BsArrowUp className="icon" />
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="row group_topuser mt-3">
                    <div className="col-md-2">
                      <img src="images/profile.png" alt="" />
                    </div>
                    <div className="col-md-10">
                      <p className="mt-2">
                        O. Westervelt{" "}
                        <span className="float-end">
                          15.5k <BsArrowUp className="icon" />
                        </span>
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddPostModal
        gname={state?.selectedGroup?.groupName}
        gid={state?.selectedGroup?._id}
        show={modalShow}
        getGroupPosts={getGroupPosts}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default SinglePostMessage;
