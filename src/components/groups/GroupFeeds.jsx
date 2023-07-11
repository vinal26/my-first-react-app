import moment from 'moment';
import React, { useEffect, useState } from 'react'

import { FaHeart, FaRegHeart, FaTransgenderAlt, FaTrash } from "react-icons/fa";
import { ImAttachment } from 'react-icons/im';
import { addCommentService, addReplyService, deleteCommentReplyService, deleteCommentService, deletePostService, getGroupPostsService, postLikeService } from '../../services/GroupService';
import { toastMsg } from '../../Utils/AllConstant';
import { showToastError, showToastSuccess } from '../../Utils/Helper';
import { differenceInHours, differenceInMinutes, differenceInSeconds, format, isToday, isYesterday, parseISO } from 'date-fns'
import DeleteModal from '../../commonComponent/DeleteModal';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import Loader from '../../commonComponent/Loader';

function GroupFeeds({ selectedGroup, onRefresh }) {
    const [posts, setPosts] = useState([]);
    const [postId, setPostId] = useState("");
    const [commentId, setCommentId] = useState("");
    const [replyId, setReplyId] = useState("");
    const [likes, setLikes] = useState("");
    const [isLoading, setLoader] = useState(false);
    const [isPostLoading, setPostLoader] = useState(true);
    // const [comment, setComment] = useState("");
    const auth = useAuth();
    console.log(auth, "userID")

    const getGroupPosts = async () => {
        try {
            const response = await getGroupPostsService(selectedGroup._id);
            setPostLoader(false);
            if (response) {
                setPosts(response);
            }
        } catch (error) {
            setPostLoader(false);
            setPosts([])
            console.log(error);
        }
    };

    const deletePost = async (postId) => {
        try {
            const response = await deletePostService(postId);
            if (response) {
                showToastSuccess(response?.data || 'Post deleted successfully.');
                onRefresh()
                // getSessionById()
            } else {
                showToastError(response?.data || response.message || "Some error occurred")
            }
        } catch (error) {
            showToastError(error?.data?.data || error.data?.message || "Some error occurred")
        }
    }
    const deleteComment = async (postId, commentId) => {
        try {
            const response = await deleteCommentService(postId, commentId);
            if (response) {
                showToastSuccess(response?.data || 'Comment deleted successfully.');
                onRefresh()
                // getSessionById()
            } else {
                showToastError(response?.data || response.message || "Some error occurred")
            }
        } catch (error) {
            showToastError(error?.data?.data || error.data?.message || "Some error occurred")
            console.log(error);
        }
    }
    const deleteCommentReply = async (commentId, replyId) => {
        try {
            const response = await deleteCommentReplyService(commentId, replyId);
            if (response) {
                showToastSuccess(response?.data || 'Reply deleted successfully.');
                onRefresh()
                // getSessionById()
            } else {
                showToastError(response?.data || response.message || "Some error occurred")
            }
        } catch (error) {
            showToastError(error?.data?.data || error.data?.message || "Some error occurred")
            console.log(error);
        }
    }
    const addComment = async (postID, comment) => {
        try {
            const response = await addCommentService({
                "postId": postID,
                "comment": comment
            });
            if (response) {
                showToastSuccess(toastMsg.newComment)
                document.querySelector(`input[name='${postID}']`).value = ""
                onRefresh()
            }
            setLoader(false);
        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    };
    const postLike = async (postId) => {
        try {
            const response = await postLikeService(postId);
            if (response) {
                showToastSuccess(response?.data || 'Post updated successfully.')
                setLikes(response)
                // document.querySelector(`input[name='${postID}']`).value = ""
                onRefresh()
            }
            setLoader(false);
        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        let comment = e.target.children[0].children[0].children[0].children[0].value;
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
                "commentId": commentID,
                "reply": reply
            });
            if (response) {
                showToastSuccess(toastMsg.newReply)
                document.querySelector(`input[name='${commentID}']`).value = ""
                onRefresh()
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

    const calT = (date) => {
        let hrs = differenceInHours(new Date(), parseISO(date))
        let min = differenceInMinutes(new Date(), parseISO(date))
        let sec = differenceInSeconds(new Date(), parseISO(date))

        if (hrs) return hrs + " hrs"
        else if (min) return min + " mins"
        else return sec + " secs"
    }

    useEffect(() => {
        getGroupPosts()
    }, [selectedGroup])

    useEffect(() => {
        console.log(posts, "posts");
    }, [posts])


    return (
        <>
            {isPostLoading ? (
                <center>
                    <Loader
                        visible={isPostLoading}
                        style={{ top: "48px", position: "relative" }}
                    />
                </center>
            ) : posts.length != 0 ? posts.map((dt, i) => (
                <div className='card my-2 p-2'>
                    <div className="row p-2">

                        <div className="col-md-1 d-flex justify-content-center align-items-center">
                            <img
                                src={dt.createdBy.proPicture}
                                // onError={(e) => {
                                //     e.target.src = "images/avatar.png"; //replacement image imported above
                                // }}
                                alt=""
                                className="forums_profile8"
                            />
                        </div>

                        <div className="col-md-10">
                            <DeleteModal
                                title={'Delete'}
                                content1={'Are you sure you want to delete'}
                                content2={'this post?'}
                                modalId={'deletePost'}
                                button2={'No'}
                                button1={'Yes'}
                                onDelete={() =>
                                    deletePost(postId)
                                }
                            />
                            <p className="message_title">
                                {dt.createdBy.full_name}
                            </p>
                            <p className="forums_text22">
                                {isYesterday(parseISO(dt.createdAt)) ? "Posted Yesterday" : isToday(parseISO(dt.createdAt)) ? "Posted " + calT(dt.createdAt) + " ago" : format(parseISO(dt.createdAt), 'do MMM, yyyy')}
                            </p>
                        </div>
                        {dt.createdBy._id === auth?.authUser?._id ?
                            <div className="col-md-1">
                                <span onClick={() => setPostId(dt._id)}> <FaTrash data-bs-toggle="modal"
                                    data-bs-target="#deletePost" className="like_group" style={{ marginTop: "10px" }} /></span>
                            </div>
                            : null}
                    </div>

                    <p className="group_ftext6 mt-2 mb-3 px-3">
                        {dt.post}
                    </p>
                    <hr />
                    {dt.image.length == 0 ?
                        <div className='px-3'><video width="100%" height="300" style={{ marginBottom: "10px" }} controls>
                            <source src={dt.video} type="video/mp4" />
                            <source src={dt.video} type="video/ogg" />

                        </video></div> : <img
                            style={{ height: "300px" }}
                            src={dt.image}
                            onError={(e) => {
                                e.target.src = "images/avatar.png"; //replacement image imported above
                            }}
                            alt=""
                            className="group_image px-3"
                        />}

                    <div className="row px-3 mt-4" >
                        <div className="col-md-7">
                            <div className="btn-group forums_iconspan d-flex justify-content-start">

                                <FaHeart onClick={() => postLike(dt._id)} className={`${dt?.likes?.filter(l => l == auth?.authUser?._id).length && "text-danger"} like_group`} />
                                <span style={{ marginRight: "10px" }}>{dt.likes?.length ? dt.likes?.length : 0} {dt.likes?.length > 1 ? "Likes" : "Like"}</span>
                            </div>
                        </div>
                        <div className="col-md-5 mb-2 bg-white collapsed" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`} aria-expanded="false" aria-controls={`collapse${i}`}>
                            <div className="btn-group forums_iconspan d-flex justify-content-end">
                                <span style={{ marginRight: "10px" }}> {dt.comments.length} comments</span>
                                <img
                                    src="images/message.png"
                                    alt=""
                                    className="me-0"
                                />
                            </div>
                        </div>

                        <div className="accordion-collapse collapse" id={`collapse${i}`} data-bs-parent="#accordionExample">
                            {dt?.comments.map(cm => <div className="card comments mb-2 py-2 px-2">
                                <div className='d-flex justify-content-between align-items-center px-3'>
                                    <div className="row p-2">
                                        <div className="col-md-2 d-flex justify-content-center align-items-center">
                                            <img
                                                src={cm.profilePicture}
                                                onError={(e) => {
                                                    e.target.src = "images/avatar.png"; //replacement image imported above
                                                }}
                                                alt=""
                                                className="forums_profile8"
                                            />
                                        </div>
                                        {console.log(cm, "cm")}
                                        <div className="col-md-10 ps-4">
                                            <p className="message_title">
                                                {cm.full_name}
                                            </p>
                                            <p className="forums_text22">
                                                {cm.comment}
                                            </p>
                                        </div>
                                        <DeleteModal
                                            title={'Delete'}
                                            content1={'Are you sure you want to delete'}
                                            content2={'this comment?'}
                                            modalId={'deleteComment'}
                                            button2={'No'}
                                            button1={'Yes'}
                                            onDelete={() =>
                                                deleteComment(postId, commentId)
                                            }
                                        />
                                    </div>

                                    <div className="btn-group forums_iconspan d-flex justify-content-end">
                                        <div className="mb-2 ">
                                            <p className='fw-bold' style={{ color: "#1f7e78" }}>Reply</p>

                                            {cm.userId === auth?.authUser?._id ?
                                                <p className='fw-bold' data-bs-toggle="modal"
                                                    data-bs-target="#deleteComment" onClick={() => { setPostId(dt._id); setCommentId(cm._id) }} style={{ color: "#1f7e78", marginTop: "-40px", marginLeft: "-60px" }}>Delete</p>
                                                : null}
                                        </div>
                                    </div>

                                </div>
                                <div className='px-2'>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="btn-group activeforum_chat">
                                                <form onSubmit={handleReply} className="d-flex w-100">
                                                    <input
                                                        type="text"
                                                        name={cm._id}
                                                        placeholder="Reply on comment"
                                                    />
                                                    <button type="submit" className='p-0'>
                                                        <img src="images/arrow.png" alt="" />
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {cm?.repDetailedComments.length != 0 && <p className='mb-2 mx-3'>All Replies</p>}
                                {cm?.repDetailedComments.map(rep => <div className='card mb-2 mx-2 bg-light'><div className="row p-2">
                                    <div className="col-md-1 d-flex justify-content-center align-items-center">
                                        <img
                                            src={rep.profilePicture}
                                            onError={(e) => {
                                                e.target.src = "images/avatar.png"; //replacement image imported above
                                            }}
                                            alt=""
                                            className="forums_profile8"
                                        />
                                    </div>
                                    <DeleteModal
                                        title={'Delete'}
                                        content1={'Are you sure you want to delete'}
                                        content2={'this reply?'}
                                        modalId={'deleteCommentReply'}
                                        button2={'No'}
                                        button1={'Yes'}
                                        onDelete={() =>
                                            deleteCommentReply(commentId, replyId)
                                        }
                                    />
                                    <div className="col-md-10 ps-0">

                                        <p className="message_title">
                                            {rep.name}
                                        </p>
                                        <p className="forums_text22">
                                            {rep.commentReply}
                                        </p>

                                    </div>
                                    {rep.userId === auth?.authUser?._id ?
                                        <div className="col-md-1">
                                            <span
                                                onClick={() => { setCommentId(cm._id); setReplyId(rep._id) }}
                                            > <FaTrash data-bs-toggle="modal"
                                                data-bs-target="#deleteCommentReply" className="like_group" style={{ marginTop: "10px" }} /></span>
                                        </div>
                                        : null}
                                </div></div>)}
                            </div>)}

                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="btn-group activeforum_chat">
                                        <input
                                            type="text"
                                            name={dt._id}
                                            placeholder="Write a comment..."
                                        />
                                        {/* <div className="add_icon1">
                                        <input className='fileUploader' type="file" id="myfile" name="myfile" />
                                        <ImAttachment size={"2rem"} color={"white"} />
                                    </div> */}
                                        <button type="submit" className='p-0'>
                                            <img src="images/arrow.png" alt="" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )) : <div className="card mt-4 d-flex justify-content-center align-items-center p-4"><p className='m-0'>No posts found!</p></div>}
        </>
    )
}

export default GroupFeeds