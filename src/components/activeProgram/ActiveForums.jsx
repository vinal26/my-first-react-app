import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { BsExclamationCircle, BsQuestionCircle } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { differenceInHours, differenceInMinutes, differenceInSeconds, format, isToday, isYesterday, parseISO } from 'date-fns'
import Loader from "../../commonComponent/Loader";
import { useAuth } from "../../Context/AuthContext";
import {
  getActiveForums,
  addAskForumQuestion,
  addReplyAnswer,
  replyToAnswerService,
  deleteAnswerReplyService,
  deleteAnswerService,
  deleteQuestionService,
  editQuestion,
  editAnswer,
  editReplyAnswer,
  reactOnQuestion,
  reactOnAnswer,
} from "../../services/ActivePrograms";
import { toastMsg } from "../../Utils/AllConstant";
import { isOnlyEmpty, showToastError, showToastSuccess } from "../../Utils/Helper";
import { FaEdit, FaTrash } from "react-icons/fa";
import DeleteModal from "../../commonComponent/DeleteModal";
import Reactions from "./Reactions";
import { getObjectFromStore } from "../../storage/Storage";
import SquareAvatar from "../../commonComponent/SquareAvatar";
import { HiOutlineUserGroup } from "react-icons/hi";

const ActiveForums = (props) => {
  const [getForumList, setGetForumList] = useState([]);
  const [fname, setfname] = useState(getObjectFromStore("first_name") || "images/avatar.png");
  const [sname, setsname] = useState(getObjectFromStore("last_name") || "images/avatar.png");
  const [profilePicture, setprofilePicture] = useState(getObjectFromStore("profile_picture") || "images/avatar.png");
  const [askQuestion, setAskQuestion] = useState("");
  const [replyAnswer, setReplyAnswer] = useState("");
  const [replyToAnswer, setReplyToAnswer] = useState("");
  const [postReaction, setPostReaction] = useState("");
  const [filterdata, setFilterData] = useState([]);
  const [commentReaction, setCommentReaction] = useState("");
  const [postId, setPostId] = useState("");
  const [commentId, setCommentId] = useState("");
  const [replyId, setReplyId] = useState("");
  const [isLoading, setLoader] = useState(true);
  const [askLoader, setAskLoader] = useState(false);
  const [replyLoader, setReplyLoader] = useState(false);
  const [answerReplyApiChange, setAnswerReplyApiChange] = useState("");
  const [answerApiChange, setAnswerApiChange] = useState("");
  const [questionApiChange, setQuestionApiChange] = useState("");

  // const [invalidReaction, setInValidReaction] = useState([]);
  // const [notsureReaction, setNotSureReaction] = useState([]);
  // const [toxicReaction, setToxicReaction] = useState([]);
  const [checkOne, setCheckOne] = useState(false);

  let navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    getForumsById();
  }, [props.programId]);

  const getForumsById = async (searchWord) => {
    try {
      const response = await getActiveForums(props.programId, searchWord);
      setLoader(false);
      if (response.status === 200) {
        // console.log(response.data.data, "forum response")
        setGetForumList(response?.data?.data);
        setFilterData(response?.data?.data);
      } else {
        console.log(response?.data || response.message);
      }
    } catch (error) {
      setLoader(false);
      // setGetForumList([]);
      error?.data?.data &&
        console.log(error?.data?.data || error.data?.message);
    }
  };

  const onForumSearch = async (e) => {
    let searchWord = e.target.value;
    console.log(getForumList, "getForumList")
    const result = getForumList?.filter((value) => {
      if (value) {
        console.log(value, "value")
        return (
          value?.post?.toLowerCase()?.includes(searchWord?.toLowerCase())
        );
      }
    });

    if (searchWord === "") {
      setFilterData(getForumList);
      // getForumsById(searchWord);
    } else {
      setFilterData(result);
    }
  };
  const deletePost = async (postId) => {
    try {
      const response = await deleteQuestionService(postId);
      if (response) {
        showToastSuccess(response?.data || 'Post deleted successfully.');
        getForumsById();
      } else {
        showToastError(response?.data || response.message || "Some error occurred")
      }
    } catch (error) {
      showToastError(error?.data?.data || error.data?.message || "Some error occurred")
    }
  }
  const deleteComment = async (commentId, postId) => {
    try {
      const response = await deleteAnswerService(commentId, postId);
      if (response) {
        showToastSuccess(response?.data || 'Comment deleted successfully.');
        getForumsById();
      } else {
        showToastError(response?.data || response.message || "Some error occurred")
      }
    } catch (error) {
      showToastError(error?.data?.data || error.data?.message || "Some error occurred")
      console.log(error);
    }
  }
  const deleteCommentReply = async (replyId, commentId) => {
    try {
      const response = await deleteAnswerReplyService(replyId, commentId);
      if (response) {
        showToastSuccess(response?.data || 'Reply deleted successfully.');
        // onRefresh()
        getForumsById();
      } else {
        showToastError(response?.data || response.message || "Some error occurred")
      }
    } catch (error) {
      showToastError(error?.data?.data || error.data?.message || "Some error occurred")
      console.log(error);
    }
  }
  const reactOnAnswers = async (commentId, commentReaction) => {
    // e.preventDefault();
    var parms = {};
    parms["commentId"] = commentId;
    parms["reaction"] = commentReaction;
    try {
      const response = await reactOnAnswer(parms);
      if (response.status === 200) {

        // setAskQuestion("");
        showToastSuccess(response?.data || "Reaction Added successfully");
      } else {
        showToastError(response?.data || response.message || "Some error occurred");
      }
    } catch (error) {
      setAskLoader(false);
      showToastError(error?.data?.data || error.data?.message || "Some error occurred");
    }
    getForumsById();
    // setCommentReaction("");
    // setCommentId("")
    console.log(parms);
  };
  const reactOnQuestions = async (postId, postReaction) => {
    // e.preventDefault();
    var parms = {};
    parms["postId"] = postId;
    parms["reaction"] = postReaction;
    try {
      const response = await reactOnQuestion(parms);
      if (response.status === 200) {

        // getForumsById();
        // setAskQuestion("");
        showToastSuccess(response?.data || "Reaction Added successfully");
      } else {
        showToastError(response?.data || response.message || "Some error occurred");
      }
    } catch (error) {
      setAskLoader(false);
      showToastError(error?.data?.data || error.data?.message || "Some error occurred");
    }
    getForumsById();
    console.log(parms);
  };
  const handleAskQuestion = async (e) => {
    e.preventDefault();
    if (!askQuestion || isOnlyEmpty(askQuestion)) {
      return
    }
    setAskLoader(true)
    if (questionApiChange == "edit") {
      setAskLoader(true)
      var parms = {};
      parms["postId"] = postId;
      parms["post"] = askQuestion;

      try {
        const response = await editQuestion(parms);
        setAskLoader(false);
        if (response.status === 200) {
          setCheckOne(true);
          setAskQuestion("");
          setQuestionApiChange("");
        } else {
          showToastError(response?.data || response.message || "Some error occurred");
        }
      } catch (error) {
        setAskLoader(false);
        showToastError(error?.data?.data || error.data?.message || "Some error occurred");
      }
      getForumsById();
    }
    else {
      var parms = {};
      parms["programId"] = props.programId;
      parms["post"] = askQuestion;
      try {
        const response = await addAskForumQuestion(parms);
        setAskLoader(false);
        if (response.status === 200) {
          setCheckOne(true);
          setAskQuestion("");
        } else {
          showToastError(response?.data || response.message || "Some error occurred");
        }
      } catch (error) {
        setAskLoader(false);
        showToastError(error?.data?.data || error.data?.message || "Some error occurred");
      }
      getForumsById();
      console.log(parms);
    }
  };
  const calT = (date) => {
    let hrs = differenceInHours(new Date(), parseISO(date))
    let min = differenceInMinutes(new Date(), parseISO(date))
    let sec = differenceInSeconds(new Date(), parseISO(date))

    if (hrs) return hrs + " hrs"
    else if (min) return min + " mins"
    else return sec + " secs"
  }
  const removeCOllapseShow = () => {
    const active = document.querySelector(".collapsible_form.show");
    if (active) active.classList.remove("show");
  }

  return (
    <>
      <div className="row px-5 mt-5">
        <div className="col-md-8">
          <div className="my-4">
            <h4>Forums</h4>
            {/* <p>Gravida vestibulum felis tristique lectus elementum. Amet ut est cursus sociis.</p> */}
          </div>
          <div className="actsearch_simple">
            <FiSearch className="boxicon" />
            <input
              placeholder="Search for topic..."
              className="ms-2"
              onChange={(e) => onForumSearch(e)}
            />
          </div>
          {isLoading ? (
            <center>
              <Loader visible={isLoading}
                style={{ top: "-15px", position: "relative" }} />
            </center>
          )
            : filterdata?.length == 0 ? (
              <Loader textClassName={`mt-0 text-center`} showBR={false} emptyTextKey={`addNewForums`} mainClassName={`active_n0data2 pt-4`} />
            )
              : (
                filterdata?.map((curElem, index) => {
                  console.log(getForumList, "forum list")
                  console.log(curElem, "forum list1")
                  // if (curElem.likes?.reaction === "valid") {
                  //   setValidReaction(validReaction + 1)
                  // }
                  const handleReplyAnswer = async (e) => {
                    e.preventDefault();
                    if (!replyAnswer || isOnlyEmpty(replyAnswer)) {
                      return
                    }
                    setReplyLoader(true)
                    if (answerApiChange == "edit") {
                      var parms = {};
                      parms["commentId"] = commentId;
                      parms["comment"] = replyAnswer;
                      // parms["type"] = "doctor";

                      try {
                        const response = await editAnswer(parms);
                        setReplyLoader(false)
                        if (response.status === 200) {
                          if (response?.data.messsage === "Invalid token") {
                            showToastError("Token Expired");
                            auth.setLogout();
                            navigate("/login", { replace: true });
                          } else {
                            setCheckOne(false);
                            setReplyAnswer("");
                            setAnswerApiChange("")
                          }
                        } else {

                          showToastError(
                            response?.data ||
                            response.message ||
                            toastMsg.errorMssg
                          );
                        }
                      } catch (error) {
                        setReplyLoader(false)
                        showToastError(
                          error?.data?.data ||
                          error.data?.message ||
                          toastMsg.errorMssg
                        );
                      }
                      getForumsById();
                    }
                    else {
                      var parms = {};
                      parms["programId"] = curElem.programId;
                      parms["postId"] = curElem._id;
                      parms["comment"] = replyAnswer;

                      try {
                        const response = await addReplyAnswer(parms);
                        setReplyLoader(false)
                        if (response.status === 200) {
                          if (response?.data.messsage === "Invalid token") {
                            showToastError("Token Expired");
                            auth.setLogout();
                            navigate("/login", { replace: true });
                          } else {
                            setCheckOne(false);
                            setReplyAnswer("");
                          }
                        } else {

                          showToastError(
                            response?.data ||
                            response.message ||
                            toastMsg.errorMssg
                          );
                        }
                      } catch (error) {
                        setReplyLoader(false)
                        showToastError(
                          error?.data?.data ||
                          error.data?.message ||
                          toastMsg.errorMssg
                        );
                      }
                      getForumsById();
                    }

                  };

                  return (
                    <React.Fragment key={index}>
                      <div className="ques mt-3 p-4 shadow-sm">
                        <DeleteModal
                          title={'Delete'}
                          content1={'Are you sure you want to delete'}
                          content2={'this question?'}
                          modalId={'deletePost'}
                          button2={'No'}
                          button1={'Yes'}
                          onDelete={() =>
                            deletePost(postId)
                          }
                        />
                        <div className=" d-flex justify-content-between mb-3">
                          <p className="posted_forums54">{curElem.createdBy?.full_name}<span className="ms-1 text-secondary"> • {isYesterday(parseISO(curElem.createdAt)) ? "Posted Yesterday" : isToday(parseISO(curElem.createdAt)) ? "Posted " + calT(curElem.createdAt) + " ago" : format(parseISO(curElem.createdAt), 'do MMM, yyyy')}</span></p>
                          {curElem.createdBy._id === auth?.authUser?._id ?
                            <div>
                              <span
                                onClick={() => {
                                  setPostId(curElem._id);
                                  setAskQuestion(curElem.post);
                                  setQuestionApiChange("edit");
                                }}
                              >
                                <FaEdit className="like_group " style={{ fontSize: "25px", padding: "5px" }} data-bs-toggle="modal" data-bs-target="#forumModal"></FaEdit>
                              </span>
                              <span
                                onClick={() => setPostId(curElem._id)}
                              > <FaTrash data-bs-toggle="modal"
                                data-bs-target="#deletePost" style={{ fontSize: "25px", padding: "5px" }} className="like_group me-0" /></span>
                            </div> : null}
                        </div>
                        {/* <div className=" d-flex justify-content-between mb-3"> */}

                        <div className=" d-flex justify-content-between align-items-center">

                          <h5 className=" mb-0">{curElem.post}</h5></div>
                        {/* {curElem.createdBy._id === auth?.authUser?._id ?
                            <div>
                              <span
                                onClick={() => {
                                  setPostId(curElem._id);
                                  setAskQuestion(curElem.post);
                                  setQuestionApiChange("edit");
                                }}
                              >
                                <FaEdit className="like_group " style={{fontSize: "25px" , padding: "5px"}} data-bs-toggle="modal" data-bs-target="#forumModal"></FaEdit>
                              </span>
                              <span
                                onClick={() => setPostId(curElem._id)}
                              > <FaTrash data-bs-toggle="modal"
                                data-bs-target="#deletePost" style={{fontSize: "25px" , padding: "5px"}} className="like_group me-0" /></span>
                            </div> : null} */}
                        {/* </div> */}
                        {/* <p>Gravida vestibulum felis tristique lectus elementum. Amet ut est cursus sociis. Gravida vestibulum felis tristique lectus elementum. Amet ut est cursus sociis.Gravida vestibulum felis tristique lectus elementum. Amet ut est cursus sociis.Gravida vestibulum felis tristique lectus elementum. Amet ut est cursus sociis.</p> */}
                        <hr />
                        <div className="d-flex justify-content-between align-items-center ques-foot">
                          {/* <div className="d-flex align-items-center">
                            <div className="forum_ava forum_ava_sm me-3">
                              <img
                                src={
                                  curElem.proPicture &&
                                  curElem.proPicture
                                }
                                onError={(e) => {
                                  e.target.src = "images/avatar."; //replacement image imported above
                                }}
                                alt=""
                              />
                            </div>
                            {curElem.createdBy._id ? (
                              <p className="mb-0">Posted by <span className="fw-bold text-green">{curElem.createdBy?.full_name}</span></p>
                            ) : null}
                          </div> */}
                          {/* <div className="reactions bg-gray d-flex align-items-center">
                            <p className="mb-0 fw-bold">{curElem.likes?.length}</p>
                            {/* Reactions */}
                          {/* <div className="forum_valid" onClick={() => {
                              setPostId(curElem._id);
                              setPostReaction("valid")
                              reactOnQuestions();
                            }} ><AiOutlineCheck />0</div>
                            <div className="forum_invalid" onClick={() => { setPostId(curElem._id); setPostReaction("invalid"); reactOnQuestions(); }}><IoMdClose /> 4</div>
                            <div className="forum_not_sure" onClick={() => { setPostId(curElem._id); setPostReaction("notsure"); reactOnQuestions(); }}><BsQuestionCircle /> 1</div>
                            <div className="forum_toxic" onClick={() => { setPostId(curElem._id); setPostReaction("toxic"); reactOnQuestions(); }}><BsExclamationCircle /> 0</div>
                          </div> */}
                          <Reactions data={curElem?.likes || []} index={index} formClick={(reaction) => {
                            // setPostId(id);
                            // setPostReaction(reaction)
                            reactOnQuestions(curElem._id, reaction);
                          }}
                          />
                        </div>
                      </div>
                      <div className="ques-forum-comment px-2 mt-3">
                        <form onSubmit={handleReplyAnswer}>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="btn-group activeforum_chat">
                                <input
                                  type="text"
                                  placeholder="Type your message here..."
                                  value={replyAnswer}
                                  maxLength={200}
                                  onChange={(e) =>
                                    setReplyAnswer(e.target.value)
                                  }
                                />
                                <button style={replyLoader ? { cursor: 'none' } : {}} type="submit">
                                  <img src="images/arrow.png" alt="" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                        {curElem?.comments?.map((curAnsElem) => {
                          const handleReplyToAnswer = async (e) => {
                            // console.log(curAnsElem, "curElemAns");
                            e.preventDefault();
                            if (!replyToAnswer || isOnlyEmpty(replyToAnswer)) {
                              return
                            }
                            setReplyLoader(true)
                            if (answerReplyApiChange == "edit") {
                              var parms = {};
                              // parms["programId"] = curElem.programId;
                              parms["replyId"] = replyId;
                              parms["reply"] = replyToAnswer;
                              try {
                                const response = await editReplyAnswer(parms);
                                setReplyLoader(false)
                                if (response.status === 200) {
                                  if (response?.data.messsage === "Invalid token") {
                                    showToastError("Token Expired");
                                    auth.setLogout();
                                    navigate("/login", { replace: true });
                                  } else {
                                    setCheckOne(false);
                                    setReplyToAnswer("");
                                    setAnswerReplyApiChange("");
                                  }
                                } else {
                                  showToastError(response?.data || response.message || toastMsg.errorMssg);
                                }
                              } catch (error) {
                                setReplyLoader(false)
                                showToastError(error?.data?.data || error.data?.message || toastMsg.errorMssg);
                              }
                              getForumsById();
                            } else {
                              try {
                                var parms = {};
                                parms["programId"] = curElem.programId;
                                parms["commentId"] = curAnsElem._id;
                                parms["reply"] = replyToAnswer;
                                const response = await replyToAnswerService(parms);
                                setReplyLoader(false)
                                if (response.status === 200) {
                                  if (response?.data.messsage === "Invalid token") {
                                    showToastError("Token Expired");
                                    auth.setLogout();
                                    navigate("/login", { replace: true });
                                  } else {
                                    setCheckOne(false);
                                    setReplyToAnswer("");

                                  }
                                } else {
                                  showToastError(response?.data || response.message || toastMsg.errorMssg);
                                }
                              } catch (error) {
                                setReplyLoader(false)
                                showToastError(error?.data?.data || error.data?.message || toastMsg.errorMssg);
                              }
                              getForumsById();

                            }


                          }
                          return (
                            <>
                              <div>
                                <div className="d-flex align-items-center">

                                  <div className="forum_ava me-3">
                                    {curAnsElem?.userId ? (<img
                                      src={
                                        curAnsElem.profilePicture &&
                                        curAnsElem.profilePicture
                                      }
                                      onError={(e) => {
                                        e.target.src = "images/avatar.png"; //replacement image imported above
                                      }}
                                      alt=""
                                    />
                                    ) : (
                                      <img
                                        src={
                                          curAnsElem.doctorId?.profilePicture &&
                                          curAnsElem.doctorId?.profilePicture
                                        }
                                        onError={(e) => {
                                          e.target.src = "images/avatar.png"; //replacement image imported above
                                        }}
                                        alt=""
                                      />
                                    )}
                                  </div>
                                  <DeleteModal
                                    title={'Delete'}
                                    content1={'Are you sure you want to delete'}
                                    content2={'this answer?'}
                                    modalId={'deleteComment'}
                                    button2={'No'}
                                    button1={'Yes'}
                                    onDelete={() =>
                                      deleteComment(commentId, postId)
                                    }
                                  />
                                  <div className="col-md-9">

                                    {curAnsElem.userId ? (
                                      <p className="mb-0 fw-bold">{curAnsElem.full_name}</p>
                                    ) : (
                                      <p className="mb-0 fw-bold">{curAnsElem?.full_name}</p>
                                    )}
                                  </div>
                                  {curAnsElem.userId === auth?.authUser?._id ?
                                    <div className="col-md-2">
                                      <span
                                        onClick={() => {
                                          setPostId(curElem._id);
                                          setCommentId(curAnsElem._id);
                                          setReplyAnswer(curAnsElem?.comment)
                                          setAnswerApiChange("edit")
                                        }}
                                      >
                                        <FaEdit className="like_group mt-2 "></FaEdit>
                                      </span>
                                      <span
                                        onClick={() => {
                                          setPostId(curElem._id);
                                          setCommentId(curAnsElem._id);
                                        }}
                                      > <FaTrash data-bs-toggle="modal"
                                        data-bs-target="#deleteComment" className="like_group" style={{ marginTop: "10px" }} /></span>
                                    </div>
                                    : null}
                                </div>


                                <div className="ms-4 ps-4 border-start py-3">
                                  <p className="mb-4">{curAnsElem.comment}</p>
                                  <hr className="mt-0 mb-2" />
                                  <div className="d-flex justify-content-between align-items-center ques-foot">

                                    <p className="mb-0 text-secondary">
                                      {isYesterday(parseISO(curAnsElem.createdAt)) ? "Posted Yesterday" : isToday(parseISO(curAnsElem.createdAt)) ? "Posted " + calT(curAnsElem.createdAt) + " ago" : format(parseISO(curAnsElem.createdAt), 'do MMM, yyyy')}
                                    </p>
                                    {/* <div className="reactions bg-gray d-flex align-items-center">
                                      <p className="mb-0 fw-bold">{curAnsElem.likes.length}</p>
                                      {/* Reactions */}
                                    {/* <div className="forum_valid" onClick={() => {
                                        setCommentId(curAnsElem._id);
                                        setCommentReaction("valid")
                                        reactOnAnswers();
                                      }} ><AiOutlineCheck /> 7</div>
                                      <div className="forum_invalid" onClick={() => { setCommentId(curAnsElem._id); setCommentReaction("invalid"); reactOnAnswers(); }}><IoMdClose /> 4</div>
                                      <div className="forum_not_sure" onClick={() => { setCommentId(curAnsElem._id); setCommentReaction("notsure"); reactOnAnswers(); }}><BsQuestionCircle /> 1</div>
                                      <div className="forum_toxic" onClick={() => { setCommentId(curAnsElem._id); setCommentReaction("toxic"); reactOnAnswers(); }}><BsExclamationCircle /> 0</div>
                                    </div> */}
                                    <Reactions data={curAnsElem?.likes || []} index={index} formClick={(reaction) => {
                                      // setPostId(id);
                                      // setPostReaction(reaction)
                                      reactOnAnswers(curAnsElem._id, reaction);
                                    }}
                                    />
                                  </div>
                                  {/* Nested replies */}
                                  {curAnsElem.userId ? (
                                    <form
                                      onSubmit={handleReplyToAnswer}>
                                      <div className="row">
                                        <div className="col-md-12">
                                          <div className="btn-group activeforum_chat">
                                            <input
                                              type="text"
                                              placeholder="Type your reply here..."
                                              value={replyToAnswer}
                                              maxLength={150}
                                              onChange={(e) =>
                                                setReplyToAnswer(e.target.value)
                                              }
                                            />
                                            <button style={replyLoader ? { cursor: 'none' } : {}} type="submit">
                                              <img src="images/arrow.png" alt="" />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </form>
                                  ) : (
                                    <>

                                    </>
                                  )}

                                  {curAnsElem?.repDetailedComments?.map((curAnsRepElem) => {
                                    return (
                                      <div>
                                        <DeleteModal
                                          title={'Delete'}
                                          content1={'Are you sure you want to delete'}
                                          content2={'this reply?'}
                                          modalId={'deleteReply'}
                                          button2={'No'}
                                          button1={'Yes'}
                                          onDelete={() =>
                                            deleteCommentReply(replyId, commentId)
                                          }
                                        />
                                        <div className="d-flex justify-content-between align-items-center">
                                          <div className="d-flex align-items-center">
                                            <div className="forum_ava me-3">
                                              {curAnsRepElem?.userId ? (<img
                                                src={
                                                  curAnsRepElem.profilePicture &&
                                                  curAnsRepElem.profilePicture
                                                }
                                                onError={(e) => {
                                                  e.target.src = "images/avatar.png"; //replacement image imported above
                                                }}
                                                alt=""
                                              />
                                              ) : (
                                                <img
                                                  src={
                                                    curAnsRepElem.doctorId?.profilePicture &&
                                                    curAnsRepElem.doctorId?.profilePicture
                                                  }
                                                  onError={(e) => {
                                                    e.target.src = "images/avatar.png"; //replacement image imported above
                                                  }}
                                                  alt=""
                                                />
                                              )}
                                            </div>

                                            {curAnsRepElem.userId ? (
                                              <><p className="mb-0 fw-bold">{curAnsRepElem.name} </p><span className="ms-2 text-secondary"> • {isYesterday(parseISO(curAnsRepElem.createdAt)) ? "Posted Yesterday" : isToday(parseISO(curAnsRepElem.createdAt)) ? "Posted " + calT(curAnsRepElem.createdAt) + " ago" : format(parseISO(curAnsRepElem.createdAt), 'do MMM, yyyy')}</span></>
                                            ) : (
                                              <><p className="mb-0 fw-bold">{curAnsRepElem?.name} </p><span className="ms-2 text-secondary"> • {isYesterday(parseISO(curAnsRepElem.createdAt)) ? "Posted Yesterday" : isToday(parseISO(curAnsRepElem.createdAt)) ? "Posted " + calT(curAnsRepElem.createdAt) + " ago" : format(parseISO(curAnsRepElem.createdAt), 'do MMM, yyyy')}</span></>
                                            )}
                                          </div>
                                          {curAnsRepElem.userId === auth?.authUser?._id ?
                                            <div>
                                              <span
                                                onClick={() => {
                                                  setReplyId(curAnsRepElem._id);
                                                  setCommentId(curAnsElem._id);
                                                  setReplyToAnswer(curAnsRepElem?.commentReply)
                                                  setAnswerReplyApiChange("edit");
                                                }}
                                              >
                                                <FaEdit className="like_group mt-2 "></FaEdit>
                                              </span>
                                              <span
                                                onClick={() => {
                                                  setReplyId(curAnsRepElem._id);
                                                  setCommentId(curAnsElem._id);
                                                }}
                                              > <FaTrash data-bs-toggle="modal"
                                                data-bs-target="#deleteReply" className="like_group" style={{ marginTop: "10px" }} />
                                              </span>
                                            </div>
                                            : null}
                                        </div>
                                        <div className="border-start ms-4 ps-4">
                                          <p className=" py-3 mb-0">{curAnsRepElem?.commentReply}</p>
                                        </div>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            </>
                          )
                        })}

                      </div>

                    </React.Fragment>
                  )
                }))}
        </div>

        <div className="col-md-4">
          <button
            data-bs-placement="top"
            className="btn btn-primary btn-custom w-100"
            data-bs-toggle="modal" data-bs-target="#forumModal"
            onClick={() => { setQuestionApiChange("add"); setAskQuestion("") }}
          >
            <AiOutlinePlus className="me-2" /> Start a New Topic
          </button>
          {/* <div className="top-users bg-gray mt-3 p-4 shadow-sm">
            <h5>Top Users</h5>
            <div className="member mt-4">
              <div className="d-flex align-items-center">
                <div className="forum_ava forum_ava_sm me-3">
                  <img
                    src={"images/avatar.png"}
                    // onError={(e) => {
                    //   e.target.src = "images/avatar.png"; //replacement image imported above
                    // }}
                    alt=""
                  />
                </div><p className="mb-0 text-green fw-bold">Sam Smith</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {/* <!-- Modal --> */}
      <div class="modal fade" id="forumModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content py-4 px-3">
            <div class="modal-header">
              {/* <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> */}
              <h5>{questionApiChange !== "edit" ? "Start a new topic" : "Edit topic"}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleAskQuestion}>
                <div className="col-md-12">
                  <div className="d-flex gap-3 my-2">
                    <SquareAvatar
                      src={profilePicture}
                      className="member_listimage rounded-circle"
                    />
                    <div>
                      <p className='mb-0 fw-bold'>{fname} {sname}</p>
                      <span class="badge bg-less-white text-dark"><HiOutlineUserGroup size="1.2em" className="me-1 mb-1" /> {props.gname}</span>
                    </div>
                  </div>
                  <input
                    className="form-control description_inputf mb-5 mt-4"
                    style={{ outline: "none" }}
                    onChange={(e) => setAskQuestion(e.target.value)}
                    maxLength={150}
                    placeholder="Write something..."
                    value={askQuestion}
                  />
                  <hr />
                  <div className="d-flex justify-content-between mt-1">
                    <button type="button" className='description_btnsave-white mx-0' data-bs-dismiss="modal">Cancel</button>
                    <button className='description_btnsave mx-0' data-bs-toggle="modal" data-bs-target="#forumModal" style={askLoader ? { cursor: 'none' } : {}} type="submit">Post</button>
                  </div>
                </div>
                {/* </div> */}
              </form>
            </div>

          </div>
        </div>
      </div>
      <div className="col-md-12 mt-5 px-5">
        <hr />
        <div className="d-flex justify-content-between">
          <div text={'Back'} style={{ cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9', width: "120px" }} className="description_btnsave d-flex justify-content-center align-items-center" onClick={() => !isLoading && props.onBack()}>Back</div>
          <div text={'Continue'} style={{ cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9', width: "120px" }} className="description_btnsave d-flex justify-content-center align-items-center" onClick={() => !isLoading && props.onSave()}>Continue</div>
        </div>
      </div>
    </>
  );
};

export default ActiveForums;
